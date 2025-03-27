import { describe, expect, test, afterEach } from 'vitest';
import { ReactiveMediator } from '../src/ReactiveMediator';

afterEach(() => ReactiveMediator.reset());

describe('ReactiveMediator performance tests', () => {

  test('OneMillionSubscriptions_annonymous_countUpdates', () => {
    let count = 0;
    const start = Date.now();  // Start timer

    const initialMemory = process.memoryUsage();
    
    for (let i = 1; i <= 1000000; i++) {
      ReactiveMediator.subscribe('increment', () => count++);
    }
    
    ReactiveMediator.emit('increment');
    
    const finalMemory = process.memoryUsage();

    const duration = Date.now() - start;  // Measure time
    console.log(`Execution time: ${duration}ms`);

    const memoryUsed = finalMemory.heapUsed - initialMemory.heapUsed;
    console.log(`memory used: ${memoryUsed}`)

    expect(duration).toBeLessThan(400)
    expect(count).toBe(1000000);
  });

  test('OneHundredSubscriptions_annonymous_countUpdates', () => {
    let count = 0;
    const start = Date.now();  // Start timer

    const initialMemory = process.memoryUsage();
    
    for (let i = 1; i <= 100; i++) {
      ReactiveMediator.subscribe('increment', () => count++);
    }
    
    ReactiveMediator.emit('increment');
    
    const finalMemory = process.memoryUsage();

    const duration = Date.now() - start;  // Measure time
    console.log(`Execution time: ${duration}ms`);

    const memoryUsed = finalMemory.heapUsed - initialMemory.heapUsed;
    console.log(`memory used: ${memoryUsed}`)

    expect(duration).toBeLessThan(400)
    expect(count).toBe(100);
  });
});
