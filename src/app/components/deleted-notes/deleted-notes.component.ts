import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-deleted-notes',
  templateUrl: './deleted-notes.component.html',
  styleUrls: ['./deleted-notes.component.scss']
})
export class DeletedNotesComponent implements OnInit {
  // hideNoteBar: Boolean = false;
  noteColor = new FormControl('#FFFFFF');
  deletedNotesList: Array<any> = [];
  notesView: Boolean = true;
  constructor(private svc: NoteService) {


    this.svc.events.addListener('deleted forever', () => {
      //Fetch all notes from database
      this.fetchDeletedNotes();
    }
    )

    this.svc.events.addListener('note-saved-again', () => {
      //Fetch all notes from database
      this.fetchDeletedNotes();
    })

    this.svc.events.addListener('note-deleted-in-archive', () => {
      //Fetch all notes from database
      this.fetchDeletedNotes();
    })
  }


  ngOnInit() {
    this.fetchDeletedNotes(); 
    this.svc.viewInfo.subscribe((data) => {
      // console.log("data", data);
      this.notesView = data;
    });
  }
  fetchDeletedNotes() {
    //console.log("from deleted.ts function")
    let obs = this.svc.fetchDeletedNotes();
    obs.subscribe((response: any) => {
      this.deletedNotesList = response.data.data;
      //console.log(response.data.data);
      //console.log("balle balle");
    }, (error) => {
      console.log(error);
    })
  }
  deleteForever(note) {
    let data = {
      noteIdList: [note.id]
    }
    this.svc.deleteForever(data);

  }

  saveNote(note) {
    let data = {
      noteIdList: [note.id],
      isDeleted: false
    }
    this.svc.saveRetrivedNote(data);
  }
  getBackgroundColor(arg) {
    return !arg ? '	#FFFFFF' : arg;
  }
}
