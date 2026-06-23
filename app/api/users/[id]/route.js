import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';

// Helper function to check if requester is OWNER
async function verifyOwner(request) {
  const userId = request.cookies.get('userId')?.value;
  if (!userId) return false;

  await connectToDatabase();
  const requester = await User.findById(userId);
  // We check for admin or owner
  return requester && ['admin', 'owner', 'OWNER'].includes(requester.role);
}

export async function DELETE(request, { params }) {
  try {
    const isAdmin = await verifyOwner(request);
    if (!isAdmin) {
      return NextResponse.json({ message: 'Forbidden: Only an admin can delete users' }, { status: 403 });
    }

    // Await params for Next.js 15 compatibility
    const resolvedParams = await params;
    const { id } = resolvedParams;
    
    await connectToDatabase();
    
    const deletedUser = await User.findByIdAndDelete(id);
    
    if (!deletedUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });

  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const isAdmin = await verifyOwner(request);
    if (!isAdmin) {
      return NextResponse.json({ message: 'Forbidden: Only an admin can edit users' }, { status: 403 });
    }

    // Await params for Next.js 15 compatibility
    const resolvedParams = await params;
    const { id } = resolvedParams;
    const { role, accountStatus } = await request.json();

    await connectToDatabase();
    
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { role, accountStatus },
      { new: true }
    ).select('-password');
    
    if (!updatedUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'User updated successfully', user: updatedUser }, { status: 200 });

  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
