document.addEventListener('DOMContentLoaded', function() {
    const closeButtons = document.querySelectorAll('.close_btn');
    const notifications = document.getElementById('notifications');
    const notifications_First_container = document.getElementById('notifications_First_container');
    const notBtn = document.getElementById('notBtn');
    const allNotifications = document.getElementById('allNotifications');
    notifications.classList.add('none');
    notifications_First_container.classList.add('none');
    
    closeButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const notificationItem = this.parentElement;
            notificationItem.style.display = 'none';
        });
    });

    notBtn.addEventListener('click', function() {
        notifications_First_container.classList.toggle('none');
    notifications.classList.add('none');

    });
    allNotifications.addEventListener('click', function() {
        notifications.classList.toggle('none');
        notifications_First_container.classList.add('none');

    })
});