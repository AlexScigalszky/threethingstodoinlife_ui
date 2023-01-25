import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { Item } from 'src/app/models/item';

@Component({
  selector: 'app-item-list',
  template: `
    <h1>Count:{{ items.length }}</h1>
    <div *ngFor="let item of items">
      <ng-template
        *ngIf="itemTemplate"
        [ngTemplateOutlet]="itemTemplate"
        [ngTemplateOutletContext]="{ $implicit: item }"
      >
      </ng-template>
    </div>
  `,
  styles: [],
})
export class ItemListComponent {
  @Input() items: Item[] = [];
  @ContentChild(TemplateRef) itemTemplate?: TemplateRef<any>;
}
