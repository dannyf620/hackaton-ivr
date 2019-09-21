import { Component } from '@angular/core';
import { IPhone } from './modules/question/pages/phone/phone.component';
import { IvrService } from './modules/question/services/ivr.service';
import { IState } from './modules/question/models/IState';
import { Ianswer } from './modules/question/models/Ianswer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'phone';

  firstStep = 'primerPaso';
  activeQuestion: string;
  activeQuestion2: string;
  questionsDicctionaryStates = {
    primerPaso: {
      title: 'Eres Cliente',
      callback: (answerNum: number, nextStep: string) => {
        console.log(nextStep);
        if (nextStep) {
          this.toggleQuestion(nextStep);
        } else {
          switch (answerNum) {
            case 2:
              this.toggleQuestion('pasoError');
              break;
          }
        }
      },
      answers: [
        {
          title: 'Si',
          number: 1,
          endPointUrl: '/eres-pendejo'
        },
        {
          title: 'No',
          number: 2
        }]
    },
    pasoError: {
      title: 'lo sient hay un error.',
      callback: (answerNum: number, nextStep: string) => {
        if (nextStep) {
          this.toggleQuestion(nextStep);
        } else {
          switch (answerNum) {
            case 1:
              this.toggleQuestion('primerPaso');
              break;
            case 2:
              this.toggleQuestion('primerPaso');
              break;
          }
        }
      },
      answers: [
        {
          title: 'Primer paso',
          number: 1
        },
        {
          title: 'Regresar a primer paso',
          number: 2
        }]
    },
    eresCliente: {
      title: ' tu eres cliente linernu !!!!!',
      callback: (answerNum: number, nextStep: string) => {
        if (nextStep) {
          this.toggleQuestion(nextStep);
        } else {
          switch (answerNum) {
            case 1:
              this.toggleQuestion('primerPaso');
              break;
            case 2:
              this.toggleQuestion('primerPaso');
              break;
            case 3:
              this.toggleQuestion('primerPaso');
              break;
            case 4:
              this.toggleQuestion('primerPaso');
              break;
          }
        }
      },
      answers: [
        {
          title: 'paso 1',
          number: 1,
        },
        {
          title: 'paso 1 1',
          number: 2
        },
        {
          title: 'Creo que si',
          number: 3,
          type: 'input'
        },
        {
          title: 'a lo mejor',
          number: 4
        }],
    }
  };

  actualState: IState;
  loadingState: boolean;

  constructor(
    private ivrService: IvrService
  ) {}

  startCall(event: IPhone) {
    this.loadingState = true;

    this.ivrService.createCall().subscribe(res => {
      this.loadingState = false;
      this.actualState = res;
    });
    this.toggleQuestion(event.step);
  }

  endCall() {
    this.ivrService.destroyCredential();
  }

  toggleQuestion(state: string) {
    if (this.activeQuestion) {
      this.activeQuestion = undefined;
      this.activeQuestion2 = state;
    } else {
      this.activeQuestion = state;
      this.activeQuestion2 = undefined;
    }
  }

  selectAnswer($event: Ianswer) {
    console.log('$event ......');
    console.log($event);
    this.loadingState = true;

    this.ivrService.getNewState($event.type, $event.data, $event.name).subscribe(res => {
      this.loadingState = false;
      this.actualState = res;
    });
  }
}


