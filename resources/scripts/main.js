$.noConflict();
(function($){
  $(document).ready(function() {

    $('.support-row img').click(function(){
      var myimage = $(this);
      var imagemask = myimage.attr('src');

      $.ajax({
        async: 'false',
        url: 'run',
        type: 'POST',
        data: JSON.stringify({ mask: imagemask }) ,
        contentType: 'application/json; charset=utf-8',
        success: function(result){
          $('.result img').attr('src', 'data(' + result + ')');
        }
      });

    });

  });
})(jQuery);
