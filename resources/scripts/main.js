$.noConflict();
(function($){
  $(document).ready(function() {

    $('.support-row img').click(function(){
      var myimage = $(this);
      var imagemask = myimage.attr('src');

      var allimages = $('.support-row img');
      if (allimages.data("executing")) return;

      $.ajax({
        url: 'run',
        type: 'POST',
        data: JSON.stringify({ mask: imagemask }) ,
        contentType: 'application/json; charset=utf-8',
        beforeSend: function() {
          allimages
            .data("executing", true)
            .attr('style', 'cursor:wait');

          $('.result img').attr({
            'src': '/Images/load.gif',
            'style': 'opacity: 0.8'
          });
        },
        success: function(result){
          allimages
            .removeData("executing")
            .attr('style', 'cursor:pointer');
          $('.result img').attr({
            'src': '/Images/' + result + '.jpg?t='+ Date.now(),
            'style': ''
          });
        }
      });

    });

    function applyMask () {

    }

  });
})(jQuery);
