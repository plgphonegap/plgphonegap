//
//  ContextSDK.h
//  Hydrogen
//
//  Created by Waldemar Krumrick on 10/1/13.
//
//

#import <Cordova/CDV.h>
#import "Context.h"

@interface ContextSDKPlugin : CDVPlugin <OnStatusCallback>

@property(nonatomic,strong) NSString *callbackId;

- (void)initWithServicesList:(CDVInvokedUrlCommand *)command;

- (void)stopServices:(CDVInvokedUrlCommand *)command;

- (void)getServicesList:(CDVInvokedUrlCommand *)command;

@end
