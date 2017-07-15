import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TestMahi } from './test-mahi.model';
import { TestMahiService } from './test-mahi.service';

@Injectable()
export class TestMahiPopupService {
    private isOpen = false;
    constructor(
        private modalService: NgbModal,
        private router: Router,
        private testMahiService: TestMahiService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.testMahiService.find(id).subscribe((testMahi) => {
                this.testMahiModalRef(component, testMahi);
            });
        } else {
            return this.testMahiModalRef(component, new TestMahi());
        }
    }

    testMahiModalRef(component: Component, testMahi: TestMahi): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.testMahi = testMahi;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        });
        return modalRef;
    }
}
