import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InterfaceComplaintWithSubsService {

  constructor() { }
}
export interface IComplaintWithSubsElement {
  complaintID: number;
  description: string;
  finishedDate: string;
  lastDateOfPending: string;
  productID: string;
  status: number;
  subComplaintID: number;
  submittedDate: string;
  wipStartDate: string;
  subComplaints: IComplaintWithSubsElement[] | null;
}
