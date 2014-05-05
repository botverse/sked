describe('Sked', function() {
  function Results() {
    var count = 0;

    this.touch = function() {
      count++;
    };

    this.size = function(){
      return count;
    };
  }

  var results, per;

  beforeEach(function(){
    results = new Results();
  });

  var ms = require('ms');
  var Sked = require('../lib/sked');

  describe('with defaults', function() {
    beforeEach(function(){
      per = new Sked(function(){
        this.touch();
      }, results);
    });

    afterEach(function() {
      per.stop();
    });

    it('should instantiate', function() {
      expect(per instanceof Sked).toBe(true);
    });

    it('should callback immediately', function() {
      runs(function() { per.start() });
      waits(0);
      runs(function() {
        expect(results.size()).toBe(1);
      });
    });
  });

  describe('with custom start', function() {
    beforeEach(function(){
      var time = 100;
      per = new Sked({ start: time, period: 100 }, function(){
        results.touch();
      });
    });

    it('should callback later', function() {
      per.start();
      expect(results.size()).toBe(0);
      expect(per.timeout._idleTimeout).toBe(100);
      per.stop();
    });

    it('should callback immediately', function() {
      per.start(true);
      expect(results.size()).toBe(1);
      per.stop();
    });

    it('should callback after a hundred', function(){
      runs(function() { per.start(); });

      waits(101);

      runs(function() {
        expect(results.size()).toBe(1);
        per.stop();
      });
    });

    it('should callback twice after a hundred', function(){
      runs(function(){ per.start(true); });

      waits(101);

      runs(function() {
        expect(results.size()).toBe(2);
        per.stop();
      });
    });

    it('should callback three times after a two hundred', function(){
      runs(function() { per.start(true); });

      waits(201);

      runs(function() {
        expect(results.size()).toBe(3);
        per.stop();
      });
    });
  });

  describe('with Date object', function() {
    beforeEach(function(){
      var time = new Date(new Date().getTime() + 100);
      per = new Sked({ start: time, period: 100 }, function(){
        results.touch();
      });
    });

    it('should callback later', function() {
      per.start();
      expect(results.size()).toBe(0);
      expect(per.timeout._idleTimeout).toBe(100);
      per.stop();
    });
  });
});