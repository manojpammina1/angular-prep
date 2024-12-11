import {Component, inject, OnInit} from '@angular/core';
import {AsyncPipe, DatePipe, NgForOf, UpperCasePipe} from "@angular/common";
import {Client} from '../../model/class/Client';
import {FormsModule} from '@angular/forms';
import {ClientService} from '../../services/client.service';
import {Observable} from 'rxjs';
import {AlertComponent} from '../../reusable/alert/alert.component';
import {MyButtonComponent} from '../../reusable/my-button/my-button.component';

@Component({
  selector: 'app-client',
  imports: [
    FormsModule,
    UpperCasePipe,
    DatePipe,
    AsyncPipe,
    AlertComponent,
    MyButtonComponent
  ],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent implements OnInit{
  clientObj: Client = new Client();
  clientList: Client[] = [];
  clientService = inject(ClientService);
  currentDate: Date = new Date();

  userList$ : Observable<any> = new Observable<any>();

  ngOnInit(): void {
    this.loadClient();
    this.userList$ = this.clientService.getAllUsers();
  }

  loadClient(){
    this.clientService.getAllClients().subscribe((res)=>{
      this.clientList = res.data;
    })
  }


  onEditItem(data: Client){
    this.clientObj = data;

  }

  onDeleteItem(id: number){
    const isDelete = confirm("Are you sure you want to delete this client?");
    if (isDelete) {
      this.clientService.deleteClientByClientId(id).subscribe((res)=>{
        if (res.result){
          alert("Client Deleted Successfully");
          this.loadClient();
        } else {
          alert(res.message);
        }
      })
    } else {

    }


  }

  onSaveClient(data: string){
    this.clientService.addUpdateClient(this.clientObj).subscribe((res)=>{
      if (res.result){
        alert("Client Created Successfully");
        this.loadClient();
        this.clientObj = new Client();
      } else {
        alert(res.message);
      }
    })
  }
}
