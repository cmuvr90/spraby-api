export default class CategoryService {

  /**
   *
   * @param Category
   * @param LogService
   */
  constructor(Category, LogService) {
    this.category = Category;
    this.log = LogService.createLogger('category_service');
  }
}
