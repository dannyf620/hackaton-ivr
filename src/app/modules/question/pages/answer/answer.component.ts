import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit {
  @Input() number: number;
  @Input() title: string;
  @Input() url?: string;
  @Output() answer: EventEmitter<{ item?: number, step?: string }> = new EventEmitter();
  @Input() type: string;
  option: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  select() {
    if (this.url) {
      this.http.post(this.url, {})
        .pipe(map(data => data))
        .subscribe((nextStep: string) => {
            this.answer.emit({step: nextStep});
          },
          () => {
            console.log('stepUrl');
            this.answer.emit({step: 'eresCliente'});
          }
        );
    } else {
      console.log('normalStep');
      this.answer.emit({item: this.number});
    }
  }

  sendOption() {
    this.http.post(this.option, {})
      .pipe(map(data => data))
      .subscribe((nextStep: string) => {
          this.answer.emit({step: nextStep});
        },
        () => {
          console.log('stepUrl');
          this.answer.emit({step: 'eresCliente'});
        }
      );
  }
}
