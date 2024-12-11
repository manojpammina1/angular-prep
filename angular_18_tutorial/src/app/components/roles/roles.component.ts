import {Component, inject, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {APIResponseModel, IRole} from '../../model/interface/role';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent implements OnInit{

  roleList: IRole[] = [];
  http = inject(HttpClient);
  constructor() { }
  ngOnInit() {
    this.getAllRoles();
  }
  getAllRoles(){
    // get all roles
    this.http.get<APIResponseModel>('https://freeapi.miniprojectideas.com/api/ClientStrive/GetAllRoles')
      .subscribe((res:APIResponseModel)=>{
      this.roleList = res.data;
    })
  }
}
