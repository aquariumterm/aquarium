String.prototype.removeAt = function(index) {
  return this.slice(0, index) + this.slice(index + 1);
}