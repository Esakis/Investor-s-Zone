import * as react from "react";
import { SyntheticEvent, useEffect, useState } from "react";
import React = require("react");
import { Link, Redirect } from "react-router-dom";

export default function () {
    return (
        <div>
            <h2>We couldn't find that page</h2>
            <Link to="/">Return to homepage</Link>
        </div>
    );
}