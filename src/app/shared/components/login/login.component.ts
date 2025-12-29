import { Component, inject } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../../core/auth/auth.service';
import { LoaderService } from '../../../core/services/loader.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

private _authService = inject(AuthService);
private _cookieService = inject(CookieService);
_loaderService = inject(LoaderService);
private _router = inject(Router);
private _tostar = inject(ToastrService);

// login controller
loginForm : FormGroup = new FormGroup({
email : new FormControl("" , [Validators.required , Validators.email]),
password : new FormControl("" , [Validators.required , Validators.pattern(/^\w{3,15}$/)]),
});


// login func
login(){
if(this.loginForm.invalid){
this.loginForm.markAllAsTouched();
return;
}

this._authService.login(this.loginForm.value).subscribe({
next : (res)=>{
this._cookieService.set('token' ,`3b8ny__${res.token}`);
this._authService.isLoadedUser.set(true);
this._router.navigate(['/home']);
},
error : (err)=>{
this._tostar.error(err.message);
}
})


}





}
