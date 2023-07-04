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
      const products = await ProductService.product.getProductsJsonById();
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
      const id = req?.params?.id;
      const ProductService = req.getService(TYPES.ProductService);
      const product = await ProductService.product.getProductJsonById(id);
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
      const data = await ProductService.product.createProduct({...params, brand: brand.getId()});
      const product = await ProductService.product.getProductJsonById(data.id);
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
  update = async (req, res, next) => {
    try {
      const id = req?.params?.id;
      const params = req?.body;
      const ProductService = req.getService(TYPES.ProductService);
      await ProductService.product.updateProduct(id, params);
      const product = await ProductService.product.getProductJsonById(id);
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
  delete = async (req, res, next) => {
    try {
      const id = req?.params?.id;
      const ProductService = req.getService(TYPES.ProductService);
      const ImageService = req.getService(TYPES.ImageService);
      const product = await ProductService.product.getProductJsonById(id);
      const imagesSrc = (product?.images ?? []).map(i => i.src);

      await ProductService.product.deleteById(id);
      await ImageService.removeImagesBySrc(imagesSrc);

      return res.sendSuccess({});
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
  createVariant = async (req, res, next) => {
    try {
      const params = req.body;
      const id = req.params.id;

      const ProductService = req.getService(TYPES.ProductService);
      await ProductService.createVariant(id, params);
      const product = await ProductService.product.getProductJsonById(id);
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
  updateVariant = async (req, res, next) => {
    try {
      const params = req.body;
      const productId = req.params.productId;
      const variantId = req.params.variantId;

      const ProductService = req.getService(TYPES.ProductService);
      await ProductService.updateVariant(productId, variantId, params);
      const product = await ProductService.product.getProductJsonById(productId);
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
  deleteVariant = async (req, res, next) => {
    try {
      const productId = req.params.productId;
      const variantId = req.params.variantId;

      const ProductService = req.getService(TYPES.ProductService);
      await ProductService.deleteVariant(productId, variantId);
      const product = await ProductService.product.getProductJsonById(productId);
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
  createImages = async (req, res, next) => {
    try {
      const id = req.params.id;
      const ProductService = req.getService(TYPES.ProductService);
      const isUploaded = await ProductService.uploadAndSaveImages(id, Object.values(req?.files));

      const message = isUploaded ? 'Upload success' : 'Uploaded with errors';
      return res.sendSuccess({message, error: !isUploaded});
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
  deleteImages = async (req, res, next) => {
    try {
      const id = req.params.id;
      const ProductService = req.getService(TYPES.ProductService);
      const isRemoved = await ProductService.removeImages(id, req?.query.ids);
      const message = isRemoved ? 'Removed success' : 'Removed with errors';
      return res.sendSuccess({message, error: !isRemoved});
    } catch (e) {
      next(e)
    }
  }
}

export default new ProductController()
