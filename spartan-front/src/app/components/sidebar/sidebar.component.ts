import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/core/services/customer.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {}

  disconnect() {
    this.customerService.disconnectCustomer().subscribe(
      () => {
        this.redirectToLogin();
      },
      (error) => {
        console.error('Erreur lors de la déconnexion:', error);
      }
    );
  }

  redirectToLogin() {
    this.router.navigate(['/']);
  }
}
