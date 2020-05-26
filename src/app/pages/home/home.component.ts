import { Component, OnInit, OnDestroy,ViewChild } from "@angular/core";

import noUiSlider from "nouislider";
import{LoginComponent} from "../login/login.component"
import { login } from 'src/app/model/login';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  isCollapsed = true;
  focus;
  focus1;
  focus2;
  date = new Date();
  pagination = 3;
  pagination1 = 1;
  showModal: boolean;
  user:login;
  isLogueado:boolean;
  constructor() {

    this.obtenerUsuarioActual();

  }

  obtenerUsuarioActual()
  {
    const data = localStorage.getItem('Login');
    this.user=JSON.parse(data);
    this.isLogueado=true;
  }

  scrollToDownload(element: any) {
    element.scrollIntoView({ behavior: "smooth" });
  }
  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("index-page");

    // var slider = document.getElementById("sliderRegular");

    // noUiSlider.create(slider, {
    //   start: 40,
    //   connect: false,
    //   range: {
    //     min: 0,
    //     max: 100
    //   }
    // });

    // var slider2 = document.getElementById("sliderDouble");

    // noUiSlider.create(slider2, {
    //   start: [20, 60],
    //   connect: true,
    //   range: {
    //     min: 0,
    //     max: 100
    //   }
    // });
  }

  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("index-page");
  }

  Ingresar(){

  }
}
