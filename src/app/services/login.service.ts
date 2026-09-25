import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, throwError } from 'rxjs';

import { UserResponse, User, Roles } from '../shared/models/user.interface';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ComandasService } from './comandas.service';
import { AppServiceService } from './app-service.service';

const helper = new JwtHelperService();



@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url: string;
  private loggedIn = new BehaviorSubject<boolean>(true);

  constructor(private http: HttpClient,
    private comandasService: ComandasService,
    private appService: AppServiceService,
    private router: Router,
  ) {
    this.url = this.appService.url;
    this.checkToken();
  }



  get isLogged(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }



  login(authData: User): Observable<UserResponse | void> {
    console.log(authData);

    return this.http
      .post<UserResponse>(this.url + '/proyectoDAW/login.php', authData)
      .pipe(
        map((user: UserResponse) => {
          this.saveLocalStorage(user);
          this.loggedIn.next(true);
          console.log(user);
          return user;
        }),
        catchError((err) => this.handlerError(err))
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedIn.next(false);

  }

  checkToken() {


    const userToken = localStorage.getItem('token');
    const isExpired = helper.isTokenExpired(userToken);
    console.log(isExpired);



    //si devuelve false significa que sigue logueado, si es true necesita loguearse
    if (isExpired) {
      this.logout();
    } else {
      const user = helper.decodeToken(userToken);
      console.log(user);

      this.appService.mostrarDatosUsuario(user.data).subscribe((res) => {
        this.appService.setUsuario(res);
        console.log(this.appService.getUsuario());

        this.router.navigate(['/tabs/tab1']);

      });
      this.loggedIn.next(true);
    }


  }

  saveLocalStorage(user: UserResponse): void {
    const { id, nombre, token } = user;
    localStorage.setItem('token', JSON.stringify(token));
  }

  handlerError(err): Observable<never> {
    let errorMessage = 'An errror occured retrienving data';
    if (err) {
      errorMessage = `Error: code ${err.message}`;
    }

    window.alert(errorMessage);
    return throwError(errorMessage);
  }

}
