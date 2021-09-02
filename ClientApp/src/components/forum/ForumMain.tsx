//import { data } from "jquery";
import React, { SyntheticEvent, useEffect, useState } from "react";
//import { Redirect } from "react-router-dom";
import '../user/NavMenu.css';


const ForumMain = () => {


    const [dataid, setDataid] = useState('');
    

   // const [redirect, setRedirect] = useState(false);


    useEffect(() => {
        (
            async () => {
                const response = await fetch('https://localhost:44349/api/forum/forum', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                    credentials: "include",

                });
                const content = await response.text();
                console.log(content);
                setDataid(content)
                //const data = JSON.parse(content)
               // console.log(data);
               // console.log(data.post);

            }
        )();

    });



    return (


        <div id="Main">

            <div id="EditData">
                <h5>Forum</h5>
                <label>{dataid}</label>
 
            </div>





        </div>
    )
}
export default ForumMain;