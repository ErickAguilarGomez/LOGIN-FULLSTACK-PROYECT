import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/home";
import injectContext from "./store/appContext";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import SingUp from "./pages/SingUp.jsx";
import Private from "./pages/Private.jsx";

const Layout = () => {
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<SingUp/>} path="/singup" />
                        <Route element={<Private/>} path="/private" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
