const dataSchema = require('../models/dataSchema');
const dataRouter = require('express').Router();


//Create Category
dataRouter.post('/createData',async (req,res)=>{
    
    try {
        const {title,tagline,description,coverImage,icon} = req.body;

        // const exist = await dataSchema.findOne({
        //     title: title
        // });

        // if (exist) {
        //     return res.status(400).send({ error: 'Category already exists' });
        // }

        const data = await dataSchema.create(
            {
                title:title,
                tagline:tagline,
                description:description,
                coverImage:coverImage,
                icon:icon
            }
        )
        res.status(201).json(data);

    } catch (error) {
        res.status(500).send({error:error.message || 'Internal Error'});
    }
})

//Display All Category
dataRouter.get('/getAllData',async (req,res)=>{
    try {
        const exist = await dataSchema.find();
        res.status(201).json(exist);
    } catch (error) {
        res.status(500).send({error:error.message||'Internal error'})
    }
})

// Get Specific Data
dataRouter.get('/getData/:title',async (req,res)=>{
    try {
        const {title} = req.params;

        const getData = await dataSchema.findOne({title});
        if (!getData) {
            return res.status(404).json({ error: 'Data not found'});
        }

        res.status(201).json({getData});
    } catch (error) {
        res.status(500).send({error:error.message||'Internal error'})
    }
} )

//Get All Title
dataRouter.get('/getAllTitle',async (req,res)=>{
    try {
        const title = await dataSchema.find({}, { title: 1, _id: 0 });
        res.status(201).json(title);
    } catch (error) {
        res.status(500).send({error:error.message||'Internal error'})
    }
})

//Insert Images
dataRouter.post('/insertImages',async (req,res)=>{
    try {
        
        const {title,images} = req.body;

        if (!Array.isArray(images)) {
            return res.status(400).send({ error: 'Images must be an array' });
        }


        const data = await dataSchema.findOne({title});
        if(!data)
        {
            return res.status(500).send({error:'Category Not Found!!!'});
        }

        data.images = [...data.images,...images];
        const newdata = await data.save();

        res.status(201).json(newdata);
        
        
    } catch (error) {
        res.status(500).send({error:error.message});
    }
})


//Delete Category
dataRouter.delete('/deleteData',async (req,res)=>{

    try {
        
        const {title} = req.body;

        const data = await dataSchema.findOne({title:title});
        if(!data)
        {
            return res.status(500).send({error:'Category Not Found!!!'});
        }

        await dataSchema.deleteOne({title:title});

        res.status(201).send({message:'Category Deleted Successfully'});

    } catch (error) {
        res.status(500).send({error:error.message});
    }

})


//Delete Image
dataRouter.delete('/deleteImage', async (req, res) => {
    try {
        const { title, image } = req.body;

        if (!title || !image) {
            return res.status(400).send({ error: 'Title and Image are required.' });
        }

        const data = await dataSchema.findOne({ title });

        if (!data) {
            return res.status(404).send({ error: 'Category Not Found!!!' });
        }

        const updatedImages = data.images.filter(img => img !== image);

        if (updatedImages.length === data.images.length) {
            return res.status(404).send({ error: 'Image not found in the category!' });
        }

        data.images = updatedImages;

        const updatedData = await data.save();

        res.status(200).json(updatedData);

    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error.message || 'Internal Error' });
    }
});


//Update Category Data
dataRouter.put('/updateData',async (req,res)=>{
    try {
        
        const {title,tagline,description,coverImage,icons} = req.body;

        const updateFields = {};
        if (description) updateFields.description = description;
        if (tagline) updateFields.tagline = tagline;
        if (coverImage) updateFields.coverImage = coverImage;
        if (icons) updateFields.icons = icons;
        
        const data = await dataSchema.findOneAndUpdate(
            {title},
            {$set:updateFields},
            {new:true}
        )

        if(!data)
        {
            res.status(500).send({error:'Category Not Found!!!!'});
        }

        res.status(201).json(data);

    } catch (error) {
        res.status(500).send({error:error.message});
    }
})

module.exports = dataRouter;