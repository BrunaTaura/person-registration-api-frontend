import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PersonService } from './services/person.service';
import { CreatePersonRequest } from './models/create-person-request';
import { PersonResponse } from './models/person-response';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  private personService = inject(PersonService);

  name = '';
  cpf = '';
  email = '';
  birthDate = '';
  zipCode = '';
  complement = '';

  generatedLogin = '';
  errorMessage = '';
  successMessage = '';

  register(): void {

    this.generatedLogin = '';
    this.errorMessage = '';
    this.successMessage = '';
    // Name validation
    if (!this.name.trim()) {
      this.errorMessage = 'Name is required';
      return;
    }

    // CPF validation
    if (!this.cpf.trim()) {
      this.errorMessage = 'CPF is required';
      return;
    }

    if (!/^\d{11}$/.test(this.cpf)) {
      this.errorMessage = 'CPF must contain exactly 11 digits';
      return;
    }

    // Email validation
    if (!this.email.trim()) {
      this.errorMessage = 'Email is required';
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(this.email)) {
      this.errorMessage = 'Invalid email';
      return;
    }

    // Birth date validation
    if (!this.birthDate) {
      this.errorMessage = 'Birth date is required';
      return;
    }

    const birthDate = new Date(this.birthDate);
    const today = new Date();

    if (birthDate > today) {
      this.errorMessage = 'Birth date cannot be in the future';
      return;
    }

    // Zip code validation
    if (!this.zipCode.trim()) {
      this.errorMessage = 'Zip code is required';
      return;
    }

    const request: CreatePersonRequest = {
      name: this.name,
      cpf: this.cpf,
      email: this.email,
      birthDate: this.birthDate,
      zipCode: this.zipCode,
      complement: this.complement
    };

    this.personService.create(request)
      .subscribe({

        next: (response: PersonResponse) => {

          console.log('Sucess response', response);
          alert('success');

          this.generatedLogin = response.login;
          this.errorMessage = '';
          this.successMessage = `Registration completed successfully. Generated login: ${response.login}`;
          // Clear form after success
          this.name = '';
          this.cpf = '';
          this.email = '';
          this.birthDate = '';
          this.zipCode = '';
          this.complement = '';

        },

        error: (error) => {

          console.log('Backend error:', error);

          this.generatedLogin = '';

          this.errorMessage =
            error.error?.message ||
            error.error ||
            'Unexpected error occurred';

        }

      });

  }

}