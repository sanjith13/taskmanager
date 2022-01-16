const Products = require('../models/product');


const getAllProductsStatic = async (req,res) =>{
    const search = 'wooden';
    try{
    const products = await Products.find({}).sort('-name price');
    res.status(200).json({ products,Length:products.length });
    }
    catch(error){
        console.log(error);
    }
}
const getAllProducts = async (req,res) =>{
    const {featured,company,search,sort,field,numericFilters } = req.query;
    const queryObject = {}
    if(featured){queryObject.featured = featured === 'true'?true:false}
    if(company){queryObject.company = company}
    if(search){queryObject.name = {$regex:search,$options:'i'}}
    try{
        if(numericFilters){
            const operatorMap = {
                '>': '$gt',
                '>=': '$gte',
                '=': '$eq',
                '<': '$lt',
                '<=': '$lte',
            }
            const regEx = /\b(<|>|>=|=|<|<=)\b/g;
            let filters = numericFilters.replace(regEx,(match)=> `-${operatorMap[match]}-`);
            console.log(filters);

            const options = ['price','rating'];

            filters = filters.split(',').forEach(item => {
                const [field,operator,value] = item.split('-');
                if(options.includes(field)){
                    queryObject[field] = { [operator] : Number(value) }
                    console.log(`fields: ${field} operator: ${operator} value: ${value}`);
                }
            });
        }
        let result = Products.find(queryObject);
        if(sort){
            const sortList = sort.split(',').join(' ');
            result = result.sort(sortList);
        }else{
            result = result.sort('createdAt');
        }
        if(field){
            const filedList = field.split(',').join(' ');
            result = result.select(filedList);
        }
        
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1)*limit;

        result = result.skip(skip).limit(limit);
        const products = await result;
        res.status(200).json({ products , productsnumber:products.length });
    }
    catch(error){
            console.log(error);
    }
}
module.exports = {getAllProducts,getAllProductsStatic}