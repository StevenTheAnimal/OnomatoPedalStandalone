// Detect IE browser and show an alert
function is_IE() {
  return (window.navigator.userAgent.match(/MSIE|Trident/) !== null);
}

//function to show alert if it's IE
function ShowIEAlert(){
if(is_IE()){
alert("Unsupported Browser!\nOnomatoPedal will not work in Internet Explorer. Use Microsoft Edge or Google Chrome for the full experience.\n\nInternet Explorerでは、このページは正しく動作しません。Microsoft EdgeかGoogle Chromeで再度お試しください。");
}
};

$(document).ready( function() {
  ShowIEAlert();
});