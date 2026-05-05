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

  @tracked localAuthority: string | null = null;

  get capitalizedLocalAuthority(): string {
    if (!this.localAuthority) return '';
    return this.localAuthority?.charAt(0).toUpperCase() + this.localAuthority?.slice(1);
  }

  @action
  async sendQuestion() {
    await this.questionAnswering.sendQuestion(this.localAuthority);
  }

  @action navigateBack(clearQuestion: boolean) {
    this.questionAnswering.reset(clearQuestion);
    this.router.transitionTo('index', {
      queryParams: {
        localAuthority: this.localAuthority,
      },
    });
  }

  // TODO: these actions should be sent to the backend
  @action approve() {
    this.questionAnswering.answer = {
      ...this.questionAnswering.answer!,
      rejected: false,
      approved: !this.questionAnswering.answer?.approved
    };
  }

  @action reject() {
    this.questionAnswering.answer = {
      ...this.questionAnswering.answer!,
      approved: false,
      rejected: !this.questionAnswering.answer?.rejected
    };
  }

  @action approveSource(index: number) {
    const sources = this.questionAnswering.answer?.sources;
    if (sources && sources[index]) {
      const updatedSources = sources.map(
        (source, i) => (i === index) ? { ...source, approved: !source.approved, rejected: false } : source
      );
      this.questionAnswering.answer = {
        ...this.questionAnswering.answer!,
        sources: updatedSources,
      };
    }
  }

  @action rejectSource(index: number) {
    const sources = this.questionAnswering.answer?.sources;
    if (sources && sources[index]) {
      const updatedSources = sources.map(
        (source, i) => (i === index) ? { ...source, rejected: !source.rejected, approved: false } : source
      );
      this.questionAnswering.answer = {
        ...this.questionAnswering.answer!,
        sources: updatedSources,
      };
    }
  }
}
