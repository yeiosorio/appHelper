import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, IonicPage } from 'ionic-angular';
import { ServiceUserProvider } from '../../providers/service-user/service-user';
// import { Firebase } from '@ionic-native/firebase';

import { TutorialPage } from '../tutorial/tutorial';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
	//Objeto que recibe los datos del registro
	dataRegister = { 
		name:     '', 
		last_name:'', 
		email:    '', 
		password: '',
		phone:    '', 
		address: '', 
		postalCode: '', 
		state: 1 
	};

	passConfirm: any;
	loading: any;
	catSelected: any;

  constructor(private navCtrl: NavController, 
	  	private auth: ServiceUserProvider, 
	  	private alertCtrl: AlertController, 
			private loadingCtrl: LoadingController,
			// private firebase: Firebase,
	) {
  }

  public register() {
			this.showLoading()
			
			console.log(this.dataRegister);
			
	    this.auth.register(this.dataRegister)
	      .map(data => data.json())
	      .subscribe(data => {
	      	  //Registro exitoso
		      if (data) {
		      	//se almacenan los datos del usuario registrado
						localStorage['dataUserlogged'] = JSON.stringify(data.User);
						localStorage['hasSession'] = true
						// this.pushNotification(data.User.id);
		      	 this.navCtrl.setRoot(TutorialPage);  

		      } else {
		         this.showError("Ocurrio un error intente de nuevo!.");
		      }
		      
	    },
      	error => {
        	this.showError(error);
      	});
	}

   selectSubCate() {
			this.showLoading()
			
	    this.auth.searchSubCategories(this.catSelected)
	      .map(data => data.json())
	      .subscribe(data => {

					console.log('------------------')
					console.log(data)
	      	 
	    },
      	error => {
        	this.showError(error);
      	});
	}

	showLoading() {
	    this.loading = this.loadingCtrl.create({
	      spinner: 'dots',
	      dismissOnPageChange: true
	    });
	    this.loading.present();
	  }

	  showError(text) {
	    this.loading.dismiss();
	 
	    let alert = this.alertCtrl.create({
	      title: 'Error',
	      subTitle: text,
	      buttons: ['OK']
	    });
	    alert.present();
		}
		
		// public pushNotification(uid) {

		// 	// Obtiene token de dispositivo para el envio de notificaciones push
		// 	this.firebase.getToken()
		// 		.then(token => {
		// 		console.log(`The token is ${token}`)
				
		// 		this.auth.saveTokenFCM(token, uid)
		// 			.map(data => data.json())
		// 			.subscribe(data => {
		// 				if (data.success) {
		// 					// this.loading.dismiss();
		// 					console.log('token guardado con exito');
		// 				}
		// 			});
		
		// 		}).catch(error => console.error("Error getting token", error));
	
		// 	//   Obtiene token si se actualiza o borran los datos de la app
		// 	this.firebase.onTokenRefresh()
		// 		.subscribe((token: string) => {
		// 			console.log(`Got a new token ${token}`);
	
		// 			this.auth.saveTokenFCM(token, uid)
		// 				.map(data => data.json())
		// 				.subscribe(data => {
		// 					if (data.success) {
		// 						// this.loading.dismiss();
		// 						console.log('token actualizado con exito');
		// 					}
		// 				});
		// 		});
	
		// 	//   Obtiene datos de notificaciones
		// 	this.firebase.onNotificationOpen()
		// 		.subscribe(data => {
		// 			console.log('tittle *****************************************')
		// 			console.log(data.title)
	
		// 		});
			
		
		// }

}
