import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crearorden',
  templateUrl: './crearorden.component.html',
  styleUrls: ['./crearorden.component.css']
})
export class CrearordenComponent {
  form = this.fb.group({
    nombre_cliente: [null, [Validators.required]],
    nombre_electro: [null, [Validators.required]],
    estado: [null, [Validators.required]],
    costo: [null, [Validators.required]],

  });

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router:Router
  ) {}
  onSubmit() {
    if (this.form.valid) {
      const { nombre_cliente, nombre_electro, estado, costo } = this.form.value;
      const fecha = new Date().toISOString().slice(0, 10);
      this.apiService.createNota(nombre_cliente, nombre_electro, fecha, estado, costo).subscribe(
        response => {
          console.log(response);
          // Mostrar mensaje de confirmación
          alert('El formulario se ha enviado correctamente.');
          // Redirigir al usuario a otra URL
          this.router.navigate(['/admin/pedidos']);
        },
        error => {
          console.error(error);
          // Mostrar mensaje de error si ocurre algún problema en la petición
          alert('Ha ocurrido un error al enviar el formulario. Por favor, inténtalo nuevamente.');
        }
      );
    }
  }
}
