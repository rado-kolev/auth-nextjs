import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

connect(); // Connect to MongoDB database

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);

    // Check if user with the same email already exists
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return NextResponse.json({ error: 'User with the same email does not exist' }, { status: 400 });
    }

    // Check if password is correct
    const isPasswordCorrect = await bcryptjs.compare(password, existingUser.password);

    if (!isPasswordCorrect) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 400 });
    }

    // Create token data
    const tokenData = {
      id: existingUser._id,
      username: existingUser.username,
      email: existingUser.email,
    };

    // Create token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: '1d' });

    const response = NextResponse.json({
      message: 'Login successful!',
      success: true
    });

    response.cookies.set('token', token, { httpOnly: true });
    
    return response;

  } catch (error: any) {
    return NextResponse.json({error: error.message}, {status: 500});
  }
}