import React, { Component } from "react";

export class DisplayTableHome extends Component {

renderTableData=()=> {
  return this.props.HomeTable.rows.map((iter) => {
     return (
        <tr >
           <td>{iter.userId}</td>
           <td>{iter.firstName}</td>
           <td>{iter.lastName}</td>
           <td>{iter.phoneNumber}</td>
           <td>{iter.emailAddress}</td>
        </tr>
     )
  })
}
  render() {
    return (
      <div>
          <h1 id='title'>React Dynamic Table</h1>
          <table id='students'>
              <tbody>
                {this.renderTableData()}
              </tbody>
          </table>
      </div>
    )
  }
}

export default DisplayTableHome ;