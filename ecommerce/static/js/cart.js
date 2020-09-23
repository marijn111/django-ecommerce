function updateUserOrder(productID, action) {
    console.log('User is authenticated, sending data...')

    let url = '/update_item/';

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'X-CSRFToken': csrftoken,
        },
        body:JSON.stringify({'productId': productID, 'action': action})
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            location.reload();
        })
}


jQuery(document).ready(function () {
    let updateBtns = jQuery('.update-cart');

    updateBtns.each(function () {
        jQuery(this).click(function () {
            var productId = this.dataset.product;
            var action = this.dataset.action;

            if (user === 'AnonymousUser') {
                console.log('user is not authenticated');
            } else {
                updateUserOrder(productId, action)
            }
        })
    });
});







