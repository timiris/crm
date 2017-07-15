import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';

import { TestMahi } from './test-mahi.model';
import { TestMahiPopupService } from './test-mahi-popup.service';
import { TestMahiService } from './test-mahi.service';

@Component({
    selector: 'jhi-test-mahi-delete-dialog',
    templateUrl: './test-mahi-delete-dialog.component.html'
})
export class TestMahiDeleteDialogComponent {

    testMahi: TestMahi;

    constructor(
        private testMahiService: TestMahiService,
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.testMahiService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'testMahiListModification',
                content: 'Deleted an testMahi'
            });
            this.activeModal.dismiss(true);
        });
        this.alertService.success('timirisCrmApp.testMahi.deleted', { param : id }, null);
    }
}

@Component({
    selector: 'jhi-test-mahi-delete-popup',
    template: ''
})
export class TestMahiDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private testMahiPopupService: TestMahiPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.testMahiPopupService
                .open(TestMahiDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
