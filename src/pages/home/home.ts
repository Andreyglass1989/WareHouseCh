import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { BackendApiProvider } from '../../providers/backend-api/backend-api';

import { IonicSelectableComponent } from 'ionic-selectable';

import { BarcodeScanner, BarcodeScannerOptions} from '@ionic-native/barcode-scanner';


class Customer {
	public customer_id: number;
	public external_id: string;
}


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
// implements OnInit

  	customers: any;
  	customer: Customer;
	options: BarcodeScannerOptions;
	results: {};

  constructor(public navCtrl: NavController, private backend: BackendApiProvider, private barcode:BarcodeScanner) {
  	this.getCUSTOMER()

  }


    async scanBarcode(){
  	this.results = await this.barcode.scan();
  	console.log(this.results)
}

 	// ngOnInit(){
  //     this.backend.getCustomerAPI()
  //     // .subscribe(data=>{
  //       // this.air = data
  //       // console.log(data)
  //     // })
  //     // return this.air
  //   }


  getCUSTOMER(){
  	this.backend.getCustomerAPI().subscribe(data=>{
  		console.log(data)
  		this.customers = data
  	})
  	return this.customers
  }


  custChange(event: {
  	component: IonicSelectableComponent,
  	value: any
  }){
  	console.log("customer:", event.value);
  }

}
