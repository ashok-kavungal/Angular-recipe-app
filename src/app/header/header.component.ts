import { Component, OnInit, OnDestroy} from '@angular/core';
import { AuthService } from '../recipe/auth/auth.service';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../recipe/auth/store/auth.actions';
import * as RecipeActions from '../recipe/store/recipe.actions';


@Component({
    selector:'app-header',
    templateUrl:'./header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy{
    private userSubs : Subscription;
    isAuthenticated: boolean = false;
    collapsed = true;

    constructor( private authService: AuthService,
                 private store: Store<fromApp.AppState>){}

     ngOnInit(){
        this.userSubs = this.store
        .select('auth')
        .pipe(map(authState => authState.user))
        .subscribe(user => {
          this.isAuthenticated = !!user;
          console.log(!user);
          console.log(!!user);
        });
     }            

    onSave(){
        this.store.dispatch(new RecipeActions.StoreRecipes());
    }
    onFetch(){
        this.store.dispatch(new RecipeActions.FetchRecipes());
    }

    onLogOut(){
        this.store.dispatch(new AuthActions.Logout());
    }

    ngOnDestroy(){
        this.userSubs.unsubscribe();
    }

}