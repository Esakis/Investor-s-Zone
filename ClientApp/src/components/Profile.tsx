import React from 'react';
import {connect} from "react-redux";

import {Route} from "react-router-dom";

const Profile = () => (
    <div style={{maxWidth:"550px",margin:"0px auto"}}>>
        <div style={{
            display:"flex",
            justifyContent:"space-around",
            margin:"18px 0px",
            borderBottom:"1px solid green"

            ,
        }}>
            <div>
                <div>
                    <img style={{width:"160px",height:"160px",borderRadius:"80px"}}
                         src='https://images.unsplash.com/photo-1522556189639-b150ed9c4330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'/>

                </div>
            </div>
            <h4>Jon Smith</h4>
        </div>
        <div className="gallery">

        </div>
    </div>

);

export default connect()(Profile);