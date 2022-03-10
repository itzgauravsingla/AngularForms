import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  defaultQues = "pet"; //here pet is the value of the option
  answer = "";
  genders:string[] = ['male', 'female'];

  @ViewChild('f') signUpForm!: NgForm;

  suggestUserName() {
    const suggestedName = 'Superuser';
  }
  
  // onSubmit(form: NgForm){
  //   console.log(form.value);
  // }

  onSubmit(){
    console.log(this.signUpForm);


  }
}
