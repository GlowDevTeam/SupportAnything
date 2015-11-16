 module.exports = function (app) {

    var ProcessImage = {

        addMask: function (id, original, mask) {

        var Jimp = require("jimp");


        Jimp.read(original, function (err, origImg) {
          if (err) throw err;
          origImg = origImg.resize(768, 768);

           Jimp.read(original, function (err, maskImg) {
              if (err) throw err;
              Jimp.read(mask, function (err, maskImg) {
               if (err) throw err;

               maskImg = maskImg.resize(768, 768).opacity(0.35)

               origImg.composite(maskImg,0,0).write('resources/Images/'+ id +'.jpg');
              });
            });
         });


        }
    }

    return ProcessImage;
}
