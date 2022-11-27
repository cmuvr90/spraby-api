import {TYPES} from '../../ioc/types';
import {getHandle} from '../../services/utilites';
import Options from '../../models/Options';
import Categories from '../../models/Categories';
import Collections from '../../models/Collections';
import Users from '../../models/Users';
import Brands from '../../models/Brands';

class SeedCommand {

  constructor(ioc) {
    this.ProductService = ioc.get(TYPES.ProductService);
  }

  /**
   *
   * @param params
   * @returns {Promise<void>}
   */
  async handle(params) {
    await this.createOptions();
    await this.createCategories();
    await this.createCollections();
    await this.createUsers();
    await this.createBrands();
  }

  /**
   *
   * @returns {Promise<void>}
   */
  async createBrands() {
    const users = await Users.find({role: Users.ROLES.MANAGER});
    const categories = await Categories.find();

    const brands = getBrandsData().map(i => {
      const user = users.find(u => u.name === i.userId);
      return {
        ...i,
        userId: user.id,
        categories: i.categories.map(category => {
          const handle = getHandle(category);
          const categoryData = categories.find(item => item.handle === handle);
          return categoryData.id;
        })
      }
    });

    await Brands.deleteMany();
    await Brands.insertMany(brands);
    console.log('create brands...');
  }

  /**
   *
   * @returns {Promise<void>}
   */
  async createUsers() {
    await Users.deleteMany();
    await Users.insertMany(getUsersData());
    console.log('create users...');
  }

  /**
   *
   * @returns {Promise<void>}
   */
  async createCollections() {
    const categories = await Categories.find();
    const collections = getCollectionsData().map(i => ({
      ...i,
      handle: getHandle(i.name),
      categories: i.categories.map(category => {
        const handle = getHandle(category);
        const categoryData = categories.find(item => item.handle === handle);
        return categoryData.id;
      })
    }));

    await Collections.deleteMany();
    await Collections.insertMany(collections);
    console.log('create collections...');
  }

  /**
   *
   * @returns {Promise<void>}
   */
  async createCategories() {
    const options = await Options.find();

    const categories = getCategoriesData().map(i => ({
      ...i,
      handle: getHandle(i.name),
      options: i.options.map(option => {
        const key = getHandle(option);
        const optionData = options.find(item => item.key === key);
        return optionData.id;
      })
    }));

    await Categories.deleteMany();
    await Categories.insertMany(categories);
    console.log('create categories...');
  }

  /**
   *
   * @returns {Promise<void>}
   */
  async createOptions() {
    const options = getOptionsParams().map(i => ({...i, key: getHandle(i.name)}));
    await Options.deleteMany();
    await Options.insertMany(options);
    console.log('create options...');
  }
}

export default SeedCommand;

/**
 *
 * @returns {({name: string, description: string, categories: [string, string, string], userId: string}|{name: string, description: string, categories: [string, string, string], userId: string})[]}
 */
function getBrandsData() {
  return [
    {
      userId: 'Manager1',
      name: 'Мужской брэнд',
      description: 'Мужской',
      categories: ['Куртки мужские', 'Обувь мужская', 'Украшения мужские'],
    },
    {
      userId: 'Manager2',
      name: 'Женский брэнд',
      description: 'Женский',
      categories: ['Куртки женские', 'Обувь женская', 'Украшения женские'],
    }
  ]
}

/**
 *
 * @returns {({lastName: string, password: string, role: string, name: string, email: string}|{lastName: string, password: string, role: string, name: string, email: string}|{lastName: string, password: string, role: string, name: string, email: string})[]}
 */
function getUsersData() {
  return [
    {
      name: 'Admin',
      lastName: 'Admin',
      email: 'admin@gmail.com',
      role: Users.ROLES.ADMIN,
      password: 'admin'
    },
    {
      name: 'Manager1',
      lastName: 'M1',
      email: 'manager1@gmail.com',
      role: Users.ROLES.MANAGER,
      password: 'manager'
    },
    {
      name: 'Manager2',
      lastName: 'M2',
      email: 'manager2@gmail.com',
      role: Users.ROLES.MANAGER,
      password: 'manager'
    }
  ]
}

/**
 *
 * @returns {({name: string, description: string, categories: [string, string, string], title: string}|{name: string, description: string, categories: [string, string, string], title: string})[]}
 */
function getCollectionsData() {
  return [
    {
      name: 'Мужское',
      title: 'Мужское',
      description: 'Мужское',
      categories: ['Куртки мужские', 'Обувь мужская', 'Украшения мужские'],
    },
    {
      name: 'Женское',
      title: 'Женское',
      description: 'Женское',
      categories: ['Куртки женские', 'Обувь женская', 'Украшения женские'],
    },
  ]
}

/**
 *
 * @returns {({name: string, options: [string, string, string], description: string, title: string}|{name: string, options: [string, string, string], description: string, title: string}|{name: string, options: [string, string], description: string, title: string}|{name: string, options: [string, string], description: string, title: string}|{name: string, options: [string, string], description: string, title: string})[]}
 */
function getCategoriesData() {
  return [
    {
      name: 'Куртки мужские',
      title: 'Куртки',
      description: 'Куртки мужские',
      options: ['Цвет', 'Размер одежды', 'Материал одежды']
    },
    {
      name: 'Куртки женские',
      title: 'Куртки',
      description: 'Куртки женские',
      options: ['Цвет', 'Размер одежды', 'Материал одежды']
    },
    {
      name: 'Обувь мужская',
      title: 'Обувь',
      description: 'Обувь мужская',
      options: ['Цвет', 'Размер обуви']
    },
    {
      name: 'Обувь женская',
      title: 'Обувь',
      description: 'Обувь женская',
      options: ['Цвет', 'Размер обуви']
    },
    {
      name: 'Украшения мужские',
      title: 'Украшения',
      description: 'Украшения мужские',
      options: ['Цвет', 'Материал общий']
    },
    {
      name: 'Украшения женские',
      title: 'Украшения',
      description: 'Украшения женские',
      options: ['Цвет', 'Материал общий']
    }
  ]
}

/**
 *
 * @returns {({values: string[], name: string, description: string, title: string}|{values: string[], name: string, description: string, title: string}|{values: [string, string, string], name: string, description: string, title: string}|{values: string[], name: string, description: string, title: string}|{values: string[], name: string, description: string, title: string})[]}
 */
function getOptionsParams() {
  return [
    {
      name: 'Цвет',
      title: 'Цвет',
      description: 'Цвет',
      values: [
        'красный',
        'зеленый',
        'белый',
        'бежевый',
        'оранжевый',
        'синий',
        'фиолетовый',
        'голубой',
      ]
    },
    {
      name: 'Материал общий',
      title: 'Материал',
      description: 'Материал общий',
      values: [
        'хлопок',
        'полиэстер',
        'шерсть',
        'дерево',
        'металл',
        'серебро',
        'золото',
      ]
    },
    {
      name: 'Материал одежды',
      title: 'Материал',
      description: 'Материал одежды',
      values: [
        'хлопок',
        'полиэстер',
        'шерсть',
      ]
    },
    {
      name: 'Размер одежды',
      title: 'Размер',
      description: 'Размер одежды',
      values: [
        's',
        'm',
        'l',
        'xl',
        'xxl',
        'xxxl',
      ]
    },
    {
      name: 'Размер обуви',
      title: 'Размер',
      description: 'Размер обуви',
      values: [
        '34',
        '35',
        '36',
        '37',
        '38',
        '39',
        '40',
        '41',
        '42',
        '43',
        '44',
        '45',
      ]
    }
  ]
}
