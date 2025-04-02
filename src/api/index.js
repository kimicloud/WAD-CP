/* The above code is a JavaScript module that defines functions to interact with a destination-related
API. Here is a summary of what the code is doing: */
import axios from 'axios';

// Create axios instance 
const API = axios.create({ 
  baseURL: 'http://localhost:5001/api',
  timeout: 10000
});

// Sample destinations data from your seed.js
const mockDestinations = [
  {
    _id: '1',
    name: 'Bali',
    location: 'Indonesia',
    description: 'Bali is a living postcard, an Indonesian paradise that feels like a fantasy. Soak up the sun on a stretch of fine white sand, or commune with the tropical creatures as you dive along coral ridges or the colorful wreck of a WWII war ship. On shore, the lush jungle shelters stone temples and mischievous monkeys.',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800',
    rating: 4.8,
    price: 65,
    activities: ['Surfing', 'Temple Tours', 'Snorkeling', 'Rice Field Trekking', 'Spa Treatments'],
    bestTimeToVisit: 'April to October (dry season)'
  },
  {
    _id: '2',
    name: 'Santorini',
    location: 'Greece',
    description: 'Santorini is one of the Cyclades islands in the Aegean Sea. It was devastated by a volcanic eruption in the 16th century BC, forever shaping its rugged landscape. The whitewashed, cubiform houses of its 2 principal towns, Fira and Oia, cling to cliffs above an underwater caldera (crater).',
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=800',
    rating: 4.7,
    price: 120,
    activities: ['Wine Tasting', 'Boat Tours', 'Sunset Watching', 'Beach Relaxation', 'Archaeological Sites'],
    bestTimeToVisit: 'April to November'
  },
  {
    _id: '3',
    name: 'Kyoto',
    location: 'Japan',
    description: 'Kyoto, once the capital of Japan, is a city on the island of Honshu. It\'s famous for its numerous classical Buddhist temples, as well as gardens, imperial palaces, Shinto shrines and traditional wooden houses. It\'s also known for formal traditions such as kaiseki dining, consisting of multiple courses of precise dishes, and geisha, female entertainers often found in the Gion district.',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800',
    rating: 4.6,
    price: 95,
    activities: ['Temple Visits', 'Cherry Blossom Viewing', 'Tea Ceremonies', 'Bamboo Forest Walks', 'Traditional Markets'],
    bestTimeToVisit: 'March to May and October to November'
  },
  {
    _id: '4',
    name: 'Machu Picchu',
    location: 'Peru',
    description: 'Machu Picchu stands 2,430 m above sea-level, in the middle of a tropical mountain forest, in an extraordinarily beautiful setting. It was probably the most amazing urban creation of the Inca Empire at its height; its giant walls, terraces and ramps seem as if they have been cut naturally in the continuous rock escarpments.',
    image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=3552&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    rating: 4.9,
    price: 150,
    activities: ['Hiking', 'Archaeological Tours', 'Photography', 'Llama Spotting', 'Mountain Climbing'],
    bestTimeToVisit: 'May to September (dry season)'
  },
  {
    _id: '5',
    name: 'New York City',
    location: 'USA',
    description: 'New York City comprises 5 boroughs sitting where the Hudson River meets the Atlantic Ocean. At its core is Manhattan, a densely populated borough that\'s among the world\'s major commercial, financial and cultural centers. Its iconic sites include skyscrapers such as the Empire State Building and sprawling Central Park.',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800',
    rating: 4.5,
    price: 200,
    activities: ['Broadway Shows', 'Museum Visits', 'Shopping', 'Central Park Exploring', 'Food Tours'],
    bestTimeToVisit: 'April to June or September to November'
  }
  
];

// Set this to false to always try the real API first
const USE_MOCK_DATA_ONLY = false;

// Helper function to log API errors
const logApiError = (error) => {
  console.error('API Error:', {
    message: error.message,
    status: error.response?.status,
    data: error.response?.data,
    url: error.config?.url
  });
};

// Destination endpoints with real API first, then fallback
export const fetchDestinations = async () => {
  // If mock data only, return it immediately
  if (USE_MOCK_DATA_ONLY) {
    console.log('Using mock destinations data only');
    return Promise.resolve({ data: mockDestinations });
  }
  
  // Try the real API first
  try {
    console.log('Attempting to fetch destinations from API...');
    const response = await API.get('/destinations');
    console.log('API response successful:', response.data.length + ' destinations found');
    return response;
  } catch (error) {
    logApiError(error);
    console.log('API failed, using mock data as fallback');
    return Promise.resolve({ data: mockDestinations });
  }
};

export const fetchDestinationById = async (id) => {
  // If mock data only, find in mock data
  if (USE_MOCK_DATA_ONLY) {
    const destination = mockDestinations.find(d => d._id === id);
    if (destination) {
      return Promise.resolve({ data: destination });
    }
    return Promise.reject(new Error('Destination not found in mock data'));
  }
  
  // Try the real API first
  try {
    console.log(`Attempting to fetch destination with id: ${id}`);
    const response = await API.get(`/destinations/${id}`);
    console.log('API response successful for destination:', response.data.name);
    return response;
  } catch (error) {
    logApiError(error);
    
    // Try to find in mock data as fallback
    console.log('API failed, looking in mock data...');
    const destination = mockDestinations.find(d => d._id === id);
    if (destination) {
      return Promise.resolve({ data: destination });
    }
    
    return Promise.reject(error);
  }
};

// Other functions with similar pattern
export const createDestination = async (newDestination) => {
  if (USE_MOCK_DATA_ONLY) {
    console.log('Mock create destination:', newDestination);
    return Promise.resolve({ 
      data: { ...newDestination, _id: Date.now().toString() } 
    });
  }
  
  try {
    return await API.post('/destinations', newDestination);
  } catch (error) {
    logApiError(error);
    console.log('API failed, using mock response');
    return Promise.resolve({ 
      data: { ...newDestination, _id: Date.now().toString() } 
    });
  }
};

export const bookTrip = async (bookingData) => {
  if (USE_MOCK_DATA_ONLY) {
    console.log('Mock booking:', bookingData);
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ 
          data: { 
            success: true, 
            bookingId: Date.now().toString(),
            message: 'Your booking has been confirmed!' 
          } 
        });
      }, 1000);
    });
  }
  
  try {
    // Enhance booking data with timestamp
    const enhancedBookingData = {
      ...bookingData,
      bookingDate: new Date().toISOString(),
      status: 'confirmed'
    };
    
    console.log('Sending booking data to API:', enhancedBookingData);
    const response = await API.post('/bookings', enhancedBookingData);
    console.log('Booking response from API:', response.data);
    return response;
  } catch (error) {
    logApiError(error);
    console.log('API failed, using mock booking response');
    return Promise.resolve({ 
      data: { 
        success: true, 
        bookingId: Date.now().toString(),
        message: 'Your booking has been confirmed! (Mock response)' 
      } 
    });
  }
};

// New function to fetch all bookings (for admin purposes)
export const fetchBookings = async () => {
  if (USE_MOCK_DATA_ONLY) {
    return Promise.resolve({ data: [] });
  }
  
  try {
    const response = await API.get('/bookings');
    return response;
  } catch (error) {
    logApiError(error);
    return Promise.reject(error);
  }
};