import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
    // quantity: 1,
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    // this.setState(prev => {
    //   const exists = prev.cartList.find(item => item.id === product.id) // check duplicate.
    //   return {
    //     cartList: exists
    //       ? prev.cartList.map(item =>
    //           item.id === product.id
    //             ? {...item, quantity: item.quantity + product.quantity}
    //             : item,
    //         )
    //       : [...prev.cartList, product],
    //   } // merge or add
    // })
    const {cartList} = this.state
    const productObject = cartList.find(item => item.id === product.id)

    if (productObject) {
      // We found it! Now let's create a NEW list where ONLY this item is updated
      const updatedCartList = cartList.map(eachItem => {
        if (eachItem.id === product.id) {
          // 1. Calculate new quantity
          const newQuantity = eachItem.quantity + product.quantity
          // 2. Return the updated item
          return {...eachItem, quantity: newQuantity}
        }
        // 3. Return all other items exactly as they are
        return eachItem
      })
      this.setState({cartList: updatedCartList})
    } else {
      // If it's a brand new item, just add it to the end
      this.setState(prevState => ({
        cartList: [...prevState.cartList, product],
      }))
    }
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.filter(cartItem => cartItem.id !== id)
    this.setState({cartList: updatedCartList})
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.map(cartItem => {
      if (cartItem.id === id) {
        return {...cartItem, quantity: cartItem.quantity + 1}
      }
      return cartItem
    })
    this.setState({cartList: updatedCartList})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    this.setState(prev => {
      const current = prev.cartList.find(ci => ci.id === id)
      return {
        cartList:
          current.quantity === 1
            ? prev.cartList.filter(ci => ci.id !== id)
            : prev.cartList.map(ci =>
                ci.id === id ? {...ci, quantity: ci.quantity - 1} : ci,
              ),
      } // remove or decrement
    })

    // const updatedCartList = cartList.map(cartItem => {
    //   if (cartItem.id === id) {
    //     return {...cartItem, quantity: cartItem.quantity - 1}
    //   }
    //   return cartItem
    // })
    // this.setState({cartList: updatedCartList})
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
