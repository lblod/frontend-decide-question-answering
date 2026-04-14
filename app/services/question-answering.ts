import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export interface Source {
  href: string;
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
    // TODO: this needs to be connected to the actual backend instead of this mockup
    await new Promise(resolve => setTimeout(resolve, 3000));
    let content = 'The 17 Sustainable Development Goals (SDGs) are a set of global goals adopted by all United Nations member states in 2015 as part of the 2030 Agenda for Sustainable Development. They aim to improve life for people and protect the planet. Here are all 17 goals: No Poverty, Zero Hunger, Good Health and Well-being, Quality Education, Gender Equality, Clean Water and Sanitation, Affordable and Clean Energy, Decent Work and Economic Growth, Industry, Innovation and Infrastructure, Reduced Inequalities, Sustainable Cities and Communities, Responsible Consumption and Production, Climate Action, Life Below Water, Life on Land, Peace, Justice and Strong Institutions, Partnerships for the Goals.';
    let sources = [
      {
        href: 'https://www.un.org/sustainabledevelopment/development-goals/?utm_source=chatgpt.com',
        title: 'UN Sustainable Development Goals overview',
      },
      {
        href: 'https://sdgs.un.org/goals?utm_source=chatgpt.com',
        title: 'Full list of all 17 SDGs (sdgs.un.org)'
      }
    ];
    // TODO: remove this test for unasnwerable questions
    if (this.currentQuestion.indexOf('impossible question') > -1) {
      content = 'Sorry, we were unable to find any relevant information in any decision. Try rewording your question or giving more details, e.g. which local authority you’re asking the question about.';
      sources = [];
    }
    this.answer = {
      id: '12345',
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
