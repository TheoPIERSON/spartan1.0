import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/core/services/customer.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  passwordFieldType = 'password'; // Initialiser avec 'password'
  @ViewChild('errorMessage') errorMessage!: ElementRef;

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {}

  login(username: string, password: string) {
    this.customerService.connectCustomer(username, password).subscribe({
      next: () => {
        // Redirection vers une page protégée après une connexion réussie
        this.router.navigate(['/customers']);
      },
      error: (error) => {
        console.error('Login failed', error);
        // Gérer l'erreur, par exemple afficher un message d'erreur à l'utilisateur
      },
    });
  }
  togglePasswordVisibility(): void {
    this.passwordFieldType =
      this.passwordFieldType === 'password' ? 'text' : 'password';
  }
}
