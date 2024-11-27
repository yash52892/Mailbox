import {useReducer} from "react"
import Badge from 'react-bootstrap/Badge';
import { useNavigate, useLocation } from "react-router-dom";

const List=(props)=>{
  const nav = useNavigate();
  const location=useLocation();
  const email = localStorage.getItem("user");
  const user = email.replace(/[^a-zA-Z ]/g, "");
  console.log(location);
  const init={...props};
  
  const handleMark=()=>{
    if(init.mail.markAsRead!==true)
    dispatch({ type: 'read' });
  }
  const handleDelete = (props) =>{
    console.log(user);
    dispatch({ type: 'delete' });
  }
  const changeStyle=(state, action)=>{
   console.log(state, action);
    if(action.type==='read')
    {
      fetch(`https://mailbox-cabc3-default-rtdb.firebaseio.com/${location.pathname}/${user}/${state.init.mail.key}.json`
        ,{
        method:"PUT",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify({...state.init.mail,markAsRead:true}),
      }
    ).then(console.log(state))
    }
    if(action.type==='delete')
      {
        fetch(`https://mailbox-cabc3-default-rtdb.firebaseio.com/${location.pathname}/${user}/${state.init.mail.key}.json`
          ,{
          method:"DELETE",
          headers:{
            "Content-Type":"application/json",
          }
        }
      ).then
      (nav("/home"));
    }
  }
   const [state, dispatch]=useReducer(changeStyle, {init})
    return (
        <table className="table-primary table email-table no-wrap table-hover v-middle mb-0 font-14">
          <tbody>
            <tr>
              {/* <!-- label --> */}
              <td className="pl-3" onClick={handleMark}>
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                  />
                  {!props.mail.markAsRead ? <span data-testid="mark" className="p-1 m-4 bg-danger border rounded-circle"></span>: <span data-testid="unmark"></span>}
                  <label className="custom-control-label" htmlFor="cst1">
                    &nbsp;
                  </label>
                </div>
                
              </td>
              <td>
                <i className="fa fa-star text-warning"></i>
              </td>
              <td>
                <span className="mb-0 text-muted">{props.mail.email}</span>
              </td>
              <td>
                  <span className="badge badge-pill text-white font-medium badge-danger mr-2">
                    {}
                  </span>
                  <span className="text-dark">{props.mail.sub}</span>
              </td>
              <td>
                <i className="fa fa-paperclip text-muted"></i>
              </td>
              <td className="text-muted">{props.mail.date}:{props.mail.minute}</td>
              <button onClick={handleDelete}>
              <Badge bg="dark">Delete</Badge>
                          </button>
            </tr>
          </tbody>
        </table>
    )
}

export default List;
