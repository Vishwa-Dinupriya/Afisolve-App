import { NgModule } from '@angular/core';
import { TreeGridModule } from '@syncfusion/ej2-angular-treegrid';

const Ejs = [
  TreeGridModule
];

@NgModule({
  imports: [Ejs],
  exports: [Ejs]
})

export class EjsModule {
}
