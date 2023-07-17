import { SelectionModel } from "@angular/cdk/collections";
import { NonProfit } from "./nonprofit";

export interface Category {
    name: string;
  }

export interface Patient {

    // tab 1
    $key: string;
    patientFirstName: string;               // patient First Name
    patientLastName: string;                // patient Last Name
    patientEmail: string;                   
    patientMobileNumber: Number;            // patient Phone Number
    patientAge: number;                     // patient Age - calculated based on Date of Birth
    patientDOB: Date;                       // patient DOB
    patientGender: string;                  // patient Gender
    patientAddressLine1: string;                   
    patientAddressLine2: string;
    patientCity: string;                   
    patientState: string;                   
    patientZip: string;      
    caregiverFirstName: string;                   
    caregiverLastName: string;                   
    caregiverRelation: string;                   
    caregiverMobileNumber: string;                   
    caregiverEmail: string;  
    caregiverAddressLine1: string;                   
    caregiverAddressLine2: string;
    caregiverCity: string;                   
    caregiverState: string;                   
    caregiverZip: string;                                        

    // tab 2 - Medical
    diagnosis: string;    
    diagnosisDate: Date;           

    // tab 3 - Verifier
    verifierFirstName: string;
    verifierLastName: string;
    verifierType: string;
    verifierOrganization: string;
    verifierPhoneNumber: number;
    verifierEmail: string;

    // tab 4 - Financials
    patientAnnualFamilyIncome: number;
    patientNumberOfPeopleInHousehold: number;
    //patientRequestWithUtilityBills: boolean;

    // tab 5 - Foundations
    miscNeeds: string;
    selectedCategories: Category[];
    //permissionToContact: boolean;

    // tab 6 - Form Completed By
    formCompletedByName: string;
    formCompletedByPhoneNumber: number;
    formCompletedByEmail: string;
    
    appliedToNonProfits: NonProfit[];
}