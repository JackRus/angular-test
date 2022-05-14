import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { distinctUntilChanged, filter, map, startWith } from 'rxjs/operators';

/**
       * Returns value od the provided parameter name, if one is found or returns null
       * @param paramName Parameter Name
    */
 function getRouteParam<T>(paramName: string, route: ActivatedRoute) {
    let result: T = null;
    if (!paramName) return result;

    (function extractParams(snapshot: ActivatedRouteSnapshot) {
        if (snapshot.params[paramName]) {
            result = snapshot.params[paramName] as T;
            return;
        }
        snapshot.children.forEach(child => extractParams(child));
    })(route.snapshot);

    return result;
}

export function watchRouteParam<T>(param: string, router: Router): Observable<T> {
    return router.events.pipe(filter(e => e instanceof NavigationEnd)).pipe(
        startWith(''),
        map(() => getRouteParam<T>(param,router.routerState.root)),
        distinctUntilChanged()
    );
}