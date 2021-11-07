import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from  '@angular/forms';
import { ApiService } from '../../servicios/api/api.service';
import { UsuarioI } from '../../modelos/usuario.interface';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  datosUsuario!:UsuarioI;
  editarForm = new FormGroup({
    name : new FormControl('',Validators.required),
    gender : new FormControl('',Validators.required),
    username : new FormControl('',Validators.required),
    email : new FormControl('',Validators.required),
    password: new FormControl('',Validators.required)
  })

  constructor(private api:ApiService, private router:Router, private activaterouter:ActivatedRoute) { }

  
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

  editable: boolean = false;

  volver(){
    this.router.navigate(['dashboard-usuarios'])
  }
  
  checkLocalStorage(us:any){
    if(localStorage.getItem('tokenA')){
      this.router.navigate(['usuario',us]);
    } else {
      this.router.navigate(['login']) 
    }
  }

}
