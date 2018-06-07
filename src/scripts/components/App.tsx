import * as React from 'react';

export default class App extends React.Component<any, any> {
  public clickHandler() {
    if (typeof (Worker) !== "undefined") {
      const webWorker = new Worker("./worker.js")
      webWorker.addEventListener("message", (event) => {
        if (event.data === "Done!") {
          console.log("yay,done")
          webWorker.terminate()
        }
      })
      webWorker.postMessage("start")
    } else { console.error("can't use WebWorkers: browser too old?"); }
  }
  public render() {
    return (
      <div>Hello World<br />
        <button onClick={this.clickHandler}>
          Start Web Worker
        </button></div>
    );
  }
}
