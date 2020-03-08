import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { User } from './user';
import { ConstantsService } from './common/services/constants.service';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  url: string;
  options: {};
  userId: string;

  constructor(private http: HttpClient, private _constant: ConstantsService) {
    this.url = this._constant.baseUrl
    this.options = this._constant.httpOptions
  }

  // Create a new user
  storeUser(user: User): Observable<User> {
    return this.http.post<User>(this.url, user, this.options)
      .pipe(
        tap((u: User) => console.log(`user saved`)),
        catchError(this.handleError<User>('storeUser'))
      );
  }

  // Retrive all users
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url)
      .pipe(
        tap(user => console.log('users fetched')),
        catchError(this.handleError('getUsers', []))
      );
  }

  // Retrive a specific user
  getUser(id: string): Observable<User> {
    const url = `${this.url}/${id}`;

    return this.http.get<User>(url).pipe(
      tap(_ => console.log(`fetched ${id}`)),
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }

  // Update a specific user
  updateUser(user: User): Observable<any> {
    const url = `${this.url}/${user._id}`;

    return this.http.put(url, user, this.options).pipe(
      tap(_ => console.log(`updated ${user._id}`)),
      catchError(this.handleError<any>('updateUser'))
    );
  }

  // Delete a specific user
  destoryUser(id: any): Observable<User> {
    const url = `${this.url}/${id}`;

    return this.http.delete<User>(url, this.options)
      .pipe(
        tap(_ => console.log(`user deleted`)),
        catchError(this.handleError<User>('destoryUser'))
      );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
}