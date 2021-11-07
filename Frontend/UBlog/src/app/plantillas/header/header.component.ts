import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }


conU(){
  this.router.navigate(['dashboard-usuarios']);
}

conP(){
  this.router.navigate(['dashboard-publicaciones']);
}

cS(){ 
  if(localStorage.getItem('tokenA')){
    localStorage.clear();
  } else if (localStorage.getItem('tokenU')){
    localStorage.clear();
  } 
}
}
