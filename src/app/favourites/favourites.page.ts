import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonList, IonItem, IonThumbnail, IonLabel, IonButton, IonIcon, IonCard, IonCardContent } from '@ionic/angular/standalone';
import { MyData } from '../services/my-data';
import { NavController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { trash } from 'ionicons/icons';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonBackButton, IonList, IonItem, IonThumbnail, IonLabel, IonButton, IonIcon, IonCard, IonCardContent]
})
export class FavouritesPage {
  favouriteMovies: any[] = [];

  constructor(private mds: MyData, private navCtrl: NavController) {
    addIcons({ trash });
   }

  async ionViewWillEnter() {
    this.favouriteMovies = await this.mds.get('favourites') || [];
    console.log(this.favouriteMovies);
  }

  async goToDetails(id: number) {
    await this.mds.set('movie_id', id); 
    this.navCtrl.navigateForward(['/movie-details']);
  }


  async removeFromFavourites(id: number) {
    let list = await this.mds.get('favourites');
    
    if (list !== null) {
      let newList = [];
      
      for (let i = 0; i < list.length; i++) {
        if (list[i].id !== id) {
          newList.push(list[i]);
        }
      }
      
      await this.mds.set('favourites', newList);
      this.favouriteMovies = newList; 
    }
  }
}
