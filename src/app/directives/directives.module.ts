import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntlTelInputDirective } from './intl-tel-input.directive';

@NgModule({
  declarations: [
    IntlTelInputDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    IntlTelInputDirective
  ]
})
export class DirectivesModule { }
