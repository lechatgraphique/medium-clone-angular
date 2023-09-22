import {HttpInterceptorFn} from "@angular/common/http";
import {PersistenceService} from "./persistance.service";
import {inject} from "@angular/core";

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const presistanceService = inject(PersistenceService);
  const token = presistanceService.get('accessToken');
  request = request.clone({
    setHeaders:{
      Authorization: token ? `Token ${token}` : ''
    },
  });
  return next(request);
}
