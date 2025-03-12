// src/app/components/reporte-detalle/reporte-detalle.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReporteService } from '../../services/reporte.service';
import { Reporte } from '../../models/reporte.model';

@Component({
  selector: 'app-reporte-detalle',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './reporte-detalle.component.html',
  styleUrls: ['./reporte-detalle.component.scss']
})
export class ReporteDetalleComponent implements OnInit {
  reporte: Reporte | undefined;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reporteService: ReporteService
  ) {}
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.reporte = this.reporteService.getReporteById(id);
      
      if (!this.reporte) {
        this.router.navigate(['/lista-reportes']);
      }
    });
  }
  
  formatDate(date: Date): string {
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  }
  
  eliminarReporte(): void {
    if (this.reporte && confirm('¿Estás seguro de que deseas eliminar este reporte?')) {
      this.reporteService.eliminarReporte(this.reporte.id);
      this.router.navigate(['/lista-reportes']);
    }
  }
}