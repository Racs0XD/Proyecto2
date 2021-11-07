import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from  '@angular/forms';
import { ApiService } from '../../servicios/api/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ResponseI } from '../../modelos/response.interface';
import { PublicacionI } from '../../modelos/publicacion.interface';

@Component({
  selector: 'app-editar-publicacion',
  templateUrl: './editar-publicacion.component.html',
  styleUrls: ['./editar-publicacion.component.css']
})
export class EditarPublicacionComponent implements OnInit {

  datosPublicacion!:PublicacionI;

  publicacionForm = new FormGroup({
    url: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required)
  })

  constructor(private api:ApiService, private router:Router, private activaterouter:ActivatedRoute) { }

  
  publicacion:any;
  msjPublicacion:any = "";
  msjStatus:boolean = false;
  errorStatus:boolean = false;
  errorMsj:any = "";

  urlPubli:any;
  pB:any;

  ngOnInit(): void {     
    let url = this.activaterouter.snapshot.paramMap.get('url');
    this.checkLocalStorage(url)   
    this.api.verPublicacion(url).subscribe(data =>{
        this.datosPublicacion = data;
        this.pB = url;
        this.publicacionForm.patchValue({
          'url': this.datosPublicacion.url,
          'date':  this.datosPublicacion.date,
          'category':  this.datosPublicacion.category
        });
    })
  }

  editable: boolean = false;
  
  checkLocalStorage(pb:any){
    if(localStorage.getItem('tokenA')){
      this.router.navigate(['editar-publicacion',pb]);
    } else {
      this.router.navigate(['login']) 
    }
  }

  actualizarPubli(form:PublicacionI,pb:any){
    pb = this.pB;
    this.api.agtualizarPublicacion(form,pb).subscribe(data =>{
      let dataResponse: ResponseI = data;
      if(dataResponse.Publicacion){
        this.errorStatus = false;
        this.msjStatus = true;
        this.msjPublicacion = dataResponse.Publicacion;     
      } else {
        this.msjStatus = false;
        this.errorStatus = true;
        this.errorMsj = dataResponse.Mensaje;
        ;
      }
    })
  }
}
