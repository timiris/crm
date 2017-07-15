import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { TestMahi } from './test-mahi.model';
import { TestMahiService } from './test-mahi.service';

@Component({
    selector: 'jhi-test-mahi-detail',
    templateUrl: './test-mahi-detail.component.html'
})
export class TestMahiDetailComponent implements OnInit, OnDestroy {

    testMahi: TestMahi;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private testMahiService: TestMahiService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTestMahis();
    }

    load(id) {
        this.testMahiService.find(id).subscribe((testMahi) => {
            this.testMahi = testMahi;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTestMahis() {
        this.eventSubscriber = this.eventManager.subscribe(
            'testMahiListModification',
            (response) => this.load(this.testMahi.id)
        );
    }
}
