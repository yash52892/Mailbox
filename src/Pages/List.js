import {useReducer} from "react"

const List=(props)=>{

  const email = localStorage.getItem("user");
  const user = email.replace(/[^a-zA-Z ]/g, "");
  console.log(props);
  const init={...props};
  console.log(init);
  const handleMark=()=>{
    dispatch({ type: 'read' });
  }
  const changeStyle=(state, action)=>{
    console.log(state.init.mail, action); 
    if(action.type==='read')
    {
      console.log(action);
      fetch(`https://mailbox-cabc3-default-rtdb.firebaseio.com/${user}/${state.init.mail.key}.json`
        ,{
        method:"PUT",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify({...state.init.mail,markAsRead:true}),
      }
    ).then(console.log(state))
    } 
  }
   const [state, dispatch]=useReducer(changeStyle, {init})
    return (
        <table className="table-primary table email-table no-wrap table-hover v-middle mb-0 font-14">
          <tbody onClick={handleMark}>
            <tr>
              {/* <!-- label --> */}
              <td className="pl-3">
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="cst1"
                  />
                  {!props.mail.markAsRead ? <span className="p-1 m-4 bg-danger border rounded-circle"></span>: <span></span>}
                  <label className="custom-control-label" htmlFor="cst1">
                    &nbsp;
                  </label>
                </div>
                
              </td>
              {/* <!-- star --> */}
              <td>
                <i className="fa fa-star text-warning"></i>
              </td>
              <td>
                <span className="mb-0 text-muted">{props.mail.email}</span>
              </td>
              {/* <!-- Message --> */}
              <td>
                  <span className="badge badge-pill text-white font-medium badge-danger mr-2">
                    {}
                  </span>
                  <span className="text-dark">{props.mail.sub}</span>
              </td>
              {/* <!-- Attachment --> */}
              <td>
                <i className="fa fa-paperclip text-muted"></i>
              </td>
              {/* <!-- Time --> */}
              <td className="text-muted">{props.mail.date}:{props.mail.minute}</td>
            </tr>
          </tbody>
        </table>
    )
}

export default List;
