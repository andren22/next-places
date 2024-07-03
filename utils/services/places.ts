const fs = require('fs');
const path = require('path');

const all_places = getAllPlaces()

export function getAllPlaces() {
  const placesFile = path.resolve(process.cwd(), 'professions_places.json');
  const data = fs.readFileSync(placesFile, 'utf-8');
  return JSON.parse(data);
};

export function getProfessions() {
  return Object.keys(all_places)
}