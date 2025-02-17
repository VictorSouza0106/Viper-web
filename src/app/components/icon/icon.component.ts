import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {

  @Input() iconName:string = 'snake';
  @Input() size:number = 24;
  @Input() link:string = 'https://www.twitch.tv/viperydae';

  constructor() { }

  ngOnInit(): void {
  }

}
