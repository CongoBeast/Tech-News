import React from 'react';
import { HashRouter, Routes, Route, Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/styles.css';
import Sidebar from './components/Sidebar';
import Trends from './components/Trends';
import About from './components/About';
import Region from './components/Region';
import Home from './components/Home';
import Admin from './components/Admin';
import Funding from './components/Funding';
import StartupCard from './components/startupCard';
import FundingAnalysis from './components/FundingAnalysis';
import ArticlesPage from './components/ArticlesPages';
import FundingPage from './components/FundingPage';
import ArticleEntry from './components/ArticleEntry';
import FundingEntry from './components/fundingEntry'; // Import the ArticleEntry component
import RegionArticles from './components/RegionArticles';
import AuthPage from './components/AuthPage';
import ProtectedRoute from './components/ProtectedRoute';
import TopNavBar from "./components/TopNavBar";


function App() {
  return (
    <HashRouter> {" "}
      <div className="d-flex">
        <Sidebar />
        
        <div className="container-fluid">
        <TopNavBar />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/trends" element={<Trends />} />
            <Route path="/about" element={<About />} />
            <Route path="/region" element={<Region />} />
            {/* <Route path="/admin" element={<Admin />} /> */}
            <Route path="/funding" element={<Funding />} />
            <Route path="/fundinganalysis" element={<FundingAnalysis />} />
            <Route path="/startup/:name" element={<StartupCard />} />

            <Route path='/funding-page' element={<FundingPage />}/>
            <Route path='/articles-pages' element={<ArticlesPage/>}/>

            <Route path="/edit-article/:id" component={ArticleEntry} />
            <Route path="/edit-funding/:id" component={FundingEntry} />

            <Route element={<ProtectedRoute />}>
              <Route path="/admin" element={<Admin />} />
            </Route>

            <Route path="/auth" element={<AuthPage />} />
            <Route path="/article-entry" element={<ArticleEntry />} />
            <Route path="/funding-entry" element={<FundingEntry />} /> {/* Add the route for the article entry page */}
            <Route path="/region/:region" element={<RegionArticles />} />  {/* Add RegionArticles route */}
          </Routes>
        </div>
      </div>
      </HashRouter>
  );
}

export default App;
