import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import React, { useEffect, useState } from 'react';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import Swal from 'sweetalert2';
export default function Card(){
    const [cartItems,setCart] = useState([]);
    let total=0
    const user = JSON.parse(localStorage.getItem('currentUser'));
    useEffect(() => {
        user && getAllCart(user.id);
    },[]);
    const getAllCart = (userId) =>{
        fetch(`http://localhost:9000/cart/?user_id=${userId}`)
        .then(res=>res.json())
        .then(data=>setCart(data))
        .catch(error => console.log(error));
    }
    const calcTotal=()=>{
        const total = cartItems.reduce((accumulator, item) => accumulator + (item.price * item.quantity), 0);
        return total;
    }
    const minimizeQuantity = (itemId) => {
        console.log("- click");
      const cartItem = cartItems.find(e => e.product_id === itemId);
      if (cartItem && cartItem.quantity > 1) {
        console.log("min");
        // Reduce the item quantity by one
        fetch(`http://localhost:9000/cart/${cartItem.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...cartItem, quantity: cartItem.quantity - 1 }),
        })
        .then(res => res.json())
        .then(updatedCartItem => {
          // Update the state with the new cart item quantity
          const updatedCartItems = cartItems.map(item =>
            item.product_id === updatedCartItem.product_id ? updatedCartItem : item
          );
          setCart(updatedCartItems);
        })
        .catch(error => console.error('Error updating cart item quantity:', error));
      } 
    }
    const maximizeQuantity = (itemId) => {
        console.log("+ click");
      const cartItem = cartItems.find(e => e.product_id === itemId);
      if (cartItem) {
        console.log("max");
        // Increase the item quantity by one
        fetch(`http://localhost:9000/cart/${cartItem.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...cartItem, quantity: cartItem.quantity + 1 }),
        })
        .then(res => res.json())
        .then(updatedCartItem => {
          // Update the state with the new cart item quantity
          const updatedCartItems = cartItems.map(item =>
            item.product_id === updatedCartItem.product_id ? updatedCartItem : item
          );
          setCart(updatedCartItems);
        })
        .catch(error => console.error('Error updating cart item quantity:', error));
      }
    }
    const deleteCartItem = (itemId) => {
      const cartItem = cartItems.find(e => e.product_id === itemId);
      Swal.fire({
        title: `Do you want to Delete ${cartItem?.title}?`,
        showDenyButton: true,
        confirmButtonText: 'yes',
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          if (cartItem) {
            // Send request to delete the cart item
            fetch(`http://localhost:9000/cart/${cartItem.id}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              }
            })
            .then(() => {
              // Update the state to remove the cart item
              const updatedCartItems = cartItems.filter(item => item.product_id !== itemId);
              setCart(updatedCartItems);
            })
            .catch(error => console.error('Error removing cart item:', error));
          } else {
            console.log('Item not found in cart');
          }
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Deleted successfully',
            showConfirmButton: false,
            timer: 1500
          })
        }
      })
      
    };

    // const getAllOrders=()=>{
    //     fetch(`http://localhost:9000/orders?user_id=${user.id}`)
    //     .then(res => res.json())
    //     .then(data => {
    //       setOrders(data);
    //     })
    //     .catch(error => console.error('Error fetching orders:', error));
    // }
    const addToOrders = () => {
      if (cartItems.length > 0) {
        const orderData = {
            id:null,
            user_id: user.id,
            items: cartItems.map(item => ({
              product_id: item.product_id,
              title:item.title,
              quantity: item.quantity,
              price_per_unit: item.price
            })),
            total_price: calcTotal(),
            order_date: new Date().toISOString()
          };
            fetch('http://localhost:9000/orders', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
          })
          .then(res => res.json())
          .then(newOrder => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Your order has been placed successfully',
              showConfirmButton: false,
              timer: 2000
            })
          })
          .catch(error => console.error('Error adding the order:', error));

        //   fetch('http://localhost:9000/orders_history', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify(orderData)
        // })
        // .then(res => res.json())
        // .then(order => {
        //   console.log('Order history placed successfully', order);
        // })
        // .catch(error => console.error('Error placing order:', error));
        } 
    };
    return( 
        <>
        <ResponsiveAppBar />
            <section className="h-100 gradient-custom cart">
                <div className="container py-5">
                <div className="row d-flex justify-content-center my-4">
                    <div className="col-md-8">
                    <div className="card mb-4">
                        <div className="card-header py-3">
                        <h5 className="mb-0">Cart - {cartItems.length} items</h5>
                        </div>
                        <div className="card-body">
                            
                        {
                            cartItems.length > 0 ? (
                                cartItems.map((item, index) => (
                                    <>
                                        <div key={index} className="row ">
                                        <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                                        <div
                                            className="bg-image hover-overlay hover-zoom ripple rounded"
                                            data-mdb-ripple-color="light"
                                        >
                                            <img
                                            src={item.image}
                                            className="w-100"
                                            alt="Blue Jeans Jacket"
                                            />
                                            <a href="#!">
                                            <div
                                                className="mask"
                                                style={{ backgroundColor: "rgba(251, 251, 251, 0.2)" }}
                                            ></div>
                                            </a>
                                        </div>
                                        </div>
                                        <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                                        <p>
                                            <strong>{item.title}</strong>
                                        </p>
                                        <p>Price: {item.price}$</p>
                                        <p>Category: {item.category}</p>
                                        <div className='d-flex align-items-center'>
                                            <div>

                                            <button
                                                type="button"
                                                className="icon btn btn-secondary btn-sm me-1 mb-2 "
                                                data-mdb-toggle="tooltip"
                                                title="Remove item"
                                                onClick={() => deleteCartItem(item.product_id)}
                                            >
                                                <DeleteIcon />
                                            </button>
                                            </div>
                                            <div>

                                            <button
                                            type="button"
                                            className="btn icon btn-danger btn-sm me-1  mb-2"
                                            data-mdb-toggle="tooltip"
                                            title="Move to the wish list"
                                            >
                                            <FavoriteIcon />
                                            </button>
                                            </div>
                                            <div>

                                            <button
                                                type="button"
                                                className="btn icon btn-primary btn-sm mb-2"
                                                data-mdb-toggle="tooltip"
                                                title="see item"
                                            >
                                                <RemoveRedEyeIcon />
                                            </button>
                                        </div>
                                        </div>
                                        </div>
                                        <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                                        <div className="d-flex mb-4 quantity" style={{ maxWidth: "300px" }}>
                                        <button class="btn btn-primary px-3 me-2" onClick={() => minimizeQuantity(item.product_id)}>
                                            <RemoveIcon />
                                        </button>
                                            <div className="form-outline">
                                                <input
                                                    id="form1"
                                                    min="0"
                                                    name="quantity"
                                                    value={item.quantity}
                                                    type="number"
                                                    className="form-control"
                                                />
                                                    <label className="form-label" htmlFor="form1">
                                                        Quantity
                                                    </label>
                                            </div>

                                            <button class="btn btn-primary px-3 ms-2" onClick={() => maximizeQuantity(item.product_id)}>
                                                <AddIcon />
                                            </button>
                                                </div>
                                            </div>
                                        </div>
                                        <hr class="my-4" />
                                    </>
                                ))
                            ) : (
                                <p>No products in the cart.</p>
                            )
                        }
                                                    
                            

                        </div>
                            </div>
                            <div class="card mb-4">
                            <div class="card-body">
                                <p><strong>Expected shipping delivery</strong></p>
                                <p class="mb-0">12.10.2020 - 14.10.2020</p>
                            </div>
                            </div>
                            <div class="card mb-4 mb-lg-0">
                            <div class="card-body">
                                <p><strong>We accept</strong></p>
                                <img class="me-2" width="45px"
                                src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                                alt="Visa" />
                                <img class="me-2" width="45px"
                                src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                                alt="American Express" />
                                <img class="me-2" width="45px"
                                src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                                alt="Mastercard" />
                                
                            </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="card mb-4">
                            <div class="card-header py-3">
                                <h5 class="mb-0">Summary</h5>
                            </div>
                            <div class="card-body">
                                <ul class="list-group list-group-flush">
                                <li
                                    class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                    Products
                                    <span>{calcTotal()}</span>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center px-0">
                                    Shipping
                                    <span>Gratis</span>
                                </li>
                                <li
                                    class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                    <div>
                                    <strong>Total amount</strong>
                                    <strong>
                                        <p class="mb-0">(including VAT)</p>
                                    </strong>
                                    </div>
                                    <span><strong>{calcTotal()}</strong></span>
                                </li>
                                </ul>

                                <button type="button" onClick={() => addToOrders()} class="checkout btn btn-primary btn-lg btn-block">
                                 Make Order
                                </button>
                            </div>
                            </div>
                        </div>
                        </div>
                </div>
            </section>
        </>
    )
}