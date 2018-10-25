import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';

/**
 * Generated class for the TestingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-testing',
  templateUrl: 'testing.html',
})
export class TestingPage {

  add_document_id: string;
  add_document_collection: string;
  add_document_animal: string;
  add_document_color: string;

  show_field_id: string;
  show_field_collection: string;
  show_field_field: string;
  show_field_text: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public database: DatabaseProvider
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestingPage');
  }

  async button_add_document(){
    try{

      await this.database.docAdd(this.add_document_collection, {
        "animal": this.add_document_animal,
        "color": this.add_document_color
      }, this.add_document_id);

    }catch(e){
      console.log(e);
    }
  }

  async button_add_document_noid(){
    try{

      await this.database.docAdd(this.add_document_collection, {
        "animal": this.add_document_animal,
        "color": this.add_document_color
      });

    }catch(e){
      console.log(e);
    }
  }

  async button_show_field(){
    try{
       var field = await this.database.docField(this.show_field_collection, this.show_field_id, this.show_field_field);
       console.log(field);
       if(field){
        this.show_field_text = field;
       }else{
        this.show_field_text = "Does not exist.";
       }
    }catch(e){
      console.log(e);
    }
  }

}
