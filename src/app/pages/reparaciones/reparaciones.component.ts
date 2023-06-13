import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Reparaciones } from 'src/app/models/reparaciones';
import { ApiService } from 'src/app/services/api.service';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';



@Component({
  selector: 'app-reparaciones',
  templateUrl: './reparaciones.component.html',
  styleUrls: ['./reparaciones.component.css']
})
export class ReparacionesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nom_cliente','nom_electro', 'fecha_inicio', 'estado','actions'];
   dataSource:Reparaciones[]=[];
   selectedEstado: string = '';
    estados: any[] = ['en reparacion','reparado'];


   pedido!: Reparaciones;
   constructor(
    private apiService:ApiService,
  ){}
   ngOnInit(): void {
 
     this.apiService.getReparaciones().subscribe(
       response=> {this.dataSource=response},
  err=>{console.log(err)}
    )
    
  }
  editItem(user:Reparaciones){}
  obtenerEstados() {
    this.estados = Array.from(new Set(this.dataSource.map(element => element.estado)));
  }
  filtrarPorEstado() {
    // Si se selecciona un estado, filtra el dataSource
    if (this.selectedEstado) {
      this.dataSource = this.dataSource.filter(element => element.estado === this.selectedEstado);
    } else {
      // Si no se selecciona ningún estado, muestra todos los elementos del dataSource
      this.apiService.getReparaciones().subscribe(
        response=> {this.dataSource=response},
   err=>{console.log(err)}
     )
    }
  }
  
 
  deleteItem(id: number) {
    this.apiService.deleteEmpleado(id).subscribe(
      () => {
        console.log('Reparación eliminada correctamente');
        this.refreshDataSource();
      },
      error => {
        console.error('Error al eliminar la reparación:', error);
      }
    );
  }
  obtenerPedido(id: number) {
    this.apiService.getReparacion(id).subscribe(
      response => {
        if (response && response.id) {
          this.pedido = response;
        }
      },
      err => {
        console.log(err);
      }
    );
  }
  async generarPDF(id:number) {
    // Crear un nuevo documento PDF
    const pdfDoc = await PDFDocument.create();
  
    // Agregar una nueva página al documento
    const page = pdfDoc.addPage();
    this.obtenerPedido(id);
    // Definir el contenido del PDF

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontSize = 12;

  page.drawText('Ticket de Pedido', { x: 50, y: page.getHeight() - 50, size: fontSize, font });
  page.drawText('Número de Pedido: ' + this.pedido.id, { x: 50, y: page.getHeight() - 70, size: fontSize, font });
  page.drawText('Fecha: ' + this.pedido.nom_cliente, { x: 50, y: page.getHeight() - 90, size: fontSize, font });
  page.drawText('Cliente: ' + this.pedido.nom_electro, { x: 50, y: page.getHeight() - 110, size: fontSize, font });

  
    // Agregar el contenido a la página
  
    // Codificar el documento PDF como ArrayBuffer
    const pdfBytes = await pdfDoc.save();
  
    // Crear un blob a partir del ArrayBuffer
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  
    // Crear una URL para el blob
    const url = URL.createObjectURL(blob);
  
    // Abrir una nueva pestaña del navegador con el PDF
    window.open(url);
  }
  
  imprimir (id:number){
      this.generarPDF(id);
  }
  private refreshDataSource() {
    this.apiService.getReparaciones().subscribe(
      response => {
        this.dataSource = response;
      },
      error => {
        console.log(error);
      }
    );
  }
  generarContenidoPDF(id:number) {
    const contenido:any = {
      content: [
        { text: 'Ticket de Pedido', style: 'header' },
        { text: 'Número de Pedido: ' + this.pedido.id, style: 'subheader' },
        { text: 'Fecha: ' + this.pedido.nom_cliente, style: 'subheader' },
        { text: 'Cliente: ' + this.pedido.nom_electro, style: 'subheader' },
        // Otros campos del pedido
      ],
      styles: {
        header: { fontSize: 18, bold: true, margin: [0, 0, 0, 10] },
        subheader: { fontSize: 14, bold: true, margin: [0, 10, 0, 5] }
      }
    };
  
    return contenido;
  }
  }