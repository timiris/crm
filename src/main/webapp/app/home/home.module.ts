import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { TimirisCrmSharedModule } from '../shared';
import { homeRoute, helloRoute, HomeComponent, HelloComponent } from './';

const HOME_ROUTE = [
    homeRoute,
    helloRoute
];

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        TimirisCrmSharedModule,
        RouterModule.forRoot(HOME_ROUTE , { useHash: true })
    ],
    declarations: [
        HomeComponent,
        HelloComponent,
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TimirisCrmHomeModule {}
