//
//  IntelSDK.h
//  Hydrogen
//
//  Created by Waldemar Krumrick on 9/30/13.
//
//

#import <Cordova/CDV.h>
#import "IntelCloudServicesPlatformSDK.h"

@interface IntelSDKPlugin : CDVPlugin <AuthDelegate>

- (void)init:(CDVInvokedUrlCommand *)command;

- (void)login:(CDVInvokedUrlCommand *)command;

- (void)getUserDetails:(CDVInvokedUrlCommand *)command;

- (void)logout:(CDVInvokedUrlCommand *)command;

- (void)resultToken:(AccessToken *)result;

- (void)error:(NSError*)error;

@end
