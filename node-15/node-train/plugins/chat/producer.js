'use strict';
const Kafka = require('kafka-node');
const config  = require('./kafka-config');
const Producer = Kafka.Producer;
const client = new Kafka.KafkaClient({kafkaHost: config.KafkaHost});
const producer = new Producer(client,  {requireAcks: 0, partitionerType: 2});
let isProducerReady = false;

producer.on('ready', function () {
    console.log("Producer is ready");
    isProducerReady = true;
});

producer.on('error', function (err) {
    console.error("Problem with producing Kafka message " + err);
});

module.exports = producer;