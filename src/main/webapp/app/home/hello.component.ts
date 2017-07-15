import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Hero } from './hero';

@Component({
    selector: 'jhi-hello',
    templateUrl: './hello.component.html',
    styleUrls: [
        'home.scss'
    ]
})

export class HelloComponent {
    submitted = false;

    powers = [ 'Really Smart', 'Super Flexible', 'Super Hot', 'Weather Changer' ];

    model = new Hero(18, 'Dr IQ', this.powers[0], 'Chuck Overstreet');

    constructor(
        private router: Router
    ) {}

    onSubmit() { this.submitted = true; }

    newHero() {
        this.model = new Hero(42, '', '');
    }

    // TODO: Remove this when we're done
    get diagnostic() { return JSON.stringify(this.model); }
}
