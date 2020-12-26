import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyTaskPage } from './my-task';

@NgModule({
  declarations: [
    MyTaskPage,
  ],
  imports: [
    IonicPageModule.forChild(MyTaskPage),
  ],
})
export class MyTaskPageModule {}
