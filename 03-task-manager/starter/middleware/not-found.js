const notFound = (req,res) =>{
    res.status(404).send('sorry unable to find the page');
} 

module.exports = notFound;