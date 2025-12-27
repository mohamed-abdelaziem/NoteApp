import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { NavbarComponent } from "./shared/components/navbar/navbar.component";
import { LoaderComponent } from "./shared/components/loader/loader.component";
import { AuthService } from './core/auth/auth.service';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, LoaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('note');
  private _authService = inject(AuthService);
  private _cookie = inject(CookieService);
  private _router = inject(Router)

  constructor(){

    if(!!this._cookie.get('token')){
      this._authService.isLoadedUser.set(true);
      this._router.navigate(['/home']);
    }else{
      this._authService.isLoadedUser.set(false);
      this._router.navigate(['/login']);
    }

  }

  ngOnInit(): void {
    // init flowbite
    initFlowbite();
  }


}
