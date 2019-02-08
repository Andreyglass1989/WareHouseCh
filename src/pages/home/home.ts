import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BackendApiProvider } from '../../providers/backend-api/backend-api';
import { IonicSelectableComponent } from 'ionic-selectable';
import { BarcodeScanner, BarcodeScannerOptions} from '@ionic-native/barcode-scanner';
import { ChangeDetectorRef } from '@angular/core';
import { SpeechRecognition } from '@ionic-native/speech-recognition';

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
  	customer1: Customer;
	options: BarcodeScannerOptions;
	results: {};
	matches: String[];
	isRecording = false;

	packData:{};
	size_box:{};
	message:{};

  constructor(public navCtrl: NavController, private backend: BackendApiProvider, private barcode:BarcodeScanner, private speechRecognition: SpeechRecognition,
private cd: ChangeDetectorRef) {
  	this.getCUSTOMER()

   	this.packData = {
  		"point": null,
  		"weight": null,
  		"comment": null,
  		"customer": null,
  	}

  	this.message= {
  		"success": ""
  	}

  	this.size_box = {
  		"width": null,
  		"height": null,
  		"length": null,
  		"track": null
  	}

  }

  startListening(){
  	let options = {
  		language: 'en-US'
  	}
  	this.speechRecognition.startListening().subscribe(matches =>{
  		this.matches = matches;
  		this.cd.detectChanges();
  	});

  	this.isRecording = true;
}


  stopListening(){
  	this.speechRecognition.stopListening().then(() =>{
  		this.isRecording = false;
  	});
  }

  getPermission(){
  	this.speechRecognition.hasPermission()
  	.then((hasPermission: boolean) =>{
  		if(!hasPermission){
  			this.speechRecognition.requestPermission();
  		}
  	})
}



    async scanBarcode(){
  	this.results = await this.barcode.scan();
  	console.log(this.results)
}

 	// ngOnInit(){

  //   	return this.packData
  //   }


  getCUSTOMER(){
  	this.backend.getCustomerAPI().subscribe(data=>{
  		// console.log(data)
  		this.customers = data
  	})
  	return this.customers
  }


  custChange(event: {
  	component: IonicSelectableComponent,
  	value: any
  }){
  	console.log("customer:", event.value, event.value.customer_id);
  	this.packData["customer"] = event.value.customer_id 
  	// return this.packData["customer"]
  }

  pushServe(event){
  	event.preventDefault()
     this.packData['volume'] = Number((this.size_box['height']/100)*(this.size_box['width']/100)*(this.size_box['length']/100)).toFixed(4)
     this.packData['comment'] = this.size_box["track"] + "\n" + this.packData["comment"]
     console.log("working...", this.packData)

     this.backend.pushToServer(this.packData).subscribe(data=>{
       console.log("success pack create", data)
       this.message["success"] = "success pack create"
       this.zeroing()
     }, error=>{
       console.log("error", error)
     })
  
  }


  	zeroing(){
  		this.packData = {
  		"point": null,
  		"weight": null,
  		"comment": null,
  		// "customer": null,
       }
       this.size_box = {
       	"width": null,
       	"height": null,
       	"length": null,
       	"track": null
       } 
  	}


}
