const axios = require("axios");

// Get Available Countries
const getAvailableCountries = async (req, res) => {
	try {
		const response = await axios.get(
			"https://date.nager.at/api/v3/AvailableCountries"
		);
		res.json(response.data);
	} catch (error) {
		res.status(500).json({ error: "Error fetching available countries" });
	}
};

// Get Country Info
const getCountryInfo = async (req, res) => {
	const { countryCode } = req.params;
	try {
		const countryResponse = await axios.get(
			`https://date.nager.at/api/v3/CountryInfo/${countryCode}`
		);
		const populationResponse = await axios.post(
			"https://countriesnow.space/api/v0.1/countries/population",
			{ country: countryResponse.data.commonName }
		);
		const flagResponse = await axios.post(
			"https://countriesnow.space/api/v0.1/countries/flag/images",
			{ country: countryResponse.data.commonName }
		);

		res.json({
			borders: countryResponse.data.borders,
			populationData: populationResponse.data.data,
			flagUrl: flagResponse.data.data.flag,
		});
	} catch (error) {
		res.status(500).json({ error: "Error fetching country info" });
	}
};

module.exports = { getAvailableCountries, getCountryInfo };
