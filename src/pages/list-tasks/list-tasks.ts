import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  LoadingController,
  NavParams,
  AlertController
} from "ionic-angular";
import { ServiceUserProvider } from "../../providers/service-user/service-user";
import { TaskDetailPage } from "../task-detail/task-detail";
import * as moment from "moment";

@IonicPage()
@Component({
  selector: "page-list-tasks",
  templateUrl: "list-tasks.html"
})
export class ListTasksPage {
  loading: any;
  alert: any;
  uid: any;
  idsubcat: any;
  idsubcategories = "";
  dataStorage: any;
  listTask = [];
  configRequest: any;
  segment = "recients";
  statusTake = false;

  constructor(
    private navCtrl: NavController,
    private serviceUser: ServiceUserProvider,
    private loadingCtrl: LoadingController,
    public navParams: NavParams,
    public alertController: AlertController
  ) {
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
    var dataUser = JSON.parse(localStorage["dataUserlogged"]);
    moment.locale("en");
    moment().format("LL");
    this.dataStorage = dataUser;
  }

	ionViewWillEnter() {
		this.showLoading();
		this.getListTask();
	}

    doRefresh(refresher) {
	  this.getListTask()
	  setTimeout(() => {
		refresher.complete();
	  }, 2000);
    }

    public getListTask() {
		this.uid = this.dataStorage.id;
		localStorage["idSubcate"] = JSON.stringify([1, 2, 3, 4, 5]);
		var idSubcate = JSON.parse(localStorage["idSubcate"]);

		for (var i = 0; i < idSubcate.length; i++) {

		// this.idsubcategories += idSubcate[i].idsubcat + ',';
		this.idsubcategories += idSubcate[i] + ",";
		}
		this.idsubcategories = this.idsubcategories.slice(0, -1);

		this.serviceUser.listTask(this.uid, this.idsubcategories)
		.map(data => data.json())
		.subscribe(data => {
			if (data) {
				data.forEach((value, index) => {
					data[index].datetime = moment(value.datetime).format("MMMM DD YYYY, h:mm a");
					data[index].icon = this.configRequest[value.idcat][value.idsubcat].icon;
					data[index].helperid = this.uid;
					data[index].statusTake = false;
				});
				// poner imagen
				this.listTask = data;
				console.log(this.listTask)
				this.loading.dismiss();
			} else {
				this.loading.dismiss();
			}
		});
  }

  // Se lleva a los detalles de la tarea seleccionada
  taskDetail(requestId) {
    this.navCtrl.push(TaskDetailPage, { requestId: requestId });
  }

  segmentChanged(ev: any) {
    if (this.segment == 'recients') {
        this.listTask.sort((a, b) => b.idrequest - a.idrequest)
        console.log(this.listTask)
    }else{
        this.listTask.sort((a, b) => a.idsubcat - b.idsubcat )
        console.log(this.listTask)
    }
    
  }

  acceptTaskConfirm(requestId, uid, statusTake, index) {
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
              this.cancelTask(requestId, index);
            } else {
              this.acceptTask(requestId, uid, index);
            }
          }
        }
      ]
    });

    this.alert.present();
  }

  acceptTask(requestId, uid, index) {
    console.log(requestId);
    this.serviceUser
      .acceptTask(requestId, uid)
      .map(data => data.json())
      .subscribe(data => {
        if (data) {
          this.listTask[index].statusTake = true;
        }
      });
  }

  cancelTask(requestId, index) {
    console.log(requestId);
    this.serviceUser
      .cancelTask(requestId)
      .map(data => data.json())
      .subscribe(data => {
        if (data) {
          this.listTask[index].statusTake = false;
        }
      });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      spinner: "dots",
      dismissOnPageChange: false
    });
    this.loading.present();
  }
}
