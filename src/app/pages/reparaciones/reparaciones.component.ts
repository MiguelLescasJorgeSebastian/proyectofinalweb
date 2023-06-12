import { Component, OnInit } from '@angular/core';
import { Reparaciones } from 'src/app/models/reparaciones';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-reparaciones',
  templateUrl: './reparaciones.component.html',
  styleUrls: ['./reparaciones.component.css']
})
export class ReparacionesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nom_cliente','nom_electro', 'fecha_inicio', 'estado','actions'];
   dataSource:Reparaciones[]=[];
    constructor(
     private apiService:ApiService
   ){}
   ngOnInit(): void {
     this.apiService.getReparaciones().subscribe(
       response=> {this.dataSource=response},
  err=>{console.log(err)}
    )
  }
  editItem(user:Reparaciones){}
  deleteItem(user:Reparaciones){}
  }