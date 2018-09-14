
(function () {
  var DOM = function DOM(elements){
    if(!(this instanceof DOM)){
      return new DOM(elements);
    }

    this.element = document.querySelectorAll(elements);
  }

  DOM.isSomething = function isSomething(type, item){
    return Object.prototype.toString.call(item) === '[object ' + type + ']';
  }

  DOM.isArray = function isArray(item) {
    return DOM.isSomething('Array', item);
  };

  DOM.isFunction = function isFunction(item) {
    return DOM.isSomething('Function', item);
  };

  DOM.isNumber = function isNumber(item) {
    return DOM.isSomething('Number', item);
  };

  DOM.isString = function isString(item) {
    return DOM.isSomething('String', item);
  };

  DOM.isNull = function isNull(item) {
    return DOM.isSomething('Null', item) || isSomething('Undefined', item);
  };

  DOM.clearChildNodes = function clearChildNodes(node) {
    while(node.firstChild) {
      node.removeChild(node.firstChild);
    }
  };

  DOM.prototype.getFirst = function getFirst(){
    return this.element.length > 0 ? this.element[0] : null;
  }

  DOM.prototype.forEach = function forEach() {
    Array.prototype.forEach.apply(this.element, arguments);
  };

  DOM.prototype.filter = function filter() {
    return Array.prototype.filter.apply(this.element, arguments);
  };

  DOM.prototype.map = function map() {
    return Array.prototype.map.apply(this.element, arguments);
  };

  DOM.prototype.reduce = function reduce() {
    return Array.prototype.reduce.apply(this.element, arguments);
  };

  DOM.prototype.reduceRight = function reduceRight() {
    return Array.prototype.reduceRight.apply(this.element, arguments);
  };

  DOM.prototype.every = function every() {
    return Array.prototype.every.apply(this.element, arguments);
  };

  DOM.prototype.some = function some() {
    return Array.prototype.some.apply(this.element, arguments);
  };

  DOM.prototype.get = function get() { return this.element; };

  DOM.prototype.on = function on(event, callback) {
    Array.prototype.forEach.call(this.element,
      function(item) {
        item.addEventListener(event, callback, false);
      });
  };

  DOM.prototype.off = function off(event, callback) {
    Array.prototype.forEach.call(this.element,
      function(item) {
        item.removeEventListener(event, callback);
      });
  };

  window.DOM = DOM;

})(window, document);
