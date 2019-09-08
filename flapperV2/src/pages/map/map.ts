import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//Import functions to get references to template elements
import { ViewChild, ElementRef } from '@angular/core';
//Geolocation import
import { Geolocation } from '@ionic-native/geolocation';
//My providers
import { DatabaseProvider } from '../../providers/database/database';

//This prevents some errors when the app looks for google too early
declare var google;

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  //Create reference called mapElement to element in template called "map"
  @ViewChild('map') mapElement: ElementRef;
  //Create variable called map of type any
  map: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public geolocation: Geolocation,
    public database: DatabaseProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
    //Run loadMap function when the page loads
    this.loadMap();
  }


  /*****************DON'T USE THIS UGLY CODE ANYMORE***************************
  loadMap() {
    this.geolocation.getCurrentPosition().then((position) => {

      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      //Adds location document to our firebase collection
      this.database.addDocument('locations', {
        point: this.database.geo(position.coords.latitude, position.coords.longitude),
        time: Math.round(new Date().getTime() / 1000)
      });

      this.addMarker(latLng);

      this.dropAllMarkers();

    }, (err) => {
      console.log(err);
    });

  }
  ****************************************************************************/

  async loadMap() {
    try {
      //Get the current location
      var position = await this.geolocation.getCurrentPosition();
      //Create a Google latitude longitude object (not the same as a geopoint)
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      //Configuration for displaying the map
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      //Create a map object using the map config and the map element
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      try {
        //Adds location document to our firebase collection
        //We choose to await the docAdd so that the location will be
        //in the database when we drop our markers a moment later
        await this.database.docAdd('locations', {
          //Make the point into a Firestore Geopoint
          point: this.database.geo(position.coords.latitude, position.coords.longitude),
          //Get the time & divide it by 1000 for UNIX timestamp
          time: Math.round(new Date().getTime() / 1000)
        });

        //Drop all markers in the location collection
        this.dropAllMarkers();

      } catch (e) {
        console.log(e);
      }

    } catch (e) {
      throw e;
    }
  }

  async dropAllMarkers() {

    try {
      var locs = await this.database.collectionObj('locations');
      locs.forEach((locObj: any) => {
        var geopoint = locObj['point'];
        console.log(geopoint);
        var googlepoint = new google.maps.LatLng(
          geopoint.latitude,
          geopoint.longitude
        );
        this.addMarker(googlepoint);
      });
    }
    catch (e) {
      throw e;
    }

  }

  addMarker(latLonObj) {

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLonObj
    });

  }

}
