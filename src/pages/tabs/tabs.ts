import { Component } from '@angular/core';

import { TeamPage } from '../team/team';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = TeamPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
