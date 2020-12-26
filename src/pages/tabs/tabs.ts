import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
// import { TravelsPage } from '../travels/travels';
import { ContactPage } from '../contact/contact';
import { ListTasksPage } from '../list-tasks/list-tasks';
import { MyTaskPage } from '../my-task/my-task';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ListTasksPage;
  tab2Root = MyTaskPage;
  tab3Root = AboutPage;
  tab4Root = ContactPage;

  constructor() {

  }
}
