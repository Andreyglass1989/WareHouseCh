import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { BackendApiProvider } from '../../providers/backend-api/backend-api';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
// implements OnInit
	Customers : {}
  constructor(public navCtrl: NavController, private backend: BackendApiProvider) {
  	this.getCUSTOMER()
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
  		this.Customers = data
  	})
  	return this.Customers
  }

}
