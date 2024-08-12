import React, { useState, useEffect } from 'react';
import { Button, Table, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ArticleTable from './ArticleTable';


function ArticlesPages() {
  return (
    <div className="container">
      
      <ArticleTable/>
    </div>
  );
}

export default ArticlesPages;
