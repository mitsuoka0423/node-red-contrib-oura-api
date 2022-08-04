/*jshint -W069 */
/**
 * # Overview 

The Oura API allows Oura users and partner applications to improve their user experience with Oura data.

This document describes the Oura API Version 2 (V2), which supports access to the latest Oura Ring data types.
 For access to other data types—which have not yet migrated to V2—refer to the [Oura API Version 1 (V1)](https://cloud.ouraring.com/docs/) documentation.

# Data Access

Individual Oura users can access their own data through the API by using a [Personal Access Token](https://cloud.ouraring.com/personal-access-tokens).

If you want to retrieve data for multiple users, a registered [API Application](https://cloud.ouraring.com/oauth/applications) is required.
 API Applications are limited to **10** users before requiring approval from Oura. There is no limit once an application is approved.
 Additionally, Oura users **must provide consent** to share each data type an API Application has access to.

All data access requests through the Oura API require [Authentication](https://cloud.ouraring.com/docs/authentication).

Additionally, we recommend that Oura users keep their mobile app updated to support API access for the latest data types.
 The Oura API V2 returns a 426 response code for users who do not have an updated version of the app installed.

# Authentication

The Oura API provides two methods for Authentication: (1) the OAuth2 protocol and (2) Personal Access Tokens. For more information on the OAuth2 flow, see our [Authentication instructions](https://cloud.ouraring.com/docs/authentication).

Access tokens must be included in the request header as follows:
```http
GET /v2/usercollection/personal_info HTTP/1.1
Host: api.ouraring.com
Authorization: Bearer <token>
```

# Oura HTTP Response Codes

| Response Code                        | Description |
| ------------------------------------ | - |
| 200 OK                               | Successful Response         |
| 400 Query Parameter Validation Error | The request contains query parameters that are invalid or incorrectly formatted. |
| 426 Minimum App Version Error        | The Oura user's mobile app does not meet the minimum app version requirement to support sharing the requested data type. The Oura user must update their mobile app to enable API access for the requested data type. |
| 429 Request Rate Limit Exceeded        | The API is rate limited to 5000 requests in a 5 minute period. You will receive a 429 error code if you exceed this limit. [Contact us](mailto:api-support@ouraring.com) if you expect your usage to exceed this limit.| 
 * @class OuraApi
 * @param {(string|object)} [domainOrOptions] - The project domain or options object. If object, see the object's optional properties.
 * @param {string} [domainOrOptions.domain] - The project domain
 * @param {object} [domainOrOptions.token] - auth token - object with value property and optional headerOrQueryName and isQuery properties
 */
