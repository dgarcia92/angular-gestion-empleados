import Swal from 'sweetalert2'
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Empleado } from '../empleado';
import { EmpleadoService } from '../empleado.service';

@Component({
  selector: 'app-lista-empleados',
  templateUrl: './lista-empleados.component.html',
  styleUrls: ['./lista-empleados.component.css']
})
export class ListaEmpleadosComponent implements OnInit {

  empleados:Empleado[];

  constructor(private empleadoServicio: EmpleadoService, private router : Router) { }

  ngOnInit(): void {
      this.obtenerEmpleados();
  }

  private obtenerEmpleados()
  {
    this.empleadoServicio.onbtenerListaEmpleados().subscribe( data => {
        this.empleados = data;
    });
  }

  actualizarEmpleado(id:number)
  {
      this.router.navigate(['actualizar-empleado', id]);
  }

  
  eliminaEmpleado(id:number)
  {

    Swal.fire({  //Libreria Swal para modal chidos
      title: '¿Estás seguro?',
      text: 'Confirma si deseas eliminar al empleado',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      confirmButtonColor: '#3085d6'
    }).then((result) => {
      if (result.isConfirmed) {
        
          //nuestro servicio echo acá en angular
          this.empleadoServicio.eliminarempleado( id ).subscribe( data => {
            console.log( data );
            this.obtenerEmpleados();

            Swal.fire(
              'Empleado eliminado',
              'El empleado ha sido eliminado con éxito',
              'success',
            );
        });
      
      }        
    })
    
    
  }

  verDetalleEmpleado(id:number)
  {
      this.router.navigate(['detalle-empleado', id]);
  }


}
