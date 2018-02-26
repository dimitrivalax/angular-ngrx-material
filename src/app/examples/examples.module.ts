import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@app/shared';

import { ExamplesRoutingModule } from './examples-routing.module';
import { ExamplesComponent } from './examples/examples.component';
import { TodosComponent } from './todos/todos.component';
import { todosReducer } from './todos/todos.reducer';
import { TodosEffects } from './todos/todos.effects';
import { StockMarketComponent } from './stock-market/stock-market.component';
import { stockMarketReducer } from './stock-market/stock-market.reducer';
import { StockMarketEffects } from './stock-market/stock-market.effects';
import { StockMarketService } from './stock-market/stock-market.service';
import { ParentComponent } from './theming/parent/parent.component';
import { ChildComponent } from './theming/child/child.component';
import { SongSterrComponent } from './song-sterr/song-sterr.component';
import { songSterrReducer } from '@app/examples/song-sterr/song-sterr.reducer';
import { SongSterrService } from '@app/examples/song-sterr/song-sterr.service';
import { SongSterrEffects } from '@app/examples/song-sterr/song-sterr.effects';

@NgModule({
  imports: [
    SharedModule,
    ExamplesRoutingModule,
    StoreModule.forFeature('examples', {
      todos: todosReducer,
      stocks: stockMarketReducer,
      songSterr: songSterrReducer
    }),
    EffectsModule.forFeature([TodosEffects, StockMarketEffects, SongSterrEffects])
  ],
  declarations: [
    ExamplesComponent,
    TodosComponent,
    StockMarketComponent,
    ParentComponent,
    ChildComponent,
    SongSterrComponent
  ],
  providers: [StockMarketService, SongSterrService]
})
export class ExamplesModule {
  constructor() {}
}
