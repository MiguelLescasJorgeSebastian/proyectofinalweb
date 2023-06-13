import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { LayoutComponent } from './components/layout/layout.component';
import { CrearordenComponent } from './crearorden/crearorden.component';
import { ReparacionesComponent } from './pages/reparaciones/reparaciones.component';
import { CrearempleadoComponent } from './crearempleado/crearempleado.component';
import { TicketComponent } from './ticket/ticket.component';

const routes: Routes = [
  {
   path:"login",
   component:LoginComponent
    },
    {
    path:'admin',
    canActivate:[AuthGuard],
    component:LayoutComponent,
    children:[
     {
       path:'',
       redirectTo:'dashboard',
       pathMatch:'full'
 },
  {
       path:'dashboard',
       component:DashboardComponent
     }
     ,
  {
       path:'crear',
       component:CrearordenComponent
     }   ,
     {
          path:'pedidos',
          component:ReparacionesComponent
        }
        ,{
          path:'empleado',
          component:CrearempleadoComponent
        }
        ,{
          path:'ticket',
          component:TicketComponent
        }
    ]
     }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
