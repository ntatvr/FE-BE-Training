import { Component, OnInit } from '@angular/core';

//import class user
import { User } from '../../models/user';
import { UserService } from '../../service/user.service';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

@Component({
	selector: 'app-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

	title: string;
	angForm: FormGroup;
	isSuccess: boolean;
	message: string;
	defaultUsername: string;

	fakeUsers: User[] = [
		{
			iduser : 1,
			username : "xyz",
			email : "xyz@xyz.com",
			isActive : true
		},
		{
			iduser : 2,
			username : "xyz",
			email : "xyz@xyz.com",
			isActive : false
		}
	];
	users: User[];
	constructor(private userService : UserService, private formBuilder : FormBuilder) {
		this.createForm();
	}

	createForm() {
		this.angForm = this.formBuilder.group({
			username: ['', Validators.required ],
      		email: ['', Validators.required ]
		});
	}

	addUser(username, email, isActive) {
		var self = this;
      	self.userService.addUser(username, email, isActive).subscribe(res => {
      		if (res['status'] === "Fail") {
      			self.isSuccess = false;
      			this.message = res['message'];
      		} else {
      			self.isSuccess = true;
      			self.message = "Insert Successful!";

      			let user = new User();
				user.iduser = res['rows'][0].iduser;
				user.username = res['rows'][0].username;
				user.email = res['rows'][0].email;
				user.isActive = res['rows'][0].isActive;
      			self.users.push(user);
      		}
      	});
  	}

  	deleteUser(iduser) {
  		if(confirm("Do you really want to do this?")) {
			var self = this;
			self.userService.deleteUser(iduser).subscribe(res => {
				if (res['status'] === "Fail") {
	      			self.isSuccess = false;
	      			this.message = res['message'];
	      		} else {
	      			self.isSuccess = true;
	      			self.message = "Delete Successful!";

	      			// remove user
	      			const user = self.users.find(user => user.iduser === iduser);
	      			self.users.splice(self.users.indexOf(user));
	      		}
			});
		}
	}

	updateUser(iduser) {
		alert("To Be Updated!");
	}

  	getAllUser() {
  		return this.userService.getAllUser();
  	}

	ngOnInit() {
		this.users = this.getAllUser();
		this.title = "USER";
		this.defaultUsername = "xyz";
	}

}
