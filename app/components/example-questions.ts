import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import Component from '@glimmer/component';

export default class ExampleQuestions extends Component {
  @tracked selectedQuestion: string = "";
  exampleQuestions: Record<string, string[]> = {
    "Ask about subsidies": [
      "What subsidies are available for renewable energy?",
      "How can I apply for agricultural subsidies?",
      "Which industries receive the most government subsidies?"
    ],
    "Ask about SDGs": [
      "What are the 17 Sustainable Development Goals?",
      "How is progress on the SDGs being measured?",
      "Which SDGs are most at risk of not being met by 2030?"
    ],
    "Ask about climate goals": [
      "What is the Paris Agreement's 1.5°C target?",
      "How are national climate goals being tracked?",
      "What are the EU's climate goals for 2050?"
    ]
  };

  get questions(): string[] {
    return Object.keys(this.exampleQuestions);
  }

  get currentExampleQuestions(): string[] {
    return this.exampleQuestions[this.selectedQuestion] ?? [];
  }

  selectQuestion = (question) => {
    this.selectedQuestion = question;
  }

  clearQuestion = () => {
    this.selectedQuestion = "";
  }

  @action
  questionClicked(exampleQuestion) {
    this.args.onQuestionClicked(exampleQuestion);
  }
}
