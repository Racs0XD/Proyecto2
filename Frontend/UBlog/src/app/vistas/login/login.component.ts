import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from  '@angular/forms'
import { ApiService } from '../../servicios/api/api.service'
import { LoginI } from '../../modelos/login.interface';
import { Router } from '@angular/router'
import { ResponseI } from '../../modelos/response.interface'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
      username : new FormControl('',Validators.required),
      password: new FormControl('',Validators.required)
  })

  constructor( private api:ApiService, private router:Router ) { }

  errorStatus:boolean = false;
  errorMsj:any = "";
  

  ngOnInit(): void {
    this.checkLocalStorage()
    
    
  }

  checkLocalStorage(){
    if(localStorage.getItem('tokenA')){
      this.router.navigate(['dashboard-usuarios']);
    } else if (localStorage.getItem('tokenU')){
      this.router.navigate(['blog']) 
    } else {
      this.router.navigate(['login']) 
    }
  }

  onLogin(form:LoginI){
    localStorage.setItem("username",form.username);
    this.api.loginByUserName(form).subscribe(data => {
      let dataResponse: ResponseI = data;
      if(dataResponse.Admin){
        localStorage.setItem("tokenA",dataResponse.Admin); 
        this.router.navigate(['dashboard-usuarios']);
      } else if (dataResponse.Usuario) {
        localStorage.setItem("tokenU",dataResponse.Usuario) ;
        this.router.navigate(['blog'])        
      } else {
        this.errorStatus = true;
        this.errorMsj = dataResponse.Mensaje;
        ;
      }
      
    })
  }
}
