import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyTaskDetailPage } from './my-task-detail';

@NgModule({
  declarations: [
    MyTaskDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(MyTaskDetailPage),
  ],
})
export class MyTaskDetailPageModule {}
