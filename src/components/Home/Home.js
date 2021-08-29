import React, { useState } from 'react';
import "../../assets/plugins/nucleo/css/nucleo.css"
import "../../assets/plugins/nucleo/css/home.scss"
import "@fortawesome/fontawesome-free/css/all.min.css";
import { ReactComponent as User } from 'assets/img/home-img/Person.svg'
import { ReactComponent as Logout } from 'assets/img/home-img/logout.svg'
import { ReactComponent as Comments } from 'assets/img/home-img/comments.svg'
import hindi  from 'assets/img/home-img/hindi.png'
import german  from 'assets/img/home-img/german.png'
import mathematics  from 'assets/img/home-img/mathematics.png'
import english  from 'assets/img/home-img/english.png'
import history  from 'assets/img/home-img/history.png'
import { ReactComponent as Check } from 'assets/img/home-img/check.svg'
import { ReactComponent as Video } from 'assets/img/home-img/video.svg'
import { ReactComponent as Upload } from 'assets/img/home-img/upload.svg'
import { ReactComponent as Download } from 'assets/img/home-img/download.svg'
import { ReactComponent as Eye } from 'assets/img/home-img/eye.svg'
import { ReactComponent as EyeBlack } from 'assets/img/home-img/eye-black.svg'
import classnames from 'classnames';

import {
    Button,
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink,
    Table,
    Collapse
  } from "reactstrap";
  
const Home = () => {
    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
      if(activeTab !== tab) setActiveTab(tab);
    }
    const [isOpen, setIsOpen] = useState(true);

    const showtoggle = () => setIsOpen(!isOpen);
  return (
    <>
      <div>
          <header className="home-header">
              <div className="container">
                  <div className="header-content">
                      <div className="header-left">
                          <h2>My Gurokool (BETA) Why My Gurukool (BETA)</h2>
                      </div>
                      <div className="header-right">
                          <ul>
                              <li>
                                  <a href="">
                                    <User/>
                                    Demo User
                                  </a>
                              </li>
                              <li>
                              <Button
                                className="btn-red"
                                color="info"
                                size="sm"
                            >
                                <Logout/>
                                Logout
                            </Button>
                              </li>
                          </ul>
                      </div>
                  </div>
              </div>
          </header>
          <section className="mt-5">
              <div className="container">
                  <div className="section-header border-shadow">
                        <select className="green-select">
                            <option>School Demo</option>
                        </select>
                        <Button
                                className="btn-red bg-yellow txt-black"
                                color="info"
                                size="sm"
                            >
                                <Comments/>
                                Conference
                            </Button>
                  </div>
              </div>
          </section>
          <section className="mt-5 tab-section"> 
            <div className="container">
            <Nav tabs>
                <NavItem>
                <NavLink
                    className={classnames({ active: activeTab === '1' })}
                    onClick={() => { toggle('1'); }}
                >
                    <div className="tab-icon">
                    <img src={english} alt="Logo" />
                    </div>
                        <h3>English</h3>
                </NavLink>
                </NavItem>
                <NavItem>
                <NavLink
                    className={classnames({ active: activeTab === '2' })}
                    onClick={() => { toggle('2'); }}
                >
                    <div className="tab-icon">
                    <img src={german} alt="Logo" />
                    </div>
                        <h3>German</h3>
                </NavLink>
                </NavItem>
                <NavItem>
                <NavLink
                    className={classnames({ active: activeTab === '3' })}
                    onClick={() => { toggle('3'); }}
                >
                    <div className="tab-icon">
                    <img src={hindi} alt="Logo" />
                    </div>
                        <h3>Hindi</h3>
                </NavLink>
                </NavItem>
                <NavItem>
                <NavLink
                    className={classnames({ active: activeTab === '4' })}
                    onClick={() => { toggle('4'); }}
                >
                    <div className="tab-icon">
                    <img src={history} alt="Logo" />
                    </div>
                        <h3>History</h3>
                </NavLink>
                </NavItem>
                <NavItem>
                <NavLink
                    className={classnames({ active: activeTab === '5' })}
                    onClick={() => { toggle('5'); }}
                >
                    <div className="tab-icon">
                    <img src={mathematics} alt="Logo" />
                    </div>
                        <h3>Mathematics</h3>
                </NavLink>
                </NavItem>
            </Nav>
        <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
                <div className={isOpen ? "accordian-header icon-rotate" : "accordian-header"} onClick={showtoggle} >
                    <h2 className="accordian-title">Grammer Part II </h2>
                    <div className="accordian-date">
                    <span>Date:</span> 22-12-2020
                    </div>
                </div> 
                <Collapse isOpen={isOpen}>
                <div className="accordian-body">
                    <div className="accordian-content">
                        <div className="flex-row">
                            <h2>Exercise Instruction</h2>
                            <Button
                                className="btn-red bg-yellow txt-black"
                                color="info"
                                size="sm"
                            >
                                <Check/>
                                Turn In
                            </Button>
                        </div>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                        <Button
                                className="btn-red bg-yellow txt-black"
                                color="info"
                                size="sm"
                            >
                                <Video/>
                                Watch video
                            </Button>

                           <div className="border-top">
                               <div className="accordian-header tbl-header">
                                   <h2>Hausaufgabe - Grammatic</h2>
                                   <div>
                                   <Button
                                        className="btn-red bg-green txt-black"
                                        color="info"
                                        size="sm"
                                    >
                                        <Eye/>
                                        
                                    </Button>
                                    <Button
                                        className="btn-red bg-green txt-black"
                                        color="info"
                                        size="sm"
                                    >
                                        <Download/>
                                        
                                    </Button>
                                    <Button
                                        className="btn-red bg-green txt-white"
                                        color="info"
                                        size="sm"
                                    >
                                        <Upload className="mr-2"/>
                                        Upload Exercise
                                    </Button>
                                   </div>
                               </div>
                           <Table  striped  hover className="mt-4 custom-table">
                                <thead>
                                    <tr>
                                    <th>File Name</th>
                                    <th>View</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                    <td>File.pdf</td>
                                    <td> <EyeBlack/></td>
                                    </tr>
                                    <tr>
                                    <td>File.pdf</td>
                                    <td> <EyeBlack/></td>
                                    </tr>
                                    <tr>
                                    <td>File.pdf</td>
                                    <td> <EyeBlack/></td>
                                    </tr>
                                    <tr>
                                    <td>File.pdf</td>
                                    <td> <EyeBlack/></td>
                                    </tr>
                                    <tr>
                                    <td>File.pdf</td>
                                    <td> <EyeBlack/></td>
                                    </tr>
                                    
                                </tbody>
                                </Table>
                           </div>
                    </div>
                </div>
                </Collapse>
                
            </TabPane>
            <TabPane tabId="2">
            dsds
             </TabPane>
            <TabPane tabId="3">
                3
            </TabPane>
            <TabPane tabId="4">
                4
            </TabPane>
            <TabPane tabId="5">
                5
            </TabPane>
        </TabContent>
            </div>
          </section>
      </div>

    </>
  );
};

export default Home;