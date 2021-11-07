import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../servicios/api/api.service';
import { Router } from '@angular/router'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PublicacionI } from '../../modelos/publicacion.interface'
import { PubliI } from '../../modelos/publicacionusuario.interface'
import { UsuarioI } from '../../modelos/usuario.interface';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  //-------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------
  //-------------------------------------------  Constructor  ---------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------  

  @ViewChild('demoYouTubePlayer') demoYouTubePlayer!: ElementRef<HTMLDivElement>;
  videoWidth: number | undefined;
  videoHeight: number | undefined;

  constructor(private api: ApiService, private router: Router, private _changeDetectorRef: ChangeDetectorRef)  { }
  editarPublicacion = new FormGroup({
    user: new FormControl('', Validators.required),
    like: new FormControl('', Validators.required),
    url: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required)
  })

  datosUsuario!:UsuarioI;
  editarForm = new FormGroup({
    name : new FormControl('',Validators.required),
    gender : new FormControl('',Validators.required),
    username : new FormControl('',Validators.required),
    email : new FormControl('',Validators.required),
    password: new FormControl('',Validators.required)
  })

  nombreUs:any;
  nU:any;
  editable: boolean = false;
  nombre: any = localStorage.getItem('tokenU') 

  //-------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------
  //-------------------------------------------  ngOnInit  -----------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------
  
  publicacion!: PubliI[];
  miPosicion!:any;
  misPublicaciones!:any;
  ngOnInit(): void {
    let user = localStorage.getItem('tokenU')  
    this.checkLocalStorage() 
    this.api.listarPublicacionesUsuario(user).subscribe(data => {
      this.publicacion = data; 
    })  
    
    this.api.posicionUsuario(user).subscribe(data => {
      this.miPosicion = data; 
    })  

    this.api.publicacionesUsuario(user).subscribe(data => {
      this.misPublicaciones = data; 
    })  

    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);

    let usuarion = localStorage.getItem('username')  
    this.api.verUsuario(usuarion).subscribe(data =>{
        this.datosUsuario = data;
        this.nU = usuarion;
        this.editarForm.patchValue({
          'name': this.datosUsuario.name,
          'gender': this.datosUsuario.gender,
          'username': usuarion,
          'email':  this.datosUsuario.email,
          'password':  this.datosUsuario.password
        });
    })

  }

  //--------------------------------------  Validar localStorage ---------------------------------------------------
  checkLocalStorage() {
    if (localStorage.getItem('tokenU')) {
      this.router.navigate(['perfil']);
    } else {
      this.router.navigate(['login'])
    }
  }
  
  //-------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------
  //-------------------------------------------  Metodos  -------------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------


  //------------------------------------------  control likes  --------------------------------------------------
  

  
  
  likePubli(likes,url){   

    let nuevoLike = likes + 1;
    
    let datos: PubliI = this.editarPublicacion.value;    
    let publi = url.replaceAll("/","[ ]") 
    datos.like = nuevoLike;
    datos.url = publi
    this.api.agtualizarLikes(datos, publi).subscribe(data => {
    })
    this.router.navigate(['blog'])
  }

  //----------------------------------------  tipo Publicacion  -------------------------------------------------


  imagen:boolean = false;
  video:boolean = false;

  validarUrl(link){
      let nUrl = link
      let urlSplit = nUrl.split('://')
      let comprobar = urlSplit[0]

      if(comprobar == "https"){
        this.imagen = true;
        this.video = false;
      } else{
        this.imagen = false;
        this.video = true;
      }
  }

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
    this.router.navigate(['blog'])
    let datos: PublicacionI = this.editarPublicacion.value;
    let img = url.replaceAll("/","[ ]") 
    this.api.eliminarPublicacion(datos, img).subscribe(data => {
    })
  }


}