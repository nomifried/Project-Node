import { productModel } from "../models/Product.js";
import mongoose from 'mongoose';



// export const getAllrPoducts = async(req, res)=> {
//     let limit = req.query.limit || 10;
//     let page = req.query.page || 1;
//     let s = req.query.s || ""
//     let reg = new RegExp(s)
//     try{
//         alert("hhh")
//         // 
//         let data = await productModel.find().sort({name: 1}).skip(((page - 1) * limit)).limit(limit);
//         let totalproduct = await productModel.countDocuments();
//         let totalpages = Math.ceil(totalproduct/limit)
//         res.json({data:data,totalpages:totalpages,currentpage:page})
//     }
//     catch (err){
//         console.log(err)
//         res.status(400).json({title:"cannot get all",message:
//             err.message
//         })

//     }}
export const getAllrPoducts = async (req, res) => {
    let limit = Number(req.query.limit) || 10;
    let page = Number(req.query.page) || 1;

    try {
        console.log("Fetching products from DB...");

        let data = await productModel
            .find()
            .sort({ name: 1 })
            .skip((page - 1) * limit)
            .limit(limit);

        let totalproduct = await productModel.countDocuments();
        let totalpages = Math.ceil(totalproduct / limit);

        console.log("Products fetched:", data.length); // לוודא שהבאנו נתונים

        res.json({ data: data, totalpages: totalpages, currentpage: page });
    } catch (err) {
        console.error("Error fetching products:", err);
        res.status(400).json({ title: "Cannot get all products", message: err.message });
    }
};

    export const getById = async (req, res)=>{
        let {id} = req.params
        try{
            let data = await productModel.findById(id)
            if(!data)
                return res.status(404).json({title:"cannot find by id",message:"product with such id not found"})
            res.json(data)
        }
        catch(err){
            console.log(err)
            res.status(400).json({title:"cannot gey by id",message:err.message})
        }
    }
    export const update = async (req, res) => {
        let { id } = req.params;
        let body = req.body;
    
        try {
            let data = await productModel.findByIdAndUpdate(id, body, { new: true });
            if (!data)
                return res
                    .status(404)
                    .json({ title: "Cannot update by ID", message: "Product with such ID not found" });
            res.json(data);
        } catch (err) {
            console.log(err);
            res.status(500).json({ title: "Cannot update", message: err.message });
        }
    };
    
    export const deleteById = async (req, res)=>{
        let {id} = req.params
        try{
            let data = await productModel.findByIdAndDelete(id)
            if(!data)
                return res.status(404).json({title:"cannot delete by id", message:"product with such id not found"})
            res.json(data)
        }
        catch(err){
            console.log(err)
            res.status(400).json({title:"cannot delete",message:err.message})

        }
    }
    export const add  = async(req, res) =>{
        let {body} = req


        const requiredFields = ["productName", "price", "sizes", "type", "imagePath"];
        const missingFields = requiredFields.filter((field) => !body[field]);
    
        if (missingFields.length > 0) {
            return res.status(400).json({
                title: "Validation Error",
                message: `Missing required fields: ${missingFields.join(", ")}`,
            });
        }
    
        if (typeof body.price !== "number" || body.price <= 0) {
            return res.status(400).json({
                title: "Validation Error",
                message: "'price' must be a positive number",
            });
        }
        if (isNaN(Date.parse(body.DateOfManufacture))) {
            return res.status(400).json({
                title: "Validation Error",
                message: "'DateOfManufacture' must be a valid date",
            });
        }
  
        try{
            let newProduct = new productModel(body)
            let data = await newProduct.save()
            res.json(data)
        }
        catch(err){
            console.log(err)
            return res.status(400).json({title:"cannot add",message:err.message})
        }
    }
    import { productModel } from "../models/productModel.js";

export const updateStock = async (productId, size) => {
  try {
    // מחפשים את המוצר לפי ה-ID
    const product = await productModel.findById(productId);

    if (!product) {
      return { success: false, message: "Product not found" };
    }

    // מחפשים את המידה בתוך המערך
    const sizeIndex = product.sizes.findIndex((s) => s.size === size);

    if (sizeIndex === -1) {
      return { success: false, message: "Size not found" };
    }

    // בודקים אם יש מלאי מספיק
    if (product.sizes[sizeIndex].stock <= 0) {
      return { success: false, message: "Out of stock" };
    }

    // מפחיתים מלאי ושומרים
    product.sizes[sizeIndex].stock -= 1;
    await product.save();

    return { success: true, message: "Stock updated successfully" };
  } catch (error) {
    console.error("Error updating stock:", error);
    return { success: false, message: "An error occurred" };
  }
};
