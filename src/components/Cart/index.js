import React, {useState} from 'react'
import Popup from 'reactjs-popup'
import Header from '../Header'
import CartListView from '../CartListView'
import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'
import './index.css'

const CustomButton = React.forwardRef(({open, ...props}, ref) => (
  <button className="button" ref={ref} {...props} type="button">
    Checkout
  </button>
))

const Cart = () => {
  const [cashSelected, changeCashOption] = useState(false) // React Hook to enable/disable a "Confirm Order" button.
  const [orderPlacedStatus, changeOrderStatus] = useState(false) // React Hook to conditionally render the paymernt oiptions or thank you message

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList, removeAllCartItems} = value

        const onClickRemoveAll = () => {
          removeAllCartItems()
        }

        const cartItems = Array.isArray(cartList) ? cartList : []
        const totalCartPrice = cartItems.reduce((accumulator, cartItem) => {
          const itemPrice = Number(cartItem.price)
          const itemQuantity = Number(cartItem.quantity)
          return accumulator + itemPrice * itemQuantity
        }, 0)

        return (
          <>
            <Header />
            <div className="cart-container">
              {cartItems.length === 0 ? (
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

                  <div className="cart-total-container">
                    <h1>
                      Order Total:{' '}
                      <span className="amount">Rs {totalCartPrice}/-</span>
                    </h1>
                    <p>{cartItems.length} items in cart</p>

                    <Popup
                      modal
                      className="popup-content"
                      trigger={open => <CustomButton open={open} />}
                    >
                      {close => (
                        <div className="modal-container">
                          {orderPlacedStatus ? (
                            <div className="success-view">
                              <p>Your order has been placed successfully</p>
                              <button type="button" onClick={close}>
                                Close
                              </button>
                            </div>
                          ) : (
                            <div className="payment-view">
                              <h1 className="payment-heading">
                                Payment Details
                              </h1>
                              <p>Order Total: Rs {totalCartPrice}/-</p>
                              <p>Items: {cartItems.length}</p>

                              <ul className="payment-options">
                                <li>
                                  <input type="radio" disabled id="card" />
                                  <label htmlFor="card">Card</label>
                                </li>
                                <li>
                                  <input type="radio" disabled id="net" />
                                  <label htmlFor="net">Net Banking</label>
                                </li>
                                <li>
                                  <input type="radio" disabled id="upi" />
                                  <label htmlFor="upi">UPI</label>
                                </li>
                                <li>
                                  <input type="radio" disabled id="wallet" />
                                  <label htmlFor="wallet">Wallet</label>
                                </li>
                                <li>
                                  <input
                                    type="radio"
                                    id="cash"
                                    name="payment"
                                    onChange={() => changeCashOption(true)}
                                  />
                                  <label htmlFor="cash">Cash on Delivery</label>
                                </li>
                              </ul>

                              <div className="modal-actions">
                                <button type="button" onClick={close}>
                                  Close
                                </button>
                                <button
                                  type="button"
                                  className="confirm-btn"
                                  disabled={!cashSelected}
                                  onClick={() => changeOrderStatus(true)}
                                >
                                  Confirm Order
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </Popup>
                  </div>
                </div>
              )}
            </div>
          </>
        )
      }}
    </CartContext.Consumer>
  )
}

export default Cart
