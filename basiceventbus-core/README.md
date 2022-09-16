# Basic Event Bus

This is a simple package that impliments an event bus for use in manipulating the DOM.

This is currently in beta, if you have any feeback drop me an email at: Adam.Goldsmith0@gmail.com.

I do plan on adding extra modules to new NPM packages that will allow the forwarding of messages from event buses such as SingalR, if you have any suggestions, please let me know.

## Importing

To get started (after install) just import the library:

```
import {EventBus} from 'basiceventbus';
```
or
```
const {EventBus} = require('basiceventbus');
```

## Getting an instance of EventBus

To get in instance of EventBus you must call the getInstance() method, the instance is a singleton.

```
var eventBus = EventBus.getInstance();
```

## Subscribing to a Topic

The Subscibe method allows you to subscribe to a topic, taking the name of the topic in the form of a string and a (callback) function to run when the topic is published to with new a new messasge/data.

**Note** It is best to declare a function before passing it to the Subscribe method, as annonymous functions do not get caught in the duplication logic and my cause side effects. Although multiple different functions can obviously be applied to a single topic, through multiple subscriptions.

```
let func = (data) => {console.log(data)};

eventBus.Subscribe('topic', func);
```

## Publishing to a Topic

The Emit method allows you to send a message with data (it has an any typing), this takes the Topic name, and the data

```
eventBus.Emit('topic', 25);
```

## Unsubscribing from a Topic

The Unsubscribe method allows you to remove a specific function from a topic that has already been subscribed

```
eventBus.Unsubscribe('topic', func);
```

## Resetting the EventBus

The Reset function clears out all of the previously subscribed events

```
eventBus.Reset();
```