import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Reporte } from '../models/reporte.model';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {
  private reportes: Reporte[] = [];
  private reportesSubject = new BehaviorSubject<Reporte[]>([]);
  
  constructor() {
    // Cargar reportes almacenados en localStorage si existen
    const savedReportes = localStorage.getItem('reportes');
    if (savedReportes) {
      this.reportes = JSON.parse(savedReportes).map((reporte: any) => ({
        ...reporte,
        fecha: new Date(reporte.fecha)
      }));
      this.reportesSubject.next([...this.reportes]);
    }
  }

  getReportes(): Observable<Reporte[]> {
    return this.reportesSubject.asObservable();
  }

  getReporteById(id: string): Reporte | undefined {
    return this.reportes.find(reporte => reporte.id === id);
  }

  crearReporte(reporte: Omit<Reporte, 'id' | 'fecha' | 'estado'>): void {
    const nuevoReporte: Reporte = {
      ...reporte,
      id: `EQ-${new Date().getFullYear()}-${String(this.reportes.length + 1).padStart(3, '0')}`,
      fecha: new Date(),
      estado: 'Activo'
    };
    
    this.reportes.push(nuevoReporte);
    this.reportesSubject.next([...this.reportes]);
    this.guardarEnStorage();
  }

  eliminarReporte(id: string): void {
    this.reportes = this.reportes.filter(reporte => reporte.id !== id);
    this.reportesSubject.next([...this.reportes]);
    this.guardarEnStorage();
  }

  private guardarEnStorage(): void {
    localStorage.setItem('reportes', JSON.stringify(this.reportes));
  }
}