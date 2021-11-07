import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../servicios/api/api.service';
import { Router } from '@angular/router'
import { PdfMakeWrapper, Table, Img } from 'pdfmake-wrapper';
import { ITable } from 'pdfmake-wrapper/lib/interfaces';
import pdfFonts from "pdfmake/build/vfs_fonts";
import { Chart, registerables } from 'chart.js'

PdfMakeWrapper.setFonts(pdfFonts);

interface DataResponse {
  name: string;
  gender: string;
  username: string;
  email: string;
  password: string;
  publications: string;
}

type TableRow = [string, string, string, string, string, string];

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget | null;
}

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  constructor(private api: ApiService, private router: Router) { }
  users!: any[];
  chart: any;
  ngOnInit(): void {
    this.checkLocalStorage()

    this.chart = document.getElementById('miGrafica');
    Chart.register(...registerables);


    this.api.reporteUsuarios().toPromise().then(data => {
      this.users = data;

      const cantPubli = data.map(res => res.publications);
      const Usuario = data.map(res => res.name);
      this.loadChart(cantPubli, Usuario);
    })



  }
  myLine
  loadChart(likes, category): void {
    this.myLine = new Chart(this.chart, {
      type: 'pie',
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
      this.router.navigate(['reportes']);
    } else {
      this.router.navigate(['login'])
    }
  }

  //-------------------------------------------  Generar PDF  ---------------------------------------------------
  usersPdf!: any[];
  async generate() {    
    const pdf = new PdfMakeWrapper();
    this.api.reporteUsuarios().toPromise().then(data => {
      this.usersPdf = data;
      pdf.pageMargins(80);
      pdf.add('Top 5 Usuarios con más publicaciones');
      pdf.add(this.creandoTabla(data));
      pdf.create().download('Lista de Usuarios');
    });
  }

  creandoTabla(data: DataResponse[]): ITable {

    return new Table([
      ['Nombre', 'Genero', 'Nombre de Usuario', 'Correo', 'Contraseña', 'Publicaciones'],
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
      row.name,
      row.gender,
      row.username,
      row.email,
      row.password,
      row.publications
    ]);
  }

}
