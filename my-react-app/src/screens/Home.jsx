import { useState, useEffect } from 'react';

const Home = () => {
    const [users, setUsers] = useState(null);

    const fetchUsers = async () => {
        try {
            await fetch('https://jsonplaceholder.typicode.com/users')  .then(res => {
                return res.json(); 
            })
            .then(data => setUsers(data))
        } catch (error) {
            console.log(error);
        }
    }

    console.log('users', users);

    useEffect(() => {
        fetchUsers();
    }, [])

    return (
        <div className="bg-red-500 w-[300px] h-[300px]">
            asdf
        </div>
    )
}

export default Home;