import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-headerblog',
  templateUrl: './headerblog.component.html',
  styleUrls: ['./headerblog.component.css']
})
export class HeaderblogComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }


  username!:any;
  
  miPerfil() {
    this.username = localStorage.getItem('tokenU')
    this.router.navigate(['perfil', this.username])
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