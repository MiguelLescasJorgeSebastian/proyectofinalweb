import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reparaciones } from '../models/reparaciones';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private http:HttpClient
 ){}
  getReparaciones(){
    return this.http.get<Reparaciones[]>('http://proyectoclase.test/api/reparacion');
 }
 createNota(nombre_cliente:any, nombre_electro:any,fecha:any,estado:any,costo:any){
  const form= new FormData();
  form.append('nom_cliente',nombre_cliente);
  form.append('nom_electro',nombre_electro);
  form.append('fecha_ingreso',fecha);
  form.append('estado',estado);
  form.append('costo',costo);
  const url= 'http://proyectoclase.test/api/reparacion';
  return this.http.post<Reparaciones>(url,form)
 }
}
