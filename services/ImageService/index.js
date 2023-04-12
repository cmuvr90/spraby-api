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
    this.folder = 'images/';
    this.rootFolder = 'public/'
  }

  /**
   *
   * @param imagesSrc
   * @returns {Promise<{success: [], failed: []}>}
   */
  removeImagesBySrc = async imagesSrc => {
    const paths = imagesSrc.map(src => {
      const pathToFile = src.split(this.folder).pop();
      return this.rootFolder + this.folder + pathToFile;
    });

    return await this.FileService.removeFilesByPath(paths);
  }

  /**
   *
   * @param images
   * @param path
   * @returns {Promise<{success: *[], ids: [], failed: *[]}>}
   */
  saveImages = async (images, path = '') => {
    const ids = [];

    const {success, failed} = this.uploadImages(images, path);

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
    const imagesData = imageFiles.map(imageFile => {
      const src = this.folder + path + imageFile.name;
      return {
        path: this.rootFolder + src,
        buffer: imageFile.data,
        src: src
      }
    });

    return this.FileService.uploadFilesFromBuffer(imagesData);
  }
}
