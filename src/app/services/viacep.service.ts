import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ViaCepService {

  private http = inject(HttpClient);

  search(zipCode: string) {
    return this.http.get(
      `https://viacep.com.br/ws/${zipCode}/json/`
    );
  }
}