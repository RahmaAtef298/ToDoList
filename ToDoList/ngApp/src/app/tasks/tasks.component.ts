import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Subscription } from 'rxjs';

import { Task } from "./task"
import { TasksService } from "../tasks.service"

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks: Task[] = [];
  private tasksSub: Subscription;

  constructor(private tasksService : TasksService) { }

  ngOnInit() {
    this.tasksService.getTasks();
    this.tasksSub = this.tasksService.getTaskUpdateListener()
      .subscribe((tasks: Task[]) => {
        this.tasks = tasks;
      });
  }

  addTask(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.tasksService.addTask(form.value.title, false);
    console.log(form.value.title)
    form.resetForm();
  }

  deleteTask(taskId: string) {
    this.tasksService.deletePost(taskId);
  }
  
  deleteAll(){
    this.tasksService.deleteAll();
  }

  updateTask(task: Task) {
    this.tasksService.updatePost(task.id,task.title,task.isDone);
  }

  ngOnDestroy() {
    this.tasksSub.unsubscribe();
  }
  

}
