import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-expandable-button',
  templateUrl: 'expandable-button.component.html',
  styleUrls: ['expandable-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExpandableButtonComponent {

  @Input() iconSrc = '';
  @Input() iconAlt = '';
  @Input() disabled = false;

  @Output() buttonClick = new EventEmitter<void>();

  constructor() {
  }

  hasClicked(): void {
    this.buttonClick.emit();
  }
}
