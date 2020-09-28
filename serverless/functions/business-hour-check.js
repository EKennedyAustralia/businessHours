const twilio_version = require('twilio/package.json').version;
const moment = require('moment-timezone');

const day_of_week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

exports.handler = async function(context, event, callback) {

  console.log(`Entered ${context.PATH} node version ${process.version} twilio version ${twilio_version}`);

  console.log(`Timezone is ${event.timezone}`);
  console.log(`Queue is ${event.queue}`);

  if( moment.tz.zone(event.timezone) == null ){
    callback(null, { status: "error", message: `Timezone ${event.timezone} does not exist. Please check https://en.wikipedia.org/wiki/List_of_tz_database_time_zones`});
    return;
  }

  // get Twilio Client to access sync
  const client = context.getTwilioClient();

  // get date object as current time in specified timezone.
  const tzNow = new Date(moment().tz(event.timezone).format('YYYY/MM/DD HH:mm:ss'));

  let isBusinessHour = false;

  try {

    // fetch sync document containing business hours
    const document = await client.sync.services(context.SYNC_SID)
            .documents(context.DOCUMENT_SID)
            .fetch();

    // reduce the map to just entries matching Queue and Day of Week
    let arr = [];
    const filtered = Object.keys(document.data).reduce(function (filtered, key) {
      if (document.data[key].Queue === event.queue && 
          document.data[key].Day == day_of_week[tzNow.getDay()]) {
            filtered[key] = document.data[key];
            arr.push(document.data[key]);
          }
      return filtered;
    }, {});

    if( arr.length <= 0 ) {
      callback(null, { status: "error", message: `Queue ${event.queue} does not have an entry for ${day_of_week[tzNow.getDay()]}.`});
      return;
    }

    console.log(`Filtered Result for Queue '${event.queue}' in Timezone ${event.timezone}`);
    console.log(JSON.stringify(arr));

    // setup time objects for comparison
    const closeTime = new Date();
    closeTime.setHours(arr[0].Close.split(':')[0], arr[0].Close.split(':')[1], 0);
    const openTime = new Date();
    openTime.setHours(arr[0].Open.split(':')[0], arr[0].Open.split(':')[1], 0);
    const nowTime = new Date()
    nowTime.setHours(tzNow.getHours(), tzNow.getMinutes(), 0);

    // if now is between open and close time, it is business hours
    isBusinessHour = (nowTime >= openTime && nowTime <= closeTime);

  } catch (e) {
    console.error(e);
    callback(null, { status: "error", message: e.message});
    return;
  }

  callback(null, { status: 'ok', isBusinessHour: isBusinessHour } );
};