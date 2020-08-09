(function (selector) {
  'use strict';

  const sseContainer = document.querySelector(selector);
  const sse = new EventSource('/sse/');
  sse.onmessage = function(event) {
    let p = document.createElement('p');
    p.textContent = event.data;
    sseContainer.appendChild(p);
  }
})('#sse-container');
