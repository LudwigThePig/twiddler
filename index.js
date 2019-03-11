$(document).ready(function(){
    //globals
    const $body = $('#body');
    $body.html('');
    let lastUpdate = streams.home.length;
    let update = true;
    let activeUser = '';

    //This creates a random SVG for the user's profile picture
    const randomSvgGen = ()=>{
      const colors = [['#59FAC1','#FFBD5B'],['#FF9508', '#FF0814'],['#102467', '#870730'],['#00FFBF', '#FF0063'],['#FFBD5B', '#59FAC1'], ['#FF0814', '#FF9508'],['#870730', '#102467'],['#FF0063', '#00FFBF']];
      const randomNum = Math.floor(Math.random() * 8);
      const col = {
        background: colors[randomNum][0],
        fill: colors[randomNum][1]
      }  
      return `<svg height="50" width="50" style="background: ${col.background}">
        <circle cx="25" cy="25" r="20" fill="${col.fill}" />
        </svg> `;
    }
    //this assigns a randomSVG to the user object
    Object.keys(streams.users).forEach( i => {
      streams.users[i].svg = randomSvgGen();
    })

    const renderTweets= (array)=>{
      for (let i = 0; i<array.length; i++){
        const tweet = array[i];
        const user = array[i].user;
        const $tweet = $('<div></div>');
        const $leftCol = $("<div></div>");
        $leftCol.append(streams.users[user].svg);
        $leftCol.append(`<span class='user'>@${tweet.user}:</span>`);
        $leftCol.append(`<p class="message">${tweet.message}</p>`);
        $tweet.append($leftCol);
        $tweet.append(`<span class="date">${timeAgo(tweet.created_at)}</span>`);
        $tweet.addClass('tweetDiv');
        $leftCol.addClass('leftCol');
        $tweet.click(()=>{renderUserStream(tweet.user)});
        
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
      $body.html('');
      activeUser = user;
      renderTweets(streams.users[activeUser]);
    }

    const getNewTweets = ()=>{
      let currTweets = streams.home;
      if(currTweets.length > lastUpdate){
        let newTweets = currTweets.slice(lastUpdate);
        if (activeUser === ''){
          renderTweets(newTweets);
        } else {
          newUserStream = newTweets.filter(x => x.activeUser);
          renderTweets(newUserStream);
        }
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

    //event listeners
    $("#updateToggle").click(()=>{ 
      update = !update;
      if (update){
        $("#updateToggle").text("Stop Stream");
      } else {
        $("#updateToggle").text("Start Stream");
      }
      })

    //initial function calls
    renderTweets(streams.home);
    setInterval(()=>{
      if(update === true && activeUser === ''){
        getNewTweets();
      } else if (activeUser !== ''){
        if (update === true){
          $body.html('');
          renderTweets(streams.users[activeUser]);
        }
      } else {
        displayUpdate();
      }
    }, 1500);         
  });