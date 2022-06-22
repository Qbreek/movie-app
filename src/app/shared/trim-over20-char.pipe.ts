import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trimOver20Char',
})
export class TrimOver20CharPipe implements PipeTransform {
  transform(value: string): unknown {
    if (value.length > 25) {
      return `${value.slice(0, 25)}...`;
    } else {
      return value;
    }
  }
}
