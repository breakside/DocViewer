// Copyright © 2020 Breakside Inc.  MIT License.
// #import Foundation
'use strict';

JSClass("Rollbar", JSObject, {

    accessToken: null,
    environment: null,
    codeVersion: null,
    endpoint: null,

    initWithAccessToken: function(accessToken, environment){
        this.accessToken = accessToken;
        this.environment = environment;
        this.endpoint = JSURL.initWithString("https://api.rollbar.com/api/1/item/");
    },

    payload: function(level, url){
        var payload = {
            access_token: this.accessToken,
            data: {
                uuid: UUID(),
                environment: this.environment,
                level: level,
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
                }
            }
        };
        if (this.codeVersion !== null){
            payload.data.code_version = this.codeVersion;
        }
        return payload;
    },

    send: function(payload){
        var request = JSURLRequest.initWithURL(this.endpoint);
        request.method = JSURLRequest.Method.POST;
        request.setObject(payload);
        var task = JSURLSession.shared.dataTaskWithRequest(request);
        task.resume();
    },

    telemetry: function(logs){
        var telemetry = [];
        var record;
        for (var i = 0, l = logs.length; i < l; ++i){
            record = logs[i];
            telemetry.push({
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
        return telemetry;
    },

    log: function(record, url){
        var payload = this.payload(record.level, url);
        payload.data.timestamp = record.timestamp;
        var error = null;
        for (var i = 0, l = record.args.length; i < l && error === null; ++i){
            if (record.args[i] instanceof Error){
                error = record.args[i];
            }
        }
        if (error !== null){
            payload.data.body.trace = {
                exception: {
                    class: error.name,
                    message: error.message,
                    description: JSLog.formatMessage(record.message, record.args)
                },
                frames: error.frames.reverse()
            };
        }else{
            payload.data.body.message = {
                body: JSLog.formatMessage(record.message, record.args)
            };
        }
        if (record.level === JSLog.Level.error || record.level === JSLog.Level.warn){
            var logs = JSLog.getRecords();
            payload.data.body.telemetry = this.telemetry(logs);
        }
        this.send(payload);
    },

    crash: function(error, logs, url){
        var payload = this.payload("critical", url);
        payload.data.body.trace = {
            exception: {
                class: error.name,
                message: error.message,
            },
            frames: error.frames.reverse()
        };
        payload.data.body.telemetry = this.telemetry(logs);
        this.send(payload);
    }

});