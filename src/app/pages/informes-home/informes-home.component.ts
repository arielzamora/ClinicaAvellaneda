import { Component, OnInit } from '@angular/core';
import { AuditService } from 'src/app/services/audit.service';

@Component({
  selector: 'app-informes-home',
  templateUrl: './informes-home.component.html',
  styleUrls: ['./informes-home.component.scss']
})
export class InformesHomeComponent implements OnInit {
  chartOptions1: Object; // required
  chartOptions2: Object; // required
  chartOptions3: Object; // required
  chartOptions4: Object; // required
    //variables para datos de la bd
    turXEspe = [];
    espes = []
    tur = []
  constructor(private audit: AuditService) {
    this.cargarDiasXProfe();
    this.turnosPorEspecialidad();
    this.CargarChart2();
    this.CargarChart2();
   }

  ngOnInit(){

     }
     public parsearDia(diaN:string){
      let dias = ["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
      diaN = dias[(parseInt(diaN)-1)];
      return diaN;
    }


    cargarDiasXProfe()
    {
      const datos: { name: String, y: number}[] = new Array();
      this.turXEspe = [];
      this.tur =[];
      this.espes = [];
      this.audit.getTurnosXEspe().subscribe(resul=>{
        resul.forEach(data=>{
          this.turXEspe.push(
            {
              especialidad: data.payload.doc.data().especialidad,
              cantTurnos: data.payload.doc.data().cantTurnos,
            }
          );
          this.espes.push(data.payload.doc.data().especialidad);
          this.tur.push(data.payload.doc.data().cantTurnos );
        });
      });
      //this.barChartLabels = this.espes;
      //this.barChartData = [{data: this.tur, label:"Cantidad de Turnos"}];

    datos.push({
      name:"Clinica",
      y: 21
    });
    datos.push({
      name:"Dermatologia",
      y: 4
    });
    datos.push({
      name:"Odontologia",
      y:7
    });
    datos.push({
      name:"Cardiologia",
      y: 12
    });
    datos.push({
      name:"Otras Especialidades",
      y: 5
    });

    this.chartOptions4 = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type:'pie',//'pie',//line
        style: {
          textAlign: 'center'
        }
      },
      title: {
        text: 'Dias X Profesionales'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
            connectorColor: 'silver'
          }
        }
      },
      series: [{
        name: 'Dias X Profesionales',
        data: datos
      }]
    };
    }

    turnosPorEspecialidad()
    {
      const datos: { name: String, y: number}[] = new Array();
      //this.name = "TurnosXEspe";
      this.turXEspe = [];
      this.tur =[];
      this.espes = [];
      this.audit.getTurnosXEspe().subscribe(resul=>{
        resul.forEach(data=>{
          this.turXEspe.push(
            {
              especialidad: data.payload.doc.data().especialidad,
              cantTurnos: data.payload.doc.data().cantTurnos,
            }
          );
          this.espes.push(data.payload.doc.data().especialidad);
          this.tur.push(data.payload.doc.data().cantTurnos );
        });
      });

    datos.push({
      name:"Clinica",
      y: 21
    });
    datos.push({
      name:"Dermatologia",
      y: 4
    });
    datos.push({
      name:"Odontologia",
      y:7
    });
    datos.push({
      name:"Cardiologia",
      y: 12
    });
    datos.push({
      name:"Otras Especialidades",
      y: 5
    });

    this.chartOptions1 = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type:'bar',//'pie',//line
        style: {
          textAlign: 'center'
        }
      },
      title: {
        text: 'Porcentaje de Operaciones por Especialidad'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
            connectorColor: 'silver'
          }
        }
      },
      series: [{
        name: 'Operaciones por Especialidad',
        data: datos
      }]
    };
    }

    CargarChart2()
    {
      const datos: { name: String, y: number}[] = new Array();

    datos.push({
      name:"Clinica",
      y: 21
    });
    datos.push({
      name:"Dermatologia",
      y: 4
    });
    datos.push({
      name:"Odontologia",
      y:7
    });
    datos.push({
      name:"Cardiologia",
      y: 12
    });
    datos.push({
      name:"Otras Especialidades",
      y: 5
    });

    this.chartOptions2 = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type:'bar',//'pie',//line
        style: {
          textAlign: 'center'
        }
      },
      title: {
        text: 'Porcentaje de Operaciones por Especialidad'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
            connectorColor: 'silver'
          }
        }
      },
      series: [{
        name: 'Operaciones por Especialidad',
        data: datos
      }]
    };
    }
    CargarChart3()
    {
      const datos: { name: String, y: number}[] = new Array();

    datos.push({
      name:"Clinica",
      y: 21
    });
    datos.push({
      name:"Dermatologia",
      y: 4
    });
    datos.push({
      name:"Odontologia",
      y:7
    });
    datos.push({
      name:"Cardiologia",
      y: 12
    });
    datos.push({
      name:"Otras Especialidades",
      y: 5
    });

    this.chartOptions3 = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type:'bar',//'pie',//line
        style: {
          textAlign: 'center'
        }
      },
      title: {
        text: 'Porcentaje de Operaciones por Especialidad'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
            connectorColor: 'silver'
          }
        }
      },
      series: [{
        name: 'Operaciones por Especialidad',
        data: datos
      }]
    };
    }

}
