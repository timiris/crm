import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TimirisCrmSharedModule } from '../../shared';
import {
    HeroService,
    HeroPopupService,
    HeroComponent,
    HeroDetailComponent,
    HeroDialogComponent,
    HeroPopupComponent,
    HeroDeletePopupComponent,
    HeroDeleteDialogComponent,
    heroRoute,
    heroPopupRoute,
} from './';

const ENTITY_STATES = [
    ...heroRoute,
    ...heroPopupRoute,
];

@NgModule({
    imports: [
        TimirisCrmSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        HeroComponent,
        HeroDetailComponent,
        HeroDialogComponent,
        HeroDeleteDialogComponent,
        HeroPopupComponent,
        HeroDeletePopupComponent,
    ],
    entryComponents: [
        HeroComponent,
        HeroDialogComponent,
        HeroPopupComponent,
        HeroDeleteDialogComponent,
        HeroDeletePopupComponent,
    ],
    providers: [
        HeroService,
        HeroPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TimirisCrmHeroModule {}
