'use strict';
var lib = require('./lib.js');

module.exports = function (RED) {
    function OuraApiNode(config) {
        RED.nodes.createNode(this, config);
        this.service = RED.nodes.getNode(config.service);
        this.method = config.method;
        this.daily_activity_route_daily_activity_get_startDate = config.daily_activity_route_daily_activity_get_startDate;
        this.daily_activity_route_daily_activity_get_startDateType = config.daily_activity_route_daily_activity_get_startDateType || 'str';
        this.daily_activity_route_daily_activity_get_endDate = config.daily_activity_route_daily_activity_get_endDate;
        this.daily_activity_route_daily_activity_get_endDateType = config.daily_activity_route_daily_activity_get_endDateType || 'str';
        this.daily_activity_route_daily_activity_get_nextToken = config.daily_activity_route_daily_activity_get_nextToken;
        this.daily_activity_route_daily_activity_get_nextTokenType = config.daily_activity_route_daily_activity_get_nextTokenType || 'str';
        this.heartrate_route_heartrate_get_startDatetime = config.heartrate_route_heartrate_get_startDatetime;
        this.heartrate_route_heartrate_get_startDatetimeType = config.heartrate_route_heartrate_get_startDatetimeType || 'str';
        this.heartrate_route_heartrate_get_endDatetime = config.heartrate_route_heartrate_get_endDatetime;
        this.heartrate_route_heartrate_get_endDatetimeType = config.heartrate_route_heartrate_get_endDatetimeType || 'str';
        this.heartrate_route_heartrate_get_nextToken = config.heartrate_route_heartrate_get_nextToken;
        this.heartrate_route_heartrate_get_nextTokenType = config.heartrate_route_heartrate_get_nextTokenType || 'str';
        this.sessions_route_session_get_startDate = config.sessions_route_session_get_startDate;
        this.sessions_route_session_get_startDateType = config.sessions_route_session_get_startDateType || 'str';
        this.sessions_route_session_get_endDate = config.sessions_route_session_get_endDate;
        this.sessions_route_session_get_endDateType = config.sessions_route_session_get_endDateType || 'str';
        this.sessions_route_session_get_nextToken = config.sessions_route_session_get_nextToken;
        this.sessions_route_session_get_nextTokenType = config.sessions_route_session_get_nextTokenType || 'str';
        this.tags_route_tag_get_startDate = config.tags_route_tag_get_startDate;
        this.tags_route_tag_get_startDateType = config.tags_route_tag_get_startDateType || 'str';
        this.tags_route_tag_get_endDate = config.tags_route_tag_get_endDate;
        this.tags_route_tag_get_endDateType = config.tags_route_tag_get_endDateType || 'str';
        this.tags_route_tag_get_nextToken = config.tags_route_tag_get_nextToken;
        this.tags_route_tag_get_nextTokenType = config.tags_route_tag_get_nextTokenType || 'str';
        this.workouts_route_workout_get_startDate = config.workouts_route_workout_get_startDate;
        this.workouts_route_workout_get_startDateType = config.workouts_route_workout_get_startDateType || 'str';
        this.workouts_route_workout_get_endDate = config.workouts_route_workout_get_endDate;
        this.workouts_route_workout_get_endDateType = config.workouts_route_workout_get_endDateType || 'str';
        this.workouts_route_workout_get_nextToken = config.workouts_route_workout_get_nextToken;
        this.workouts_route_workout_get_nextTokenType = config.workouts_route_workout_get_nextTokenType || 'str';
        var node = this;

        node.on('input', function (msg) {
            var errorFlag = false;
            var client;
            if (this.service && this.service.host) {
                client = new lib.OuraApi({ domain: this.service.host });
            } else {
                node.error('Host in configuration node is not specified.', msg);
                errorFlag = true;
            }
            if (!errorFlag) {
                client.body = msg.payload;
            }

            var result;
            if (!errorFlag && node.method === 'daily_activity_route_daily_activity_get') {
                var daily_activity_route_daily_activity_get_parameters = [];
                var daily_activity_route_daily_activity_get_nodeParam;
                var daily_activity_route_daily_activity_get_nodeParamType;

                daily_activity_route_daily_activity_get_nodeParam = node.daily_activity_route_daily_activity_get_startDate;
                daily_activity_route_daily_activity_get_nodeParamType = node.daily_activity_route_daily_activity_get_startDateType;
                if (daily_activity_route_daily_activity_get_nodeParamType === 'str') {
                    daily_activity_route_daily_activity_get_parameters.startDate = daily_activity_route_daily_activity_get_nodeParam || '';
                } else {
                    daily_activity_route_daily_activity_get_parameters.startDate = RED.util.getMessageProperty(msg, daily_activity_route_daily_activity_get_nodeParam);
                }
                daily_activity_route_daily_activity_get_parameters.startDate = !!daily_activity_route_daily_activity_get_parameters.startDate ? daily_activity_route_daily_activity_get_parameters.startDate : msg.payload;
                
                daily_activity_route_daily_activity_get_nodeParam = node.daily_activity_route_daily_activity_get_endDate;
                daily_activity_route_daily_activity_get_nodeParamType = node.daily_activity_route_daily_activity_get_endDateType;
                if (daily_activity_route_daily_activity_get_nodeParamType === 'str') {
                    daily_activity_route_daily_activity_get_parameters.endDate = daily_activity_route_daily_activity_get_nodeParam || '';
                } else {
                    daily_activity_route_daily_activity_get_parameters.endDate = RED.util.getMessageProperty(msg, daily_activity_route_daily_activity_get_nodeParam);
                }
                daily_activity_route_daily_activity_get_parameters.endDate = !!daily_activity_route_daily_activity_get_parameters.endDate ? daily_activity_route_daily_activity_get_parameters.endDate : msg.payload;
                
                daily_activity_route_daily_activity_get_nodeParam = node.daily_activity_route_daily_activity_get_nextToken;
                daily_activity_route_daily_activity_get_nodeParamType = node.daily_activity_route_daily_activity_get_nextTokenType;
                if (daily_activity_route_daily_activity_get_nodeParamType === 'str') {
                    daily_activity_route_daily_activity_get_parameters.nextToken = daily_activity_route_daily_activity_get_nodeParam || '';
                } else {
                    daily_activity_route_daily_activity_get_parameters.nextToken = RED.util.getMessageProperty(msg, daily_activity_route_daily_activity_get_nodeParam);
                }
                daily_activity_route_daily_activity_get_parameters.nextToken = !!daily_activity_route_daily_activity_get_parameters.nextToken ? daily_activity_route_daily_activity_get_parameters.nextToken : msg.payload;
                                result = client.daily_activity_route_daily_activity_get(daily_activity_route_daily_activity_get_parameters);
            }
            if (!errorFlag && node.method === 'heartrate_route_heartrate_get') {
                var heartrate_route_heartrate_get_parameters = [];
                var heartrate_route_heartrate_get_nodeParam;
                var heartrate_route_heartrate_get_nodeParamType;

                heartrate_route_heartrate_get_nodeParam = node.heartrate_route_heartrate_get_startDatetime;
                heartrate_route_heartrate_get_nodeParamType = node.heartrate_route_heartrate_get_startDatetimeType;
                if (heartrate_route_heartrate_get_nodeParamType === 'str') {
                    heartrate_route_heartrate_get_parameters.startDatetime = heartrate_route_heartrate_get_nodeParam || '';
                } else {
                    heartrate_route_heartrate_get_parameters.startDatetime = RED.util.getMessageProperty(msg, heartrate_route_heartrate_get_nodeParam);
                }
                heartrate_route_heartrate_get_parameters.startDatetime = !!heartrate_route_heartrate_get_parameters.startDatetime ? heartrate_route_heartrate_get_parameters.startDatetime : msg.payload;
                
                heartrate_route_heartrate_get_nodeParam = node.heartrate_route_heartrate_get_endDatetime;
                heartrate_route_heartrate_get_nodeParamType = node.heartrate_route_heartrate_get_endDatetimeType;
                if (heartrate_route_heartrate_get_nodeParamType === 'str') {
                    heartrate_route_heartrate_get_parameters.endDatetime = heartrate_route_heartrate_get_nodeParam || '';
                } else {
                    heartrate_route_heartrate_get_parameters.endDatetime = RED.util.getMessageProperty(msg, heartrate_route_heartrate_get_nodeParam);
                }
                heartrate_route_heartrate_get_parameters.endDatetime = !!heartrate_route_heartrate_get_parameters.endDatetime ? heartrate_route_heartrate_get_parameters.endDatetime : msg.payload;
                
                heartrate_route_heartrate_get_nodeParam = node.heartrate_route_heartrate_get_nextToken;
                heartrate_route_heartrate_get_nodeParamType = node.heartrate_route_heartrate_get_nextTokenType;
                if (heartrate_route_heartrate_get_nodeParamType === 'str') {
                    heartrate_route_heartrate_get_parameters.nextToken = heartrate_route_heartrate_get_nodeParam || '';
                } else {
                    heartrate_route_heartrate_get_parameters.nextToken = RED.util.getMessageProperty(msg, heartrate_route_heartrate_get_nodeParam);
                }
                heartrate_route_heartrate_get_parameters.nextToken = !!heartrate_route_heartrate_get_parameters.nextToken ? heartrate_route_heartrate_get_parameters.nextToken : msg.payload;
                                result = client.heartrate_route_heartrate_get(heartrate_route_heartrate_get_parameters);
            }
            if (!errorFlag && node.method === 'personal_info_route_get') {
                var personal_info_route_get_parameters = [];
                var personal_info_route_get_nodeParam;
                var personal_info_route_get_nodeParamType;
                result = client.personal_info_route_get(personal_info_route_get_parameters);
            }
            if (!errorFlag && node.method === 'sessions_route_session_get') {
                var sessions_route_session_get_parameters = [];
                var sessions_route_session_get_nodeParam;
                var sessions_route_session_get_nodeParamType;

                sessions_route_session_get_nodeParam = node.sessions_route_session_get_startDate;
                sessions_route_session_get_nodeParamType = node.sessions_route_session_get_startDateType;
                if (sessions_route_session_get_nodeParamType === 'str') {
                    sessions_route_session_get_parameters.startDate = sessions_route_session_get_nodeParam || '';
                } else {
                    sessions_route_session_get_parameters.startDate = RED.util.getMessageProperty(msg, sessions_route_session_get_nodeParam);
                }
                sessions_route_session_get_parameters.startDate = !!sessions_route_session_get_parameters.startDate ? sessions_route_session_get_parameters.startDate : msg.payload;
                
                sessions_route_session_get_nodeParam = node.sessions_route_session_get_endDate;
                sessions_route_session_get_nodeParamType = node.sessions_route_session_get_endDateType;
                if (sessions_route_session_get_nodeParamType === 'str') {
                    sessions_route_session_get_parameters.endDate = sessions_route_session_get_nodeParam || '';
                } else {
                    sessions_route_session_get_parameters.endDate = RED.util.getMessageProperty(msg, sessions_route_session_get_nodeParam);
                }
                sessions_route_session_get_parameters.endDate = !!sessions_route_session_get_parameters.endDate ? sessions_route_session_get_parameters.endDate : msg.payload;
                
                sessions_route_session_get_nodeParam = node.sessions_route_session_get_nextToken;
                sessions_route_session_get_nodeParamType = node.sessions_route_session_get_nextTokenType;
                if (sessions_route_session_get_nodeParamType === 'str') {
                    sessions_route_session_get_parameters.nextToken = sessions_route_session_get_nodeParam || '';
                } else {
                    sessions_route_session_get_parameters.nextToken = RED.util.getMessageProperty(msg, sessions_route_session_get_nodeParam);
                }
                sessions_route_session_get_parameters.nextToken = !!sessions_route_session_get_parameters.nextToken ? sessions_route_session_get_parameters.nextToken : msg.payload;
                                result = client.sessions_route_session_get(sessions_route_session_get_parameters);
            }
            if (!errorFlag && node.method === 'tags_route_tag_get') {
                var tags_route_tag_get_parameters = [];
                var tags_route_tag_get_nodeParam;
                var tags_route_tag_get_nodeParamType;

                tags_route_tag_get_nodeParam = node.tags_route_tag_get_startDate;
                tags_route_tag_get_nodeParamType = node.tags_route_tag_get_startDateType;
                if (tags_route_tag_get_nodeParamType === 'str') {
                    tags_route_tag_get_parameters.startDate = tags_route_tag_get_nodeParam || '';
                } else {
                    tags_route_tag_get_parameters.startDate = RED.util.getMessageProperty(msg, tags_route_tag_get_nodeParam);
                }
                tags_route_tag_get_parameters.startDate = !!tags_route_tag_get_parameters.startDate ? tags_route_tag_get_parameters.startDate : msg.payload;
                
                tags_route_tag_get_nodeParam = node.tags_route_tag_get_endDate;
                tags_route_tag_get_nodeParamType = node.tags_route_tag_get_endDateType;
                if (tags_route_tag_get_nodeParamType === 'str') {
                    tags_route_tag_get_parameters.endDate = tags_route_tag_get_nodeParam || '';
                } else {
                    tags_route_tag_get_parameters.endDate = RED.util.getMessageProperty(msg, tags_route_tag_get_nodeParam);
                }
                tags_route_tag_get_parameters.endDate = !!tags_route_tag_get_parameters.endDate ? tags_route_tag_get_parameters.endDate : msg.payload;
                
                tags_route_tag_get_nodeParam = node.tags_route_tag_get_nextToken;
                tags_route_tag_get_nodeParamType = node.tags_route_tag_get_nextTokenType;
                if (tags_route_tag_get_nodeParamType === 'str') {
                    tags_route_tag_get_parameters.nextToken = tags_route_tag_get_nodeParam || '';
                } else {
                    tags_route_tag_get_parameters.nextToken = RED.util.getMessageProperty(msg, tags_route_tag_get_nodeParam);
                }
                tags_route_tag_get_parameters.nextToken = !!tags_route_tag_get_parameters.nextToken ? tags_route_tag_get_parameters.nextToken : msg.payload;
                                result = client.tags_route_tag_get(tags_route_tag_get_parameters);
            }
            if (!errorFlag && node.method === 'workouts_route_workout_get') {
                var workouts_route_workout_get_parameters = [];
                var workouts_route_workout_get_nodeParam;
                var workouts_route_workout_get_nodeParamType;

                workouts_route_workout_get_nodeParam = node.workouts_route_workout_get_startDate;
                workouts_route_workout_get_nodeParamType = node.workouts_route_workout_get_startDateType;
                if (workouts_route_workout_get_nodeParamType === 'str') {
                    workouts_route_workout_get_parameters.startDate = workouts_route_workout_get_nodeParam || '';
                } else {
                    workouts_route_workout_get_parameters.startDate = RED.util.getMessageProperty(msg, workouts_route_workout_get_nodeParam);
                }
                workouts_route_workout_get_parameters.startDate = !!workouts_route_workout_get_parameters.startDate ? workouts_route_workout_get_parameters.startDate : msg.payload;
                
                workouts_route_workout_get_nodeParam = node.workouts_route_workout_get_endDate;
                workouts_route_workout_get_nodeParamType = node.workouts_route_workout_get_endDateType;
                if (workouts_route_workout_get_nodeParamType === 'str') {
                    workouts_route_workout_get_parameters.endDate = workouts_route_workout_get_nodeParam || '';
                } else {
                    workouts_route_workout_get_parameters.endDate = RED.util.getMessageProperty(msg, workouts_route_workout_get_nodeParam);
                }
                workouts_route_workout_get_parameters.endDate = !!workouts_route_workout_get_parameters.endDate ? workouts_route_workout_get_parameters.endDate : msg.payload;
                
                workouts_route_workout_get_nodeParam = node.workouts_route_workout_get_nextToken;
                workouts_route_workout_get_nodeParamType = node.workouts_route_workout_get_nextTokenType;
                if (workouts_route_workout_get_nodeParamType === 'str') {
                    workouts_route_workout_get_parameters.nextToken = workouts_route_workout_get_nodeParam || '';
                } else {
                    workouts_route_workout_get_parameters.nextToken = RED.util.getMessageProperty(msg, workouts_route_workout_get_nodeParam);
                }
                workouts_route_workout_get_parameters.nextToken = !!workouts_route_workout_get_parameters.nextToken ? workouts_route_workout_get_parameters.nextToken : msg.payload;
                                result = client.workouts_route_workout_get(workouts_route_workout_get_parameters);
            }
            if (!errorFlag && result === undefined) {
                node.error('Method is not specified.', msg);
                errorFlag = true;
            }
            var setData = function (msg, data) {
                if (data) {
                    if (data.response) {
                        if (data.response.statusCode) {
                            msg.statusCode = data.response.statusCode;
                        }
                        if (data.response.headers) {
                            msg.headers = data.response.headers;
                        }
                        if (data.response.request && data.response.request.uri && data.response.request.uri.href) {
                            msg.responseUrl = data.response.request.uri.href;
                        }
                    }
                    if (data.body) {
                        msg.payload = data.body;
                    }
                }
                return msg;
            };
            if (!errorFlag) {
                node.status({ fill: 'blue', shape: 'dot', text: 'OuraApi.status.requesting' });
                result.then(function (data) {
                    node.send(setData(msg, data));
                    node.status({});
                }).catch(function (error) {
                    var message = null;
                    if (error && error.body && error.body.message) {
                        message = error.body.message;
                    }
                    node.error(message, setData(msg, error));
                    node.status({ fill: 'red', shape: 'ring', text: 'node-red:common.status.error' });
                });
            }
        });
    }

    RED.nodes.registerType('oura-api', OuraApiNode);
    function OuraApiServiceNode(n) {
        RED.nodes.createNode(this, n);
        this.host = n.host;

    }

    RED.nodes.registerType('oura-api-service', OuraApiServiceNode, {
        credentials: {
            temp: { type: 'text' }
        }
    });
};
