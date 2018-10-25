import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { MapPage } from '../map/map';
import { TestingPage } from '../testing/testing';

/**
 * Generated class for the LoggedPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-logged',
  templateUrl: 'logged.html'
})
export class LoggedPage {

  tab1Root = MapPage;
  tab2Root = TestingPage;

  constructor(public navCtrl: NavController) {}

}
