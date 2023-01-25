import React, { Component } from 'react';
import DataStreamer, { ServerRespond } from './DataStreamer';
import Graph from './Graph';
import './App.css';

/** Ultimately, I have adjusted the getDataFromServer function and some subsequent functions
 * to ensure that the code consistently requests data from the server every 100 ms while the app is running 
 */

//here i specify that the 'showGraph' property is a boolean
interface IState {
  data: ServerRespond[],
  showGraph: boolean, 
}

/**bc this component extends the IState interface, 
it must include the methods of the IState interface
so in the constructor, i make sure to declare the states
of data and showGraph */
class App extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      data: [],
      showGraph: false,
    };
  }


  /** Adjiust renderGraph to include the condition of if showGraph
   * returns true (or the start streaming button being pressed), to then render the image of the graph.
   */
  renderGraph() {
    if (this.state.showGraph){
      return (<Graph data={this.state.data}/>)
    } 
  }

  /** Adjust the getDataFromServert to get data from the server continuously
   * rather than only at the time the startStreaming button is pressed
   */

  getDataFromServer() {
    let k = 0; 
    const interval = setInterval(() => {
      /**
       * Create a counter interval k that increments 
       * under the following conditions 
       */
      DataStreamer.getData((serverResponds: ServerRespond[]) => {
        // Update the state by creating a new array of data that consists of
        // Previous data in the state and the new data from server
        this.setState({ 
          data: serverResponds, 
          showGraph: true,
        });
      });
      k++; 
      //Once the counter increments for the 1000th time call the clearInterval method 
      if (k > 1000){
        clearInterval(interval); 
      }
    }, 100);  
  }

  /**
   * Render the App react component
   */
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Bank & Merge Co Task 2
        </header>
        <div className="App-content">
          <button className="btn btn-primary Stream-button"
            onClick={() => {this.getDataFromServer()}}>
            Start Streaming Data
          </button>
          <div className="Graph">
            {this.renderGraph()}
          </div>
        </div>
      </div>
    )
  }
}

export default App;
