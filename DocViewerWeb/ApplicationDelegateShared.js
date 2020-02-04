// Copyright © 2020 Breakside Inc.  MIT License.
// #import UIKit
// #import "Rollbar.js"
'use strict';

JSClass("ApplicationDelegateShared", JSObject, {

    baseURL: null,
    components: null,
    componentsByURLPath: null,
    initialComponents: null,
    rollbar: null,

    applicationDidFinishLaunching: function(application, launchOptions){
        this.baseURL = application.baseURL;
        this.setupRollbar(application);
        this.setupDefaults();
        this.setupNotifications();
        this.loadComponents(launchOptions.uistate);
    },

    loadComponents: function(componentPath){
        this.components = JSBundle.mainBundle.metadataForResourceName('components').value.components;
        this.componentsByURLPath = {};
        this.addComponentsByURLPath(this.components, []);
        var path = componentPath || JSUserDefaults.shared.lastComponentPath || this.components[0].url;
        if (path.startsWith('/')){
            path = path.substr(1);
        }
        path = this.baseURL.path + 'docs/' + path;
        var url = JSURL.initWithString(path);
        this.initialComponents = this.componentsForURL(url);
        if (this.initialComponents.length === 0){
            this.initialComponents.push(this.components[0]);
        }
    },

    addComponentsByURLPath: function(components, ancestors){
        var prefix = this.baseURL.path + 'docs/';
        for (var i = 0, l = components.length; i < l; ++i){
            var component = components[i];
            var path = prefix + component.url;
            this.componentsByURLPath[path] = {
                ancestors: ancestors,
                component: component
            };
            if (component.children){
                this.addComponentsByURLPath(component.children, ancestors.concat(component));
            }
        }
    },

    componentsForURL: function(url){
        var info = UIApplication.shared.delegate.componentsByURLPath[url.path];
        if (!info){
            return [];
        }
        return info.ancestors.concat(info.component);
    },

    setupNotifications: function(){
        JSNotificationCenter.shared.addObserver("io.breakside.DocViewer.DocumentViewed", null, this._handleURLViewed, this);
    },

    _handleURLViewed: function(notification){
        var components = this.componentsForURL(notification.userInfo.url);
        if (components.length === 0){
            return;
        }
        var component = components[components.length - 1];
        var url = JSURL.initWithString(component.url, this.baseURL);
        JSUserDefaults.shared.lastComponentPath = component.url;
        var title = JSBundle.mainBundle.localizedStringForInfoKey("UIApplicationTitle");
        if (component === this.components[0]){
            window.history.replaceState(null, title, this.baseURL.path);
            document.title = title;
        }else{
            title = "%s | %s".sprintf(component.title, title);
            window.history.replaceState(null, title, url.path);
            document.title = title;
        }
    },

    setupDefaults: function(){
        JSUserDefaults.shared.registerDefaults({
            lastComponentPath: null, 
        });
    },

    setupRollbar: function(application){
        this.rollbar = Rollbar.initWithAccessToken(application.environment.rollbarToken, application.environment.name);
    },

    applicationDidCrash: function(application, error, logs){
        this.rollbar.crash(error, logs, this.baseURL);
    },

});