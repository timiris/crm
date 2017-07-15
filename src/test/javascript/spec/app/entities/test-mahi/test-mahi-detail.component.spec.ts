import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { TimirisCrmTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { TestMahiDetailComponent } from '../../../../../../main/webapp/app/entities/test-mahi/test-mahi-detail.component';
import { TestMahiService } from '../../../../../../main/webapp/app/entities/test-mahi/test-mahi.service';
import { TestMahi } from '../../../../../../main/webapp/app/entities/test-mahi/test-mahi.model';

describe('Component Tests', () => {

    describe('TestMahi Management Detail Component', () => {
        let comp: TestMahiDetailComponent;
        let fixture: ComponentFixture<TestMahiDetailComponent>;
        let service: TestMahiService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TimirisCrmTestModule],
                declarations: [TestMahiDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    TestMahiService,
                    JhiEventManager
                ]
            }).overrideTemplate(TestMahiDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TestMahiDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TestMahiService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new TestMahi(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.testMahi).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
