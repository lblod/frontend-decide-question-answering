import type Store from '@ember-data/store';
import Service, { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { task } from 'ember-concurrency';
import type Organization from '../models/organization';

export interface LocalGovernmentOption {
  id?: string;
  label: string;
  uri?: string;
}

// "Gemeente" classification, same as the human validator tool uses to list
// the governing bodies/local authorities.
const MUNICIPALITY_CLASSIFICATION =
  'http://data.vlaanderen.be/id/concept/BestuurseenheidClassificatieCode/5ab0e9b8a3b2ca7c5e000001';

export default class LocalAuthorityDataService extends Service {
  @service declare store: Store;

  @tracked selectedLocalAuthority?: LocalGovernmentOption | null = null;
  @tracked localAuthorityOptions: LocalGovernmentOption[] = [];

  loadLocalAuthoritiesTask = task(async () => {
    const organizations = (await this.store.query('organization', {
      filter: {
        'show-in-hvt': true,
        classification: MUNICIPALITY_CLASSIFICATION,
      },
      page: { size: 20 },
      sort: 'pref-label',
    })) as unknown as Organization[];

    this.localAuthorityOptions = organizations.map((org) => ({
      id: org.id,
      label: org.prefLabel?.toString() ?? org.uri,
      uri: org.uri,
    }));

    return this.localAuthorityOptions;
  });
}

// Don't remove this declaration: this is what enables TypeScript to resolve
// this service using `Owner.lookup('service:localAuthorityData')`, as well
// as to check when you pass the service name as an argument to the decorator,
// like `@service('localAuthorityData') declare altName: LocalAuthorityDataService;`.
declare module '@ember/service' {
  interface Registry {
    'localAuthorityData': LocalAuthorityDataService;
  }
}
