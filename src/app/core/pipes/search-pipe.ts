import { Pipe, PipeTransform } from '@angular/core';
import { INote } from '../interfaces/note.interface';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(arr: INote[], searchTerm : string): INote[] {
   return arr.filter((note)=> note.title.toLowerCase().includes(searchTerm.toLowerCase()) || note.content.toLowerCase().includes(searchTerm.toLowerCase()))
  }

}
