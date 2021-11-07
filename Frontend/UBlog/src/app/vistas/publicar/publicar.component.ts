import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from  '@angular/forms';
import { ApiService } from '../../servicios/api/api.service';
import { Router } from '@angular/router';
import { ResponseI } from '../../modelos/response.interface';
import { PublicacionI } from '../../modelos/publicacion.interface';

@Component({
  selector: 'app-publicar',
  templateUrl: './publicar.component.html',
  styleUrls: ['./publicar.component.css']
})
export class PublicarComponent implements OnInit {
  fechactual! : any;
  usuario! : any;
  likePost = 0;
  tipoPubli!:any;
  datosPublicacion!:PublicacionI;

  publicacionForm = new FormGroup({
    user: new FormControl('', Validators.required),
    like: new FormControl('', Validators.required),
    url: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required)
  })

  constructor(private api:ApiService, private router:Router) { }

  
  publicacion:any;
  msjPublicacion:any = "";
  msjStatus:boolean = false;
  errorStatus:boolean = false;
  errorMsj:any = "";

  urlPubli:any;
  pB:any;

  ngOnInit(): void {
    this.mostrarFecha()     
    this.checkLocalStorage()
    this.publicacionForm.patchValue({
      'user':this.usuario,
      'date':this.fechactual,
      'like':this.likePost
    })
  }


  checkLocalStorage(){
    if(localStorage.getItem('tokenU')){
      this.usuario = localStorage.getItem('tokenU')
      this.router.navigate(['publicar']);
    } else {
      this.router.navigate(['login']) 
    }
  }

  agregarPubli(form:PublicacionI){
    this.api.agregarPublicacion(form, this.tipoPubli).subscribe(data =>{
      let dataResponse: ResponseI = data;
      if(dataResponse.Usuario){
        this.errorStatus = false;
        this.msjStatus = true;
        this.msjPublicacion = dataResponse.Usuario;     
      } else {
        this.msjStatus = false;
        this.errorStatus = true;
        this.errorMsj = dataResponse.Mensaje;
        ;
      }
    })
  }

 
  mostrarFecha(){
    var fecha = new Date();
    var month = fecha.getUTCMonth()+1;
    var day = fecha.getUTCDate();
    var year = fecha.getFullYear();
    this.fechactual = day+"/"+month+"/"+year;
  }

  i = "imagen";
  v = "video";

  tipo(tp:any){
    this.tipoPubli = tp;
  }

  exitosa() {  
    this.router.navigate(['blog'])
  }

}
