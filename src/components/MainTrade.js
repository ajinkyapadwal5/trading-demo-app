import React from "react";
import { connect } from "react-redux";
import TradeChildComponent from "./TradeChildComponent";
import { SET_MSG } from "../actions";
class Maintrade extends React.Component {
  state = {
    dataFromServer: [],
    oldDataFromServer: [],
    time: new Date()
  };
  // instance of websocket connection as a class property
  ws = new WebSocket("ws://stocks.mnet.website");

  
  shouldComponentUpdate(nextProps, nextState) {
   
    var values = nextState.dataFromServer.toString().split(",");
    var obj = {};
    for (var i = 0; i < values.length; i++) {
      var keyValue = values[i].split("=");
      obj[keyValue[0]] = keyValue[1];
    }
    return this.state.dataFromServer !== obj;
  }
  //componentDidMount
  componentWillMount() {
    this.ws.onopen = () => {
      // on connecting,
      console.log("connected successfully!!");
    };

    this.ws.onmessage = evt => {
      var dt = new Date();

      // listen to data sent from the websocket server
      let oldmessage = this.state.dataFromServer;
      let message = JSON.parse(evt.data);
      this.props.SET_MSG(message);
      comparevalue(message, oldmessage, dt);
      this.setState({ dataFromServer: message, oldDataFromServer: oldmessage });
    };

    this.ws.onclose = () => {
      console.log("disconnected");

      this.ws.close();
    };
  }

  render() {
    return (
      <div>
        <h3>STOCK DETAILS TABLE</h3>
        <div className="container">
          <div className="row">
            <div className="col-md-12 mx-auto">
              <TradeChildComponent
                websocket={this.ws}
                msg={this.state.dataFromServer}
                oldmsg={this.state.oldDataFromServer}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function comparevalue(newvalue, oldvalue, dt) {
  return newvalue.map((item, i) => {
    return oldvalue.map((item1, i) => {
      let value = item[1];
      let value1 = item1[1];
      let dt1 = new Date();
      if (value > value1) {
        item["color"] = "green";

        item["secs"] = (dt1.getTime() - dt.getTime()) / 1000;
      } else if (value === value1) {
        item["color"] = "black";
        // let dt1 = new Date();
        item["secs"] = 0;
      } else {
        item["color"] = "red";
        //   let dt1 = new Date();
        item["secs"] = (dt1.getTime() - dt.getTime()) / 1000;
      }
    });
  });
}
function mapDispatchToProps(dispatch) {
  return {
    SET_MSG: msg => dispatch(SET_MSG(msg))
  };
}

export default connect(null, mapDispatchToProps)(Maintrade);
