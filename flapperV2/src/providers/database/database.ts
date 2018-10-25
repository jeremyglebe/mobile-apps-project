import { Injectable } from '@angular/core';

// We MUST import both the firebase AND firestore like so
import * as firebase from 'firebase';
import 'firebase/firestore';

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {

  private _db: any;

  constructor() {
    console.log('Hello DatabaseProvider Provider');
    // Initialise access to the firestore service
    this._db = firebase.firestore();
  }

  /*****************DON'T USE THIS UGLY CODE ANYMORE***************************
  addDocument(
    collectionObj: string,
    dataObj: any
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      this._db.collection(collectionObj).add(dataObj)
        .then((obj: any) => {
          resolve(obj);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }
  ****************************************************************************/

  /* docAdd
   * Adds a document with fields and values from data_obj into collection with
   * name collection_name. Optionally include docID.
   */
  async docAdd(collection_name: string, data_obj: any, docID?: string){
    var db_obj;
    if(!docID){

      try{
        db_obj = await this._db.collection(collection_name).add(data_obj);
        return db_obj;
      }
      catch(e){
        throw e;
      }

    }else{

      try{
        db_obj = await this._db.collection(collection_name).doc(docID).set(data_obj);
        return db_obj;
      }
      catch(e){
        throw e;
      }

    }
  }

  /*****************DON'T USE THIS UGLY CODE ANYMORE***************************
  getDocuments(collectionObj: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._db.collection(collectionObj)
        .get()
        .then((querySnapshot) => {
          // Declare an array which we'll use to store retrieved documents
          let obj: any = [];
          // Iterate through each document, retrieve the values for each field
          // and then assign these to a key in an object that is pushed into the
          // obj array
          querySnapshot.forEach((doc: any) => {
            var docData = doc.data();
            var docObj = {};
            for (var key in docData){
              docObj[key] = docData[key];
            }
            docObj['id'] = doc.id;
            obj.push(docObj);
          });
          // Resolve the completed array that contains all of the formatted data
          // from the retrieved documents
          resolve(obj);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }
  ****************************************************************************/

  /* collectionObj
   * Returns the collection with name collection_name as a key-value object
   */
  async collectionObj(collection_name: string){
    try{
      //Try to get the collection, wait on its result
      var query = await this._db.collection(collection_name).get();

      //We'll represent the collection in a javascript array
      //Objects in the array represent collection documents
      var collection_obj = [];

      //Loop through every document in the collection
      query.forEach(
        //This runs a function on each document, with the document referred to as "doc"
        (doc: any) => {
          //doc_obj is just the object in which we're storing all document data
          //Every field in the database document will be a key in doc_obj
          var doc_obj = {};
          //Get the document's data (fields set up in the database)
          var doc_data = doc.data();
          //Copy the fields from the data to the document object
          for (var field in doc_data){
            doc_obj[field] = doc_data[field];
          }
          //Get the id of the document and turn it into a key for the object
          doc_obj['id'] = doc.id;
          //Push the object to the collection object. It may seem tempting to
          //simply push doc or doc_data, but NEITHER are simple javascript
          //objects, so they aren't as simple to use later
          collection_obj.push(doc_obj);
        }
      );

      //Return the collection object
      return collection_obj;

    }
    catch(e){
      throw e;
    }
  }

  /* docObj
   * Returns the document with id docID in collection with name collection_name
   * as a JavaScript key-value object.
   */
  async docObj(collection_name: string, docID: string){
    try{

      var doc = await this._db.doc(collection_name + '/' + docID).get();
      //doc_obj is just the object in which we're storing all document data
      //Every field in the database document will be a key in doc_obj
      var doc_obj = {};
      //Get the document's data (fields set up in the database)
      var doc_data = doc.data();
      //Copy the fields from the data to the document object
      for (var field in doc_data){
        doc_obj[field] = doc_data[field];
      }
      //Get the id of the document and turn it into a key for the object
      doc_obj['id'] = doc.id;

      return doc_obj;

    }catch(e){
      throw e;
    }
  }

  /* docField
   * Returns the value of a field in a database document
   */
  async docField(collection_name: string, docID: string, field: string){
    try{
      var doc_obj = await this.docObj(collection_name, docID);
      return doc_obj[field];
    }catch(e){
      throw e;
    }
  }

  /** geo
   * Creates a geopoint
   */
  geo(lat: number, lon: number) {
    return new firebase.firestore.GeoPoint(lat, lon);
  }

}
