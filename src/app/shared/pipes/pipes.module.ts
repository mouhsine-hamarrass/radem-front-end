import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TruncatePipe} from './truncate.pipe';
import {HighlightPipe} from './highlight.pipe';
import {SortPipe} from './sort.pipe';
import {BytesToSizePipe} from './bytes-to-size.pipe';
import {SafeHtmlPipe} from './safe-html.pipe';
import {NumeralPipe} from './numeral.pipe';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        TruncatePipe,
        HighlightPipe,
        SortPipe,
        BytesToSizePipe,
        SafeHtmlPipe,
        NumeralPipe
    ],
    declarations: [
        TruncatePipe,
        HighlightPipe,
        SortPipe,
        BytesToSizePipe,
        SafeHtmlPipe,
        NumeralPipe
    ]
})
export class PipesModule {
}
