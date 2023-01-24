import { Component, ContentChild, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-item-list',
  template: `
    <h1>Count:{{ items?.length }}</h1>
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
  @Input() items: number[] | null = [];
  @ContentChild(TemplateRef) itemTemplate?: TemplateRef<any>;
}
