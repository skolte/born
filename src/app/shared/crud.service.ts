import { Injectable } from "@angular/core";
import { Patient } from "./patient";
import { NonProfit } from "./nonprofit";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from "@angular/fire/compat/database";

@Injectable({
  providedIn: "root",
})
export class CrudService {
  patientsRef: AngularFireList<any>;
  patientRef: AngularFireObject<any>;

  nonProfitsRef: AngularFireList<any>;
  nonProfitRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase, private afs: AngularFirestore) {}

  // Create Patient
  AddPatient(
    patient: Patient,
    ccEmails: string,
    selectedNonProfits: NonProfit[]
  ) {
    var dateNow = new Date().toLocaleString();
    var t = patient;
    this.patientsRef.push({
      // tab 1 - Patient
      firstName: patient.patientFirstName,
      lastName: patient.patientLastName,
      patientEmail: patient.patientEmail,
      patientMobileNumber: patient.patientMobileNumber,
      patientAge: patient.patientAge,
      patientDOB: patient.patientDOB,
      patientGender: patient.patientGender,
      patientAddressLine1: patient.patientAddressLine1,
      patientAddressLine2: patient.patientAddressLine2,
      patientCity: patient.patientCity,
      patientState: patient.patientState,
      patientZip: patient.patientZip,

      // tab 2 - Caregiver
      caregiverFirstName: patient.caregiverFirstName,
      caregiverLastName: patient.caregiverLastName,
      caregiverRelation: patient.caregiverRelation,
      caregiverEmail: patient.caregiverEmail,
      caregiverMobileNumber: patient.caregiverMobileNumber,
      caregiverAddressLine1: patient.caregiverAddressLine1,
      caregiverAddressLine2: patient.caregiverAddressLine2,
      caregiverCity: patient.caregiverCity,
      caregiverState: patient.caregiverState,
      caregiverZip: patient.caregiverZip,

      // tab 3 - Diagnosis
      diagnosis: patient.diagnosis,
      diagnosisDate: patient.diagnosisDate,

      // tab 4 - Diagnosis Verification
      verifierFirstName: patient.verifierFirstName,
      verifierLastName: patient.verifierLastName,
      verifierType: patient.verifierType,
      verifierOrganization: patient.verifierOrganization,
      verifierPhoneNumber: patient.verifierPhoneNumber,
      verifierEmail: patient.verifierEmail,

      // tab 5 - Fiancials
      patientAnnualFamilyIncome: patient.patientAnnualFamilyIncome,
      patientNumberOfPeopleInHousehold:
        patient.patientNumberOfPeopleInHousehold,

      // tab 6 - Non Profit Foudations
      selectedCategories: patient.selectedCategories,
      miscNeeds: patient.miscNeeds,
      appliedToNonProfits: selectedNonProfits,

      // tab 6
      formCompletedByName: patient.formCompletedByName,
      formCompletedByPhoneNumber: patient.formCompletedByPhoneNumber,
      formCompletedByEmail: patient.formCompletedByEmail,
      emailsSentTo: ccEmails,
      sendDate: dateNow,
    });
    this.SendEmail(patient, ccEmails);
  }

  SendEmail(patient: Patient, ccEmails: string) {
     let selectedCategoriesList: string = "";
    patient.selectedCategories.forEach(category => {
      selectedCategoriesList = selectedCategoriesList + category.name + ";";
    });

    let message =
      // tab 1 - Patient
      "<br/>" +
      "<br/>----------------------------------------------------" +
      "<br/>  SECTION 1 : Patient Information" +
      "<br/>----------------------------------------------------" +            
      "<br/>" +
      "<br/>  Patient First Name:" +
      patient.patientFirstName +
      "<br/>  Patient Last Name:" +
      patient.patientLastName +
      "<br/>  Patient Email: " +
      patient.patientEmail +
      "<br/>  Patient Mobile Number: " +
      patient.patientMobileNumber + // patient Phone Number
      "<br/>  Patient Age: " +
      patient.patientAge + // patient Age - calculated based on Date of Birth
      "<br/>  Patient DOB: " +
      patient.patientDOB + // patient DOB
      "<br/>  Patient Gender: " +
      patient.patientGender + // patient Gender
      "<br/>  Patient Address Line1: " +
      patient.patientAddressLine1 +
      "<br/>  Patient Address Line2: " +
      patient.patientAddressLine2 +
      "<br/>  Patient City: " +
      patient.patientCity +
      "<br/>  Patient State: " +
      patient.patientState +
      "<br/>  Patient Zip: " +
      patient.patientZip +
      // tab 2 - Caregiver
      "<br/>" +
      "<br/>----------------------------------------------------" +
      "<br/>  SECTION 2 : Caregiver" +      
      "<br/>----------------------------------------------------" +
      "<br/>" +
      "<br/>  Caregiver First Name:" +
      patient.caregiverFirstName +
      "<br/>  Caregiver Last Name:" +
      patient.caregiverLastName +
      "<br/>  Caregiver Relation: " +
      patient.caregiverRelation +
      "<br/>  Caregiver Email: " +
      patient.caregiverEmail +
      "<br/>  Caregiver Mobile Number: " +
      patient.caregiverMobileNumber +
      "<br/>  Caregiver Address Line1: " +
      patient.caregiverAddressLine1 +
      "<br/>  Caregiver Address Line2: " +
      patient.caregiverAddressLine2 +
      "<br/>  Caregiver City: " +
      patient.caregiverCity +
      "<br/>  Caregiver State: " +
      patient.caregiverState +
      "<br/>  Caregiver Zip: " +
      patient.caregiverZip +
      // tab 3 - Diagnosis
      "<br/>" +
      "<br/>----------------------------------------------------" +                  
      "<br/>  SECTION 3 : Diagnosis" +
      "<br/>----------------------------------------------------" +            
      "<br/>" +
      "<br/>  Diagnosis: " +
      patient.diagnosis +
      "<br/>  Diagnosis Date: " +
      patient.diagnosisDate +
      // tab 4 - Diagnosis Verification
      "<br/>" +
      "<br/>----------------------------------------------------" +            
      "<br/>  SECTION 4 : Diagnosis Verification" +
      "<br/>----------------------------------------------------" +            
      "<br/>" +
      "<br/>  Verifier First Name: " +
      patient.verifierFirstName +
      "<br/>  Verifier Last Name: " +
      patient.verifierLastName +
      "<br/>  Verifier Type: " +
      patient.verifierType +
      "<br/>  Verifier Organization: " +
      patient.verifierOrganization +
      "<br/>  Verifier Phone Number: " +
      patient.verifierPhoneNumber +
      "<br/>  Verifier Email: " +
      patient.verifierEmail +
      // tab 5 - Financials
      "<br/>" +
      "<br/>----------------------------------------------------" +            
      "<br/>  SECTION 5 : Financials" +
      "<br/>----------------------------------------------------" +            
      "<br/>" +
      "<br/>  Household Family Income: " +
      patient.patientAnnualFamilyIncome +
      "<br/>  Number of People in the Household: " +
      patient.patientNumberOfPeopleInHousehold +
      // tab 6 - Non Profit Foundations
      "<br/>" +
      "<br/>----------------------------------------------------" +            
      "<br/>  SECTION 6 : Non Profit Foundations" +
      "<br/>----------------------------------------------------" +            
      "<br/>" +
      "<br/>  Foundations - Any Other Needs? : " +
      patient.miscNeeds +
      "<br/>  Foundations - Selected Categories " +
      selectedCategoriesList +
      // LEAVE OUT INTENTIONALLY : Why should all foundations get to know where's this applicant applying?
      //"<br/>  Foundations - Selected Foundations " +
      //patient.appliedToNonProfits +
      // tab 7 - Form completed by
      "<br/>" +
      "<br/>----------------------------------------------------" +            
      "<br/>  SECTION 7 : Form Completed By" +
      "<br/>----------------------------------------------------" +            
      "<br/>" +
      "<br/>  Form Completed By Name: " +
      patient.formCompletedByName +
      "<br/>  Form Completed By Phone Number: " +
      patient.formCompletedByPhoneNumber +
      "<br/>  Form Completed By Email: " +
      patient.formCompletedByEmail;

    this.afs.collection("mail").add({
      to: "dragonmasterassist@gmail.com",
      cc: ccEmails, // TODO : Change to bcc
      template: {
        name: "welcome",
        data: {
          name: patient.patientFirstName + " " + patient.patientLastName,
          email: patient.patientEmail,
          subject: "New Application Received for [" + patient.patientFirstName + " " + patient.patientLastName +"]" ,
          whatever: message,
        },
      },
    });
  }

  // Fetch Patient List
  GetPatientsList() {
    this.patientsRef = this.db.list("students-list");
    return this.patientsRef;
  }
  // Fetch Patient List
  GetAllNonProfitsList() {
    this.nonProfitsRef = this.db.list("nonProfits-list");
    return this.nonProfitsRef;
  }

  // Fetch NonProfits List
  GetNonProfitsList(state: string) {  //, income: number
    this.nonProfitsRef = this.db.list("nonProfits-list16March2023/" + state);//, (ref) =>
      //ref.orderByChild("state")//.endBefore(income)  // TODO : This has a bug. What if the income defined in the database for a non-profit has no income restriction in CA and another non-profit with no restriction in ALL states.
    //);
    return this.nonProfitsRef;
  }
}
