// ? What is the event module?
/*
 * The `event` module allows us to create, fire, and listen for custom events in Node.js.
 * We can use this module to build our own event-driven architecture.
 */

// ? How to create an event emitter?
const EventEmitter = require("events"); // @ Import the EventEmitter class from the `events` module.
const emitter = new EventEmitter(); // @ Create an instance of the EventEmitter class.

// ? Creating a custom event and listener
/*
 * This example demonstrates how to create a custom event named "greet" and attach a listener to it.
 * The event listener will receive arguments passed from the `emit` call and respond accordingly.
 */
emitter.on("greet", (args) => {
    const { name, prof } = args; // @ Destructure the arguments object to extract `name` and `prof`.
    console.log(`Hello ${name}. Are you ${prof} ?`); // @ Log a greeting message with the user's details.
});

// @ Emitting the "greet" event with different arguments.
emitter.emit("greet", { name: "Abubakar", prof: "Full Stack Developer" }); // @ Example 1
emitter.emit("greet", { name: "Ali", prof: "Frontend Developer" }); // @ Example 2

// ? Using `once` to listen to an event
/*
 * The `once` method registers a listener that will only respond to the event the first time it's emitted.
 */
emitter.once("hello", (msg) => {
    console.log(msg); // @ Log the message received from the event emitter.
});

// @ Emitting the "hello" event twice. The listener responds only to the first emission.
emitter.emit("hello", "Hello World!"); // @ Will trigger the listener.
emitter.emit("hello", "Hello World2"); // @ Will NOT trigger the listener.

// ? What is the difference between `on` and `once`?
/*
 * - `on`: Registers a listener that will be called every time the event is emitted.
 * - `once`: Registers a listener that will be called only the first time the event is emitted.
 */

// ? Handling errors using the `error` event
/*
 * The `error` event is a built-in event that can be used to handle error scenarios.
 */
emitter.on("error", (err) => {
    console.log(err); // @ Log the error received from the emitter.
});

//! Uncomment to test error handling:
// emitter.emit("error", new Error("Something went wrong!")); // @ Emit an error event with an Error object.
// emitter.emit("error", "Something went wrong!"); // @ Emit an error event with a custom error message.

// ? Countdown example using a recursive event
/*
 * This example demonstrates a countdown timer using the `countDown` event.
 * The listener handles a countdown and emits the event recursively until the countdown reaches zero.
 */
emitter.on("countDown", (args) => {
    const { num, err } = args; // @ Destructure the arguments object to extract `num` and `err`.

    if (num < 0) {
        // @ Log an error message if the number is negative.
        console.log(err);
    } else if (num > 0) {
        // @ Log the current number and recursively emit the `countDown` event with a decremented number.
        setTimeout(() => {
            console.log(num);
            emitter.emit("countDown", {
                num: num - 1, // @ Decrement the number.
                err, // @ Pass the same error object for consistency.
            });
        }, 1000); // @ Delay each step of the countdown by 1 second.
    } else {
        // @ Log a completion message when the countdown reaches zero.
        console.log("Done");
    }
});

// @ Start the countdown from 10.
emitter.emit("countDown", {
    num: 10, // @ Initial countdown value.
    err: new Error("Please Provide a Valid Time"), // @ Error message for invalid input.
});
