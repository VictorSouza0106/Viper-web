import { NgModule } from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconComponent } from './components/icon/icon.component';
import { ThreeLoaderComponent } from './components/three-loader/three-loader.component';
import { CarouselScheduleComponent } from './components/carousel-schedule/carousel-schedule.component';
import {MatDialogModule} from '@angular/material/dialog';
import { ScheduleDialogComponent } from './components/schedule-dialog/schedule-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    IconComponent,
    ThreeLoaderComponent,
    CarouselScheduleComponent,
    ScheduleDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatDialogModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(iconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    iconRegistry.addSvgIconSet(
      domSanitizer.bypassSecurityTrustResourceUrl('./assets/mdi.svg')
    );
  }
 }
