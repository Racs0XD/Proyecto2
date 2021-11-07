import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from  '@angular/forms';
import { ApiService } from '../../servicios/api/api.service';
import { PublicacionI } from '../../modelos/publicacion.interface';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-verpublicacion',
  templateUrl: './verpublicacion.component.html',
  styleUrls: ['./verpublicacion.component.css']
})
export class VerpublicacionComponent implements OnInit {

  datosPublicacion!:PublicacionI;

  publicacionForm = new FormGroup({
    url: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required)
  })

  constructor(private api:ApiService, private router:Router, private activaterouter:ActivatedRoute) { }

  
  publicacion:any;
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

  volver(){
    this.router.navigate(['dashboard-publicaciones'])
  }
  
  checkLocalStorage(pb:any){
    if(localStorage.getItem('tokenA')){
      this.router.navigate(['verpublicacion',pb]);
    } else {
      this.router.navigate(['login']) 
    }
  }

}
