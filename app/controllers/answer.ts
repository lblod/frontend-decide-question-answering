import Controller from '@ember/controller';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import QuestionAnsweringService from '../services/question-answering';

export default class AnswerController extends Controller {
  @service declare questionAnswering: QuestionAnsweringService;

  queryParams = ['localAuthority'];

  @tracked localAuthority: string = null;

  get capitalizedLocalAuthority() {
    return this.localAuthority?.charAt(0).toUpperCase() + this.localAuthority?.slice(1);
  }

  get formattedStartTime() {
    return this.model.startTime?.toLocaleTimeString();
  }
}
