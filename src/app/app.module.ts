import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {DraggableScrollModule} from "../draggableScroll/draggable-scroll.module";


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        DraggableScrollModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
