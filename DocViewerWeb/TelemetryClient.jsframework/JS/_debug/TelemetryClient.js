// Copyright 2021 Breakside Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// #import Foundation
/* global Blob */
'use strict';

(function(){

var logger = JSLog("rl-telemetry", "client");

JSClass("TelemetryClient", JSObject, {

    urlSession: null,
    url: null,
    sessionID: null,
    version: null,
    attributes: null,

    initWithKey: function(key, baseURL, urlSession){
        if (baseURL === undefined){
            baseURL = JSURL.initWithString("https://api.telemetry.rocketlaunch.studio");
        }
        this.url = baseURL.appendingPathComponent("/receive");
        this.url.query.add("key", key);
        this.urlSession = urlSession || JSURLSession.shared;
        if (JSGlobalObject.sessionStorage){
            try{
                var id = JSGlobalObject.sessionStorage.getItem("studio.rocketlaunch.telemetry.id");
                if (id){
                    this.sessionID = id;
                }
            }catch (e){
            }
        }
        if (this.sessionID === null){
            this.sessionID = UUID();
        }
        this.version = JSBundle.mainBundle.info.JSBundleVersion;
        this.attributes = {};
        JSLog.addHandler(this, JSLog.Level.warn);
        JSLog.addHandler(this, JSLog.Level.error);
    },

    addAttribute: function(name, value){
        this.attributes[name] = value;
    },

    count: function(name, value){
        this.send("count", name, value);
    },

    stat: function(name, value){
        this.send("stat", name, value);
    },

    handleLog: function(record){
        if (record.subsystem === logger.subsystem){
            return;
        }
        var records = JSLog.getRecords();
        var message = JSLog.formatMessage(record.message, record.args);
        var details = {
            frames: record.error ? record.error.frames : [],
            logs: records.map(formatLog)
        };
        this.send(record.level, message, details);
    },

    crash: function(error, logs){
        var details = {
            frames: error.frames,
            logs: logs.map(formatLog)
        };
        this.send("crash", error.toString(), details);
    },

    send: function(){
        var args = Array.prototype.slice.call(arguments, 0);
        var attrs = {};
        if (this.sessionID != null){
            attrs._session = this.sessionID;
        }
        if (this.version !== null){
            attrs._version = this.version;
        }
        for (var k in this.attributes){
            attrs[k] = this.attributes[k];
        }
        var payload = {
            timestamp: (new Date()).getTime(),
            args: args,
            attrs: attrs
        };
        try{
            var data = JSON.stringify(payload).utf8();
            var contentType = "application/json; charset=utf-8";
            var navigator = JSGlobalObject.navigator;
            if (navigator && navigator.sendBeacon && JSGlobalObject.Blob){
                if (navigator.sendBeacon(this.url.encodedString, new Blob([data], {type: contentType}))){
                    return;
                }
            }
            var request = JSURLRequest.initWithURL(this.url);
            request.method = "POST";
            request.data = data;
            request.contentType = JSMediaType(contentType);
            var task = this.urlSession.dataTaskWithRequest(request, function(error){}, this);
            task.resume();
        }catch (e){
            logger.error("Failed to send telemetry: %{error}", e);
        }
    }

});

function formatLog(record){
    return {
        timestamp: record.timestamp,
        level: record.level,
        subsystem: record.subsystem,
        category: record.category,
        message: JSLog.formatMessage(record.message, record.args),
        stack: record.error ? record.error.stack : null
    };
}

})();