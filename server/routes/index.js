const express = require('express');
const router = express.Router();

const auth = require("./auth");
const companies = require('./companies');
const currencies = require('./currencies');
const vendors = require('./vendors');
const middleAgents = require('./middleAgents');
const vendorsBuy = require('./vendorsbuy');
const transactions = require('./transactions');
const metals = require('./metals');
const clients = require('./clients');
const clientsSupply = require('./clientsSupply');
const users = require('./users');
const privileges = require('./privileges');
const activityLogs = require('./activityLogs');
const jobordertransactions = require('./jobOrderTransactions');

router.use("/auth", auth);
router.use('/companies', companies);
router.use('/currencies', currencies);
router.use('/vendors', vendors);
router.use('/middleagents', middleAgents);
router.use('/vendorsbuy', vendorsBuy);
router.use('/transactions', transactions);
router.use('/metals', metals);
router.use('/clients', clients);
router.use('/clientssupply', clientsSupply);
router.use('/users', users);
router.use('/privileges', privileges);
router.use('/activitylogs', activityLogs);
router.use('/jobordertransactions', jobordertransactions);

module.exports = router;
