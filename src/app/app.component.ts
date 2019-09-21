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

  actualState: IState;
  loadingState: boolean;

  constructor(
    private ivrService: IvrService
  ) {}

  startCall(event: IPhone) {
    this.loadingState = true;

    this.ivrService.createCall(event.phoneNumber).subscribe(res => {
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
    this.actualState = undefined;
    this.ivrService.getNewState($event.type, $event.data, $event.name).subscribe(res => {
      // time to destroy component and make answer events again
      setTimeout(() => {
        this.loadingState = false;
        this.actualState = res;
      }, 50);
    });
  }
}


