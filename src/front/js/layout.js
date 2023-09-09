import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import SingleMovie from "./pages/SingleMovie";
import LandingPage from "./pages/LandingPage";
import { Home } from "./pages/home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Movies from "./pages/Movies";
import Playlist from "./pages/Playlist";
import UserProfile from "./pages/UserProfile";
import TermsOfUse from "./pages/TermsOfUse";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import FAQs from "./pages/FAQs";
import RestrictedAccess from "./pages/RestrictedAccess";
import PasswordRecovery from "./pages/PasswordRecovery";
import PasswordReset from "./pages/PasswordReset";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";


//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;


    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <NavbarConditional />
                    <Routes>
                        <Route element={<Login />} path="/login" />
                        <Route element={<SignUp />} path="/signup" />
                        <Route element={<Movies />} path="/movies" />
                        <Route element={<Playlist />} path="/watchlist" />
                        <Route element={<UserProfile />} path="/userprofile" />
                        <Route element={<LandingPage />} path="/" />
                        <Route element={<PasswordReset />} path="password-reset/:token" />
                        <Route element={<SingleMovie />} path="/movie/:theid" />
                        <Route element={<h1>Not found!</h1>} />
                        <Route element={<TermsOfUse />} path="/terms-of-use" />
                        <Route element={<PrivacyPolicy />} path="/privacy-policy" />
                        <Route element={<FAQs />} path="/faqs" />
                        <Route element={<RestrictedAccess />} path="/restricted-access" />
                        <Route element={<PasswordRecovery />} path="/password-recovery" />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

const NavbarConditional = () => {
    const location = useLocation();

    // Renders navbar if it isn't landing page
    if (location.pathname !== "/") {
        return <Navbar />;
    }
    return null; // 
};

export default injectContext(Layout);
