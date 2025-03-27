import { describe, expect, test, afterEach } from 'vitest';
import { ReactiveMediator } from '../src/ReactiveMediator';

afterEach(() => ReactiveMediator.reset());

describe('ReactiveMediator performance tests', () => {

  test('OneMillionSubscriptions_annonymous_countUpdates', () => {
    let count = 0;
  
    for (let i = 1; i <= 1000000; i++) {
      ReactiveMediator.subscribe('increment', () => count++);
    }
  
    ReactiveMediator.emit('increment');
  
    expect(count).toBe(1000000);
  });
});
