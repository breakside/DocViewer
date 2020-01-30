// Copyright © 2020 Breakside Inc.  MIT License.
// #import UIKit
'use strict';

JSClass("ApplicationDelegateBase", JSObject, {

    setupDefaults: function(){
        JSUserDefaults.shared.registerDefaults({
            lastComponentPath: null, 
        });
    }

});