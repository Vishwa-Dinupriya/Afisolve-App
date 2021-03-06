import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AddNewComplaintService {

  isLodgeComplaintMode: boolean;
  productIdParent: number;

  public isLodgeComplaintModeSubjectBoolean: Subject<boolean> = new Subject<boolean>();
  private productIdParentSubjectNumber: Subject<number> = new Subject<number>();

  constructor() {
    this.isLodgeComplaintModeSubjectBoolean.subscribe(value => this.isLodgeComplaintMode = value);
    this.productIdParentSubjectNumber.subscribe(value => this.productIdParent = value);
  }

  changeIsLodgeComplaintModeSubjectBooleanValue(newIsLodgeComplaintMode: boolean): void {
    this.isLodgeComplaintModeSubjectBoolean.next(newIsLodgeComplaintMode);
  }

  changeProductIdParentSubjectNumberValue(newProductIdParentValue: number): void {
    this.productIdParentSubjectNumber.next(newProductIdParentValue);
  }
}
