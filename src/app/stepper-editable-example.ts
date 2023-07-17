import { Component, ElementRef, ViewChild } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { CrudService } from "./shared/crud.service";
import { NonProfit } from "./shared/nonprofit";
import { Patient } from "./shared/patient";
import { Category } from "./shared/patient";
import { SelectionModel } from "@angular/cdk/collections";
import { MatTableDataSource } from "@angular/material/table";
import { MatAccordion } from "@angular/material/expansion";
import { Input } from "@angular/core";
import { CurrencyPipe } from '@angular/common';

export enum SelectType {
  single,
  multiple,
}

/**
 * @title Stepper overview
 */

@Component({
  selector: "stepper-editable-example",
  templateUrl: "stepper-editable-example.html",
  styleUrls: ["stepper-editable-example.css"],
})
export class StepperEditableExample {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  completed: boolean = false;
  state: string;
  showSubmitSuccessMessage: boolean = false;
  @Input() options: string[] = [];
  isStepEditable: boolean = true;
  agree : boolean = false;
  noFoundationsSelected: boolean = true;
  // -------------- NON PROFIT Services -------------------------
  selectedCategories: Category[] = [];

  categories: Category[] = [
    { name: "Caregiver Support" },
    { name: "Emotional Support" },
    { name: "End of Life" },
    { name: "Financial Assistance - Medical" },
    { name: "Financial Assistance - Other" },
    { name: "Fitness" },
    { name: "Gifts" },
    { name: "Grief Support" },
    { name: "Patient Navigation" },
    { name: "Scholarships - Patient" },
    { name: "Sibling Support" },
    { name: "Travel" },
    { name: "Survivorship" },
  ];

  // -----------------------END NON PROFIT Services -------------------------------------

  displayedColumns: string[] = ["select", "name", "email", "state"];

  selectType = [
    { text: "Single", value: SelectType.single },
    { text: "Multiple", value: SelectType.multiple },
  ];

  public birthdate: Date;

  selectHandler(row: NonProfit) {
    this.selection.toggle(row);
    this.selectedNonProfits = this.selection.selected;
    this.isAnyNonProfitSelected();
  }

  onChange(typeValue: number) {
    this.displayType = typeValue;
    this.selection.clear();
    this.isAnyNonProfitSelected();
  }

  states: string[] = [
    "AL",
    "AK",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "FL",
    "GA",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY",
    "American Samoa Union Territory",
    "Guam Union Territory",
    "Northern Mariana Islands Union Territory",
    "Puerto Rick Union Territory",
    "US Virgin Islands Union Territory",
    "Washington DC Union Territory",
  ];

  isLinear = false;
  landingPageFormGroup: FormGroup;
  firstFormGroup: FormGroup;
  caregiverFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;
  sixthFormGroup: FormGroup;
  p: number = 1;
  NonProfits: NonProfit[];
  selectedNonProfits: NonProfit[];
  hideNonProfitTable: boolean = false;
  noData: boolean = false;
  preLoader: boolean = true;
  dataSource: MatTableDataSource<NonProfit>;
  currentPatient: Patient;
  minDate: Date;
  maxDate: Date;
  public studentForm: UntypedFormGroup;
  public nonProfits: NonProfit[];
  public temp: NonProfit;
  constructor(
    public crudApi: CrudService,
    public fb: UntypedFormBuilder,
    private _formBuilder: FormBuilder
  ) {}

  selection: any;
  displayType = SelectType.multiple;

  ngOnInit() {
    if (this.currentPatient == undefined || this.currentPatient == null) {
      this.currentPatient = {} as Patient;
    }
    if (this.selection != null && this.selection._selected.length > 0) {
      this.selection = new SelectionModel<NonProfit>(
        true,
        this.selectedNonProfits
      );
    } else {
      this.selection = new SelectionModel<NonProfit>(true, []);
    }
    // reset selected
    this.selectedCategories = [];
    this.showSubmitSuccessMessage = false;
    this.isStepEditable = true;
    this.hideNonProfitTable = false;
    this.initializeFormGroups();
     // Set the minimum to January 1st 100 years in the past and maximum to today's date.
     const currentYear = new Date().getFullYear();
     let currentDate = new Date();
     this.minDate = new Date(currentYear - 100, 0, 1);
     this.maxDate = currentDate;
  }

