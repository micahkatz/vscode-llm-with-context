export default `
Key concepts in JavaScript include:

Variables: JavaScript uses var, let, and const to declare variables. let and const are block-scoped, while var is function-scoped. const defines constants that cannot be reassigned.

Data Types: JavaScript has dynamic types, including string, number, boolean, undefined, null, object, and symbol. Objects and arrays are important compound types.

Functions: Functions are first-class objects in JavaScript, meaning they can be passed as arguments or returned from other functions. They can be declared using function expressions, function declarations, or arrow functions (=>).

Objects: JavaScript uses objects to store keyed collections of data and more complex entities. Objects are mutable and can have methods (functions as properties).

Prototypes: JavaScript uses prototypal inheritance. Objects can inherit properties and methods from other objects via the prototype chain.

Closures: A closure is when an inner function has access to the outer function’s variables, even after the outer function has returned. It's commonly used for data privacy.

Event Loop & Asynchronous Programming: JavaScript uses an event-driven, non-blocking I/O model powered by an event loop, enabling asynchronous tasks with callbacks, promises, and async/await.

Promises: Promises represent the eventual result of an asynchronous operation. They have states: pending, fulfilled, or rejected. then(), catch(), and finally() handle resolved or rejected states.

this Keyword: Refers to the context in which the function is called. The value of this changes depending on how the function is invoked (e.g., in methods, constructors, event handlers).

Scope: JavaScript has function scope and block scope (with let and const). Variables declared outside of any function or block are in the global scope.

Hoisting: Variables and function declarations are "hoisted" to the top of their scope. Variables declared with var are hoisted but initialized as undefined, while let and const are hoisted but not initialized.

Strict Mode: By adding "use strict", JavaScript code is executed in strict mode, which helps catch common coding mistakes and unsafe actions like assigning to undeclared variables.

Modules: JavaScript now supports modules (import/export) to break code into reusable parts. This helps in organizing large applications and sharing functionality across files.

Events: JavaScript can interact with the browser's Document Object Model (DOM) and respond to user inputs via events like click, mouseover, or keydown.

Error Handling: JavaScript uses try, catch, and finally blocks for error handling, allowing graceful recovery from runtime errors.

`;
