import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { HomeComponent } from './home/home.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { StoreModule } from '@ngrx/store';
import { postReducer } from './store/posts.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PostsEffect } from './store/posts.effect';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [HomeComponent, AddComponent, EditComponent],
  imports: [
    CommonModule,
    FormsModule,
    PostsRoutingModule,
    StoreModule.forFeature('myposts', postReducer),
    EffectsModule.forFeature([PostsEffect]),
  ],
})
export class PostsModule {}
