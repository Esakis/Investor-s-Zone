import React, { SyntheticEvent, useState } from "react";
import { Redirect } from "react-router-dom";

const Register = () => {
    const[email,setEmail]=useState('');
    // const[firstname,setFirstName]=useState('');
    // const[lastname,setLastName]=useState('');
    // const[nationality,setNationality]=useState('');
    const[password,setPassword]=useState('');
    const[confirmPassword,setConfirmPassword]=useState('');
    // const[dateOfBirth,setDateOfBirth]=useState('');
    // const[role,setRole]=useState('');
    //
    const [redirect, setRedirect] = useState(false);
    const submit = async (e: SyntheticEvent)=> {
   
        e.preventDefault();
     
        await fetch('https://localhost:44349/api/account/register',{
            method:'POST',
            headers:{'Content-Type':'application/json; charset=UTF-8'},
            body:JSON.stringify({
                email,
                password,
                confirmPassword
            })
        });

       // const content = await response.json();
       // console.log(content);

        setRedirect(true);
    }

    if (redirect) {
        return <Redirect to="/login" />; 
    }
  
    return (


        <div className="card-body p-5">
            <h1 className="h3 mb-3 fw-normal">Strefa Inwestora</h1>
            <h4 className="text-uppercase text-center mb-5">Create an account</h4>
            
            <form onSubmit={submit}>
            <div className="form-floating">
                <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" required 
                        onChange={e => setEmail(e.target.value)}
                />
                <label htmlFor="floatingInput">Email address</label>
            </div>
                <br/>

            {/*<div className="form-floating">*/}
            {/*    <input type="text" className="form-control" id="floatingInput" placeholder="Name" required*/}
            {/*           onChange={e=>setFirstName(e.target.value)}/>*/}
            {/*    <label htmlFor="floatingInput">First Name</label>*/}
            {/*</div>*/}
            {/*    <br/>*/}
            {/*<div className="form-floating">*/}
            {/*    <input type="text" className="form-control" id="floatingInput" placeholder="Name" required*/}
            {/*           onChange={e=>setLastName(e.target.value)}/>*/}
            {/*    <label htmlFor="floatingInput">Last Name</label>*/}
            {/*</div>*/}
            {/*    <br/>*/}
            
            {/*<div className="form-floating">*/}
            {/*    <input type="text" value="2021-07-14T17:05:14.414Z" className="form-control" id="floatingInput" placeholder="Nationality" required*/}
            {/*           onChange={e=>setDateOfBirth(e.target.value)}/>*/}
            {/*    <label htmlFor="floatingInput">DOB</label>*/}
            {/*</div>*/}
            {/*    <br/>*/}
            {/*    <div className="form-floating">*/}
            {/*        <input type="text" value="1" className="form-control" id="floatingInput" placeholder="Nationality" required*/}
            {/*               onChange={e=>setRole(e.target.value)}/>*/}
            {/*        <label htmlFor="floatingInput">Role</label>*/}
            {/*    </div>*/}
            {/*    <br/>*/}
            {/*    <div className="form-floating">*/}
            {/*        <input type="text" className="form-control" id="floatingInput" placeholder="Nationality" required*/}
            {/*               onChange={e=>setNationality(e.target.value)}/>*/}
            {/*        <label htmlFor="floatingInput">Nationality</label>*/}
            {/*    </div>*/}
            {/*    <br/>*/}
            <div className="form-floating">
                <input type="password" className="form-control" id="floatingPassword" placeholder="Password" required
                       onChange={e=>setPassword(e.target.value)}/>
                <label htmlFor="floatingPassword">Password</label>
            </div>

                <div className="form-floating">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password" required
                           onChange={e=>setConfirmPassword(e.target.value)}/>
                    <label htmlFor="floatingPassword">Confirm Password</label>
                </div>
                

                        <div className="d-flex justify-content-center">
                            <button type="submit"
                                    className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register
                            </button>
                        </div>

                    </form>
            </div>

        


)
}
export default Register;