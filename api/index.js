// Build an apiRouter using express Router
const express = require('express');
const apiRouter = express.Router();

// Import the database adapter functions from the db
const {
  getOpenReports,
  createReport,
  closeReport, 
  createReportComment
  } = require('../db');

/**
 * Set up a GET request for /reports
 * 
 * - it should use an async function
 * - it should await a call to getOpenReports
 * - on success, it should send back an object like { reports: theReports }
 * - on caught error, call next(error)
 */
apiRouter.get('/reports', async (req, res, next) => {
    try {
      // Call the getOpenReports function and await the result
      const reports = await getOpenReports();
  
      // Send back the reports as a response object
      res.json({ reports });
    } catch (error) {
      // Call next(error) to pass the error to the error handling middleware
      next(error);
    }
  });


/**
 * Set up a POST request for /reports
 * 
 * - it should use an async function
 * - it should await a call to createReport, passing in the fields from req.body
 * - on success, it should send back the object returned by createReport
 * - on caught error, call next(error)
 */

apiRouter.post('/reports', async (req, res, next) => {
    try {
      const report = await createReport(req.body);
      res.json(report);
    } catch (error) {
      next(error);
    }
  });

/**
 * Set up a DELETE request for /reports/:reportId
 * 
 * - it should use an async function
 * - it should await a call to closeReport, passing in the reportId from req.params
 *   and the password from req.body
 * - on success, it should send back the object returned by closeReport
 * - on caught error, call next(error)
 */

apiRouter.delete('/reports/:reportId', async (req, res, next) => {
    try {
      const { reportId } = req.params;
      const { password } = req.body;
  
      const result = await closeReport(reportId, password);
      res.json(result);
    } catch (error) {
      next(error);
    }
  });

/**
 * Set up a POST request for /reports/:reportId/comments
 * 
 * - it should use an async function
 * - it should await a call to createReportComment, passing in the reportId and
 *   the fields from req.body
 * - on success, it should send back the object returned by createReportComment
 * - on caught error, call next(error)
 */
apiRouter.post('/reports/:reportId/comments', async (req, res, next) => {
    try {
      const { reportId } = req.params;
      const commentFields = req.body;
  
      const comment = await createReportComment(reportId, commentFields);
      res.json(comment);
    } catch (error) {
      next(error);
    }
  });
  


// Export the apiRouter
module.exports = apiRouter;