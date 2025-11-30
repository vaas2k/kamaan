// app/api/admin/video/route.js
import connectDB from "@/lib/database/db";
import Video from "@/lib/database/models/videos";

export async function GET() {
  try {
    await connectDB();    
    const videos = await Video.find().sort({ createdAt: -1 });    
    return new Response(JSON.stringify(videos), { status: 200 });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();    

    const { title, categories, description, duration, videoUrl, thumbnail, client, tags, views, likes } = await request.json();

    if (!title || !categories || !description || !duration || !thumbnail || !client) {
      return new Response('Missing required fields', { status: 400 });
    }
     
    await Video.create({ 
      title, 
      categories, // Updated to use categories array
      description, 
      duration, 
      videoUrl : videoUrl || null , 
      thumbnail, 
      client, 
      tags,
      views: views || 0,
      likes: likes || 0
    });

    return new Response("Video added successfully", { status: 200 });

  } catch (err) { 
    console.error('Error adding video:', err);
    return new Response('Internal Server Error', { status: 500 });
  } 
}

export async function DELETE(request) {
  try {
    await connectDB();    

    const { searchParams } = new URL(request.url);
    const videoId = searchParams.get('id');

    console.log('Deleting video:', videoId);  
    
    await Video.findByIdAndDelete(videoId);
    
    return new Response("Video deleted successfully", { status: 200 });

  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
}