import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AlertService } from 'src/app/alert/alert.service';

import { AngularFireAuth } from '@angular/fire/compat/auth';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  segmentValue: string = "login";


  username: string;
  email: string;
  password: string;


  constructor(
     private router: Router,
     private alertService: AlertService,
     public loadingController: LoadingController,
     private auth: AngularFireAuth
     ) {

      
      }

  ngOnInit() {
    
  }

  ionViewDidEnter(){
   console.log("ionViewDidEnter Auth Page");
   
  }

  segmentChanged(ev: any) {
    this.segmentValue = ev.detail.value;
  }

  async register(){
   this.auth.createUserWithEmailAndPassword(this.email, this.password)
   .then((success) => {
     if(success){
       console.log(success);
       
     }
   })
    .catch((err) => {

      console.log(err);
      
    })
  }


  async login(){
   this.auth.signInWithEmailAndPassword(this.email, this.password).then((success) => {
    if(success) {
      this.router.navigate(['/tabs/tabs/tab1']);
    }
     
   }).catch((err) => {
     console.log(err);
     
   })
  }



}
