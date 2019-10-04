const { Client } = require('@elastic/elasticsearch');
const baseUrl = 'http://localhost:9200'
const esClient = new Client({ node: baseUrl });
const INDEX_NAME = 'shakespeare';

const getSuggestedLines = async (searchText) => {
	let queryClause = {
		"query": {
			"match": {
				"text_entry": searchText
			}
		}
	}

	let reqObject = {
		index: INDEX_NAME,
		body: queryClause
	}

	console.log('reqObject = ', JSON.stringify(reqObject));
	try {
		const { body } = await esClient.search(reqObject);
		console.log("results: ", JSON.stringify(body.hits.hits));

		return body.hits.hits;
	} catch (error) {
		return { error }
	}
}

const getMapping = async () => {
	try {
		console.log('mapping!!');
		// const { body } = await esClient.transport.request({
		// 	method: 'GET',
		// 	path: `${INDEX_NAME}/_mapping`
		// });

		const { body } = await esClient.indices.getMapping({
			index: INDEX_NAME
		});

		return body;
	} catch (error) {
		return { error }
	}
}

module.exports = {
	getSuggestedLines,
	getMapping
};
