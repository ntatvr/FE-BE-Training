import { NgModule } from '@angular/core';

// @unused
// import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// import modules
import { TodoComponent } from '../todo/todo.component';

const routes: Routes = [
	// Default path
	{path: '', redirectTo : '/todo', pathMatch:'full'},
	{path: 'todo', component : TodoComponent}
];


@NgModule({
  imports: [
    // CommonModule 
    RouterModule.forRoot(routes)
  ],
  // @unused
  // declarations: []
  exports: [RouterModule]
})
export class AppRoutingModule { }
