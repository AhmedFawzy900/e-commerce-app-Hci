import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import React, { useEffect, useState } from 'react';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import Swal from 'sweetalert2';

import { connect } from 'react-redux';
import  {setAllOrders}  from '../actions'; 
import  {cancel_Order}  from '../actions/index'; 


const Orders = ({ ordersData, setAllOrders, cancel_Order }) => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    // const [orders,setOrders] = useState([]);
    const [total,setTotal] = useState('');
    const getAllOrders = () => {
        fetch('http://localhost:9000/orders')
        .then(res => res.json())
        .then(data => {
            // setOrders(data.filter(order => order.user_id === user.id));
            setAllOrders(data.filter(order => order.user_id === user.id));
            calcTotal();
            console.log(ordersData);
        })
        .catch(error => console.error('Error fetching orders:', error));
    };
    // Call the function to fetch orders when the component mounts
    useEffect(() => {
        getAllOrders();
        calcTotal();
      }, [setAllOrders,total,cancel_Order]);
    const calcTotal=()=>{
        let totalOfAllOrders = 0;
        for (let i = 0; i < ordersData.length; i++) {
          totalOfAllOrders += ordersData[i].total_price;
        }
        setTotal(totalOfAllOrders);
    }

    // cansel the order
    // Your utility function
const handleOrderCancellation =(orderId,cancel_Order) => {
     Swal.fire({
      title: `Do you want to cancel this order?`,
      showDenyButton: true,
      confirmButtonText: 'yes',
    }).then((result) => {
        if (result.isConfirmed) {
          fetch(`http://localhost:9000/orders/${orderId}`, {
             method: 'DELETE',
           }).then(response => {
               response.json()
           }).then(data => {
               console.log('Order cancelled:', data);
               cancel_Order(orderId);
               Swal.fire({
                 position: 'center',
                 icon: 'success',
                 title: 'Cancelled successfully',
                 showConfirmButton: false,
                 timer: 1500,
               });
           })
     
   
       }
        
    });
  
    
  };
  
    const cancelOrder = (orderId) => {
            handleOrderCancellation(orderId,cancel_Order);
    }
    return( 
        <>
        <ResponsiveAppBar />
            <section className="h-100 gradient-custom cart">
                <div className="container py-5">
                <div className="row d-flex justify-content-center my-4">
                    <div className="col-md-8">
                    <div className="mb-4">
                        <div className="card-body">
                            
                        {
                            ordersData.length > 0 ? (
                                ordersData.map((item, index) => (
                                    <>
                                        <div key={index} className="row card mb-4">
                                            <h3 className='card-header mt-2 '>order {index + 1}</h3>
                                        <div className="">
                                            {/* Display order item details */}
                                            {item.items.map((i) => (
                                                <div key={item.product_id} className='mt-2'>
                                                    <p><strong>Title :</strong> {i.title}</p>
                                                    <p><strong>Price per unit :</strong> {i.price_per_unit}$</p>
                                                    <p><strong>Quantity :</strong> {i.quantity}</p>
                                                    <hr class="my-4" />

                                                </div>
                                            ))}
                                            {/* ... include any other details you want to display */}
                                            <button type="button" onClick={()=>cancelOrder(item.id)} class="btn mb-2 btn-secondary btn-md btn-block">
                                              cancel Order
                                            </button>
                                        </div>
                                        </div>
                                        
                                    </>
                                ))
                            ) : (
                                <div className="row card mb-4">
                                            <h3 className='card-header mt-2 '>orders</h3>
                                        <div className="">
                                                <div className='mt-2'>
                                                    <p>No orders...</p>
                                                </div>
                                            
                                        </div>
                                        </div>
                            )
                        }
                                                    
                            

                        </div>
                            </div>
                        </div>
                        {/* <div class="col-md-4">
                            <div class="card mb-4">
                            <div class="card-header py-3">
                                <h5 class="mb-0">Summary</h5>
                            </div>
                            <div class="card-body">
                                <ul class="list-group list-group-flush">
                                <li
                                    class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                    All Orders
                                    <span>{total}</span>
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
                                    <span><strong>{total}</strong></span>
                                </li>
                                </ul>
                            </div>
                            </div>
                        </div> */}
                        </div>
                </div>
            </section>
        </>
    )
}

const mapStateToProps = (state) => ({
    ordersData: state.orders.orders,
  });
  
  const mapDispatchToProps = {
    setAllOrders,
    cancel_Order,
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Orders);
