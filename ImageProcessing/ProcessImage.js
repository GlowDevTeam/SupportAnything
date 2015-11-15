 module.exports = function (app) {

    var ProcessImage = {

        addMask: function (original, mask) {
        
        var Jimp = require("jimp");

        Jimp.read(original, function (err, lenna) {
          if (err) throw err;
          lenna.resize(256, 256)       
          .quality(60)                 
          .greyscale()                 
          .write("resources/Images/guy_bw.jpg"); 
         });
        
        
        }
    }
    
    return ProcessImage;
}