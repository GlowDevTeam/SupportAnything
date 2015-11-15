 module.exports = function (app) {

    var ProcessImage = {

        addMask: function (original, mask) {
        
        var Jimp = require("jimp");

        
        Jimp.read(original, function (err, origImg) {
          if (err) throw err;
          origImg = origImg.resize(256, 256);

           Jimp.read(original, function (err, maskImg) {
              if (err) throw err;
              Jimp.read(mask, function (err, maskImg) {
               if (err) throw err;
               
               maskImg = maskImg.resize(256, 256).opacity(0.5)
               
               origImg.composite(maskImg,0,0).write('resources/Images/result.jpg');
              });
            });
         });
        
        
        }
    }
    
    return ProcessImage;
}