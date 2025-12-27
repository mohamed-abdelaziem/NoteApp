import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth-guard';

export const routes: Routes = [

{
path : "",
redirectTo : "/home",
pathMatch : "full",
title : "Home"
},



{
canActivate : [AuthGuard],
path : "home",
loadComponent : ()=>import("./shared/components/home/home.component").then(file=>file.HomeComponent),
title : "home"
},


{
path : "register",
loadComponent : ()=>import("./shared/components/register/register.component").then(file=>file.RegisterComponent),
title : "register"
},

{
path : "login",
loadComponent : ()=>import("./shared/components/login/login.component").then(file=>file.LoginComponent),
title : "login"
},

{
path : "**",
loadComponent : ()=>import("./shared/components/notfound/notfound.component").then(file=>file.NotfoundComponent),
title : "notfound"
},


];
