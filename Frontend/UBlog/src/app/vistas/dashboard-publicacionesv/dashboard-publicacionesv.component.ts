import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../servicios/api/api.service';
import { Router } from '@angular/router'
import { RegistroI } from '../../modelos/registro.interface'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioI } from '../../modelos/usuario.interface';
import { PdfMakeWrapper, Table, Img } from 'pdfmake-wrapper';
import { ITable } from 'pdfmake-wrapper/lib/interfaces';
import pdfFonts from "pdfmake/build/vfs_fonts";
import { PublicacionI } from '../../modelos/publicacion.interface'
import { PublicacionV } from '../../modelos/publicacionesv.interface'


@Component({
  selector: 'app-dashboard-publicacionesv',
  templateUrl: './dashboard-publicacionesv.component.html',
  styleUrls: ['./dashboard-publicacionesv.component.css']
})
export class DashboardPublicacionesvComponent implements OnInit {

  @ViewChild('demoYouTubePlayer') demoYouTubePlayer!: ElementRef<HTMLDivElement>;
  videoWidth: number | undefined;
  videoHeight: number | undefined;

  

  //-------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------
  //-------------------------------------------  Constructor  ---------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------  

  constructor(private api: ApiService, private router: Router, private _changeDetectorRef: ChangeDetectorRef) { }
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
  videos!: PublicacionV[];
  link!: PublicacionI[];
  datosVideo!:PublicacionI;

  vId!:string;

  ngOnInit(): void {
    this.checkLocalStorage()
    this.api.listarVideos().toPromise().then(info => {
      this.videos = info;      
    })

    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);

  }



  //-------------------------------------------  Validar Admin  ---------------------------------------------------
  checkLocalStorage() {
    if (localStorage.getItem('tokenA')) {
      this.router.navigate(['dashboard-publicacionesv']);
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
  editarVideo(video: any) {
    this.router.navigate(['editar-publicacion', video])
  }
  //-------------------------------------------  Ver  ---------------------------------------------------
  verVideo(video: any) {    
    this.router.navigate(['verpublicacion', video])
  }

  //-------------------------------------------  Eliminar  ---------------------------------------------------
  eliminarVideo(url: any) {    
    this.router.navigate(['dashboard-publicacionesv'])
    let datos: PublicacionI = this.editarPublicacion.value;
    this.api.eliminarPublicacion(datos, url).subscribe(data => {
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
    console.log(this.jsonContent)
    this.api.cargaMasiva(this.jsonContent).subscribe(data => {

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

