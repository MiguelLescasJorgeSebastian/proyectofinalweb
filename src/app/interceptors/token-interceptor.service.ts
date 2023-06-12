import { Injectable } from '@angular/core';

import {
 HttpRequest,
 HttpHandler,
 HttpEvent,
 HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
 constructor(
   private tokenStorage:TokenStorageService
){}
intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   request = this.addToken(request);
   return next.handle(request);
 }
private addToken(request: HttpRequest<unknown>){
// Obtén el token de autenticación almacenado en el Local Storage
 const token=this.tokenStorage.getToken();
if (token) {
//Clona la solicitud original y agrega el token al encabezado, si el token existe
     const authReq = request.clone({
       headers: request.headers.set('Authorization', token)
});
     return authReq;
   }
   return request;
 }
}
