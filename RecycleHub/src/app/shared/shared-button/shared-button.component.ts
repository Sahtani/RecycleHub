import { Component, Input, Output, EventEmitter } from '@angular/core';
import {NgClass} from '@angular/common';


@Component({
  selector: 'app-shared-button',
  imports: [
    NgClass
  ],
  templateUrl: './shared-button.component.html',
  standalone: true,
  styleUrl: './shared-button.component.css'
})
export class SharedButtonComponent {
  @Input() disabled: boolean = false;
  @Input() buttonClasses: string = 'w-52 h-12 shadow-sm rounded-full bg-[#82b53e]  hover:bg-[#3e722b] transition-all duration-700 text-white text-base font-semibold leading-7';

  // Événement qui se déclenche au clic
  @Output() clicked = new EventEmitter<Event>();

  onClick(event: Event): void {
    this.clicked.emit(event);
  }

}
