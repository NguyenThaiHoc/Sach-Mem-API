function UtilityTextAutoFit(selector) {
  if ($('#text_autofit').length == 0) {
    $("body").append(
      "<div id='text_autofit' style='position:absolute; visibility:hidden;\
            height:auto; width:auto; white-space:nowrap; top:0px; left:0px;'>\
      </div>"
    );
  }
  var measure = $('#text_autofit');
  $(selector).each(function() {
    var dom = $(this);
    var font_size = parseFloat(dom.css("font-size"));
    measure.html(dom.text());
    measure.css("font-size", dom.css("font-size"));
    measure.css("font-family", dom.css("font-family"));
    measure.css("font-weight", dom.css("font-weight"));
    while (measure.width() >= dom.width()) {
      font_size -= 0.1;
      dom.css("font-size", font_size + "px");
      measure.css("font-size", font_size + "px");
    }
  })
}

function UtilityPlayAudio(selector) {
  var audio_id = $(selector).data('audio-src').replace(/[^\w]/g, '');
  if ($('#' + audio_id).length == 0) {
    $("body").append(
      "<audio id='" + audio_id + "'>\
        <source src='" + $(selector).data('audio-src') + "' type='audio/mpeg'>\
      </audio>"
    );
  }
  var begin = $(selector).data('audio-begin');
  var end = $(selector).data('audio-end');
  if (begin === undefined) begin = 0;
  $(selector).click(function() {
    if (!$('#' + audio_id).prop("paused")) return;
    $('#' + audio_id).prop("currentTime", begin);
    $('#' + audio_id).trigger('play');
    if (end !== undefined) {
      setTimeout(function() {
        $('#' + audio_id).trigger('pause');
      }, (end - begin) * 1000);
    }
  });
}

function UtilityRadio(selector) {
  this.enableEffect = function() {
    $(selector).removeClass("active");
    $(selector).removeClass("correct");
    $(selector).removeClass("wrong");
    $(selector).click(function() {
      $("#sound_effect_click").trigger('play');
      $(selector).removeClass("active");
      $(this).addClass("active");
    });
  }
  this.disableEffect = function() {
    $(selector).unbind();
  }
  this.letCheck = function() {
    if ($(selector + ".active").data('key')) {
      $(selector + ".active").addClass("correct");
      return true;
    } else {
      $(selector + ".active").addClass("wrong");
      return false;
    }
  }
}

function UtilityCheckbox(selector) {
  this.enableEffect = function() {
    $(selector).removeClass("active");
    $(selector).removeClass("correct");
    $(selector).removeClass("wrong");
    $(selector).unbind();
    $(selector).click(function() {
      $("#sound_effect_click").trigger('play');      
      $(this).toggleClass("active");
    })
  }
  this.disableEffect = function() {
    $(selector).unbind();
  }
  this.letCheck = function() {
    var result = [];
    $(selector).each(function() {
      if ($(this).hasClass("active") == Boolean($(this).data('key'))) {
        $(this).addClass("correct");
        result.push(true);
      } else {
        $(this).addClass("wrong");
        result.push(false);
      }
    })
    return result;
  }
}

function UtilityTyping(selector) {
  var minWidth = 100;
  var maxWidth = 300;
  UtilityTextAutoFit(selector);
  if ($(selector).data('min-width') !== undefined) {
    minWidth = $(selector).data('min-width');
  }
  if ($(selector).data('max-width') !== undefined) {
    maxWidth = $(selector).data('max-width');
  }

  this.enableEffect = function() {
    $(selector).prop('disabled', false);
    $(selector).removeClass("correct");
    $(selector).removeClass("wrong");
    $(selector).val('');
    $(selector).css({width: minWidth});
    $(selector).keyup(function() {
      $('#text_autofit').html($(this).val());
      var width = $('#text_autofit').width() + 20;
      if (width < minWidth) width = minWidth;
      if (width > maxWidth) width = maxWidth;
      $(this).css({width: width});
    })
  }
  this.disableEffect = function() {
    $(selector).unbind();
    $(selector).prop('disabled', true);
  }
  this.letCheck = function() {
    var result = [];
    $(selector).each(function() {
      var key = $(this).data('key').split("+");
      for(var i = 0; i < key.length; i++) {
        key[i] = key[i].split("/");
        for(var j = 0; j < key[i].length; j++) 
          key[i][j] = key[i][j].replace(/[^\w\d\s]/g,'').replace(/\s+/g,' ').trim();
        key[i] = "(" + key[i].join("|") + ")"
      }
      key = new RegExp("^" + key.join(" ") + "$", "i");
      if (key.test($(this).val().replace(/[^\w\d\s]/g,'').replace(/\s+/g,' ').trim())) {
        result.push(true);
        $(this).addClass("correct");
      } else {
        result.push(false);
        $(this).addClass("wrong");
      }
    })
    return result;
  }
}

