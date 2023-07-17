import { Category } from "./patient";

  export interface NonProfit {
    $key: string;
    // name: string;
    // state: string,
    // email: string;
    // minAge:number,
    // maxAge:number

    LastUpdated: Date;
FoundationName: string;
Website: string;
minAge: number;
maxAge: number;
AgeRules: string;
ApplicationSubmitter: string;
Diagnosis: string;
BrainTumorTypesCovered: string[];
ServingStates: string;NA: string;
VirtualServices: string;
CountiesCovered: string;
ServiceCategories: Category[];
ApplicationDeadlines: string;
Notes: string;
FoundationPhone: string;
FoundationEmail: string;
FoundationContact: string;
FoundationStreetAddress: string;
FoundationCity: string;
FoundationState: string;
FoundationZip: string;
ServicesOffered: string;
	  
    //income:number
  }
  
  