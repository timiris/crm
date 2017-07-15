import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRouteSnapshot, NavigationEnd, RoutesRecognized } from '@angular/router';

import { JhiLanguageHelper, StateStorageService } from '../../shared';

@Component({
    selector: 'jhi-menu',
    templateUrl: './menu.component.html'
})

export class JhiMenuComponent implements OnInit {
    constructor(
        private jhiLanguageHelper: JhiLanguageHelper,
        private router: Router,
        private $storageService: StateStorageService,
    ) { }

    ngOnInit() { }

    addHero() {
        this.router.navigate(['hello']);
    }
};
