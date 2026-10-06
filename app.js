const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const transportTypes = ['Bus', 'Train', 'Cab', 'Auto'];

const sampleOptions = {
  Bus: [
    { operator: 'CityLink Express', time: '42 min', distance: '18 km', fare: 45, availability: 'Available now' },
    { operator: 'MetroRide AC', time: '38 min', distance: '18 km', fare: 65, availability: 'Frequent service' }
  ],
  Train: [
    { operator: 'Local Passenger', time: '31 min', distance: '20 km', fare: 35, availability: 'Seats available' },
    { operator: 'Intercity Express', time: '24 min', distance: '20 km', fare: 95, availability: 'Limited seats' }
  ],
  Cab: [
    { operator: 'GoCab Mini', time: '28 min', distance: '18 km', fare: 320, availability: 'Available now' },
    { operator: 'GoCab Comfort', time: '30 min', distance: '18 km', fare: 430, availability: 'Available now' }
  ],
  Auto: [
    { operator: 'Quick Auto', time: '36 min', distance: '18 km', fare: 180, availability: 'Available now' },
    { operator: 'City Auto', time: '40 min', distance: '18 km', fare: 155, availability: 'Available nearby' }
  ]
};

const hyderabadDelhiOptions = {
  Bus: [
    { operator: 'Intercity coach (sample)', time: '30-34 hr', distance: 'Approx. 1,570 km', fare: '₹2,000-3,500', availability: 'Sample estimate only' },
    { operator: 'Long-distance coach (sample)', time: '32-36 hr', distance: 'Approx. 1,570 km', fare: '₹1,800-3,000', availability: 'Sample estimate only' }
  ],
  Train: [
    { operator: 'Long-distance train (sample)', time: '22-26 hr', distance: 'Approx. 1,580 km', fare: '₹800-2,500', availability: 'Sample estimate only' },
    { operator: 'Express train (sample)', time: '21-25 hr', distance: 'Approx. 1,580 km', fare: '₹1,200-3,000', availability: 'Sample estimate only' }
  ],
  Cab: [
    { operator: 'Long-distance cab (sample)', time: '24-28 hr', distance: 'Approx. 1,570 km', fare: '₹30,000-45,000', availability: 'Illustrative estimate' },
    { operator: 'Intercity cab (sample)', time: '26-30 hr', distance: 'Approx. 1,570 km', fare: '₹28,000-42,000', availability: 'Illustrative estimate' }
  ],
  Auto: [
    { operator: 'Auto rickshaw', time: 'Not practical', distance: 'Approx. 1,570 km', fare: 'Not estimated', availability: 'Not suitable for this distance' }
  ]
};

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/planner', (req, res) => {
  res.render('planner', { transportTypes, formData: {}, error: null });
});

app.post('/plan', (req, res) => {
  const from = String(req.body.from || '').trim();
  const to = String(req.body.to || '').trim();
  const transportType = String(req.body.transportType || '');

  if (!from || !to) {
    return res.status(400).render('planner', {
      transportTypes,
      formData: { from, to, transportType },
      error: 'Add both a starting location and a destination to continue.'
    });
  }

  if (!transportTypes.includes(transportType)) {
    return res.status(400).render('planner', {
      transportTypes,
      formData: { from, to, transportType: '' },
      error: 'Choose one of the listed transport types.'
    });
  }

  const normalizeCity = (location) => {
    const city = location.toLowerCase().trim().split(',')[0].trim();
    if (['hyd', 'hyderabad'].includes(city)) return 'Hyderabad';
    if (['delhi', 'new delhi'].includes(city)) return 'Delhi';
    return null;
  };
  const normalizedCities = [normalizeCity(from), normalizeCity(to)];
  const isHyderabadDelhi = normalizedCities.includes('Hyderabad') && normalizedCities.includes('Delhi');
  const routeOptions = isHyderabadDelhi ? hyderabadDelhiOptions[transportType] : sampleOptions[transportType];
  const options = routeOptions.map((option) => ({
    ...option,
    route: `${from} to ${to}`
  }));

  res.render('results', {
    journey: { from, to, transportType },
    options
  });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.listen(port, () => {
  console.log(`Transport Planner is running at http://localhost:${port}`);
});
