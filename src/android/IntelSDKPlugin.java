package org.intel.phonegap;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.PluginResult;
import org.apache.cordova.PluginResult.Status;
import org.json.JSONArray;
import org.json.JSONException;

import android.widget.Toast;

import com.intel.api.Intel;
import com.intel.common.Error;
import com.intel.common.Error.Code;
import com.intel.common.Settings.Environment;
import com.intel.core.Callback;
import com.intel.core.auth.Auth.Action;

public class IntelSDKPlugin extends org.apache.cordova.CordovaPlugin {

	private String clientId, secretId, scopes;

	private static final String LOGIN_ACTION = "login";
	private static final String INITIALIZE_ACTION = "init";

	public boolean execute(String action, JSONArray data, CallbackContext callbackContext) {

		PluginResult status = null;

		if (action.equals(INITIALIZE_ACTION)) { // Init login
			try {
				clientId = data.getString(0);
				secretId = data.getString(1);
				scopes = data.getString(2);

				status = new PluginResult(Status.OK);
			} catch (JSONException e) {
				status = new PluginResult(Status.ERROR);
			}
		} else if (action.equals(LOGIN_ACTION) && clientId != null
				&& secretId != null) {
			// Login
			login();
		}

		callbackContext.sendPluginResult(status);
		return ((status.getStatus() == Status.OK.ordinal()) ? true : false);
	}

	public void login() {
		if (!Intel.auth.isLoggedIn(cordova.getActivity()
				.getApplicationContext())) {
			// Control scopes
			if (scopes == null || scopes == "null") {
				scopes = "user:details user:scope profile:full profile:basic profile:full:write location:basic location:enhanced context:developer-specific context:location:detailed context:post:location:detailed context:geolocation:detailed context:time:detailed context:device:applications:running context:post:device:applications:running context:device:telephony context:post:device:telephony context:device:calendar context:post:device:calendar context:device:status:battery context:post:device:status:battery context:media:consumption context:post:media:consumption";
			}

			Intel.auth.login(cordova.getActivity().getApplicationContext(),
					Environment.PROD, "en-us", clientId, secretId, scopes,
					null, "http://oauth2callback", Action.SIGN_IN,
					new Callback() {
						public void onFail(Error arg0) {
							if (arg0.getCode().equals(Code.SERVICE_UNAVAILABLE)) {
								Toast.makeText(
										cordova.getActivity()
												.getApplicationContext(),
										"Login Error: Identity Service unavailable, check Internet connection",
										Toast.LENGTH_LONG).show();
							} else {
								Toast.makeText(
										cordova.getActivity()
												.getApplicationContext(),
										"Login Error: " + arg0.getDescription(),
										Toast.LENGTH_LONG).show();
							}
						}

						public void onSuccess(Object arg0) {
							Toast.makeText(
									cordova.getActivity()
											.getApplicationContext(),
									"Login Success", Toast.LENGTH_SHORT).show();
						}
					});

			// Intel.auth
			// .login(cordova.getActivity().getApplicationContext(),
			// Environment.TEST,
			// "en-us",
			// "c3e1b870aff55ca3a3b89e83d846859e",
			// "b7458b1a2236f749",
			// "user:details user:scope profile:full profile:basic profile:full:write location:basic location:enhanced context:developer-specific context:location:detailed context:post:location:detailed context:geolocation:detailed context:time:detailed context:device:applications:running context:post:device:applications:running context:device:telephony context:post:device:telephony context:device:calendar context:post:device:calendar context:device:status:battery context:post:device:status:battery context:media:consumption context:post:media:consumption",
			// null, "http://54.245.105.150/oauth2callback2.html",
			// Action.SIGN_IN, new Callback() {
			// public void onFail(Error arg0) {
			// if (arg0.getCode().equals(
			// Code.SERVICE_UNAVAILABLE)) {
			// Toast.makeText(
			// cordova.getActivity()
			// .getApplicationContext(),
			// "Login Error: Identity Service unavailable, check Internet connection",
			// Toast.LENGTH_LONG).show();
			// } else {
			// Toast.makeText(
			// cordova.getActivity()
			// .getApplicationContext(),
			// "Login Error: "
			// + arg0.getDescription(),
			// Toast.LENGTH_LONG).show();
			// }
			// Log.e("Debug",
			// "Login error, finishing Context Sensing...");
			// }
			//
			// public void onSuccess(Object arg0) {
			// Toast.makeText(
			// cordova.getActivity()
			// .getApplicationContext(),
			// "Login Success", Toast.LENGTH_SHORT)
			// .show();
			// Log.i("DEBUG",
			// "Login success, launching Context Sensing...");
			// }
			// });
		}
	}
}