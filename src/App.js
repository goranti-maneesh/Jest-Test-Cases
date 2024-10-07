import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import FormApiComponent from "./components/FormApiComponent/index.tsx";
import DisplayDetailsComponent from "./components/DisplayDetailsComponent/index.tsx";
import "./App.css";

function App() {
	return (
		<Router>
			<div className="App">
				<Switch>
					<Route exact path="/" component={FormApiComponent} />
					<Route
						exact
						path="/submitted-details"
						component={DisplayDetailsComponent}
					/>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
