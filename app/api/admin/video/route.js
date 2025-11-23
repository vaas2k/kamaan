import connectDB from "@/lib/database/db";
import Video from "@/lib/database/models/videos";


export async function GET() {
  try {
    await connectDB();    
    const videos =  await Video.find().sort({ createdAt: -1 });    
    return new Response(JSON.stringify(videos), { status: 200 });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function POST(request, response) {
  try{

    await connectDB();    

    const { title, category, description, duration, videoUrl, thumbnail, client, tags } = await request.json();

    if(!title || !category || !description || !duration || !videoUrl || !thumbnail || !client || !tags){
      return new Response('Missing required fields', { status: 400 });
    }
     
    // console.log('Adding video:', { title, category, description, duration, videoUrl, thumbnail, client, tags });  
    await Video.create({ title, category, description, duration, videoUrl, thumbnail, client ,tags});


    return new Response("Video added successfully", { status: 200 });

  } catch(err) { 
    console.error('Error adding video:', err);
    return new Response('Internal Server Error', { status: 500 });
  } 
}

export async function DELETE(request) {
  try{
    await connectDB();    

    const { searchParams } = new URL(request.url);
    const videoId = searchParams.get('id');

    console.log('Deleting video:', videoId);  
    
    await Video.findByIdAndDelete(videoId);
    
    return new Response("Video deleted successfully", { status: 200 });

  }catch(error) {
    return new Response('Internal Server Error', { status: 500 });
  }
}