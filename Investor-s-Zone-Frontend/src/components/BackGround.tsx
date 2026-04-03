
import React = require("react");

import  { Fragment } from 'react'
import { withRouter } from 'react-router-dom';

const BackGround = (props) => {
    const URL =
        'https://images.unsplash.com/photo-1579621970795-87facc2f976d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80'
    return (
        <Fragment>
            <div style={{
                backgroundImage: `url(${URL})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: `cover`,
                minHeight: '100%',
                

            }}>
                {props.children}
            </div>
        </Fragment>
    )
}

export default withRouter(BackGround);