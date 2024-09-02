import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private router: Router) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('access_token');

    // Vérifier si la requête est une requête POST vers "/connexion"
    if (request.method === 'POST' && request.url.endsWith('/connexion')) {
      if (token) {
        request = request.clone({
          setHeaders: {
            Authorization: `${token}`, // Pour la requête POST "/connexion"
          },
        });
      }
    } else {
      if (
        token &&
        !request.url.endsWith('/type_prestation/all') &&
        !request.url.endsWith('/customer/add') &&
        !request.url.endsWith('/customer/activate')
      ) {
        // Exclure l'URL du token
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status == 403 || error.status == 0) {
          // Token expiré ou invalide, redirige vers la page de login
          localStorage.removeItem('access_token'); // Supprime le token expiré
          this.router.navigate(['/']);
        }
        return throwError(error);
      })
    );
  }
}
