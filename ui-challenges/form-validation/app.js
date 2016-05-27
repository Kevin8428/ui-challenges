$.fn.extend({

});

$(function(){
  var allModals = $('.wrapper').find('.modal');
  $('#modal-back').on('click', function() {
    allModals.addClass('show');
    console.log(allModals);
  });
  $('#modal-personal-info').on('click', function() {
  });
  $('#modal-travel-info').on('click', function() {
  });
});
