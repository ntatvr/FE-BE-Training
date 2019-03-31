import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FCM } from '@ionic-native/fcm/ngx';

@Component({
	selector: 'app-cart',
	templateUrl: './cart.page.html',
	styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

	message: any = '';
	token: any = '';

	constructor (
		private route: ActivatedRoute,
		private fcm: FCM) {
		// Get message from route navigate
		this.message = this.route.snapshot.params['message'];
		//his.token = this.fcm.getToken();
	}

	ngOnInit() {

	}

}
