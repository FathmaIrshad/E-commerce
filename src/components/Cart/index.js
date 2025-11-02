import Header from '../Header'
import CartListView from '../CartListView'
import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {removeAllCartItems} = value

      const onClickRemoveAll = () => {
        removeAllCartItems()
      }
      const cartList = Array.isArray(value.cartList) ? value.cartList : []
      {
        /*
       value.cartList safely assigns a value to the cartList constant:
      Array.isArray(value.cartList): It checks if value.cartList is actually an array.
      ? value.cartList: If it is an array (the check returns true), it uses that array.
      : []: If it is not an array (e.g., it's undefined, null, an object, a string, etc.), it defaults to an empty array [] instead.
      */
      }

      const totalCartPrice = cartList.reduce((accumulator, cartItem) => {
        const itemPrice = Number(cartItem.price)
        const itemQuantity = Number(cartItem.quantity)
        console.log(itemPrice)
        console.log(itemQuantity)
        // Add the current item's cost to the accumulator
        return accumulator + itemPrice * itemQuantity
      }, 0)

      return (
        <>
          <Header />
          <div className="cart-container">
            {cartList.length === 0 ? (
              <EmptyCartView />
            ) : (
              <div className="cart-content-container">
                <h1 className="cart-heading">My Cart</h1>
                <button
                  type="button"
                  className="remove-All-btn"
                  onClick={onClickRemoveAll}
                >
                  Remove All
                </button>
                <CartListView />
                {/* TODO: Add your code for Cart Summary here */}
                <div className="cart-total-container">
                  <h1>
                    Order Total:{' '}
                    <span className="amount">Rs {totalCartPrice}/-</span>
                  </h1>
                  <p>{cartList.length} items in cart</p>
                  <button type="button" className="checkout-desktop-btn">
                    Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default Cart
