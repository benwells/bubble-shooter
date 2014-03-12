function ObjectBase(opts){

}

ObjectBase.prototype.setOpts = function(opts) {
  for (var prop in opts) {
    this[prop] = opts[prop];
  }
};
