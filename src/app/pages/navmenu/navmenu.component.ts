import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from '@angular/router';
import { usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-navmenu',
  templateUrl: './navmenu.component.html',
  styleUrls: ['./navmenu.component.scss']
})
export class NavmenuComponent implements OnInit {
  isCollapsed = true;
  @Input() estaLogueado:boolean;
  @Input() usuario:usuario
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  desconectarse(){
    localStorage.clear();
    this.authService.logout();
    this.router.navigate(['/login']); 
  }
}
