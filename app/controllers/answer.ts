import Controller from '@ember/controller';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import QuestionAnsweringService from '../services/question-answering';
import type RouterService from '@ember/routing/router-service';

export default class AnswerController extends Controller {
  @service declare questionAnswering: QuestionAnsweringService;
  @service declare router: RouterService;

  queryParams = ['localAuthority'];

  @tracked localAuthority: string = null;

  get capitalizedLocalAuthority() {
    return this.localAuthority?.charAt(0).toUpperCase() + this.localAuthority?.slice(1);
  }

  formattedTime(time) {
    return time?.toLocaleTimeString();
  }
  
  @action
  async sendQuestion() {
    await this.questionAnswering.sendQuestion();
  }

  @action navigateBack(clearQuestion) {
    this.questionAnswering.reset(clearQuestion);
    this.router.transitionTo('index', {
      queryParams: {
        localAuthority: this.localAuthority,
      },
    });
  }
}
