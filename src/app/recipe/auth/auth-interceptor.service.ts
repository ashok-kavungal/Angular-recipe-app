import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import{ AuthService} from './auth.service';
import { map,tap, take, exhaustMap } from 'rxjs/operators';

@Injectable()
export class AuthIntercepterService implements HttpInterceptor {

    constructor(private authService: AuthService){ }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.authService.user.pipe(take(1),
        exhaustMap(user=>{
            if(!user){return next.handle(req)};
            
            const modifiedReq = req.clone({
                params: new HttpParams().set('auth',user.token)
            });
            return next.handle(modifiedReq);
        }))       
    }
}