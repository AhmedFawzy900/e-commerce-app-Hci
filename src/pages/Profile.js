import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ResponsiveAppBar from "../components/ResponsiveAppBar";
export default function Profile(){
    const navigate = useNavigate();
    const [errorMsg,setError] = useState('');
    const [users,setUsers] = useState([])
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const [user, setUser] = useState(currentUser);
    useEffect(() => {
        getAllUsers();
    })
     
    const getAllUsers =()=>{
        fetch('http://localhost:9000/users')
        .then(res=>res.json())
        .then(data => setUsers(data));
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const userExists = users.some(e => e.email === user.email && user.email !== currentUser.email);
        if (userExists) {

            setError('This email already used by another user!');
        } else {
            setError('');
        }
        if (!userExists) {
            fetch(`http://localhost:9000/users/${currentUser.id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(user)
            }).then(response => {
                console.log("profile updated successfully");
            });
            localStorage.setItem('currentUser', JSON.stringify(user));
          }
       
      };
      
    return(
        <>
        <ResponsiveAppBar />
            <div className="body">
                <div class="wrapper">
                    <section class="form signup">
                        <header>Profile Data</header>
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
                                    <input type="submit" value="Edit Profile" />
                                </div>
                            
                               
                        </form>
                    </section>
                </div>
            </div>
        </>
    )
}