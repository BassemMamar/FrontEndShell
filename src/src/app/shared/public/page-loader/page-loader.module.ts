import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageLoaderComponent } from './page-loader.component';
import { PageLoaderService } from './page-loader.service';

@NgModule({
  imports: [CommonModule],
  exports: [PageLoaderComponent],
  declarations: [PageLoaderComponent],
  providers: [PageLoaderService],
})
export class PageLoaderModule { }
