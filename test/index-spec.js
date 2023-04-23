const common = require('../common/common-fuctions')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const expect = require("chai").expect;

const _Base_URL = 'http://localhost:8080';
const _Clinic_Route = 'api/clinics';
const _Vet_Clinic_Route = common.ClinicType.VetClinic;
const _Dental_Clinic_Route = common.ClinicType.DentalClinics

describe("api/clinics", () => {

  describe("GET /", () => {
    it("should return Scratchpay vet clinic", async () => {
        await fetch(`${_Base_URL}/${_Clinic_Route}/${_Vet_Clinic_Route}/Scratchpay%20Test%20Pet%20Medical%20Center/{stateInfo}/{timeToSearch}`)
            .then(async (response) => {
                let dentalClinicResponse = await response.json();
                expect(response.status).to.equal(200);
                expect(dentalClinicResponse.Clinics.length).to.equal(1);
            })

    });
  });

  describe("GET /", () => {
    it("should return all vet clinic", async () => {
        await fetch(`${_Base_URL}/${_Clinic_Route}/${_Vet_Clinic_Route}/undefined/undefined/undefined`)
            .then(async (response) => {
                let dentalClinicResponse = await response.json();
                expect(response.status).to.equal(200);
                expect(dentalClinicResponse.Clinics.length).to.equal(5);
            })
    });
  });

  describe("GET /", () => {
    it("should return Scratchpay dental clinic", async () => {
        await fetch(`${_Base_URL}/${_Clinic_Route}/${_Dental_Clinic_Route}/Scratchpay%20Test%20Pet%20Medical%20Center/California/00%3A00%3A00`)
            .then(async (response) => {
                let dentalClinicResponse = await response.json();
                expect(response.status).to.equal(200);
                expect(dentalClinicResponse.Clinics.length).to.equal(1);
                expect(dentalClinicResponse.Clinics.length).to.equal(1);
                expect(dentalClinicResponse.Clinics[0].name).to.equal('Scratchpay Test Pet Medical Center');
                expect(dentalClinicResponse.Clinics[0].stateName).to.equal('California');
                expect(dentalClinicResponse.Clinics[0].availability.from).to.equal('00:00');
                expect(dentalClinicResponse.Clinics[0].availability.to).to.equal('24:00');
            })
    });
  });

  describe("GET /", () => {
    it("should return all dental clinic", async () => {
        await fetch(`${_Base_URL}/${_Clinic_Route}/${_Dental_Clinic_Route}/undefined/undefined/undefined`)
            .then(async (response) => {
                let dentalClinicResponse = await response.json();
                expect(response.status).to.equal(200);
                expect(dentalClinicResponse.Clinics.length).to.equal(10);
                expect(dentalClinicResponse.Clinics[0].name).to.equal('Good Health Home');
                expect(dentalClinicResponse.Clinics[0].stateName).to.equal('Alaska');
                expect(dentalClinicResponse.Clinics[0].availability.from).to.equal('10:00');
                expect(dentalClinicResponse.Clinics[0].availability.to).to.equal('19:30');
            })

    });
  });
});