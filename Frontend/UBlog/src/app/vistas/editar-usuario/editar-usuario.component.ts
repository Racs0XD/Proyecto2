import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from  '@angular/forms';
import { ApiService } from '../../servicios/api/api.service';
import { UsuarioI } from '../../modelos/usuario.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { ResponseI } from '../../modelos/response.interface';
@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})

export class EditarUsuarioComponent implements OnInit {
  
  datosUsuario!:UsuarioI;
  editarForm = new FormGroup({
    name : new FormControl('',Validators.required),
    gender : new FormControl('',Validators.required),
    username : new FormControl('',Validators.required),
    email : new FormControl('',Validators.required),
    password: new FormControl('',Validators.required)
  })

  constructor(private api:ApiService, private router:Router, private activaterouter:ActivatedRoute) { }

  errorStatus:boolean = false;
  msjStatus:boolean = false;
  errorMsj:any = "";
  msjUsuario:any = "";
  
  nombreUs:any;
  nU:any;

  ngOnInit(): void {     
    let usuarion = this.activaterouter.snapshot.paramMap.get('username');
    this.checkLocalStorage(usuarion)   
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

  
  checkLocalStorage(us:any){
    if(localStorage.getItem('tokenA')){
      this.router.navigate(['editar-usuario',us]);
    } else {
      this.router.navigate(['login']) 
    }
  }

  actualizarUsuario(form:UsuarioI,us:any){
    us = this.nU;
    this.api.agtualizarUsuario(form,us).subscribe(data =>{
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
