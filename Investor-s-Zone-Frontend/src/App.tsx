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
import ProtectedRoute from "./components/hoc/ProtectedRoute";
import { Route, Routes } from "react-router-dom";

function App() {
    const [email, setEmail] = useState("");

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch('https://localhost:44349/api/account', {
                    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                    credentials: "include",
                });
                const content = await response.json();
                setEmail(content.email);
            } catch (_e) {
                // backend not available
            }
        })();
    }, []);

    return (
        <Layout>
            <NavMenu email={email} setEmail={setEmail} />
            <main>
                <Routes>
                    <Route path="/" element={<Home email={email} />} />
                    <Route path="/login" element={<Login setEmail={setEmail} />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/currency/:currency" element={<CurrencyPage />} />
                    <Route path="/profile" element={
                        <ProtectedRoute email={email}><Profile /></ProtectedRoute>
                    } />
                    <Route path="/forum" element={
                        <ProtectedRoute email={email}><ForumMain email={email} /></ProtectedRoute>
                    } />
                    <Route path="/account/:email" element={
                        <ProtectedRoute email={email}><EditUser email={email} /></ProtectedRoute>
                    } />
                    <Route path="/account/topup/:email" element={
                        <ProtectedRoute email={email}><TopUp email={email} /></ProtectedRoute>
                    } />
                    <Route path="/account/exchange/:email" element={
                        <ProtectedRoute email={email}><Exchange email={email} /></ProtectedRoute>
                    } />
                </Routes>
            </main>
        </Layout>
    );
}

export default App;
