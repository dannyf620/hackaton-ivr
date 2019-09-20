import { AfterContentInit, Component, ContentChildren, EventEmitter, Input, OnDestroy, Output, QueryList } from '@angular/core';
import { AnswerComponent } from '../answer/answer.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements AfterContentInit, OnDestroy {
  @Input() title: string;
  @Input() call: (n: number, step: string) => void;
  @Output() answer: EventEmitter<number> = new EventEmitter<number>();
  @ContentChildren(AnswerComponent) answers: QueryList<AnswerComponent>;
  private unsubscribe: Subject<void> = new Subject();

  constructor() { }

  ngAfterContentInit(): void {
    this.answers.forEach((panel) => {
      console.log(panel.title);
      // panel.answer.pipe(takeUntil(this.unsubscribe)).subscribe(this.answer.emit);
      panel.answer.pipe(takeUntil(this.unsubscribe)).subscribe(answer => {this.call(answer.item || -1, answer.step); });
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
