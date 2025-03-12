// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  template: `
    <div class="app-container">
      <header class="app-header">
        <h1>Sistema de Reportes de Mantenimiento</h1>
        <nav>
          <a [routerLink]="['/crear-reporte']" routerLinkActive="active">Crear Reporte</a>
          <a [routerLink]="['/lista-reportes']" routerLinkActive="active">Lista de Reportes</a>
        </nav>
      </header>
      
      <main>
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app-mantenimiento';
}