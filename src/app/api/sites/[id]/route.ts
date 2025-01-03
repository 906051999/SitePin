import { NextResponse, NextRequest } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);

export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
): Promise<Response> {
  try {
    await client.connect();
    const db = client.db('sitepin');
    
    await db.collection('sites').deleteOne({
      _id: new ObjectId(context.params.id)
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to delete site' },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: { id: string } }
): Promise<Response> {
  try {
    const body = await request.json();
    
    await client.connect();
    const db = client.db('sitepin');
    
    await db.collection('sites').updateOne(
      { _id: new ObjectId(context.params.id) },
      { $set: body }
    );
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to update site' },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}