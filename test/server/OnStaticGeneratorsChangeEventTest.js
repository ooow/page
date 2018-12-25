'use strict'

const { AsyncObject } = require('@cuties/cutie')
const OnStaticGeneratorsChangeEvent = require('./../../server/OnStaticGeneratorsChangeEvent')
const { Assertion } = require('@cuties/assert')
const { Is } = require('@cuties/is')

class InvokedOnStaticGeneratorsChangeEvent extends AsyncObject {
  constructor (event, eventType, fileName) {
    super(event, eventType, fileName)
  }

  definedSyncCall () {
    return (event, eventType, fileName) => {
      event(eventType, fileName)
      return event
    }
  }
}

new Assertion(
  new Is(
    new OnStaticGeneratorsChangeEvent('./test/files'),
    Function
  )
).after(
  new Assertion(
    new Is(
      new InvokedOnStaticGeneratorsChangeEvent(
        new OnStaticGeneratorsChangeEvent('./test/files'),
        'change', 'index.html'
      ),
      Function
    )
  ).after(
    new Assertion(
      new Is(
        new InvokedOnStaticGeneratorsChangeEvent(
          new OnStaticGeneratorsChangeEvent('./test/files'),
          'create', 'index.html'
        ),
        Function
      )
    )
  )
).call()