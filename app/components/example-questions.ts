import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import Component from '@glimmer/component';

type ExampleQuestionsConfig = Record<string, {
  name: string;
  questions: Record<string, string[]>;
}>;

interface ExampleQuestionsArgs {
  onQuestionClicked: (question: string) => void;
  localAuthorityUri: string;
}


export default class ExampleQuestions extends Component<ExampleQuestionsArgs> {
  @tracked allExampleQuestions: ExampleQuestionsConfig = {};
  @tracked private _selectedQuestion: string = '';
  @tracked private _selectedQuestionUri: string = '';

  constructor(owner: unknown, args: ExampleQuestionsArgs) {
    super(owner, args);
    this.clearQuestion();
    fetch('/data/example-questions.json')
      .then(r => r.json())
      .then(data => {
        this.allExampleQuestions = data;
      });
  }

  get exampleQuestions(): Record<string, string[]> {
    const entry = this.allExampleQuestions[this.args.localAuthorityUri];
    return entry?.questions ?? {};
  }

  get questions(): string[] {
    return Object.keys(this.exampleQuestions);
  }

  get currentExampleQuestions(): string[] {
    return this.exampleQuestions[this.selectedQuestion] ?? [];
  }

  get selectedQuestion(): string {
    if (this._selectedQuestionUri === this.args.localAuthorityUri) {
      return this._selectedQuestion;
    }
    return '';
  }

  selectQuestion = (question: string) => {
    this._selectedQuestion = question;
    this._selectedQuestionUri = this.args.localAuthorityUri;
  }

  clearQuestion = () => {
    this._selectedQuestion = '';
    this._selectedQuestionUri = '';
  }

  @action
  questionClicked(exampleQuestion: string) {
    this.args.onQuestionClicked(exampleQuestion);
  }
}
