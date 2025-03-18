// const EventEmitter = require('node:events');
// class MyEmitter extends EventEmitter {}
// const myEmitter = new MyEmitter();
// myEmitter.on('event', (a, b) => {
//   console.log(a, b, this);
//   // Prints: a b {}
// });
// myEmitter.emit('event', 'a', 'b');

// const EventEmitter = require('node:events');
// class MyEmitter extends EventEmitter {}
// const myEmitter = new MyEmitter();
// myEmitter.emit('error', new Error('whoops!'));
// // Throws and crashes Node.js

// const EventEmitter = require('node:events');
// const ee = new EventEmitter();
// ee.on('something', (value) => {
//   throw new Error('kaboom');
// });
// ee.emit('something', 'hello');

// const { error } = require('node:console');
// const EventEmitter = require('node:events');
// const ee1 = new EventEmitter({ captureRejections: false });
// ee1.on('something', async (value) => {
//   throw new Error('kaboom');
// });
// ee1.emit('something','hi')
// ee1.on('error', console.log(error));

// const ee2 = new EventEmitter({ captureRejections: true });
// ee2.on('something', async (value) => {
//   throw new Error('kaboom');
// });

// ee2[Symbol.for('nodejs.rejection')] = console.log;


//--------------------------------------------------------------------

// //different emmiter function :

// const EventEmitter=require('node:events')
// const e=new EventEmitter()

// e.on('event',function fun1(){
//     console.log('event emitted')
// })

// e.on('event',function fun3(a){console.log(a)})

// e.on('event',function fun2(a,b){
//     console.log(a,b)
// })

// e.once('event',funOnce(){
//     console.log('once event emitted')
// })

// e.emit('event',1,2)

// e.on('event2',()=>{})

// // e.prependListener('event',()=>{
// //     console.log('prepend listener')
// // })

// console.log(e.listeners('event'))
// console.log(e.eventNames())

// console.log(e.getMaxListeners())
// console.log(e.setMaxListeners(12,'event'))
// console.log(e.getMaxListeners())
// console.log(e.listenerCount('event'))


//--------------------------------------------------------------------

//return emitter :

const EventEmitter = require('events');

// function createEmitter() {
//     const emitter = new EventEmitter();

//     // Emit an event after a delay
//     setTimeout(() => {
//         emitter.emit('ready', 'System is ready!');
//     }, 1000);

//     return emitter;
// }

// // Usage
// const myEmitter = createEmitter();
// myEmitter.on('ready', (message) => {
//     console.log(message); // Output: System is ready!
// });

//----------------------------------------------------------------------------------------

// //inherit :

// class auth extends EventEmitter{
//     constructor(){
//         super()
//     }

//     login(){
//         this.emit('login')
//     }

//     logout(){
//         this.emit('logout')
//     }
// }

// const a=new auth('ram')
// a.on('login',()=>{
//     console.log('login ')
// })
// a.on('logout',()=>{
//     console.log('logout ')
// })

// a.login()
// a.logout()


//-----------------------------------------------------------------

////The EventEmitter calls all listeners synchronously in the order in which they were registered. This ensures the proper sequencing of events and helps avoid race conditions and logic errors. When appropriate, listener functions can switch to an asynchronous mode of operation using the setImmediate() or process.nextTick() methods:

// const EventEmitter = require('node:events');
// class MyEmitter extends EventEmitter {}
// const myEmitter = new MyEmitter();

// myEmitter.on('event', (a, b) => {
//   setImmediate(() => {
//     console.log('this happens asynchronously');
//   });
// });

// myEmitter.on('event', () => {
//     console.log('Event listener registered');
//     });
// myEmitter.emit('event', 'a', 'b');

//--------------------------------------------------------------------------

////error capturing :

// const EventEmitter = require('node:events');
// const ee1 = new EventEmitter({ captureRejections: true });
// ee1.on('something', async (value) => {
//   throw new Error('kaboom');
// });

// ee1.on('error', console.log);

//----------------------------------------------------------------

//use cases:

// 1.real time chat application
// 2.simple progresss Bar
// 3.plugin arch.Bar
// 4.state management System
// 5.async task queue
// 6.simulate network events
// 7.UI framework
//9.simple workflow engine
//10.file upload progress bar

//---------------------------------------------------------

//remove 

// const EventEmitter = require('node:events');
// class MyEmitter extends EventEmitter {}
// const myEmitter = new MyEmitter();

// function name(a,b){
//         console.log('this happens asynchronously');
// }
// myEmitter.on('event',name);

// myEmitter.on('event', () => {
//     console.log('Event listener registered');
//     });
// myEmitter.emit('event', 'a', 'b');
// // myEmitter.removeListener('event',name)
// myEmitter.removeAllListeners('event')
// myEmitter.emit('event', 'a', 'b');

//------------------------------------------------------

// const EventEmitter = require('node:events');
// const emitter = new EventEmitter();
// emitter.once('log', () => console.log('log once'));

// // Returns a new Array with a function `onceWrapper` which has a property
// // `listener` which contains the original listener bound above
// const listeners = emitter.rawListeners('log');
// const logFnWrapper = listeners[0];

// console.log(listeners[0])
// // Logs "log once" to the console and does not unbind the `once` event
// logFnWrapper.listener();

// // Logs "log once" to the console and removes the listener
// logFnWrapper();

// emitter.on('log', () => console.log('log persistently'));
// // Will return a new Array with a single function bound by `.on()` above
// const newListeners = emitter.rawListeners('log');

// // Logs "log persistently" twice
// newListeners[0]();
// emitter.emit('log');