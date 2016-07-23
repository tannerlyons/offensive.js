should = require "should"
mocha = require "mocha"
shouldThrow = require "../should-throw.coffee"

check = require "../.."

typeTests = [
  [ "string", "aString", "arg must be a string; got" ]
  [ -1, "aNumber", "arg must be a number; got" ]
  [ (->), "aFunction", "arg must be a function; got" ]
  [ {}, "anObject", "arg must be an object; got" ]
  [ undefined, "Undefined", "arg must be undefined; got" ]
]

typeTests.forEach (params) ->
  [ arg ] = params

  describe "check(#{arg}, 'arg')", ->
    testedCheck = null

    beforeEach ->
      testedCheck = check arg, "arg"

    typeTests.forEach (params)->
      [ arg2, assertion, expectedMessage ] = params

      describe ".#{assertion}()", ->
        if arg is arg2
          it "should not throw", -> testedCheck[assertion]()
        else
          it "should throw new Error('#{expectedMessage} #{arg}')", ->
            shouldThrow "#{expectedMessage} #{arg}", -> testedCheck[assertion]()


describe "check([], 'arg')", ->
  testedCheck = null

  beforeEach ->
    testedCheck = check [], "arg"

  describe ".anArray()", ->
    it "should not throw", -> testedCheck.anArray()

