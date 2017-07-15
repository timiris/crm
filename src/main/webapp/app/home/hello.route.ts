import { Route } from '@angular/router';

import { UserRouteAccessService } from '../shared';
import { HelloComponent } from './';

export const helloRoute: Route = {
        path: 'hello',
        component: HelloComponent,
    };
