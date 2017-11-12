let jd_domain = 'http://bjxt123.cn/Bestbuy/jd/';
let gm_domain = "http://bjxt123.cn/Bestbuy/gm/";
let compare_API = 'http://bjxt123.cn/Bestbuy/findComparableComp';

const jd_API = {
  api: jd_domain + 'api',
  findAllComp: jd_domain + 'findAllComp',
  findCompByBrand: jd_domain + 'findCompByBrand/',
  findCompByName: jd_domain + 'findCompByName/',
  findCompByCPU: jd_domain + 'findCompByCPU/',
  findCompByGPU: jd_domain + 'findCompByGPU/',
  findCompByID: jd_domain + 'findCompByID/',
  getPriceByDay: jd_domain + 'getPriceByDay/',
  getLowestPriceList: jd_domain + 'getLowestPriceList',
  getTodayRecommendList: jd_domain + 'getTodayRecommendList',
  getPriceList: jd_domain + 'getPriceList/'
};

const gm_API = {
  api: gm_domain + 'api',
  findAllComp: gm_domain + 'findAllComp',
  findCompByBrand: gm_domain + 'findCompByBrand/',
  findCompByID: gm_domain + 'findCompByID/',
  getPriceByDay: gm_domain + 'getPriceByDay/',
  getPriceList: gm_domain + 'getPriceList/',
  getLowestPriceList: gm_domain + 'getLowestPriceList',
  getTodayRecommendList: gm_domain + 'getTodayRecommendList'
};

export {jd_API, gm_API, compare_API};