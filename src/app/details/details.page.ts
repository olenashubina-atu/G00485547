import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonLabel, IonList, IonItem, IonButtons, IonThumbnail} from '@ionic/angular/standalone';
import { MyHttp } from '../services/my-http';
import { MyData } from '../services/my-data';
import { NavController } from '@ionic/angular/standalone';



@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonLabel, IonList, IonItem, IonButtons, IonThumbnail, CommonModule, FormsModule ]
})
export class DetailsPage {
  person: any = null;
  movies: any[] = [];

  constructor(
    private myHttp: MyHttp,
    private mds: MyData,
    private navCtrl: NavController
  ) { }

  async ionViewWillEnter() {
    const id = await this.mds.get('person_id');
    if (id) {
      this.loadPersonDetails(id);
    }
  }

  async loadPersonDetails(id: string) {
    let options = {
      url: this.myHttp.baseUrl + '/person/' + id + '?api_key=' + this.myHttp.apiKey
    };
    const result = await this.myHttp.get(options);
    this.person = result.data;

    let movieOptions = {
      url: this.myHttp.baseUrl + '/person/' + id + '/movie_credits?api_key=' + this.myHttp.apiKey
    };
    const movieResult = await this.myHttp.get(movieOptions);
    this.movies = movieResult.data.cast;
  }

  async goToMovie(movieId: number) {
    await this.mds.set('movie_id', movieId);
    this.navCtrl.navigateForward(['/movie-details']);
  }
}


