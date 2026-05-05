import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { MyData } from '../services/my-data';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonBackButton]
})
export class DetailsPage implements OnInit{
  savedWord: string = '';

  constructor (private mds: MyData) { }

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    this.savedWord = await this.mds.get('test_kw'); 
    console.log(this.savedWord); 
  }

}
