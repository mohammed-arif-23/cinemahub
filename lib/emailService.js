export async function sendBookingConfirmation(userEmail, bookingDetails) {
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userEmail,
        bookingDetails,
      }),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function sendBookingCancellation(userEmail, bookingDetails) {
  // For now, cancellation emails can use the same endpoint
  // You can extend the API route to handle different email types
  return sendBookingConfirmation(userEmail, { 
    ...bookingDetails, 
    type: 'cancellation' 
  });
}