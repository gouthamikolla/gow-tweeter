/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(() => {

  const loadTweetsURL = "http://localhost:8080/tweets";
  /**
   * Entered tweet is converted to HTML and returned.
   * @param {String} str
   * @returns HTML
   */
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  /**
   * THis method takes tweet object and returns String literal by rendering tweet element into HTML.
   * @param {Object} data
   * @returns
   */
  const createTweetElement = function(data) {
    const tweet = `
  <article class="article">
  <header class="tweet-header">
    <div class="tweet-profile-pic">
      <img src="${data.user.avatars}">
      <span>${data.user.name}</span>
    </div>
    <div class="watemark">
      ${data.user.handle}
    </div>
  </header>
    <div>
    <p>${escape(data.content.text)}</p>
    </div>
    <div class="divider">
    </div>
  <footer class="tweet-footer">
    <div>
      ${timeago.format(data.created_at)}
    </div>
    <div>
      <i class="fa-solid fa-flag"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-solid fa-heart"></i>
    </div>
  </footer>
</article>`;

    return tweet;
  };
  /**
 * This method takes error and renders that into a div element to display.
 * @param {String} data
 * @returns
 */
  const createErrorElement = function(data) {
    const errorElement = `
    <div class="error-message" id="error-message">
    <span class="error-text"> ${data}</span>
    </div>`;

    return errorElement;
  };

  /**
   *  This method takes array of tweets and renders them and appends to tweet-container element.
   * @param {Array} arr
   */
  const renderTweets = function(arr) {
    $("#tweet-container").empty();
    for (let tweet of arr) {
      $("#tweet-container").prepend(createTweetElement(tweet));
    }
  };

  /**
   *  This method takes String tweet and validates and returns object based on that.
   * @param {String} tweet
   * @returns {Object}
   */
  const validateForm = function(tweet) {
    if (!tweet) {
      return { error: "Please enter valid tweet.", data: null };
    }
    if (tweet && tweet.length > 140) {
      return {
        error: "Tweet is too long. Please reduce no of chars to 140.",
        data: null,
      };
    }
    return { error: null, data: null };
  };

  /**
   * This methods takes string URL and sends "GET" request to load all data and renders them.
   * @param {String} url
   */
  const loadTweets = function(url) {
    $.get(url, { dataType: "json" }).then(renderTweets);
  };

  /**
   * This method executed upon success of saving tweet and then loads them again.
   */
  const onSuccess = function() {
    loadTweets(loadTweetsURL);
  };

  /**
   * This method send POST request when users clicks on 'Submit' button to save tweet.
   */
  $("#post-tweet").submit(function(event) {
    event.preventDefault();
    $("#error-message").remove();
    $("#counter").removeClass("over-limit");
    const url = `${event.target.action}/`;
    const tweet = $("#tweet-text").val();
    const { error, data } = validateForm(tweet);
    if (!error && !data) {
      $.post(url, $("#tweet-text").serialize()).then(onSuccess);
      $("#tweet-text").val("");
      $("#counter").val(140);
    } else {
      $("#tweet-text").val("");
      $("#counter").val(140);
      $("#tweet-input").prepend(createErrorElement(error));
      $("#error-message").slideDown(1000);
    }
  });
  loadTweets(loadTweetsURL);
});
