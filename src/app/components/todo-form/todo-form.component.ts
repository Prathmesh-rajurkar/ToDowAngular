import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from '../../interfaces/todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css'],
})
export class TodoFormComponent implements OnInit {
  todoForm!: FormGroup;
  constructor( private todoservice: TodoService, private formBuilder: FormBuilder) {

  }
  ngOnInit(): void {
    this.todoForm = this.formBuilder.group({
      id:new Date().getTime(), // Simple ID generation based on timestamp
      title: ['', Validators.required],
      description : [''],
      completed: [false],
    })
  }
  onSubmit():void {
    if(this.todoForm.invalid){
      return;
    }
    const todo: Todo = this.todoForm.value;
    this.todoservice.createTodo(todo);
    // console.log(todo);
    this.todoForm.reset();
  }
}
