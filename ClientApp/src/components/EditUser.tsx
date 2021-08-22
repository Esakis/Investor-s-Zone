import * as react from "react";
import { SyntheticEvent, useEffect, useState } from "react";
import React = require("react");
import { Redirect } from "react-router-dom";
import './NavMenu.css';


const EditUser = (props: { email: string }) => {


     const [dataemail, setDataemail] = useState('');
     const [datafirstname, setDatafirstname] = useState('');
     const [datalastname, setDatalastname] = useState('');
     const [datadateOfBirth, setDatadateOfBirth] = useState('');
     const [datanationality, setDatanationality] = useState('');
     const [dataPLN, setDataPLN] = useState('');
     const [dataEUR, setDataEUR] = useState('');
     const [email, setEmail] = useState('');
     const [firstname,setFirstName]=useState('');
     const [lastname, setLastName] = useState('');
     const [dateOfBirth, setDateOfBirth] = useState('');
     const [nationality, setNationality] = useState('');

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
                setDatadateOfBirth(content.dateOfBirth);
                setDatanationality(content.nationality);
                setDataPLN(content.pln);
                setDataEUR(content.eur);
                
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
                lastname,
                dateOfBirth,
                nationality
            })
        });

        setRedirect(true);
    }

    if (redirect) {
        return <Redirect to="/" />;
    }

   
  
    return (


        <div id="Main">

            <div id="EditData">
            <h5>Edit data</h5>
            <form onSubmit={submit}>
                    <div id="Data2">
                        <input type="hidden" name="email" value={dataemail}
                        onChange={e => setEmail(e.target.value)}/>
                      
                </div> 
            <div id="Data1">
                    <input type="text" className="form-control" id="floatingInput" placeholder={datafirstname}
                        onChange={e => setFirstName(e.target.value)} />
                <label>First Name</label>
                    </div>

                <div id="Data1">
                    <input type="text" className="form-control" id="floatingInput" placeholder={datalastname}
                        onChange={e => setLastName(e.target.value)} />
                    <label>Last Name</label>
                </div>
   
                <div id="Data1">
                        <input type="data" className="form-control" id="floatingInput" placeholder={datadateOfBirth} required
                            onChange={e => setDateOfBirth(e.target.value)}/>
                <label>Date of Birth</label>
                    </div>

                    <div id="Data1">
                        <input type="text" className="form-control" id="floatingInput" placeholder={datanationality}
                            onChange={e => setNationality(e.target.value)} />
                        <label>Nationality</label>
                    </div>


                    
                <br />

                        <div id="Data3" className="d-flex justify-content-center">
                            <button type="submit"
                                    className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Edit Data
                            </button>
                        </div>

            </form>
             </div>



            <div id="EditAccount">
                <h5>Account balance:</h5><br />
                <h4 >   {dataPLN} PLN</h4>
                <h4 >   {dataEUR} EUR</h4>
                

            </div>

            </div>
)
}
export default EditUser;