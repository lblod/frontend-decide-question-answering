import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class QuestionAnsweringService extends Service {
  @tracked current: string = "";
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
