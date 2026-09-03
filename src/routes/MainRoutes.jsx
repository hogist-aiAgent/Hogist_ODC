// MainRoutes.js
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import OdcPage from '../Pages/ODCPage/odcPage';
import MenuPage from '../Pages/MenuPage/menuPage';
import MenuDetailPage from '../Pages/MenuDetailPage/menuDetailPage';
import MyPlanPage from '../Pages/MyPlan/MyPlanPage';
import EventDetailsPage from '../Pages/EventDetails/EventDetailsPage';
import ScrollToTop from '../components/Common/ScrollToTop/ScrollToTop';
import PaymentPage from '../Pages/Payment/PaymentPage';

const MainRoutes = () => {
    return (
        <BrowserRouter>
     
        <ScrollToTop/>
        <Routes>

            <Route path='/' element={<OdcPage/>}/>
            <Route path='/Menu' element={<MenuPage/>}/>
            <Route path='/menu-detail/:restaurantId' element={<MenuDetailPage/>}/>
            <Route path='/my-plan' element={<MyPlanPage/>}/>
            <Route path='/event-details' element={<EventDetailsPage/>}/>
            <Route path='/payment' element={<PaymentPage/>}/>

        </Routes>
        </BrowserRouter>
    );
}

export default MainRoutes;