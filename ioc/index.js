import {decorate, injectable, Container} from 'inversify';
import "reflect-metadata";
import {TYPES} from './types';
import LogService from '../services/LogService';

//dependencies declaration

//LogService
decorate(injectable(), LogService);

//services binding
const container = new Container();
container.bind(TYPES.LogService).to(LogService);

export default container;
