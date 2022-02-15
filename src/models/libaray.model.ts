import  mongoose from "mongoose";

interface LibraryI{
    id: Number,
    title: String,
    description : String,
    Language : String,
    Auther : String,
    Publisher : String,
    Year : Number,
}

interface LibarayDocuemnt extends mongoose.Document{

    id: Number,
    title: String,
    description : String,
    Language : String,
    Auther : String,
    Publisher : String,
    Year : Number,
}


const libaraySchema =  new mongoose.Schema({

    id : {
        type: String,
        required: true
    },

    title : {
        type: String,
        required: true
    },

    description: {
        type: String,
        required : false
    },

    Language : {
        type: String,
        required: true
    },

    Auther : {
        type : String,
        required :true
    },
    
    Publisher : {
        type : String,
        required : true
    },
    Year : {
        type: Number,
        required : false
    }

})

interface libarayModelInterface extends mongoose.Model<LibarayDocuemnt>{
    set(x: LibraryI) : LibarayDocuemnt;

}


libaraySchema.statics.set = (x: LibraryI)=> {
    return new Libaray(x)
}


const Libaray = mongoose.model <LibarayDocuemnt, libarayModelInterface>(
    "Libaray",
    libaraySchema);




Libaray.set({
    id: 1,
    title: "Some titles",
    description : "Some descriptions",
    Language : "some languages",
    Auther : 'Some authers',
    Publisher : 'some publisher',
    Year : 1998  });


export {Libaray}