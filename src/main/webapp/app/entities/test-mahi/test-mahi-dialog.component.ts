import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TestMahi } from './test-mahi.model';
import { TestMahiPopupService } from './test-mahi-popup.service';
import { TestMahiService } from './test-mahi.service';

@Component({
    selector: 'jhi-test-mahi-dialog',
    templateUrl: './test-mahi-dialog.component.html'
})
export class TestMahiDialogComponent implements OnInit {

    testMahi: TestMahi;
    authorities: any[];
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private testMahiService: TestMahiService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.testMahi.id !== undefined) {
            this.subscribeToSaveResponse(
                this.testMahiService.update(this.testMahi), false);
        } else {
            this.subscribeToSaveResponse(
                this.testMahiService.create(this.testMahi), true);
        }
    }

    private subscribeToSaveResponse(result: Observable<TestMahi>, isCreated: boolean) {
        result.subscribe((res: TestMahi) =>
            this.onSaveSuccess(res, isCreated), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: TestMahi, isCreated: boolean) {
        this.alertService.success(
            isCreated ? 'timirisCrmApp.testMahi.created'
            : 'timirisCrmApp.testMahi.updated',
            { param : result.id }, null);

        this.eventManager.broadcast({ name: 'testMahiListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-test-mahi-popup',
    template: ''
})
export class TestMahiPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private testMahiPopupService: TestMahiPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.testMahiPopupService
                    .open(TestMahiDialogComponent, params['id']);
            } else {
                this.modalRef = this.testMahiPopupService
                    .open(TestMahiDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
