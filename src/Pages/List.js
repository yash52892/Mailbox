const List=(props)=>{

    return (
        <table className="table email-table no-wrap table-hover v-middle mb-0 font-14">
          <tbody>
            <tr>
              {/* <!-- label --> */}
              <td className="pl-3">
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="cst1"
                  />
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
