import {
  inject,
  Injectable,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ImageEntity } from './image-display.types';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  #httpClient: HttpClient = inject(HttpClient);
  #toastrService: ToastrService = inject(ToastrService);
  #uploadedImage: WritableSignal<ImageEntity> = signal<ImageEntity>(null);

  uploadImage(formData: FormData) {
    this.#httpClient.post('/image/upload', formData).subscribe({
      next: (data) => {
        this.#uploadedImage.set(data as ImageEntity);
      },
      error: (error) => {
        this.#toastrService.error(error.message);
      },
    });
  }

  getUploadedImage(): Signal<ImageEntity> {
    return this.#uploadedImage;
  }

  setUploadedImage(imageEntity: ImageEntity): void {
    this.#uploadedImage.set(imageEntity);
  }

  clearUploadedImage(): void {
    this.#uploadedImage.set(null);
  }
}
