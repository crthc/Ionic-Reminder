import { PipesModule } from './../pipes/pipes.module';
import { IonicModule } from '@ionic/angular';
import { ListsComponent } from './lists/lists.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    ListsComponent
  ],
  exports: [
    ListsComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule
  ]
})
export class ComponentsModule { }
