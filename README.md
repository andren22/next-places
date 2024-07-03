NextPlaces is an application to search for the best places to work in more than 200 cities.

## Getting Started

The project includes a prefilled database using Pocketbase for simplicity. For production environments, a more robust and powerful database is recommended. To run the database, download the executable file from https://pocketbase.io/docs/, put it in the root of the project and run it with:

```bash
.\pocketbase.exe serve` (Windows)
./pocketbase serve` (Mac/Linux)
```

Now, just install the dependencies and run the server with:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to use the application.

## Challenge Assumptions

The following assumptions were made due to some unclear information on the challenge.

- The list of cities is obtained from the available capital cities of all the countries present in the REST Countries API https://restcountries.com/
- The list of professions is a fixed list of 20 professions created as dummy data for the challenge.
- The list of places is a fixed list of 10 generic places, different for each profession, created as dummy data for the challenge.
- All cities have all professions with all places available.
- The list of countries, cities and places does not change frequently.

## Application Architecture

The application consist of:

- Prerendered static pages for each pair of city and profession, and for the landing page, for improved SEO optimization.
- Client-side rendered page for the search results page. This allows to quickly search and view the results of repeated searches.
- API endpoint for searching places. Under /api/search, this allows to serve only the search result items to the webpage.
- Database. A database was implemented for having a single source of truth for the available places. Used for the prerendered pages and the search results. This allows to simulate a more production-like environment for the application and be prefilled with the necessary data.

## Project Structure

- `components`: Contains common reusable components for the application.
- `pages`: Contains the webpages and API routes for the application, standard for next.js projects.
- `pb_data` and `pb_migration`: These folders contain the preconfigured database information.
- `public`: Default folder for Next.js projects. Not used in the application but left for compatibility with default error pages.
- `types`: Contains the shared types relevant to all the application. In this case, only the Place type.
- `utils/data`: Contains functions for supporting the database connection, and a script for initial populating the database, in case it is needed.
- `utils/services`: Contains functions for communication with external services, such as the Countries API or the places source, used as a simulation of an external services, obtaining the data from a JSON file.

## Dependencies

- Bootstrap. It was chosen for quickly style components without too much configuration or fine-tuning.
- Pocketbase. Chosen for its plug and play nature, allows having an easy set up and use database for simple projects.

## Future work / Improvements

- Implement unit tests
- Pagination for search queries
- Pagination for static pages
- Implement proper error pages
- Improve error handling
- Implement logging for monitoring
- Improve landing page for a more inviting user experience.
- Secure authentication with the database.
