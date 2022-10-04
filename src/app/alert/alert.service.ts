import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(public alert: AlertController, 
    public toastController: ToastController,
    public loadingController: LoadingController) { }
 
    async presentLoading(msg, status: Boolean) {
      const loading = await this.loadingController.create({
        cssClass: 'my-custom-class',
        message: msg,
       // duration: 2000
      });
      if(status === true) {
        await loading.present();

      }
      if(status === false) {
        await loading.dismiss();
      }
    }
  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  async presentAlert(msg: string, headers: string, subHeader: string) {
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      header: headers,
      subHeader: subHeader,
      message: msg,
      buttons: ['Okay!']
    });

    await alert.present();
  }

}
