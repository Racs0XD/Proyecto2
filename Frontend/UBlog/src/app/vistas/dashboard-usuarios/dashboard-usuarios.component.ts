import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../servicios/api/api.service';
import { Router } from '@angular/router'
import { RegistroI } from '../../modelos/registro.interface'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioI } from '../../modelos/usuario.interface';


@Component({
  selector: 'app-dashboard-usuarios',
  templateUrl: './dashboard-usuarios.component.html',
  styleUrls: ['./dashboard-usuarios.component.css']
})
export class DashboardUsuariosComponent implements OnInit {
  //-------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------
  //-------------------------------------------  Constructor  ---------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------  

  constructor(private api: ApiService, private router: Router) { }
  datosUsuario!: UsuarioI;
  editarForm = new FormGroup({
    name: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  //-------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------
  //-------------------------------------------  ngOnInit  ---------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------

  users!: RegistroI[];
  ngOnInit(): void {
    this.checkLocalStorage()
    this.api.listarUsuarios().toPromise().then(data => {
      this.users = data;
    })
  }
  //-------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------
  //-------------------------------------------  Metodos  ---------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------

  redireccionar(){
    this.router.navigate(['reportes'])
  }

  //-------------------------------------------  Editar  ---------------------------------------------------
  editarUsuario(username: any) {
    this.router.navigate(['editar-usuario', username])
  }

  //-------------------------------------------  Ver  ---------------------------------------------------
  verUsuario(username: any) {
    this.router.navigate(['usuario', username])
  }

  //-------------------------------------------  Eliminar  ---------------------------------------------------
  usuarioEliminar: any;
  eliminarUsuario(username: any) {
    this.router.navigate(['dashboard-usuarios'])
    this.usuarioEliminar = username;
    let datos: UsuarioI = this.editarForm.value;
    this.api.eliminarUsuario(datos, username).subscribe(data => {
      console.log(data);
      console.log(['usuario', username])
    })

  }
  //-------------------------------------------  Validar Admin  ---------------------------------------------------
  checkLocalStorage() {
    if (localStorage.getItem('tokenA')) {
      this.router.navigate(['dashboard-usuarios']);
    } else {
      this.router.navigate(['login'])
    }
  }

  //-------------------------------------------  Carga Masiva  ---------------------------------------------------
  cargaStatus: boolean = false;
  cargaMsj: any = "";



  cargaMasiva() {
    this.cargaStatus = true;
  }

  txt: any;
  cargaJson(archivo) {
    this.txt = Object.values(archivo)
  }

  
text:any;
  onFileLoad(fileLoadedEvent) {
    var textFromFileLoaded = fileLoadedEvent.target.result;
    this.text = JSON.parse(textFromFileLoaded);
    console.log(this.text)
      this.api.cargaMasiva(this.text).subscribe(data => {
        console.log(data)
      })
  }

  onFileSelect(input: any) {

    const files = input.files;
    if (files && files.length) {
      const fileToRead = files[0];
      const fileReader = new FileReader();
      fileReader.onload = this.onFileLoad;
      fileReader.readAsText(fileToRead, "UTF-8");
      
    }

  }

}