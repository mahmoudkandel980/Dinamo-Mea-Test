import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/header/header";
import Posts from "./pages/Posts";
import CreateEditPost from "./pages/CreateEditPost";
import SuccessNotifications from "./components/posts/SuccessNotifications";

function App() {
    return (
        <main className='main'>
            <SuccessNotifications />
            <Header />
            <Routes>
                <Route path='/' element={<Posts />} />
                <Route path='/post/:process' element={<CreateEditPost />} />
            </Routes>
        </main>
    );
}

export default App;
