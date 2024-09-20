// frontend/src/CountryDetail.js
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function CountryDetail() {
	const { countryCode } = useParams(); // Capturamos el countryCode de la URL
	const [countryInfo, setCountryInfo] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (countryCode) {
			fetch(`http://localhost:5000/api/countries/${countryCode}`)
				.then((response) => response.json())
				.then((data) => {
					console.log(data); // Verifica la estructura de los datos aquí
					if (data) {
						setCountryInfo(data); // Asegúrate de que esta línea se ejecute con datos válidos
					} else {
						setError("Country data not found");
					}
					setLoading(false);
				})
				.catch((error) => {
					setError("Error fetching country info");
					setLoading(false);
				});
		} else {
			setError("Country code is undefined");
			setLoading(false);
		}
	}, [countryCode]);

	if (loading) {
		return <div>Loading country details...</div>;
	}

	if (error) {
		return <div>{error}</div>;
	}

	if (!countryInfo) {
		return <div>No country info found</div>;
	}

	return (
		<div className="container">
			{countryInfo ? (
				<div className="card">
					<h2>{countryInfo.populationData.country}</h2>
					<img src={countryInfo.flagUrl} alt={`Flag of ${countryInfo.name}`} />
					<h3>Bordering Countries:</h3>
					{countryInfo.borders && countryInfo.borders.length > 0 ? (
						<ul>
							{countryInfo.borders.map((border) => (
								<li key={border.countryCode}>
									<Link to={`/country/${border.countryCode}`}>
										{border.commonName}
									</Link>
								</li>
							))}
						</ul>
					) : (
						<p>No bordering countries found.</p>
					)}
					<h3>Population Data:</h3>
					{countryInfo.populationData &&
					countryInfo.populationData.populationCounts.length > 0 ? (
						<ul>
							{countryInfo.populationData.populationCounts.map((pop) => (
								<li
									key={pop.year}
								>{`Year: ${pop.year}, Population: ${pop.value}`}</li>
							))}
						</ul>
					) : (
						<p>No population data available.</p>
					)}
				</div>
			) : (
				<div>No country info found</div>
			)}
		</div>
	);
}

export default CountryDetail;
