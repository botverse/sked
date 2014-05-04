sked
====

Scheduler based in Javascript timers

## Usage

Use [https://github.com/guille/ms.js/](ms.js) for times if you want.

```javascript
// if the start attribute is `now`
// it will be 0
// if the period attribute is omited
// it will run only once
var config = {
  start: { date, string or ms },
  period: { ms or string }
};

// if you pass an integer or a string as config,
// that will be the period and the first execution
// will be `now`
// var config = 0;

// given context for the callback
// if ommited the context will be
// Sked instance itself
var context = this;

var scheduler = new Sked(config, function() {
  // do stuff
  ...
  // if you want to stop the execution:
  scheduler.stop();
}, context);
```

