/* SELECTORS */

export const getAllTrips = ({trips}) => trips;

export const getFilteredTrips = ({trips, filters}) => {
  let output = trips;

  // filter by search phrase
  if(filters.searchPhrase){
    const pattern = new RegExp(filters.searchPhrase, 'i');
    output = output.filter(trip => pattern.test(trip.name));
  }

  // TODO - filter by duration
  if(filters.duration){
    output = output.filter(trip => trip.days >= filters.duration.from && trip.days <= filters.duration.to);
  }
  // TODO - filter by tags
  if(filters.tags.length > 0){
    output = output.filter( trip => filters.tags.some((tag) => trip.tags.includes(tag)));
  }
    
  // TODO - sort by cost descending (most expensive goes first)
  output = output.sort((trip1, trip2) => {
    const cost1 = parseFloat(trip1.cost.replace('$', '').replace(',', ''));
    const cost2 = parseFloat(trip2.cost.replace('$', '').replace(',', ''));
    return cost2 - cost1;
  });

  return output;
};

export const getTripById = ({trips}, tripId) => {
  const result = trips.find(trip => trip.id === tripId);
  return result || {error: true };
};

export const getTripsForCountry = ({ trips }, countryCode) => {
  const results = trips.filter(trip => trip.country.code === countryCode);
  return results.length ? results : { error: true };
};

/* ACTIONS */

/*
// action name creator
const reducerName = 'trips';
const createActionName = name => `app/${reducerName}/${name}`;

// action types


// action creators


// reducer
export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    default:
      return statePart;
  }
}
 */
