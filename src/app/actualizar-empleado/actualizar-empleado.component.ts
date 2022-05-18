import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Empleado } from '../empleado';
import { EmpleadoService } from '../empleado.service';

@Component({
  selector: 'app-actualizar-empleado',
  templateUrl: './actualizar-empleado.component.html',
  styleUrls: ['./actualizar-empleado.component.css']
})
export class ActualizarEmpleadoComponent implements OnInit {

  id:number;
  empleado:Empleado = new Empleado();

  constructor(private route : ActivatedRoute, private empleadoServicio : EmpleadoService, private router : Router) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];
    this.empleado = new Empleado();

    this.empleadoServicio.obtenerEmpleadoPorID( this.id ).subscribe( data => {
        this.empleado = data;
    });
  }


  actualizaEmpleado()
  {
    this.empleadoServicio.actualizarEmpleado(this.id, this.empleado).subscribe( data => {
      console.log( data);
      
      Swal.fire(`Ok`, 'Empleado actualizado correctamente', 'success');

      this.irALaListaDeEmpleados();
    },
    error => {
      console.log( error);
      Swal.fire(`Ups`, 'No se actualizó el empleado', 'error');
    });
  }


  irALaListaDeEmpleados()
  {
      this.router.navigate(['/empleados']);
  }

  onSubmit()
  {
      this.actualizaEmpleado();
  }
}
