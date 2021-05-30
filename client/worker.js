console.log('service worker loadad');

self.addEventListener('push', e => {
    const data = e.data.json();
    console.log('push received');
    
    //show notification
    self.registration.showNotification(data.title, {
        body: 'Noti by erez', 
        icon: ''
    });
});