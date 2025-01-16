import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { CustomerService } from 'src/app/core/services/customer.service';
import { Customers } from 'src/app/Models/customerModel';

@Component({
  selector: 'app-activation-form',
  templateUrl: './activation-form.component.html',
  styleUrls: ['./activation-form.component.css'],
})
export class ActivationFormComponent {
  public customer: Customers[] = [];

  constructor(
    private customerService: CustomerService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  search = this.fb.nonNullable.group({
    code: '',
  });

  redirectToLogin() {
    this.router.navigate(['/']);
  }

  redirectToHomepage() {
    this.router.navigate(['/']);
  }
  //Ajoute le nouvel appointment dans la base de données
  public onValidation(): void {
    const actualCode: string = this.search.value.code ?? '000000';
    console.log(actualCode);

    this.customerService.activateAccount(actualCode).subscribe(
      (response: Customers) => {
        // Gérer la redirection ici si la réponse est réussie
        this.redirectToLogin();
      },
      (error) => {
        // Gérer les erreurs ici
        console.error("Erreur lors de l'activation du compte :", error);
      }
    );
  }
}
