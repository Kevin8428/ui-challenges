$.fn.extend({
  setInitialImage: function(){
    var allImages = $('.image-container').find('img'),
        img = allImages.eq(0),
        quote = img.data('quote'),
        source = img.data('quote-source'),
        leftBtn = $('.toggle-left'),
        rightBtn = $('.toggle-right'),
        currentImage = 0;

    getPosition = function(x) {
      if(currentImage + x == -1){
        currentImage = 2;
      }
      else if(currentImage + x == 3){
        currentImage = 0;
      }
      else {
        currentImage = currentImage + x;
      }
    },
    render = function() {
      var currentquote = allImages.eq(currentImage).data('quote');
      $('p').html(currentquote);
      allImages.removeClass('selected img-hide').addClass('img-hide').eq(currentImage).addClass('selected').removeClass('img-hide');
    },
    moveLeft = function() {
      getPosition(-1);
      render();
    },
    moveRight = function() {
      getPosition(1);
      render();
    };
    return $(this).each(function() {
      rightBtn.on('click', moveRight.bind(this));
      leftBtn.on('click', moveLeft.bind(this));
    });
  }
});

$(function(){
  $('.carousel-container').setInitialImage();
});
