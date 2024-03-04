import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'spliceString'
})
export class SpliceStringPipe implements PipeTransform {

  transform(str: string, num: number): unknown {
    return str.split(' ').splice(0, num).join(' ');
  }

}
