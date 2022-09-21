import React from "react";
import "./App.css";
import Spiritomb from "./assets/images/Spiritomb.png";
import Shuckle from "./assets/images/Shuckle.png";

function App(): JSX.Element {
    return (
        <div className="App">
            <header className="App-header">
                <div>
                    <img src={Spiritomb} width="200px"></img>
                    Comprehensive Shiny Hunting Guide
                    <img src={Shuckle} width="200px"></img>
                </div>
            </header>
            <p>
                Edit <code>src/App.tsx</code> and save. This page will
                automatically reload.
            </p>
        </div>
    );
}

export default App;
