# Functions Service to support Business Hours

This functions provides an REST request which provides the busines hour check against Business Hours plugin. This

## Setup

### Configure .env

Copy `.env.example` to `.env`

Your `.env` file should have the following variables set:

| Config Value | Description |
| :--| :-- |
| `ACCOUNT_SID`   | Your primary Twilio account identifier - find this [in the Console](https://www.twilio.com/console)|
| `AUTH_TOKEN`    | Used to authenticate - [just like the above, you'll find this here](https://www.twilio.com/console)|
| `SYNC_SID`      | Twilio Sync Service SID - find this using [Twilio CLI](https://www.twilio.com/docs/twilio-cli/quickstart) `twilio api:sync:v1:services:list` |
| `DOCUMENT_SID`  | Twilio Sync Document SID - find this using [Twilio CLI](https://www.twilio.com/docs/twilio-cli/quickstart) `twilio api:sync:v1:services:documents:list --service-sid [SYNC_ID]` |

### Deploy

Install dependant npm modules
* `moment-timezone`

```
$ npm install
```

Deploy using [Twilio CLI](https://www.twilio.com/docs/twilio-cli/quickstart) and [Serverless Toolkit Plugin](https://www.twilio.com/docs/labs/serverless-toolkit/getting-started#install-the-twilio-serverless-toolkit)

```
$ twilio serverless:deploy
```

## Usages

### Requests
Functions accept POST request to the deployed endpoint.

```
curl -X POST 'https://<endpoint>.twil.io/business-hour-check' \
     --header 'Content-Type: application/x-www-form-urlencoded' \
     --data-urlencode 'timezone=<timezone>' \
     --data-urlencode 'queue=<queue>'
```

### Parameters

| Parameters Value | Description |
| :--| :-- |
| `queue`     | Matching Queue in Business Hours Table |
| `timezone`  | [time zone identifier](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) |

### Response

Response payload will be in JSON format. For example

```
{
  "status": "ok",
  "isBusinessHour": true
}
```

| Response Values | Description |
| :--| :-- |
| `status`     | request status. "ok" or "error" |
| `isBusinessHour`  | Boolean value indicating business hour |
| `message` | On `status == "error"`, an error message is returned |
