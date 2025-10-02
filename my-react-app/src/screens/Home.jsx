import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import AddNewUser from '../components/AddNewUser';

const Home = () => {
    const navigate = useNavigate();

    const [users, setUsers] = useState(null);
    const [searchValue, setSearchValue] = useState('');
    const [showAddNew, setShowAddNew] = useState(false);

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
    }

    const fetchUsers = async () => {
        try {
            await fetch('https://jsonplaceholder.typicode.com/users').then(res => {
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

    const onSubmitHandler = (data) => {
        const remapData = {
            ...data,
            id: 1,
            company: {
                name: data.company,
            }
        }
        setUsers([
            remapData,
            ...users,
        ]);
        setShowAddNew(false);
    }

    useEffect(() => {
        fetchUsers();
    }, [])

    return (
        <div className="wrapper">
            <h1>Users List</h1>
            <div className="users-search">
                <input type="text" placeholder='Search' value={searchValue} onChange={handleSearchChange} />
                <button onClick={() => setShowAddNew(!showAddNew)}>Add New User</button>
            </div>
            {showAddNew ? (<AddNewUser onSubmitHandler={(e) => onSubmitHandler(e)} />) : (
                <div className="users-wrapper">
                    {filteredUsers?.map(user => (
                        <div key={user.id} className="user" onClick={() => navigate(`/user/${user.id}`)}>
                            <p>Name: {user.name}</p>
                            <p>Email: {user.email}</p>
                            <p>Company: {user.company.name}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Home;