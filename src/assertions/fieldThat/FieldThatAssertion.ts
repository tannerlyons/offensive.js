
import { Assertion, CheckFunction, Result, StandardMessage } from '../../model';
import { AssertionBuilder } from '../../Builder';
import { nodslArguments as nodsl } from '../../NoDsl';
import { NoObject } from '../../ObjectSerializer';

import '../Empty';
import '../../operators/not';
import '../../connectors';

export type FieldThatCallback<F> = (context : AssertionBuilder<F>) => Result;

/**
 * @author Maciej Chałapuk (maciej@chalapuk.pl)
 */
export class FieldThatAssertion<F> implements Assertion {
  constructor(
    private fieldName : string,
    private callback : FieldThatCallback<F>,
  ) {
  }
  assert(testedValue : any, varName : string, check : CheckFunction) {
    const { fieldName, callback } = this;

    if (!check(testedValue, varName).is.not.Empty.success) {
      return {
        get success() {
          return false;
        },
        get message() {
          const wrapper = new NoObject<F>(testedValue);
          const newBuilder = check(wrapper.cast(), `${varName}.${fieldName}`);
          return callback(newBuilder).message;
        },
      };
    }

    const newBuilder = check(testedValue[fieldName], `${varName}.${fieldName}`);
    return callback(newBuilder);
  }
}

export namespace FieldThatAssertion {
  /**
   * @author Maciej Chałapuk (maciej@chalapuk.pl)
   */
  export function factory(args : any[]) {
    nodsl.check(
      args.length === 2,
      '.fieldThat requires 2 arguments (got ', args.length, ')',
    );
    nodsl.check(
      typeof args[0] === 'string',
      'fieldName must be a string (got ', (typeof args[0]), ')',
    );
    nodsl.check(
      typeof args[1] === 'function',
      'callback must be a function (got ', (typeof args[1]), ')',
    );

    return new FieldThatAssertion(args[0], args[1]);
  }
}

export default FieldThatAssertion;

