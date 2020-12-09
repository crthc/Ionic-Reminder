import { List } from './../../Models/list.model';
import { ListService } from './../../services/list.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent implements OnInit {

  @ViewChild( IonList ) list: IonList;
  @Input() completed = true;

  constructor(public listService: ListService, private router: Router, private alertCtrl: AlertController ) { }

  ngOnInit() {}

  selectedList(list: List){

    if (this.completed){
      this.router.navigateByUrl(`/tabs/tab2/add/${list.id}`);
    }else{
      this.router.navigateByUrl(`/tabs/tab1/add/${list.id}`);
    }

  }

  deleteList( list: List ){

    this.listService.deleteList(list);

  }
  
  async editTitle( list: List ){
    const alert = await this.alertCtrl.create({
      header: 'Edit title',
      inputs: [{
        name: 'title',
        type: 'text',
        value: list.title,
        placeholder: 'Name of the list',
      }],
      buttons: [
        {
        text: 'Cancel',
        role: 'cancel',
        handler: () =>{
          console.log('cancelar');
          this.list.closeSlidingItems();
        }
      },
      {
        text:'Upgrade',
        handler: ( data ) => {
          console.log(data);
          if( data.title.length === 0){
            return;
          }

          list.title = data.title;
          this.listService.saveStorage();
          this.list.closeSlidingItems();
      }
    }],
    });

    alert.present();
  }

}
