import * as react from "react";
import { SyntheticEvent, useEffect, useState,Component} from "react";
import React = require("react");
import { Redirect } from "react-router-dom";
import { Button,Message,Form,Header,Container, Segment} from "semantic-ui-react";


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
    
          



        <div className="ui two column centered grid">
                                <div className="column teal">
                                    <div className="ui segment">
                    <div className="ui message ">
                                           
                                            <div className="header">
                                                 Account Balance
                                            </div>
                                            <p>{dataPLN} PLN</p>
                                            <p>{dataEUR} EUR</p>
                                        </div>
                                    </div>
                                </div>
            <div className=" four column centered row">
                                    <div className="ui segment">
                                        <div className="ui raised very padded text container segment">
                                            <form onSubmit={submit} className="ui form">

                                                <form onSubmit={submit} className="ui form">
                                                    <h4 className="ui dividing header">User Account</h4>
                                                    <div className="field">
                                                        <label>Email</label>
                                                        <input type="text"
                                                            name="email"
                                                            placeholder={props.email}
                                                            value={dataemail}
                                                            onChange={e => setEmail(e.target.value)} /></div>

                                                    <div className="field">
                                                        <label>First Name</label>
                                                        <input type="text"
                                                            name="first name"
                                                            placeholder={datafirstname}
                                                            value={datafirstname}
                                                            onChange={e => setFirstName(e.target.value)} /></div>

                                                    <div className="field">
                                                        <label>Last Name</label>
                                                        <input type="text"
                                                            name="last name"
                                                            placeholder={datalastname}
                                                            value={datalastname}
                                                            onChange={e => setLastName(e.target.value)} /></div>

                                                    <div className="field">
                                                        <label>Date of Birthday</label>
                                                        <input type="text"
                                                            name="date of birthday"
                                                            placeholder={datadateOfBirth}
                                                            value={datadateOfBirth}
                                                            onChange={e => setDateOfBirth(e.target.value)} /></div>
                                                    <div className="field">
                                                        <label>Nationality</label>
                                                        <input type="text"
                                                            name="nationality"
                                                            placeholder={datanationality}
                                                            value={datanationality}
                                                            onChange={e => setNationality(e.target.value)} /></div>
                                                    <button className="ui button" type="submit" color="tail">Submit</button>
                            </form>
                        </form>
                                    </div>
                                </div>
                                
            </div>
        </div>
                    );
                    };
          export default EditUser;