import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiLanguageService, JhiAlertService } from 'ng-jhipster';

import { TestMahi } from './test-mahi.model';
import { TestMahiService } from './test-mahi.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-test-mahi',
    templateUrl: './test-mahi.component.html'
})
export class TestMahiComponent implements OnInit, OnDestroy {
testMahis: TestMahi[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private testMahiService: TestMahiService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.testMahiService.query().subscribe(
            (res: ResponseWrapper) => {
                this.testMahis = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTestMahis();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: TestMahi) {
        return item.id;
    }
    registerChangeInTestMahis() {
        this.eventSubscriber = this.eventManager.subscribe('testMahiListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
