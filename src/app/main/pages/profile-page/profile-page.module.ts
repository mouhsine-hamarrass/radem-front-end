import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfilePageRoutingModule } from './profile-page-routing.module';
import { ProfilePageComponent } from './profile-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ProfilePageRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ProfilePageComponent]
})
export class ProfilePageModule { }
