import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonListHeader, IonLabel, IonList, IonItem, IonThumbnail } from '@ionic/angular/standalone';
import { MyData } from '../services/my-data';
import { MyHttp } from '../services/my-http';
import { HttpOptions } from '@capacitor/core';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonBackButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonListHeader, IonLabel, IonList, IonItem, IonThumbnail]
})
export class MovieDetailsPage {
  movie: any = null;
  isFavourite: boolean = false;
  cast: any[] = [];
  crew: any[] = [];
  showAllCast: boolean = false;
  
  constructor (private myHttp: MyHttp, private mds: MyData) { }

  async ionViewWillEnter() {
    const movieId = await this.mds.get('movie_id');
    
    if (movieId) {
      await this.loadMovieDetails(movieId);
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
    if (this.showAllCast) {
      return this.cast;
    } else {
      return this.cast.slice(0, 5);
    }
}

  async addToFavourites() {
    if (this.movie !== null) {
      let favourites = await this.mds.get('favourites');
      if (favourites === null) {
        favourites = [];
      }
      let isExisting = false;
      let existingIndex = -1; 
      for (let i = 0; i < favourites.length; i++) {
        let currentMovie = favourites[i];
        if (currentMovie.id === this.movie.id) {
          isExisting = true;
          existingIndex = i;
        }
      }
      if (isExisting === false) {
        favourites.push(this.movie);
        await this.mds.set('favourites', favourites);
        this.isFavourite = true; 
        alert('Movie added to favourites!');
      } else {
        favourites.splice(existingIndex, 1); 
        await this.mds.set('favourites', favourites);
        this.isFavourite = false; // Кнопка меняется обратно
        alert('Movie removed from favourites!');
      }
    }
  }
}


