(function() {

  var output = document.querySelector('#output'),
    input = document.querySelector('#input'),
    button = document.querySelector('#button'),
    avatar = document.querySelector('#avatar'),
    presence = document.querySelector('#presence'),
    current = document.querySelector('#current'),
    random = document.querySelector('#random');


  var channel = '';
  var dir = '';

  var p = PUBNUB.init({
    subscribe_key: 'sub-c-3b725164-0fc3-11e6-8c3e-0619f8945a4f',
    publish_key: 'pub-c-9281ac97-4515-4334-bc25-2f62597b4c31'
  });

  compTest();

  p.bind('keyup', input, function(e) {
    (e.keyCode || e.charCode) === 13 && publish()
  });

  p.bind('click', button, publish);

  p.bind('click', random, showAllHistory)

  function publish() {

    p.publish({
      channel: dir,
      message: {
        text: input.value
      },
      x: (input.value = '')
    });

  }

function showAllHistory() {
  output.innerHTML = "";
  var allDir = ['N', 'E', 'S', 'W']

  for(var x = 0; x < allDir.length; x++) {
    p.history({
        channel: allDir[x],
        limit: 100,
      }, function (messages) {
        messages = messages[0];
        messages = messages || [];

        for(var i = 0; i < messages.length; i++) {
          output.innerHTML = output.innerHTML + '<p><span>' + messages[i].text + '</span></p>'
        }
      });
  }

  

}

function goToChat() {
    p.subscribe({
      channel: dir,
      callback: function(m) {
      output.innerHTML = output.innerHTML + '<p><span>' + m.text.replace(/[<>]/ig, '') + '</span></p>';
    } 
  });

    showHistory();
}

  function showHistory() {
    output.innerHTML = "";

    p.history({
      channel: dir,
      limit: 100,
    }, function (messages) {
      messages = messages[0];
      messages = messages || [];

      for(var i = 0; i < messages.length; i++) {
        console.log(messages[i])
        output.innerHTML = output.innerHTML + '<p><span>' + messages[i].text + '</span></p>'
      }
    });
  }

function compTest() {
    value = Math.random()
    var old = dir;
    
    if (value < 0.25) {
       dir = 'N';
        current.innerHTML = 'Your direction is north'
      
    } else if (value <= 0.25 || 0.50 > value) {
       dir = 'E';
        current.innerHTML = 'Your direction is east'
         
    } else if (value <= 0.50 || 0.75 > value) {
        dir = 'S';
        current.innerHTML = 'Your direction is south';
    
    } else {
        dir = 'W';
          current.innerHTML = 'Your direction is west';
    }

    if (old != dir || old == '') {
      p.unsubscribe({channel : old})
      goToChat()
    }
}

window.addEventListener('deviceorientation', function(event) {
  var alpha = event.alpha;
  var old = dir;

  if (315 <= alpha || 45 > alpha){
    dir = 'N';
    current.innerHTML = 'Your direction is north';
  } else if (45 <= alpha && 135 > alpha){
    dir = 'E';
    current.innerHTML = 'Your direction is east';  
  } else if (135 <= alpha && 225 > alpha){
    dir = 'S';
    current.innerHTML = 'Your direction is south';
  } else if (225 <= alpha && 315 > alpha){
    dir = 'W';
    current.innerHTML = 'Your direction is west';
    }

    if (old != dir) {
      goToChat()
    }

 });

})();