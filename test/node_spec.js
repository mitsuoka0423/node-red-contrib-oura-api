var should = require('should');
var helper = require('node-red-node-test-helper');
var node = require('../node.js');

helper.init(require.resolve('node-red'));

describe('oura-api node', function () {

    before(function (done) {
        helper.startServer(done);
    });

    after(function (done) {
        helper.stopServer(done);
    });

    afterEach(function () {
        helper.unload();
    });

    it('should be loaded', function (done) {
        var flow = [{ id: 'n1', type: 'oura-api', name: 'oura-api' }];
        helper.load(node, flow, function () {
            var n1 = helper.getNode('n1');
            n1.should.have.property('name', 'oura-api');
            done();
        });
    });

    it('should handle daily_activity_route_daily_activity_get()', function (done) {
        var flow = [
            { id: 'n1', type: 'oura-api', name: 'oura-api',
                method: 'daily_activity_route_daily_activity_get',
                daily_activity_route_daily_activity_get_startDate: '<node property>', // (1) define node properties
                daily_activity_route_daily_activity_get_endDate: '<node property>', // (1) define node properties
                daily_activity_route_daily_activity_get_nextToken: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'oura-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle heartrate_route_heartrate_get()', function (done) {
        var flow = [
            { id: 'n1', type: 'oura-api', name: 'oura-api',
                method: 'heartrate_route_heartrate_get',
                heartrate_route_heartrate_get_startDatetime: '<node property>', // (1) define node properties
                heartrate_route_heartrate_get_endDatetime: '<node property>', // (1) define node properties
                heartrate_route_heartrate_get_nextToken: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'oura-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle personal_info_route_get()', function (done) {
        var flow = [
            { id: 'n1', type: 'oura-api', name: 'oura-api',
                method: 'personal_info_route_get',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'oura-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle sessions_route_session_get()', function (done) {
        var flow = [
            { id: 'n1', type: 'oura-api', name: 'oura-api',
                method: 'sessions_route_session_get',
                sessions_route_session_get_startDate: '<node property>', // (1) define node properties
                sessions_route_session_get_endDate: '<node property>', // (1) define node properties
                sessions_route_session_get_nextToken: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'oura-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle tags_route_tag_get()', function (done) {
        var flow = [
            { id: 'n1', type: 'oura-api', name: 'oura-api',
                method: 'tags_route_tag_get',
                tags_route_tag_get_startDate: '<node property>', // (1) define node properties
                tags_route_tag_get_endDate: '<node property>', // (1) define node properties
                tags_route_tag_get_nextToken: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'oura-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle workouts_route_workout_get()', function (done) {
        var flow = [
            { id: 'n1', type: 'oura-api', name: 'oura-api',
                method: 'workouts_route_workout_get',
                workouts_route_workout_get_startDate: '<node property>', // (1) define node properties
                workouts_route_workout_get_endDate: '<node property>', // (1) define node properties
                workouts_route_workout_get_nextToken: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'oura-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
});
