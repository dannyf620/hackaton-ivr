import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Ianswer } from '../../models/Ianswer';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit {
  @Input() number: number;
  @Input() title: string;
  @Input() name: string;
  @Input() type: string;
  @Output() answer: EventEmitter<Ianswer> = new EventEmitter();
  option: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  select() {
    this.answer.emit({
      type: this.type,
      data: '',
      name: this.name
    });
  }

  sendOption() {
    this.answer.emit({
      type: this.type,
      data: this.option,
      name: this.name
    });
  }
}
