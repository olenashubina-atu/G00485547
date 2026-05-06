import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonButton, IonInput, IonList, IonThumbnail, IonButtons, IonIcon } from '@ionic/angular/standalone';
import { MyData } from '../services/my-data';
import { NavController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MyHttp } from '../services/my-http';
import { HttpOptions } from '@capacitor/core';
import { addIcons } from 'ionicons';
import { heart } from 'ionicons/icons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, FormsModule, IonList, IonThumbnail, CommonModule, IonButton, IonInput, IonButtons, IonIcon, RouterLink],
})
export class HomePage implements OnInit {
  studentNumber: string = 'G00485547';
  movies: any[] = []; 
  testKeyword: string = '';
  searchTerm: string = '';

  constructor(private navCtrl: NavController, private mds: MyData, private myHttp: MyHttp) {
    addIcons({ heart });
  }
  
  ngOnInit() {
    this.loadTrending();
  }

  async loadTrending() {
    let options: HttpOptions = {
      url: this.myHttp.baseUrl + '/trending/movie/day?api_key=' + this.myHttp.apiKey
    };
    const result = await this.myHttp.get(options);
    this.movies = result.data.results;
  }

  
  async searchMovies() {
    if (this.searchTerm.trim() === '') {
      this.loadTrending();
      return;
    }
    let options: HttpOptions = {
      url: this.myHttp.baseUrl + '/search/movie?api_key=' + this.myHttp.apiKey + '&query=' + this.searchTerm
    }; 
    const result = await this.myHttp.get(options);
    this.movies = result.data.results; 
  }

    
    
  async openDetails(movie: any) {
    await this.mds.set('movie_id', movie.id); 
    this.navCtrl.navigateForward(['/details']);
  }
}
