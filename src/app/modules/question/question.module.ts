import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionComponent } from './pages/question/question.component';
import { AnswerComponent } from './pages/answer/answer.component';
import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { PhoneComponent } from './pages/phone/phone.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [QuestionComponent, AnswerComponent, PhoneComponent],
  exports: [
    QuestionComponent,
    AnswerComponent,
    PhoneComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ]
})
export class QuestionModule { }
