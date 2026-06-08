import Route from '@ember/routing/route';
import { service } from '@ember/service';
import QuestionAnsweringService from '../services/question-answering';
import AnswerController from '../controllers/answer';
import type Transition from '@ember/routing/transition';
import type LocalAuthorityDataService from 'frontend-decide-question-answering/services/local-authority-data';
import type { LocalGovernmentOption } from 'frontend-decide-question-answering/services/local-authority-data';

export default class AnswerRoute extends Route {
  @service declare questionAnswering: QuestionAnsweringService;
  @service declare localAuthorityData: LocalAuthorityDataService;

  queryParams = {
    localAuthority: { refreshModel: true },
  };

  async beforeModel(transition: Transition): Promise<void> {
    await this.localAuthorityData.loadLocalAuthoritiesTask.perform();
    const localAuthorityId = transition.to?.queryParams?.['localAuthority'];
    if (localAuthorityId) {
      const selected = this.localAuthorityData.localAuthorityOptions.find(
        (option: LocalGovernmentOption) => option.id === localAuthorityId,
      );

      if (selected) {
        this.localAuthorityData.selectedLocalAuthority = selected;
        return; // Param valid, no redirect needed
      }
    }
  }

  model() {
    return {
      startTime: new Date()
    };
  }
  setupController(controller: AnswerController, model: ReturnType<this['model']>, transition: Transition): void {
    super.setupController(controller, model, transition);
    controller.sendQuestion();
  }
}
