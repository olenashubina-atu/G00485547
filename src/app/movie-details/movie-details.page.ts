import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonListHeader, IonLabel, IonList, IonItem, IonThumbnail, IonIcon } from '@ionic/angular/standalone';
import { MyData } from '../services/my-data';
import { MyHttp } from '../services/my-http';
import { HttpOptions } from '@capacitor/core';
import { NavController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { heart, heartOutline, home } from 'ionicons/icons';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, 
    IonBackButton, IonCard, IonCardHeader, IonCardTitle, 
    IonCardContent, IonButton, IonListHeader, IonLabel, 
    IonList, IonItem, IonThumbnail, IonIcon, CommonModule, FormsModule
  ]
})
export class MovieDetailsPage {
  movie: any = null;
  isFavourite: boolean = false;
  cast: any[] = [];
  crew: any[] = [];
  showAllCast: boolean = false;
  
  constructor (private myHttp: MyHttp, private mds: MyData, private navCtrl: NavController) {
    addIcons({ home, heart, heartOutline });
  }

  async ionViewWillEnter() {
    const movieId = await this.mds.get('movie_id');
    if (movieId) {
      await this.loadMovieDetails(movieId);
      await this.checkIfFavourite();
    }
  }

  goHome() {
    this.navCtrl.navigateRoot('/home');
  }

  goFavourites() {
    this.navCtrl.navigateForward('/favourites');
  }

  async checkIfFavourite() {
    const favourites = await this.mds.get('favourites') || [];
    if (this.movie) {
      this.isFavourite = favourites.some((m: any) => m.id === this.movie.id);
    }
  }

  async loadMovieDetails(id: string) {
    let options: HttpOptions = {
      url: this.myHttp.baseUrl + '/movie/' + id + '?api_key=' + this.myHttp.apiKey
    };
    
    const result = await this.myHttp.get(options);
    this.movie = result.data; 

    let creditsOptions: HttpOptions = {
      url: this.myHttp.baseUrl + '/movie/' + id + '/credits?api_key=' + this.myHttp.apiKey
    };
    const creditsResult = await this.myHttp.get(creditsOptions);
    this.cast = creditsResult.data.cast; 
    this.crew = creditsResult.data.crew;
  }

  get visibleCast() {
    return this.showAllCast ? this.cast : this.cast.slice(0, 5);
  }

  async openPersonDetails(id: number) {
    await this.mds.set('person_id', id);
    this.navCtrl.navigateForward(['/details']);
  }

  async addToFavourites() {
    if (this.movie !== null) {
      let favourites = await this.mds.get('favourites') || [];
      const index = favourites.findIndex((m: any) => m.id === this.movie.id);

      if (index === -1) {
        favourites.push(this.movie);
        this.isFavourite = true;
        alert('Movie added to favourites!');
      } else {
        favourites.splice(index, 1);
        this.isFavourite = false;
        alert('Movie removed from favourites!');
      }
      await this.mds.set('favourites', favourites);
    }
  }
}