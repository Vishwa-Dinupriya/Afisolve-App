import { Component, OnInit, Input } from '@angular/core';
import {TaskService} from '../task.service';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-task-profile',
  templateUrl: './task-profile.component.html',
  styleUrls: ['./task-profile.component.css']
})
export class TaskProfileComponent implements OnInit {
@Input() taskIDChild: number;
  taskIdAvailable;
  tabIndex = 1;

  constructor(private http1: HttpClient,
              public taskService: TaskService) { }

  ngOnInit(): void {
    if (!this.taskIDChild) {
      this.taskIdAvailable = false;
    }
  }
  public backToAllTasks(): void {
    this.taskService.ChangeTaskProfileModeBooleanSubjectValue(false);
    this.taskService.ChangeTaskIDSubjectNumberValue(null);
  }

}
