import { Component, OnInit, Input } from '@angular/core';
import { NoteService } from 'src/app/services/note.service';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { DialogComponent} from 'src/app/components/dialog/dialog.component'
import { CollaboratorComponent } from '../collaborator/collaborator.component';
import { UserServiceService } from 'src/app/services/user-service.service';

export interface DialogData{
  noteId:string,
  title:string,
  description:string,
  color:string,
  user:string,
  service:string,
  collaborator:string[]
}

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit  {

  //events = new EventEmitter();
  service:any
  collaboratorList: Array<any>=[]; 
  noteColor = new FormControl('#FFFFFF');
  notesList: Array<any> = [];
  @Input() search;

  constructor(private noteSvc: NoteService , private dialog : MatDialog , private usvc : UserServiceService) {

    this.noteSvc.events.addListener('note-saved-in-database', () => {
      //Fetch all notes from database
      this.fetchAllNotes();
    })
    this.getService();
    
    this.usvc.events.addListener('basic-service', () => {
      //Fetch all notes from database
      this.getService();
      this.fetchAllNotes();
    }) 
    this.usvc.events.addListener('advance-service', () => {
      //Fetch all notes from database
      this.getService();
      this.fetchAllNotes();
    })

    this.noteSvc.events.addListener('collaborator-removed', () => {
      //Fetch all notes from database
      this.fetchAllNotes();
    })

    this.noteSvc.events.addListener('collaborator-added', () => {
      //Fetch all notes from database
      this.fetchAllNotes();
    })

    this.noteSvc.events.addListener('note-pined/unpined', () => {
      //Fetch all notes from database
      this.fetchAllNotes();
    })
     
    this.noteSvc.events.addListener('note-updated-in-database', () => {
      //Fetch all notes from database
      this.fetchAllNotes();
    })

    this.noteSvc.events.addListener('note-deleted-in-database', () => {
      //Fetch all notes from database
      this.fetchAllNotes();
    })

    this.noteSvc.events.addListener('note-archived-in-database', () => {
      //Fetch all notes from database
      this.fetchAllNotes();
    })

    this.noteSvc.events.addListener('note-color-changed-in-database', () => {
      //Fetch all notes from database
      this.fetchAllNotes();
    })

    this.noteSvc.events.addListener('note-saved-again', () => {
      //Fetch all notes from database
      this.fetchAllNotes();})
    
      this.noteSvc.events.addListener('note-unarchived', () => {
        //Fetch all notes from database
        this.fetchAllNotes();
    })
  }

  //Fetch all notes
  getService(){
    this.service=localStorage.getItem('service')
    console.log("apki service ka nam hai :"+this.service)
  }

  fetchAllNotes() {
    let obs = this.noteSvc.fetchAllNotes();

    obs.subscribe((response) => {
      this.notesList = response.data.data;
      console.log(response.data.data[0].user.email)
    }, (error) => {
      console.log(error);
    })
  }

  //Fetch all the existing notes from database
  ngOnInit() {
    this.fetchAllNotes();
    this.noteSvc.currentDataSearch.subscribe((search:any) => {
      this.search = search
    })
  }

  //Delete a Note
  deleteNote(note) {
    let data = {
      noteIdList: [note.id],
      isDeleted: true
    }
    this.noteSvc.deleteNote(data);  
  }

  //archive a note
  archiveNote(note) {
    let data = {
      noteIdList: [note.id],
      isArchived: true
    }
    this.noteSvc.archiveNote(data);  
  }

  getBackgroundColor(arg) {
    return !arg ? '	#FFFFFF' : arg;
  }

  changeColor(card) {
    let data = {
      noteIdList: [card.id],
      color: this.noteColor.value
    };
    this.noteSvc.changeNoteColor(data);
  }
  openDialog(note){
   
    this.dialog.open(DialogComponent , {
      width:"250px",
      data:{
        noteId:note.id,
        title:note.title,
        description:note.description,
        color:note.color,
        user:note.user.email
        //collaborators:note.collaborators.firstName

      }
    })
  }
  pinNote(note){
    let data = {
      noteIdList: [note.id],
      isPined: true
    }
    this.noteSvc.pinNote(data);
  }

unPinNote(note){
  let data = {
    noteIdList: [note.id],
    isPined: false
  }
  this.noteSvc.pinNote(data);

}

addCollab(note){
  // this.events.emit('fetch-collaborators')
  this.dialog.open(CollaboratorComponent,{
    width:"450px",
    data:{
      noteId:note.id,
      title:note.title,
      description:note.description,
      color:note.color,
      user:note.user.email,
      collaborator:note.collaborators
      }
    })
   
  
}
}


    

