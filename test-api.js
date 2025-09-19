// Test script to check the getNotes API
async function testApi() {
  try {
    const response = await fetch('http://localhost:3000/api/getNotes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Response status:', response.status);
    console.log('Response ok:', response.ok);
    
    const data = await response.json();
    console.log('Data received:', JSON.stringify(data, null, 2));
    console.log('Data type:', typeof data);
    console.log('Is array:', Array.isArray(data));
    console.log('Length:', data?.length);
  } catch (error) {
    console.error('Error:', error);
  }
}

testApi();