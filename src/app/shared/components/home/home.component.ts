import { Component, ElementRef, inject, OnInit, viewChild, ViewChild } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { NotesService } from '../../../core/services/notes.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoaderService } from '../../../core/services/loader.service';
import { ToastrService } from 'ngx-toastr';
import { INote } from '../../../core/interfaces/note.interface';
import { DatePipe } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { SearchPipe } from '../../../core/pipes/search-pipe';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule , DatePipe , SearchPipe , FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit{

  private _notes = inject(NotesService);
  _loaderService = inject(LoaderService);
  private _tostar = inject(ToastrService);
  notes : INote[] = [];
  private _cookie = inject(CookieService);
  searchTerm : string = '';
  _isShowOfUpdateForm  = false;
  idOfClickedNote : string = '';

  @ViewChild('closeBtn')
  closeBtn !: ElementRef



  @ViewChild('closeBtnOfUpdate')
  closeBtnOfUpdate !: ElementRef ;


  addNoteForm : FormGroup = new FormGroup({
    title : new FormControl(null , [Validators.required , Validators.minLength(3),Validators.maxLength(10)]),
    content : new FormControl(null , [Validators.required , Validators.minLength(3)]),
  })





   updateNoteForm : FormGroup = new FormGroup({
    title : new FormControl(null , [Validators.required , Validators.minLength(3),Validators.maxLength(10)]),
    content : new FormControl(null , [Validators.required , Validators.minLength(3)]),
  })




  addNote(){
    if(this.addNoteForm.invalid){
      this.addNoteForm.markAllAsTouched();
      return;
    }


    this._notes.addNote(this.addNoteForm.value).subscribe({
      next : (res)=>{
        console.log(res);
        this._tostar.success('The Note Added Success');
        this.getUserNotes();
        this.addNoteForm.reset();
        this.closeBtn.nativeElement.click();
        

      },
      error:(err)=>{
        console.log(err);
        this._tostar.error('Please Try Again')
      }


    })

  }



ngOnInit(): void {
  initFlowbite();
  this.getUserNotes();
}



ngAfterViewInit(): void {
  initFlowbite()
}


getUserNotes(){
this._notes.getUserNotes().subscribe({
next : (res)=>{
this.notes = res.notes;
console.log('From Get user notes ' , res);
},
error:(err)=>{
console.log('From Get User Notes' , err);
}


})
}



deleteNote(noteId : string) {
this._notes.deleteNote(noteId).subscribe({
next : (res)=>{
this.getUserNotes();
this._tostar.success('Note Deleted Success');
},

error : (err)=>{
this._tostar.error("Can't Delete Note Please Try Again")
}


})


}



SetToUpdateNote(note : INote){
this._isShowOfUpdateForm = true;
this.updateNoteForm.patchValue(note);
this.idOfClickedNote = note._id;
}


updateNote(){
if(this.updateNoteForm.invalid){
this.updateNoteForm.markAllAsTouched();
return;
}

this._notes.updateNote(this.updateNoteForm.value , this.idOfClickedNote).subscribe({
next : (res)=>{
this._tostar.success('The Note Is Updated');
this.getUserNotes();
this.closeBtnOfUpdate.nativeElement.click();
},
error : (err)=>{
this._tostar.error('Please Try Again');
this.closeBtnOfUpdate.nativeElement.click();
}


})




}



  
}
