import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonList, IonItem, IonThumbnail, IonLabel } from '@ionic/angular/standalone';
import { MyData } from '../services/my-data';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonBackButton, IonList, IonItem, IonThumbnail, IonLabel]
})
export class FavouritesPage {
  favouriteMovies: any[] = [];

  constructor(private mds: MyData) { }

  async ionViewWillEnter() {
    this.favouriteMovies = await this.mds.get('favourites') || [];
    console.log(this.favouriteMovies);
  }
}
