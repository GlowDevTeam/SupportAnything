var gm = require('gm')
  , im = gm.subClass({ imageMagick: true });
var exec = require('child_process').exec

module.exports = function (app) {

  var ProcessImage = {

    addMask: function (id, original, mask, callback) {

      var imageLocation = 'resources/Images/'+ id +'.jpg';

      im(original)
  	  .out(mask)
  	  .out('-alpha','on')
  	  .out('-compose','dissolve')
  		.out('-define','compose:args=50')
  		.out('-composite')
  		.write(imageLocation, function (err) {
		  if (err) console.log(err);
        callback(id)
  		});
    }
  }
  return ProcessImage;
}
