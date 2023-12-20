import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../style/signup.css';
export default function Signup() {
    const navigate = useNavigate();
    const [errorMsg,setError] = useState('');
    const [users,setUsers] = useState([])
    useEffect(() => {
        getAllUsers();
    })
     
    const getAllUsers =()=>{
        fetch('http://localhost:9000/users')
        .then(res=>res.json())
        .then(data => setUsers(data));
    }
    const [user, setUser] = useState({
        id: null,
        fname: '',
        lname: '',
        email: '',
        password: '',
        image: '',
      });

      const handleSubmit = (e) => {
        e.preventDefault();
        // Perform logic to add the product using the form data (product state)
        // You can send the data to your backend or handle it locally in your React component
       console.log(user);
       const userExists = users.some(e => e.email === user.email);
        if (userExists) {
            setError('User already exists!');
        } else {
            setError('');
        }
        if (!userExists) {
            fetch('http://localhost:9000/users', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(user)
            }).then(response => {
              setUser({
                id: null,
                fname: '',
                lname: '',
                email: '',
                password: '',
                image: ''
              });
              navigate("/login");
            });
          }
       
      };
    return (
        <div className="body">

            <div class="wrapper">
                <section class="form signup">
                    <header>Sign up</header>
                    <form onSubmit={handleSubmit} >
                        {errorMsg && (
                            <div class="error-txt">{errorMsg}</div>
                        )}
                        <div class="name-details">
                            <div class="field input">
                                <label >First Name</label>
                                <input 
                                    type="text" 
                                    placeholder="First Name"
                                    value={user.fname}
                                    onChange={(e)=> setUser({...user,fname: e.target.value})}
                                    required />
                            </div>
                            <div class="field input">
                                <label >Last Name</label>
                                <input 
                                    type="text" 
                                    placeholder="Last Name" 
                                    value={user.lname}
                                    onChange={(e)=> setUser({...user,lname: e.target.value})}
                                    required />
                            </div>
                        </div>
                            <div class="field input">
                                <label >Email Address</label>
                                <input 
                                    type="text" 
                                    placeholder="Enter your email" 
                                    value={user.email}
                                    onChange={(e)=> setUser({...user,email: e.target.value})}
                                    required />
                            </div>
                            <div class="field input">
                                <label >Password</label>
                                <input 
                                    type="password" 
                                    placeholder="Enter new password" 
                                    value={user.password}
                                    onChange={(e)=> setUser({...user,password: e.target.value})}
                                    required />
                                <i class="fa-solid fa-eye"></i>
                            </div>
                            <div class="field input">
                                <label >Image Url</label>
                                <input 
                                    type="text" 
                                    placeholder="Drop image url..." 
                                    value={user.image}
                                    onChange={(e)=> setUser({...user,image: e.target.value})}
                                    required />
                            </div>
                            
                            <div class="field button">
                                <input type="submit" value="Continue to shopping" />
                            </div>
                        
                            <div class="link">Already signed up? <Link to={"/login"}>login now</Link></div>
                    </form>
                </section>
            </div>
        </div>
    

    )
}