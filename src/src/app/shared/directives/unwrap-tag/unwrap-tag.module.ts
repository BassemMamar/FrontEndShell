import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnwrapTagDirective } from './unwrap-tag.directive';
import { UnwrapTagService } from './unwrap-tag.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [UnwrapTagDirective],
  exports: [UnwrapTagDirective],
  providers: [UnwrapTagService]
})
export class UnwrapTagModule { }
