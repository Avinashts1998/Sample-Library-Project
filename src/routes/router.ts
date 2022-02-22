
import express, {Request, Response, NextFunction} from 'express'
import { truncate } from 'fs/promises'
import { Libaray } from '../models/libaray.model'

const libarayss = Libaray.find()


const router = express.Router()

console.log("router called")


// Display in a table //

router.get('/get', function(req : Request, res  :Response, next : NextFunction) {
    libarayss.exec(function(err: any,data: any){
  if(err) throw err;
  res.render('table', { title: 'books records', records:data });
    });
    
  });

  

// POST API // 


router.post('/add', async (req:Request, res:Response)=> {

    const {id, title, description, Language, no, Auther, Publisher, Year} = req.body

    const items = Libaray.set({id, title, description, Language, Auther, Publisher, Year})

    await items.save()
    return res.status(200).json({
        data: "Data saved successfully...", items

    })

})

// Pagination Sheet //

router.get('/get/books/:pages', (req : Request, res : Response, next : NextFunction)=>{
   
    var perPage: any = 2
    let page:any = req.params.pages || 1

let books = Libaray
                .find({})
                .skip((perPage * page) - perPage)
                .limit(perPage)
                .exec(function (err, books) {

                    //   console.log("result is : ", util.inspect(meetingss, { depth: null }));
           
                    Libaray.count().exec(function (err, count) {
                           if (err) return next(err)
                           res.render('table', {
                               books: books,
                               current: page,
                               pages: Math.ceil(count / perPage)
                           })
                       })
           
                      
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

