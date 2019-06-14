import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { NologinGuard } from './guards/nologin.guard';

const routes: Routes = [
  { path: '', redirectTo: 'landingPage', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule', canActivate: [AuthGuard] },
  { path: 'login', loadChildren: './componentes/login/login.module#LoginPageModule', canActivate: [NologinGuard] },
  { path: 'registro', loadChildren: './componentes/registro/registro.module#RegistroPageModule', canActivate: [NologinGuard] },
  { path: 'landingPage', loadChildren: './componentes/landing-page/landing-page.module#LandingPagePageModule', canActivate: [NologinGuard] },
  { path: 'info/:item', loadChildren: './componentes/info/info.module#InfoPageModule', canActivate: [AuthGuard] },
  { path: 'explorar', loadChildren: './componentes/explorar/explorar.module#ExplorarPageModule', canActivate: [AuthGuard] }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
