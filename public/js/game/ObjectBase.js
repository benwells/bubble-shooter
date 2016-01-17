/**
* Parent object containing method shared across all other objects
*/
function ObjectBase(opts){

}

ObjectBase.prototype.setOpts = function(opts) {
  for (var prop in opts) {
    this[prop] = opts[prop];
  }
};
