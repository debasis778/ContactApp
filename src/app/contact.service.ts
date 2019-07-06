import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable, from } from 'rxjs';
//import 'rxjs/add/operator/catch';

import { HttpClient, HttpHeaders } from '@angular/common/http';


import { Contact } from '../app/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private _getUrl = '/api/contacts';
  private _postUrl = '/api/contact';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  };
  constructor(private _http: HttpClient ) { }

  // Getting all the contact from the database
  getContacts(): Observable<Contact[]> {
    return this._http.get<Contact[]>(this._getUrl); 
  }

  addContact(contact: Contact): Observable<Contact>{
    return this._http.post<Contact>(this._postUrl, contact, this.httpOptions);
  }
}
// tslint:disable-next-line: eofline
//.pipe(map(( response: any ) => response.json()));
