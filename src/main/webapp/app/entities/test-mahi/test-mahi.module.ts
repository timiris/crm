import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TimirisCrmSharedModule } from '../../shared';
import {
    TestMahiService,
    TestMahiPopupService,
    TestMahiComponent,
    TestMahiDetailComponent,
    TestMahiDialogComponent,
    TestMahiPopupComponent,
    TestMahiDeletePopupComponent,
    TestMahiDeleteDialogComponent,
    testMahiRoute,
    testMahiPopupRoute,
} from './';

const ENTITY_STATES = [
    ...testMahiRoute,
    ...testMahiPopupRoute,
];

@NgModule({
    imports: [
        TimirisCrmSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        TestMahiComponent,
        TestMahiDetailComponent,
        TestMahiDialogComponent,
        TestMahiDeleteDialogComponent,
        TestMahiPopupComponent,
        TestMahiDeletePopupComponent,
    ],
    entryComponents: [
        TestMahiComponent,
        TestMahiDialogComponent,
        TestMahiPopupComponent,
        TestMahiDeleteDialogComponent,
        TestMahiDeletePopupComponent,
    ],
    providers: [
        TestMahiService,
        TestMahiPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TimirisCrmTestMahiModule {}
