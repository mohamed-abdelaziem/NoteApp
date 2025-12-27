import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EndPoint } from '../base/endPoint';
import { INote } from '../interfaces/note.interface';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  
private _http = inject(HttpClient);



addNote(data : any):Observable<any>{
return this._http.post<any>(`${EndPoint.endPoint}/notes` , data);
}


getUserNotes():Observable<{msg : string , notes : INote[]}>{
return this._http.get<{msg : string , notes : INote[]}>(`${EndPoint.endPoint}/notes`);
}



deleteNote(noteId : string):Observable<any>{
return this._http.delete(`${EndPoint.endPoint}/notes/${noteId}`);
}


updateNote(data : any , noteId : string) : Observable<any> {
return this._http.put(`${EndPoint.endPoint}/notes/${noteId}` , data);
}


}
