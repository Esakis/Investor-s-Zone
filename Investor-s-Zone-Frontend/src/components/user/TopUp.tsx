import { SyntheticEvent, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Button, Header, Form } from 'semantic-ui-react';

const TopUp = (props: { email: string }) => {


     const [dataPLN, setDataPLN] = useState('');
     const [dataEUR, setDataEUR] = useState('');
     const [email, setEmail] = useState('');
     const [pln, setPLN] = useState('');
    
     const [redirect, setRedirect] = useState(false);
 

    useEffect(() => {
        (
            async () => {
                const response = await fetch('https://localhost:44349/api/account/topup/' + props.email, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                    credentials: "include",

                });
                const content = await response.json();
                setDataPLN(content.pln);
                setDataEUR(content.eur);
            }
        )();

    }, [props.email]);



    const submitTopUp = async (e: SyntheticEvent) => {

        e.preventDefault();

        await fetch('https://localhost:44349/api/account/topup/' + props.email, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            body: JSON.stringify({
                email,
                pln
             //   eur
                //usd
              
                
               

            })
        });

        setRedirect(true);
    }

    if (redirect) {
        return <Navigate to={"/account/" + props.email} replace />;
    }

 


  
    return (
        
       
       
        <div className="ui page two column padded grid landpage-image">
            <div className="ui container column " >


                <div className=" ui segment left floated tertiary inverted padded">

                    <div className="ui segment">
                        <div className="ui message primary ">

                           
            <Form onSubmit={submitTopUp} unstackable>
                <Header as="h3">Top up your account </Header>
                <Form.Group widths={2}>
                    <Form.Input 
                   
                        placeholder={ props.email }
                        required
                        onChange={e => setEmail(e.target.value)} />

                    <Form.Input labelPosition='right' type='text'  placeholder={pln} required value={pln}
                        onChange={e => setPLN(e.target.value)} />
                </Form.Group>
                <Form.Checkbox label='I agree to the Terms and Conditions' />
                    <Button color='teal' type='submit'>Submit</Button>
            </Form>
            </div>

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
            </div >
                </div >
            </div >
        </div >
       


            


        
        



    )
    




           
}
export default TopUp;