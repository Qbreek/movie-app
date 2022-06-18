import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trimOver20Char',
})
export class TrimOver20CharPipe implements PipeTransform {
  transform(value: string): unknown {
    if (value.length > 20) {
      return `${value.slice(0, 20)}...`;
    } else {
      return value;
    }
  }
}
