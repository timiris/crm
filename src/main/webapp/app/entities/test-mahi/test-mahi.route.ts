import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { TestMahiComponent } from './test-mahi.component';
import { TestMahiDetailComponent } from './test-mahi-detail.component';
import { TestMahiPopupComponent } from './test-mahi-dialog.component';
import { TestMahiDeletePopupComponent } from './test-mahi-delete-dialog.component';

import { Principal } from '../../shared';

export const testMahiRoute: Routes = [
    {
        path: 'test-mahi',
        component: TestMahiComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'timirisCrmApp.testMahi.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'test-mahi/:id',
        component: TestMahiDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'timirisCrmApp.testMahi.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const testMahiPopupRoute: Routes = [
    {
        path: 'test-mahi-new',
        component: TestMahiPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'timirisCrmApp.testMahi.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'test-mahi/:id/edit',
        component: TestMahiPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'timirisCrmApp.testMahi.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'test-mahi/:id/delete',
        component: TestMahiDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'timirisCrmApp.testMahi.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
