import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { AuthService } from '../../../core/auth/auth.service';
import { initFlowbite } from 'flowbite';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
_authService = inject(AuthService);
private _cookie = inject(CookieService);
private _router = inject(Router);

ngOnInit(): void {
initFlowbite();
}



logOut(){
this._cookie.delete('token');
this._authService.isLoadedUser.set(false);
this._router.navigate(['/login']);
}


}
