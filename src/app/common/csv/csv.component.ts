import { Angular2CsvComponent } from 'angular2-csv';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-csv',
  templateUrl: './csv.component.html',
  styleUrls: ['./csv.component.scss']
})
export class CsvComponent extends Angular2CsvComponent implements OnInit {

}
