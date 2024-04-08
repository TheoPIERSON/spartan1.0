import { TypePayment } from 'src/app/Models/typePaymentModel';

export class Type_payment implements TypePayment {
  id: number;
  description: string;

  // Ajoutez un constructeur si nécessaire
  constructor(typePaymentData: TypePayment) {
    this.id = typePaymentData.id;
    this.description = typePaymentData.description;
  }
}
