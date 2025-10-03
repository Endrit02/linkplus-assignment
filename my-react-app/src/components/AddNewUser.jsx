import { useState } from 'react';

const AddNewUser = ({ onSubmitHandler }) => {    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
    });

    const handleChange = (e, field) => {
        setFormData({
            ...formData,
            [field]: e.target.value,
        })
        
    }

    return (
        <form className="users-wrapper"
            onSubmit={(e) => {
                e.preventDefault();
                onSubmitHandler(formData);
        }}>
            <div>
                <label htmlFor="name">Name</label>
                <input required type="text" name="name" value={formData.name} onChange={(e) => handleChange(e, 'name')} />
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input required type="email" name="email" value={formData.email} onChange={(e) => handleChange(e, 'email')} />
            </div>
            <div>
                <label htmlFor="company">Company</label>
                <input type="text" name="company" value={formData.company} onChange={(e) => handleChange(e, 'company')} />
            </div>
            <div>
                <button type="submit">Add</button>
            </div>
        </form>
    )
}

export default AddNewUser;