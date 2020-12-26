import { Injectable } from "@angular/core";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";

import { Http } from "@angular/http";
// import { Http, Response, Headers, RequestOptions } from "@angular/http";

@Injectable()
export class ServiceUserProvider {
  constructor(public http: Http) {}

  public login(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Por favor ingrese los datos de cuenta!.");
    } else {
      let postParams: FormData = new FormData();
      postParams.append("data[User][email]", credentials.email);
      postParams.append("data[User][password]", credentials.password);

      return Observable.create(observer => {
        // let data = JSON.stringify(this.dataObj)
        this.http
          .post("https://helpersforyou.com/WsRequest/AuthUser", postParams)
          .subscribe(
            data => {
              observer.next(data);
              observer.complete();
            },
            error => {
              observer.next(error);
              observer.complete();
            }
          );
      });
    }
  }

  public register(dataRegister) {
    if (dataRegister === null) {
      return Observable.throw("Por favor ingrese los datos de registro");
    } else {
      let postParams: FormData = new FormData();

      postParams.append("data[User][role_id]", "3");
      postParams.append("data[User][status]", "0");
      postParams.append("data[User][available]", "1");

      postParams.append("data[User][name]", dataRegister.name);
      postParams.append("data[User][last_name]", dataRegister.last_name);
      postParams.append("data[User][email]", dataRegister.email);
      postParams.append("data[User][password]", dataRegister.password);
      postParams.append("data[User][phone]", dataRegister.phone);
      postParams.append("data[User][address]", dataRegister.address);
      postParams.append("data[User][postalCode]", dataRegister.postalCode);

      return Observable.create(observer => {
        this.http
          .post(
            "https://helpersforyou.com/WsRequest/createNewHelper",
            postParams
          )
          .subscribe(
            data => {
              observer.next(data);
              observer.complete();
            },
            error => {
              observer.next(error);
              observer.complete();
            }
          );
      });
    }
  }

  public listTask(uid, idsubcat) {
    

    // Los param se deben enviar con FormData
    let postParams: FormData = new FormData();
    postParams.append("idsubcats", idsubcat);
    postParams.append("idhelper", uid);
    postParams.append("query", "all");

    // let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    // let options = new RequestOptions({ headers: headers });

    return Observable.create(observer => {
      this.http
        .post(
          "https://helpersforyou.com/WsRequest/searchAllRequest",
          postParams
        )
        .subscribe(
          data => {
            console.log(data);
            observer.next(data);
            observer.complete();
          },
          error => {
            observer.next(error);
            observer.complete();
          }
        );
    });
  }

  public myListTask(uid, idsubcat) {
   

    // Los param se deben enviar con FormData
    let postParams: FormData = new FormData();
    postParams.append("idsubcats", idsubcat);
    postParams.append("idhelper", uid);
    postParams.append("query", "accepted");

    // let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    // let options = new RequestOptions({ headers: headers });

    return Observable.create(observer => {
      this.http
        .post(
          "https://helpersforyou.com/WsRequest/searchAllRequest",
          postParams
        )
        .subscribe(
          data => {
            console.log(data);
            observer.next(data);
            observer.complete();
          },
          error => {
            observer.next(error);
            observer.complete();
          }
        );
    });
  }

  public getUserSubcate(uid) {
    let postParams: FormData = new FormData();
    postParams.append("iduser", uid);

    return Observable.create(observer => {
      this.http
        .post("https://helpersforyou.com/WsRequest/subCatHelper", postParams)
        .subscribe(
          data => {
            observer.next(data);
            observer.complete();
          },
          error => {
            observer.next(error);
            observer.complete();
          }
        );
    });
  }
  public acceptTask(requestId, uid) {
    let postParams: FormData = new FormData();
    postParams.append("requestsid", requestId);
    postParams.append("helperid", uid);

    return Observable.create(observer => {
      this.http
        .post("https://helpersforyou.com/WsRequest/accepetTask", postParams)
        .subscribe(
          data => {
            observer.next(data);
            observer.complete();
          },
          error => {
            observer.next(error);
            observer.complete();
          }
        );
    });
  }

  public cancelTask(requestId) {
    let postParams: FormData = new FormData();
    postParams.append("requestsid", requestId);

    return Observable.create(observer => {
      this.http
        .post("https://helpersforyou.com/WsRequest/cancelTask", postParams)
        .subscribe(
          data => {
            observer.next(data);
            observer.complete();
          },
          error => {
            observer.next(error);
            observer.complete();
          }
        );
    });
  }

  public getTaskDetail(requestId) {
    let postParams: FormData = new FormData();
    postParams.append("idrequestdet", requestId);

    return Observable.create(observer => {
      this.http
        .post(
          "https://helpersforyou.com/WsRequest/searchDetRequest",
          postParams
        )
        .subscribe(
          data => {
            observer.next(data);
            observer.complete();
          },
          error => {
            observer.next(error);
            observer.complete();
          }
        );
    });
  }

  public geolocationByAddress(location) {
    // key=AIzaSyCetj2cTjoRFx7P8wKSgslPgE_7WbuzNv0
    return Observable.create(observer => {
      this.http
        .get(
          "https://maps.googleapis.com/maps/api/geocode/json?address="+location+"&key=AIzaSyCetj2cTjoRFx7P8wKSgslPgE_7WbuzNv0").subscribe(
          data => {
            observer.next(data);
            observer.complete();
          },
          error => {
            observer.next(error);
            observer.complete();
          }
        );
    });
  }

  public updateStatusTask(status, requestId) {
    let postParams: FormData = new FormData();
    postParams.append("idrequestsel", requestId);
    postParams.append("status", status);

    return Observable.create(observer => {
      this.http.post(
          "https://helpersforyou.com/WsRequest/updateStatusTask", postParams)
        .subscribe(
          data => {
            observer.next(data);
            observer.complete();
          },
          error => {
            observer.next(error);
            observer.complete();
          }
        );
    });
  }
  public searchSubCategories(catSelected) {

    let postParams: FormData = new FormData();
    postParams.append("idcats", catSelected);

    return Observable.create(observer => {
      this.http.post("https://helpersforyou.com/WsRequest/searchAllSubCategories", postParams)
        .subscribe(
          data => {
            observer.next(data);
            observer.complete();
          },
          error => {
            observer.next(error);
            observer.complete();
          }
        );
    });
  }
  public saveTokenFCM(tokenFCM, uid) {

    let postParams: FormData = new FormData();
    postParams.append("tokenFCM", tokenFCM);
    postParams.append("uid", uid);

    //  let postParams = JSON.stringify({'tokenFCM': tokenFCM, 'uid': uid})

    return Observable.create(observer => {
      this.http.post("https://helpersforyou.com/WsRequest/saveTokenFCM", postParams)
        .subscribe(
          data => {
            observer.next(data);
            observer.complete();
          },
          error => {
            observer.next(error);
            observer.complete();
          }
        );
    });
  }

  
}