function UtilityActiveSoundEffect() {
  if ($('#sound_effect').length > 0) return;
  $("body").append(
    "<div id='sound_effect'>\
      <audio id='sound_effect_click'>\
        <source src='../audios/sound_effect/click.mp3' type='audio/mpeg'>\
      </audio>\
      <audio id='sound_effect_drag'>\
        <source src='../audios/sound_effect/drag.mp3' type='audio/mpeg'>\
      </audio>\
      <audio id='sound_effect_drop'>\
        <source src='../audios/sound_effect/drop.mp3' type='audio/mpeg'>\
      </audio>\
      <audio id='sound_effect_correct'>\
        <source src='../audios/sound_effect/correct.mp3' type='audio/mpeg'>\
      </audio>\
      <audio id='sound_effect_wrong'>\
        <source src='../audios/sound_effect/wrong.mp3' type='audio/mpeg'>\
      </audio>\
      <audio id='sound_effect_good'>\
        <source src='../audios/sound_effect/good.mp3' type='audio/mpeg'>\
      </audio>\
      <audio id='sound_effect_average'>\
        <source src='../audios/sound_effect/average.mp3' type='audio/mpeg'>\
      </audio>\
      <audio id='sound_effect_bad'>\
        <source src='../audios/sound_effect/bad.mp3' type='audio/mpeg'>\
      </audio>\
    </div>"
  );
}

function UtilityShuffleArray() {
  var key;
  this.encode = function(origin_array) {
    key = [];
    var array = origin_array.slice(), temp, j;
    for (var i = array.length - 1; i >= 0; i--) {
      j = Math.floor(Math.random() * i);
      key.push(j);
      temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }
  this.decode = function(shuffled_array) {
    var array = shuffled_array.slice(), temp, j;
    for (var i = 0; i < array.length; i++) {
      j = key[array.length - i - 1];
      temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }
}


function UtilityDragDrop(drag, drop, container) {
  var installed = false;

  this.startThis = function(event, ui) {
    $(this).draggable('option', 'revert', true);
    $("#sound_effect_drag").trigger('play');
  }

  this.stopDrag = function(event, ui) {
    $("#sound_effect_drop").trigger('play');
  }

  this.dropThis = function(event, ui) {
    $(this).draggable('option', 'revert', true);
    $(this).animate({top: 0, left: 0}, 500);
    ui.draggable.draggable('option', 'revert', true)
  }

  this.handleDrop = function(event, ui) {
    var slotKey = $(this).attr("data-key");
    var cardKey = $(ui.draggable.context).attr("data-answer");

    ui.draggable.position({of: $(this), my: 'left top', at: 'left top'});
    ui.draggable.draggable('option', 'revert', false);

    if (slotKey == cardKey) {
      $(this).data('result', 'correct');
    } else {
      $(this).data('result', 'wrong');
    }
    //$(ui.draggable.context).data("answer", slotKey);
  }

  this.enableEffect = function() {
    $(drop).removeClass('ui-droppable');
    $(drop).removeClass('correct');
    $(drop).removeClass('wrong');
    $(drop).data('result', '');
    $(drag).removeClass('ui-draggable');
    $(drag).removeClass('ui-droppable');
    $(drag).attr('style', 'position:relative;');

    if (!installed) {
      $(drag).draggable({
        containment: container,
        stack: drag,
        revert: true,
        start: this.startThis,
        stop: this.stopDrag
      }).droppable({
        accept: drag,
        hoverClass: 'hovered',
        drop: this.dropThis
      });
      $(drop).droppable({
        accept: drag,
        hoverClass: 'hovered',
        drop: this.handleDrop
      });
      installed = true;
    } else {
      $(drag).draggable('enable');
    }
  }

  this.disableEffect = function() {
    $(drag).draggable('disable');
  }

  this.letCheck = function() {
    var result = [];
    $(drop).each(function() {
      if ($(this).data('result') == 'correct') {
        $(this).addClass('correct');
        result.push(true);
      } else {
        $(this).addClass('wrong');
        result.push(false);
      }
    });
    return result;
  }
}
