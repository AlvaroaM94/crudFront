import { Component, OnInit } from '@angular/core';
import { CursoService } from './curso.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  cursos:any[]=[];
  nuevo = {
    email:'',
    first_name:'',
    last_name:'',
    middle_name:'',
    password:'',
    userName:'',
    user_id:''
  }

  actualizar = {
    email:'',
    first_name:'',
    last_name:'',
    middle_name:'',
    password:'',
    userName:'',
    user_id:''
  }

  id: any = "";

  constructor(
    private CursoService:CursoService
  ){}

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(){
    this.CursoService.getAll()
    .subscribe((data:any) => this.cursos = data)
  }
  crear(){
    this.CursoService.create(this.nuevo)
    .subscribe(()=>{
      this.loadAll();
      this.nuevo={
        email:'',
        first_name:'',
        last_name:'',
        middle_name:'',
        password:'',
        userName:'',
        user_id:''
      }
    })
  }

  buscarPorId(id1: any){
    this.CursoService.getId(id1).pipe(
      map((data: any) => {
        // Mapear el resultado a un objeto TypeScript
        return {
          userId: data.userId,
          userName: data.userName
        };
      })
    ).subscribe(mappedData => {  
      // Asignar los datos mapeados a una propiedad de tu componente si es necesario
      this.id = mappedData;
    });
  }

  // Método para actualizar un usuario
actualizarUsuario(id: any) {
  const usuarioJSON = {
    user_id: id,
    userName: this.actualizar.userName,
    password: this.actualizar.password,
    first_name: this.actualizar.first_name,
    middle_name: this.actualizar.middle_name,
    last_name: this.actualizar.last_name,
    email: this.actualizar.email
  };
  console.log(usuarioJSON)

  this.CursoService.putUser(this.actualizar.user_id,usuarioJSON,)
    .subscribe(
      () => {
        console.log('Usuario actualizado correctamente');
        this.loadAll(); // Recargar la lista de usuarios después de actualizar
      },
      error => {
        console.error('Error al actualizar usuario:', error);
      }
    );
}

  // Método para eliminar un usuario
  eliminarUsuario(id: any) {
    this.CursoService.delete(id)
      .subscribe(
        () => {
          console.log('Usuario eliminado correctamente');
          this.loadAll(); // Recargar la lista de usuarios después de eliminar
        },
        error => {
          console.error('Error al eliminar usuario:', error);
        }
      );
  }

}

