
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './Services/Auth/auth.service';
import { StorageService } from './Services/Storage/storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

constructor(private _storageService: StorageService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this._storageService.getToken() // Local Storage'dan token'ı al

    if (token) {
      // Yeni bir request oluştur ve Authorization header'ı ekle
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });

      return next.handle(cloned);
    } else {
      // Token yoksa isteği direkt gönder
      return next.handle(req);
    }
  }
}
