module.exports = function (app) {

  var ProcessImage = {

    addMask: function (id, original, mask, callback) {

      var Jimp = require("jimp");

      var imageLocation;

      Jimp.read(original, function (err, origImg) {
        if (err) throw err;
        Jimp.read(mask, function (err, maskImg) {
          if (err) throw err;
          imageLocation = 'resources/Images/'+ id +'.jpg';
          origImg.composite(maskImg.resize(800, 800).opacity(0.35),0,0).write(imageLocation);
        });
      });
      callback();
    }
  }
  return ProcessImage;
}
