// Copyright © 2020 Breakside Inc.  MIT License.
// #import UIKit
'use strict';

JSClass("WebViewController", UIViewController, {

    component: null,

    // MARK: - View Lifecycle

    viewDidLoad: function(){
        WebViewController.$super.viewDidLoad.call(this);
        var url = JSURL.initWithString('docs/' + this.component.url);
        this.view.loadURL(url);
    },

    loadView: function(){
        this.view = UIWebView.init();
        this.view.delegate = this;
    },

    viewWillAppear: function(animated){
        WebViewController.$super.viewWillAppear.call(this, animated);
    },

    viewDidAppear: function(animated){
        WebViewController.$super.viewDidAppear.call(this, animated);
    },

    viewWillDisappear: function(animated){
        WebViewController.$super.viewWillDisappear.call(this, animated);
    },

    viewDidDisappear: function(animated){
        WebViewController.$super.viewDidDisappear.call(this, animated);
    },

    webViewDidLoadURL: function(webView, url){
        JSNotificationCenter.shared.post("io.breakside.DocViewer.DocumentViewed", this, {url: url});
    }

});