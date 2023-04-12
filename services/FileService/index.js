import * as fs from 'fs';

export default class FileService {

  /**
   *
   * @param LogService
   */
  constructor(LogService) {
    this.log = LogService.createLogger('FileService');
  }

  /**
   *
   * @param paths
   * @returns {Promise<{success: [], failed: []}>}
   */
  removeFilesByPath = async paths => {
    const success = [];
    const failed = [];

    for (const path of paths) {
      try {
        await this.removeFileByPath(path);
        success.push(path);
      } catch (e) {
        this.log.error(`[FileService][removeFilesByPath] Error: ${e?.message || e}`);
        failed.push(path);
      }
    }

    return {success, failed};

  }

  /**
   *
   * @param path
   * @returns {Promise<unknown>}
   */
  removeFileByPath = async path => {
    return new Promise(((resolve, reject) => {
      fs.unlink(path, (response) => {
        if (response?.message) {
          reject(response.message);
        } else {
          resolve(true);
        }
      });
    }))
  }

  /**
   *
   * @param filesData
   * @returns {{success: [], failed: []}}
   */
  uploadFilesFromBuffer = filesData => {
    const success = [];
    const failed = [];

    for (const fileData of filesData) {
      const response = this.uploadFileFromBuffer(fileData.path, fileData.buffer);
      if (response) {
        success.push(fileData);
      } else {
        failed.push(fileData);
      }
    }
    return {success, failed};
  }

  /**
   *
   * @param path
   * @param buffer
   * @returns {*}
   */
  uploadFileFromBuffer = (path, buffer) => {
    try {
      fs.writeFileSync(path, buffer, 'binary');
      return path;
    } catch (e) {
      console.log(`[FileService][uploadFileFromBuffer] Error:  ${e?.message ?? e}`);
      return null;
    }
  }

  /**
   *
   * @param path
   */
  createPathDirectories(path) {
    const pathData = path.split('/');
    let dir = '';
    for (const pathItem of pathData) {
      if (!pathItem.length) continue;
      dir += pathItem + '/';
      if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    }
  }

  /**
   *
   * @param path
   */
  removePathEmptyDirectories = async path => {
    const pathData = path.split('/');
    let dir = [...pathData];

    for (const pathItem of pathData) {
      const path = dir.join('/');
      this.removeDirectoryIfEmpty(path);
      dir.pop();
    }
  }

  /**
   *
   * @param path
   * @returns {boolean|void}
   */
  removeDirectoryIfEmpty = path => {
    try {
      if (this.isEmptyDirectory(path)) return this.removeDirectory(path);
      return false;
    } catch (e) {
      this.log.error(`[FileService][removeDirectoryIfEmpty] Error: ${e?.message || e}`);
      return false;
    }
  }

  /**
   *
   * @param path
   * @returns {boolean|void}
   */
  removeDirectory = path => {
    try {
      if (fs.existsSync(path)) return fs.rmSync(path, {recursive: true, force: true}) === undefined
      return false;
    } catch (e) {
      this.log.error(`[FileService][removeDirectory] Error: ${e?.message || e}`);
      return false;
    }
  }

  /**
   *
   * @param path
   * @returns {null|boolean}
   */
  isEmptyDirectory = path => {
    try {
      const data = fs.readdirSync(path)
      return Array.isArray(data) && !data?.length;
    } catch (e) {
      this.log.error(`[FileService][isEmptyDirectory] Error: ${e?.message || e}`)
      return null;
    }
  }
}
