import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import List from "./List";


const Inbox = (props) => {
  const nav = useNavigate();
  const [mails, setMails] = useState({});
  const email = localStorage.getItem("user");
  const user = email.replace(/[^a-zA-Z ]/g, "");
  useEffect(() => {
    fetch(`https://mailbox-cabc3-default-rtdb.firebaseio.com/${user}.json`).then(
      (res) => res.json().then((data) => setMails(data))
    )},[user]);
    console.log(mails); 
    const arr = Object.entries(mails);
    console.log(arr);
    const inboxmail = arr.map((i) => (<List mail={{key:i[0],email: i[1].email,sub: i[1].sub,message: i[1].message,minute: i[1].minute,date: i[1].date, markAsRead:i[1].markAsRead}}/>));
  const handleCompose = () => {nav("/compose");};
  return (
    <>
      <div className="card">
          <h2 className="text-blue pb-3">Inbox</h2>
          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane active show"
              id="inbox"
              aria-labelledby="inbox-tab"
              role="tabpanel"
            >
              <div>
                <div className="row p-4 no-gutters align-items-center">
                  <div className="col-sm-12 col-md-6">
                    <h3 className="font-light mb-0">
                      <i className="ti-email mr-2"></i>Emails
                    </h3>
                  </div>
                  <div className="col-sm-12 col-md-6">
                    <ul className="list-inline dl mb-0 float-left float-md-right">
                      <li className="list-inline-item text-info mr-3">
                          <button
                            className="btn btn-circle btn-success text-white"
                            onClick={handleCompose}
                          >
                            <i className="fa fa-plus"></i>
                          </button>
                          <span className="ml-2 font-normal text-dark">
                            Compose
                          </span>
                      </li>
                      <li className="list-inline-item text-danger">
                       
                          <button className="btn btn-circle btn-danger text-white">
                            <i className="fa fa-trash"></i>
                          </button>
                          <span className="ml-2 font-normal text-dark">
                            Delete
                          </span>
                     
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            {inboxmail}
          </div>
        </div>
        
      </div>
    </>
  );
};
export default Inbox;
