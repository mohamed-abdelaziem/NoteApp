import { Injectable, signal } from "@angular/core";

@Injectable({
providedIn :"root"
})

export class LoaderService {

isLoading  = signal<boolean>(false);

showLoader(){
this.isLoading.set(true);
}

hideLoader(){
this.isLoading.set(false);
}


}