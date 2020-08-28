import { Component, OnInit, OnDestroy } from '@angular/core';
import { QuestionData } from '../models/question-data.model';
import { Subscription, Subject } from 'rxjs';
import { QuestionService } from '../services/question.service';

@Component({
  selector: 'app-userpanel',
  templateUrl: './userpanel.component.html',
  styleUrls: ['./userpanel.component.scss']
})
export class UserpanelComponent implements OnInit {
  
  isLoading = false;
  questions: QuestionData[] = [];
  private questionsSub: Subscription;

  isTimeUp = false;
  
  answer = new Array(10).fill("0");
  correctAnswer = new Array(10).fill(0);

  marks = 0;

  constructor(public questionService: QuestionService) { }

  ngOnInit() {
    this.isLoading = true;
    this.questionService.getquestions();
    this.questionsSub = this.questionService.getQuestionsUpdateListener()
    .subscribe((questionData: { questions: QuestionData[] }) => {
      this.isLoading = false;
      this.questions = questionData.questions;
      console.log(this.questions);
      for (let q =0; q < this.questions.length; q++) {
        this.correctAnswer[q] = this.questions[q].answer;
      }
      // console.log(this.correctAnswer);
      // let timer = setTimeout(() => {
      //   this.isTimeUp = true;
      //   // console.log(this.answer);
      // }, 300000);
    });
  }

  onSubmit() {
    for (let a = 0; a < 10; a++) {
      if(this.answer[a] === this.correctAnswer[a]) {
        this.marks += 1;
      }
    }
    console.log(this.marks);
    this.questionService.sendMarks(this.marks);
  }

  ngOnDestroy() {
    this.questionsSub.unsubscribe();
  }
}

