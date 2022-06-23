import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'viperyWeb';

  constructor(
    private router: Router,
  ){
  }

  public goTo(path: string){
    this.router.navigateByUrl(path);
  }
}
