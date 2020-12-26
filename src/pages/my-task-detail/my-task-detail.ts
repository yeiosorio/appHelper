import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  LoadingController,
  NavParams,
  AlertController
} from "ionic-angular";
import { ServiceUserProvider } from "../../providers/service-user/service-user";
import { Geolocation, Geoposition } from "@ionic-native/geolocation";

// import { TabsPage } from "../tabs/tabs";
import { MyTaskPage } from '../my-task/my-task';

declare var google;

import * as moment from "moment";

/**
 * Generated class for the TaskDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-task-detail',
  templateUrl: 'my-task-detail.html',
})
export class MyTaskDetailPage {
	loading: any;
	requestId: any = 0;
	configRequest: any;
	alert: any;
	dataStorage: any;
	uid: any;
	durationTime: any = "";
	distanceKm: any;
	notRoad = false;

	dataDetails = {
		available: "",
		city: "",
		client: "",
		codevalid: "",
		datetime: "",
		hours: "",
		idcat: "",
		idsubcat: "",
		jobdesc: "",
		location: "",
		postalcode: "",
		price: "",
		status: "",
		subcat: "",
		icon: "",
		duration: ""
	};
	map: any;

  constructor(
    private navCtrl: NavController,
    private serviceUser: ServiceUserProvider,
    private loadingCtrl: LoadingController,
    public navParams: NavParams,
    public alertController: AlertController,
    private geolocation: Geolocation
  ) {}

  ionViewDidLoad() {

    var dataUser = JSON.parse(localStorage["dataUserlogged"]);
    moment.locale("en");
    moment().format("LL");
    this.dataStorage = dataUser;
    this.configRequest = {
      "1": {
        "1": {
          color: "#1A6C82",
          icon: "assets/imgs/errandsCircular/general_shopping.svg"
        },
        "2": {
          color: "#FB731B",
          icon: "assets/imgs/errandsCircular/post_office_errands.svg"
        },
        "3": {
          color: "#03A750",
          icon: "assets/imgs/errandsCircular/pet_watch.svg"
        },
        "4": {
          color: "#AF0D13",
          icon: "assets/imgs/errandsCircular/gift_wrapping.svg"
        },
        "5": {
          color: "#926E51",
          icon: "assets/imgs/errandsCircular/tag_renewal.svg"
        }
      },
      "2": {
        "6": {
          color: "#1A6C82",
          icon: "assets/imgs/residenceCleaning/window_cleaning.svg"
        },
        "7": {
          color: "#FB731B",
          icon: "assets/imgs/residenceCleaning/closet_garage.svg"
        },
        "8": {
          color: "#03A750",
          icon: "assets/imgs/residenceCleaning/junk_removal.svg"
        },
        "9": {
          color: "#AF0D13",
          icon: "assets/imgs/residenceCleaning/deep_clean.svg"
        },
        "10": {
          color: "#926E51",
          icon: "assets/imgs/residenceCleaning/carpet_cleaning.svg"
        },
        "11": {
          color: "#B45393",
          icon: "assets/imgs/residenceCleaning/construction_cleaning.svg"
        }
      },
      "3": {
        "12": {
          color: "#1A6C82",
          icon: "assets/imgs/residenceCleaning/window_cleaning.svg"
        },
        "13": {
          color: "#FB731B",
          icon: "assets/imgs/residenceCleaning/closet_garage.svg"
        },
        "14": {
          color: "#03A750",
          icon: "assets/imgs/residenceCleaning/window_cleaning.svg"
        },
        "15": {
          color: "#AF0D13",
          icon: "assets/imgs/residenceCleaning/window_cleaning.svg"
        },
        "16": {
          color: "#926E51",
          icon: "assets/imgs/residenceCleaning/window_cleaning.svg"
        }
      },
      "4": {
        "17": {
          color: "#1A6C82",
          icon: "assets/imgs/residenceCleaning/window_cleaning.svg"
        },
        "18": {
          color: "#FB731B",
          icon: "assets/imgs/residenceCleaning/window_cleaning.svg"
        },
        "19": {
          color: "#03A750",
          icon: "assets/imgs/residenceCleaning/window_cleaning.svg"
        },
        "20": {
          color: "#AF0D13",
          icon: "assets/imgs/residenceCleaning/window_cleaning.svg"
        }
      },
      "5": {
        "21": {
          color: "#1A6C82",
          icon: "assets/imgs/residenceCleaning/window_cleaning.svg"
        },
        "22": {
          color: "#FB731B",
          icon: "assets/imgs/residenceCleaning/window_cleaning.svg"
        },
        "23": {
          color: "#03A750",
          icon: "assets/imgs/residenceCleaning/window_cleaning.svg"
        },
        "24": {
          color: "#AF0D13",
          icon: "assets/imgs/residenceCleaning/window_cleaning.svg"
        },
        "25": {
          color: "#AF0D13",
          icon: "assets/imgs/residenceCleaning/window_cleaning.svg"
        },
        "26": {
          color: "#AF0D13",
          icon: "assets/imgs/residenceCleaning/window_cleaning.svg"
        }
      }
    };
	
    // id que viene pasado por la vista como parametro
    this.requestId = this.navParams.data.requestId;
    this.uid = this.dataStorage.id;
	  this.showLoading();
    this.getTaskDetail(this.requestId);
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      spinner: "dots",
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  getTaskDetail(requestId) {
    this.serviceUser
      .getTaskDetail(requestId)
      .map(data => data.json())
      .subscribe(data => {
        if (data) {
          console.log('get details')
          this.getPosition(data[0]);

          this.dataDetails.available = data[0].available;
          this.dataDetails.client = data[0].client;
          this.dataDetails.city = data[0].city;
          this.dataDetails.codevalid = data[0].codevalid;
          this.dataDetails.hours = data[0].hours;
          this.dataDetails.idcat = data[0].idcat;
          this.dataDetails.idsubcat = data[0].idsubcat;
          this.dataDetails.jobdesc = data[0].jobdesc;
          this.dataDetails.location = data[0].location;
          this.dataDetails.postalcode = data[0].postalcode;
          this.dataDetails.price = data[0].price;
          this.dataDetails.status = data[0].status;
          this.dataDetails.subcat = data[0].subcat;

          this.dataDetails.datetime = moment(data[0].datetime).format(
            "MMMM DD YYYY, h:mm a"
          );
          this.dataDetails.icon = this.configRequest[data[0].idcat][data[0].idsubcat].icon;
        }
      });
  }

  getPosition(data): any {

	  console.log('getPosition')
	  console.log(this.geolocation)
    this.geolocation.getCurrentPosition(
      { 
          enableHighAccuracy: true,
          timeout: 30000,
          maximumAge: 0 
      })
      .then(response => {
        console.log(response)
        this.loadMap(response, data);
      })
      .catch(error => {
        console.log(error);
      });

      
  }

  loadMap(position: Geoposition, data) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    console.log(latitude, longitude);

    // create a new map by passing HTMLElement
    let mapEle: HTMLElement = document.getElementById("mapDetail");

    console.log("mapEle my task");
    console.log(mapEle);

    // create LatLng object
    let myLatLng = { lat: latitude, lng: longitude };

    // create map
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 16
    });

    // Trazado de rutas ******************************
    this.getGeolocation(data, myLatLng);

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      // let marker = new google.maps.Marker({
      //   position: myLatLng,
      //   map: this.map,
      //   title: 'Hello World!'
      // });
      // mapEle.classList.add('show-map');
    });

  }

  getGeolocation(dataLocation, myLatLng) {
    let local = "";
    const location = dataLocation.location + " " + dataLocation.city;
    this.serviceUser
      .geolocationByAddress(location)
      .map(data => data.json())
      .subscribe(data => {
        console.log("geolocation");
        console.log(data);

        if (data.status == "OK") {
          local = data.results[0].formatted_address;
          var elem = local.split(", ");
          local = elem[1] + "<br>" + elem[0] + ", " + elem[2];

          const geoData = data.results[0].geometry.location;

          this.DirectionsRenderer(geoData, myLatLng);
        }
      });
  }

  DirectionsRenderer(geoData, helperGeolocation) {
	
    const requestLocation = geoData;

    //Renderiza y muestra el mapa en la vista
    // var map = new google.maps.Map(document.getElementById("mapDetail"), {
    //   scrollwheel: true,
    //   zoom: 15
    // });

    //Api google maps directions para trazar rutas ***************************
    var directionsDisplay = new google.maps.DirectionsRenderer({
      map: this.map
    });

    //Se pasan las ubicaciones de origen y destino
    var request = {
      origin: helperGeolocation,
      destination: requestLocation,
      travelMode: "DRIVING"
    };

    // Se pasan las direcciones al directionsService() para trazar ruta
    var directionsService = new google.maps.DirectionsService();
    directionsService.route(request, function(response, status) {
      if (status == "OK") {
        // Display the route on the map.
        directionsDisplay.setDirections(response);
      }
    });

    if (requestLocation !== "") {
      //Servicio para obtener informacion acerca de la distancia y duracion entres rutas
      var service = new google.maps.DistanceMatrixService();
      service.getDistanceMatrix(
        {
          origins: [helperGeolocation],
          destinations: [requestLocation],
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.metric,
          avoidHighways: false,
          avoidTolls: false
        },this.callback);
	  
	//   this.loading.dismiss();
    }
  }

  //Funcion que obtiene datos de distancia en KM y duracion entre rutas y los imprime
  callback(response, status) {
	
    if (status != google.maps.DistanceMatrixStatus.OK) {
      // $("#result").html(err);
    } else {
      var origin = response.originAddresses[0];
      var destination = response.destinationAddresses[0];

      if (response.rows[0].elements[0].status === "ZERO_RESULTS") {
        this.notRoad = true
        alert('Better get on a plane. There are no roads between '+origin+' and '+destination+' ')
      } else {
        //Distancia y duracion entre rutas
        var duration = response.rows[0].elements[0].duration;
        var distance = response.rows[0].elements[0].distance;

        const durationTime = duration.text;
        const distanceKm = distance.text;

        let ele1: HTMLElement = document.getElementById("duration");
        let ele2: HTMLElement = document.getElementById("distance");

        ele1.innerHTML = durationTime
        ele2.innerHTML = distanceKm

      }
    }
  }

  acceptTaskConfirm(requestId, uid, statusTake) {
    var actionMsg = "take";
    if (statusTake) {
      actionMsg = "cancell";
    }

    this.alert = this.alertController.create({
      title: "Confirm!",
      message:
        "You'll " + actionMsg + " task # <strong>" + requestId + "</strong>!!!",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: blah => {}
        },
        {
          text: "Okay",
          handler: () => {
            if (statusTake) {
              this.cancelTask(requestId);
            } else {
              this.acceptTask(requestId, uid);
            }
          }
        }
      ]
    });

    this.alert.present();
  }

  acceptTask(requestId, uid) {
	
    console.log(requestId);
    this.serviceUser
      .acceptTask(requestId, uid)
      .map(data => data.json())
      .subscribe(data => {
        if (data) {
			// this.loading.dismiss();
			this.alertAccept();
        }
      });
  }

  cancelTask(requestId) {
	
    console.log(requestId);
    this.serviceUser
      .cancelTask(requestId)
      .map(data => data.json())
      .subscribe(data => {
        if (data) {
			// this.loading.dismiss();
			this.alertCancell();
        }
      });
  }

  updateStatus(requestId, status) {
    this.alert = this.alertController.create({
      title: "Confirm!",
      message: status,
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: blah => {}
        },
        {
          text: "Okay",
          handler: () => {
            this.serviceUser
              .updateStatusTask(status, requestId)
              .map(data => data.json())
              .subscribe(data => {
                if (data) {
                  this.alertChangeStatus(status);
                }
              });
          }
        }
      ]
    });

    this.alert.present();
  }

  alertChangeStatus(status) {

    this.alert = this.alertController.create({
      title: "Success!.",
      message: status,
      buttons: [
        {
          text: "Okay",
          handler: () => {
            this.navCtrl.setRoot(MyTaskPage); 
          }
        }
      ]
    });

    this.alert.present();
  }

  alertComplete() {
    this.alert = this.alertController.create({
      title: "Success!.",
      message: "Completed",
      buttons: [
        {
          text: "Okay",
          handler: () => {
            this.navCtrl.setRoot(MyTaskPage);
          }
        }
      ]
    });

    this.alert.present();
  }

  alertAccept() {
    this.alert = this.alertController.create({
      title: "Success!.",
      message: "Task has been accepted",
      buttons: [
        {
          text: "Okay",
          handler: () => {
            this.navCtrl.setRoot(MyTaskPage);
          }
        }
      ]
    });

    this.alert.present();
  }
  alertCancell() {
    this.alert = this.alertController.create({
      title: "Success!.",
      message: "Canceled",
      buttons: [
        {
          text: "Okay",
          handler: () => {
            this.navCtrl.setRoot(MyTaskPage);
          }
        }
      ]
    });

    this.alert.present();
  }

}
