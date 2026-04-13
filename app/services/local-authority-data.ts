import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export interface LocalGovernmentOption {
  id?: string;
  label: string;
}
const localAuthorityOptions: LocalGovernmentOption[] = [
  { label: 'Ghent, Belgium', id: 'ghent' },
  { label: 'Freiburg, Germany', id: 'freiburg' },
  { label: 'Bamberg, Germany', id: 'bamberg' },
];
export default class LocalAuthorityDataService extends Service {
  @tracked selectedLocalAuthority?: LocalGovernmentOption | null = null;

  get localAuthorityOptions() {
    return localAuthorityOptions;
  }
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
