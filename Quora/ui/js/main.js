function preloader(){
    document.getElementById('main').style.display="none";
    document.getElementById('preloader').style.display="block";
    setTimeout(function show(){
        document.getElementById('main').style.display="block";
        document.getElementById('preloader').style.display="none";
    }, 2000)
}

function login(){
    if (document.getElementById('email').value === "vishal" && document.getElementById('password').value === 'password'){
        setCookie('loggedin', 'yes');
        document.location.href='/'
    } else{
        document.getElementById('error2').style.display = 'none'
        document.getElementById('error').style.display = 'block'
    }
}

function checkLogin(){
    console.log('checking login...')
    console.log(getCookie('loggedin'))
    if (getCookie('loggedin')===''){
        document.location.href='/login'
    }
    else{
        preloader();
    }
}


function setCookie(cname, cvalue) {
    document.cookie = cname + "=" + cvalue + ";";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}



function trending_stories(stories, location){

htmlTemplate = `<h3 class="panel-heading font-medium bold text-red"><span id="mapheading">Top Stories In `+location+`</span></h3>
    <hr>`;

    for (story in stories) {
        htmlTemplate = htmlTemplate + `
                <div class="post">
      <div class="post-title">`+stories[story]['title']+`</div>
      <div class="post-content left">
        <div class="answer">
          `+stories[story]['text']+`
        </div>
        <div class="date text-grey">Updated `+stories[story]['date']+` &sdot; `+stories[story]['num_views']+` Views</div>
        <div class="row">
          <div class="upvote button left text-white bg-red">
            <a href="" >Upvote | `+stories[story]['num_upvotes']+`</a>
          </div>
          <div class="comments button left text-grey bg-white">
            <a href="" >Comments (`+stories[story]['num_comments']+`+)</a>
          </div>
          <div class="downvote button left text-grey bg-white">
            <a href="" >Downvote</a>
          </div>
          <div class="social-share left listgroup text-grey">
            <div class="icon-wrapper"><i class="fa fa-facebook custom-icon"><span class="fix-editor">&nbsp;</span></i></div>
            <div class="icon-wrapper"><i class="fa fa-twitter custom-icon"><span class="fix-editor">&nbsp;</span></i></div>
            <div class="icon-wrapper"><i class="fa fa-share custom-icon"><span class="fix-editor">&nbsp;</span></i></div>
          </div>
          <hr class="clear hide">
        </div>
      </div>
      <hr class="clear hide">
    </div>
            `;
      }

            htmlTemplate = htmlTemplate + `</div>
  </div>
</div>
`;

      $('.centre-panel').html(htmlTemplate);

}