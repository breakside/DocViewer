// #import Foundation
'use strict';

JSClass("Rollbar", JSObject, {

    accessToken: null,
    environment: null,
    endpoint: null,

    initWithAccessToken: function(accessToken, environment){
        this.accessToken = accessToken;
        this.environment = environment;
        this.endpoint = JSURL.initWithString("https://api.rollbar.com/api/1/item/");
    },

    log: function(record){

    },

    crash: function(error, logs, url){
        var payload = {
            access_token: this.accessToken,
            data: {
                uuid: UUID(),
                environment: this.environment,
                level: "critical",
                timestamp: Date.now(),
                platform: "browser",
                framework: "browser-js",
                language: "javascript",
                request: {
                    url: url.encodedString,
                    user_ip: "$remote_ip"
                },
                client: {
                    timestamp: Date.now(),
                    javascript: {
                        browser: navigator.userAgent,
                        language: navigator.language
                    }
                },
                body: {
                    telemetry: [],
                    trace: {
                        exception: {
                            class: error.name,
                            message: error.message,
                        },
                        frames: error.frames.reverse()
                    }
                }
            }
        };
        var record;
        for (var i = 0, l = logs.length; i < l; ++i){
            record = logs[i];
            payload.data.body.telemetry.push({
                uuid: UUID(),
                type: "log",
                level: record.level,
                source: "client",
                timestamp_ms: Math.round(record.timestamp * 1000),
                body: {
                    message: JSLog.format(record)
                }
            });
        }
        var request = JSURLRequest.initWithURL(this.endpoint);
        request.method = JSURLRequest.Method.POST;
        request.setObject(payload);
        var task = JSURLSession.shared.dataTaskWithRequest(request);
        task.resume();
    }

});