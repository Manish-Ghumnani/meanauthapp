import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authToken: any;
  user: any;

  constructor(private http: Http) { }

  registerUser(user) : any{
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/register', user, {headers :  headers})
    .pipe(map(res => res.json()));
    
  }

  authenticateUser(user): any {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/authenticate', user, {headers :  headers})
    .pipe(map(res => res.json()));
  }

  storeUserData(token, user){
    //angular looks for jwt token in this path - id_token
    localStorage.setItem('id_token', token);
    //for local storage we convert to string and then store, so when retrieving we can parse as JSON
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
