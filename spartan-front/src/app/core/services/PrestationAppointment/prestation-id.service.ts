import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PrestationIdService {
  private selectedPrestationId: number = 0;

  setSelectedPrestationId(id: number): void {
    this.selectedPrestationId = id;
  }

  getSelectedPrestationId(): number {
    return this.selectedPrestationId;
  }
}
