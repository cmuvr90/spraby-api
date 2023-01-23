import {Controller} from '..';
import {TYPES} from '../../ioc/types';

export class BrandController extends Controller {

  /**
   *
   * @returns {Promise<*>}
   */
  index = async () => {
    try {

      const params = this.getQuery();

      function getFindData(search) {
        try {
          const findData = {};
          if (search?.length) {
            const key = search.split('[')[0];
            const value = search.split('[')[1].replace(']', '');
            findData[key] = {'$regex': `.*${value}.*`}
          }
          return findData;

        } catch (e) {
          return {};
        }
      }

      function getSelectData(select) {
        try {
          let selectData = {};
          if (select?.length) {
            select.split(',').map(i => {
              if (!selectData[i]) selectData[i] = 1;
            });
          }
          return selectData;
        } catch (e) {
          return {};
        }
      }

      function getPopulateData(populate) {
        let populateData = [];

        const populateItems = populate.split('|');

        populateItems.map(populateItem => {
          const path = populateItem.split('[')[0];
          let queries = populateItem.split('[', 0)[1];

          if (queries) {
            queries = queries.slice(0, -1)
          }

          console.log(populateItem.split('[', 2));
        });


        console.log(populateItems);


        return populateData;
      }


      const findData = getFindData(params.search);
      const selectData = getSelectData(params.select);
      const populateData = getPopulateData(params.populate);

      const BrandService = this.getService(TYPES.BrandService);
      const data = await BrandService.brand
      .find(findData)
      .select(selectData)

      // .populate(populateData)

      // .populate([
      //   {
      //     path: 'user'
      //   },
      //   {
      //     path: 'categories',
      //     populate: {
      //       path: 'options',
      //     },
      //   }
      // ])

      return await this.successResponse({populateData, findData, selectData, params, data});
    } catch (e) {
      return await this.errorResponse(e);
    }
  }
}
