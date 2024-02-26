# SAGEUI

Commands:

`npm run test` - Runs all tests for all apps

`npm install` - Installs any missing npm packages

## Investigate

`npm run build-investigate` - Builds the Investigate app to a "dist" folder in development mode.

`npm run dev-investigate` - Hosts the Investigate app on localhost:3000 in development mode.

For development purposes, this is being hosted on LVS Dev's webserver (LVSVDWSLWB01.consiliotest.com). To deploy, build the app then copy the contents of the dist/Investigate folder to the webserver (\\LVSVDWSLWB401.consiliotest.com\c$\Consilio\Sightline\APP\app\Investigate).

## Summarize

npm run server-summarize - Run the demo server before starting the summarizer app

npm run build-summarize - Builds the Summarize app (populating its Dist folder) in development mode.
npm run dev-summarize - Hosts the Summarize app on localhost:3001 in development mode.
