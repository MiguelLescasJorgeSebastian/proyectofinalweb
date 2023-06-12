import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap, tap } from 'rxjs';
import { TokenStorageService } from './token-storage.service';
import { Token } from '../models/token';

@Injectable({
 providedIn: 'root'
})
export class AuthService {
 constructor(
   private http:HttpClient,
   private tokenStorage:TokenStorageService
){}
login(email:any, password:any){
  const form= new FormData();
  form.append('correo',email);
  form.append('password',password);
  const url= 'http://proyectoclase.test/api/login';
  return this.http.post<Token>(url,form)
  .pipe(
    tap(
      response=>this.tokenStorage.setToken(response) 
      ) )
    }
    logout(){
      this.tokenStorage.clearToken();
    }
} 