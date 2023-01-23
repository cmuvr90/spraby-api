import {decorate, injectable, inject, Container} from 'inversify';
import "reflect-metadata";
import config from '../config';
import {TYPES} from './types';
import UserModel from '../models/Users';
import BrandModel from '../models/Brands';
import CategoryModel from '../models/Categories';
import CollectionModel from '../models/Collections';
import OptionModel from '../models/Options';
import ProductModel from '../models/Products';
import VariantModel from '../models/Variants';


import LogService from '../services/LogService';
import UserService from '../services/UserService';
import BrandService from '../services/BrandService';
import CategoryService from '../services/CategoryService';
import CollectionService from '../services/CollectionService';
import OptionService from '../services/OptionService';
import ProductService from '../services/ProductService';
import VariantService from '../services/VariantService';
import ModelService from '../services/ModelService';

//UserService
decorate(inject(TYPES.UserModel), UserService, 0);
decorate(inject(TYPES.LogService), UserService, 1);
decorate(injectable(), UserService);

//BrandService
decorate(inject(TYPES.BrandModel), BrandService, 0);
decorate(inject(TYPES.LogService), BrandService, 1);
decorate(injectable(), BrandService);

//CategoryService
decorate(inject(TYPES.CategoryModel), CategoryService, 0);
decorate(inject(TYPES.LogService), CategoryService, 1);
decorate(injectable(), CategoryService);

//CollectionService
decorate(inject(TYPES.CollectionModel), CollectionService, 0);
decorate(inject(TYPES.LogService), CollectionService, 1);
decorate(injectable(), CollectionService);

//OptionService
decorate(inject(TYPES.OptionModel), OptionService, 0);
decorate(inject(TYPES.LogService), OptionService, 1);
decorate(injectable(), OptionService);

//ProductService
decorate(inject(TYPES.ProductModel), ProductService, 0);
decorate(inject(TYPES.LogService), ProductService, 1);
decorate(injectable(), ProductService);

//VariantService
decorate(inject(TYPES.VariantModel), VariantService, 0);
decorate(inject(TYPES.LogService), VariantService, 1);
decorate(injectable(), VariantService);

//LogService
decorate(inject(TYPES.LogConfig), LogService, 0);
decorate(injectable(), LogService);

//services binding
const container = new Container();

container.bind(TYPES.UserModel).toDynamicValue(() => new ModelService(UserModel));
container.bind(TYPES.BrandModel).toDynamicValue(() => new ModelService(BrandModel));
container.bind(TYPES.CategoryModel).toDynamicValue(() => new ModelService(CategoryModel));
container.bind(TYPES.CollectionModel).toDynamicValue(() => new ModelService(CollectionModel));
container.bind(TYPES.OptionModel).toDynamicValue(() => new ModelService(OptionModel));
container.bind(TYPES.ProductModel).toDynamicValue(() => new ModelService(ProductModel));
container.bind(TYPES.VariantModel).toDynamicValue(() => new ModelService(VariantModel));

container.bind(TYPES.UserService).to(UserService);
container.bind(TYPES.BrandService).to(BrandService);
container.bind(TYPES.CategoryService).to(CategoryService);
container.bind(TYPES.CollectionService).to(CollectionService);
container.bind(TYPES.OptionService).to(OptionService);
container.bind(TYPES.ProductService).to(ProductService);
container.bind(TYPES.VariantService).to(VariantService);
container.bind(TYPES.LogService).to(LogService);

container.bind(TYPES.LogConfig).toDynamicValue(() => (config.log));

export default container;
