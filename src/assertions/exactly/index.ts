
import Registry from '../../Registry';
import ExactlyAssertion from './ExactlyAssertion';

declare module "../../Context" {
  /**
   * @author Maciej Chałapuk (maciej@chalapuk.pl)
   */
  interface AssertionContext<T> {
    exactly(comparedValue : any) : OperatorContext<T>;
    Exactly(comparedValue : any) : OperatorContext<T>;
    exactlyEqualTo(comparedValue : any) : OperatorContext<T>;
    ExactlyEqualTo(comparedValue : any) : OperatorContext<T>;
    exactlyEquals(comparedValue : any) : OperatorContext<T>;
    ExactlyEquals(comparedValue : any) : OperatorContext<T>;
  }
}

export { ExactlyAssertion };
export default ExactlyAssertion;

/**
 * @author Maciej Chałapuk (maciej@chalapuk.pl)
 */
export function registerIn(registry : Registry) {
  registry.addAssertionFactory({
    names: [
      'exactly',
      'Exactly',
      'exactlyEqualTo',
      'ExactlyEqualTo',
      'exactlyEquals',
      'ExactlyEquals',
    ],

    factory: ExactlyAssertion.factory,
  });
}
