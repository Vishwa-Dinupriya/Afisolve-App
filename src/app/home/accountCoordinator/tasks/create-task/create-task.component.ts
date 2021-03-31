import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TaskService} from '../task.service';


@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {
  CreateTaskForm: FormGroup;

  constructor(private fbtasks: FormBuilder,
              private taskService: TaskService) {
  }

  ngOnInit(): void {}

  onSubmit(): void {
    console.log(this.CreateTaskForm.value);
    this.taskService.createtask(this.CreateTaskForm.value)
      .subscribe(
        response => {
          console.log('Success!(frontend)', response);
        },
        error => console.error('Error!(frontend)', error)
      );
  }
}

