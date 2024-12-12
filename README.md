# Basic Event Bus vs Basic Reactive Mediator
After looking at the Basic Event Bus and deciding that it is more of a Mediator that (loosely) fits in the realm of Reactive programming, I made the decision to rename the project.

# Basic Reactive Mediator

This is a simple package that implements a mediator for use in manipulating the DOM.

This is ready for use, but if you have any feeback drop me an email at: anjgoldsmith@gmail.com.

I do plan on adding extra modules to new NPM packages that will allow data pipelines to be added in the future

## Importing

To get started (after install) just import the library:

```
import { ReactiveMediator } from 'basic-reactive-mediator';
```

or

```
const { ReactiveMediator }  = require('basic-reactive-mediator');
```

## EventBus is an internally managed singleton

This means that you only have to call the Subscibe, Emit and Reset functions.

## Subscribing to a Topic

The Subscibe method allows you to subscribe to a topic, taking the name of the topic in the form of a string and a (callback) function to run when the topic is published to with new a new messasge/data.

**Note**: It is best to declare a function before passing it to the Subscribe method, as annonymous functions do not get caught in the duplication logic and may cause side effects. Although multiple different functions can obviously be applied to a single topic, through multiple subscriptions. 

**Note**: React requires the use of UseCallback to wrap the function to be passed in, this is to ensure that the version passed to the Mediator is the correct instance reguardless of re-renders!

**Note**: Multi argument functions are also supported, see "Publishing to a Topic" for details on passing the arguments.

```
let func = (data) => {console.log(data)}; // Single argument function
let func2 = (data, data2) => {console.log(data + data2)}; // Multi argument function

ReactiveMediator.subscribe('topic', func);
ReactiveMediator.subscribe('topic', func2);
```

## Publishing to a Topic

The Emit method allows you to send a message with data (it has an any typing), this takes the Topic name, and any ammount of arguments.

**Note** To pass multiple arguments, you just list them after the first agument.

```
ReactiveMediator.emit('topic', 25); // Single argument emit
ReactiveMediator.emit('topic', 25, 10, 50); // Multi argument emit
```

## Unsubscribing from a Topic

The Unsubscribe method allows you to remove a specific function from a topic that has already been subscribed, you can also remove all subscriptions from a given topic by just passing the topic name to unsubscribe.

```
ReactiveMediator.unsubscribe('topic', func);
ReactiveMediator.unsubscribe('topic');
```

## Resetting the EventBus

The Reset function clears out all of the previously subscribed events

```
ReactiveMediator.reset();
```
