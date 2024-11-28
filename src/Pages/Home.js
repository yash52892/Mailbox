import { Link, Outlet } from "react-router-dom";
import "./Home.css";
import Badge from 'react-bootstrap/Badge';
import { useState, useEffect } from "react";

const Home = (props) => {
  const [n, setN]=useState();
  const email = localStorage.getItem("user");
  const user = email.replace(/[^a-zA-Z ]/g, "");

setInterval(() => { 
     //const n=useFetch(`https://mailbox-cabc3-default-rtdb.firebaseio.com/home/inbox/${user}.json`);
       fetch(`https://mailbox-cabc3-default-rtdb.firebaseio.com/home/inbox/${user}.json`).then(
         (res) => res.json().then((data) => setN(data)))
    }, 10000);
let x= Object.keys(n || {}).length;
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="card-body bg-primary text-white mailbox-widget pb-0">
            <h2 className="text-white pb-3">Mailbox</h2>
            <ul
              className="nav nav-tabs custom-tab border-bottom-0 mt-4"
              id="myTab"
              role="tablist"
            >
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  id="inbox"
                  to="/home/inbox"
                  data-toggle="tab"
                  aria-controls="inbox"
                  role="tab"
                  aria-selected="true"
                >
                  <span className="d-block d-md-none">
                    <i className="ti-email"></i>
                  </span>
                  <span className="d-none d-md-block"> INBOX
                  <Badge bg="secondary">{x}</Badge>
                  </span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  id="sent"
                  to="/home/sent"
                  data-toggle="tab"
                  aria-controls="sent"
                  role="tab"
                  aria-selected="false"
                >
                  <span className="d-block d-md-none">
                    <i className="ti-export"></i>
                  </span>
                  <span className="d-none d-md-block">SENT
                  <Badge bg="secondary">0</Badge>
                  </span>
                </Link>
              </li>
            </ul>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
