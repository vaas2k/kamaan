import mongoose from "mongoose";
const { Schema } = mongoose;

//  id: 1,
//       title: "Architectural Visualization - Modern Villa",
//       category: "architectural",
//       type: "visualization",
//       duration: "3 weeks",
//       views: "18K",
//       likes: "1.8K",
//       thumbnail: "https://images.unsplash.com/photo-1548611633-15cde58d01c9?w=400&h=300&auto=format&fit=crop&q=60",
//       videoUrl: "#",
//       description: "Photorealistic architectural visualization of a modern luxury villa with detailed interiors and landscaping.",
//       tags: ["3DS Max", "V-Ray", "Photoshop", "Corona"],
//       client: "Elite Architects",
//       features: ["Photorealistic Rendering", "Interior Design", "Landscaping", "Lighting Setup"],
//       polyCount: "2.5M",
//       renderTime: "8 hours"
//     }

const model3DSchema = new Schema({
    title : { type: String, required: true },
    categories: [{ type: String, required: true }],
    type : {type : String , required : true },
    duration : {type:String, required : true},
    thumbnail : {type :String,required : true},
    videoUrl: {type : String},
    description : {type : String , required : true},
    tags : {type : [String]} ,
    client : {type :String},
    features : {type : [String]},
    polyCount: {type :String},
    renderTime : {type : String}
},
{
    timestamps: true
});

// Prevent model recompilation
const model3D = mongoose.models.model3D || mongoose.model("model3D", model3DSchema);

export default model3D;