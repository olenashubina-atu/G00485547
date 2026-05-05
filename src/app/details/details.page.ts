import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';
import { MyData } from '../services/my-data';
import { MyHttp } from '../services/my-http';
import { HttpOptions } from '@capacitor/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonBackButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent]
})
export class DetailsPage {
  movie: any = null;
  
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
  }
}


