import { Data } from "popper.js";
import * as react from "react";
import { SyntheticEvent, useEffect, useState,Component} from "react";
import React = require("react");
import { Redirect } from "react-router-dom";
import { Button,Message,Form,Header,Container, Segment,Grid} from "semantic-ui-react";


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
         
        <div className="ui placeholder segment">
           
            <div className="ui two column very relaxed stackable grid landpage-image">
                <div className="column">
                  
                    <form onSubmit={submit} className="ui form">
                        <h3 className="header grey centered"> Edit User Info</h3>
                        <div className=" six wide field">
                            <label>Email</label>
                            <div className="ui left icon input">
                                <input type="email"
                                    name="email"
                                    placeholder={props.email}
                                    onChange={e => setEmail(e.target.value)} />
                                    <i className="email icon"></i>
                                                </div>
                        </div>

                        <div className=" six wide field">
                            <label>First Name</label>
                            <div className="ui left icon input">
                                <input type="text"
                                    name="first name"
                                    placeholder={datafirstname}
                                    onChange={e => setFirstName(e.target.value)} />
                                <i className="user icon"></i>
                            </div>
                        </div>

                        <div className=" six wide field">
                            <label>Last Name</label>
                            <div className="ui left icon input">
                                <input type="text"
                                    name="last name"
                                    placeholder={datalastname}                                  
                                    onChange={e => setLastName(e.target.value)} />
                                <i className="user icon"></i>
                            </div>
                        </div>

                        <div className=" six wide field">
                            <label>Date of Birthday</label>
                            <div className="ui left icon input">
                                <input type="data"
                                    name="date of birthday"
                                    placeholder={datadateOfBirth}
                                    onChange={e => setDateOfBirth(e.target.value)} />
                                <i className="email icon"></i>
                            </div>
                        </div>

                        <div className=" six wide field">
                            <label>Nationality</label>
                            <div className="ui left icon input">
                                <input type="text"
                                    name="nationality"
                                    placeholder={datanationality}
                                   
                                    onChange={e => setNationality(e.target.value)} />
                                <i className="user icon"></i>
                            </div>
                        </div>

                            
                        <button className="ui button" type="submit" color="tail">Submit</button>
                            </form>
                        </div>
                        <div className="middle aligned column">
                            <div className="ui big button">
                        <div>
                            Account Balance
                        </div>
                        <p>{dataPLN} PLN</p>
                        <p>{dataEUR} EUR</p>
                            </div>
                        </div>
                    </div>
                    <div className="ui vertical divider">
                      
                    </div>
                </div>
     
           
        
    );
};
export default EditUser;