import { Injectable } from '@angular/core';
import { Token } from '../models/token';
@Injectable({
 providedIn: 'root'
})
export class TokenStorageService {
 constructor() { }
 setToken(token:Token){
   localStorage.setItem('jwtToken',token.access_token)
}
 getToken(){
   return localStorage.getItem('jwtToken');
}
 clearToken(){
   localStorage.removeItem('jwtToken');
} }
