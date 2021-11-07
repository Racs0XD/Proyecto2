import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../servicios/api/api.service';
import { Router } from '@angular/router'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PublicacionI } from '../../modelos/publicacion.interface'
import { PubliI } from '../../modelos/publicacionusuario.interface'



@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  //-------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------
  //-------------------------------------------  Constructor  ---------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------  

  @ViewChild('demoYouTubePlayer') demoYouTubePlayer!: ElementRef<HTMLDivElement>;
  videoWidth: number | undefined;
  videoHeight: number | undefined;

  constructor(private api: ApiService, private router: Router, private _changeDetectorRef: ChangeDetectorRef) { }
  editarPublicacion = new FormGroup({
    user: new FormControl('', Validators.required),
    like: new FormControl('', Validators.required),
    url: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required)
  })

  //-------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------
  //-------------------------------------------  ngOnInit  -----------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------

  publicacion!: PubliI[];
  topPubicados!: PubliI[];
  topLikes!: PubliI[];
  ngOnInit(): void {
    this.checkLocalStorage()
    this.api.listarPublicaciones().toPromise().then(data => {
      this.publicacion = data;
    })

    this.api.top5likes().toPromise().then(datos => {
      this.topLikes = datos;
      })

    this.api.top5UsuarioPb().toPromise().then(dato => {
      this.topPubicados = dato;
    })

    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
  }

  topStatus: boolean = false;
  top5() {
    if (this.topStatus == false) {
      this.topStatus = true;      
    } else {
      this.topStatus = false;
    }
  }

  //--------------------------------------  Validar localStorage ---------------------------------------------------
  checkLocalStorage() {
    if (localStorage.getItem('tokenU')) {
      this.router.navigate(['blog']);
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


  likePubli(likes, url) {

    let nuevoLike = likes + 1;

    let datos: PubliI = this.editarPublicacion.value;
    let publi = url.replaceAll("/", "[ ]")
    datos.like = nuevoLike;
    datos.url = publi
    this.api.agtualizarLikes(datos, publi).subscribe(data => {
    })
    this.router.navigate(['blog'])
  }

  //----------------------------------------  tipo Publicacion  -------------------------------------------------


  imagen: boolean = false;
  video: boolean = false;

  validarUrl(link) {
    let nUrl = link
    let urlSplit = nUrl.split('://')
    let comprobar = urlSplit[0]

    if (comprobar == "https") {
      this.imagen = true;
      this.video = false;
    } else {
      this.imagen = false;
      this.video = true;
    }
  }

  //-------------------------------------------  Editar  ---------------------------------------------------

  editarPubli(imagen, usuario) {
    if (usuario == localStorage.getItem('tokenU')) {
      let img = imagen.replaceAll("/", "[ ]")
      this.router.navigate(['publiusuario', img])
    }

  }

  //-------------------------------------------  Eliminar  ---------------------------------------------------

  eliminarPubli(url, usuario) {
    if (usuario == localStorage.getItem('tokenU')) {
      this.router.navigate(['blog'])
      let datos: PublicacionI = this.editarPublicacion.value;
      let img = url.replaceAll("/", "[ ]")
      this.api.eliminarPublicacion(datos, img).subscribe(data => {
      })
    }
  }
}
