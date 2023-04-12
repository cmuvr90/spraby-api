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
      const id = req?.params?.id;
      const ProductService = req.getService(TYPES.ProductService);
      const product = await ProductService.product.getProductDtoById(id);
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
      const VariantService = req.getService(TYPES.VariantService);

      const variants = params.variants.map(i => ({...i}))
      delete params.variants;

      await ProductService.product.updateById(id, params);
      await VariantService.saveVariants(id, variants);
      await ProductService.product.updateVariantsIds(id);

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
      const ImageService = req.getService(TYPES.ImageService);
      const product = await ProductService.product.getProductDtoById(id);
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
  uploadImages = async (req, res, next) => {
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
}

export default new ProductController()
