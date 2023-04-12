import moment from 'moment';

export default class ImageService {

  /**
   *
   * @param Image
   * @param FileService
   * @param LogService
   */
  constructor(Image, FileService, LogService) {
    this.image = Image;
    this.FileService = FileService;
    this.log = LogService.createLogger('ImageService');
    this.bucket = 'images';
    this.root = 'public'
    this.rootPath = `${this.root}/${this.bucket}/`
  }

  /**
   *
   * @param imagesSrc
   * @returns {Promise<{success: [], failed: []}>}
   */
  removeImagesBySrc = async imagesSrc => {
    const paths = imagesSrc.map(i => this.rootPath + i.split(`${this.bucket}/`).pop());
    return await this.FileService.removeFilesByPath(paths);
  }

  /**
   *
   * @param files
   * @param path
   * @returns {Promise<{success: *[], ids: [], failed: *[]}>}
   */
  saveImages = async (files, path = '') => {
    const ids = [];

    const {success, failed} = this.uploadImages(files, path);

    if (success?.length) {
      for (const src of success) {
        const image = await this.image.updateOrCreate({src: src})
        ids.push(image.getId());
      }
    }

    return {ids, success, failed};
  };

  /**
   *
   * @param imageFiles
   * @param path
   * @returns {{success: *[], failed: *[]}}
   */
  uploadImages = (imageFiles, path = '') => {
    const imagesData = imageFiles.map((imageFile, index) => {
      const mime = imageFile.name.split('.').pop();
      const src = path + 'sp-' + moment().format('YYYYMMDDHHmmssSSS') + index + '.' + mime;
      return {
        path: this.rootPath + src,
        buffer: imageFile.data,
        src: `${this.bucket}/${src}`
      }
    });

    let {success, failed} = this.FileService.uploadFilesFromBuffer(imagesData);

    success = success.map(i => i.src);
    failed = failed.map(i => i.src);
    return {success, failed};
  }
}
