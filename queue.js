function Queue(){
  this.elements = [];
}

Queue.prototype.add = function(e) {
  this.elements.push(e);
}

Queue.prototype.dequeue = function () {
    return this.elements.shift();
};

Queue.prototype.isEmpty = function () {
    return this.elements.length == 0;
};

Queue.prototype.peek = function () {
    return !this.isEmpty() ? this.elements[0] : undefined;
};