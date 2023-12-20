
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import ResponsiveAppBar from '../components/ResponsiveAppBar';

export default function EditProduct() {
    const user = JSON.parse(localStorage.getItem('currentUser'));

    const [product, setProduct] = useState({});

    const navigate = useNavigate();
    const { product_id } = useParams();
    useEffect(() => {
        fetch(`http://localhost:9000/products/${product_id}`)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    setProduct(data);
                }else{
                    console.error('Product not found');
                    navigate('/');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                navigate('/');
            });
    }, [product_id, navigate]);
   
    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (user && user.id === product.user_id) {
            fetch(`http://localhost:9000/products/${product_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            })
            .then(response => response.json())
            .then(data => navigate("/"))
            .catch(error => console.error('Error:', error));
        } else {
            console.log('Unauthorized: User ID does not match the product owner ID');
            navigate("/");
        }
    };
    return (
        <>
        <ResponsiveAppBar />
        <form onSubmit={handleSubmit} className="create container mt-5 wrapper" >
            <h1>Edit Product</h1>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" id="title" name="title" value={product.title} onChange={handleChange} placeholder='Title' required />
            </div>
            <div className="mb-3">
                <label htmlFor="price" className="form-label">Price</label>
                <input type="number" className="form-control" id="price" name="price" value={product.price} onChange={handleChange} placeholder='Price' required />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea className="form-control" id="description" name="description" rows="3" value={product.description} onChange={handleChange} placeholder='description' required></textarea>
            </div>
            <div className="mb-3">
                <label htmlFor="category" className="form-label">Category</label>
                <input type="text" className="form-control" id="category" name="category" value={product.category} onChange={handleChange} placeholder='category' required />
            </div>
            <div className="mb-3">
                <label htmlFor="image" className="form-label">Image URL</label>
                <input type="url" className="form-control" id="image" name="image" placeholder='image url...' value={product.image} onChange={handleChange} required />
            </div>
            <button type="submit" className="btn btn-primary">Edit Product</button>
        </form>
        </>
    );
}
