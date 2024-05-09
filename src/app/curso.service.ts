import { HttpClient } from '@angular/common/http';
import { HtmlParser } from '@angular/compiler';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  constructor(
    private http:HttpClient
  ) { }
  getAll(){
    return this.http.get('http://localhost:5000/v1/users/get')
  }

  create(data:any){
    return this.http.post('http://localhost:5000/v1/users/create',data)
  }

  
  getId(data:any){
    console.log(data)
    return this.http.get(`http://localhost:5000/v1/users/get/${data}`)
  }




}
