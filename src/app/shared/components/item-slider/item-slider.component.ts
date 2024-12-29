import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-item-slider',
  imports: [],
  standalone: true,
  template: `
    <div class="w-full flex gap-12 items-center justify-center">
      <div class="rounded-full cursor-pointer bg-black w-fit p-2 flex items-center justify-center hover:shadow-lg">
        <i 
          class="pi pi-arrow-left"
          style="font-size: 1.5rem; color: white"
          (click)="onPrev()"
        ></i>
      </div>

      <span>{{current}} / {{total}}</span>

      <div class="rounded-full cursor-pointer bg-black w-fit p-2 flex items-center justify-center hover:shadow-lg">
        <i 
          class="pi pi-arrow-right"
          style="font-size: 1.5rem; color: white"
          (click)="onNext()"
        ></i>
      </div>
    </div>
  `,
})
export class ItemSliderComponent {
  @Input() total = 0;
  @Input() current = 0;

  @Output() pageSelected = new EventEmitter<number>();

  onNext() {
    if (this.current < this.total) {
      this.current++;
      this.pageSelected.emit(this.current);
    }
  }

  onPrev() {
    if (this.current > 1) {
      this.current--;
      this.pageSelected.emit(this.current);
    }
  }
}
