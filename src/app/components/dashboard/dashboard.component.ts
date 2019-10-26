import { Component, OnInit, EventEmitter } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { FormControl, Validators } from '@angular/forms';
import { NoteService } from 'src/app/services/note.service'
import { Router, ActivatedRoute } from '@angular/router';
import { getDefaultService } from 'selenium-webdriver/edge';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-components/dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  events = new EventEmitter();
  
  searchString:string;
  hideNoteBar: Boolean = false;
  hide: Boolean = false;
  hideLogo: Boolean = false;
  advancedUser: Boolean = true;
  service:string;
  searchData = {
    data:''
  };

  noteColor = new FormControl('#FFFFFF');



  title = new FormControl('', [
    Validators.required
  ])

  content = new FormControl('', [
  ])

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private titleService: Title, private breakpointObserver: BreakpointObserver, private noteSvc: NoteService , private router : Router , private route:ActivatedRoute, private usvc: UserServiceService) {
    this.setTitle('Dashboard');
    this.getService();
    this.usvc.events.addListener('advance-service', ()=>{
      this.getService()
         
    })
  
    this.usvc.events.addListener('basic-service', ()=>{
      this.getService()
         
    })
  }
  ngOnInit(): void { 
  }
  getService(){
    this.service=sessionStorage.getItem('service');
    console.log(this.service);
  }

  changeHide() {
    this.hide = !this.hide;
  }

  setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  allNotes(){
    this.hideNoteBar = false;
    this.router.navigate(['allNotes'] , {
      relativeTo : this.route
    }
     )
  }

  saveNote() {
    let data = {
      title: this.title.value,
      description: this.content.value,
      color: this.noteColor.value
    }
    this.noteSvc.saveNote(data);
    this.title.setValue("");
    this.content.setValue("");
    this.noteColor.setValue("#FFFFFF");
  }
  
  fetchDeletedNotes(){
    this.hideNoteBar = true;
    //console.log("button chal raha hai")
    this.router.navigate(['deleted'],{
       relativeTo: this.route
    });
  }

  fetchArchiveNotes(){
    //console.log(this.searchString)
    this.hideNoteBar = true;
    //console.log("button chal raha hai")
    this.router.navigate(['archive'],{
       relativeTo: this.route
    });
  }
  logout(){
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigateByUrl('login');
  }
  onStatusChanged(finished: Boolean) {
    if(finished) {
      this.noteSvc.searchData(this.searchData.data);
    }
  }


  clearSearch() {
    this.searchData.data = '';
  }

}