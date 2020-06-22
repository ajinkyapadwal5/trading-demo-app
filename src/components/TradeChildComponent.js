import React from "react";
import { Table } from "reactstrap";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
class TradeChildComponent extends React.Component {
  //data= {};
  sendMessage = () => {
    const { websocket } = this.props; // websocket instance passed as props to the child component.
    const data = "";

    try {
      websocket.send(data); //send data to the server
    } catch (error) {
      console.log(error); // catch error
    }
  };
  render() {
    return (
      <Table responsive striped hover style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Sr no</th>
            <th>Title </th>
            <th>Value</th>
            <th>Status</th>
            <th>Last Updated At</th>
          </tr>
        </thead>
        <tbody>{this.props.msg.map((item, i) => this.rowView(item, i))}</tbody>
      </Table>
    );
  }
  rowView(item, i) {
    let name = item[0];
    let value = item[1].toFixed(2);
    let color = item.color;
    let secs = item.secs;
    let key = Math.random();
    return (
      <tr>
        <th scope="row" key={key}>
          {i + 1}
        </th>
        <td>{name}</td> <td>{value}</td>
        <td>
          <span style={{ color: color }}>
            <FontAwesomeIcon icon={faChartLine} />
          </span>
        </td>
        <td>
          
          {secs > 0
            ? `Last updated ${secs} secs ago`
            : "No any changes in last value"}
        </td>
      </tr>
    );
  }
}

export default TradeChildComponent;
