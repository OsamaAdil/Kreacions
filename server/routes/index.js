const express = require('express');
const router = express.Router();

const companies = require('./companies');
const vendors = require('./vendors');
const middleAgents = require('./middleAgents');
const vendorsBuy = require('./vendorbuys');
const transactions = require('./transactions');
const metals = require('./metals');
const clients = require('./clients');
const clientsSupplies = require('./clientsSupplies');
const users = require('./users');
const privileges = require('./privileges');
const activityLogs = require('./activityLogs');
const jobordertransactions = require('./jobOrderTransactions');

router.use('/companies', companies);
router.use('/vendors', vendors);
router.use('/middleagents', middleAgents);
router.use('/vendorbuys', vendorsBuy);
router.use('/transactions', transactions);
router.use('/metals', metals);
router.use('/clients', clients);
router.use('/clientsupplies', clientsSupplies);
router.use('/users', users);
router.use('/privileges', privileges);
router.use('/activitylogs', activityLogs);
router.use('/jobordertransactions', jobordertransactions);

module.exports = router;
