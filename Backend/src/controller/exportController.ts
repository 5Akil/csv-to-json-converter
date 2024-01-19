import { Products } from "../entity/product";



class exportController {
    static export = async (req, res) => {
        try {
            const { selectedData } = req.body
            console.log(selectedData,"<=====================");
            
            const result = selectedData.map(async(item) => {
                    
                const exist = await Products.findOne({where: {productID : item.productID}})
                console.log(exist ,',,,,,,,,,,,,,,,,,,');

                if (exist?.exported === true) {
                     res.status(400).send({message:'Data is already deleted'})
                }else{
                    const response = Products.createQueryBuilder().update(Products).set({ exported: true }).where('productID=:id', { id: item.productID }).execute()
                    res.status(200).send('successfully exported')
                    // return response
                }
            })
            // const a = await Promise.all(result)
        } catch (error) {
            console.log(error);
            res.status(400).send('failed')
        }
    }

}


export default exportController