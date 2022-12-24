import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SpacecraftComponent } from './components/spacecraft/spacecraft.component';
import { TypeComponent } from './components/type/type.component';
import { GasComponent } from './components/gas/gas.component';

const routes: Routes = [
  { path: 'spacecraft', component: SpacecraftComponent },
  { path: 'type', component: TypeComponent },
  { path: 'gas', component: GasComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
