const socket = io.connect('http://localhost:3000');

let elementOrdersContainer = document.getElementById('orders');
let elementEmptyMessage = document.getElementById("empty");
let elementShadowContainer = document.getElementById("shadowContainer");

if(!elementOrdersContainer.hasChildNodes()) {
  elementEmptyMessage.style.display = "block";
  shadowContainer.style.display = "none";
}

socket.on('orders', (data) => {
  elementEmptyMessage.style.display = "none";
  elementShadowContainer.style.display = "block";
  createOrder(data);
});

$('#btnLogOut').on('click', function(event) {
  event.preventDefault();
  window.location.href= "/logout";
}); 

function deleteOrder(button, postId)
{
  $(button).prop('disabled', true);
  $.ajax({
    type: 'DELETE',
    url: 'http://localhost:3000/delete/'+postId,
    success: function(msg) {
      console.log('Succ: '+msg);
    }
  });

  let child = button;
  let parent = button.parentNode;
  
  while(parent.id != "orders") {
    child = parent;
    parent = parent.parentNode;
  }
  
  let nextElements = [];
  
  next = child;
  while((next = next.nextElementSibling) != null) {
    nextElements.push(next);
  }
  
  const elementHeight = child.clientHeight;
  const animFadeOut = anime({
    targets: child,
    opacity: 0,
    easing: 'easeOutSine',
    duration: 300,
    complete: function(anim) {
      const moveUp = anime({
        targets: nextElements,
        duration: 400,
        translateY: (-elementHeight-21),
        easing: 'easeInOutCubic',
        complete: function(anim) {
          const animeReturn = anime({
            targets: nextElements,
            translateY: 0,
            duration: 0,
          });     
          parent.removeChild(child);
          if(!parent.hasChildNodes()) {
            elementEmptyMessage.style.display = "block";
            elementShadowContainer.style.display = "none";
          }
        }
      });    
      const resizeBG = anime({
        targets: '#shadowContainer',
        height: elementShadowContainer.clientHeight - (elementHeight+21),
        duration: 400,
        easing: 'easeInOutCubic'
      });
    }
  });
}

function createOrder(data) {
  let date = new Date(data.postedAt)
  let months = ["Januar", "Februar", "Mart", "April", "Maj", "Jun", "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar"]
  let minutesPrefix = date.getMinutes()<10?'0':'';
  let formated = months[date.getMonth()]+' '+date.getDate()+', '+date.getFullYear()+' - '+ date.getHours()+':'+minutesPrefix+ date.getMinutes()

  let orders = "";
  for (order of data.orders) {
    orders += `<p>${order['count']}x ${order['name']} (${order['price']} RSD)</p>`;
  }

  const postHtml = `<div class="panel panel-default">
      <div class="panel-heading">
        <div class="pull-left">Narudžbina za sto broj: ${data['tableId']}</div>
        <div class="pull-right row">
          <div class="col-xs-10"> Vreme: ${formated} </div>
          <div class="col-xs-2">
            <button type="button" onClick="deleteOrder(this)">X</button>
          </div>
        </div>
        <div class="clearfix">
         </div>
      </div>
      <div class="panel-body">
        ${orders}
      </div>
    </div>`;
  
  elementOrdersContainer.innerHTML = postHtml + elementOrdersContainer.innerHTML;

  let newElement = document.getElementsByClassName("panel")[0];
  let elementHeight = newElement.clientHeight;
  newElement.style.display = "none";
  
  const resizeBG = anime({
    targets: '#shadowContainer',
    height: elementShadowContainer.clientHeight + elementHeight + 21,
    duration: 400,
    easing: 'easeInOutCubic'
  });
  const moveDown = anime({
    targets: elementOrdersContainer,
    translateY: elementHeight,
    duration: 400,
    easing: 'easeInOutCubic',
    complete: function(anim) {
      newElement.style.display = "block";
      newElement.style.opacity = 0;
      const animeReturn = anime({
        targets: elementOrdersContainer,
        translateY: 0,
        duration: 0,
        complete: function(anim) {
          const animFadeIn = anime({
            targets: newElement,
            opacity: 1,
            easing: 'easeOutSine',
            duration: 300 
          });
        }
      });
    }
  });
}