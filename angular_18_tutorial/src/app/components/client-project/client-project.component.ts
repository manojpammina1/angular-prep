import {Component, inject, OnInit, signal} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ClientService} from '../../services/client.service';
import {ClientProject, Employee} from '../../model/interface/role';
import {Client} from '../../model/class/Client';
import {DatePipe} from '@angular/common';
import {AlertComponent} from '../../reusable/alert/alert.component';

@Component({
  selector: 'app-client-project',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    DatePipe,
    AlertComponent
  ],
  templateUrl: './client-project.component.html',
  styleUrl: './client-project.component.css'
})
export class ClientProjectComponent implements OnInit {
  projectFrom: FormGroup = new FormGroup({
    clientProjectId: new FormControl(0),
    projectName:new FormControl('',[Validators.required,Validators.minLength(3)]),
    startDate:new FormControl(''),
    expectedEndDate:new FormControl(''),
    leadByEmpId:new FormControl(0),
    completedDate:new FormControl(''),
    contactPerson:new FormControl(''),
    contactPersonContactNo:new FormControl(''),
    totalEmpWorking:new FormControl(0),
    projectCost:new FormControl(0),
    projectDetails:new FormControl(''),
    contactPersonEmailId:new FormControl(''),
    clientId:new FormControl(0)
  });

  ngOnInit(): void {
    this.getAllClient();
    this.getAllEmployee();
    this.getAllClientProject()
  }

  clientSrv = inject(ClientService);
  employeeList: Employee[] = [];
  clientList: Client[] = [];

  firstName = signal("youlo");
  projectList = signal<ClientProject[]>([])


  changeFnName(){
    this.firstName.set("Changed") ;
  }

  getAllEmployee(){
    this.clientSrv.getAllEmployee().subscribe((res)=>{
      this.employeeList = res.data;
    })
  }

  getAllClientProject(){
    this.clientSrv.getAllClientProject().subscribe((res)=>{
      this.projectList.set(res.data);
    })
  }


  getAllClient(){
    this.clientSrv.getAllClients().subscribe((res)=>{
      this.clientList = res.data;
    })
  }

  onSaveProject(){
    const fromValue = this.projectFrom.value;
    this.clientSrv.addUpdateClientProject(fromValue).subscribe((res)=>{
      if(res.result){
        alert("Project added successfully");
      }else {
        alert(res.message);
      }
    })
  }
}
