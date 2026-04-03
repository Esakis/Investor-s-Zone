import { useEffect, useState } from "react";
import '../user/NavMenu.css';


const ForumMain = () => {
    const [forumData, setForumData] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch('https://localhost:44349/api/forum/forum', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                    credentials: "include",
                });
                const content = await response.json();
                setForumData(content);
            } catch (_e) {
                // backend not available
            }
        })();
    }, []);

    return (
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Post</th>
                </tr>
            </thead>


            <tbody>
            {forumData.map((row: any, index: number) => (
                <tr key={index}>
                    <td>
                        {row.title}
                    </td>
                    <td>
                        {row.post}
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}
export default ForumMain;