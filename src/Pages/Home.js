import { Link, Outlet } from "react-router-dom";
import "./Home.css";

const Home = (props) => {
 
    
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
                  id="inbox-tab"
                  to="/home/inbox"
                  data-toggle="tab"
                  aria-controls="inbox"
                  role="tab"
                  aria-selected="true"
                >
                  <span className="d-block d-md-none">
                    <i className="ti-email"></i>
                  </span>
                  <span className="d-none d-md-block"> INBOX</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  id="sent-tab"
                  to="/home/sent"
                  data-toggle="tab"
                  aria-controls="sent"
                  role="tab"
                  aria-selected="false"
                >
                  <span className="d-block d-md-none">
                    <i className="ti-export"></i>
                  </span>
                  <span className="d-none d-md-block">SENT</span>
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
