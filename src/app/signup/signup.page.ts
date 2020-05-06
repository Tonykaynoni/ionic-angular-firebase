import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  //loading: Loading;
  registerCredentials = { email: '', password: '' ,confirmation_password:''};
  constructor() { }

  ngOnInit() {
  }

  signupUser(): Promise<any> { 
    if (this.registerCredentials.password != this.registerCredentials.confirmation_password) {
      this.showPopup("Error", 'The password confirmation does not match.');
    } else {
    return firebase .auth() .createUserWithEmailAndPassword(this.registerCredentials.email, this.registerCredentials.password) 
    .then((newUserCredential: firebase.auth.UserCredential) => { 
      firebase .firestore() .doc(`/userProfile/${newUserCredential.user.uid}`) .set({ email: this.registerCredentials.email, notifications_frquency : 3 }); 
      this.showPopup("Success", "User Registration Successful");
    }) .catch(error => { 
      console.log("Error",error); 
      this.showPopup("Error", 'Registration Failed: ' + error.message );
      throw new Error(error); 
    }); 
  }
  }

  showPopup(title, text) {
    alert(title +" "+ text);
  }



}
