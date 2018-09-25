import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component'; // <-- declare component
import { AppRoutingModule } from './routes/app-routing.module'; // <-- declare route
import { UserComponent } from './components/user/user.component';  


@NgModule({
  declarations: [
    AppComponent,
    TodoComponent, // <-- declare component
    UserComponent 
  ],
  imports: [
    BrowserModule,
    FormsModule, // <-- NgModel lives here
    AppRoutingModule  // <-- declare route
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }