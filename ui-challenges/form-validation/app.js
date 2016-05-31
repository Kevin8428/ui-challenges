$.fn.extend({

  formError: function() {

    return this.each(function() {
      var $el = (this.nodeName === "SELECT") ? $(this).parent() : $(this),
          hasError = true;

      $el.on('blank', function(ev, msg) {
        hasError = true;
        msg = 'need to input value';
        $el.removeClass('error valid blank').addClass('blank');
      });
      $el.on('invalid', function(ev, msg) {
        hasError = true;
        msg = 'invlaid format';
        $el.removeClass('error valid blank').addClass('error');
      });
      $el.on('success', function(ev, msg) {
        hasError = false;
        $el.removeClass('error valid blank').addClass('valid');
      });
    });
  },
  validate: function() {
    var regex = {
      email: "[\\w!#$%&'*+/=?^_`{|}~-]+(?:\\.[\\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\\w](?:[\\w-]*[\\w])?\\.)+[a-zA-Z0-9](?:[\\w-]*[\\w])?",
      date: "\\d{1,2}/\\d{1,2}/\\d{4}",
      phone: "\\(\\d{3}\\)\\s?\\d{3}-\\d{4}"
    },
    $inputs = $(this).find(':input').not(':button').filter(':visible'),
    isValid = true;

    $inputs.each(function(i, el) {
      var validateField = $(this).data('validate');
      if($(this).val() === '') {
          console.log(validateField + ' is blank');
          isValid = false;
          $(el).trigger('blank');
      }
      else if((validateField) && (typeof regex[validateField] !== 'undefined') && (new RegExp(regex[validateField]).test($(this).val())===false)) {
        console.log(validateField + ' format is wrong');
        $(this).addClass('error');
        isValid = false;
        $(el).trigger('invalid');
      }
      else {
        isvalid = true;
        $(el).trigger('success');
      }
    });
    return isValid
  },
  closeModal: function() {
    $(this).closest('.show').removeClass('show').addClass('hide');
    $(this).closest('.modal-popup').removeClass('modal-popup');
  }
});

$(function(){
  //apply error handling to modal fields
  $('input, select').not(':button').not('[type=hidden]').formError();

  //display modal when clicking anchors
  $('#modal-personal-info').on('click', function() {
    $('.modal-popup').removeClass('modal-popup');
    $('.personal-info-container').addClass('modal-popup');
    $('.modal-wrapper .modal').removeClass('show').addClass('hide');
    $('.personal-info-modal').addClass('show').removeClass('hide').scrollTop();
  });
  $('#modal-travel-info').on('click', function() {
    $('.modal-popup').removeClass('modal-popup');
    $('.travel-info-container').addClass('modal-popup');
    $('.modal-wrapper .modal').removeClass('show').addClass('hide');
    $('.travel-info-modal').addClass('show').removeClass('hide').scrollTop();
  });
  $('#modal-work-info').on('click', function() {
    $('.modal-popup').removeClass('modal-popup');
    $('.job-info-container').addClass('modal-popup');
    $('.modal-wrapper .modal').removeClass('show').addClass('hide');
    $('.job-info-modal').addClass('show').removeClass('hide').scrollTop();
  });
  $('#modal-back').on('click', function() {
    $('.modal-wrapper .modal').removeClass('show').addClass('hide');
  });

  //validate form when clicking submit
  $('#personal-info-form, #travel-info-form, #job-info-form').on('submit', function(ev){
    ev.preventDefault();
    if($(this).validate()) {
      console.log('all fields are valid');
    }
    else {
      console.log('NOT ALL VALID FIELDS');
    }
  })

  //close modal
  $('.modal-close').on('click', function() {
    $(this).closeModal()
  });
});
