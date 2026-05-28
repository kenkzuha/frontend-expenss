import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const transloco = inject(TranslocoService);
  const lang = transloco.getActiveLang(); // 'en' | 'ja' | 'id'

  const authReq = req.clone({
    withCredentials: true,
    headers: req.headers.set('Accept-Language', lang),
  });
  return next(authReq);
};