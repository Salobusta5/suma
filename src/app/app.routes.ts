import { Routes } from '@angular/router';
import { CrearReporteComponent } from './components/crear-reporte/crear-reporte.component';
import { ListaReportesComponent } from './components/lista-reportes/lista-reportes.component';
import { ReporteDetalleComponent } from './components/reporte-detalle/reporte-detalle.component';

export const routes: Routes = [
  { path: '', redirectTo: 'crear-reporte', pathMatch: 'full' },
  { path: 'crear-reporte', component: CrearReporteComponent },
  { path: 'lista-reportes', component: ListaReportesComponent },
  { path: 'reporte/:id', component: ReporteDetalleComponent },
  { path: '**', redirectTo: 'crear-reporte' }
];