import { describe, expect, test, afterEach } from 'vitest';
import { ReactiveMediator } from '../src/ReactiveMediator';
import { Test1 } from './testClasses/testModule1';
import { Test2 } from './testClasses/testModule2';

afterEach(() => ReactiveMediator.reset());

describe('EventBus module', () => {

  test('instantiate, has an empty eventBus', () => {
    expect(Object.keys(ReactiveMediator.getSubscriptions()).length).toBe(0);
  });

  test('subscribe, has subsription', () => {
    const func = () => { console.log('hi'); };
    const topic = 'test';

    ReactiveMediator.subscribe(topic, func);

    expect(Object.keys(ReactiveMediator.getSubscriptions()).length).toBe(1);
    ReactiveMediator.getSubscriptions()[topic].forEach((f) => {
      expect(f).toStrictEqual(func);
    });
  });

  test('with two subscriptions, unsubscribe from one, keeps other subscription', () => {
    const funcA = () => console.log('a');
    const funcB = () => console.log('b');
    const topicA = 'a';
    const topicB = 'b';

    ReactiveMediator.subscribe(topicA, funcA);
    ReactiveMediator.subscribe(topicB, funcB);
    ReactiveMediator.unsubscribe(topicA, funcA);

    expect(ReactiveMediator.getSubscriptions()[topicA].size).toBe(0);
    expect(ReactiveMediator.getSubscriptions()[topicB].size).toBe(1);
  });

  test('unsubsribe from a named Subscription, keeps other subscriptions', () => {
    const funcA = () => console.log('a');
    const funcB = () => console.log('b');
    const topicA = 'a';
    const topicB = 'b';

    ReactiveMediator.subscribe(topicA, funcA);
    ReactiveMediator.subscribe(topicB, funcB);
    ReactiveMediator.subscribe(topicA, funcB);
    ReactiveMediator.unsubscribe(topicA);

    expect(ReactiveMediator.getSubscriptions()[topicA].size).toBe(0);
    expect(ReactiveMediator.getSubscriptions()[topicB].size).toBe(1);
  });

  test('unsubsribe from subsription with function used in another subscription, keeps other subscriptions', () => {
    const funcA = () => console.log('a');
    const funcB = () => console.log('b');
    const topicA = 'a';
    const topicB = 'b';
    ReactiveMediator.subscribe(topicA, funcA);
    ReactiveMediator.subscribe(topicB, funcB);
    ReactiveMediator.subscribe(topicA, funcB);
    ReactiveMediator.subscribe(topicB, funcA);

    ReactiveMediator.unsubscribe(topicB, funcB);

    const events: {[topic: string]: Set<() => void>} = ReactiveMediator.getSubscriptions();
    expect(Object.keys(events).length).toBe(2);
    expect(events[topicA].size).toBe(2);
    expect(events[topicB].size).toBe(1);
    expect([...events[topicA]].find((f) => f === funcA)).toBe(funcA);
    expect([...events[topicA]].find((f) => f === funcB)).toBe(funcB);
    expect([...events[topicB]].find((f) => f === funcA)).toBe(funcA);
    expect([...events[topicB]].find((f) => f === funcB)).toBe(undefined);
  });

  test('emit an event', () => {
    let variable = 1;
    const func = (data) => { variable = data; };
    ReactiveMediator.subscribe('test', func);

    ReactiveMediator.emit('test', 25);

    expect(variable).toBe(25);
  });
  
  test('reset event array', () => {
    ReactiveMediator.subscribe('test', () => {return;});

    ReactiveMediator.reset();

    expect(Object.keys(ReactiveMediator.getSubscriptions()).length).toBe(0);
  });

  test('check duplicates', () => {
    const funcA = () => console.log('a');
    const topic = 'a';
    ReactiveMediator.subscribe(topic, funcA);
    ReactiveMediator.subscribe(topic, funcA);

    expect(Object.keys(ReactiveMediator.getSubscriptions()).length).toBe(1);
    expect(ReactiveMediator.getSubscriptions()[topic].size).toBe(1);
  });

  test('check duplicates from seperate modules', () => {
    const test1 = new Test1();
    const test2 = new Test2();
    const topic = 'test';

    ReactiveMediator.subscribe(topic, test1.func1);
    ReactiveMediator.subscribe(topic, test2.func1);

    expect(Object.keys(ReactiveMediator.getSubscriptions()).length).toBe(1);
    expect(ReactiveMediator.getSubscriptions()[topic].size).toBe(2);
  });

  test('check that the array cannot be modified without using subscribe', () => {
    const testFunction = () => {
      console.log('test');
    };
    ReactiveMediator.subscribe('test', testFunction);

    const events = ReactiveMediator.getSubscriptions();
    const bobsFunction = () => {
      console.log('bobs function');
    };
    const bobTopic = 'bob';
    events[bobTopic] = new Set<() => void>();
    events[bobTopic].add(bobsFunction);

    expect(ReactiveMediator.getSubscriptions()[bobTopic]).toBe(undefined);
    expect(Object.keys(ReactiveMediator.getSubscriptions()).length).toBe(1);
  });
  
  test('When multiple arguments are passed, they are passed to the supplied function', () => {
    let outputArray: string[] = [];
    const func = (...args) => {
      outputArray = args;
    };
    const inputArray = ['hello', 'world'];
    ReactiveMediator.subscribe('test', func);

    ReactiveMediator.emit('test', inputArray[0], inputArray[1]);

    expect(inputArray).toStrictEqual(outputArray);
  });
  
  test('Duplicate Arrow functions', () => {
    let count = 0;

    const increment = () => {
      count++;
    };

    ReactiveMediator.subscribe('increment', increment);
    ReactiveMediator.subscribe('increment', increment);

    ReactiveMediator.emit('increment');

    expect(count).toBe(1);
  });

  test('OneMillionSubscriptions_annonymous_countUpdates', () => {
    let count = 0;

    for (let i = 1; i <= 1000000; i++) {
      ReactiveMediator.subscribe('increment', () => count++);
    }

    ReactiveMediator.emit('increment');

    expect(count).toBe(1000000);
  });

  test('subscriptionsCannotBeModifiedDirectly', () => {
    let A = 0;

    const increment1 = () => {A = 1;};
    const increment2 = () => {A = 2;};
    ReactiveMediator.subscribe('incrementA', increment1);

    const subs = ReactiveMediator.getSubscriptions();
    subs['incrementA'].clear();
    subs['incrementA'].add(increment2);
    ReactiveMediator.emit('incrementA');

    expect(A).toBe(1);
  });
});

