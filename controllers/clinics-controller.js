const common = require('../common/common-fuctions')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const _Base_URL = 'https://storage.googleapis.com/scratchpay-code-challenge';

exports.getClinics = async (req, res, next) => {

    const clinicType = req.params.clinicType.trim();

    //-- validate clinicType
        if(clinicType===null || clinicType===undefined || clinicType==='' || clinicType==='undefined') {
                res.status(400).json({
                    message: "invalid request route value, bad request",
                    Clinics: [],
                })
        }

        if(clinicType!=common.ClinicType.DentalClinics && clinicType!=common.ClinicType.VetClinic ) {
                res.status(400).json({
                    message: "invalid clinics route, bad request",
                    Clinics: [],
                })
        }

    //--get values from params
    const clinicName = req.params.clinicName;
    const stateInfo = req.params.stateInfo;    
    const timeToSearch = req.params.timeToSearch;
   
    //-- fetching details
    await fetch(`${_Base_URL}/${clinicType}.json`).then(async (response) => {
         let dentalClinicResponse = await response.json();
         let filteredClinics = [];

            if(clinicType===common.ClinicType.VetClinic){
                filteredClinics = common.filterVetClinics(dentalClinicResponse, clinicName, stateInfo, timeToSearch);
            }

            if(clinicType===common.ClinicType.DentalClinics){
                filteredClinics = common.filterDentalClinics(dentalClinicResponse, clinicName, stateInfo, timeToSearch);
            }

            if(typeof filteredClinics !== 'undefined' && filteredClinics !== null
                && filteredClinics.length !== null && filteredClinics.length > 0) {
                        res.status(200).json({
                            message: "clinics fetched",
                            Clinics: filteredClinics,
                        })
                } else {
                        res.status(404).json({
                            message: "Not Found",
                            Clinics: filteredClinics,
                        })
                }

       }).catch(err => {
                     if (!err.statusCode) {
                 err.statusCode = 500;
             }
             next(err)
       });
}