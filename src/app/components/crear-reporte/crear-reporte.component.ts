// src/app/components/crear-reporte/crear-reporte.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ReporteService } from '../../services/reporte.service';

@Component({
  selector: 'app-crear-reporte',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-reporte.component.html',
  styleUrls: ['./crear-reporte.component.scss']
})
export class CrearReporteComponent {
  idEquipo: string = '';
  nombreCliente: string = '';
  imagen: string | null = null;
  descripcion: string = '';
  
  constructor(
    private reporteService: ReporteService,
    private router: Router
  ) {}
  
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      
      reader.onload = () => {
        this.imagen = reader.result as string;
      };
      
      reader.readAsDataURL(file);
    }
  }
  
  capturarImagen(): void {
    // Acceder a la cámara y capturar foto
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          // Crear elementos temporales para mostrar y capturar la imagen
          const video = document.createElement('video');
          const canvas = document.createElement('canvas');
          
          video.srcObject = stream;
          video.play();
          
          // Después de 1 segundo tomar la foto (dar tiempo a que la cámara se inicie)
          setTimeout(() => {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(video, 0, 0);
              this.imagen = canvas.toDataURL('image/jpeg');
            }
            
            // Detener la transmisión de video
            stream.getTracks().forEach(track => track.stop());
          }, 1000);
        })
        .catch(error => {
          console.error('Error al acceder a la cámara:', error);
          alert('No se pudo acceder a la cámara. Verifica los permisos e intenta de nuevo.');
        });
    } else {
      alert('Tu dispositivo no soporta la captura de imágenes.');
    }
  }
  
  guardarReporte(): void {
    if (!this.idEquipo || !this.nombreCliente || !this.imagen || !this.descripcion) {
      alert('Todos los campos son obligatorios');
      return;
    }
    
    this.reporteService.crearReporte({
      idEquipo: this.idEquipo,
      nombreCliente: this.nombreCliente,
      imagen: this.imagen,
      descripcion: this.descripcion
    });
    
    alert('Reporte guardado correctamente');
    this.resetForm();
    this.router.navigate(['/lista-reportes']);
  }
  
  resetForm(): void {
    this.idEquipo = '';
    this.nombreCliente = '';
    this.imagen = null;
    this.descripcion = '';
  }
}