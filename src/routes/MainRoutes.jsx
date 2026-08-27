// MainRoutes.js
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import OdcPage from '../Pages/ODCPage/odcPage';
import MenuPage from '../Pages/MenuPage/menuPage';
import MenuDetailPage from '../Pages/MenuDetailPage/menuDetailPage';

const MainRoutes = () => {
    return (
        <BrowserRouter>
     
        <Routes>

            <Route path='/' element={<OdcPage/>}/>
            <Route path='/Menu' element={<MenuPage/>}/>
            <Route path='/menu-detail/:restaurantId' element={<MenuDetailPage/>}/>

        </Routes>
        </BrowserRouter>
    );
}

export default MainRoutes;
