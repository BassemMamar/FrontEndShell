import { RouterModule, UrlSegment, UrlSegmentGroup, Route } from '@angular/router';

// export function CaseInsensitiveMatcher(url: string) {
//     url = url.toLowerCase();

//     return function (segments: UrlSegment[], segmentGroup: UrlSegmentGroup, route: Route) {
//         const matchSegments = url.split('/');
//         if ( matchSegments.length > segments.length || (matchSegments.length !== segments.length && route.pathMatch === 'full') ) {
//             return null;
//         }

//         const consumed: UrlSegment[] = [];
//         const posParams: { [name: string]: UrlSegment } = {};
//         for (let index = 0; index < matchSegments.length; ++index) {
//             const segment = segments[index].toString().toLowerCase();
//             const matchSegment = matchSegments[index];

//             if (matchSegment.startsWith(':')) {
//                 posParams[matchSegment.slice(1)] = segments[index];
//                 consumed.push(segments[index]);
//             }
//             // tslint:disable-next-line:one-line
//             else if (segment === matchSegment) {
//                 consumed.push(segments[index]);
//             }
//             // tslint:disable-next-line:one-line
//             else {
//                 return null;
//             }
//         }

//         return { consumed, posParams };
//     };
// }

export function CaseInsensitiveMatcher(url: string) {
    return function (
        segments: UrlSegment[],
        segmentGroup: UrlSegmentGroup,
        route: Route
    ) {
        const matchSegments = url.split('/');
        if (
            matchSegments.length > segments.length ||
            (matchSegments.length !== segments.length && route.pathMatch === 'full')
        ) {
            return null;
        }

        const consumed: UrlSegment[] = [];
        const posParams: { [name: string]: UrlSegment } = {};
        for (let index = 0; index < matchSegments.length; ++index) {
            const segment = segments[index].toString().toLowerCase();
            const matchSegment = matchSegments[index];

            if (matchSegment.startsWith(':')) {
                posParams[matchSegment.slice(1)] = segments[index];
                consumed.push(segments[index]);
            } else if (segment.toLowerCase() === matchSegment.toLowerCase()) {
                consumed.push(segments[index]);
            } else {
                return null;
            }
        }

        return { consumed, posParams };
    };
}

export function pathMatcher(url: string) {
    return CaseInsensitiveMatcher(url);
}
