const ManagerMiddleware = async (req, res, next) => {
  try {
    const user = req.getUser();
    if (!user.isManager()) return next();

    //SET BRAND
    if (!!user?.brands?.length) req.brand = user.brands[0];
    const brand = req.getBrand();

    //PROTECT
    if (req.getMethod() === 'GET') {
      if (req.getPath() === '/categories') {
        if (!brand.categories?.length) return res.status(200).json([]);
        req.query.ids = brand.categories;
      }
    }

    next();
  } catch (e) {
    return next(e);
  }
}

export default ManagerMiddleware;
