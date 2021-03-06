import { Injectable } from '@angular/core';
import { GalleryImageModel } from '../models/gallery-image.model';

@Injectable()
export class ImageHelperService {
  private smallSuffix = 'm';
  private mediumSuffix = 'l';
  private imgurUrl = 'https://i.imgur.com';
  private imgIdRe = /^(.*?)(\..+)$/;

  constructor() { }

  private getImageUrl(img: GalleryImageModel, suffix: string): string {
    switch (img.imageKind.id) {
      case 0: // direct link
        return img.imageData;
      case 1: // imgur link
        const match = img.imageData.match(this.imgIdRe);
        return `${this.imgurUrl}/${match[1]}${suffix}${match[2]}`;
      default:
        throw Error('bad image data');
    }
  }

  getFullImageUrl(img: GalleryImageModel): string {
    return this.getImageUrl(img, '');
  }

  getMediumUrl(img: GalleryImageModel): string {
    return this.getImageUrl(img, this.mediumSuffix);
  }

  getSmallImageUrl(img: GalleryImageModel): string {
    return this.getImageUrl(img, this.smallSuffix);
  }
}
