
import { Directive, ElementRef, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { login } from '../model/login';

@Directive({
  selector: '[appValidarRoles]'
})
export class ValidarRolesDirective implements OnInit {

  private rolesAdmitidos: string[];
   user: login;
  public isCliente:any=null;
  public userUid:string=null;

  @Input() set appValidarRoles(value: string[]) {
    this.rolesAdmitidos = value;
  }

  constructor(private element: ElementRef,private templateRef: TemplateRef<any>,private viewContainer: ViewContainerRef) {
  }

  ngOnInit() {
    if (this.CheckRoles()) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

  private CheckRoles(): Boolean {


    let retorno: Boolean = false;

    const data = localStorage.getItem('Login');

    if(data)
    {
       this.user=JSON.parse(data);//el empleado logueado

       if (this.rolesAdmitidos && data) {
         const tipoUsuario = this.user.tipo;
         this.rolesAdmitidos.forEach(element => {
           if (tipoUsuario === element) {
             retorno = true;
           }
         });
     }
         
    }

    return retorno;
  }

  
}
