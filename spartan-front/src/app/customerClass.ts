import { Customers } from './Models/customerModel';

export class Customer implements Customers {
  id: number;
  firstname: string;
  lastname: string;
  phoneNumber: string;
  mail: string;
  birthdate: string;

  // Ajoutez un constructeur si nécessaire
  constructor(customerData: Customers) {
    this.id = customerData.id;
    this.firstname = customerData.firstname;
    this.lastname = customerData.lastname;
    this.phoneNumber = customerData.phoneNumber;
    this.mail = customerData.mail;
    this.birthdate = customerData.birthdate;
  }
}
