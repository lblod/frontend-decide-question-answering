import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export interface Source {
  uri: string;
  title: string;
  approved?: boolean;
  rejected?: boolean;
}

export interface Answer {
  id?: string;
  content?: string;
  time?: Date;
  sources?: Source[];
  approved?: boolean;
  rejected?: boolean;
}

export default class QuestionAnsweringService extends Service {
  @tracked currentQuestion: string = "";
  @tracked answer?: Answer;

  async sendQuestion() {
    const resp = await fetch(
      "/question-answering/answer",
      {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
          "question": this.currentQuestion,
          "top_n": 3
        }),
      }
    );
    let content: string = "";
    let sources = [];
    let id;
    if (!resp.ok) {
      content = "Unfortunately, our service encountered an error. Please try again later."
    } else {
      const payload = await resp.json();
      if (payload?.answer) {
        content = payload.answer;
      }
      if (payload?.sources) {
        sources = payload.sources;
      }
      if (payload?.id) {
        id = payload.id;
      }
    }
    this.answer = {
      id,
      content,
      time: new Date(),
      sources
    };
    return this.answer;
  }

  reset(clearQuestion?: boolean) {
    this.answer = undefined;
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
