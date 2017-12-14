# Bittrex-to-csv
Saves OCLHV minute-by-minute data for every Bittrex coin available to a .csv file with its respective name.

The scraper runs every 10 days as the API call returns 10 days worth of data (when available). Some small coins have much less data, but I think it can be assumed that from time x to time y, the price remained the same and that the data isn't necessarily missing.

## Installation
Download the repo, and run
``` npm install ```

## Running the scraper
```npm start```

Use this as training data for your next algorithm!