var OuraApi = (function(){
    'use strict';

    var request = require('request');
    var Q = require('q');
    var fileType = require('file-type');

    function OuraApi(options){
        var domain = (typeof options === 'object') ? options.domain : options;
        this.domain = domain ? domain : '';
        if(this.domain.length === 0) {
            throw new Error('Domain parameter must be specified as a string.');
        }
    }

    function mergeQueryParams(parameters, queryParameters) {
        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                  .forEach(function(parameterName) {
                      var parameter = parameters.$queryParameters[parameterName];
                      queryParameters[parameterName] = parameter;
            });
        }
        return queryParameters;
    }

    /**
     * HTTP Request
     * @method
     * @name OuraApi#request
     * @param {string} method - http method
     * @param {string} url - url to do request
     * @param {object} parameters
     * @param {object} body - body parameters / object
     * @param {object} headers - header parameters
     * @param {object} queryParameters - querystring parameters
     * @param {object} form - form data object
     * @param {object} deferred - promise object
     */
    OuraApi.prototype.request = function(method, url, parameters, body, headers, queryParameters, form, deferred){
        var req = {
            method: method,
            uri: url,
            qs: queryParameters,
            headers: headers,
            body: body
        };
        if(Object.keys(form).length > 0) {
            if (req.headers['Content-Type'] && req.headers['Content-Type'][0] === 'multipart/form-data') {
                delete req.body;
                var keyName = Object.keys(form)[0]
                req.formData = {
                    [keyName]: {
                        value: form[keyName],
                        options: {
                            filename: (fileType(form[keyName]) != null ? `file.${ fileType(form[keyName]).ext }` : `file` )
                        }
                    }
                };
            } else {
                req.form = form;
            }
        }
        if(typeof(body) === 'object' && !(body instanceof Buffer)) {
            req.json = true;
        }
        request(req, function(error, response, body){
            if(error) {
                deferred.reject(error);
            } else {
                if(/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch(e) {}
                }
                if(response.statusCode === 204) {
                    deferred.resolve({ response: response });
                } else if(response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({ response: response, body: body });
                } else {
                    deferred.reject({ response: response, body: body });
                }
            }
        });
    };


/**
 * Returns Oura Daily Activity data for the specified Oura user within a given timeframe
 * @method
 * @name OuraApi#daily_activity_route_daily_activity_get
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.startDate - ```YYYY-MM-DD``` formatted start date [default: ```end_date``` - 1 day]
     * @param {string} parameters.endDate - ```YYYY-MM-DD``` formatted end date [default: current UTC date]
     * @param {string} parameters.nextToken - Pagination token
 */
 OuraApi.prototype.daily_activity_route_daily_activity_get = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/v2/usercollection/daily_activity';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers['Accept'] = ['application/json'];


                if(parameters['startDate'] !== undefined){
                    queryParameters['start_date'] = parameters['startDate'];
                }
        
        
        


 

                if(parameters['endDate'] !== undefined){
                    queryParameters['end_date'] = parameters['endDate'];
                }
        
        
        


 

                if(parameters['nextToken'] !== undefined){
                    queryParameters['next_token'] = parameters['nextToken'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns available heart rate data for a specified Oura user within a given timeframe
 * @method
 * @name OuraApi#heartrate_route_heartrate_get
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.startDatetime - ISO 8601 formatted start timestamp [default: ```end_datetime``` - 1 day]
     * @param {string} parameters.endDatetime - ISO 8601 formatted end timestamp [default: current UTC timestamp]
     * @param {string} parameters.nextToken - Pagination token
 */
 OuraApi.prototype.heartrate_route_heartrate_get = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/v2/usercollection/heartrate';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers['Accept'] = ['application/json'];


                if(parameters['startDatetime'] !== undefined){
                    queryParameters['start_datetime'] = parameters['startDatetime'];
                }
        
        
        


 

                if(parameters['endDatetime'] !== undefined){
                    queryParameters['end_datetime'] = parameters['endDatetime'];
                }
        
        
        


 

                if(parameters['nextToken'] !== undefined){
                    queryParameters['next_token'] = parameters['nextToken'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns personal info data for the specified Oura user.
 * @method
 * @name OuraApi#personal_info_route_get
 * @param {object} parameters - method options and parameters
 */
 OuraApi.prototype.personal_info_route_get = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/v2/usercollection/personal_info';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns available Oura session data for the specified Oura user within a given timeframe
 * @method
 * @name OuraApi#sessions_route_session_get
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.startDate - ```YYYY-MM-DD``` formatted start date [default: ```end_date``` - 1 day]
     * @param {string} parameters.endDate - ```YYYY-MM-DD``` formatted end date [default: current UTC date]
     * @param {string} parameters.nextToken - Pagination token
 */
 OuraApi.prototype.sessions_route_session_get = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/v2/usercollection/session';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers['Accept'] = ['application/json'];


                if(parameters['startDate'] !== undefined){
                    queryParameters['start_date'] = parameters['startDate'];
                }
        
        
        


 

                if(parameters['endDate'] !== undefined){
                    queryParameters['end_date'] = parameters['endDate'];
                }
        
        
        


 

                if(parameters['nextToken'] !== undefined){
                    queryParameters['next_token'] = parameters['nextToken'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns Oura tags data for the specified Oura user within a given timeframe
 * @method
 * @name OuraApi#tags_route_tag_get
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.startDate - ```YYYY-MM-DD``` formatted start date [default: ```end_date``` - 1 day]
     * @param {string} parameters.endDate - ```YYYY-MM-DD``` formatted end date [default: current UTC date]
     * @param {string} parameters.nextToken - Pagination token
 */
 OuraApi.prototype.tags_route_tag_get = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/v2/usercollection/tag';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers['Accept'] = ['application/json'];


                if(parameters['startDate'] !== undefined){
                    queryParameters['start_date'] = parameters['startDate'];
                }
        
        
        


 

                if(parameters['endDate'] !== undefined){
                    queryParameters['end_date'] = parameters['endDate'];
                }
        
        
        


 

                if(parameters['nextToken'] !== undefined){
                    queryParameters['next_token'] = parameters['nextToken'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns available Oura workout data for the specified Oura user within a given timeframe
 * @method
 * @name OuraApi#workouts_route_workout_get
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.startDate - ```YYYY-MM-DD``` formatted start date [default: ```end_date``` - 1 day]
     * @param {string} parameters.endDate - ```YYYY-MM-DD``` formatted end date [default: current UTC date]
     * @param {string} parameters.nextToken - Pagination token
 */
 OuraApi.prototype.workouts_route_workout_get = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/v2/usercollection/workout';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers['Accept'] = ['application/json'];


                if(parameters['startDate'] !== undefined){
                    queryParameters['start_date'] = parameters['startDate'];
                }
        
        
        


 

                if(parameters['endDate'] !== undefined){
                    queryParameters['end_date'] = parameters['endDate'];
                }
        
        
        


 

                if(parameters['nextToken'] !== undefined){
                    queryParameters['next_token'] = parameters['nextToken'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };

    return OuraApi;
})();

exports.OuraApi = OuraApi;
