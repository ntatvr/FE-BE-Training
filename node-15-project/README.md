# NodeJS
- Version: I'm using version v15.0.0

# How Node.js works (Reactoer Pattern)
- I/O is slow. I/O is usually not expensive in terms of CPU, but it adds a delay between the moment the request is sent to the device and the moment the operation completes.
- Blocking I/O: not able to handle multiple connections to the same thread (waiting for the response). This is because each I/O operation on a socket will block the processing of any other connection. The traditional approach to solving this problem is to use a separate thread (or process) to handle each concurrent connection.
```JavaScript
// blocks the thread until the data is available
data = socket.read()
// data is available
print(data)
```
- Non-blocking I/O: always return immediately without waiting for data to be read or written. The most basic pattern for dealing with this type of non-blocking I/O is to actively poll the resource within a loop until some actual data is returned. This is called 'busy-waiting'. (not efficient)
```JavaScript
resources = [socketA, socketB, fileA]
while (!resources.isEmpty()) {
  for (resource of resources) {
    // try to read
    data = resource.read()
    if (data === NO_DATA_AVAILABLE) {
      // there is no data to read at the moment
      continue
    }
    if (data === RESOURCE_CLOSED) {
      // the resource was closed, remove it from the list
      resources.remove(i)
    } else {
      //some data was received, process it
      consumeData(data)
    }
  }
}
```
- Event demultiplexing: handle concurent non-blocking resources - synchronous event demultiplexer (also know as event notification interface)

```JavaScript
watchedList.add(socketA, FOR_READ)                            // (1)
watchedList.add(fileB, FOR_READ)
while (events = demultiplexer.watch(watchedList)) {           // (2)
  // event loop
  for (event of events) {                                     // (3)
    // This read will never block and will always return data
    data = event.resource.read()
    if (data === RESOURCE_CLOSED) {
      // the resource was closed, remove it from the watched list
      demultiplexer.unwatch(event.resource)
    } else {
      // some actual data was received, process it
      consumeData(data)
    }
  }
}
```
- The reactor pattern: The main idea behind the reactor pattern is to have a handler associated with each I/O operation. A handler in Node.js is represented by a callback (or cb for short) function. 
https://stackoverflow.com/questions/56622353/how-does-reactor-pattern-work-in-node-js

## Message queue

### process.nextTick()
When we pass a function to process.nextTick(), we instruct the engine to invoke this function at the end of the current operation, before the next event loop tick starts:
```JavaScript
process.nextTick(() => {
  //do something
})
```
Calling setTimeout(() => {}, 0) will execute the function at the end of next tick, much later than when using nextTick() which prioritizes the call and executes it just before the beginning of the next tick.

### process.setImmediate()
When you want to execute some piece of code asynchronously, but as soon as possible, one option is to use the setImmediate() function provided by Node.js

# Node essential patterns

## 1. HTTP server: 
- The 'http' provides the functionality to module to create a HTTP server by using http.createServer() method.
```JavaScript
const server = http.createServer((req, res) => {});
```

## 2. Debugging Your NodeJS Application
- You can use the node-inspector. Run this command to install it via npm:
npm install -g node-inspector

- Then you can debug your application using
node-debug app.js

## 3. How to get a basic HTTPS web server up and running!
https://riptutorial.com/node-js#how-to-get-a-basic-https-web-server-up-and-running-

## 4. Async in NodeJS: using with callback
- Callback: What are callbacks? Callbacks are basically just functions that you pass to other functions.
https://nodejs.org/en/knowledge/getting-started/control-flow/what-are-callbacks/
```JavaScript
function callback(err, result [, arg1[, ...]])
```
### 4.1. Callbacks: simple, obvious, …hellish
- Callback Hell: How do I fix callback hell?
http://callbackhell.com/
```JavaScript
let leftToDo = 2; // or use booleans doneA and doneB instead...
doA(argA, (errA, resA) => {
  // ...
  leftToDo--;
  // ...to do after A
  if (leftToDo === 0) {
    todoAfterAB();
  }
});
doB(argB, (errB, resB) => {
  // ...
  leftToDo--;
  // ...to do after B
  if (leftToDo === 0) {
    todoAfterAB();
  }
});
function todoAfterAB() {
  // ...
}
```

### 4.2. Async module: is not a good solution for "Callback hell" because we still need something nesting.
```JavaScript
const async = require('async');
async.parallel(
  [
    doA, // if A needs no args and no special logic afterwards
    doB.bind(null, argB), // if B needs argB
    (callback) => { // if C needs both arg and special logic
      // ...stuff to do immediately before C
      doC(argC, (errC, resC) => {
        // ...stuff to do immediately after C
        callback(resC);
      });
    }
  ],
  (err, results) => { // callback
    // ...stuff to do after A, B and C are all done
  }
);
```
The name, “parallel”. Because as you know Node.js is single threaded, so the only thing happening in parallel is the IO, done outside Javascript code

