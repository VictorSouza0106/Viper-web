import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarouselScheduleComponent } from './components/carousel-schedule/carousel-schedule.component';
import { ThreeLoaderComponent } from './components/three-loader/three-loader.component';

const routes: Routes = [
  {
    path:"home",
    component: ThreeLoaderComponent,
  },
  {
    path:'cards',
    component: CarouselScheduleComponent,
  },
  {
    path:"**",
    pathMatch:'full',
    component:ThreeLoaderComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
