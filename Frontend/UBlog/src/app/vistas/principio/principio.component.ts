import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { ApiService } from '../../servicios/api/api.service'
import { ResponseI } from '../../modelos/response.interface'

@Component({
  selector: 'app-principio',
  templateUrl: './principio.component.html',
  styleUrls: ['./principio.component.css']
})
export class PrincipioComponent implements OnInit {

  constructor(private api:ApiService,private router:Router) { }

  ngOnInit(): void {
  }

  login() {
    this.router.navigate(['login'])
  }

  registro(){
    this.router.navigate(['registrarse'])
  }

  msjUsuario:any = "";
  statusM: boolean = false;
  textos() {
    this.api.info().subscribe(data => {
      let dataResponse: ResponseI = data;
      if (this.statusM == false) {
        this.statusM = true; 
        this.msjUsuario = dataResponse.Usuario;      
      } else {
        this.statusM = false;
      }
    })

    
  }

}
