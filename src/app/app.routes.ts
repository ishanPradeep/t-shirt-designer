import { Routes } from '@angular/router';
import { TshirtDesignComponent } from './tshirt-design/tshirt-design.component';

export const routes: Routes = [
    { path: '', redirectTo: '/front', pathMatch: 'full' },
  { path: 'front', component: TshirtDesignComponent },
];
