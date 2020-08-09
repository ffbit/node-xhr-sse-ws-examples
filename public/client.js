(function(selector) {
  'use strict';

  const xhrContainer = document.querySelector(selector);
  const pingButton = xhrContainer.querySelector('button.ping');
  const lastChild = xhrContainer.lastChild;
  const pingEventListener = function(event) {
    let ping = new XMLHttpRequest();
    ping.open('GET', '/xhr/ping/');
    ping.onload = function() {
      if (this.status === 200) {
        let p = document.createElement('p');
        p.innerText = this.responseText;
        lastChild.after(p);

        setTimeout(function() {
          p.remove();
        }, 2000);
      }
    };
    ping.send();
  };
  pingButton.addEventListener('click', pingEventListener);

})('#xhr-container');

(function (selector) {
  'use strict';

  const sseContainer = document.querySelector(selector);
  const lastChild = sseContainer.lastChild;
  const sse = new EventSource('/sse/');
  sse.onmessage = function(event) {
    let p = document.createElement('p');
    p.textContent = event.data;
    lastChild.after(p);
    setTimeout(function() {
      p.remove();
    }, 17519);
  }
})('#sse-container');

(function(selector) {
  'use strict';

  const wsContainer = document.querySelector(selector);
  const button = wsContainer.querySelector('button');
  const input = wsContainer.querySelector('input');
  const lastChild = wsContainer.lastChild;

  function connect() {
    const eventListener = function(event) {
      if (input.value !== '') {
        console.log('Seding message via websocket:' + input.value);
        ws.send(input.value);
        input.value = '';
      }
    };
    button.addEventListener('click', eventListener);

    const ws = new WebSocket(`ws://${window.location.host}/ws/`);
    ws.onopen = function(event) {
      console.log('WebSocket connection is opened');
    };
    ws.onerror = function(event) {
      console.error("WebSocket error observed:", event);;
      ws.close();
    };
    ws.onclose = function(event) {
      console.error("WebSocket closure observed:", event);
      button.removeEventListener('click', eventListener);
      setTimeout(connect, 1000);
    };
    ws.onmessage = function(event) {
      console.log('Got message ' + event.data);
      let p = document.createElement('p');
      p.textContent = event.data;
      lastChild.after(p);
    };
  }

  connect();
  
})('#ws-container');
