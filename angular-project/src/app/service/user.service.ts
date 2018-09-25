import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

@Injectable({
	providedIn: 'root'
})
export class UserService {

	users: User[] = [];
	constructor(private http: HttpClient) { }

	getAllUser() {
		var self = this;
		if (this.users == undefined || this.users.length == 0) {
			const uri = 'http://localhost:3000/user/getAll';
			this.http.get(uri).subscribe(res => {
				res.forEach(function(item, index) {
					console.log(item);
					let user = new User();
					user.iduser = item.iduser;
					user.username = item.username;
					user.email = item.email;
					user.isActive = item.isActive;
					self.users.push(user);
				});
			});
			console.log('Get data from API');
			return self.users;
		} else {
			console.log('Get data from memori');
			return self.users;
		}
	}

	addUser(username, email, isActive) {
    // const uri = 'http://localhost:3000/user/add';
    // const obj = {
	   //  name: name,
	   //  price: price
    // };
    // this.http.post(uri, obj)
    //     .subscribe(res => console.log('Done'));
	}
}
