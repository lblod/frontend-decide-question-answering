import Service from '@ember/service';
import type { Source, Answer } from './question-answering';

export default class AnnotationReviewService extends Service {

  async approveAnswer(answer: Answer, previouslyApproved: boolean | undefined): Promise<void> {
    // always delete the last review first
    await fetch(
      `/annotation-review/review/${answer.id}`,
      {
        method: 'DELETE',
      },
    );
    // only approve if it wasn't approved already
    if (!previouslyApproved) {
      await fetch(
        `/annotation-review/review/${answer.id}/approve`,
        {
          method: 'POST',
        },
      );
    }
  }

  async rejectAnswer(answer: Answer, previouslyRejected: boolean | undefined): Promise<void> {
    // always delete the last review first
    await fetch(
      `/annotation-review/review/${answer.id}`,
      {
        method: 'DELETE',
      },
    );
    // only reject if it wasn't rejected already
    if (!previouslyRejected) {
      await fetch(
        `/annotation-review/review/${answer.id}/reject`,
        {
          method: 'POST',
        },
      );
    }
  }

  async approveSource(source: Source): Promise<void> {
    if (source.quotation_id) {
      // always delete the last review first
      await fetch(
        `/annotation-review/review/${source.quotation_id}`,
        {
          method: 'DELETE',
        },
      );
      // only approve if it wasn't approved already
      if (!source.approved) {
        await fetch(
          `/annotation-review/review/${source.quotation_id}/approve`,
          {
            method: 'POST',
          },
        );
      }
    }
  }

  async rejectSource(source: Source): Promise<void> {
    if (source.quotation_id) {
      // always delete the last review first
      await fetch(
        `/annotation-review/review/${source.quotation_id}`,
        {
          method: 'DELETE',
        },
      );
      // only approve if it wasn't approved already
      if (!source.rejected) {
        await fetch(
          `/annotation-review/review/${source.quotation_id}/reject`,
          {
            method: 'POST',
          },
        );
      }
    }
  }
}

// Don't remove this declaration: this is what enables TypeScript to resolve
// this service using `Owner.lookup('service:annotation-review')`, as well
// as to check when you pass the service name as an argument to the decorator,
// like `@service('annotation-review') declare altName: AnnotationReviewService;`.
declare module '@ember/service' {
  interface Registry {
    'annotation-review': AnnotationReviewService;
  }
}
