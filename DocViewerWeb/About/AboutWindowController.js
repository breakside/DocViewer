// Copyright © 2020 Breakside Inc.  MIT License.
// #import UIKit
'use strict';

JSClass("AboutWindowController", UIWindowController, {

    iconView: JSOutlet(),
    titleLabel: JSOutlet(),
    versionLabel: JSOutlet(),
    copyrightLabel: JSOutlet(),
    creditLabel: JSOutlet(),
    sourceLabel: JSOutlet(),

    viewDidLoad: function(){
        AboutWindowController.$super.viewDidLoad.call(this);
        this.titleLabel.text = JSBundle.mainBundle.localizedStringForInfoKey("UIApplicationTitle");
        this.versionLabel.text = JSBundle.mainBundle.info.JSBundleVersion;
        this.copyrightLabel.text = JSBundle.mainBundle.localizedStringForInfoKey("JSCopyright");
        this.creditLabel.attributedText = this.attributedCredit();
        this.sourceLabel.attributedText = this.attributedSource();
    },

    attributedCredit: function(){
        var localizedCredit = JSBundle.mainBundle.localizedString("credit", "AboutWindowController");
        var attributedCredit = JSAttributedString.initWithString(localizedCredit);
        var url = JSURL.initWithString("https://jskit.dev");
        attributedCredit.replaceFormat("JSKit", {link: url, bold: true, cursor: UICursor.pointingHand});
        return attributedCredit;
    },

    attributedSource: function(){
        var localizedSource = JSBundle.mainBundle.localizedString("source", "AboutWindowController");
        var url = JSURL.initWithString("https://github.com/breakside/DocViewer");
        var attributedSource = JSAttributedString.initWithString(localizedSource, {link: url, cursor: UICursor.pointingHand});
        return attributedSource;
    },

});