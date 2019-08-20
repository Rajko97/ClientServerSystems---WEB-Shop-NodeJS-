const socket = io.connect('http://localhost:3000');

let ordersContainer = document.getElementById('orders');

socket.on('orders', (data) => {
  createOrder(data);
});

$('#btnLogOut').on('click', function(event) {
  event.preventDefault();
  window.location.href= "/logout";
}); 

// Functions:
function createOrder(data) {
  let date = new Date(data.postedAt)
  let months = ["Januar", "Februar", "Mart", "April", "Maj", "Jun", "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar"]
  let minutesPrefix = date.getMinutes()<10?'0':'';
  let formated = months[date.getMonth()]+' '+date.getDate()+', '+date.getFullYear()+' - '+ date.getHours()+':'+minutesPrefix+ date.getMinutes()

  let orders = "";
  for (order of data.orders) {
    orders += `<p>${order['count']}x ${order['name']} (${order['price']} RSD)</p>`;
  }

  const postHtml = `
    <div class="panel panel-default">
      <div class="panel-heading">
        <div class="pull-left">Narudžbina za sto broj: ${data['tableId']}</div>
        <div class="pull-right">Vreme: ${formated}</div>
        <div class="clearfix">
         </div>
      </div>
      <div class="panel-body">
        ${orders}
      </div>
    </div>
  `;
  ordersContainer.innerHTML = postHtml + ordersContainer.innerHTML;
}