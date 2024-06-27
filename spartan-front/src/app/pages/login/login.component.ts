import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/core/services/customer.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  passwordFieldType = 'password'; // Initialiser avec 'password'

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {}

  login(username: string, password: string): void {
    this.customerService.connectCustomer(username, password).subscribe({
      next: (response) => {
        localStorage.setItem('access_token', response.bearer);
        console.log(response.bearer);

        this.router.navigate(['/customers']);
        // rediriger l'utilisateur vers la page d'accueil ou une autre page sécurisée
      },
      error: (err) => {
        console.error(err);
        console.log("le token, l'email ou le password est invalide");

        // afficher un message d'erreur à l'utilisateur
      },
    });
  }
  togglePasswordVisibility(): void {
    this.passwordFieldType =
      this.passwordFieldType === 'password' ? 'text' : 'password';
  }
}
