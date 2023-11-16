import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  // Méthode getHello qui retourne un Observable de type any
  getHello(): Observable<any> {
    // Effectue une requête HTTP GET vers l'URL spécifiée avec le type de réponse attendue 'text'
    return this.http.get('http://localhost:8081/hello', {
      responseType: 'text',
    });
  }
}

//http://localhost:8080/api/hello
