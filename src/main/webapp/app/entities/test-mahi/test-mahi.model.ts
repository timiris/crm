import { BaseEntity } from './../../shared';

export class TestMahi implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
    ) {
    }
}
