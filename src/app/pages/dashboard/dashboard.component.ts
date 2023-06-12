import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(
    private router:Router
  ){}
  generarReparacion() {
    this.router.navigate(['/admin/crear']);
  }

  registrarEmpleado() {
    this.router.navigate(['/admin/empleado']);
  }

  estatusPedido() {
    this.router.navigate(['/admin/pedidos']);
  }
}
