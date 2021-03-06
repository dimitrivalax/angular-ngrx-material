import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExamplesComponent } from './examples/examples.component';
import { TodosComponent } from './todos/todos.component';
import { StockMarketComponent } from './stock-market/stock-market.component';
import { ParentComponent } from './theming/parent/parent.component';
import { SongSterrComponent } from '@app/examples/song-sterr/song-sterr.component';

const routes: Routes = [
  {
    path: '',
    component: ExamplesComponent,
    children: [
      {
        path: '',
        redirectTo: 'todos',
        pathMatch: 'full'
      },
      {
        path: 'todos',
        component: TodosComponent,
        data: {
          title: 'Todos'
        }
      },
      {
        path: 'stock-market',
        component: StockMarketComponent,
        data: {
          title: 'Stock Market'
        }
      },
      {
        path: 'theming',
        component: ParentComponent,
        data: {
          title: 'Theming'
        }
      },
      {
        path: 'song-sterr',
        component: SongSterrComponent,
        data: {
          title: 'Song Sterr'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamplesRoutingModule {}
