var Jimp = require("jimp");

module.exports = function (app) {

  var ProcessImage = {

    addMask: function (id, original, mask, callback) {
      console.log('addMask entrou');
      var imageLocation;

      Jimp.read(original).then(function (origImg) {
        Jimp.read(mask).then(function (maskImg) {
          imageLocation = 'resources/Images/'+ id +'.jpg';
          origImg.resize(768, 768).composite(maskImg.resize(768, 768).opacity(0.35),0,0).write(imageLocation, callback(id));
        });
      });
    }
  }
  return ProcessImage;
}
