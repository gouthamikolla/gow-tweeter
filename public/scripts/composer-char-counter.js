
$(document).ready(function() {

  const maxchars = 140;
  const $tweetText = $("#tweet-text");
  $tweetText.keyup(function() {
    const $counter = $(this).closest(".new-tweet").find(".counter");
    const $curval =  $(this).val().length;
    $counter.text(maxchars - $curval);
    if ($counter.val() < 0) {
      $counter.addClass('over-limit');
    } else {
      $counter.removeClass('over-limit');
    }
  });
});
