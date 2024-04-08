import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TypePaymentIdService {
  private selectedTypePaymentId = 0;

  setSelectedTypePaymenyId(id: number): void {
    this.selectedTypePaymentId = id;
  }

  getSelectedTypePaymenyId(): number {
    return this.selectedTypePaymentId;
  }
}
