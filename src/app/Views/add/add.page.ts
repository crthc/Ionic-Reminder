import { ListItem } from './../../Models/list-item.model';
import { List } from './../../Models/list.model';
import { ListService } from './../../services/list.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  list: List;
  nameItem = '';

  constructor(private ListService: ListService, private route: ActivatedRoute) { 

    const listId = this.route.snapshot.paramMap.get('listId');

    this.list = this.ListService.getList(listId);

  }

  ngOnInit() {
  }

  addItem(){
    if(this.nameItem.length === 0){
      return;
    }

    const newItem = new ListItem(this.nameItem);
    this.list.items.push(newItem);

    this.nameItem = '';
    this.ListService.saveStorage();
  }

  switchCheck(item: ListItem){
    
    const toDo = this.list.items
                     .filter(itemData => !itemData.completed)
                     .length;
    
    if (toDo === 0){
      this.list.completedIn = new Date();
      this.list.completed = true;
    } else {
      this.list.completedIn = null;
      this.list.completed = false;
    }

    this.ListService.saveStorage();

    console.log(this.ListService.lists);
  }

  delete( i:number){
    this.list.items.splice(i,1);
    this.ListService.saveStorage();
  }

}
