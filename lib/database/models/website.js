import mongoose from "mongoose";
const { Schema } = mongoose;


const websiteSchema = new Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    type: { type: String, required: true },
    duration: { type: String, required: true },
    thumbnail: { type: String, required: true },
    liveUrl: { type: String, required: true },
    githubUrl: { type: String, required: true },
    description: { type: String, required: true },
    tags: { type: [String]},
    client: { type: String, required: true },
    features: { type: [String] }
},
    { timestamps: true }
); 


// Prevent model recompilation
const Website = mongoose.models.Website || mongoose.model("Website", websiteSchema);

export default Website;