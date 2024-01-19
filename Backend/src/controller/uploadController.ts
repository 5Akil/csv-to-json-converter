import { Products } from "../entity/product";



class uploadController {
    static uploadeCSV = async (req, res) => {
        const { parsedData } = req.body
        if (parsedData) {
            const response = parsedData.map(async (item) => {
                const existingEntry = await Products.findOne({ where: { title: item.title } });
                if (existingEntry) {
                    existingEntry.price = item.price;
                    existingEntry.description = item.description;
                    existingEntry.category = item.category;
                    existingEntry.image = item.image;
                    return await Products.save(existingEntry);
                } else {
                    const entries = new Products();
                    entries.title = item.title;
                    entries.price = item.price;
                    entries.description = item.description;
                    entries.category = item.category;
                    entries.image = item.image;
                    return await Products.save(entries)
                }
            })
            const finalResponse = await Promise.all(response)
            res.status(200).send(finalResponse)
        }
    }
}

export default uploadController