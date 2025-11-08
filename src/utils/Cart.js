import toast from "react-hot-toast"

export function getCart() {
    const cartString = localStorage.getItem('cart')

    if (!cartString) {
        localStorage.setItem('cart', [])
        return []
    }else {
        const cart = JSON.parse(cartString)
        return cart
    }
}

export function addToCart(product, quantity) {
    const cart = getCart()
    
    //check if product is already in cart
    const index = cart.findIndex(
        (item) => {
            return item.productId === product.productId
        })

        if (index == -1) {
            cart.push(
                {
                    productId: product.productId,
                    name: product.name,
                    price: product.price,
                    labelledPrice: product.labelledPrice,
                    image: product.images[0],
                    isAvailable: product.isAvailable,
                    quantity: quantity
                }
            )
            toast.success(`${product.name} added to cart`)
        }else{
            const newQuantity = cart[index].quantity + quantity

            if(newQuantity > 0) {
                cart[index].quantity = newQuantity
                toast.success(`${product.name} quantity updated in cart`)
            }else{
                cart.splice(index, 1)
                toast.success(`${product.name} removed from cart`)
            }
        }

        const cartString = JSON.stringify(cart)
        localStorage.setItem('cart', cartString)
}

export function emptyCart() {
    localStorage.setItem('cart', [])
}

export function removeFromCart(productId) {
    const cart = getCart()
    const index = cart.findIndex((item) => item.productId === productId)
    if (index !== -1) {
        cart.splice(index, 1)
        const cartString = JSON.stringify(cart)
        localStorage.setItem('cart', cartString)
    }
}

export function getCartTotal() {
    let total = 0
    const cart = getCart()

    cart.forEach((item) => {
        total += item.price * item.quantity
    })

    return total
}