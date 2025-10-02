import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const [users, setUsers] = useState(null);
    const [searchValue, setSearchValue] = useState('');

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
    }

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

    const filteredUsers = useMemo(() => {
        if (searchValue !== null || searchValue !== '') {
            return users ? users?.filter(u => u.name.toLowerCase().includes(searchValue.toLowerCase()) || u.email.toLowerCase().includes(searchValue.toLowerCase().toLowerCase())) : [];
        }
    }, [searchValue, users])

    useEffect(() => {
        fetchUsers();
    }, [])

    return (
        <div className="wrapper">
            <h1>Users List</h1>
            <div className="users-search">
                <input type="text" placeholder='Search' value={searchValue} onChange={handleSearchChange} />
            </div>
            <div className="users-wrapper">
                {filteredUsers?.map(user => (
                    <div className="user" onClick={() => navigate(`/user/${user.id}`)}>
                        <p>Name: {user.name}</p>
                        <p>Email: {user.email}</p>
                        <p>Company: {user.company.name}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home;