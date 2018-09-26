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
		const uri = 'http://localhost:3000/user/getAll';
		this.http.get(uri).subscribe(res => {
			res['rows'].forEach(function(item, index) {
				// console.log(item);
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
	}

	addUser(username, email, isActive) {
		
		// console.log('username: {}', username);
		// console.log('email: {}', email);
		// console.log('isActive: {}', isActive);

		const uri = 'http://localhost:3000/user/insert';
		const user = {
			username: username,
			email: email,
			isActive: isActive
		};

		return this.http.post(uri, user);
	}

	deleteUser(iduser) {
		const uri = 'http://localhost:3000/user/remove/' + iduser;
		return this.http.get(uri);
	}
}
