'use strict';
const kafka = require('kafka-node');
const config = require('./kafka-config');

const Consumer = kafka.Consumer;
const client = new kafka.KafkaClient({kafkaHost: config.KafkaHost});
let consumer = new Consumer(
    client,
    [
        { topic: config.KafkaTopic, partition: 0 }
    ], 
    {
        autoCommit: true,
        fetchMaxWaitMs: 1000,
        fetchMaxBytes: 1024 * 1024,
        encoding: 'utf8',
        //fromOffset: 'latest'
    }
);

consumer.on('message', async function(message) {
    console.log('kafka ', message);
})

consumer.on('error', function(error) {
    //  handle error 
    console.log('error', error);
});

module.exports = consumer;