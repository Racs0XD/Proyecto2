import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-headerperlfil',
  templateUrl: './headerperlfil.component.html',
  styleUrls: ['./headerperlfil.component.css']
})
export class HeaderperlfilComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }


  username!:any;
  
  editarUsuario() {
    this.username = localStorage.getItem('tokenU')
    this.router.navigate(['modperfil', this.username])
  }

  direccionar(){
    this.router.navigate(['publicar'])
  }

cS(){ 
  if(localStorage.getItem('tokenA')){
    localStorage.clear();
  } else if (localStorage.getItem('tokenU')){
    localStorage.clear();
  } 
}
}
