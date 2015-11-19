var gm = require('gm')
  , im = gm.subClass({ imageMagick: true })
  , fs = require('fs')
  , request = require('request');

module.exports = function (app) {

  var ProcessImage = {
    saveProfilePicture: function(id, original, callback) {

      var local = 'resources/Images/'+ id + '.jpg';

      request(original, {encoding: 'binary'}, function(err, response, body) {
        if (err) console.log(err);
        fs.writeFile(local, body, 'binary', function (err) {
          if (err) console.log(err);
          else callback(id);
        });
      });
    },

    addMask: function (id, original, mask, callback) {

      var resultProfilePicture = 'resources/Images/'+ id +'2.jpg';

      im(original)
  	  .out(mask)
  	  .out('-resize','640x640')
  	  .out('-alpha','on')
  	  .out('-compose','dissolve')
  		.out('-define','compose:args=50')
  		.out('-composite')
  		.write(resultProfilePicture, function (err) {
	      if (err) console.log(err);
        else callback(id+'2');
  		});
    }
  }
  return ProcessImage;
}
