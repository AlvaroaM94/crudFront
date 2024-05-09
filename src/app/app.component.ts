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
}
