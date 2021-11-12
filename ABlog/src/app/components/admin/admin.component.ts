import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  public opened = false;
  
  constructor() {
    this.prueba();
    this.borrar_localStorage();
  }

  ngOnInit(): void {
  }

  grabar_localStorage(){
    let nombre: string ="Fernando";
    localStorage.setItem("nombre", nombre);
  }

  obtener_localStorage(){
    let nombre = localStorage.getItem("nombre");
    console.log("Nombre: ", nombre);
  }

  borrar_localStorage(){
    localStorage.removeItem('nombre');
    localStorage.removeItem('persona');
    console.log("Remove item");  
  }

  prueba(){
    this.grabar_localStorage();
    this.obtener_localStorage();
  }

 



}
