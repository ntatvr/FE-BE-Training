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
      	this.userService.addUser(username, email, isActive);
  	}

  	getAllUser() {
  		return this.userService.getAllUser();
  	}

	ngOnInit() {
		this.users = this.getAllUser();
		this.title = "USER";
	}

}
