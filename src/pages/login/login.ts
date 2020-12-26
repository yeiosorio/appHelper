import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, IonicPage } from 'ionic-angular';
import { ServiceUserProvider } from '../../providers/service-user/service-user';
// import { Firebase } from '@ionic-native/firebase';

import { TabsPage } from '../tabs/tabs';
import { TutorialPage } from '../tutorial/tutorial';
import { RegisterPage } from '../register/register';

@IonicPage()
@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
})
export class LoginPage {

	registerCredentials = { email: '', password: '' };
	loading: any;
	remember: any;
	constructor(
		private navCtrl: NavController,
		private serviceUser: ServiceUserProvider,
		private alertCtrl: AlertController,
		private loadingCtrl: LoadingController,
		// private firebase: Firebase,
	) {
		this.setEmailRemember();

	}

	public setEmailRemember() {

		this.registerCredentials.email = localStorage['emailRemember'] ? localStorage['emailRemember'] : "";
	
	}

	public valid_email_address(email) {
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}

	public login() {

		this.showLoading()

		let validEmail = this.valid_email_address(this.registerCredentials.email);
		if (validEmail) {
			this.serviceUser.login(this.registerCredentials)
				.map(data => data.json())
				.subscribe(data => {

					if (data != null) {
						//se almacenan los datos del usuario
						localStorage['dataUserlogged'] = JSON.stringify(data);
						localStorage['hasSession'] = true

						// Recordar email de login
						if (this.remember) {
							localStorage['emailRemember'] = data.email
						} else {
							localStorage['emailRemember'] = null
						}

						//Si el usuario ya ha visto el tutorial va al home
						if (localStorage['hasSeenTutorial']) {
							this.navCtrl.setRoot(TabsPage);
						} else {//de lo contrario inicia en la pantalla tutorial
							this.navCtrl.setRoot(TutorialPage);
						}
						// se obtienen ids de subcategorias del helper
						this.getUserSubcate(data.id);
						// this.pushNotification(data.id);
  
					} else {
						this.showError("Datos incorrectos");
					}

				},
				error => {
					this.showError(error);
				});
		} else {
			this.showError('Debe ingresar un email valido!.');
		}
	}

	getUserSubcate(uid) {
		this.serviceUser.getUserSubcate(uid)
			.map(data => data.json())
			.subscribe(data => {
				console.log('ids -----')
				console.log(data)
				localStorage['idSubcate'] = JSON.stringify(data);
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
			title: 'Lo sentimos',
			subTitle: text,
			buttons: ['OK']
		});
		alert.present();
	}

	createAccount() {
		this.navCtrl.push(RegisterPage)
	}

	// public pushNotification(uid) {

		
	// 	  this.firebase.grantPermission()
	// 		.then(res => {
	// 			console.log(`se dio permisos: ${res}`)
	// 			if (res) {
	// 				// Obtiene token de dispositivo para el envio de notificaciones push ------------------------------
	// 				this.firebase.getToken()
	// 				.then(token => {
	// 				console.log(`El token es: ${token}`)
					
	// 				this.serviceUser.saveTokenFCM(token, uid)
	// 					.map(data => data.json())
	// 					.subscribe(data => {
	// 						if (data.success) {
	// 							// this.loading.dismiss();
	// 							console.log('token guardado con exito');
	// 						}
	// 					});
			
	// 				}).catch(error => console.error("Error getting token", error));

	// 				//   Obtiene token si se actualiza o borran los datos de la app -------------------------------
	// 				this.firebase.onTokenRefresh()
	// 				.subscribe((token: string) => {
	// 					console.log(`Got a new token ${token}`);

	// 					this.serviceUser.saveTokenFCM(token, uid)
	// 						.map(data => data.json())
	// 						.subscribe(data => {
	// 							if (data.success) {
	// 								// this.loading.dismiss();
	// 								console.log('token actualizado con exito');
	// 							}
	// 						});
	// 				});

	// 			}
		
	// 		}).catch(error => console.error("error", error));

	// 		this.firebase.hasPermission()
	// 		.then(res => {
	// 			console.log(`tiene permisos: ${res}`)
	// 			if (res) {
	// 				// Obtiene token de dispositivo para el envio de notificaciones push ------------------------------
	// 				this.firebase.getToken()
	// 				.then(token => {
	// 				console.log(`El token es: ${token}`)
					
	// 				this.serviceUser.saveTokenFCM(token, uid)
	// 					.map(data => data.json())
	// 					.subscribe(data => {
	// 						if (data.success) {
	// 							// this.loading.dismiss();
	// 							console.log('token guardado con exito');
	// 						}
	// 					});
			
	// 				}).catch(error => console.error("Error getting token", error));

	// 				//   Obtiene token si se actualiza o borran los datos de la app -------------------------------
	// 				this.firebase.onTokenRefresh()
	// 				.subscribe((token: string) => {
	// 					console.log(`Got a new token ${token}`);

	// 					this.serviceUser.saveTokenFCM(token, uid)
	// 						.map(data => data.json())
	// 						.subscribe(data => {
	// 							if (data.success) {
	// 								// this.loading.dismiss();
	// 								console.log('token actualizado con exito');
	// 							}
	// 						});
	// 				});

	// 			}
		
	// 		}).catch(error => console.error("error", error));

	// 	//   Obtiene datos de notificaciones con app minimizada o cerrada
	// 	this.firebase.onNotificationOpen()
	// 		.subscribe(data => {
	// 			alert(data.param1)

	// 		});

	
	// }

}




