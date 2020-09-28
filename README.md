# DON'T USE THIS YET - WORK IN PROGRESS - This project will always be demoware intended for SE/Specialist AE use. 
This is just a basic UI element for a business hours mangement interface for the Flex queues

Currently it depends on you having a sync doc (any name) in the default service for the flex project that you can store business hours in.

It also depends on you having a twilio function to issue a token with a sync grant

this project will install an older version of material table "material-table": "1.36.0"
don't update it unless you're on the Flex beta with the new react.


# What works?

A new view is added to the sidenav.
That view populates a material table with the business hours from a sync doc (if any).
The UI will push any changes to the sync doc without confirmation - if you update a business hour the change is auto-committed (yay).

You have to add a row for every queue for every day of week you want to be OPEN.
You can search the table by queue name or day of week.
You can edit or remove rows from the table.

If you're happy to YOLO it and use this repo - You can intialize a sync doc like this:

document.data:

{"0":{"Queue":"Sales","Close":"21:00","Open":"09:05","tableData":{"id":0},"Day":"Monday"}}

The matierial table react component wants a jSON array and when that is committed to sync it ends up with the array positions as key names. We handle that in the plugin with Object.values so it doesn't matter.

# Known borks:
this is an older version of material table because flex is on older react - some bugs are inherited, see material table and material ui release notes

I have done no CSS work so some minor UI borks around the pagination icons etc.



# To Do:

Make the sync doc and runtime domain for the tokenizer parametized and easy to change.
Add a twilio function to parse the sync doc and return whether this queue is open or closed for use in studio.
Make the switches for global controls do something.
Pass flex theme information into material table and the added view to not look like hot garbage when used with anyhting other than light theme.
find a better sidenav icon than the data icon.


## Setup

Make sure you have [Node.js](https://nodejs.org) as well as [`npm`](https://npmjs.com) installed.

Afterwards, install the dependencies by running `npm install`:

```bash
cd 

# If you use npm
npm install
```

## Development

In order to develop locally, you can use the Webpack Dev Server by running:

```bash
npm start
```

This will automatically start up the Webpack Dev Server and open the browser for you. Your app will run on `http://localhost:8080`. If you want to change that you can do this by setting the `PORT` environment variable:

```bash
PORT=3000 npm start
```

When you make changes to your code, the browser window will be automatically refreshed.

## Deploy

Once you are happy with your plugin, you have to bundle it in order to deploy it to Twilio Flex.

Run the following command to start the bundling:

```bash
npm run build
```

Afterwards, you'll find in your project a `build/` folder that contains a file with the name of your plugin project. For example, `plugin-example.js`. Take this file and upload it into the Assets part of your Twilio Runtime.

Note: Common packages like `React`, `ReactDOM`, `Redux` and `ReactRedux` are not bundled with the build because they are treated as external dependencies so the plugin will depend on Flex to provide them globally.
