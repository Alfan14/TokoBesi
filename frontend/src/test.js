const testAPI = async () => {
    const url = 'http://localhost:5000/api/products';
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3OWVhYWYzZjRiNzgyNmIxYzZlZDg0MCIsImVtYWlsIjoibWljaGFlNTZAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzQ0NTIzODkzLCJleHAiOjE3NDQ1Mjc0OTN9.JPmi-wBwLxkAa0SYSEOOT-5WNi8nh34TInnjaHaXJxM';
  
    try {
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (!res.ok) {
        throw new Error(`Status: ${res.status}`);
      }
  
      const data = await res.json();
      console.log('✅ Response:', data);
    } catch (err) {
      console.error('❌ Error:', err.message);
    }
  };
  
  testAPI();
  