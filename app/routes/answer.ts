import Route from '@ember/routing/route';
import { service } from '@ember/service';
import QuestionAnsweringService from '../services/question-answering';

export default class AnswerRoute extends Route {
  @service declare questionAnswering: QuestionAnsweringService;

  queryParams = {
    localAuthority: { refreshModel: true },
  };

  model() {
    return {
      startTime: new Date()
    };
  }
  setupController(controller: AnswerController, model: unknown, transition: Transition): void {
    super.setupController(controller, model, transition);
    controller.sendQuestion();
  }
}
