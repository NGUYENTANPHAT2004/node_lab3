import express from 'express';
import Book from '../models/Book.js';
import Joi from 'joi';
const checkValidate = Joi.object({
    name:Joi.string().required().empty().messages({
        "any.required":"Tên không để trống",
        "string.empty":"Tên không để trống"
    }),
    description:Joi.string().required().empty().messages({
        "any.required":"mo tả không để trống",
        "string.empty":"mo tả không để trống"
    }),
    image:Joi.string().required().empty().messages({
        "any.required":"ảnh không để trống",
        "string.empty":"ảnh không để trống"
    }),
    price:Joi.number().required().empty().min(500).messages({
        "any.required":"Tên không để trống",
        "number.empty":"Tên không để trống",
        "number.min":"Giá không được nhỏ hơn 500"
    }),
    author:Joi.string().required().empty().messages({
        "any.required":"tác giả không để trống",
        "string.empty":"tác giả không để trống"
    })
    
})
const router = express.Router();
router.post('/book',(req,res,next)=>{
    const body = req.body;
    const {error} = checkValidate.validate({name:body.name,image:body.image,description:body.description,author:body.author,price:body.price})
    if (error){
        res.send({error:error.message})
    }
    else{
        next()
    }
},async (req, res)=>{
    const book = new Book(req.body);
    const response = await book.save();
    res.send(response);
})
router.get('/book',async (req, res)=>{
    const response = await Book.find();
    res.send(response);
})
router.put('/book/:id',async (req, res)=>{
    const body = req.body;
    const id = req.params.id;
    const response = await Book.findOneAndUpdate({_id:id},body,{new:true});
    res.send(response);
})
router.delete('/book/:id',async (req, res)=>{
    const id = req.params.id;
    const response = await Book.findOneAndDelete({_id:id});
    res.send(response);
})
export default router;