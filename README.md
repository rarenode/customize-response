# customize-response

### Features
A module that Appends custom response methods on `res` object of the express route:

### Installation
This is a [Node.js](https://nodejs.org/en/?target=_blank) module available through the npm registry.

Before installing, download and install [Node.js](https://nodejs.org/en/?target=_blank).
**Recommended** Use latest stable version of [Node.js](https://nodejs.org/en/?target=_blank).

Installation is done using the npm install command:
```
$ npm install @rarenode/customize-response
```

### Getting Started
After Installing module You need to do the following steps:

* Create a file named `rare-responses-config.js`.
* Require the module and call it by passing a **Directory path** where `rare-responses-config.js` exist.
* After requiring, the module will return you a function.
* Call that function as a middleware.

```
const rareCustomizeResponseMiddleware = require('@rarenode/customize-response')({
    reponsesConfigFilePath: '/config/rare-responses-config.js',
});

const app = express();

app.all('*', rareCustomizeResponseMiddleware);
```
#### **Note:**
* You can pass (reponsesConfigFilePath) as you want it is just for explanation

## How rare-responses-config.js File look like
```
module.exports = {
    '200': {
        response: {
            defaults: {
                string: {
                    field: 'message',
                    defaultValue: 'success',
                },
                object: {
                    field: 'data',
                    defaultValue: {},
                    hideIfNotExist: true,
                },
                array: {
                    field: 'dataItems',
                    defaultValue: [],
                }
            },
        },
        callback: (response = {}, argument = {}) => { }
    },
    `400, 401, 500: {
        response: {
            defaults: {
                string: {
                    field: 'error',
                    defaultValue: 'Default Error',
                },
                object: {
                    field: 'error',
                    defaultValue: {},
                    hideIfNotExist: true,
                },
                array: {
                    field: 'errors',
                    defaultValue: [],
                }
            },
        },
        callback: (response = {}, argument = {}) => { }
    },
}
```

## Description of responses-config.js File
### '200, 400, 401, 500'
So as you can see I wrote these 4 values 200, 400, 401, 500 in a string with a comma-separated them,
it means that I am asking this module to make 4 functions with status code 200, 400 ,401 & 500.
#### **Note:**
Response appender will append 4 functions on your `res` object in a route with the name
* res.http200()
* res.http400()
* res.http401()
* res.http500()

### 'response, callback'
Here you can see there are 2 fields defined in the object under the heading I described above.


#### response
So what response does is it define the structure of your response in `res.http200` or other defined method.
So there is a key name `defaults`, which I discuss later on. 
But first, let me tell you that whatever key you define outside the `defaults` key will be sent in the response as it is written.

Ok now we are going towards fields I wrote in `defaults`.
##### Defaults
* string
* number 
* object 
* array

Actually, these are the type of data you pass in `res.http200` or other defined method and define how these methods modify your
response according to the field define in it.
##### Example
As you can see there are two fields in the `string` field of defaults.
* field
* defaultValue

what `field` is for is it will make a key with the name given to it in the response object.
For Example:
```
    res.http200('Everthing seems good to me');
    res.http200(); // if nothing passed default value be setted automatically.
```
the response will be send is
```
{
 message: 'Everthing seems good to me',
 data:{},
 dataItems:[]
}

// Example of default value
{
 message: 'success',
 data:{},
 dataItems:[] 
}
```

## Note
There are one more keys to discuss:
* hideIfNotExist

### hideIfNotExist
hideIfNotExist will hide the respective key if you are not sending it.
For example, in the above example, you are passing only the string in `res.http200` method.
but the response appender will append `data` & `dataItems` key in the response too.
So if you want to send only the key with respective type so you have to add `hideIfNotExist` key.

### Parameters of custom methods like res.http200(param1,param2)
As we discussed above the first parameter, will be mapped according to the type of value you send.
so I am going to tell you about the `param2`, actually, there is a case where we want to add some additional data at the root
level of our response object so we can add here.
#### Example
```
    res.http200('Everthing seems good to me', { statusCode: 200 });
```
the response will be send is
```
{
 statusCode: 200,
 message: 'Everthing seems good to me',
 data:{},
 dataItems:[]
}
```


## Module for
* [Node.js](https://nodejs.org/en/?target=_blank) - Backend framework
* [Express.js](https://expressjs.com/?target=_blank) - Module for making apps


