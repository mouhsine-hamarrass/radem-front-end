import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfilePageRoutingModule } from './profile-page-routing.module';
import { ProfilePageComponent } from './profile-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ProfileService} from '../../services/profile.service';

@NgModule({
  imports: [
    CommonModule,
    ProfilePageRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ProfilePageComponent],
  providers: [
    ProfileService
  ]
})
export class ProfilePageModule { }
