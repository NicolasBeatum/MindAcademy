import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ChatPageRoutingModule } from './chat-routing.module';
import { RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';


import { ChatPage } from './chat.page';

@NgModule({
  imports: [
      CommonModule,
      FormsModule,
      IonicModule,
      MarkdownModule.forChild(), // Usa forChild() en lugar de forRoot()
      ChatPageRoutingModule,
      RouterModule.forChild([{ path: '', component: ChatPage }])
    ],
  declarations: [ChatPage]
})
export class ChatPageModule {}
