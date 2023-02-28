import { render } from '@testing-library/react';
import React from 'react'
import { NavLink } from 'react-bootstrap';
import ReactDOM from 'react-dom/client';
import { Link, useLocation } from 'react-router-dom';
import ContentWrapper from '../../components/ContentWrapper';
import Users from '../../components/users/Users';


const PresidentSideBar = () => {
    const location=useLocation

    
    
    const choosenContent=(e)=>{
        e.preventDefault();
        console.log('section')
        
        // const wrapper = document.getElementById('content-wrapper');
        // console.log(wrapper)
        // wrapper.innerHTML='';
        // console.log('after remove   ',wrapper)
        // wrapper.innerHTML=<ContentWrapper content={"section"}/>
        //  wrapper = document.getElementById('content-wrapper');
        // console.log('after remove   ',wrapper)

    }
   


  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      {/* Brand Logo */}
      <a href="/admin/dashboard" className="brand-link">
        <img  className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
        <span className="brand-text font-weight-light">President Dashboard</span>
      </a>
   

      {/* Sidebar */}
      <div className="sidebar">
        {/* Sidebar user panel (optional) */}
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img  src='https://pixy.org/src/120/thumbs350/1206832.jpg' className="img-circle elevation-2" />
          </div>
          <div className="info">
            <a href="#" className="d-block">Alexander Pierce</a>
          </div>
        </div>
        {/* SidebarSearch Form */}
        <div className="form-inline">
          <div className="input-group" data-widget="sidebar-search">
            <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
            <div className="input-group-append">
              <button className="btn btn-sidebar">
                <i className="fas fa-search fa-fw" />
              </button>
            </div>
          </div>
        </div>










        {/* Sidebar Menu */}
        <nav className="mt-2">
          <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
            {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
            <li className="nav-item menu-open">
              <a href="#" className="nav-link active">
                <i className="nav-icon fas fa-tachometer-alt" />
                <p>
                  Dashboard
                  <i className="right fas fa-angle-left" />
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <a href="/president/dashboard" className="nav-link active">
                    <i className="far fa-circle nav-icon" />
                    <p>Dashboard</p>
                  </a>
                </li>
            
              </ul>
            </li>
            <li className="nav-item">
              <Link to={'/president/MyClub'}   className="nav-link">
                <i className="nav-icon fas fa-briefcase" />
                <p>
                 My Club
              
                </p>
              </Link>
            </li>
            <li className="nav-item">
            <Link to={'/president/events'}   className="nav-link">
                <i className="nav-icon fas fa-calendar" />
                <p>
                 Events
                </p>
              </Link>
            </li>



              <li className="nav-item">
              <Link to={'/president/clubs'}   className="nav-link">
                <i className="nav-icon fas fa-th-large" />
                <p>
                 Clubs           
                </p>
              </Link>
            </li>

              <li className="nav-item">
              <Link to={'/president/salles'}   className="nav-link">
                <i className="nav-icon fas fa-building" />
                <p>
                 Salles
                </p>
              </Link>
            </li>


        
          </ul>
        </nav>
        {/* /.sidebar-menu */}
      </div>
      {/* /.sidebar */}
    </aside>  )
}

export default PresidentSideBar