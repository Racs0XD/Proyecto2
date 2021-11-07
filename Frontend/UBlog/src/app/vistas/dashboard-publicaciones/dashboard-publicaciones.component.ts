import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../servicios/api/api.service';
import { Router } from '@angular/router'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PdfMakeWrapper, Table, Img } from 'pdfmake-wrapper';
import { ITable } from 'pdfmake-wrapper/lib/interfaces';
import { PublicacionI } from '../../modelos/publicacion.interface'

@Component({
  selector: 'app-dashboard-publicaciones',
  templateUrl: './dashboard-publicaciones.component.html',
  styleUrls: ['./dashboard-publicaciones.component.css']
})
export class DashboardPublicacionesComponent implements OnInit {

  
  //-------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------
  //-------------------------------------------  Constructor  ---------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------  

  constructor(private api: ApiService, private router: Router) { }
  editarPublicacion = new FormGroup({
    url: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required)
  })

  //-------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------
  //-------------------------------------------  ngOnInit  ---------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------

  imagenes!: PublicacionI[];
  ngOnInit(): void {
    this.checkLocalStorage() 
    this.api.listarImagenes().toPromise().then(data => {
      this.imagenes = data;      
    })       
  }

  //-------------------------------------------  Validar Admin  ---------------------------------------------------
  checkLocalStorage() {
    if (localStorage.getItem('tokenA')) {
      this.router.navigate(['dashboard-publicaciones']);
    } else {
      this.router.navigate(['login'])
    }
  }
  
  //-------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------
  //-------------------------------------------  Metodos  ---------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------

  //-------------------------------------------  Editar  ---------------------------------------------------
  editarImagen(imagen: any) {
    let img = imagen.replaceAll("/","[ ]")   
    this.router.navigate(['editar-publicacion', img])
  }
  //-------------------------------------------  Ver  ---------------------------------------------------
  verImagen(imagen: any) {
    let img = imagen.replaceAll("/","[ ]");
    this.router.navigate(['verpublicacion', img])
  }

  //-------------------------------------------  Eliminar  ---------------------------------------------------
 
  eliminarImagen(url: any) {    
    this.router.navigate(['dashboard-publicaciones'])
    let datos: PublicacionI = this.editarPublicacion.value;
    let img = url.replaceAll("/","[ ]") 
    this.api.eliminarPublicacion(datos, img).subscribe(data => {
    })
  }
  

  //-------------------------------------------  Carga Masiva  ---------------------------------------------------
  cargaStatus: boolean = false;
  cargaMsj: any = "";

  

  cargaMasiva() {
    this.cargaStatus = true;
  }

  txt: any;
  cargaJson(archivo) {
    this.txt = Object.values(archivo)
  }

jsonContent!: any;

  onFileLoad(fileLoadedEvent) {    
    const textFromFileLoaded = fileLoadedEvent.target.result;
    this.jsonContent = textFromFileLoaded;
    console.log( this.jsonContent )  
    this.api.cargaMasiva( this.jsonContent ).subscribe(data =>{
         
    })  
  }
  
  onFileSelect(input: any) {

    const files = input.files;
    var content = this.jsonContent;
    if (files && files.length) {
      

      const fileToRead = files[0];

      const fileReader = new FileReader();
      fileReader.onload = this.onFileLoad;

      fileReader.readAsText(fileToRead, "UTF-8");
    }

  }

//-------------------------------------------  Generar PDF  ---------------------------------------------------
dir(){
  this.router.navigate(['reportesp'])
}
}
