import { Component, ChangeDetectorRef, inject } from '@angular/core';
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
  private changeDetectorRef = inject(ChangeDetectorRef);

  name = '';
  cpf = '';
  email = '';
  birthDate = '';
  zipCode = '';
  complement = '';

  generatedLogin = '';
  errorMessage = '';
  successMessage = '';
  isLoading = false;

  register(): void {
    this.generatedLogin = '';
    this.errorMessage = '';
    this.successMessage = '';

    const cpfOnlyNumbers = this.cpf.replace(/\D/g, '');
    const zipCodeOnlyNumbers = this.zipCode.replace(/\D/g, '');

    if (!this.name.trim()) {
      this.errorMessage = 'Nome é obrigatório';
      this.changeDetectorRef.detectChanges();
      return;
    }

    if (!cpfOnlyNumbers) {
      this.errorMessage = 'CPF é obrigatório';
      this.changeDetectorRef.detectChanges();
      return;
    }

    if (!/^\d{11}$/.test(cpfOnlyNumbers)) {
      this.errorMessage = 'CPF deve conter exatamente 11 números';
      this.changeDetectorRef.detectChanges();
      return;
    }

    if (!this.email.trim()) {
      this.errorMessage = 'Email é obrigatório';
      this.changeDetectorRef.detectChanges();
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(this.email)) {
      this.errorMessage = 'Email inválido';
      this.changeDetectorRef.detectChanges();
      return;
    }

    if (!this.birthDate) {
      this.errorMessage = 'Data de nascimento é obrigatória';
      this.changeDetectorRef.detectChanges();
      return;
    }

    const birthDateValue = new Date(this.birthDate);
    const today = new Date();

    if (birthDateValue > today) {
      this.errorMessage = 'Data de nascimento não pode ser no futuro';
      this.changeDetectorRef.detectChanges();
      return;
    }

    if (!zipCodeOnlyNumbers) {
      this.errorMessage = 'CEP é obrigatório';
      this.changeDetectorRef.detectChanges();
      return;
    }

    if (!/^\d{8}$/.test(zipCodeOnlyNumbers)) {
      this.errorMessage = 'CEP deve conter exatamente 8 números';
      this.changeDetectorRef.detectChanges();
      return;
    }

    const request: CreatePersonRequest = {
      name: this.name.trim(),
      cpf: cpfOnlyNumbers,
      email: this.email.trim(),
      birthDate: this.birthDate,
      zipCode: zipCodeOnlyNumbers,
      complement: this.complement.trim()
    };

    this.isLoading = true;
    this.changeDetectorRef.detectChanges();

    this.personService.create(request).subscribe({
      next: (response: PersonResponse) => {
        this.generatedLogin = response.login;
        this.successMessage = `${response.login}`;
        this.errorMessage = '';

        this.clearForm();

        this.isLoading = false;
        this.changeDetectorRef.detectChanges();
      },
      error: (error) => {
        this.generatedLogin = '';
        this.successMessage = '';
        this.errorMessage =
          error.error?.message ||
          error.error ||
          'Erro inesperado ao cadastrar pessoa';

        this.isLoading = false;
        this.changeDetectorRef.detectChanges();
      }
    });
  }

  private clearForm(): void {
    this.name = '';
    this.cpf = '';
    this.email = '';
    this.birthDate = '';
    this.zipCode = '';
    this.complement = '';
  }
}