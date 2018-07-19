import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecoverPasswordComponent } from './recover-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [RecoverPasswordComponent]
})
export class RecoverPasswordModule { }
