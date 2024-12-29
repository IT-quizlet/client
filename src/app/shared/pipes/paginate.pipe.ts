import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'paginate'
})
export class PaginatePipe implements PipeTransform {
  transform<T>(data: T[], page = 1, itemsPerPage = 10): T[] {
    if (!data || data.length === 0) {
      return [];
    }

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return data.slice(startIndex, endIndex);
  }
}
