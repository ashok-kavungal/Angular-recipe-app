import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import{ AuthService} from './auth.service';
import { map,tap, take, exhaustMap } from 'rxjs/operators';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthIntercepterService implements HttpInterceptor {

    constructor(private authService: AuthService, private store: Store<fromApp.AppState>){ }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.store.select('auth').pipe(take(1),
        map(authState => {
            return authState.user;
          }),
        exhaustMap(user=>{
            if(!user){return next.handle(req)};
            
            const modifiedReq = req.clone({
                params: new HttpParams().set('auth',user.token)
            });
            return next.handle(modifiedReq);
        }))       
    }
}