import {decorate, injectable, inject, Container} from 'inversify';
import "reflect-metadata";
import config from '../config';
import {TYPES} from './types';
import UserModel from '../models/Users';
import ProductModel from '../models/Products';

import LogService from '../services/LogService';
import UserService from '../services/UserService';
import ProductService from '../services/ProductService';

//UserService
decorate(inject(TYPES.UserModel), UserService, 0);
decorate(inject(TYPES.LogService), UserService, 1);
decorate(injectable(), UserService);

//ProductService
decorate(inject(TYPES.UserModel), ProductService, 0);
decorate(inject(TYPES.LogService), ProductService, 1);
decorate(injectable(), ProductService);

//LogService
decorate(inject(TYPES.LogConfig), LogService, 0);
decorate(injectable(), LogService);

//services binding
const container = new Container();

container.bind(TYPES.UserModel).toDynamicValue(() => UserModel);
container.bind(TYPES.ProductModel).toDynamicValue(() => ProductModel);

container.bind(TYPES.UserService).to(UserService);
container.bind(TYPES.ProductService).to(ProductService);
container.bind(TYPES.LogService).to(LogService);

container.bind(TYPES.LogConfig).toDynamicValue(() => (config.log));

export default container;
