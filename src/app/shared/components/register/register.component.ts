import { Component, inject } from '@angular/core';
import { LoaderService } from '../../../core/services/loader.service';
import { AuthService } from '../../../core/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
_loaderService = inject(LoaderService);
private _authService = inject(AuthService);
private tostar = inject(ToastrService);
private _router = inject(Router);

registerForm : FormGroup = new FormGroup({
name: new FormControl("" , [Validators.required , Validators.minLength(4) , Validators.maxLength(10)]),
email: new FormControl(null , [Validators.required , Validators.email]),
password: new FormControl(null , [Validators.pattern(/^\w{3,15}$/)]),
age:new FormControl(null , [Validators.required , Validators.min(18) , Validators.max(40)]),
phone : new FormControl(null , [Validators.required , Validators.pattern(/^01[0152][0-9]{8}$/)])
})



register(){
if(this.registerForm.invalid){
this.registerForm.markAllAsTouched();
return;
}
console.log('hello register');
this._authService.register(this.registerForm.value).subscribe({
next : (res)=>{
this._router.navigate(['/login']);
this.registerForm.reset();
console.log(res);
},
error : (err)=>{
this.tostar.error(err.msg);
console.log(err);

}
})




}



}
