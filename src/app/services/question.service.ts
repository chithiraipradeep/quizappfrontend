import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { QuestionData } from '../models/question-data.model';
import { Subject } from 'rxjs';

import { environment } from "../../environments/environment";
import { AuthService } from './auth.service';

const apiUrl = environment.apiUrl;

declare var window;

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private questions: QuestionData[] = [];
  private questionsUpdated = new Subject<{ questions: QuestionData[]}>();

  constructor(private http: HttpClient, private authService: AuthService) { }

  getData() {
    return this.http.get<{ questions: QuestionData[] }>(apiUrl + '/question');
  }

  getquestions() {
    this.http.get<{ questions: QuestionData[] }>(apiUrl + '/question')
    .subscribe((questions) => {
      this.questions = questions.questions;
      this.questionsUpdated.next({ questions: this.questions });
    });
  }

  getQuestionsUpdateListener() {
    return this.questionsUpdated.asObservable();
  }

  postData(data) {
    return this.http.post(apiUrl + '/question',data);
  }

  updateData(data) {
    return this.http.post(apiUrl + '/question/update',data);
  }

  deletedata(id) {
    const data={id:id};
    return this.http.post(apiUrl + '/question/delete',data);
  }

 

  sendMarks(marks: number) {
    let username = localStorage.getItem("username");
    const data = {
      username: username,
      marks: marks
    };
    this.http.post(apiUrl + "/question/mark", data)
    .subscribe(response => {
        console.log(response);
        alert('Your Submission has been made! Thank You. You score is '+marks);
        setTimeout(() => {
          window.header.logout();
        }, 2000);
    });
}






}
