import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-question-answer',
  templateUrl: './question-answer.component.html',
  styleUrls: ['./question-answer.component.scss']
})
export class QuestionAnswerComponent implements OnInit {

  noteId: any;
  question = new FormControl('', [])
  hideEditor: Boolean;
  data: any
  events = new EventEmitter()
  email: any


  note = {
    title: "",
    description: "",
    questionAndAnswerNotes: [{
      message: "",
      user: {
        firstName: ""
      }
    },
    ]
  }

  constructor(private route: ActivatedRoute, private nsvc: NoteService) {
    this.nsvc.events.addListener('question-asked', () => {
      this.getQuestion()
    })

  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.noteId = params.get('noteId');

    })
    this.getQuestion()
    this.hideEditor = false;

  }

  getQuestion() {
    this.email = localStorage.getItem('fName')
    let obs1 = this.nsvc.getQuestion(this.noteId)
    obs1.subscribe((response: any) => {
      this.note = response.data.data[0]
      console.log(this.note)
    })
  }
  showQuestion() {
    this.data = {
      message: this.question.value,
      notesId: this.noteId
    }
    this.hideEditor = true;
    this.nsvc.showQuestion(this.data)
    this.question.reset()
    // obs.subscribe((response:any)=>{
    //   console.log("puch lia question")

  }


}
