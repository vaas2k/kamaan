// app/api/admin/website/route.js
import connectDB from "@/lib/database/db";
import Website from "@/lib/database/models/website";

export async function GET() {
  try {
    await connectDB();    
    const websites = await Website.find().sort({ createdAt: -1 });    
    return new Response(JSON.stringify(websites), { status: 200 });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();    

    const { title, categories, type, duration, thumbnail, liveUrl, githubUrl, description, client, tags, features } = await request.json();

    if(!title || !categories || !type || !duration || !thumbnail || !liveUrl || !githubUrl || !description || !client) {
      return new Response('Missing required fields', { status: 400 });
    }
     
    await Website.create({ 
      title, 
      categories, 
      type, 
      duration, 
      thumbnail, 
      liveUrl, 
      githubUrl, 
      description, 
      client, 
      tags: tags || [], 
      features: features || [] 
    });

    return new Response("Website added successfully", { status: 200 });

  } catch (err) { 
    console.error('Error adding website:', err);
    return new Response('Internal Server Error', { status: 500 });
  } 
}

export async function DELETE(request) {
  try {
    await connectDB();    

    const { searchParams } = new URL(request.url);
    const websiteId = searchParams.get('id');

    console.log('Deleting website:', websiteId);  
    
    await Website.findByIdAndDelete(websiteId);
    
    return new Response("Website deleted successfully", { status: 200 });

  } catch (error) {
    console.error('Error deleting website:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}