import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-crearempleado',
  templateUrl: './crearempleado.component.html',
  styleUrls: ['./crearempleado.component.css']
})
export class CrearempleadoComponent {
  form = this.fb.group({
    nombre_cliente: [null, [Validators.required]],
    nombre_electro: [null, [Validators.required]],
    estado: [null, [Validators.required]],
    

  });

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router:Router
  ) {}
  onSubmit() {
    if (this.form.valid) {
      const { nombre_cliente, nombre_electro, estado } = this.form.value;
      
      this.apiService.createEmpleado(nombre_cliente, nombre_electro, estado, ).subscribe(
        response => {
          console.log(response);
          // Mostrar mensaje de confirmación
          alert('El formulario se ha enviado correctamente.');
          // Redirigir al usuario a otra URL
          this.router.navigate(['/admin/empleados']);
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