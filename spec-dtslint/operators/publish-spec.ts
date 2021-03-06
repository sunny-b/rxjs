import { of, Observable } from 'rxjs';
import { publish } from 'rxjs/operators';

it('should support empty parameter', () => {
  // Here, TypeScript versions 3.1 and earlier infer Observable<any>. However,
  // the next version infers Observable<number>. It's not possible to specify
  // an upper bound for the TypeScript version used by dtslint, so an
  // expectation cannot be applied.
  // TODO: put the test back after Typescript > 3.2
  const a = of(1, 2, 3).pipe(publish());
});

it('should infer when type is specified', () => {
  const a = of(1, 2, 3).pipe<number>(publish()); // $ExpectType Observable<number>
});

it('should infer correctly with parameter', () => {
  const a = of(1, 2, 3).pipe(publish(x => x)); // $ExpectType Observable<number>
  const b = of('a', 'b', 'c').pipe(publish(x => x)); // $ExpectType Observable<string>
});

it('should enforce type on selector', () => {
  const a = of(1, 2, 3).pipe(publish((x: Observable<string>) => x)); // $ExpectError
});
