import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../servicios/api/api.service';
import { Router } from '@angular/router'
import { RegistroI } from '../../modelos/registro.interface'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioI } from '../../modelos/usuario.interface';
import { PdfMakeWrapper, Table, Img } from 'pdfmake-wrapper';
import { ITable } from 'pdfmake-wrapper/lib/interfaces';
import pdfFonts from "pdfmake/build/vfs_fonts";
import { PublicacionI } from '../../modelos/publicacion.interface'
import { PubliI } from '../../modelos/publicacionusuario.interface'
import { Chart, registerables } from 'chart.js'

PdfMakeWrapper.setFonts(pdfFonts);

interface DataResponse {
  url: string;
  date: string;
  category: string;
  user: string;
  like: string;
}

type TableRow = [string, string, string, string, string];

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget | null;
}

@Component({
  selector: 'app-reportesp',
  templateUrl: './reportesp.component.html',
  styleUrls: ['./reportesp.component.css']
})
export class ReportespComponent implements OnInit {

  constructor(private api: ApiService, private router: Router) { }
  publicaciones!: any[];
  chart: any;
  ngOnInit(): void {
    this.checkLocalStorage()

    this.chart = document.getElementById('miGrafica');
    Chart.register(...registerables);

    this.api.top5likesM().toPromise().then(datos => {
      this.publicaciones = datos;
      const Likes = datos.map(res => res.like);
      const category = datos.map(res => res.category);
      this.loadChart(Likes,category);
      })



  }
  myLine
  loadChart(likes, category): void {
    this.myLine = new Chart(this.chart, {
      type: 'bar',
      data: {
        datasets: [
          {
            data: likes,
            label: 'Top 5 publicaciones con más likes',
            backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
          },
        ],
        labels: category,
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  //-------------------------------------------  Validar Admin  ---------------------------------------------------
  checkLocalStorage() {
    if (localStorage.getItem('tokenA')) {
      this.router.navigate(['reportesp']);
    } else {
      this.router.navigate(['login'])
    }
  }

  //-------------------------------------------  Generar PDF  ---------------------------------------------------
  usersPdf!: any[];
  async generate() {    
    const pdf = new PdfMakeWrapper();
    this.api.top5likesM().toPromise().then(data => {
      this.usersPdf = data;
      pdf.pageMargins(50);
      pdf.add('Top 5 Usuarios con más publicaciones');
      pdf.add(this.creandoTabla(data));
      pdf.create().download('Lista Publicaciones');
    });
  }

  creandoTabla(data: DataResponse[]): ITable {

    return new Table([
      ['URL', 'Fecha', 'Categoria', 'Propietario', 'Likes'],
      ...this.extraccionData(data)
    ])
      .heights(rowIndex => {
        return rowIndex === 0 ? 30 : 0;
      })
      .layout({
        fillColor: (rowIndex?: number, node?: any, columnIndex?: number) => {
          return rowIndex === 0 ? '#CCCCCC' : '';
        }
      })
      .end;
  }

  extraccionData(data: DataResponse[]): TableRow[] {
    return data.map(row => [
      row.url,
      row.date,
      row.category,
      row.user,
      row.like
    ]);
  }

}
