import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
// import { Firebase } from '@ionic-native/firebase';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ListTasksPage } from '../pages/list-tasks/list-tasks';
import { TaskDetailPage } from '../pages/task-detail/task-detail';
import { MyTaskDetailPage } from '../pages/my-task-detail/my-task-detail';
import { MyTaskPage } from '../pages/my-task/my-task';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ServiceUserProvider } from '../providers/service-user/service-user'; 

@NgModule({
  declarations: [

    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    TutorialPage,
    LoginPage,
    RegisterPage,
    ListTasksPage,
    TaskDetailPage,
    MyTaskPage,
    MyTaskDetailPage,
    
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: 'Volver',
      
    }),
    IonicStorageModule.forRoot({ 
      name: 'helpersBD',
         driverOrder: ['indexeddb', 'sqlite']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    TutorialPage,
    LoginPage,
    RegisterPage,
    ListTasksPage,
    TaskDetailPage,
    MyTaskPage,
    MyTaskDetailPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ServiceUserProvider,
    Geolocation,
    // Firebase,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    
  ]
})
export class AppModule {}
