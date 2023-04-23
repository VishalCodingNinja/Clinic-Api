//-- method to check time availability from api response
exports.checkTimeAvailability = (from, to, timeToCheckAvailability) => {

        let timeArray = timeToCheckAvailability.trim().split(":");
        let availabilityCheckdate = new Date();
        availabilityCheckdate.setHours(timeArray[0]);
        availabilityCheckdate.setMinutes(timeArray[1]);
        availabilityCheckdate.setSeconds(timeArray[2]);
        
        let fromDate = new Date();
        let fromTimeArray = from.trim().split(":");
        fromDate.setHours(fromTimeArray[0]);
        fromDate.setMinutes(fromTimeArray[1]);
        fromDate.setSeconds("00");

        let toDate = new Date();
        let toTimeArray = to.trim().split(":");
        toDate.setHours(toTimeArray[0]);
        toDate.setMinutes(toTimeArray[1]);
        toDate.setSeconds("00");
    
    return (fromDate<=availabilityCheckdate && toDate>=availabilityCheckdate);
} 

//-- filter dental clinics from dental vet api response
exports.filterVetClinics = (listOfVetClinics, clinicName, stateInfo, availabilityTime) => {
   
       let filteredList = listOfVetClinics;
        //-- clinic Name filter
        if(clinicName!==null && clinicName!==undefined &&  clinicName!=='' && clinicName!=='undefined' && clinicName!=='{clinicName}') {
            filteredList = filteredList.filter(dentalClinic => {
                return dentalClinic.clinicName.trim().toLowerCase()===clinicName.trim().toLowerCase();
            });
        }

        //-- state Name filter
        if(stateInfo!==null && stateInfo!==undefined &&  stateInfo!=='' && stateInfo!=='undefined' && stateInfo!=='{stateInfo}') {
            filteredList = filteredList.filter(dentalClinic => {
                return dentalClinic.stateCode.trim().toLowerCase()===stateInfo.trim().toLowerCase();
            });
        }
            //-- time filter
        if(availabilityTime!==null && availabilityTime!==undefined &&  availabilityTime!=='' && availabilityTime!=='undefined' && availabilityTime!=='{timeToSearch}') {
            filteredList = filteredList.filter(dentalClinic => {
                return this.checkTimeAvailability(dentalClinic.opening.from, dentalClinic.opening.to, availabilityTime)
            });
        }

  return filteredList;
}


//-- filter dental clinics from dental clinics api response 
exports.filterDentalClinics = (listOfDentalClinics, clinicName, stateInfo, availabilityTime) => {
       let filteredList = listOfDentalClinics;

        //-- clinic name filter
        if(clinicName!==null && clinicName!==undefined &&  clinicName!=='' && clinicName!=='undefined' && clinicName!=='{clinicName}') { 
            filteredList = filteredList.filter(dentalClinic => {
                return dentalClinic.name.trim().toLowerCase()===clinicName.trim().toLowerCase();
            });
        }

        //-- state name filter
        if(stateInfo!==null && stateInfo!==undefined &&  stateInfo!=='' && stateInfo!=='undefined' && stateInfo!=='{stateInfo}') {
            filteredList = filteredList.filter(dentalClinic => {
                return dentalClinic.stateName.trim().toLowerCase()===stateInfo.trim().toLowerCase();
            });
        }

        //-- time filter
        if(availabilityTime!==null && availabilityTime!==undefined &&  availabilityTime!=='' && stateInfo!=='undefined' && availabilityTime!=='{timeToSearch}') {
            filteredList = filteredList.filter(dentalClinic => {
                return this.checkTimeAvailability(dentalClinic.availability.from, dentalClinic.availability.to, availabilityTime)
            });
        }

  return filteredList;
}

exports.ClinicType = {
    VetClinic: 'vet-clinics',
    DentalClinics: 'dental-clinics'
  }