export interface Reporte {
    id: string;
    idEquipo: string;
    nombreCliente: string;
    imagen: string;
    descripcion: string;
    fecha: Date;
    estado: 'Activo' | 'Inactivo';
  }