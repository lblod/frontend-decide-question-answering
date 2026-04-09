import Controller from '@ember/controller';
import { action } from '@ember/object';

import type RouterService from '@ember/routing/router-service';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import type ChartDataService from 'frontend-decide-question-answering/services/chart-data';
import type LocalAuthorityDataService from 'frontend-decide-question-answering/services/local-authority-data';

export interface LocalGovernmentOption {
  id?: string;
  label: string;
}

export default class IndexController extends Controller {
  queryParams = ['localAuthority'];

  @tracked localAuthority?: string = '';
  @service declare router: RouterService;
  @service declare localAuthorityData: LocalAuthorityDataService;
  @tracked question?: string = '';

  @action
  changeSelectLocalAuthority(selected: LocalGovernmentOption) {
    this.localAuthorityData.selectedLocalAuthority = selected;
    this.localAuthority = this.localAuthorityData.selectedLocalAuthority.id;
  }

  @action submitLocalAuthority() {
    this.localAuthority = this.localAuthorityData.selectedLocalAuthority?.id;
    if (this.localAuthorityData.selectedLocalAuthority) {
      this.router.transitionTo('index', {
        queryParams: {
          localAuthority: this.localAuthorityData.selectedLocalAuthority.id,
        },
      });
    }
  }

  @action
  setQuestion(e: InputEvent) {
    this.question = e.target.value;
  }
}
