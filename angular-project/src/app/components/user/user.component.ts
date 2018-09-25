import { Component, OnInit } from '@angular/core';

//import class user
import { User } from '../models/user';

@Component({
	selector: 'app-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

	fakeUsers: User[] = [
		{
			iduser : 1,
			username : "xyz",
			email : "xyz@xyz.com",
			isActive : true
		}
	];
	users: User[];
	constructor() { }

	ngOnInit() {
		this.users = this.fakeUsers;
	}

}
