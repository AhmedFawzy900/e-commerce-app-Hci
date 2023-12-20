
import { useState } from 'react';
import { useNavigate } from 'react-router';
import ResponsiveAppBar from '../components/ResponsiveAppBar';

export default function Create() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        id: null,
        user_id:user.id,
        title: '',
        price: '',
        description: '',
        category: "",
        image: ''
    });

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:9000/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        })
        .then(response => response.json())
        .then(data => navigate("/"))
        .catch(error => console.error('Error:', error));
    };

    return (
    <>
    <ResponsiveAppBar />
        <form onSubmit={handleSubmit} className="create container mt-5 wrapper" >
            <h1>Create Product</h1>
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
            <button type="submit" className="btn btn-primary">Create Product</button>
        </form>
    </>
    );
}
