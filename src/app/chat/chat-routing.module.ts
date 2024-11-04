import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatPage } from './chat.page';
import { AuthGuard } from '../guad/auth.guard'; // Importar el guard

const routes: Routes = [
  {
    path: '',
    component: ChatPage,
    canActivate: [AuthGuard] // Aplicar el guard a la ruta del chat
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatPageRoutingModule {}