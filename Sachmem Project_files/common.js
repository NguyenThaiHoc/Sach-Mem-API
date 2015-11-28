$(document).ready(function(){
  var bottomBar = "";
  // left bar
    bottomBar = '<li class="pull-left back" data-toggle="tooltip" title="Bài trước">'
    +  '<a href="{{input.bottomBar.preButton}}">'
    +    '<i class="fa fa-chevron-left"></i>'
    +  '</a>'
    + '</li>'
    + '<li class="pull-left back" data-toggle="tooltip" title="Thông tin sách">'
    +  '<a href="{{input.bottomBar.preButton}}">'
    +     '<i class="fa fa-info"></i>'
    +   '</a>'
    + '</li>'
    + '<li class="pull-left back" data-toggle="tooltip" title="bookMap">'
    +   '<a href="{{input.bottomBar.bookMap}}">'
    +     '<i class="fa fa-sitemap"></i>'
    +   '</a>'
    + '</li>'
    // <!-- end left bar -->

    // <!-- right bar -->
    + '<li class="pull-right forward" data-toggle="tooltip" title="Bài tiếp theo">'
    +   '<a href="{{input.bottomBar.nextButton}}">'
    +     '<i class="fa fa-chevron-right"></i>'
    +   '</a>'
    + '</li>'
    + '<li class="pull-right forward" data-toggle="tooltip" title="Từ điển">'
    +   '<a href="{{input.bottomBar.glossary}}">'
    +     '<i class="fa fa-book"></i>'
    +   '</a>'
    + '</li>'
    + '<li class="pull-right forward" data-toggle="tooltip" title="Trợ giúp">'
    +   '<a href="{{input.bottomBar.nextButton}}">'
    +     '<i class="fa fa-question-circle"></i>'
    +   '</a>'
    + '</li>';

        // <!-- end right bar -->
  $("#interact-container").append(bottomBar);

  $('[data-toggle="tooltip"]').tooltip();   
});
