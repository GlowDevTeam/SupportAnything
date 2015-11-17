var Jimp = require("jimp");

module.exports = function (app) {

  var ProcessImage = {

    addMask: function (id, original, mask, callback) {
      console.log('addMask entrou');
      var imageLocation;

      Jimp.read(original, function (err, origImg) {
        if (err) throw err;
        Jimp.read(mask, function (err, maskImg) {
          if (err) throw err;
          imageLocation = 'resources/Images/'+ id +'.jpg';
          //origImg.resize(768, 768).composite(maskImg.resize(768, 768).opacity(0.35),0,0).write(imageLocation);
          origImg.resize(768, 768).composite(maskImg.resize(768, 768).opacity(0.35),0,0)
            .getBuffer( Jimp.MIME_JPEG, callback);
        });
      });
    }
  }
  return ProcessImage;
}
