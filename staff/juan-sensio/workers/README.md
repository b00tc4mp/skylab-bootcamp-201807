# Workers

Async programming enables your app UI to be responsive, by “scheduling” parts of the code to be executed a bit later in the event loop, thus allowing the UI rendering to be performed first. A good use case for async programming is making AJAX requests. Since requests can take a lot of time, they can be made asynchronously, and while the client is waiting for a response, other code can be executed.

But how can other code be made asynchronous? For example, what if the code that is inside the success callback is very CPU intensive ? If the calculation is not an HTTP request but a blocking code (e.g. a huge for loop), there is no way to free up the event loop and unblock the UI of the browser — it will freeze and be unresponsive to the user.

**Web Workers** are in-browser threads that can be used to execute JavaScript code without blocking the event loop. Web Workers allow developers to put long-running and computationally intensive tasks on the background without blocking the UI, making your app even more responsive.

Web Workers are implemented as .js files which are included via asynchronous HTTP requests in your page. These requests are completely hidden from you by the Web Worker API.

Workers utilize thread-like message passing to achieve parallelism. They’re perfect for keeping your UI up-to-date, performant, and responsive for users.

Web Workers run in an isolated thread in the browser. As a result, the code that they execute needs to be contained in a separate file. That’s very important to remember.

Web Workers have access only to a subset of JavaScript features due to their multi-threaded nature. Here’s the list of features:

- The navigator object
- The location object (read-only)
- XMLHttpRequest
- setTimeout()/clearTimeout() and setInterval()/clearInterval()
- The Application Cache
- Importing external scripts using importScripts()
- Creating other web workers

Sadly, Web Workers don’t have access to some very crucial JavaScript features:

- The DOM (it’s not thread-safe)
- The window object
- The document object
- The parent object

This means that a Web Worker can’t manipulate the DOM (and thus the UI). It can be tricky at times, but once you learn how to properly use Web Workers, you’ll start using them as separate “computing machines” while all the UI changes will take place in your page code. The Workers will do all the heavy lifting for you and once the jobs are done, you’ll pass the results to the page which makes the necessary changes to the UI.

## Reference

[How JavaScript works: The building blocks of Web Workers + 5 cases when you should use them](https://blog.sessionstack.com/how-javascript-works-the-building-blocks-of-web-workers-5-cases-when-you-should-use-them-a547c0757f6a)