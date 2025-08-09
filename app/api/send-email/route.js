import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(request) {
  try {
    const { userEmail, bookingDetails } = await request.json();
    
    if (!userEmail || !bookingDetails) {
      return NextResponse.json({ 
        success: false, 
        error: 'Missing required parameters' 
      }, { status: 400 });
    }

    const { movieTitle, theaterName, showtime, seats, totalPrice, bookingId, bookingDate } = bookingDetails;
    
    const seatNumbers = seats.map(seat => typeof seat === 'string' ? seat : `${seat.row}${seat.number}`).join(', ');
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: `Booking Confirmation - ${movieTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #dc2626; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; font-size: 24px;">Booking Confirmed!</h1>
          </div>
          
          <div style="background-color: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px;">
            <h2 style="color: #333; margin-top: 0;">${movieTitle}</h2>
            
            <div style="margin: 20px 0;">
              <p><strong>Booking ID:</strong> ${bookingId}</p>
              <p><strong>Theater:</strong> ${theaterName}</p>
              <p><strong>Showtime:</strong> ${new Date(showtime.date || showtime).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })} at ${showtime.time || showtime}</p>
              <p><strong>Seats:</strong> ${seatNumbers}</p>
              <p><strong>Total Price:</strong> ₹${totalPrice}</p>
              <p><strong>Booking Date:</strong> ${new Date(bookingDate).toLocaleDateString()}</p>
            </div>
            
            <div style="background-color: #fef3c7; padding: 15px; border-radius: 4px; margin: 20px 0;">
              <p style="margin: 0; color: #92400e;"><strong>Important:</strong> Please arrive at least 15 minutes before the showtime. Bring this confirmation email or your booking ID for ticket collection.</p>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
              <p style="color: #666; font-size: 14px;">Thank you for booking with us!</p>
            </div>
          </div>
        </div>
      `,
    };

    const result = await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true, messageId: result.messageId });
    } catch (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}