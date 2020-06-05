const queryFilter = (model, populate) => async (req, res, next) => {
  let query;

  // Copy req.query
  const reqQuery = { ...req.query };
  console.log(`queryFilter -> reqQuery`.yellow, reqQuery);

  // Fields to exclude
  const removeFields = ["select", "sort", "page", "limit"];

  // Delete elements of removeFields from reqQuery
  removeFields.forEach(param => delete reqQuery[param]);


  // Create query string
  let queryStr = JSON.stringify(reqQuery);

  // add $ sign infront of operators ($gt, $gte, etc)
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);


  // Finding resource; 
  query = model.find(JSON.parse(queryStr));


  // Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }


  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }

  
  // Populate
  if (populate) {
    query = query.populate(populate);
  }
  
  
  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await model.countDocuments();

  query = query.skip(startIndex).limit(limit);


  // Executing query
  //==============================
  const results = await query;

  // Pagination result
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit
    };
  }

  
  // Result Object
  res.filteredResults = {
    success: true,
    count: results.length,
    pagination,
    data: results
  };

  next();
};

module.exports = queryFilter;


