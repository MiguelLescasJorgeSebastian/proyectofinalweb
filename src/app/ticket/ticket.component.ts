import { Component, OnInit } from '@angular/core';
import { Reparaciones } from '../models/reparaciones';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  pedido!: Reparaciones;

  constructor(private route: ActivatedRoute,
     private router: Router, 
     private apiService: ApiService) {}
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.obtenerPedido(id);
      } else {
        // Si no se proporciona un ID en los parámetros de consulta, redirige a otra página o muestra un mensaje de error
        
      }
    });
  }

  obtenerPedido(id:number) {
    this.apiService.getReparacion(id).subscribe(
      response=> {this.pedido=response},
 err=>{console.log(err)}
   )
  }
}