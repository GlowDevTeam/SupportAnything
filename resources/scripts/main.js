$.noConflict();
(function($){
  $(document).ready(function() {

    $('.support-row img').click(function(){
      var myimage = $(this);
      var imagemask = myimage.attr('src');

      $.ajax({
        url: 'run',
        type: 'POST',
        data: JSON.stringify({ mask: imagemask }) ,
        contentType: 'application/json; charset=utf-8',
        beforeSend: function() {
          $('.result img').attr({
            'src': '/Images/load.gif',
            'style': 'opacity: 0.8'
          });
        },
        success: function(result){
          $('.result img').attr({
            'src': '/Images/' + result + '.jpg?t='+ Date.now(),
            'style': ''
          });
        }
      });

    });

  });
})(jQuery);
