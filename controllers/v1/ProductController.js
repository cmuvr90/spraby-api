import {TYPES} from '../../ioc/types';
import {getHandle} from '../../services/utilites';

class ProductController {

  /**
   *
   * @param req
   * @param res
   * @param next
   * @returns {Promise<*>}
   */
  index = async (req, res, next) => {
    try {
      const ProductService = req.getService(TYPES.ProductService);
      const products = await ProductService.product.getProductsDto();
      return res.sendSuccess(products);
    } catch (e) {
      next(e)
    }
  }

  /**
   *
   * @param req
   * @param res
   * @param next
   * @returns {Promise<*>}
   */
  get = async (req, res, next) => {
    try {
      const handle = req?.params?.handle;
      const ProductService = req.getService(TYPES.ProductService);
      const product = await ProductService.product.getProductDtoByHandle(handle);
      return res.sendSuccess(product);
    } catch (e) {
      next(e)
    }
  }

  /**
   *
   * @param req
   * @param res
   * @param next
   * @returns {Promise<*>}
   */
  create = async (req, res, next) => {
    try {
      const params = req?.body;
      const brand = await req.getService(TYPES.BrandService).brand.findOne(); //@todo fix
      const ProductService = req.getService(TYPES.ProductService);
      const product = await ProductService.product.createProduct({...params, brand: brand.getId()});
      const productDto = await ProductService.product.getProductDto(product);
      return res.sendSuccess(productDto);
    } catch (e) {
      next(e)
    }
  }

  /**
   *
   * @param req
   * @param res
   * @param next
   * @returns {Promise<*>}
   */
  update = async (req, res, next) => {
    try {
      const id = req?.params?.id;
      const params = req?.body;
      const ProductService = req.getService(TYPES.ProductService);
      await ProductService.product.updateById(id, params);
      const productDto = await ProductService.product.getProductDtoById(id);
      return res.sendSuccess(productDto);
    } catch (e) {
      next(e)
    }
  }

  /**
   *
   * @param req
   * @param res
   * @param next
   * @returns {Promise<*>}
   */
  delete = async (req, res, next) => {
    try {
      const id = req?.params?.id;
      const ProductService = req.getService(TYPES.ProductService);
      await ProductService.product.deleteById(id);
      return res.sendSuccess({});
    } catch (e) {
      next(e)
    }
  }
}

export default new ProductController()
