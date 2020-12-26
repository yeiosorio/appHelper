import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListTasksPage } from './list-tasks';

@NgModule({
  declarations: [
    ListTasksPage,
  ],
  imports: [
    IonicPageModule.forChild(ListTasksPage),
  ],
})
export class ListTasksPageModule {}
