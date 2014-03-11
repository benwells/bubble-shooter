function ObjectBase(opts){

}

ObjectBase.prototype.setOpts = function(opts) {
  for (var prop in opts) {
    console.log('prop', prop, 'val', opts[prop]);
    this[prop] = opts[prop];
  }
};
