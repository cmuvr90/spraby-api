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
   * @returns {Promise<{success: [], failed: []}>}
   */
  uploadFilesFromBuffer = async filesData => {
    const success = [];
    const failed = [];

    for (const fileData of filesData) {
      try {
        await this.uploadFileFromBuffer(fileData.path, fileData.buffer);
        success.push(fileData);
      } catch (e) {
        this.log.error(`[FileService][uploadFilesFromBuffer] Error: ${e?.message || e}`);
        failed.push(fileData);
      }
    }

    return {success, failed};
  }

  /**
   *
   * @param path
   * @param buffer
   * @returns {Promise<unknown>}
   */
  uploadFileFromBuffer = async (path, buffer) => {
    return new Promise((resolve, reject) => {
      fs.writeFile(path, buffer, 'binary', (err) => {
        if (!err) {
          resolve(path);
        } else {
          reject(err?.message ?? 'Error upload file')
        }
      });
    });
  }
}
