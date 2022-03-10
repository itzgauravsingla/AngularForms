import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { Form, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  genders = ['male', 'female'];
  signUpForm: FormGroup;
  forbiddenUserNames = ['Ram', 'Sham', 'Sita', 'Gita'];

  ngOnInit(): void {
      this.signUpForm = new FormGroup({
        'userData': new FormGroup({
          'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]), //binding this as Angular will be calling it later but this in forbiddenNames is the class reference
          'email': new FormControl(null, [Validators.required, Validators.email], [this.forbiddenEmail])
        }),
        'gender': new FormControl('male'),
        'hobbies': new FormArray([])
      });

      // this.signUpForm.statusChanges.subscribe(
      //   (values) => console.log(values)
      // );

      // this.signUpForm.valueChanges.subscribe(
      //   (values) => console.log(values)
      // );
  }

  onAddHobby(){
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signUpForm.get('hobbies')).push(control);
  }

  get controls() {
    return (this.signUpForm.get('hobbies') as FormArray).controls;
  }

  onSubmit(){
    console.log(this.signUpForm);
  }

  forbiddenNames(control: FormControl): {[s: string]: boolean}{
    if(this.forbiddenUserNames.indexOf(control.value) !== -1){
      return {'nameIsForbidden': true};
    }
    return null;
  }

  forbiddenEmail(control: FormControl): Promise<{[s: string]: boolean}>{
    return new Promise<{[s: string]: boolean}>((resolve, reject) => {
      setTimeout(() => {
        if(control.value === 'test@test.com')
          resolve({'emailIsForbidden': true});
        else 
          resolve(null);
      },1500);
    })
  }

  onDefault(){
    this.signUpForm.setValue({
      'userData': {
        'username': 'Gaurav Singla',
        'email': 'itzgauravsingla@gmail.com'
      },
      'gender': 'male',
      'hobbies': ['abc', 'xyz']
    })
  }

  onReset(){
    this.signUpForm.reset();
    const len = (<FormArray>this.signUpForm.get('hobbies')).length;
    // console.log(len);
    for(let i=len-1; i>-1; i--){
      console.log(i);
      (<FormArray>this.signUpForm.get('hobbies')).removeAt(i);
    }
    console.log(this.signUpForm)
  }

}
