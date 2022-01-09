import appModulePath from 'app-module-path';
import http from 'http';
import express from 'express';
import cors from 'cors';

const Api = express();
const HTTP = http.Server(Api);
const bodyParser = require("body-parser");
const drugApi = require("./drug/drurgApi");
const doctorApi = require("./doctor/doctor")
const appointmentApi = require("./appointment/appointment")
const dashboardApi  = require("./dashboard/dashboard")
Api.use(cors());

//set header
Api.use(bodyParser.urlencoded({ extended: false }));
Api.use(bodyParser.json());
Api.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTION") {
      res.header("Access-Control-Allow-Methods", "PUT,POST,DELETE,GET,PATCH");
      return res.status(200).json({});
    }
    next();
  });
Api.use("/drug", drugApi )
Api.use("/doctor", doctorApi)
Api.use("/appointment", appointmentApi )
Api.use('/dashboard', dashboardApi)
HTTP.listen(9001, () => {
    console.log('listening on *:9001');
});

