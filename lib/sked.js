var ms = require('ms');

var sked = Sked.prototype;

module.exports = Sked;

/**
 * config can be
 *
 * ```javascript
 *   {
 *     period: { ms or string },
 *     startTime: { date, string or ms }
 *   }
 * ```
 *
 * @param config
 * @param cb { Function } Callback
 * @param context { Object } context to run the callback on
 *
 * @constructor
 */

function Sked(config, cb, context) {
  if (typeof cb !== 'function') {
    context = cb;
    cb = config;
    config = false;
  }

  this.parse(config);

  this.context = context || null;
  this.cb = cb;

  this.interval = null;
  this.timeout = null;
}

sked.parse = function(config) {
  if(!config)
    config = { period: '1d', start: 'now' };
  if(typeof config !== 'object')
    config = { period: config, start: 'now' };
  if(typeof config.period === 'string')
    config.period = ms(config.period);
  if(config.start === 'now')
    config.start = 0;
  if(typeof config.start === 'string')
    config.start = ms(config.start);

  this.config = config;
};

sked.start = function(doNow) {
  var that = this;
  var period = this.config.period;
  var start = this.config.start;
  var context = this.context || this;

  if(doNow === true && start !== 0) {
    this.cb.call(context);
  }

  this.timeout = setTimeout(function() {
    that.cb.call(context);
    that.timeout = null;
    if (period) {
      that.interval = setInterval(function() {
        that.cb.call(that.context);
      }, period);
    }
  }, start);
};

sked.stop = function() {
  if(this.timeout) {
    clearTimeout(this.timeout);
    this.timeout = null;
    return true;
  }

  if(this.interval === null) return false;

  clearInterval(this.interval);
  this.interval = null;
  return true;
};

