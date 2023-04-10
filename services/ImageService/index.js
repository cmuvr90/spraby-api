import * as fs from 'fs';

export default class ImageService {

  /**
   *
   * @param Image
   * @param LogService
   */
  constructor(Image, LogService) {
    this.image = Image;
    this.log = LogService.createLogger('ImageService');
  }

  saveImages = async imagesData => {
    const imageIds = [];

    for (const imageData of imagesData) {
      const image = await this.image.updateOrCreate({src: imageData.src}, imageData)
      imageIds.push(image.getId());
    }

    return imageIds;
  }

  /**
   *
   * @param images
   * @returns {Promise<[]>}
   */
  uploadImages = async images => {
    console.log('images = ', images);

    const imageSrc = [];

    for (const image of images) {
      try {
        const src = await this.uploadImage('public/images/' + image.name, image.data);
        imageSrc.push('images/' + image.name);
      } catch (e) {

      }
    }

    console.log('imageSrc = ', imageSrc);

    return imageSrc;
  }


  uploadImage = async (name, buffer) => {
    return new Promise((resolve, reject) => {
      fs.writeFile(name, buffer, 'binary', (err) => {
        if (!err) {
          resolve(name);
        } else {
          reject(err?.message ?? 'Error upload image')
        }
      });
    });
  }


}
