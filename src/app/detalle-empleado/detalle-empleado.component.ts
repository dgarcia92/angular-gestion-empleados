import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Empleado } from '../empleado';
import { EmpleadoService } from '../empleado.service';

@Component({
  selector: 'app-detalle-empleado',
  templateUrl: './detalle-empleado.component.html',
  styleUrls: ['./detalle-empleado.component.css']
})
export class DetalleEmpleadoComponent implements OnInit {

  id:number;
  empleado:Empleado;


  constructor(private route: ActivatedRoute, private empleadoServicio : EmpleadoService) { }

  ngOnInit(): void {
    
    this.id = this.route.snapshot.params['id'];
    this.empleado = new Empleado();

    this.empleadoServicio.obtenerEmpleadoPorID( this.id ).subscribe( data => {
        this.empleado = data;

        Swal.fire(`Detalles del empleado`, `<h5>${this.empleado.nombre}</h5>`);

    });
  }

}
