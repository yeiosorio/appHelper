import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, IonicPage } from 'ionic-angular';
import { ServiceUserProvider } from '../../providers/service-user/service-user';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  countDataUser = {
    totalTaskDone: "",
    totalEarn: "",
    totalCancel: "",
  }
  dataStorage: any
  helperName: any
  available: any = ""

  constructor(private navCtrl: NavController,
		private serviceUser: ServiceUserProvider,
		private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    public toastCtrl: ToastController
  ) {
    var dataUser = JSON.parse(localStorage["dataUserlogged"]);
    this.dataStorage = dataUser;

   
  }

  ionViewWillEnter() {
    this.countUser();
  }

  public countUser(){

    const name = this.dataStorage.name.split(' ')
    this.available = parseInt(this.dataStorage.available)
    const last_name = this.dataStorage.last_name.split(' ')
    this.helperName = name[0] +' '+last_name[0];

    this.countDataUser.totalTaskDone = "23";
    this.countDataUser.totalEarn = "800";
    this.countDataUser.totalCancel = "12";
  }

  presentToast() {
    const toast = this.toastCtrl.create({
      message: 'Status was update successfully',
      duration: 4000
    });
    toast.present();
  }
}

