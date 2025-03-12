// src/app/components/lista-reportes/lista-reportes.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReporteService } from '../../services/reporte.service';
import { Reporte } from '../../models/reporte.model';

@Component({
  selector: 'app-lista-reportes',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './lista-reportes.component.html',
  styleUrls: ['./lista-reportes.component.scss']
})
export class ListaReportesComponent implements OnInit {
  reportes: Reporte[] = [];
  
  constructor(private reporteService: ReporteService) {}
  
  ngOnInit(): void {
    this.reporteService.getReportes().subscribe(reportes => {
      this.reportes = reportes;
    });
  }
  
  formatDate(date: Date): string {
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  }
  
  eliminarReporte(id: string, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    
    if (confirm('¿Estás seguro de que deseas eliminar este reporte?')) {
      this.reporteService.eliminarReporte(id);
    }
  }
}