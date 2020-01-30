// #import UIKit
'use strict';

function main(rootElement, bootstrapper){
    UIDevice.shared.primaryPointerType = UIUserInterface.PointerType.touch;
    UIApplicationMain(rootElement, bootstrapper);
}
