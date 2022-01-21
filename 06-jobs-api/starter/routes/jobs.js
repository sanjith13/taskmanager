

const express = require('express');

const router = express.Router();

const {
    getAllJobs,
    createJobs,
    getJobs,
    updateJobs,
    deleteJobs
}  = require('../controllers/jobs')

router.route('/').get(getAllJobs).post(createJobs)
router.route('/:id').get(getJobs).patch(updateJobs).delete(deleteJobs)

module.exports = router;