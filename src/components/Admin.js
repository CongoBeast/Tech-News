import React , { useState, useEffect }  from 'react';
import ArticleTable from './ArticleTable';
import MetricsCards from './MetricsCards';
import { Link, useLocation } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";
import axios from 'axios';


function Admin() {

  const [stats, setStats] = useState({
    numberOfPosts: 0,
    numberOfDrafts: 0,
    numberOfPostsThisWeek: 0
  });

  const [funding , setFunding] = useState();
  
  
  useEffect(() => {
    fetchStats();
    fetchFunding();
  }, []);
  
  const fetchStats = () => {
    axios.get('http://localhost:3001/get-stats')
      .then(response => {
        setStats(response.data);
      })
      .catch(error => {
        console.error('Error fetching stats:', error);
      });
  };

  const fetchFunding = () => {
    axios.get('http://localhost:3001/funding-news')
      .then(response => {
        setFunding(response.data);
      })
      .catch(error => {
        console.error('Error fetching stats:', error);
      });
  };

  console.log()

  const metrics = [
  { label: 'Number of Posts', value: stats.numberOfPosts },
  { label: 'Number of Drafts', value: stats.numberOfDrafts },
  { label: 'Posts this week', value: stats.numberOfPostsThisWeek },
  { label: 'Funding Posts', value: 25 },
];

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Welcome, Admin</h1>
      <MetricsCards metrics={metrics} />
      {/* <button className="btn btn-primary my-4"></button> */}
      <Button
            as={Link}
            to="/article-entry"
            className="text-left align-items-center btn btn-primary my-4"
            style={{ marginBottom: "1rem" , marginRight: "1rem" }}
          >
            Write Article
          </Button>
        <Button 
        as={Link}
        to="/funding-entry"
        className="text-left align-items-center btn btn-success my-4">
            Funding Entry
        </Button>
      <ArticleTable />
    </div>
  );
}

export default Admin;
