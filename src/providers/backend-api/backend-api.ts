import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


const ROOT_ENDPOINT = 'http://swiftaviagroup.com/api/LK/'

/*
  Generated class for the BackendApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BackendApiProvider {

  constructor(public http: HttpClient) {
    console.log('Hello BackendApiProvider Provider');
  }

  getCustomerAPI(){
  	// console.log("working...")
  	const endpoint = `${ROOT_ENDPOINT}get_customers/`
  	// console.log("working...")
  	return this.http.get(endpoint, {})
  }

}
