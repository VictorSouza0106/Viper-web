import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { ScheduleDialogComponent } from '../schedule-dialog/schedule-dialog.component';

@Component({
  selector: 'app-carousel-schedule',
  templateUrl: './carousel-schedule.component.html',
  styleUrls: ['./carousel-schedule.component.scss']
})
export class CarouselScheduleComponent implements OnInit {

  constructor(
    private dialog: MatDialog,

  ) { }

  ngOnInit(): void {
  }

  private dateOfCard: Date = new Date();
  // scheduleJson = require ('../assets/schedule/schedule.json');
  public centerCard: number = 0;
  public array: any = Array(7);
  public openScheduleDialog(){

    const dialogRef = this.dialog.open(ScheduleDialogComponent);

    dialogRef.afterClosed().subscribe(result => {})
  }
  

  public setCenterIndex(newIndex: number){
    if(newIndex != this.centerCard){
      let a = (newIndex - this.centerCard);
      let diffDate: number = 0;
      
      if(Math.abs(a) > 3){
        a = (a%7)*-1;
        diffDate = 7 - Math.abs(a);
      }else{
        diffDate = Math.abs(a);
      }
      
      if(a > 0){
        this.dateOfCard.setDate(this.dateOfCard.getDate() + Math.abs(diffDate));
      }else{
        this.dateOfCard.setDate(this.dateOfCard.getDate() - Math.abs(diffDate));
      }
      this.centerCard = newIndex;
    }
  }

  public getCardContent(){ 
    //a = JSON.parse('');
  }

  public getDateOfCard(cardIndex: number){
    
    let date: Date = new Date(this.dateOfCard);
    let diffDate: number = 0;

    if(cardIndex != this.centerCard){
      let a = (cardIndex - this.centerCard);

      if(Math.abs(a) > 3){
        a = (a%7)*-1;
        diffDate = 7 - Math.abs(a);
      }else{
        diffDate = Math.abs(a);
      }
      
      if(a > 0){
        date.setDate(date.getDate() + Math.abs(diffDate));
      }else{
        date.setDate(date.getDate() - Math.abs(diffDate));
      }
    }
    return moment(date).format('DD/MM/YYYY');
  }
}