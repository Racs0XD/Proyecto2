import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from  '@angular/forms'
import { ApiService } from '../../servicios/api/api.service'
import { RegistroI } from '../../modelos/registro.interface';
import { Router } from '@angular/router'
import { ResponseI } from '../../modelos/response.interface'

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css']
})
export class RegistrarseComponent implements OnInit {

  registroForm = new FormGroup({
    name : new FormControl('',Validators.required),
    gender : new FormControl('',Validators.required),
    username : new FormControl('',Validators.required),
    email : new FormControl('',Validators.required),
    password: new FormControl('',Validators.required)
  })

  constructor(private api:ApiService, private router:Router) { }

  errorStatus:boolean = false;
  msjStatus:boolean = false;
  errorMsj:any = "";
  msjUsuario:any = "";

  ngOnInit(): void {
    this.checkLocalStorage()
  }

  checkLocalStorage(){
    if(localStorage.getItem('tokenA')){
      this.router.navigate(['dashboard-usuarios']);
    } else if (localStorage.getItem('tokenU')){
      this.router.navigate(['blog']) 
    } else {
      this.router.navigate(['registrarse']) 
    }
  }

  onRegister(form:RegistroI){
    this.api.registrarse(form).subscribe(data => {
      let dataResponse: ResponseI = data;
      if(dataResponse.Usuario){
        this.errorStatus = false;
        this.msjStatus = true;
        this.msjUsuario = dataResponse.Usuario;     
      } else {
        this.msjStatus = false;
        this.errorStatus = true;
        this.errorMsj = dataResponse.Mensaje;
        ;
      }
      
    })
  }
  

}
