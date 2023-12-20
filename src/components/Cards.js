import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import DeleteIcon from '@mui/icons-material/Delete';

import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DrawIcon from '@mui/icons-material/Draw';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useNavigate } from 'react-router';
import SearchIcon from '@mui/icons-material/Search';
import AppsIcon from '@mui/icons-material/Apps';
import SegmentIcon from '@mui/icons-material/Segment';
import Swal from 'sweetalert2';
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Cards() {
  const [expanded, setExpanded] = React.useState(false);
const navigate = useNavigate();
  const [products,setProducts] = React.useState([]);
  const [cartItems,setCart] = React.useState([]);
  const user = JSON.parse(localStorage.getItem('currentUser'));
  const [searchTerm,setSearch] = React.useState('') 

//   const handleSearch = () => {
//       if (searchTerm) {
            
//           const filteredProducts = products.filter(product =>
//               product.title.toLowerCase().includes(searchTerm)
//             );
//             setProducts(filteredProducts);
          
//       }else{
//         getAllProducts();
//       }
     
//     };
    React.useEffect(() => {
        getAllProducts();
        // handleSearch();
        getAllCart();
    })

    const getAllProducts = () =>{
        if (searchTerm) {
            fetch(`http://localhost:9000/products`)
            .then(res=>res.json())
            .then(products=>{
                const filteredProducts = products.filter(product =>
                    product.title.toLowerCase().includes(searchTerm)
                  );
                  setProducts(filteredProducts);
            })
        }else{

            fetch(`http://localhost:9000/products`)
            .then(res=>res.json())
            .then(products=>setProducts(products))
        }
    }


    const getAllCart = () =>{
        fetch(`http://localhost:9000/cart`)
        .then(res=>res.json())
        .then(data=>setCart(data));
    }
    const addToCart= (itemId,userId)=>{
    //    fetch the item
        const itemExist = cartItems.some(e => e.product_id === itemId && e.user_id === userId);
        const cartItem = cartItems.find(e => e.product_id === itemId && e.user_id === userId);
        const product = products.find(e=> e.id === itemId);
        if (user) {
            if (itemExist) {
                console.log("exist");
                // Update the item in the cart with new quantity
                fetch(`http://localhost:9000/cart/${cartItem.id}`, {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ ...cartItem, quantity: cartItem.quantity + 1 }),
                })
                .then(res => res.json())
                .then(updatedCartItem => {
                  // Update the state with the new cart item
                  const updatedCartItems = cartItems.map(item =>
                    item.product_id === updatedCartItem.product_id ? updatedCartItem : item
                  );
                  setCart(updatedCartItems);
                })
                .catch(error => console.error('Error updating cart item:', error));
    
                console.log(cartItem);
    
            }else{
                console.log(" not exist");
                // Add a new item to the cart
                fetch('http://localhost:9000/cart', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({id:null,user_id: userId,product_id: itemId,title: product.title ,price:product.price, quantity: 1,category:product.category,description:product.description,image:product.image}),
                })
                .then(res => res.json())
                .then(newCartItem => {
                  // Add the new cart item to the state
                  setCart([...cartItems, newCartItem]);
                })
                .catch(error => console.error('Error adding item to cart:', error));
            }
        }
    }
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const deleteProduct = (productId) => {
    console.log(`delete ${productId}`);
    const productToDelete = products.find(product => product.id === productId);
    console.log(productToDelete);
   
   Swal.fire({
    title: `Do you want to Delete this product?`,
    showDenyButton: true,
    confirmButtonText: 'yes',
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      if (user) {
        if (productToDelete && productToDelete.user_id === user.id) {
            fetch(`http://localhost:9000/products/${productId}`, {
              method: 'DELETE'
            })
            .then(res => {
              if (res.ok) {
                setProducts(products.filter(product => product.id !== productId));
              } else {
                console.error('Error deleting the product:', res);
              }
            })
            .catch(error => console.error('Error deleting product:', error));
          } else {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'You are not authorized to delete this product',
              showConfirmButton: false,
              timer: 1500
            })
          }
       }
    }
  });
  };

 

  return (
    <>
    <div className='card-items row'>
        {/* search  */}
        <div className="search-container">
          <div className='icons-filter'>
            <div className='all-icon'>
              <AppsIcon/>
            </div>
            <div className='part-icon'>
              <SegmentIcon/>
            </div>
          </div>
          <div className='search'>
          <input
            type="text"
            placeholder="Search products..."
            onChange={e=>setSearch(e.target.value.toLowerCase())}
          />
          <SearchIcon/>
          </div>
          
        </div>
           <div className='d-flex flex-wrap'>
           {products.map((item)=>(
                <Card sx={{ maxWidth: 290 }} key={item.id} className='item m-3 col-lg-3 col-md-4 col-sm-4' >
                
                <CardMedia
                    component="img"
                    height="194"
                    image={item.image}
                    alt="Paella dish"
                />
                <div className='category'>{item.category}</div>
                <CardHeader
                    title={item.title.slice(0,20)}
                />
                <CardContent className='content'>
                    <Typography variant="body2" color="text.secondary">
                    {item.description.slice(0,100)}
                    </Typography>
                    
                    <Typography variant="body2" color="text.secondary">
                    Price : {item.price}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing className='icons'>
                    <IconButton className='cart' aria-label="add to cart" onClick={()=>addToCart(item.id,user && user.id)}>
                        <AddShoppingCartIcon />
                    </IconButton>
                    <IconButton className='edit' aria-label="edit product" onClick={() =>user && navigate(`/edit-product/${item.id}`)}>
                        <DrawIcon />
                    </IconButton>
                    <IconButton className='trips' aria-label="add to favorites">
                    <FavoriteIcon />
                    </IconButton>
                    <IconButton className='remove' aria-label="delete" onClick={()=>deleteProduct(item.id)}>
                        <DeleteIcon />
                    </IconButton>
                    
                </CardActions>
                
                </Card>
            ))}
           </div>
            
    </div>
    </>
  );
}