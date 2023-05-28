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
import SessionModel from '../models/Sessions';
import ImageModel from '../models/Images';
import NavigationModel from '../models/Navigations';

import LogService from '../services/LogService';
import UserService from '../services/UserService';
import BrandService from '../services/BrandService';
import CategoryService from '../services/CategoryService';
import CollectionService from '../services/CollectionService';
import OptionService from '../services/OptionService';
import ProductService from '../services/ProductService';
import SessionService from '../services/SessionService';
import ImageService from '../services/ImageService';
import FileService from '../services/FileService';
import SettingsService from '../services/SettingsService';
import PermissionService from '../services/PermissionService';

//UserService
decorate(inject(TYPES.UserModel), UserService, 0);
decorate(inject(TYPES.SessionService), UserService, 1);
decorate(inject(TYPES.LogService), UserService, 2);
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
decorate(inject(TYPES.ImageService), ProductService, 1);
decorate(inject(TYPES.LogService), ProductService, 2);
decorate(injectable(), ProductService);

//SessionService
decorate(inject(TYPES.SessionModel), SessionService, 0);
decorate(inject(TYPES.SessionConfig), SessionService, 1);
decorate(inject(TYPES.LogService), SessionService, 2);
decorate(injectable(), SessionService);

//ImageService
decorate(inject(TYPES.ImageModel), ImageService, 0);
decorate(inject(TYPES.FileService), ImageService, 1);
decorate(inject(TYPES.LogService), ImageService, 2);
decorate(injectable(), ImageService);

//FileService
decorate(inject(TYPES.LogService), FileService, 0);
decorate(injectable(), FileService);

//FileService
decorate(inject(TYPES.NavigationsModel), SettingsService, 0);
decorate(inject(TYPES.LogService), SettingsService, 1);
decorate(injectable(), SettingsService);

decorate(inject(TYPES.UserService), PermissionService, 0);
decorate(inject(TYPES.LogService), PermissionService, 1);
decorate(injectable(), PermissionService);

//LogService
decorate(inject(TYPES.LogConfig), LogService, 0);
decorate(injectable(), LogService);

//services binding
const container = new Container();

container.bind(TYPES.UserModel).toDynamicValue(() => UserModel);
container.bind(TYPES.BrandModel).toDynamicValue(() => BrandModel);
container.bind(TYPES.CategoryModel).toDynamicValue(() => CategoryModel);
container.bind(TYPES.CollectionModel).toDynamicValue(() => CollectionModel);
container.bind(TYPES.OptionModel).toDynamicValue(() => OptionModel);
container.bind(TYPES.ProductModel).toDynamicValue(() => ProductModel);
container.bind(TYPES.SessionModel).toDynamicValue(() => SessionModel);
container.bind(TYPES.ImageModel).toDynamicValue(() => ImageModel);
container.bind(TYPES.NavigationsModel).toDynamicValue(() => NavigationModel);

container.bind(TYPES.UserService).to(UserService);
container.bind(TYPES.BrandService).to(BrandService);
container.bind(TYPES.CategoryService).to(CategoryService);
container.bind(TYPES.CollectionService).to(CollectionService);
container.bind(TYPES.OptionService).to(OptionService);
container.bind(TYPES.ProductService).to(ProductService);
container.bind(TYPES.LogService).to(LogService);
container.bind(TYPES.SessionService).to(SessionService);
container.bind(TYPES.ImageService).to(ImageService);
container.bind(TYPES.FileService).to(FileService);
container.bind(TYPES.SettingsService).to(SettingsService);
container.bind(TYPES.PermissionService).to(PermissionService);

container.bind(TYPES.LogConfig).toDynamicValue(() => (config.log));
container.bind(TYPES.SessionConfig).toDynamicValue(() => (config.session));

export default container;
