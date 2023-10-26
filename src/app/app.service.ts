import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private dataUrl = 'http://localhost:3000/posts'; 

  constructor(private http: HttpClient) {};

  addData(data: any):Observable<any> {
    return this.http.post(this.dataUrl, data);
  }
  updateData(id: number, data: any): Observable<any> { 
    const updateUrl = `${this.dataUrl}/${id}`;
    return this.http.put(updateUrl, data);
  }
  deletdata(id:number){
    return this.http.delete(`${this.dataUrl}/${id}`);
  }  
  getapi(): Observable<any> {
    return this.http.get(this.dataUrl);
  } 
 


}
