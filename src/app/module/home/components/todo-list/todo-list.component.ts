import { Component, DoCheck, OnInit } from '@angular/core';
import { first, last } from 'rxjs';

//Interface
import { TaskList } from '../../model/task-list';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements DoCheck {

  public list: Array<TaskList> = JSON.parse(localStorage.getItem("list") || '[]'); 
  constructor() { }


  ngDoCheck(): void {
    this.setLocalStorage();
  }


  public excluirTaks(event: number){
    this.list.splice(event, 1);
  }

  public excluirTodos(){
    this.list = [];
  }

  public setEmiterTaksList(event: string){
   this.list.push({task: event, checked: false})
  }

  public validationInput(event: string, index: number){

    if(!event.length){
      const confirm = window.confirm("Task está vazia, desejadeletar?");
      if(confirm){
        this.excluirTaks(index);
      }
    }
  }

  public setLocalStorage(){
    if(this.list){
      this.list.sort( (first, last) => Number (first.checked) - Number(last.checked))
      localStorage.setItem("list", JSON.stringify(this.list))
    }
    
  }

}
