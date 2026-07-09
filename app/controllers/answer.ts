import Controller from '@ember/controller';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import QuestionAnsweringService from '../services/question-answering';
import AnnotationReviewService from '../services/annotation-review';
import type LocalAuthorityDataService from 'frontend-decide-question-answering/services/local-authority-data';
import type RouterService from '@ember/routing/router-service';

export default class AnswerController extends Controller {
  @service declare questionAnswering: QuestionAnsweringService;
  @service declare router: RouterService;
  @service declare localAuthorityData: LocalAuthorityDataService;
  @service declare annotationReview: AnnotationReviewService;

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
      const previouslyApproved = this.questionAnswering.answer?.approved;
      await this.annotationReview.approveAnswer(answer, previouslyApproved);
      this.questionAnswering.answer = {
        ...this.questionAnswering.answer!,
        rejected: false,
        approved: !previouslyApproved
      };
    }
  }

  @action async reject() {
    let answer = await this.questionAnswering.answer;
    if (answer?.id) {
      const previouslyRejected = this.questionAnswering.answer?.rejected;
      await this.annotationReview.rejectAnswer(answer, previouslyRejected);
      this.questionAnswering.answer = {
        ...this.questionAnswering.answer!,
        rejected: !previouslyRejected,
        approved: false
      };
    }
  }

  @action async approveSource(index: number) {
    const sources = this.questionAnswering.answer?.sources;
    if (sources && sources[index]) {
      let updatedSources = [];
      for (let i = 0; i < sources.length; i++) {
        let source = sources[i];
        if (!source) {
          continue;
        }
        if (i === index) {
          await this.annotationReview.approveSource(source);
          updatedSources.push({ ...source, approved: !source.approved, rejected: false });
        } else {
          updatedSources.push(source);
        }
      }
      this.questionAnswering.answer = {
        ...this.questionAnswering.answer!,
        sources: updatedSources,
      };
    }
  }

  @action async rejectSource(index: number) {
    const sources = this.questionAnswering.answer?.sources;
    if (sources && sources[index]) {
      let updatedSources = [];
      for (let i = 0; i < sources.length; i++) {
        let source = sources[i];
        if (!source) {
          continue;
        }
        if (i === index) {
          await this.annotationReview.rejectSource(source);
          updatedSources.push({ ...source, rejected: !source.rejected, approved: false });
        } else {
          updatedSources.push(source);
        }
      }
      this.questionAnswering.answer = {
        ...this.questionAnswering.answer!,
        sources: updatedSources,
      };
    }
  }
}
