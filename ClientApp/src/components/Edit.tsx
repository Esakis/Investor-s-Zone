import * as React from 'react';


import { connect } from 'react-redux';
import { useEffect,useState } from 'react';
import { Divider } from 'semantic-ui-react';


function Edit() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [nationality, setNationality] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    // const[dateOfBirth,setDateOfBirth]=useState('');
    // const[role,setRole]=useState('');
    const [userId, setUserId] = useState(null)

   

    useEffect(() => {
        
    }, []);

    const user = async () => {

        await fetch('https://localhost:44349/api/account/{id}', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            credentials: "include",

        });


    }


  


    return (
        <div className="App" >
            <h1> Update user details </h1>
            <input className="card-text" type="text" name="name" value={name} onChange={(e) => {setName(e.target.value)}} /><br /> <br />
            <input className="card-text"  type="text" name="email" value={email} onChange={(e) => { setEmail(e.target.value) }}/><br /> <br />
            <input type="text" name="firstname" value={firstname} onChange={(e) => { setFirstName(e.target.value) }}/><br /> <br />
            <input type="text" name="lastname" value={lastname} onChange={(e) => { setLastName(e.target.value) }}/><br /> <br />
            <input type="text" name="nationality" value={nationality} onChange={(e) => { setNationality(e.target.value) }}/><br /> <br />
            <input type="text" name="password" value={password} onChange={(e) => { setPassword(e.target.value) }}/><br /> <br />
            <input type="text" name="confirmPassword" value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }}/><br /> <br />
         
            <button type="submit" className="btn btn-primary mb-2 pxy-4">Save</button>

        </div>
        
        );
}
export default Edit;
   



