function importJSON(template, input, level, path) {
  var html = '<div>';
  var keys;
  if(template.constructor === Array)
    keys = Object.keys(input);
  else
    keys = Object.keys(template);
  console.log(keys);
  var divide = level == 0 ? "" : "";
  var input_child;
  var template_child;

  for (var i = 0; i < level; i++) divide += '&nbsp;' + '&nbsp;';
  divide += level != 0 ? '|__' : '';

  for (var i in keys) {
    input_child = input[keys[i]];

    if (template.constructor === Array) {
      template_child = template[0];
    } else {
      template_child = template[keys[i]];
    }
    if (typeof(input_child) == 'object') {
      html += divide + keys[i] + ': ' 
      if(input_child.constructor !== Array) {
        html += '<span class="delete" style="color:red" data-path = ' + path + keys[i] + '>-remove </span>' + path + keys[i]; 
        html += importJSON(template_child, input_child, level+1, path + keys[i] + '/');
      } else {
        html += importJSON(template_child, input_child, level+1, path + keys[i] + '/');
      }
    } else {
      if (input_child === undefined) 
        input_child = '';
      html += 
        '<div>' +
          divide + keys[i] + ': ' + "<input class='update-json-exercise' data-path='" + path + keys[i] + "'type='text' value=\"" + input_child + "\"/>" +
        '</div>';
    }
  }

  if (template.constructor === Array) {
    html += '<div class="change-addmore" data-path="' + path + '" style="color:green">' +
             divide + 'add more' + '</div>';
  }

  html += '</div>';

  return html;
}

$(document).on('click', '.change-addmore', function(){
  var path = $(this).attr('data-path');
  var val = $(this).val();
  console.log(this); 
  
  updateAddMore(path, val);
});

$(document).on('change', '.update-json-exercise', function(){
  var path = $(this).attr('data-path');
  var val = $(this).val();
  update(path, val);
  $('#view_container').html(exercise.view());
});

$(document).on('click', '.delete', function(){
  var path = $(this).attr('data-path');
  removeElement(path);
});

function removeElement(path){
  var paths = path.split('/');
  var text = EXERCISE;
  for(var i = 0; i < paths.length; i++){
    if(i < paths.length - 1) {
      text = text[paths[i]];
    } else {
      text.splice(paths[i], 1);
      // text.push(text[0])
      $('#importJSON').html(importJSON(TEMPLATE, EXERCISE, 0, ''));
      $('#view_container').html(exercise.view());
    }
  }
  
  $('#content_save').val(JSON.stringify(EXERCISE));

}

function updateAddMore(path){
  // console.log(path);
  var paths = path.split('/');
  var template = TEMPLATE;
  var input = EXERCISE;
  for(var i = 0; i < paths.length; i++){
    if(i < paths.length - 1) {
      input = input[paths[i]];
      if (template.constructor === Array) {
        template = template[0];
      } else {
        template = template[paths[i]];
      }
    } else {
      input.push(jQuery.extend(true, {}, template[0]));
      $('#importJSON').html(importJSON(TEMPLATE, EXERCISE, 0, ''));
      $('#view_container').html(exercise.view());
    }
  }

  $('#content_save').val(JSON.stringify(EXERCISE));
}

function update(path, val) {
  var paths = path.split('/');
  var text = EXERCISE;
  for(var i = 0; i < paths.length; i++){
    if(i < paths.length - 1) {
      text = text[paths[i]];
    } else {
      text[paths[i]] = val;
      
    }
  }
  $('#content_save').val(JSON.stringify(EXERCISE));
}

$('.module-add-more-json').click(function() {
  
});