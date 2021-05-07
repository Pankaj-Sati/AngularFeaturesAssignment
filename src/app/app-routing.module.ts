import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page404Component } from './features/page404/page404.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'feature-1',
    pathMatch:'full'
  },
  {
    path:'feature-1',
    loadChildren:()=>import('./features/feature-1/feature-1.module').then(module=>module.Feature1Module)
  },
  {
    path:'feature-2',
    loadChildren:()=>import('./features/feature-2/feature-2.module').then(module=>module.Feature2Module)
  },
  {
    path:'feature-3',
    loadChildren:()=>import('./features/feature-3/feature-3.module').then(module=>module.Feature3Module)
  },
  {
    path:'feature-4',
    loadChildren:()=>import('./features/feature-4/feature-4.module').then(module=>module.Feature4Module)
  },
  {
    path:'feature-5',
    loadChildren:()=>import('./features/feature-5/feature-5.module').then(module=>module.Feature5Module)
  },
  {
    path:'feature-6',
    loadChildren:()=>import('./features/feature-6/feature-6.module').then(module=>module.Feature6Module)
  },
  {
    path:'**',
    component:Page404Component

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
