import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import CountryDetail from "./CountryDetail";
import "./styles.css";

function App() {
	const [countries, setCountries] = useState([]);

	useEffect(() => {
		fetch("http://localhost:5000/api/countries")
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				setCountries(data);
			})
			.catch((error) => console.error("Error fetching countries:", error));
	}, []);

	return (
		<Router>
			<div className="App">
				<Routes>
					<Route
						path="/"
						element={
							<div className="container">
								<h1>Country List</h1>
								<ul>
									{countries.map((country) => (
										<li key={country.countryCode}>
											<Link to={`/country/${country.countryCode}`}>
												{country.name}
											</Link>
										</li>
									))}
								</ul>
							</div>
						}
					/>

					<Route path="/country/:countryCode" element={<CountryDetail />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
