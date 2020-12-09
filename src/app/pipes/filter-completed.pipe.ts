import { List } from './../Models/list.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCompleted',
  pure: false
})
export class FilterCompletedPipe implements PipeTransform {

  transform(lists: List[], completed: boolean): List[] {

    return lists.filter( list => list.completed === completed);
  }

}
