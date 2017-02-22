import { Observable } from 'rxjs/Observable';

export const bodyClick$ = Observable.fromEvent(window.document.body, 'click')
                                    .share();

export const bodyKeydown$ = Observable.fromEvent(window.document.body, 'keydown')
                                      .share();

export const escape$ = bodyKeydown$.filter((e: KeyboardEvent) => e.keyCode === 27)
                                   .share();

export const enter$ = bodyKeydown$.filter((e: KeyboardEvent) => e.keyCode === 13)
                                  .share();

export const arrowUp$ = bodyKeydown$.filter((e: KeyboardEvent) => e.keyCode === 38)
                                    .share();

export const arrowDown$ = bodyKeydown$.filter((e: KeyboardEvent) => e.keyCode === 40)
                                      .share();
