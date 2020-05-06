import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  registerCredentials = { email: '', password: ''};
  constructor() { }

  ngOnInit() {
  }

  login() { 
    if (this.registerCredentials.password == '' && this.registerCredentials.email == '') {
      this.showPopup("Error", 'Cannot be empty');
    } else {
    return firebase.auth().signInWithEmailAndPassword(
      this.registerCredentials.email,
      this.registerCredentials.password).
      then((result) => {
        this.showPopup("Login Successful",  'You have been successfully logged in!');    
      }).catch(error => { 
      console.log("Error",error); 
      this.showPopup("Login Failed",  error.message );
      throw new Error(error); 
    }); }
 }

 showPopup(title, text) {
    alert(title +" "+ text);
 }

}
