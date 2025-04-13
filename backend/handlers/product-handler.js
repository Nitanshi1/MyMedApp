const Product = require("./../db/product");

async function addProduct(model){
    let product = new Product({
        ...model,
    });
    await product.save();
    return product.toObject();
}

async function updateProduct(id,model){
    await Product.findByIdAndUpdate(id,model);

}
async function deleteProduct(id){
   
    await Product.findByIdAndDelete(id);
}

async function getAllProducts(){

    let products=await Product.find();

    return products.map(x=>x.toObject());
}

async function getProduct(id)
{
    let product = await Product.findById(id);
    return product.toObject();
}


async function getNewProducts(){
    let newProduct = await Product.find({
        isNewProduct: true,
    });
   return newProduct.map(x=>x.toObject());
}


async function getFeaturedProducts(){
    let featuredProduct = await Product.find({
        isFeatured: true,
    });
   return featuredProduct.map(x=>x.toObject());
}

async function getProductForListing(
  searchTerm = '',
  categoryId = '',
  brandId = '',
  page = 1,
  pageSize = 6,
  sortBy = 'price',
  sortOrder = -1
) {
  // Ensure sortOrder is a valid number (1 for ascending, -1 for descending)
  sortOrder = Number(sortOrder);
  const validSortFields = ['price', 'name', 'createdAt', 'rating']; 

  // If sortBy is not a valid field, default to 'price'
  if (!validSortFields.includes(sortBy)) {
    sortBy = 'price';
  }

  // Ensure sortOrder is either 1 or -1 (default to -1 if invalid)
  if (sortOrder !== 1 && sortOrder !== -1) {
    sortOrder = -1; 
  }

  // Initialize an empty query filter object
  let queryFilter = {};

  // Apply search filter if searchTerm is provided
  if (searchTerm) {
    queryFilter.$or = [
      { name: { $regex: new RegExp(searchTerm, 'i') } },  // Search in 'name'
      { shortDescription: { $regex: new RegExp(searchTerm, 'i') } }  // Search in 'shortDescription'
    ];
  }

  // Apply category filter if categoryId is provided
  if (categoryId) {
    queryFilter.categoryId = categoryId;
  }

  // Apply brand filter if brandId is provided
  if (brandId) {
    queryFilter.brandId = brandId;
  }

  console.log("queryFilter", queryFilter);

  try {
    // Fetch products with applied filters, sorting, and pagination
    const products = await Product.find(queryFilter)
      .sort({ [sortBy]: sortOrder })              // Sorting based on sortBy and sortOrder
      .skip((page - 1) * pageSize)                // Skipping records for pagination
      .limit(pageSize);                           // Limiting results per page

    // Count the total number of matching products
    const totalProducts = await Product.countDocuments(queryFilter);

    // Return results with pagination metadata
    return {
      products: products.map(p => p.toObject()),  // Convert each product to an object
      totalProducts,                              // Total number of products
      currentPage: page,                          // Current page number
      totalPages: Math.ceil(totalProducts / pageSize)  // Total number of pages
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products.');
  }
}


module.exports={deleteProduct,getProductForListing, getProduct,getAllProducts,updateProduct,addProduct,getNewProducts,getFeaturedProducts}