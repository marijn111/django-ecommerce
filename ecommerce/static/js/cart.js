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

function addCookieItem(productId, action) {
    if (action === 'add') {
        if (cart[productId] == undefined) {
            cart[productId] = {'quantity': 1};
        } else {
            cart[productId]['quantity'] += 1;
        }
    }

    if (action === 'remove') {
        cart[productId]['quantity'] -= 1;

        if (cart[productId]['quantity'] <= 0) {
            console.log('Item should be deleted');
            delete cart[productId];
        }
    }
    console.log('CART:', cart);
    document.cookie = 'cart=' + JSON.stringify(cart) + ';domain=;path=/';

    location.reload();
}


jQuery(document).ready(function () {
    let updateBtns = jQuery('.update-cart');

    updateBtns.each(function () {
        jQuery(this).click(function () {
            var productId = this.dataset.product;
            var action = this.dataset.action;

            if (user === 'AnonymousUser') {
                addCookieItem(productId, action);
            } else {
                updateUserOrder(productId, action);
            }
        })
    });
});







