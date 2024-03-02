import { Component, Input } from '@angular/core';
import { ImageEntity } from './image-display.types';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-image-display',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './image-display.component.html',
  styleUrl: './image-display.component.scss',
})
export class ImageDisplayComponent {
  @Input({ required: true }) image: ImageEntity;
  @Input() height: string = '40';
  @Input() width: string = '40';

  baseUrl: string = 'http://localhost:8080/images/';
}
