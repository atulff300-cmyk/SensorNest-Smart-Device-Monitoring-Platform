import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import SensorData from '@/models/SensorData';

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Check if the data has the expected fields
    if (data.temperature === undefined || data.motion === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields: temperature or motion' },
        { status: 400 }
      );
    }

    // Log the received data
    console.log('Received sensor data:', data);

    // Save to MongoDB
    await connectToDatabase();
    const newSensorData = await SensorData.create({
      temperature: data.temperature,
      motion: data.motion
    });

    return NextResponse.json(
      { message: 'Sensor data saved successfully', data: newSensorData },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error parsing/saving sensor data:', error);
    return NextResponse.json(
      { error: 'Server error', details: error.message },
      { status: 500 }
    );
  }
}
