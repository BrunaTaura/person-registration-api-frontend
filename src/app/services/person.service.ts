import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CreatePersonRequest } from '../models/create-person-request';
import { PersonResponse } from '../models/person-response';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:8080/api/people';

  create(request: CreatePersonRequest) {
    return this.http.post<PersonResponse>(this.apiUrl, request);
  }
}