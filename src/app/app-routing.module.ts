import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './components/chat/chat.component';


const routes: Routes = [
  { path: 'chat', component: ChatComponent, data: { titulo: 'Firechat App' }},
  //{ path: 'heroes', component: HeroesComponent, data: { titulo: 'Heroes' } },
  { path: '**', pathMatch: 'full', redirectTo: '/chat' },
  { path: '', pathMatch: 'full', redirectTo: '/chat' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
