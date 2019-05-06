import { EqualValidator } from './../../components/views/public-script/equal-validator.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
	imports: [ CommonModule ],
	exports: [ EqualValidator ],
	declarations: [ EqualValidator ]
})
export class ShareModule {}
