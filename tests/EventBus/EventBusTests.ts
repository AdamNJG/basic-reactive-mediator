import {describe, expect, test} from '@jest/globals';
import { EventBus, EventBinder} from '../../src/index';


describe('EventBus module', () => {

    test('Instantiate', () => {
        //Given a new instantiation of EventBus
        let eventBus = EventBus.getInstance();

        //Then the events array should be empty
        expect(eventBus.events.length === 0);
    });

    test('Subscribe', () => {
        //Given an Event and an Event Bus
        let eventBus = EventBus.getInstance();
        let func = () => {console.log("hi")};

        //When I add the event to the EventBus
        eventBus.Subscribe('test', func);

        //The EventBus array should contain the event
        var event = new EventBinder('test', func);
        expect(eventBus.events.length === 1);
        expect(eventBus.events.find((e) => 
            e.Name === 'test' &&
            e.Function === func
        ) === event);
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
            ) === null);

        //Amd the other event is still in the eventBus
        let event = new EventBinder('b',funcB);

        expect(eventBus.events.find(e => 
            e.Name == 'b' &&
            e.Function == funcB) === event);
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
        expect(variable === 25);
    });

    /*test('getInstance', () => {
        //create an instance 
    });*/
});