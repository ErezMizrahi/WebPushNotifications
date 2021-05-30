const publicVapidKey = 'BHY3IuwZxJB71joExanW7Ectg0-7IBJyd1lLGDb10fttVyfL-8OacsBY2TGTkUGvtV-eJv51_VCdRnPCa7O4_Z4';

//Check for service worker
if('serviceWorker' in navigator) {
    send().catch(err => console.error(err));
}

//Register serviceWorker -> Register push -> Send push
async function send() {
    //register serviceWorker
    console.log('registering service worker');
    const register = await navigator.serviceWorker.register('/worker.js', {
        'scope' : '/'
    });
    console.log('serivce worker registerd');

    //register push
    console.log('registering push');
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    })
    console.log('push registerd');

    //send push notification
    console.log('sending push');
    await fetch('/subscribe', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
            'content-type': 'application/json'
        }
    });
    console.log('push sent')

}


function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, "+")
      .replace(/_/g, "/");
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }