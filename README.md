sked
====

Scheduler based in Javascript timers

## Usage

The constructor accepts 3 arguments: `config`, `callback` and `context`.

Use [https://github.com/guille/ms.js/](ms.js) for times if you want.

```javascript
var sked = require('sked');

var config = {
  start: { date, string or ms },
  period: { ms or string }
};

var context = this;

var scheduler = sked(config, function() {
  // do stuff
  ...
  // if you want to stop the execution:
  scheduler.stop();
}, context);
```

## Config options

You can skip the options and by default they will became:

```javascript
{ period: '1d', start: 'now' }
```

So this will work once a day from now:

```javascript
var scheduler = new Sked(function() {
// do stuff
});
```

*start*:

start can be omitted and will became `now`:

```javascript
var config = { period: '1d' };
// will became
var config = { start: 'now', period: '1d' };
// which is equivalent to
var config = '1d';
```

start can be a date:

```javascript
var config = { start: new Date('2017-04-15T18:06:08-07:00'), period:... };
```

or a string:

```javascript
// start one minute in the future
var config = { start: '1m', period:... };
```

or milliseconds:

```javascript
// start one minute in the future
var config = { start: 60000, period:... };
```

*period*:

If period is omitted, will run only once, but for
that purpose you better use just a setTimeout unless
you are passing a Date instance

```javascript
// execute once after a second
var config = { start: 1000 };
```

A string or an integer instead of an object
will be interpreted

```javascript
// this works
var config = '1m';
// also this
var config = 60000;
```



