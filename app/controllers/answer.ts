import Controller from '@ember/controller';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import QuestionAnsweringService from '../services/question-answering';
import type LocalAuthorityDataService from 'frontend-decide-question-answering/services/local-authority-data';
import type RouterService from '@ember/routing/router-service';

export default class AnswerController extends Controller {
  @service declare questionAnswering: QuestionAnsweringService;
  @service declare router: RouterService;
  @service declare localAuthorityData: LocalAuthorityDataService;

  queryParams = ['localAuthority'];


  get capitalizedLocalAuthority(): string {
    if (!this.localAuthorityData.selectedLocalAuthority) return '';
    return this.localAuthorityData.selectedLocalAuthority?.label.charAt(0).toUpperCase() + this.localAuthorityData.selectedLocalAuthority?.label.slice(1);
  }

  @action
  async sendQuestion() {
    await this.questionAnswering.sendQuestion();
  }

  @action navigateBack(clearQuestion: boolean) {
    this.questionAnswering.reset(clearQuestion);
    this.router.transitionTo('index', {
      queryParams: {
        localAuthority: this.localAuthorityData.selectedLocalAuthority?.id,
      },
    });
  }

  @action async approve() {
    let answer = await this.questionAnswering.answer;
    if (answer?.id) {
      // always delete the last review first
      let response = await fetch(
        `/annotation-review/review/${answer.id}`,
        {
          method: 'DELETE',
        },
      );
      // only approve if it wasn't approved already
      if (!this.questionAnswering.answer?.approved) {
        response = await fetch(
          `/annotation-review/review/${answer.id}/approve`,
          {
            method: 'POST',
          },
        );
      }
      this.questionAnswering.answer = {
        ...this.questionAnswering.answer!,
        rejected: false,
        approved: !this.questionAnswering.answer?.approved
      };
    }
  }

  @action async reject() {
    let answer = await this.questionAnswering.answer;
    if (answer?.id) {
      // always delete the last review first
      let response = await fetch(
        `/annotation-review/review/${answer.id}`,
        {
          method: 'DELETE',
        },
      );
      // only reject if it wasn't rejected already
      if (!this.questionAnswering.answer?.rejected) {
        response = await fetch(
          `/annotation-review/review/${answer.id}/reject`,
          {
            method: 'POST',
          },
        );
      }
      this.questionAnswering.answer = {
        ...this.questionAnswering.answer!,
        rejected: !this.questionAnswering.answer?.rejected,
        approved: false
      };
    }
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
