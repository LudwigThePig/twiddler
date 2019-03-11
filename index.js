$(document).ready(function(){
    //globals
    const $body = $('#body');
    $body.html('');
    let lastUpdate = streams.home.length;
    let update = true;

    const renderTweets= (array)=>{
      $body.html('');
      for (let i = 0; i<array.length; i++){
        const tweet = array[i];
        const $tweet = $('<div></div>');
        const $leftCol = $("<div></div>");
        $leftCol.append(randomSvgGen());
        $leftCol.append(`<span class='user'>@${tweet.user}:</span>`);
        $leftCol.append(`<p class="message">${tweet.message}</p>`);
        $tweet.append($leftCol);
        $tweet.append(`<span class="date">${timeAgo(tweet.created_at)}</span>`);
        $tweet.addClass('tweetDiv');
        $leftCol.addClass('leftCol');
        $tweet.click(()=>{renderUserStream(streams.users[tweet.user])});
        
        $tweet.prependTo($body);
      }
    }

    //Takes the date and returns how long ago that date was
    const timeAgo = (date)=>{
        var seconds = Math.floor((new Date() - date) / 1000);
        var interval = Math.floor(seconds / 31536000);
        if (interval > 1) {
            return interval + " years ago";
        }
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) {
            return interval + " months ago";
        }
        interval = Math.floor(seconds / 86400);
        if (interval > 1) {
            return interval + " days ago";
        }
        interval = Math.floor(seconds / 3600);
        if (interval > 1) {
            return interval + " hours ago";
        }
        interval = Math.floor(seconds / 60);
        if (interval > 1) {
            return interval + " minutes ago";
        }
        return Math.floor(seconds) + " seconds ago";    
    }

    const renderUserStream = (user)=>{
      $body.html('')
      update = false;
      renderTweets(user);
    }

    //event listeners
    $("#updateToggle").click(()=>{ 
      update = !update;
      if (update){
        $("#updateToggle").text("Stop Stream");
      } else {
        $("#updateToggle").text("Start Stream");
      }
      })

    const getNewTweets = (stream)=>{
      let currTweets = streams.home;
      if(currTweets.length > lastUpdate){
        let newTweets = currTweets.slice(lastUpdate);
        renderTweets(currTweets);
        lastUpdate += currTweets.length - lastUpdate;
      }
    }

    //Renders and adds the event listener to the #update section
    const displayUpdate = ()=>{
        let currTweets = streams.home;
        if(currTweets.length > lastUpdate){
            let newTweets = currTweets.slice(lastUpdate);
            if (newTweets.length > 1){
                $("#update").html(`<span class='newTweets'>See ${newTweets.length} new Tweets</span>`)
            } else {
                $("#update").html(`<span class='newTweets'>See ${newTweets.length} new Tweet</span>`)
            }
            $(".newTweets").click(()=>{
              getNewTweets();
              $("#update").html('');
            })
        }
    }

    const randomSvgGen = ()=>{
      const colors = [['#59FAC1','#FFBD5B'],['#FF9508', '#FF0814'],['#102467', '#870730'],['#00FFBF', '#FF0063'],
      ['#FFBD5B', '#59FAC1'], ['#FF0814', '#FF9508'],['#870730', '#102467'],['#FF0063', '#00FFBF']];
      const randomNum = Math.floor(Math.random() * 8);
      const col = {
        background: colors[randomNum][0],
        fill: colors[randomNum][1]
      }  
      const svg = `<svg height="50" width="50" style="background: ${col.background}">
        <circle cx="25" cy="25" r="20" fill="${col.fill}" />
        </svg> `;
      return svg;
    }

    //initial function calls
    renderTweets(streams.home);
    setInterval(()=>{
      if(update === true){
        getNewTweets();
      } else {
        displayUpdate();
      }
    }, 1500);         
  });