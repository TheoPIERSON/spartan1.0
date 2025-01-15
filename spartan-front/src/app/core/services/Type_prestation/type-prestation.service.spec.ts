import { TestBed } from '@angular/core/testing';
import { TypePrestationService } from './type-prestation.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TypePrestationService', () => {
  let service: TypePrestationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Ajout du module de test HTTP
      providers: [TypePrestationService], // Fournir le service testé
    });
    service = TestBed.inject(TypePrestationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
