// Copyright © 2020 Breakside Inc.  MIT License.
// #import UIKit
'use strict';

JSClass("AboutWindowController", UIWindowController, {

    iconView: null,
    titleLabel: null,
    versionLabel: null,
    copyrightLabel: null,
    creditLabel: null,

    viewDidLoad: function(){
        AboutWindowController.$super.viewDidLoad.call(this);
        this.titleLabel.text = JSBundle.mainBundle.localizedStringForInfoKey("UIApplicationTitle");
        this.versionLabel.text = JSBundle.mainBundle.info.JSBundleVersion;
        this.copyrightLabel.text = JSBundle.mainBundle.localizedStringForInfoKey("JSCopyright");
        this.creditLabel.attributedText = this.attributedCredit();
    },

    attributedCredit: function(){
        var localizedCredit = JSBundle.mainBundle.localizedString("credit", "AboutWindowController");
        var attributedCredit = JSAttributedString.initWithString(localizedCredit);
        var url = JSURL.initWithString("https://jskit.dev");
        attributedCredit.replaceFormat("JSKit", {link: url, bold: true, cursor: UICursor.pointingHand});
        return attributedCredit;
    }

});