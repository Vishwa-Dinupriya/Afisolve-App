
import {NgModule} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
const Material = [MatInputModule, MatFormFieldModule];
@NgModule({
  imports: [Material],
  exports: [Material]
})

export class MaterialModule {
}
