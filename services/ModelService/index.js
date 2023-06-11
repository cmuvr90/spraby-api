export default class ModelService {

  /**
   *
   * @param model
   */
  constructor(model) {
    this.model = model;
  }

  /**
   *
   * @returns {Promise<*>}
   */
  get = async () => await this.model.find();

  /**
   *
   * @param query
   * @param param
   * @returns {Promise<*>}
   */
  updateOrCreate = async (query = {}, param = {}) => await this.model.updateOrCreate(query, param);

  /**
   *
   * @returns {Promise<*>}
   */
  delete = async () => await this.model.deleteMany();

  /**
   *
   * @param email
   * @returns {Promise<*>}
   */
  deleteByEmail = async email => await this.model.deleteMany({email});

  /**
   *
   */
  getAllPrepare = async () => (await this.get()).map(i => this.model.prepareItem(i));
}
