import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Client} from '../model/class/Client';
import {environment} from '../../environments/environment';
import {APIResponseModel} from '../model/interface/role';
import {Constant} from '../constant/Constant';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) {
  }

  getAllUsers(){
    return this.http.get('https://jsonplaceholder.typicode.com/users');
  }

  getAllClients():Observable<APIResponseModel> {
    return this.http.get<APIResponseModel>(environment.API_URL + Constant.API_METHOD.GET_ALL_CLIENT);
  }

  getAllEmployee():Observable<APIResponseModel> {
    return this.http.get<APIResponseModel>(environment.API_URL + Constant.API_METHOD.GET_ALL_EMP);
  }

  getAllClientProject():Observable<APIResponseModel> {
    return this.http.get<APIResponseModel>(environment.API_URL + Constant.API_METHOD.GET_ALL_CLIENT_PROJECT);
  }

  addUpdateClient(client: Client): Observable<APIResponseModel> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json' // Ensure Content-Type is explicitly set
    });
    return this.http.post<APIResponseModel>(
      environment.API_URL + Constant.API_METHOD.ADD_UPDATE_CLIENT,
      client,
      { headers }
    );
  }


  deleteClientByClientId(clientId: number):Observable<APIResponseModel> {
    return this.http.delete<APIResponseModel>(environment.API_URL + Constant.API_METHOD.DELETE_CLIENT_BY_ID + clientId);
  }

  addUpdateClientProject(clientProject: Client): Observable<APIResponseModel> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json' // Ensure Content-Type is explicitly set
    });
    return this.http.post<APIResponseModel>(
      environment.API_URL + Constant.API_METHOD.ADD_UPDATE_CLIENT_PROJECT,
      clientProject,
      { headers }
    );
  }

}
