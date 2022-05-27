const router = require("express").Router();

// import the api routes
const apiRoutes = require("./api");

// add a prefix api to all routes
router.use("/api", apiRoutes);

module.exports = router;