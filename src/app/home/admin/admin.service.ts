import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  drawer: boolean; // parent or child access this

  private toggleDrawerChange: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient) {
    this.toggleDrawerChange.subscribe(value => this.drawer = value); // next eken enne methnata
  }

  ToggleDrawer(toggleDrawer: boolean): void {
    this.toggleDrawerChange.next(toggleDrawer); // next kaallen thamai subscribe ekat call krnane
  }

}
