//
//  IntelSDK.m
//  Hydrogen
//
//  Created by Waldemar Krumrick on 9/30/13.
//
//

#import "IntelSDKPlugin.h"

@implementation IntelSDKPlugin

- (void)init:(CDVInvokedUrlCommand *)command{
    
    NSString *clientId = [command.arguments objectAtIndex:0];
    NSString *secretId = [command.arguments objectAtIndex:1];
    NSString *scopes = [command.arguments objectAtIndex:2];
    
    NSArray *scopeList = nil;
    
    @try{
        scopeList = [scopes componentsSeparatedByString:@" "];
    }@catch (NSException *exception) {
        scopeList = [Auth getAllScopes];
    }
    
    [IntelCloudServicesPlatformSDK initWithAction:ACTION_LOGIN
                                      environment:ENVIRONMENT_PRODUCTION
                                         clientId:clientId
                                        secretKey:secretId
                                            scope:scopeList delegate:self];
}

- (void)error:(NSError*)error{
    UIAlertView *alert = [[UIAlertView alloc]initWithTitle:@"Error" message:[[error userInfo]objectForKey:@"message"] delegate:nil cancelButtonTitle:@"Accept" otherButtonTitles:nil];
    [alert show];
}

- (void)resultToken:(AccessToken*)result{
    if(result == nil){
        return;
    }
}

- (void)login:(CDVInvokedUrlCommand *)command{
    [[IntelCloudServicesPlatformSDK getAuth] login:^(AccessToken *token){
        [[IntelCloudServicesPlatformSDK getUser] getUserBasicDetail:^(User *user){ //Obtain user for push states to sensing demo
            CDVPluginResult *response = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
            [self.commandDelegate sendPluginResult:response callbackId:command.callbackId];
        }errorCallback:^(NSError *errorCallback){
            NSString *error = [NSString stringWithFormat:@"%@", [[errorCallback userInfo] objectForKey:@"message"]];
            CDVPluginResult *response = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:error];
            [self.commandDelegate sendPluginResult:response callbackId:command.callbackId];
        }];
    }errorCallBack:^(NSError *errorCallback){
        NSString *error = [NSString stringWithFormat:@"%@", [[errorCallback userInfo] objectForKey:@"message"]];
        CDVPluginResult *response = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:error];
        [self.commandDelegate sendPluginResult:response callbackId:command.callbackId];
    }];
}

- (void)getUserDetails:(CDVInvokedUrlCommand *)command{
    if([[IntelCloudServicesPlatformSDK getAuth] isInit] && [[IntelCloudServicesPlatformSDK getAuth] isLogin]){
        
    }
}

- (void)logout:(CDVInvokedUrlCommand *)command{
    [[IntelCloudServicesPlatformSDK getAuth] logout:^(){
        CDVPluginResult *response = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
        [self.commandDelegate sendPluginResult:response callbackId:command.callbackId];
    }];
}

@end
