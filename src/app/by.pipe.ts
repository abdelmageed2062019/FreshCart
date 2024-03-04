import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'by'
})
export class ByPipe implements PipeTransform {

  transform(title: string): string {
    return `by ${title}`;
  }

}
