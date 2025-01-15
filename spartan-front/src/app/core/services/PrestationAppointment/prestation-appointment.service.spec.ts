import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import du HttpClientTestingModule
import { PrestationAppointmentService } from './prestation-appointment.service';

describe('PrestationAppointmentService', () => {
  let service: PrestationAppointmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Ajout du HttpClientTestingModule ici
    });
    service = TestBed.inject(PrestationAppointmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
