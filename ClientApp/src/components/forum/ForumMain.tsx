//import { data } from "jquery";
import React, { SyntheticEvent, useEffect, useState } from "react";
//import { Redirect } from "react-router-dom";
import '../user/NavMenu.css';


const ForumMain = () => {


    const [dataid, setDataid] = useState('');

    const [forumData, setForumData] = useState([]);
    // const [redirect, setRedirect] = useState(false);

    var stringPostTable = "";

    useEffect(() => {
        (
            async () => {
                const response = await fetch('https://localhost:44349/api/forum/forum', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                    credentials: "include",

                });
                const content = await response.json();
                console.log(content);
                setForumData(content);

            }
        )();

    });

    return (
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Post</th>
                </tr>
            </thead>


            {forumData.map((row) => (
                <tr>
                    <td>
                        {row.title}
                    </td>
                    <td>
                        {row.post}
                    </td>
                </tr>
            ))}
        </table>
    )
}
export default ForumMain;