const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes');

router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/api', apiRoutes);

module.exports = router;


/*
WHEN I visit the site for the first time
THEN I am presented with the homepage,which includes existing blog posts if any have been posted;
navigation links for the homepage and the dashboard;
and the option to log in
*/

/*
WHEN I click on the homepage option
THEN I am taken to the homepage
*/

/*
WHEN I click on any other links in the navigation
THEN I am prompted to either sign up or sign in
*/


/*
Class note:

controllers
    index.js - connects
    home-routes - router.get
        api 
            index.js - connects
            -routes - router.post/delete 
*/