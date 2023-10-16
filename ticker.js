import { EventEmitter } from "events"

class TickEmitter extends EventEmitter {}

function ticker(ms, callback) {
  const tickerEmitter = new TickEmitter()
  let tickerCount = 0;

  const currentTime = Date.now()

  function tick() {
    // If current timestamp is divisible by 5 propagate an error
    if (currentTime % 5 === 0) {
      const error = new Error('Timestamp is divisible by 5')
      callback(error)
      tickerEmitter.emit('error', error)
    }
    else {
      tickerEmitter.emit('tick')
      tickerCount++;
        if (tickerCount * 50 < ms) {
          setTimeout(tick, 50);
        }
        else {
          callback(null, tickerCount)
        }
    }
  }

  process.nextTick(() => tick())
//   setTimeout(tick, 50)

  return tickerEmitter
}

// Example usage:
const tickerInstance = ticker(100, (err, count) => {
  if(err) {
    console.error(`Error: ${err.message}`)
  }
  else {
    console.log(`Total tick count: ${count}`)
  }
});

tickerInstance.on('tick', () => {
  console.log('Tick')
});
tickerInstance.on('error', (err) => {
  console.log(`Error emitted via event emitter: ${err.message}`)
});