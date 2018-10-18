
import Registry from '../Registry';
import { Assertion, Result, StandardMessage } from '../model';
import { nodsl, ObjectSerializer } from '../utils';

declare module "../Context" {
  /**
   * @author Maciej Chałapuk (maciej@chalapuk.pl)
   */
  interface AssertionContext<T> {
    equalTo(comparedValue : any) : OperatorContext<T>;
    EqualTo(comparedValue : any) : OperatorContext<T>;
    equal(comparedValue : any) : OperatorContext<T>;
    Equal(comparedValue : any) : OperatorContext<T>;
    equals(comparedValue : any) : OperatorContext<T>;
    Equals(comparedValue : any) : OperatorContext<T>;
  }
}

/**
 * @author Maciej Chałapuk (maciej@chalapuk.pl)
 */
export class EqualToAssertion implements Assertion {
  private serializer = new ObjectSerializer();

  constructor(
    private comparedValue : any,
  ) {
  }

  assert(value : any, object : string) {
    const { comparedValue, serializer } = this;

    return {
      get success() {
        return value == comparedValue;
      },
      get message() {
        return new StandardMessage(object, `equal to ${serializer.serializeAny(comparedValue)}`);
      },
    };
  }
}

export default EqualToAssertion;

Registry.instance
  .addAssertionFactory({
    names: [ 'equalTo', 'EqualTo', 'equal', 'Equal', 'equals', 'Equals' ],

    factory: (args : any[]) => {
      nodsl.check(
        args.length === 1,
        `.ofType requires 1 argument; got ${args.length}`,
      );

      return new EqualToAssertion(args[0]);
    },
  })
;
