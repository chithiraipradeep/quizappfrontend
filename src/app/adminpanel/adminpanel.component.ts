import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../services/question.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuestionData } from '../models/question-data.model';

declare var $;

@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.scss']
})
export class AdminpanelComponent implements OnInit {
  userForm: boolean;
  isNewUser: boolean;
  newUser: any = {};
  editUserForm: boolean;
  editedquestion: any = {};
  questionForm: FormGroup;
  submitted = false;
  questions: QuestionData[];
  constructor(private questionService: QuestionService, private formBuilder: FormBuilder) { }


  ngOnInit() {
    this.getData();
    this.questionForm = this.formBuilder.group({
      question: ['', [Validators.required]],
      option1: ['', [Validators.required]],
      option2: ['', [Validators.required]],
      option3: ['', [Validators.required]],
      option4: ['', [Validators.required]],
      answer: ['', [Validators.required,Validators.pattern("[0-9]*")]],
    });
  }

  get f() { return this.questionForm.controls; }

  
  onSubmit() {
    this.submitted = true;
    if (this.questionForm.invalid) {
      return;
    }
    this.questionService.postData(this.questionForm.value)
      .subscribe((response: any) => {
        console.log(response);
        $('#exampleModal').modal('hide');
        window.location.reload();
      })
  }

  getData() {
    this.questionService.getData()
      .subscribe((questions: any) => {
        console.log(questions)
        this.questions = questions.questions;
      });
  }

  removeUser(data) {
    let id = data._id;
    this.questionService.deletedata(id)
      .subscribe((data: any) => {
        if (data.status == true) {
          this.getData();
        }
      });
  }

  showEditUserForm(data) {
    this.editedquestion = data;
  }

  EditSubmit() {
    this.submitted = true;
    if (this.questionForm.invalid) {
      return;
    }

    var data = {
      _id: this.editedquestion._id,
      question: this.questionForm.value.question,
      option1: this.questionForm.value.option1,
      option2: this.questionForm.value.option2,
      option3: this.questionForm.value.option3,
      option4: this.questionForm.value.option4,
      answer: this.questionForm.value.answer
    };

    console.log(data);
    this.questionService.updateData(data)
    .subscribe((response: any) => {
      console.log(response);
      $('#exampleModal1').modal('hide');
      window.location.reload();
    })
  }



}

