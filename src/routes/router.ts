
import express, {Request, Response} from 'express'
import { truncate } from 'fs/promises'
import { Libaray } from '../models/libaray.model'


const router = express.Router()

// POST API // 


router.post('/add', async (req:Request, res:Response)=> {

    const {id, title, description, Language, no, Auther, Publisher, Year} = req.body

    const items = Libaray.set({id, title, description, Language, Auther, Publisher, Year})

    await items.save()
    return res.status(200).json({
        data: "Data saved successfully..."
    })

})


// GET ALL API //


router.get('/', async (req : Request, res : Response)=>{

    try{
        const items = await Libaray.find({})
        return res.status(200).json({
            data: items
        })


    } catch(error){
        return res.status(500).json({
            error : error,
        })

    }

})



// GET BY ID API //


router.get('/:_id', async (req : Request, res : Response)=>{

        try{
            const items = await Libaray.findById(req.params._id)
            res.status(200).json({
                data : items
            })

        }catch(error){

            return res.status(500).json({
                error : error
            })

        }
})


// UPDATE BOOK //

router.put('/update', async (req : Request, res: Response)=>{

    try{
    
        const filter = {
            title: req.body.title,
        }
    
        const update = {
            id: req.body.id,
        }
        
       
    
            const items = await Libaray.updateOne(filter, update, {
                new : true
            });
            
    
            return res.status(200).json({
                data : items,
            })

            
        } catch (error) {
    
            return res.status(500).json({
                error : error
    
            })
    
        }
    })

    //  Delete Book API  //

    router.delete('/delete', async (req : Request, res: Response)=> {
        
        try{
    
            const filter = {
                title: req.body.title,
            }
                const item = await Libaray.deleteOne(filter).then((data) => res.json({
                    data : " Data deleted successfully..!!"
                })).catch((e)=>{
                    console.log(e)
                })
    
            } catch (error) {
        
                return res.status(500).json({
                    error : error
        
                })
        
            }
        })








export  { router }