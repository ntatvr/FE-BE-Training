import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component'; // <-- declare component
import { AppRoutingModule } from './routes/app-routing.module'; // <-- declare route
import { UserComponent } from './components/user/user.component';  
import { UserService } from './service/user.service';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent, // <-- declare component
    UserComponent 
  ],
  imports: [
    BrowserModule,
    FormsModule, // <-- NgModel lives here
    AppRoutingModule,  // <-- declare route
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }