import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// import { Storage } from '@ionic/storage';
// import { Firebase } from '@ionic-native/firebase'

import { TutorialPage } from '../pages/tutorial/tutorial';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    // private firebase: Firebase,
  ) {
    //Si existe la session
    if (localStorage['hasSession']) {

      //Si el usuario ya ha visto el tutorial inicia en home
      if (localStorage['hasSeenTutorial']) {

          // Obtiene datos de notificaciones con app minimizada o cerrada
        // this.firebase.onNotificationOpen()
        //   .subscribe(data => {
        //     alert(data.param1)
        //   });

        this.rootPage = TabsPage;
      } else {//de lo contrario inicia en la pantalla tutorial
        this.rootPage = TutorialPage;
      }

    } else {//Si no existe la session inicia en la pantalla de login
      this.rootPage = LoginPage;
    }

    this.platformReady()

  }

  // Funcion de inicio
  platformReady() {
    this.platform.ready().then(() => {

      console.log('buil 1.8 -------')
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    //   this.firebaseDB();

    });
  }

//   firebaseDB(){

// 	firebase.initializeApp(config);

// 	var ref = firebase.database().ref('request');
// 	var acceptHelperTask = firebase.database().ref('acceptHelperTask');
// 	var refuseTask = firebase.database().ref('refuseTask');

// 	console.log('init')

// 	ref.on("child_changed", function (response) {
// 		console.log('event ')
// 		const response = response.val();
// 		const idsubcat = JSON.parse(localStorage['idsubcat']);
// 		console.log('subcate user')

// 		for (i = 0; i < idsubcat.length; i++) {
// 		console.log('bucle')
// 			// if (idsubcat[i].idsubcat == response.subcategoryId) {
// 			if (idsubcat[i] == response.subcategoryId) {
// 			// 'Want to see the new task. ' + response.service, 'New task!'
// 				alert('Want to see the new task. ' + response.service, 'New task!')
// 			}
// 		}

// 	});
//   }


}












