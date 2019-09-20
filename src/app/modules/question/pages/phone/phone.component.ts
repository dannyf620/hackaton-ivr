import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface IPhone {
  step: string;
  phoneNumber: string;
}


@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.scss']
})
export class PhoneComponent implements OnInit {

  @Output() makeCallEvent: EventEmitter<IPhone> = new EventEmitter();
  @Input() firstStep: string;
  phoneNumber: string;

  constructor() { }

  ngOnInit() {
  }

  makeCall() {
    this.makeCallEvent.emit({step: this.firstStep, phoneNumber: this.phoneNumber});
  }
}
