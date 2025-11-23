// app/api/admin/model3d/route.js
import connectDB from "@/lib/database/db";
import model3D from "@/lib/database/models/model3D";

export async function GET() {
  try {
    await connectDB();    
    const models = await model3D.find().sort({ createdAt: -1 });    
    return new Response(JSON.stringify(models), { status: 200 });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();    

    const { 
      title, 
      category, 
      type, 
      duration, 
      thumbnail, 
      videoUrl, 
      description, 
      client, 
      tags, 
      features, 
      polyCount, 
      renderTime 
    } = await request.json();

    if(!title || !category || !type || !duration || !thumbnail || !videoUrl || !description) {
      return new Response('Missing required fields', { status: 400 });
    }
     
    await model3D.create({ 
      title, 
      category, 
      type, 
      duration, 
      thumbnail, 
      videoUrl, 
      description, 
      client: client || '', 
      tags: tags || [], 
      features: features || [], 
      polyCount: polyCount || '', 
      renderTime: renderTime || '' 
    });

    return new Response("3D Model added successfully", { status: 200 });

  } catch (err) { 
    console.error('Error adding 3D model:', err);
    return new Response('Internal Server Error', { status: 500 });
  } 
}

export async function DELETE(request) {
  try {
    await connectDB();    

    const { searchParams } = new URL(request.url);
    const modelId = searchParams.get('id');

    console.log('Deleting 3D model:', modelId);  
    
    await model3D.findByIdAndDelete(modelId);
    
    return new Response("3D Model deleted successfully", { status: 200 });

  } catch (error) {
    console.error('Error deleting 3D model:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}