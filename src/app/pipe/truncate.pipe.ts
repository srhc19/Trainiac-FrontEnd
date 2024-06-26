import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true,
})
export class TruncatePipe implements PipeTransform {
  transform(
    value: string,
    limit: number = 20,
    completeWords: boolean = false,
    ellipsis: string = '...'
  ): string {
    if (!value) return '';

    if (value.length <= limit) return value;

    let truncatedValue = value.substr(0, limit);

    if (completeWords) {
      const lastSpaceIndex = truncatedValue.lastIndexOf(' ');
      if (lastSpaceIndex > 0) {
        truncatedValue = truncatedValue.substr(0, lastSpaceIndex);
      }
    }

    return truncatedValue + ellipsis;
  }
}
