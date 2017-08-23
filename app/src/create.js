'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000"
});


const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.create = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);

  console.log(data);

  const params = {
    TableName: projectsTable,
    Item: {
      ProjectID: uuid.v1(),
      EmailSubscriber: data.emailSubscriber,
      RepositoryUrl: data.repositoryUrl,
      Frequency: data.frequency,
      CreatedAt: timestamp,
      UpdatedAt: timestamp,
    },
  };

  console.log(params);

  // write the todo to the database
  dynamoDb.put(params, (error) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(new Error('Couldn\'t create the project.'));
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(params.Item),
    };
    callback(null, response);
  });
};