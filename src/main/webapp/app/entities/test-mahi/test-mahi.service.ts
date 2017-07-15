import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { TestMahi } from './test-mahi.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TestMahiService {

    private resourceUrl = 'api/test-mahis';

    constructor(private http: Http) { }

    create(testMahi: TestMahi): Observable<TestMahi> {
        const copy = this.convert(testMahi);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(testMahi: TestMahi): Observable<TestMahi> {
        const copy = this.convert(testMahi);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<TestMahi> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            return res.json();
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convert(testMahi: TestMahi): TestMahi {
        const copy: TestMahi = Object.assign({}, testMahi);
        return copy;
    }
}
