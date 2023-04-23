const express = require("express");
const router = express.Router();
const clinicController = require('../controllers/clinics-controller');

//-- get clinics swagger documentation
/**
 * @swagger
 * /api/clinics/{clinicType}/{clinicName}/{stateInfo}/{timeToSearch}:
 *  get:
 *    tags:
 *       - Clinics
 *    description: This api is to get list of clinics.
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: clinicType
 *        description: ClinicTypes examples ['dental-clinics','vet-clinics'].
 *        schema:
 *          type: string
 *          default: 'dental-clinics'
 *          enum: ['dental-clinics', 'vet-clinics' ]
 *          required: true
 *      - in: path
 *        name: clinicName
 *        description: clinics names examples ['Scratchpay Official practice', 'Good Health Home']
 *        schema:
 *          type: string
 *          required: true
 *      - in: path
 *        name: stateInfo
 *        description: state codes or names examples ['Tennessee', 'FL']
 *        schema:
 *          type: string
 *          required: true
 *      - in: path 
 *        name: timeToSearch
 *        description: available clinic search time, time format hh:mm:ss, examples ['00:00:00'].
 *        schema:
 *          type: string
 *          required: true
 *    responses:
 *      '200':
 *        description: get list of available clinics.
 *      '500':
 *        description: internal server error.
 *      '404': 
 *        description: not found.
 */
router.get('/clinics/:clinicType/:clinicName/:stateInfo/:timeToSearch',
   clinicController.getClinics);


module.exports = router;  