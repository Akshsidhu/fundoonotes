import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { constructor } from 'q';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss']
})
export class ReminderComponent implements OnInit {
events = new EventEmitter()

  @Input("note") note;


  time = new FormControl('', [])
  date = new FormControl('', [])

  constructor(private noteSvvc: NoteService) {
  }

  ngOnInit() {
  }


  showTime() {
    let reminder = this.dateFormat(this.date.value) + "T" + this.timeFormat(this.time.value);
    console.log(reminder);
    this.addReminder(reminder);
  }

  dateFormat(date: Date) {
    let givenDate = new Date(date);
    let selectedDate = givenDate.getFullYear() + "-" + (1 + givenDate.getMonth()) + "-" +
      (givenDate.getDate().toString().length > 1 ? givenDate.getDate() : "0" + givenDate.getDate());
    return selectedDate;
  }

  timeFormat(time) {
    let hours = time.split(" ")[0].split(":")[0];
    let minutes = time.split(" ")[0].split(":")[1];
    let amPm = time.split(" ")[1];
    if (hours.length < 2) hours = "0" + hours;
    if (amPm === "PM") {
      hours = parseInt(hours) + 12;
    } else {
      if (parseInt(hours) === 24) hours = "00"
    }
    return (hours + ":" + minutes);
  }

  addReminder(reminder) {
    console.log(this.note);
     this.noteSvvc.addReminder({
      noteIdList: [this.note.id],
      reminder: reminder
    })
  }
    

  

}
