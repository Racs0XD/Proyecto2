import { Injectable } from '@angular/core';
import { LoginI } from '../../modelos/login.interface';
import { RegistroI } from '../../modelos/registro.interface';
import { UsuarioI } from '../../modelos/usuario.interface';
import { ResponseI } from '../../modelos/response.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PublicacionI } from '../../modelos/publicacion.interface'
import { PublicacionV } from '../../modelos/publicacionesv.interface'
import { PubliI } from '../../modelos/publicacionusuario.interface'


@Injectable({
  providedIn: 'root'
})
export class ApiService {

url:string = "http://127.0.0.1:4000/";

  constructor(private http:HttpClient) { }

  //---------------------------------------------------------------------------------------
  //-----------------------------------------  login  -------------------------------------
  //---------------------------------------------------------------------------------------
  loginByUserName(form:LoginI):Observable<ResponseI>{
    let direccion = this.url + "inicio";
    return this.http.post<ResponseI>(direccion,form);
  }

  //---------------------------------------------------------------------------------------
  //--------------------------------------  registro  -------------------------------------
  //---------------------------------------------------------------------------------------
  registrarse(form:RegistroI):Observable<ResponseI>{
    let direccion = this.url + "registro";
    return this.http.post<ResponseI>(direccion,form);
  }
  

  //---------------------------------------------------------------------------------------
  //---------------------------------------  tablas  --------------------------------------
  //---------------------------------------------------------------------------------------
  listarUsuarios():Observable<RegistroI[]>{
    let direccion = this.url + "admin/usuarios";
    return this.http.get<RegistroI[]>(direccion);
  }

  listarImagenes():Observable<PublicacionI[]>{
    let direccion = this.url + "admin/publicacionesI";
    return this.http.get<PublicacionI[]>(direccion);
  }

  listarVideos():Observable<PublicacionV[]>{
    let direccion = this.url + "admin/publicacionesV";
    return this.http.get<PublicacionV[]>(direccion);
  } 

  listarPublicaciones():Observable<PubliI[]>{
    let direccion = this.url + "blog/publico";
    return this.http.get<PubliI[]>(direccion);
  } 

  top5likes():Observable<PubliI[]>{
    let direccion = this.url + "blog/likes";
    return this.http.get<PubliI[]>(direccion);
  } 

  top5likesM():Observable<PubliI[]>{
    let direccion = this.url + "blog/likesM";
    return this.http.get<PubliI[]>(direccion);
  } 

  top5UsuarioPb():Observable<any[]>{
    let direccion = this.url + "top/publicaciones";
    return this.http.get<any[]>(direccion);
  } 

  listarPublicacionesUsuario(user):Observable<PubliI[]>{
    let direccion = this.url + "blog/usuario/"+user;
    return this.http.get<PubliI[]>(direccion);
  } 

  posicionUsuario(user):Observable<ResponseI[]>{
    let direccion = this.url + "top/posicion/"+user;
    return this.http.get<ResponseI[]>(direccion);
  } 
  publicacionesUsuario(user):Observable<ResponseI[]>{
    let direccion = this.url + "top/publicaciones/"+user;
    return this.http.get<ResponseI[]>(direccion);
  } 

  reporteUsuarios():Observable<any[]>{
    let direccion = this.url + "/top/maspublicados";
    return this.http.get<any[]>(direccion);
  }
  //---------------------------------------------------------------------------------------
  //----------------------------------  agregar objeto  -----------------------------------
  //---------------------------------------------------------------------------------------
  agregarUsuario(form:RegistroI):Observable<ResponseI>{
    let direccion = this.url + "admin/usuarios";
    return this.http.post<ResponseI>(direccion,form);
  }

  agregarPublicacion(form:PublicacionI,tipo: any):Observable<ResponseI>{
    let direccion = this.url + "publicar/"+tipo;
    return this.http.post<ResponseI>(direccion,form);
  }
  
  
  //---------------------------------------------------------------------------------------
  //--------------------------------------  ver  ------------------------------------------
  //---------------------------------------------------------------------------------------
  verUsuario(username: any):Observable<UsuarioI>{
    let direccion = this.url + "admin/usuarios/" +username;
    return this.http.get<UsuarioI>(direccion);
  }

  verPublicacion(url: any):Observable<PublicacionI>{
    let direccion = this.url + "admin/publicaciones/" +url;
    return this.http.get<PublicacionI>(direccion);
  }

  //---------------------------------------------------------------------------------------
  //------------------------------------  actualizar  -------------------------------------
  //---------------------------------------------------------------------------------------
  agtualizarUsuario(form:UsuarioI,username: any):Observable<ResponseI>{
    let direccion = this.url + "admin/usuarios/" +username;
    return this.http.put<ResponseI>(direccion,form);
  }

  agtualizarPublicacion(form:PublicacionI,url: any):Observable<ResponseI>{
    let direccion = this.url + "admin/publicaciones/" +url;
    return this.http.put<ResponseI>(direccion,form);
  }

  agtualizarLikes(form:PublicacionI,url: any):Observable<ResponseI>{
    let direccion = this.url + "blog/publicaciones/" +url;
    return this.http.put<ResponseI>(direccion,form);
  }

  //---------------------------------------------------------------------------------------
  //------------------------------------  eliminar  ---------------------------------------
  //---------------------------------------------------------------------------------------
  eliminarUsuario(form:UsuarioI,username:any):Observable<ResponseI>{
    let direccion = this.url + "admin/usuarios/" +username;
    let Options = {
      Headers: new HttpHeaders({
        'Content-type':'application/json'
      }),
      body:form
    }
    return this.http.delete<ResponseI>(direccion,Options); 
  }

  eliminarPublicacion(form:PublicacionI,url:any):Observable<ResponseI>{
    let direccion = this.url + "admin/publicaciones/" +url;
    let Options = {
      Headers: new HttpHeaders({
        'Content-type':'application/json'
      }),
      body:form
    }
    return this.http.delete<ResponseI>(direccion,Options); 
  }

  //---------------------------------------------------------------------------------------
  //----------------------------------  carga masiva  -------------------------------------
  //---------------------------------------------------------------------------------------
  cargaMasiva(s){
    let direccion = this.url + "/admin/usuarios/carga";
    return this.http.post(direccion, s);
  }

  //---------------------------------------------------------------------------------------
  //--------------------------------------  pdf  ------------------------------------------
  //---------------------------------------------------------------------------------------

  pdfUsuarios():Observable<RegistroI[]>{  
    let direccion = this.url + "admin/usuarios";
    return this.http.get<RegistroI[]>(direccion);  
  }

  pdfImagenes():Observable<PublicacionI[]>{  
    let direccion = this.url + "admin/usuarios";
    return this.http.get<PublicacionI[]>(direccion);  
  }

  pdfVideos():Observable<PublicacionV[]>{  
    let direccion = this.url + "admin/usuarios";
    return this.http.get<PublicacionV[]>(direccion);  
  }


  info():Observable<ResponseI>{
    let direccion = this.url + "info";
    return this.http.get<ResponseI>(direccion);
  }

}
