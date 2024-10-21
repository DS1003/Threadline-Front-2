const API_URL = 'http://localhost:3000/api/notifications'; // Replace with your API URL

async function sendNotification(receiverId, emetorId = null, content, type, postId = null) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`, // Add your token logic if necessary
            },
            body: JSON.stringify({
                receiverId,
                emetorId,
                content,
                type,
                postId,
            }),
        });

        if (!response.ok) {
            throw new Error('Error sending notification');
        }

        const data = await response.json();
        return data; // Return the response or message you want
    } catch (error) {
        console.error('Failed to send notification:', error);
        throw error; // Propagate the error
    }
}

export default sendNotification;
