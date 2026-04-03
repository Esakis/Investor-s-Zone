import { useEffect, useState } from "react";
import NavMenu from "./components/user/NavMenu";
import Login from "./components/user/Login";
import Home from "./components/Home";
import Register from "./components/user/Register";
import Profile from "./components/Profile";
import EditUser from "./components/user/EditUser";
import TopUp from "./components/user/TopUp";
import Exchange from "./components/user/Exchange";
import ForumMain from "./components/forum/ForumMain";
import { CurrencyPageWrapper as CurrencyPage } from "./components/CurrencyPage";
import Layout from "./components/Layout";
import { Route, Routes } from "react-router-dom";
import Clock from "./components/Clock";
import ModalExampleBasic from "./components/Modal";


function App() {

    const [email, setEmail] = useState("");

    useEffect(() => {
        (
            async () => {
                try {
                    const response = await fetch('https://localhost:44349/api/account', {
                        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                        credentials: "include",
                    });
                    const content = await response.json();
                    setEmail(content.email);
                } catch (e) {
                    // backend not available
                }
            }
        )();
    }, []);

    return (
        <Layout>
            <NavMenu email={email} setEmail={setEmail} />
            <ModalExampleBasic />
            <main className="form-signin">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/clock" element={<Clock />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/forum" element={<ForumMain />} />
                    <Route path="/account/:email" element={<EditUser email={email} />} />
                    <Route path="/account/topup/:email" element={<TopUp email={email} />} />
                    <Route path="/login" element={<Login setEmail={setEmail} />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/account/exchange/:email" element={<Exchange email={email} />} />
                    <Route path="/currency/:currency" element={<CurrencyPage />} />
                </Routes>
            </main>
        </Layout>
    );
}
export default App;
