mocha = require 'mocha'
should = require 'should'
shouldThrow = '../should-throw.coffee'

check = require '../../offensive'

describe "check(undefined, \"arg\")", ->
  testedCheck = null

  beforeEach ->
    testedCheck = check undefined, 'arg'

  describe ".or", ->

    expectedMessage = ".or used without .either"
    it "should throw new Error('#{expectedMessage}')", ->
      shouldThrow expectedMessage, -> testedCheck.is.Undefined.or

  describe ".is.either.anObject", ->
    beforeEach ->
      testedCheck = testedCheck.is.either.anObject

    describe ".or.anArray", ->

      expectedMessage = "arg must be an object or an array; got undefined"
      it "should throw new Error('#{expectedMessage}')", ->
        shouldThrow expectedMessage, -> testedCheck.or.anArray

