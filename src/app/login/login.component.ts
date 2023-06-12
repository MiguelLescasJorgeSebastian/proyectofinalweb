import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form=this.fb.group({
    email:[null,[Validators.required,Validators.email]],
    password:[null,[Validators.required]]
  });
  constructor(
    private fb:FormBuilder,
    private authService:AuthService,
    private router:Router
  ){}
 onSubmit(){
  if(this.form.valid){
    const {email,password}=this.form.value;
    this.authService.login(email,password).subscribe(
      response=>{
        console.log(response);
        this.router.navigate(['/admin']);
}, err=>{
        console.error(err);
      }
) }
 }
}
