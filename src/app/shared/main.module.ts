import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule
  ],
  exports: [
    CommonModule,
    BrowserModule,
    FormsModule
  ]
})
export class MainModule {
}
