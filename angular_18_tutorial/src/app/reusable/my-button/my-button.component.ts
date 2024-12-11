import {Component, EventEmitter, Input, input, Output} from '@angular/core';

@Component({
  selector: 'app-my-button',
  imports: [],
  templateUrl: './my-button.component.html',
  styleUrl: './my-button.component.css'
})
export class MyButtonComponent {
  @Input() buttonText: string = '';
  @Input() buttonClass: string = '';

  @Output() onBtnClicked = new EventEmitter<any>();

  onClick(){
    this.onBtnClicked.emit("admin");
  }
}
