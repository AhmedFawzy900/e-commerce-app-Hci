import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../style/signup.css';

export default function Login() {
    const navigate = useNavigate();
    const [errorMsg,setError] = useState('');
    const [users,setUsers] = useState([])
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    useEffect(() => {
        getAllUsers();
    })
     
    const getAllUsers =()=>{
        fetch('http://localhost:9000/users')
        .then(res=>res.json())
        .then(data => setUsers(data));
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        const userMatch = users.find(user => user.email === email && user.password === password);
        if (userMatch) {
            setError('');
            localStorage.setItem('currentUser', JSON.stringify(userMatch));
            navigate('/');
            console.log(userMatch);
        } else {
            setError('The email or password is incorrect.');
        }
    }
    return (
        <div className="body">

            <div class="wrapper">
                <section class="form login">
                    <header>Sign in</header>
                    <form onSubmit={handleSubmit} >
                            {errorMsg && (
                                <div class="error-txt">{errorMsg}</div>
                            )}
                            <div class="field input">
                                <label >Email Address</label>
                                <input 
                                    value={email}
                                    onChange={(e)=> setEmail(e.target.value)}
                                    type="text" 
                                    placeholder="Enter your email" />
                            </div>
                            <div class="field input">
                                <label >Password</label>
                                <input 
                                    value={password}
                                    onChange={(e)=> setPassword(e.target.value)}
                                    type="password" 
                                    placeholder="Enter your password" />
                                <i class="fa-solid fa-eye"></i>
                            </div>
                            <div class="field button">
                                <input type="submit" value="Continue to shopping" />
                            </div>
                        
                            <div class="link">Not yet signed up? <Link to={"/register"}>Signup now</Link></div>
                    </form>
                </section>
            </div>
        </div>
    )
}