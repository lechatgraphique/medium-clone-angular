import {inject} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, map, of, switchMap} from 'rxjs'
import {authActions} from './actions'
import {AuthService} from "../services/auth.service";
import {CurrentUserInterface} from "../../shared/types/currentUser.interface";
import {HttpErrorResponse} from "@angular/common/http";
import {PersistenceService} from "../../shared/services/persistance.service";

export const registerEffect = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService), persistenceService = inject(PersistenceService)) => {
    return actions$.pipe(
      ofType(authActions.register),
      switchMap(({request}) => {
        return authService.register(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            persistenceService.set('accessToken', currentUser.token);
            return authActions.registerSuccess({currentUser})
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(authActions.registerFailure({errors: errorResponse.error.errors}))
          })
        )
      })
    )
  },
  {functional: true}
)
