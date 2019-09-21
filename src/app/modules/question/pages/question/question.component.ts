import { AfterContentInit, Component, ContentChildren, EventEmitter, Input, OnDestroy, Output, QueryList } from '@angular/core';
import { AnswerComponent } from '../answer/answer.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Ianswer } from '../../models/Ianswer';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements AfterContentInit, OnDestroy {
  @Input() title: string;
  @Input() question: string;
  @Input() call: (n: number, step: string) => void;
  @Output() answer: EventEmitter<Ianswer> = new EventEmitter<Ianswer>();
  @ContentChildren(AnswerComponent) answers: QueryList<AnswerComponent>;
  private unsubscribe: Subject<void> = new Subject();

  constructor() { }

  ngAfterContentInit(): void {
    this.answers.forEach((panel) => {
      console.log(panel.title);
      panel.answer.pipe(takeUntil(this.unsubscribe)).subscribe(event => this.answer.emit(event));
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