### 4.3 Promises: promise is just an enhancement to callback functions in Node.js. During the development lifecycle, there may be an instance where you would need to nest multiple callback functions together. This can get kind of messy and difficult to maintain at a certain point in time. In short, a promise is an enhancement to callbacks that looks towards alleviating these problems.
```JavaScript
var promise = doSomethingAync()
promise.then(onFulfilled, onRejected)
```
- "doSomethingAync" is any callback or asynchronous function which does some sort of processing
- This time, when defining the callback, there is a value which is returned called a "promise."
- When a promise is returned, it can have 2 outputs. This is defined by the 'then clause'. Either the operation can be a success which is denoted by the 'onFulfilled' parameter. Or it can have an error which is denoted by the 'onRejected' parameter.

Creating a custom promise: A custom promise can be created by using a node module called 'q.'. It is used to convert any function into a function that would return a promise

### 4.4 Async/Await: to use async/await, you actually need code that returns promises. 
```JavaScript
// ...
async function showFileContents() {
  let data = await getFileContents('hello.txt');
  console.log('File contents:', data);
}
showFileContents();
```

- Handle Error
```JavaScript
// ...
async function showFileContents() {
  try {
    let data = await getFileContents('hello.txt');
    console.log('File contents:', data);
  } catch (err) {
    console.error("Error reading file:", err);
  }
}
showFileContents();
```

The important links between promises and async/await are:
+ everything you await for is (usually) a Promise
+ the returned value from an async function is a Promise, so you can use .then() function.
```JavaScript
showFileContents().then(() => console.log('We did it!'))
```

## 5. Event Emitter
https://medium.com/edge-coders/understanding-node-js-event-driven-architecture-223292fcbc2d

### 5.1 Understanding Node.js Event-Driven Architecture
- Most of Node’s objects — like HTTP requests, responses, and streams — implement the EventEmitter module so they can provide a way to emit and listen to events.

### 5.2 The EventEmitter Module
The EventEmitter is a module that facilitates communication between objects in Node. EventEmitter is at the core of Node asynchronous event-driven architecture. Many of Node’s built-in modules inherit from EventEmitter.
The concept is simple: emitter objects emit named events that cause previously registered listeners to be called. So, an emitter object basically has two main features:
- Emitting name events.
- Registering and unregistering listener functions.
```JavaScript
const EventEmitter = require('events');

class WithLog extends EventEmitter {
  execute(taskFunc) {
    console.log('Before executing');
    this.emit('begin');
    taskFunc();
    this.emit('end');
    console.log('After executing');
  }
}

const withLog = new WithLog();

withLog.on('begin', () => console.log('About to execute'));
withLog.on('end', () => console.log('Done with execute'));

withLog.execute(() => console.log('*** Executing task ***'));
```
- Events Arguments and Errors
+ If we register a listener for the special error event, the error will be reported but the node process will not crash and exit.
+ The other way to handle exceptions from emitted errors is to register a listener for the global uncaughtException process event. However, catching errors globally with that event is a bad idea.
```JavaScript
process.on('uncaughtException', (err) => {
  // something went unhandled.
  // Do any cleanup and exit anyway!

  console.error(err); // don't do just that.

  // FORCE exit the process too.
  process.exit(1);
});
```
+ Using .once() method to catch all error error at the same time. This method signals to invoke the listener just once, not every time it happens.

- Order of Listeners: If we register multiple listeners for the same event, the invocation of those listeners will be in order. The first listener that we register is the first listener that gets invoked. Using 'prependListener' method to trigger event if there are more than one listener.

## 6. Stream
- Streams are one of the fundamental concepts that power Node.js applications. They are data-handling method and are used to read or write input into output sequentially.
- Streams are a way to handle reading/writing files, network communications, or any kind of end-to-end information exchange in an efficient way.
- What makes streams unique, is that instead of a program reading a file into memory all at once like in the traditional way, streams read chunks of data piece by piece, processing its content without keeping it all in memory.
- 
### 6.1 There are 4 types of streams in Node.js: Writable, Readable, Duplex and Transform

## 7. Expose functionality from a Node.js file using exports

# HAPI - https://livebook.manning.com/book/hapi-js-in-action/chapter-1/23

## What is hapi?
Hapi is an open source framework for building web applications with Node. HAPI sits between Node and your own application’s code .providing an abstraction layer for working with HTTP requests and responses.

## What makes hapi special?
- It's NodeJS
- Strong focus on modularity helps teams
- Configuration-driven features
- It’s really quick to get started
- It’s open source
- It’s been battle-tested in production

Express vs HAPI:
1. It is easier to define route.
2. Plugin and MiddleWares

## The building blocks of hapi
![](readme-assets/the-building-blocks-of-hapi.jpg)

