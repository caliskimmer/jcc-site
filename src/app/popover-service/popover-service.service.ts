import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PopoverService {
  constructor() {}

  urlName(linkName: string): string {
    return linkName
      .replace(/ /g, '-')
      .replace(/&/g, 'and')
      .toLowerCase();
  }
}
