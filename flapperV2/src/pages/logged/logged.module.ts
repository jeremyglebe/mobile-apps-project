import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoggedPage } from './logged';

@NgModule({
  declarations: [
    LoggedPage,
  ],
  imports: [
    IonicPageModule.forChild(LoggedPage),
  ]
})
export class LoggedPageModule {}
