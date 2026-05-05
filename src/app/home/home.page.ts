import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonButton, IonInput } from '@ionic/angular/standalone';
import { MyData } from '../services/my-data';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonButton, FormsModule, IonInput],
})
export class HomePage {
  testKeyword: string = '';

  constructor(private router: Router, private mds: MyData) {}

  async testStorage() {
    await this.mds.set('test_kw', this.testKeyword); 
    this.router.navigate(['/details']);
  }
}
