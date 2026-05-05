import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonButton, IonInput, IonList, IonThumbnail } from '@ionic/angular/standalone';
import { MyData } from '../services/my-data';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MyHttp } from '../services/my-http';
import { HttpOptions } from '@capacitor/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, FormsModule, IonList, IonThumbnail, CommonModule, IonButton, IonInput],
})
export class HomePage implements OnInit {
  studentNumber: string = 'G00485547';
  movies: any[] = []; 
  
  apiKey: string = '70b2a2787a3fb6f37ef3c1c565cec19d';
  baseUrl: string = 'https://api.themoviedb.org/3';
  testKeyword: string = '';
  searchTerm: string = '';

  constructor(private router: Router, private mds: MyData, private myHttp: MyHttp) {}
  
  ngOnInit() {
    this.loadTrending();
  }

  async loadTrending() {
    let options: HttpOptions = {
      url: this.baseUrl + '/trending/movie/day?api_key=' + this.apiKey
    };
    const result = await this.myHttp.get(options);
    this.movies = result.data.results;
    
    console.log("Загруженные фильмы:", this.movies);
  
  }

  
  async searchMovies() {
    if (this.searchTerm.trim() === '') {
      this.loadTrending();
      return;
    }
    let options: HttpOptions = {
      url: this.baseUrl + '/search/movie?api_key=' + this.apiKey + '&query=' + this.searchTerm
    }; 
    const result = await this.myHttp.get(options);
    this.movies = result.data.results; 
  }

    
    
  async testStorage() {
    await this.mds.set('test_kw', this.testKeyword); 
    this.router.navigate(['/details']);
  }
}