  private initializeFormGroups() {
    this.landingPageFormGroup = this._formBuilder.group({
      chkAgree: ["", Validators.required]
    });
    this.firstFormGroup = this._formBuilder.group({
      patientFirstNameTab01Ctrl01: ["", Validators.required],
      patientLastNameTab01Ctrl02: ["", Validators.required],
      patientEmailTab01Ctrl03: [
        "",
        [Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")],
      ],
      patientMobileNumberTab01Ctrl04: ["", [Validators.pattern("^[0-9 ]{10}")]],
      //patientDOBTab01Ctrl05: ["", Validators.required],
      patientDOBTab01Ctrl05: ['', [
        Validators.required
        // validates date format mm-dd-yyyy with regular expression
        //Validators.pattern(/^(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01]\-d{4}\)$/)
        //Validators.pattern(/^([1-9]|1[012])\/([1-9]|[12][0-9]|3[01])\/d{4}\$/)

    ]],
      patientGenderTab01Ctrl06: ["", Validators.required],
      patientAddressLine1Tab01Ctrl07a: ["", Validators.required],
      patientAddressLine2Tab01Ctrl07b: [""],
      patientCityTab01Ctrl08: ["", Validators.required],
      patientStateTab01Ctrl09: ["", Validators.required],
      patientZipTab01Ctrl10: ["", Validators.required],
    });
    this.caregiverFormGroup = this._formBuilder.group({
      caregiverFirstName: ["", Validators.required],
      caregiverLastName: ["", Validators.required],
      caregiverRelation: ["", Validators.required],
      caregiverEmail: [
        "",
        [
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"),
        ],
      ],
      caregiverMobileNumber: [
        "",
        [Validators.required, Validators.pattern("^[0-9 ]{10}")],
      ],
      caregiverAddressLine1: ["", Validators.required],
      caregiverAddressLine2: [""],
      caregiverCity: ["", Validators.required],
      caregiverState: ["", Validators.required],
      caregiverZip: ["", Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      diagnosisTab02Ctrl01: ["", Validators.required],
      diagnosisDateTab02Ctrl02: ["", Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({
      verifierFirstNameTab03Ctrl01: ["", Validators.required],
      verifierLastNameTab03Ctrl02: ["", Validators.required],
      verifierTypeTab03Ctrl03: ["", Validators.required],
      verifierOrganizationTab03Ctrl04: ["", Validators.required],
      verifierPhoneNumberTab03Ctrl05: [
        "",
        [Validators.required, Validators.pattern("^[0-9 ]{10}")],
      ],
      verifierEmailTab03Ctrl06: [
        "",
        [
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"),
        ],
      ],
    });
    this.fourthFormGroup = this._formBuilder.group({
      patientAnnualFamilyIncomeTab04Ctrl01: [""],
      patientNumberOfPeopleInHousehold: [""],
      category: [""],
    });
    this.fifthFormGroup = this._formBuilder.group({
      otherNeedsTab05Ctrl01: [""],
    });
    this.sixthFormGroup = this._formBuilder.group({
      formCompletedByNameTab06Ctrl01: ["", Validators.required],
      formCompletedByPhoneNumberTab06Ctrl02: [
        "",
        [Validators.required, Validators.pattern("^[0-9 ]{10}")],
      ],
      formCompletedByEmailTab06Ctrl03: [
        "",
        [
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"),
        ],
      ],
    });
  }

  // TODO : Directly clicking on the step 'Non Profit Foundations' does not run this method.
  showMatchingFoundations() {
    if (
      this.selection != null &&
      this.selection._selected != null &&
      this.selection._selected.length > 0
    ) {
      this.selection = new SelectionModel<NonProfit>(
        true,
        this.selectedNonProfits
      );
    } else {
      this.selection = new SelectionModel<NonProfit>(true, []);
    }

    let age: number;
    let state: string;
    state = this.firstFormGroup.controls.patientStateTab01Ctrl09.value;
    age = this.CalculateAge();

    this.dataState(state);
    let matchingNonProfits = this.crudApi.GetNonProfitsList(state);
    console.log("state:" + state + " age:" + age);

    // For non-profits that work only in the state specified
    matchingNonProfits.snapshotChanges().subscribe((data) => {
      this.NonProfits = [];
      data.forEach((item) => {
        let a = item.payload.toJSON();
        this.temp = a as NonProfit;

        if (
          (this.temp.maxAge == undefined ||
            this.temp.maxAge == null ||
            this.temp.maxAge == 0 ||
            age <= this.temp.maxAge) &&
          (this.temp.minAge == undefined ||
            this.temp.minAge == null ||
            this.temp.minAge == 0 ||
            age >= this.temp.minAge)
        ) {
          // If one of the selected service category matches any of the service categories offered by this non profit, then display this organization in the list.
          let categoriesSelectedByUser: Category[] = [];
          categoriesSelectedByUser = this.fourthFormGroup.controls['category'].value;
          let matchingCategoryFound = this.search(categoriesSelectedByUser, this.temp.ServiceCategories); //IsThereMatchingCategory();
          if (matchingCategoryFound) {
            console.log("state:" + state + " age:" + age); // + " income:" + income);

            if (this.temp.FoundationName != undefined) {
              console.log(
                "1 Pushed state non-profit: name:" +
                  this.temp.FoundationName +
                  " email:" +
                  this.temp.FoundationEmail +
                  // " income:" +
                  // this.temp.income +
                  " minAge:" +
                  this.temp.minAge +
                  " maxAge:" +
                  this.temp.maxAge +
                  " state:" +
                  this.temp.ServingStates
              );
              this.NonProfits.push(a as NonProfit);
              this.dataSource = new MatTableDataSource<NonProfit>(
                this.NonProfits
              );
            }
          } else {
            console.log(
              "Name:" + this.temp.FoundationName + "; No matching category."
            );
          }
        }
      });
    });

    // ----------------------------------------------
    // CAUTION : Hardcoded parameter value 'ALL' here
    // ----------------------------------------------
    // if (income == 0) {
    //   //income = 1000000; // If no max income limit, change it to $1million so that GetNonProfitsList() doesn't filter out any organization that does not have income limit (max income) i.e. income = 0 in the database.
    // }
    if (this.NonProfits == undefined || this.NonProfits.length == 0) {
      this.NonProfits = [];
    }
    matchingNonProfits = this.crudApi.GetNonProfitsList("ALL"); //, income);
    matchingNonProfits.snapshotChanges().subscribe((data) => {
      data.forEach((item) => {
        let a = item.payload.toJSON();
        this.temp = a as NonProfit;

        if (
          (this.temp.maxAge == undefined ||
            this.temp.maxAge == null ||
            this.temp.maxAge == 0 ||
            age <= this.temp.maxAge) &&
          (this.temp.minAge == undefined ||
            this.temp.minAge == null ||
            this.temp.minAge == 0 ||
            age >= this.temp.minAge)
        ) {
          
          let categoriesSelectedByUser: Category[] = [];
          categoriesSelectedByUser = this.fourthFormGroup.controls['category'].value;
          let matchingCategoryFound = this.search(categoriesSelectedByUser, this.temp.ServiceCategories); //IsThereMatchingCategory();
          if (matchingCategoryFound) {
            console.log("state:" + state + " age:" + age); // + " income:" + income);

            if (this.temp.FoundationName != undefined) {
              console.log(
                "2 ALL. pushed ALL non-profit: name:" +
                  this.temp.FoundationName +
                  " email:" +
                  this.temp.FoundationEmail +
                  // " income:" +
                  // this.temp.income +
                  " minAge:" +
                  this.temp.minAge +
                  " maxAge:" +
                  this.temp.maxAge +
                  " state:" +
                  this.temp.ServingStates
              );
              this.NonProfits.push(a as NonProfit);
              this.dataSource = new MatTableDataSource<NonProfit>(
                this.NonProfits
              );
            }
          } else {
            console.log(
              "Name:" + this.temp.FoundationName + "; No matching category."
            );
          }
        }
        if (this.NonProfits == undefined || this.NonProfits.length == 0) {
          this.hideNonProfitTable = true;
          console.log("a NonProfits has no rows. hideNonProfitTable true");
        } else {
          console.log(
            "b NonProfits has " +
              this.NonProfits.length +
              " rows. hideNonProfitTable false"
          );
          this.hideNonProfitTable = false;
        }
      });
    });

    this.form6();
  }

  search(selectedCategoriesByUser: Category[], categoriesServedByThisFoundation: Category[]) {
    let foundMatchingCategory = false;
    if (
      selectedCategoriesByUser == undefined ||
      selectedCategoriesByUser == null ||
      selectedCategoriesByUser.length == 0 || 
      categoriesServedByThisFoundation == undefined ||
      categoriesServedByThisFoundation == null ||
      categoriesServedByThisFoundation.length == 0 
    ) {
      foundMatchingCategory = true;
    } else {            
      //const categoriesServedByThisFoundation: Category[] = [];
      selectedCategoriesByUser.forEach( function(selectedCategory)
      {        
        if(categoriesServedByThisFoundation != undefined)
        {
          for(var j=0; j<10; j++)
          {
            if(categoriesServedByThisFoundation[j] != undefined)
            {
              if(categoriesServedByThisFoundation[j].name == selectedCategory.name)  
              {
                foundMatchingCategory = true;
              }
            }
            else { break;}
          }
        }
        // categoriesServedByThisFoundation.forEach( function(categoryServed) {
          
        // })        
        // ;
      });      
    }
    return foundMatchingCategory;
  }

  public onStepChange(event: any): void {
    console.log(event.selectedIndex);
    if (event.selectedIndex == 5) {
      this.showMatchingFoundations();
    }
    if (event.selectedIndex == 7) {
      this.isAnyNonProfitSelected();
    }
  }

  isAnyNonProfitSelected() {
    if (
      this.selectedNonProfits != null &&
      this.selectedNonProfits != undefined &&
      this.selectedNonProfits.length > 0
    ) {
      this.noFoundationsSelected = false;
    } else {
      // If no selections are made, one should not be able to submit the form. Hence mark the form invalid.
      this.noFoundationsSelected = true;
    }
    console.log("noFoundationsSelected :" + this.noFoundationsSelected);
  }

  dataState(state: string) {
    //, income: number
    this.crudApi
      .GetNonProfitsList(state) //, income
      .valueChanges()
      .subscribe((data) => {
        this.preLoader = false;
        if (data == undefined || data.length <= 0) {
          this.noData = true;
        } else {
          this.noData = false;
        }
      });
  }

  // TODO : Find out when this one gets hit. Why would I need it?
  form1() {
    console.log(this.firstFormGroup.value);
  }

  // TODO : Find out when this one gets hit. Why would I need it?
  form2() {
    console.log(this.secondFormGroup.value);
  }

  // TODO : Find out when this one gets hit. Why would I need it?
  form3() {
    console.log(this.thirdFormGroup.value);
  }

  // TODO : Find out when this one gets hit. Why would I need it?
  form4() {
    console.log(this.fourthFormGroup.value);
  }

  // TODO : Find out when this one gets hit. Why would I need it?
  form5() {
    console.log(this.fifthFormGroup.value);
  }

  // TODO : Find out when this one gets hit. Why would I need it?
  form6() {
    console.log(this.sixthFormGroup.value);

    if (this.currentPatient == undefined || this.currentPatient == null) {
      this.currentPatient = {} as Patient;
    }
    // Patient tab (12 fields)
    this.currentPatient.patientFirstName =
      this.firstFormGroup.controls.patientFirstNameTab01Ctrl01.value;
    this.currentPatient.patientLastName =
      this.firstFormGroup.controls.patientLastNameTab01Ctrl02.value;
    this.currentPatient.patientEmail =
      this.firstFormGroup.controls.patientEmailTab01Ctrl03.value;
    this.currentPatient.patientMobileNumber =
      this.firstFormGroup.controls.patientMobileNumberTab01Ctrl04.value;
    this.currentPatient.patientAge = this.CalculateAge();
    this.currentPatient.patientDOB =
      this.firstFormGroup.controls.patientDOBTab01Ctrl05.value;
    this.currentPatient.patientGender =
      this.firstFormGroup.controls.patientGenderTab01Ctrl06.value;
    this.currentPatient.patientAddressLine1 =
      this.firstFormGroup.controls.patientAddressLine1Tab01Ctrl07a.value;
    this.currentPatient.patientAddressLine2 =
      this.firstFormGroup.controls.patientAddressLine2Tab01Ctrl07b.value;
    this.currentPatient.patientCity =
      this.firstFormGroup.controls.patientCityTab01Ctrl08.value;
    this.currentPatient.patientState =
      this.firstFormGroup.controls.patientStateTab01Ctrl09.value;
    this.currentPatient.patientZip =
      this.firstFormGroup.controls.patientZipTab01Ctrl10.value;

    // Caregiver tab
    this.currentPatient.caregiverFirstName =
      this.caregiverFormGroup.controls.caregiverFirstName.value;
    this.currentPatient.caregiverLastName =
      this.caregiverFormGroup.controls.caregiverLastName.value;
    this.currentPatient.caregiverRelation =
      this.caregiverFormGroup.controls.caregiverRelation.value;
    this.currentPatient.caregiverEmail =
      this.caregiverFormGroup.controls.caregiverEmail.value;
    this.currentPatient.caregiverMobileNumber =
      this.caregiverFormGroup.controls.caregiverMobileNumber.value;
    this.currentPatient.caregiverAddressLine1 =
      this.caregiverFormGroup.controls.caregiverAddressLine1.value;
    this.currentPatient.caregiverAddressLine2 =
      this.caregiverFormGroup.controls.caregiverAddressLine2.value;
    this.currentPatient.caregiverCity =
      this.caregiverFormGroup.controls.caregiverCity.value;
    this.currentPatient.caregiverState =
      this.caregiverFormGroup.controls.caregiverState.value;
    this.currentPatient.caregiverZip =
      this.caregiverFormGroup.controls.caregiverZip.value;

    // Diagnosis Tab
    this.currentPatient.diagnosis =
      this.secondFormGroup.controls.diagnosisTab02Ctrl01.value;
    this.currentPatient.diagnosisDate =
      this.secondFormGroup.controls.diagnosisDateTab02Ctrl02.value;

    // Verifier tab
    this.currentPatient.verifierFirstName =
      this.thirdFormGroup.controls.verifierFirstNameTab03Ctrl01.value;
    this.currentPatient.verifierLastName =
      this.thirdFormGroup.controls.verifierLastNameTab03Ctrl02.value;
    this.currentPatient.verifierType =
      this.thirdFormGroup.controls.verifierTypeTab03Ctrl03.value;
    this.currentPatient.verifierOrganization =
      this.thirdFormGroup.controls.verifierOrganizationTab03Ctrl04.value;
    this.currentPatient.verifierPhoneNumber =
      this.thirdFormGroup.controls.verifierPhoneNumberTab03Ctrl05.value;
    this.currentPatient.verifierEmail =
      this.thirdFormGroup.controls.verifierEmailTab03Ctrl06.value;

    // Financials tab
    this.currentPatient.patientAnnualFamilyIncome =
      this.fourthFormGroup.controls.patientAnnualFamilyIncomeTab04Ctrl01.value;
    this.currentPatient.patientNumberOfPeopleInHousehold =
      this.fourthFormGroup.controls.patientNumberOfPeopleInHousehold.value;

    // Foundations tab
    this.currentPatient.selectedCategories = this.selectedCategories;
    this.currentPatient.miscNeeds =
      this.fifthFormGroup.controls.otherNeedsTab05Ctrl01.value;

    if (
      this.selectedNonProfits != null &&
      this.selectedNonProfits != undefined &&
      this.selectedNonProfits.length > 0
    ) {
      // TODO : Apply key to nonprofit and save all those that are selected for application, save application date as well.
      this.currentPatient.appliedToNonProfits = this.selectedNonProfits;
      this.noFoundationsSelected = false;
    } else {
      // If no selections are made, one should not be able to submit the form. Hence mark the form invalid.
      this.noFoundationsSelected = true;
    }

    // Form Completed By tab
    this.currentPatient.formCompletedByName =
      this.sixthFormGroup.controls.formCompletedByNameTab06Ctrl01.value;
    this.currentPatient.formCompletedByPhoneNumber =
      this.sixthFormGroup.controls.formCompletedByPhoneNumberTab06Ctrl02.value;
    this.currentPatient.formCompletedByEmail =
      this.sixthFormGroup.controls.formCompletedByEmailTab06Ctrl03.value;
  }

  public CalculateAge(): number {
    let age: number;
    age = 0;

    let diagnosisDate =
      this.secondFormGroup.controls.diagnosisDateTab02Ctrl02.value;
    let bdate = new Date(this.birthdate);
    if (
      diagnosisDate != undefined &&
      diagnosisDate != null &&
      diagnosisDate != ""
    ) {
      //const ageAtDiagnosis = Math.abs(diagnosisDate - bdate);
      // Age at diagnosis
      //age = Math.floor(ageAtDiagnosis / (1000 * 3600 * 24) / 365);
      age = Math.floor(
        (Date.UTC(
          diagnosisDate.getFullYear(),
          diagnosisDate.getMonth(),
          diagnosisDate.getDate()
        ) -
          Date.UTC(bdate.getFullYear(), bdate.getMonth(), bdate.getDate())) /
          (1000 * 60 * 60 * 24) /
          365
      );
      console.log("age at diagnosis:" + age);
    } else {
      //Used Math.floor instead of Math.ceil
      //so 26 years and 140 days would be considered as 26, not 27.
      //convert date again to type Date
      let today = new Date();
      age = Math.floor(
        (Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) -
          Date.UTC(bdate.getFullYear(), bdate.getMonth(), bdate.getDate())) /
          (1000 * 60 * 60 * 24) /
          365
      );
      //const ageAsOfToday = Math.abs(Date.now() - bdate.getDate());
      //age = Math.floor(ageAsOfToday / (1000 * 3600 * 24) / 365);
      console.log("age today:" + age);
    }
    return age;
  }

  submit() {
    // TODO Disable submit if form invalid.
    this.crudApi.GetPatientsList();

    let ccEmails: string = "";
    let selectedEmails: string[] = [];
    this.selectedNonProfits = this.selection.selected;

    for (let item of this.selection.selected) {
      if (
        item != null &&
        item != undefined &&
        item.email != null &&
        item.email != undefined
      ) {
        console.log(item.email);
        ccEmails = ccEmails + item.email + ",";
        selectedEmails.push(item.email);
      }
    }

    // Add patient
    this.crudApi.AddPatient(
      this.currentPatient,
      ccEmails,
      this.selectedNonProfits
    );

    this.showSubmitSuccessMessage = true;
    this.isStepEditable = false;
    this.completed = true;
    this.state = "done";
  }
}
