import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export interface Answer {
  id?: string;
  content?: string;
  time?: Date;
  sources?: string[];
}

export default class QuestionAnsweringService extends Service {
  @tracked currentQuestion: string = "";
  @tracked answer?: Answer;

  // TODO: this needs to be connected to the actual backend instead of this mockup
  async sendQuestion() {
    await new Promise(resolve => setTimeout(resolve, 3000));
    this.answer = {
      id: '12345',
      content: 'Sorry, we were unable to find any relevant information in any decision. Try rewording your question or giving more details, e.g. which local authority you’re asking the question about.',
      time: new Date(),
      sources: []
    };
    return this.answer;
  }

  reset(clearQuestion) {
    this.answer = null;
    if (clearQuestion) {
      this.currentQuestion = "";
    }
  }
}

// Don't remove this declaration: this is what enables TypeScript to resolve
// this service using `Owner.lookup('service:questionAnswering')`, as well
// as to check when you pass the service name as an argument to the decorator,
// like `@service('questionAnswering') declare altName: QuestionAnsweringService;`.
declare module '@ember/service' {
  interface Registry {
    'questionAnswering': QuestionAnsweringService;
  }
}
