import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";

const User = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [user, setUser] = useState(null);
    
    const fetchUser = async () => {
        try {
            await fetch(`https://jsonplaceholder.typicode.com/users/${params.id}`)  .then(res => {
                return res.json(); 
            })
            .then(data => setUser(data))
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchUser();
    }, [])

    return (
         <div className="wrapper">
            <span onClick={() => navigate('/')}>{'< Back'}</span>
            <h1>User details</h1>
            <div className="user">
                {user && (
                    <>
                        <p>Name: {user.name}</p>
                        
                        <p>Address: </p>
                        <span>{user.address.street}, {user.address.suite}</span><br />
                        <span>{user.address.city}, {user.address.zipcode}</span>

                        <p>Phone: {user.phone}</p>
                        <p>Website: {user.website}</p>
                    </>
                )}
            </div>
        </div>
    )
}

export default User;