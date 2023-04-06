import { describe, expect, test, afterEach } from '@jest/globals';
import { EventBus } from '../src/EventBus';
import { EventBinder } from '../src/EventBinder';
import { Test1 } from './testClasses/testModule1';
import { Test2 } from './testClasses/testModule2';

afterEach(() => EventBus.getInstance().reset());

describe('EventBus module', () => {

  test('instantiate, has an empty eventBus', () => {
    // Given a new instantiation of EventBus
    const eventBus = EventBus.getInstance();

    // Then the events array should be empty
    expect(eventBus.getSubscriptions().length).toBe(0);
  });

  test('subscribe, has subsription', () => {
    // Given an Event and an Event Bus
    const eventBus = EventBus.getInstance();
    const func = () => { console.log('hi'); };

    // When I add the event to the EventBus
    eventBus.subscribe('test', func);

    // The EventBus array should contain the event
    const event = new EventBinder('test', func);
    expect(eventBus.getSubscriptions().length).toBe(1);
    expect(eventBus.getSubscriptions().find((e) =>
      e.Name === 'test' &&
            e.Function === func)).toStrictEqual(event);
  });

  test('with two subscriptions, unsubscribe from one, keeps other subscription', () => {
    // Given two Events in an Event Bus
    const eventBus = EventBus.getInstance();

    const funcA = () => console.log('a');
    const funcB = () => console.log('b');

    eventBus.subscribe('a', funcA);
    eventBus.subscribe('b', funcB);

    // When Unsubsribing from an event
    eventBus.unsubscribe('a', funcA);

    // Then the event is removed from the eventBus
    expect(eventBus.getSubscriptions().find(e =>
      e.Name === 'a' &&
            e.Function === funcA)).toBe(null || undefined);

    // And the other event is still in the eventBus
    const event = new EventBinder('b', funcB);

    expect(eventBus.getSubscriptions().find(e =>
      e.Name === 'b' &&
            e.Function === funcB)).toStrictEqual(event);
  });

  test('unsubsribe from a named Subscription, keeps other subscriptions', () => {
    // Given three Events in an Event Bus 
    const eventBus = EventBus.getInstance();

    const funcA = () => console.log('a');
    const funcB = () => console.log('b');

    eventBus.subscribe('a', funcA);
    eventBus.subscribe('b', funcB);
    eventBus.subscribe('a', funcB);

    // when I unsubscribe from any topic called 'a'
    eventBus.unsubscribe('a');

    // then only topics that isn't called 'a' should be present
    const event = new EventBinder('b', funcB);

    expect(eventBus.getSubscriptions().find(e =>
      e.Name === 'a')).toBe(null || undefined);

    expect(eventBus.getSubscriptions().find(e =>
      e.Name === 'b' &&
            e.Function === funcB)).toStrictEqual(event);
  });

  test('unsubsribe from subsription with function used in another subscription, keeps other subscriptions', () => {
    // Given four Events in an Event Bus
    const eventBus = EventBus.getInstance();

    const funcA = () => console.log('a');
    const funcB = () => console.log('b');

    eventBus.subscribe('a', funcA);
    eventBus.subscribe('b', funcB);
    eventBus.subscribe('a', funcB);
    eventBus.subscribe('b', funcA);

    // when I unsubscribe from any topic called 'b' with funcB as the function
    eventBus.unsubscribe('b', funcB);

    // Then the topics that didnt contain both 'b' and funcB will be present
    const events: EventBinder[] = eventBus.getSubscriptions();
    expect(events.length).toBe(3);
    expect(events[0].Function === funcA && events[0].Name === 'a').toBe(true);
    expect(events[1].Function === funcB && events[1].Name === 'a').toBe(true);
    expect(events[2].Function === funcA && events[2].Name === 'b').toBe(true);
  });

  test('emit an event', () => {
    // Given an Event in an EventBus with an event and a variable to be changed
    let variable = 1;
    const func = (data) => { variable = data; };
    const eventBus = EventBus.getInstance();
    eventBus.subscribe('test', func);

    // When I emit the event using the EventBus, passing the data in
    eventBus.emit('test', 25);

    // then the variable should have changed using the eventBus
    expect(variable).toBe(25);
  });

  test('check that eventbus is a singleton', () => {
    // Given an instance of eventBus with some events added to it
    const eventBus = EventBus.getInstance();

    const funcA = () => console.log('a');
    const funcB = () => console.log('b');

    eventBus.subscribe('a', funcA);
    eventBus.subscribe('b', funcB);

    // When I call getInstance again
    const eb = EventBus.getInstance();

    // Then the events should still be contained in the bus
    expect(eventBus.getSubscriptions().length).toBe(2);
    expect(eb.getSubscriptions().length).toBe(2);
    expect(eb.getSubscriptions()[0].Function === funcA && eb.getSubscriptions()[0].Name === 'a').toBe(true);
    expect(eb.getSubscriptions()[1].Function === funcB && eb.getSubscriptions()[1].Name === 'b').toBe(true);
  });

  test('reset event array', () => {
    // Given an event bus with an event
    const eventBus = EventBus.getInstance();
    eventBus.subscribe('test', () => console.log('stuff'));

    // When the event array is reset 
    eventBus.reset();

    // Then the event array will be empty
    expect(eventBus.getSubscriptions().length).toBe(0);
  });

  test('check duplicates', () => {
    // Given an event bus
    const eventBus = EventBus.getInstance();

    // When duplicate eventbinders are added
    const funcA = () => console.log('a');
    const name = 'a';
    eventBus.subscribe(name, funcA);
    eventBus.subscribe(name, funcA);

    // Then only one copy of the eventbinder exists in the Array
    expect(eventBus.getSubscriptions().length).toBe(1);
    expect(eventBus.getSubscriptions().filter(e => e.Name === name && e.Function === funcA).length).toBe(1);
  });

  test('check duplicates from seperate modules', () => {
    // Given two modules with identical functions
    const test1 = new Test1();
    const test2 = new Test2();

    // When they are both subscribed to the same subject
    const eventBus = EventBus.getInstance();
    eventBus.subscribe('test', test1.func1);
    eventBus.subscribe('test', test2.func1);

    // Then they will both be present
    expect(eventBus.getSubscriptions().length).toBe(2);
  });

  test('check that the array cannot be modified without using subscribe', () => {
    // Given an eventBus with a subscription
    const eventBus = EventBus.getInstance();
    const testFunction = () => {
      console.log('test');
    };
    eventBus.subscribe('test', testFunction);

    // When I get the array from the event bus and try to push something to it
    const array = eventBus.getSubscriptions();
    const bobsFunction = () => {
      console.log('bobs function');
    };
    array.push(new EventBinder('bob', bobsFunction));

    // Then the array on the eventBus will not be edited
    expect(eventBus.getSubscriptions().find(event => event.Name === 'bob' && event.Function === bobsFunction)).toBe(undefined);
    expect(eventBus.getSubscriptions().length).toBe(1);
  });

  test('When multiple arguments are passed, they are passed to the supplied function', () => {
    // Given a function with multiple arugments and an input array 
    const eventBus = EventBus.getInstance();

    let outputArray: string[] = [];

    const func = (...args) => {
      outputArray = args;
    };

    const inputArray = ['hello', 'world'];

    // When I subscribe and emit using the function and multiple arguments extracted from the array
    eventBus.subscribe('test', func);

    eventBus.emit('test', inputArray[0], inputArray[1]);

    // Then the input array and output array should be equal
    expect(inputArray).toStrictEqual(outputArray);
  });

});

