import Controller from '@ember/controller';
import { action } from '@ember/object';

import type RouterService from '@ember/routing/router-service';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import type LocalAuthorityDataService from 'frontend-decide-question-answering/services/local-authority-data';
import type QuestionAnsweringService from 'frontend-decide-question-answering/services/question-answering';

export interface LocalGovernmentOption {
  id?: string;
  label: string;
}

export default class IndexController extends Controller {
  queryParams = ['localAuthority'];

  @tracked localAuthority: string | undefined = '';
  @service declare router: RouterService;
  @service declare localAuthorityData: LocalAuthorityDataService;
  @service declare questionAnswering: QuestionAnsweringService;

  @action
  changeSelectLocalAuthority(selected: LocalGovernmentOption) {
    this.localAuthority = selected.id;
  }

  @action sendQuestion(question: string) {
    this.questionAnswering.currentQuestion = question;
    if (this.localAuthorityData.selectedLocalAuthority) {
      this.localAuthority = this.localAuthorityData.selectedLocalAuthority.id!;
      this.router.transitionTo('answer', {
        queryParams: {
          localAuthority: this.localAuthorityData.selectedLocalAuthority.id,
        },
      });
    } else {
      alert('Please select a local authority first');
    }
  }

  @action
  setQuestion(e: InputEvent) {
    this.questionAnswering.currentQuestion = (e.target as HTMLInputElement).value;
  }

}
