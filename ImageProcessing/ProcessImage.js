var Jimp = require('jimp')
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

      Jimp.read(original).then(function (origImg) {
        Jimp.read(mask).then(function (maskImg) {
          origImg
            .resize(768, 768)
            .composite(maskImg.resize(768, 768).opacity(0.35),0,0)
            .write(resultProfilePicture, callback(id+'2')
          );
        });
      });
    }
  }
  return ProcessImage;
}
