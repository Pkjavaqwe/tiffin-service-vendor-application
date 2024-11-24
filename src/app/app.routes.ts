import { Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { ProductComponent } from './layout/product/product.component';
import { ProductViewComponent } from './layout/product/product-view/product-view.component';

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'sign-up',
        component: RegisterComponent
    },
    {
        path: 'product-view/:_id',
        component: ProductViewComponent
    },
    {
        path: 'product-view',
        component: ProductViewComponent
    },
    {
        path: 'product',
        component: ProductComponent
    }

];
