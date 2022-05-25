import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Employee } from './models/Employee';
import { ServiceEmployeeService } from './services/service-employee.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'front-end-spring';

  constructor(private service : ServiceEmployeeService){
    this.employees = [];
  }

  employees : Employee[]
  editemployee? : Employee
  idAborrar? : number

  ngOnInit(){
    console.log("onINit");
    this.getEmployees();
  }

  public getEmployees(){
    this.service.getEmployees()
    .subscribe({
      next: (res : Employee[]) => {this.employees = res},
      error: (err : HttpErrorResponse) => console.log(err)
    })
  }

  // @HostListener('window:scroll', ['$event'])
  // onWindowScroll() {
  //   console.log("entro ");
  //   let element = document.querySelector('.navbar') as HTMLElement;
  //   if (window.pageYOffset > element.clientHeight) {
  //     element.classList.add('navbar-dark');
  //   } else {
  //     element.classList.remove('navbar-dark');
  //     console.log("entro ELSE");
  //   }
  // }
  
  public onAddEmployee(addForm: NgForm ):void{
    console.log("entro a addEMplo")
    
    console.log(addForm.value)
    this.service.addEmployee(addForm.value)
      .subscribe({
        next: (response: Employee) => {
          console.log(response);
          this.getEmployees(); //Llamas a este para q se refresque los empleados y se muestre el nuevo
          addForm.reset();
        }
        ,
        error: (error : HttpErrorResponse) => {
          alert(error.message);
          addForm.reset();}
    })
    document.getElementById('boton-cerrar-add')?.click();
  }

  public onUpdateEmployee(employee: Employee ){
    this.service.updateEmployee(employee)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.getEmployees(); //Llamas a este para q se refresque los empleados y se muestre el nuevo
         }
        ,
        error: (error : HttpErrorResponse) => { alert(error.message)}
      })
  }

  public onDeleteEmployee(id? : number ): void{
    console.log("entro al borrar")
    if (typeof id === "undefined"){
      alert("el empleado no tiene id")
    }
    else{
      this.service.deleteEmployeeById(id)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.getEmployees(); //Llamas a este para q se refresque los empleados y se muestre el nuevo
         }
        ,
        error: (error : HttpErrorResponse) => { alert(error.message+"NOFUNCIONA")}
      });
      document.getElementById('boton-cerrar-add')?.click();
    }
    
  }


  public searchEmployees(key:string) : void {
    if (!key){
      this.getEmployees();
    }
    else{
      const result: Employee[]= [];
      for (const emp of this.employees){
        if (emp.nombre.toLowerCase().indexOf(key.toLowerCase()) !== -1
            || emp.cargo.toLowerCase().indexOf(key.toLowerCase()) !== -1
            || emp.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
          ){
            result.push(emp);
        }
      }
      this.employees= result;
    }
    
  }

  public onOpenModal( mode :String, employee?: Employee): void {
    const container = document.getElementById("main-container");
    const button = document.createElement('button');
    button.type ='button';
    button.style.display = 'none';
    button.setAttribute('data-toggle',' modal');
    if ( mode === 'add'){
      button.setAttribute('data-target','#addModal')
    }
    if ( mode === 'edit'){
      this.editemployee=employee; //cuando toque el boton de editar el contacto seteamoe el editemployee, para llenar los campos del form
      button.setAttribute('data-target','#editModal')
    }
    if ( mode === 'delete'){
      this.idAborrar = employee?.id;
      button.setAttribute('data-target','#deleteModal')
    }
    container?.appendChild(button);
    button.click();
  }
}




