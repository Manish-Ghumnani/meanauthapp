import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;

  constructor(private validateService: ValidateService, private flashMessagesService: FlashMessagesService) {
    
   }

  ngOnInit() {
  }

  onRegisterSubmit(){
      console.log(this.name);
      const user = {
        name: this.name,
        email: this.email,
        username: this.email,
        password: this.password
      }

      //Required Fields
  if(!this.validateService.validateRegister(user))
  {
    this.flashMessagesService.show('Pls fill in all the fields!', {cssClass: 'alert-danger', timeout: 3000});
    return false;
  }
  
  //Validate email
  if(!this.validateService.validateEmail(user.email))
  {
    this.flashMessagesService.show('Pls enter a valid email!', {cssClass: 'alert-danger', timeout: 3000});
    return false;
  }
  
  }

  
}
