import {describe, expect, test} from '@jest/globals';
import EventBus from '../../src/EventBus';
import EventBinder from '../../src/EventBinder';
import { Test1 } from './testClasses/testModule1';
import { Test2 } from './testClasses/testModule2';


describe('EventBus module', () => {

    test('Instantiate', () => {
        //Given a new instantiation of EventBus
        let eventBus = EventBus.getInstance();

        //Then the events array should be empty
        expect(eventBus.events.length).toBe(0);
    });

    test('Subscribe', () => {
        //Given an Event and an Event Bus
        let eventBus = EventBus.getInstance();
        let func = () => {console.log("hi")};

        //When I add the event to the EventBus
        eventBus.Subscribe('test', func);

        //The EventBus array should contain the event
        var event = new EventBinder('test', func);
        expect(eventBus.events.length).toBe(1);
        expect(eventBus.events.find((e) => 
            e.Name === 'test' &&
            e.Function === func
        )).toStrictEqual(event);

        //Reset array
        eventBus.Reset();
    });

    test('Unsubscribe', () => {
        //Given two Events in an Event Bus
        let eventBus = EventBus.getInstance();

        let funcA = () => console.log('a');
        let funcB = () => console.log('b');

        eventBus.Subscribe('a', funcA);
        eventBus.Subscribe('b', funcB);

        //When Unsubsribing from an event
        eventBus.Unsubscribe('a', funcA);

        //Then the event is removed from the eventBus
        expect(eventBus.events.find(e => 
            e.Name == 'a' &&
            e.Function == funcA
            )).toBe(null || undefined);

        //Amd the other event is still in the eventBus
        let event = new EventBinder('b',funcB);

        expect(eventBus.events.find(e => 
            e.Name == 'b' &&
            e.Function == funcB)).toStrictEqual(event);
        
        //Reset array
        eventBus.Reset();
    });

    test('Emit', () => {
        //Given an Event in an EventBus with an event and a variable to be changed
        let variable = 1;
        let func = (data) => { variable = data; };
        let eventBus = EventBus.getInstance();
        eventBus.Subscribe('test', func);

        //When I emit the event using the EventBus, passing the data in
        eventBus.Emit('test', 25);

        //then the variable should have changed using the eventBus
        expect(variable).toBe(25);

        //Reset array
        eventBus.Reset();
    });

    test('checkSingleton', () => {
        //Given an instance of eventBus with some events added to it
        let eventBus = EventBus.getInstance();

        let funcA = () => console.log('a');
        let funcB = () => console.log('b');

        eventBus.Subscribe('a', funcA);
        eventBus.Subscribe('b', funcB);

        //When I call getInstance again
        let eb = EventBus.getInstance();
    
        //Then the events should still be contained in the bus
        expect(eventBus.events.length).toBe(2);
        expect(eb.events.length).toBe(2);
        expect(eb.events[0].Function === funcA && eb.events[0].Name === 'a').toBe(true);
        expect(eb.events[1].Function === funcB && eb.events[1].Name === 'b').toBe(true);

        //Reset array
        eventBus.Reset();
    });

    test('reset event array', () => {
        //Given an event bus with an event
        let eventBus = EventBus.getInstance();
        eventBus.Subscribe('test', () => console.log('stuff'));

        //When the event array is reset 
        eventBus.Reset();

        //Then the event array will be empty
        expect(eventBus.events.length).toBe(0);
    });

    test('check duplicates', () => {
        //Given an event bus
        let eventBus = EventBus.getInstance();

        //When duplicate eventbinders are added
        let funcA = () => console.log('a');
        let name = 'a';
        eventBus.Subscribe(name, funcA);
        eventBus.Subscribe(name, funcA);

        //Then only one copy of the eventbinder exists in the Array
        expect(eventBus.events.length).toBe(1);
        expect(eventBus.events.filter(e => e.Name === name && e.Function === funcA).length).toBe(1);

        //Reset array
        eventBus.Reset();
    });

    test('check duplicates from seperate modules', () => {
        //Given two modules with identical functions
        let test1 = new Test1();
        let test2 = new Test2();

        //When they are both subscribed to the same subject
        let eventBus = EventBus.getInstance();
        eventBus.Subscribe('test', test1.func1);
        eventBus.Subscribe('test', test2.func1);

        //Then they will both be present
        expect(eventBus.events.length).toBe(2);
    })
});