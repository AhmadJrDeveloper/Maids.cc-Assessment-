import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class  UserService {

  constructor(private http: HttpClient) { } // Inject HttpClient for making HTTP requests

  // Fetch a list of users for the specified page number
  getUsers(page: number): Observable<any> {
    return this.http.get(`https://reqres.in/api/users?page=${page}`);
  }

  // Fetch a specific user by their ID
  getUser(id: number): Observable<any> {
    return this.http.get(`https://reqres.in/api/users/${id}`);
  }
}
