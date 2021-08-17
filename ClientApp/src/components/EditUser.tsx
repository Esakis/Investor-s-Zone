import React, { SyntheticEvent, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";


const EditUser = (props: { email: string }) => {


     const [dataemail, setDataemail] = useState('');
     const [datafirstname, setDatafirstname] = useState('');
     const [datalastname, setDatalastname] = useState('');
     const [email, setEmail] = useState('');
     const[firstname,setFirstName]=useState('');
     const[lastname,setLastName]=useState('');
    
     const [redirect, setRedirect] = useState(false);
 
   





    useEffect(() => {
        (
            async () => {
                const response = await fetch('https://localhost:44349/api/account/' + props.email, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                    credentials: "include",

                });
                const content = await response.json();
                console.log(content);
                setDataemail(content.email);
                setDatafirstname(content.firstName);
                setDatalastname(content.lastName);
                
            }
        )();

    });




    const submit = async (e: SyntheticEvent)=> {
   
        e.preventDefault();
     
        await fetch('https://localhost:44349/api/account/' + props.email, {
            method:'PUT',
            headers:{'Content-Type':'application/json; charset=UTF-8'},
            body: JSON.stringify({
                email,
                firstname,
                lastname
            })
        });

        setRedirect(true);
    }

    if (redirect) {
        return <Redirect to="/" />;
    }
  
    return (


        <div className="card-body p-5">
            <h6 >email : {dataemail} First Name: {datafirstname} Last Name: {datalastname}</h6>
            <li className="nav-item">
                <Link to={"/api/account/" + props.email} className="nav-link active" >Edytuj dane</Link>
            </li>

            
            <h4 className="text-uppercase text-center mb-5">Create an account</h4>
            
            <form onSubmit={submit}>
                <div className="form-floating">
                    <input type="text" className="form-control" id="floatingInput" placeholder={props.email} required
                        onChange={e => setEmail(e.target.value)}
                    />
                    <label htmlFor="floatingInput">Email</label>
                </div>
                <br />
            <div className="form-floating">
                    <input type="text" className="form-control" id="floatingInput" placeholder="Name" required
                        onChange={e => setFirstName(e.target.value)}
                />
                <label htmlFor="floatingInput">First Name</label>
            </div>
                <br/>

           
            <div className="form-floating">
                <input type="text" className="form-control" id="floatingInput" placeholder="Name" required
                       onChange={e=>setLastName(e.target.value)}/>
                <label htmlFor="floatingInput">Last Name</label>
            </div>
                <br/>
            
     
                        <div className="d-flex justify-content-center">
                            <button type="submit"
                                    className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Edit Data
                            </button>
                        </div>

                    </form>
            </div>
)
}
export default EditUser;