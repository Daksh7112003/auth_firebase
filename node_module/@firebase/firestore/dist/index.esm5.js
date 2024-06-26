import { __extends as t, __awaiter as e, __generator as n, __spreadArray as r } from "tslib";

import { SDK_VERSION as i, _registerComponent as o, registerVersion as a, _getProvider, getApp as u, _removeServiceInstance as s } from "@firebase/app";

import { Component as c } from "@firebase/component";

import { Logger as l, LogLevel as h } from "@firebase/logger";

import { FirebaseError as f, getUA as d, isSafari as p, deepEqual as v, getModularInstance as m, isIndexedDBAvailable as y, createMockUserToken as g, getDefaultEmulatorHostnameAndPort as w } from "@firebase/util";

import { Integer as b, XhrIo as I, EventType as _, ErrorCode as E, createWebChannelTransport as T, getStatEventTarget as S, WebChannel as x, Event as C, Stat as D, Md5 as N } from "@firebase/webchannel-wrapper";

var A = "@firebase/firestore", k = /** @class */ function() {
    function t(t) {
        this.uid = t;
    }
    return t.prototype.isAuthenticated = function() {
        return null != this.uid;
    }, 
    /**
     * Returns a key representing this user, suitable for inclusion in a
     * dictionary.
     */
    t.prototype.toKey = function() {
        return this.isAuthenticated() ? "uid:" + this.uid : "anonymous-user";
    }, t.prototype.isEqual = function(t) {
        return t.uid === this.uid;
    }, t;
}();

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Simple wrapper around a nullable UID. Mostly exists to make code more
 * readable.
 */
/** A user with a null UID. */ k.UNAUTHENTICATED = new k(null), 
// TODO(mikelehen): Look into getting a proper uid-equivalent for
// non-FirebaseAuth providers.
k.GOOGLE_CREDENTIALS = new k("google-credentials-uid"), k.FIRST_PARTY = new k("first-party-uid"), 
k.MOCK_USER = new k("mock-user");

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var P = "10.11.0", O = new l("@firebase/firestore");

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// Helper methods are needed because variables can't be exported as read/write
function R() {
    return O.logLevel;
}

/**
 * Sets the verbosity of Cloud Firestore logs (debug, error, or silent).
 *
 * @param logLevel - The verbosity you set for activity and error logging. Can
 *   be any of the following values:
 *
 *   <ul>
 *     <li>`debug` for the most verbose logging level, primarily for
 *     debugging.</li>
 *     <li>`error` to log errors only.</li>
 *     <li><code>`silent` to turn off logging.</li>
 *   </ul>
 */ function M(t) {
    O.setLogLevel(t);
}

function F(t) {
    for (var e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
    if (O.logLevel <= h.DEBUG) {
        var i = e.map(q);
        O.debug.apply(O, r([ "Firestore (".concat(P, "): ").concat(t) ], i, !1));
    }
}

function V(t) {
    for (var e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
    if (O.logLevel <= h.ERROR) {
        var i = e.map(q);
        O.error.apply(O, r([ "Firestore (".concat(P, "): ").concat(t) ], i, !1));
    }
}

/**
 * @internal
 */ function L(t) {
    for (var e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
    if (O.logLevel <= h.WARN) {
        var i = e.map(q);
        O.warn.apply(O, r([ "Firestore (".concat(P, "): ").concat(t) ], i, !1));
    }
}

/**
 * Converts an additional log parameter to a string representation.
 */ function q(t) {
    if ("string" == typeof t) return t;
    try {
        /**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
        /** Formats an object as a JSON string, suitable for logging. */
        return function(t) {
            return JSON.stringify(t);
        }(t);
    } catch (e) {
        // Converting to JSON failed, just log the object directly
        return t;
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Unconditionally fails, throwing an Error with the given message.
 * Messages are stripped in production builds.
 *
 * Returns `never` and can be used in expressions:
 * @example
 * let futureVar = fail('not implemented yet');
 */ function U(t) {
    void 0 === t && (t = "Unexpected state");
    // Log the failure in addition to throw an exception, just in case the
    // exception is swallowed.
        var e = "FIRESTORE (".concat(P, ") INTERNAL ASSERTION FAILED: ") + t;
    // NOTE: We don't use FirestoreError here because these are internal failures
    // that cannot be handled by the user. (Also it would create a circular
    // dependency between the error and assert modules which doesn't work.)
        throw V(e), new Error(e)
    /**
 * Fails if the given assertion condition is false, throwing an Error with the
 * given message if it did.
 *
 * Messages are stripped in production builds.
 */;
}

function B(t, e) {
    t || U();
}

/**
 * Fails if the given assertion condition is false, throwing an Error with the
 * given message if it did.
 *
 * The code of callsites invoking this function are stripped out in production
 * builds. Any side-effects of code within the debugAssert() invocation will not
 * happen in this case.
 *
 * @internal
 */ function z(t, e) {
    t || U();
}

/**
 * Casts `obj` to `T`. In non-production builds, verifies that `obj` is an
 * instance of `T` before casting.
 */ function G(t, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
e) {
    return t;
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var K = {
    // Causes are copied from:
    // https://github.com/grpc/grpc/blob/bceec94ea4fc5f0085d81235d8e1c06798dc341a/include/grpc%2B%2B/impl/codegen/status_code_enum.h
    /** Not an error; returned on success. */
    OK: "ok",
    /** The operation was cancelled (typically by the caller). */
    CANCELLED: "cancelled",
    /** Unknown error or an error from a different error domain. */
    UNKNOWN: "unknown",
    /**
     * Client specified an invalid argument. Note that this differs from
     * FAILED_PRECONDITION. INVALID_ARGUMENT indicates arguments that are
     * problematic regardless of the state of the system (e.g., a malformed file
     * name).
     */
    INVALID_ARGUMENT: "invalid-argument",
    /**
     * Deadline expired before operation could complete. For operations that
     * change the state of the system, this error may be returned even if the
     * operation has completed successfully. For example, a successful response
     * from a server could have been delayed long enough for the deadline to
     * expire.
     */
    DEADLINE_EXCEEDED: "deadline-exceeded",
    /** Some requested entity (e.g., file or directory) was not found. */
    NOT_FOUND: "not-found",
    /**
     * Some entity that we attempted to create (e.g., file or directory) already
     * exists.
     */
    ALREADY_EXISTS: "already-exists",
    /**
     * The caller does not have permission to execute the specified operation.
     * PERMISSION_DENIED must not be used for rejections caused by exhausting
     * some resource (use RESOURCE_EXHAUSTED instead for those errors).
     * PERMISSION_DENIED must not be used if the caller can not be identified
     * (use UNAUTHENTICATED instead for those errors).
     */
    PERMISSION_DENIED: "permission-denied",
    /**
     * The request does not have valid authentication credentials for the
     * operation.
     */
    UNAUTHENTICATED: "unauthenticated",
    /**
     * Some resource has been exhausted, perhaps a per-user quota, or perhaps the
     * entire file system is out of space.
     */
    RESOURCE_EXHAUSTED: "resource-exhausted",
    /**
     * Operation was rejected because the system is not in a state required for
     * the operation's execution. For example, directory to be deleted may be
     * non-empty, an rmdir operation is applied to a non-directory, etc.
     *
     * A litmus test that may help a service implementor in deciding
     * between FAILED_PRECONDITION, ABORTED, and UNAVAILABLE:
     *  (a) Use UNAVAILABLE if the client can retry just the failing call.
     *  (b) Use ABORTED if the client should retry at a higher-level
     *      (e.g., restarting a read-modify-write sequence).
     *  (c) Use FAILED_PRECONDITION if the client should not retry until
     *      the system state has been explicitly fixed. E.g., if an "rmdir"
     *      fails because the directory is non-empty, FAILED_PRECONDITION
     *      should be returned since the client should not retry unless
     *      they have first fixed up the directory by deleting files from it.
     *  (d) Use FAILED_PRECONDITION if the client performs conditional
     *      REST Get/Update/Delete on a resource and the resource on the
     *      server does not match the condition. E.g., conflicting
     *      read-modify-write on the same resource.
     */
    FAILED_PRECONDITION: "failed-precondition",
    /**
     * The operation was aborted, typically due to a concurrency issue like
     * sequencer check failures, transaction aborts, etc.
     *
     * See litmus test above for deciding between FAILED_PRECONDITION, ABORTED,
     * and UNAVAILABLE.
     */
    ABORTED: "aborted",
    /**
     * Operation was attempted past the valid range. E.g., seeking or reading
     * past end of file.
     *
     * Unlike INVALID_ARGUMENT, this error indicates a problem that may be fixed
     * if the system state changes. For example, a 32-bit file system will
     * generate INVALID_ARGUMENT if asked to read at an offset that is not in the
     * range [0,2^32-1], but it will generate OUT_OF_RANGE if asked to read from
     * an offset past the current file size.
     *
     * There is a fair bit of overlap between FAILED_PRECONDITION and
     * OUT_OF_RANGE. We recommend using OUT_OF_RANGE (the more specific error)
     * when it applies so that callers who are iterating through a space can
     * easily look for an OUT_OF_RANGE error to detect when they are done.
     */
    OUT_OF_RANGE: "out-of-range",
    /** Operation is not implemented or not supported/enabled in this service. */
    UNIMPLEMENTED: "unimplemented",
    /**
     * Internal errors. Means some invariants expected by underlying System has
     * been broken. If you see one of these errors, Something is very broken.
     */
    INTERNAL: "internal",
    /**
     * The service is currently unavailable. This is a most likely a transient
     * condition and may be corrected by retrying with a backoff.
     *
     * See litmus test above for deciding between FAILED_PRECONDITION, ABORTED,
     * and UNAVAILABLE.
     */
    UNAVAILABLE: "unavailable",
    /** Unrecoverable data loss or corruption. */
    DATA_LOSS: "data-loss"
}, j = /** @class */ function(e) {
    /** @hideconstructor */
    function n(
    /**
     * The backend error code associated with this error.
     */
    t, 
    /**
     * A custom error description.
     */
    n) {
        var r = this;
        return (r = e.call(this, t, n) || this).code = t, r.message = n, 
        // HACK: We write a toString property directly because Error is not a real
        // class and so inheritance does not work correctly. We could alternatively
        // do the same "back-door inheritance" trick that FirebaseError does.
        r.toString = function() {
            return "".concat(r.name, ": [code=").concat(r.code, "]: ").concat(r.message);
        }, r;
    }
    return t(n, e), n;
}(f), Q = function() {
    var t = this;
    this.promise = new Promise((function(e, n) {
        t.resolve = e, t.reject = n;
    }));
}, W = function(t, e) {
    this.user = e, this.type = "OAuth", this.headers = new Map, this.headers.set("Authorization", "Bearer ".concat(t));
}, Y = /** @class */ function() {
    function t() {}
    return t.prototype.getToken = function() {
        return Promise.resolve(null);
    }, t.prototype.invalidateToken = function() {}, t.prototype.start = function(t, e) {
        // Fire with initial user.
        t.enqueueRetryable((function() {
            return e(k.UNAUTHENTICATED);
        }));
    }, t.prototype.shutdown = function() {}, t;
}(), H = /** @class */ function() {
    function t(t) {
        this.token = t, 
        /**
             * Stores the listener registered with setChangeListener()
             * This isn't actually necessary since the UID never changes, but we use this
             * to verify the listen contract is adhered to in tests.
             */
        this.changeListener = null;
    }
    return t.prototype.getToken = function() {
        return Promise.resolve(this.token);
    }, t.prototype.invalidateToken = function() {}, t.prototype.start = function(t, e) {
        var n = this;
        this.changeListener = e, 
        // Fire with initial user.
        t.enqueueRetryable((function() {
            return e(n.token.user);
        }));
    }, t.prototype.shutdown = function() {
        this.changeListener = null;
    }, t;
}(), J = /** @class */ function() {
    function t(t) {
        this.t = t, 
        /** Tracks the current User. */
        this.currentUser = k.UNAUTHENTICATED, 
        /**
             * Counter used to detect if the token changed while a getToken request was
             * outstanding.
             */
        this.i = 0, this.forceRefresh = !1, this.auth = null;
    }
    return t.prototype.start = function(t, r) {
        var i = this, o = this.i, a = function(t) {
            return i.i !== o ? (o = i.i, r(t)) : Promise.resolve();
        }, u = new Q;
        this.o = function() {
            i.i++, i.currentUser = i.u(), u.resolve(), u = new Q, t.enqueueRetryable((function() {
                return a(i.currentUser);
            }));
        };
        var s = function() {
            var r = u;
            t.enqueueRetryable((function() {
                return e(i, void 0, void 0, (function() {
                    return n(this, (function(t) {
                        switch (t.label) {
                          case 0:
                            return [ 4 /*yield*/ , r.promise ];

                          case 1:
                            return t.sent(), [ 4 /*yield*/ , a(this.currentUser) ];

                          case 2:
                            return t.sent(), [ 2 /*return*/ ];
                        }
                    }));
                }));
            }));
        }, c = function(t) {
            F("FirebaseAuthCredentialsProvider", "Auth detected"), i.auth = t, i.auth.addAuthTokenListener(i.o), 
            s();
        };
        this.t.onInit((function(t) {
            return c(t);
        })), 
        // Our users can initialize Auth right after Firestore, so we give it
        // a chance to register itself with the component framework before we
        // determine whether to start up in unauthenticated mode.
        setTimeout((function() {
            if (!i.auth) {
                var t = i.t.getImmediate({
                    optional: !0
                });
                t ? c(t) : (
                // If auth is still not available, proceed with `null` user
                F("FirebaseAuthCredentialsProvider", "Auth not yet detected"), u.resolve(), u = new Q);
            }
        }), 0), s();
    }, t.prototype.getToken = function() {
        var t = this, e = this.i, n = this.forceRefresh;
        // Take note of the current value of the tokenCounter so that this method
        // can fail (with an ABORTED error) if there is a token change while the
        // request is outstanding.
                return this.forceRefresh = !1, this.auth ? this.auth.getToken(n).then((function(n) {
            // Cancel the request since the token changed while the request was
            // outstanding so the response is potentially for a previous user (which
            // user, we can't be sure).
            return t.i !== e ? (F("FirebaseAuthCredentialsProvider", "getToken aborted due to token change."), 
            t.getToken()) : n ? (B("string" == typeof n.accessToken), new W(n.accessToken, t.currentUser)) : null;
        })) : Promise.resolve(null);
    }, t.prototype.invalidateToken = function() {
        this.forceRefresh = !0;
    }, t.prototype.shutdown = function() {
        this.auth && this.auth.removeAuthTokenListener(this.o);
    }, 
    // Auth.getUid() can return null even with a user logged in. It is because
    // getUid() is synchronous, but the auth code populating Uid is asynchronous.
    // This method should only be called in the AuthTokenListener callback
    // to guarantee to get the actual user.
    t.prototype.u = function() {
        var t = this.auth && this.auth.getUid();
        return B(null === t || "string" == typeof t), new k(t);
    }, t;
}(), X = /** @class */ function() {
    function t(t, e, n) {
        this.l = t, this.h = e, this.P = n, this.type = "FirstParty", this.user = k.FIRST_PARTY, 
        this.I = new Map
        /**
     * Gets an authorization token, using a provided factory function, or return
     * null.
     */;
    }
    return t.prototype.T = function() {
        return this.P ? this.P() : null;
    }, Object.defineProperty(t.prototype, "headers", {
        get: function() {
            this.I.set("X-Goog-AuthUser", this.l);
            // Use array notation to prevent minification
            var t = this.T();
            return t && this.I.set("Authorization", t), this.h && this.I.set("X-Goog-Iam-Authorization-Token", this.h), 
            this.I;
        },
        enumerable: !1,
        configurable: !0
    }), t;
}(), Z = /** @class */ function() {
    function t(t, e, n) {
        this.l = t, this.h = e, this.P = n;
    }
    return t.prototype.getToken = function() {
        return Promise.resolve(new X(this.l, this.h, this.P));
    }, t.prototype.start = function(t, e) {
        // Fire with initial uid.
        t.enqueueRetryable((function() {
            return e(k.FIRST_PARTY);
        }));
    }, t.prototype.shutdown = function() {}, t.prototype.invalidateToken = function() {}, 
    t;
}(), $ = function(t) {
    this.value = t, this.type = "AppCheck", this.headers = new Map, t && t.length > 0 && this.headers.set("x-firebase-appcheck", this.value);
}, tt = /** @class */ function() {
    function t(t) {
        this.A = t, this.forceRefresh = !1, this.appCheck = null, this.R = null;
    }
    return t.prototype.start = function(t, e) {
        var n = this, r = function(t) {
            null != t.error && F("FirebaseAppCheckTokenProvider", "Error getting App Check token; using placeholder token instead. Error: ".concat(t.error.message));
            var r = t.token !== n.R;
            return n.R = t.token, F("FirebaseAppCheckTokenProvider", "Received ".concat(r ? "new" : "existing", " token.")), 
            r ? e(t.token) : Promise.resolve();
        };
        this.o = function(e) {
            t.enqueueRetryable((function() {
                return r(e);
            }));
        };
        var i = function(t) {
            F("FirebaseAppCheckTokenProvider", "AppCheck detected"), n.appCheck = t, n.appCheck.addTokenListener(n.o);
        };
        this.A.onInit((function(t) {
            return i(t);
        })), 
        // Our users can initialize AppCheck after Firestore, so we give it
        // a chance to register itself with the component framework.
        setTimeout((function() {
            if (!n.appCheck) {
                var t = n.A.getImmediate({
                    optional: !0
                });
                t ? i(t) : 
                // If AppCheck is still not available, proceed without it.
                F("FirebaseAppCheckTokenProvider", "AppCheck not yet detected");
            }
        }), 0);
    }, t.prototype.getToken = function() {
        var t = this, e = this.forceRefresh;
        return this.forceRefresh = !1, this.appCheck ? this.appCheck.getToken(e).then((function(e) {
            return e ? (B("string" == typeof e.token), t.R = e.token, new $(e.token)) : null;
        })) : Promise.resolve(null);
    }, t.prototype.invalidateToken = function() {
        this.forceRefresh = !0;
    }, t.prototype.shutdown = function() {
        this.appCheck && this.appCheck.removeTokenListener(this.o);
    }, t;
}(), et = /** @class */ function() {
    function t() {}
    return t.prototype.getToken = function() {
        return Promise.resolve(new $(""));
    }, t.prototype.invalidateToken = function() {}, t.prototype.start = function(t, e) {}, 
    t.prototype.shutdown = function() {}, t;
}();

/** An error returned by a Firestore operation. */
/**
 * Builds a CredentialsProvider depending on the type of
 * the credentials passed in.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Generates `nBytes` of random bytes.
 *
 * If `nBytes < 0` , an error will be thrown.
 */
function nt(t) {
    // Polyfills for IE and WebWorker by using `self` and `msCrypto` when `crypto` is not available.
    var e = 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    "undefined" != typeof self && (self.crypto || self.msCrypto), n = new Uint8Array(t);
    if (e && "function" == typeof e.getRandomValues) e.getRandomValues(n); else 
    // Falls back to Math.random
    for (var r = 0; r < t; r++) n[r] = Math.floor(256 * Math.random());
    return n;
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A utility class for generating unique alphanumeric IDs of a specified length.
 *
 * @internal
 * Exported internally for testing purposes.
 */ var rt = /** @class */ function() {
    function t() {}
    return t.newId = function() {
        for (
        // Alphanumeric characters
        var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", e = Math.floor(256 / t.length) * t.length, n = ""
        // The largest byte value that is a multiple of `char.length`.
        ; n.length < 20; ) for (var r = nt(40), i = 0; i < r.length; ++i) 
        // Only accept values that are [0, maxMultiple), this ensures they can
        // be evenly mapped to indices of `chars` via a modulo operation.
        n.length < 20 && r[i] < e && (n += t.charAt(r[i] % t.length));
        return n;
    }, t;
}();

function it(t, e) {
    return t < e ? -1 : t > e ? 1 : 0;
}

/** Helper to compare arrays using isEqual(). */ function ot(t, e, n) {
    return t.length === e.length && t.every((function(t, r) {
        return n(t, e[r]);
    }));
}

/**
 * Returns the immediate lexicographically-following string. This is useful to
 * construct an inclusive range for indexeddb iterators.
 */ function at(t) {
    // Return the input string, with an additional NUL byte appended.
    return t + "\0";
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// The earliest date supported by Firestore timestamps (0001-01-01T00:00:00Z).
/**
 * A `Timestamp` represents a point in time independent of any time zone or
 * calendar, represented as seconds and fractions of seconds at nanosecond
 * resolution in UTC Epoch time.
 *
 * It is encoded using the Proleptic Gregorian Calendar which extends the
 * Gregorian calendar backwards to year one. It is encoded assuming all minutes
 * are 60 seconds long, i.e. leap seconds are "smeared" so that no leap second
 * table is needed for interpretation. Range is from 0001-01-01T00:00:00Z to
 * 9999-12-31T23:59:59.999999999Z.
 *
 * For examples and further specifications, refer to the
 * {@link https://github.com/google/protobuf/blob/master/src/google/protobuf/timestamp.proto | Timestamp definition}.
 */ var ut = /** @class */ function() {
    /**
     * Creates a new timestamp.
     *
     * @param seconds - The number of seconds of UTC time since Unix epoch
     *     1970-01-01T00:00:00Z. Must be from 0001-01-01T00:00:00Z to
     *     9999-12-31T23:59:59Z inclusive.
     * @param nanoseconds - The non-negative fractions of a second at nanosecond
     *     resolution. Negative second values with fractions must still have
     *     non-negative nanoseconds values that count forward in time. Must be
     *     from 0 to 999,999,999 inclusive.
     */
    function t(
    /**
     * The number of seconds of UTC time since Unix epoch 1970-01-01T00:00:00Z.
     */
    t, 
    /**
     * The fractions of a second at nanosecond resolution.*
     */
    e) {
        if (this.seconds = t, this.nanoseconds = e, e < 0) throw new j(K.INVALID_ARGUMENT, "Timestamp nanoseconds out of range: " + e);
        if (e >= 1e9) throw new j(K.INVALID_ARGUMENT, "Timestamp nanoseconds out of range: " + e);
        if (t < -62135596800) throw new j(K.INVALID_ARGUMENT, "Timestamp seconds out of range: " + t);
        // This will break in the year 10,000.
                if (t >= 253402300800) throw new j(K.INVALID_ARGUMENT, "Timestamp seconds out of range: " + t);
    }
    /**
     * Creates a new timestamp with the current date, with millisecond precision.
     *
     * @returns a new timestamp representing the current date.
     */    return t.now = function() {
        return t.fromMillis(Date.now());
    }, 
    /**
     * Creates a new timestamp from the given date.
     *
     * @param date - The date to initialize the `Timestamp` from.
     * @returns A new `Timestamp` representing the same point in time as the given
     *     date.
     */
    t.fromDate = function(e) {
        return t.fromMillis(e.getTime());
    }, 
    /**
     * Creates a new timestamp from the given number of milliseconds.
     *
     * @param milliseconds - Number of milliseconds since Unix epoch
     *     1970-01-01T00:00:00Z.
     * @returns A new `Timestamp` representing the same point in time as the given
     *     number of milliseconds.
     */
    t.fromMillis = function(e) {
        var n = Math.floor(e / 1e3);
        return new t(n, Math.floor(1e6 * (e - 1e3 * n)));
    }, 
    /**
     * Converts a `Timestamp` to a JavaScript `Date` object. This conversion
     * causes a loss of precision since `Date` objects only support millisecond
     * precision.
     *
     * @returns JavaScript `Date` object representing the same point in time as
     *     this `Timestamp`, with millisecond precision.
     */
    t.prototype.toDate = function() {
        return new Date(this.toMillis());
    }, 
    /**
     * Converts a `Timestamp` to a numeric timestamp (in milliseconds since
     * epoch). This operation causes a loss of precision.
     *
     * @returns The point in time corresponding to this timestamp, represented as
     *     the number of milliseconds since Unix epoch 1970-01-01T00:00:00Z.
     */
    t.prototype.toMillis = function() {
        return 1e3 * this.seconds + this.nanoseconds / 1e6;
    }, t.prototype._compareTo = function(t) {
        return this.seconds === t.seconds ? it(this.nanoseconds, t.nanoseconds) : it(this.seconds, t.seconds);
    }, 
    /**
     * Returns true if this `Timestamp` is equal to the provided one.
     *
     * @param other - The `Timestamp` to compare against.
     * @returns true if this `Timestamp` is equal to the provided one.
     */
    t.prototype.isEqual = function(t) {
        return t.seconds === this.seconds && t.nanoseconds === this.nanoseconds;
    }, 
    /** Returns a textual representation of this `Timestamp`. */ t.prototype.toString = function() {
        return "Timestamp(seconds=" + this.seconds + ", nanoseconds=" + this.nanoseconds + ")";
    }, 
    /** Returns a JSON-serializable representation of this `Timestamp`. */ t.prototype.toJSON = function() {
        return {
            seconds: this.seconds,
            nanoseconds: this.nanoseconds
        };
    }, 
    /**
     * Converts this object to a primitive string, which allows `Timestamp` objects
     * to be compared using the `>`, `<=`, `>=` and `>` operators.
     */
    t.prototype.valueOf = function() {
        // This method returns a string of the form <seconds>.<nanoseconds> where
        // <seconds> is translated to have a non-negative value and both <seconds>
        // and <nanoseconds> are left-padded with zeroes to be a consistent length.
        // Strings with this format then have a lexiographical ordering that matches
        // the expected ordering. The <seconds> translation is done to avoid having
        // a leading negative sign (i.e. a leading '-' character) in its string
        // representation, which would affect its lexiographical ordering.
        var t = this.seconds - -62135596800;
        // Note: Up to 12 decimal digits are required to represent all valid
        // 'seconds' values.
                return String(t).padStart(12, "0") + "." + String(this.nanoseconds).padStart(9, "0");
    }, t;
}(), st = /** @class */ function() {
    function t(t) {
        this.timestamp = t;
    }
    return t.fromTimestamp = function(e) {
        return new t(e);
    }, t.min = function() {
        return new t(new ut(0, 0));
    }, t.max = function() {
        return new t(new ut(253402300799, 999999999));
    }, t.prototype.compareTo = function(t) {
        return this.timestamp._compareTo(t.timestamp);
    }, t.prototype.isEqual = function(t) {
        return this.timestamp.isEqual(t.timestamp);
    }, 
    /** Returns a number representation of the version for use in spec tests. */ t.prototype.toMicroseconds = function() {
        // Convert to microseconds.
        return 1e6 * this.timestamp.seconds + this.timestamp.nanoseconds / 1e3;
    }, t.prototype.toString = function() {
        return "SnapshotVersion(" + this.timestamp.toString() + ")";
    }, t.prototype.toTimestamp = function() {
        return this.timestamp;
    }, t;
}(), ct = /** @class */ function() {
    function t(t, e, n) {
        void 0 === e ? e = 0 : e > t.length && U(), void 0 === n ? n = t.length - e : n > t.length - e && U(), 
        this.segments = t, this.offset = e, this.len = n;
    }
    return Object.defineProperty(t.prototype, "length", {
        get: function() {
            return this.len;
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype.isEqual = function(e) {
        return 0 === t.comparator(this, e);
    }, t.prototype.child = function(e) {
        var n = this.segments.slice(this.offset, this.limit());
        return e instanceof t ? e.forEach((function(t) {
            n.push(t);
        })) : n.push(e), this.construct(n);
    }, 
    /** The index of one past the last segment of the path. */ t.prototype.limit = function() {
        return this.offset + this.length;
    }, t.prototype.popFirst = function(t) {
        return t = void 0 === t ? 1 : t, this.construct(this.segments, this.offset + t, this.length - t);
    }, t.prototype.popLast = function() {
        return this.construct(this.segments, this.offset, this.length - 1);
    }, t.prototype.firstSegment = function() {
        return this.segments[this.offset];
    }, t.prototype.lastSegment = function() {
        return this.get(this.length - 1);
    }, t.prototype.get = function(t) {
        return this.segments[this.offset + t];
    }, t.prototype.isEmpty = function() {
        return 0 === this.length;
    }, t.prototype.isPrefixOf = function(t) {
        if (t.length < this.length) return !1;
        for (var e = 0; e < this.length; e++) if (this.get(e) !== t.get(e)) return !1;
        return !0;
    }, t.prototype.isImmediateParentOf = function(t) {
        if (this.length + 1 !== t.length) return !1;
        for (var e = 0; e < this.length; e++) if (this.get(e) !== t.get(e)) return !1;
        return !0;
    }, t.prototype.forEach = function(t) {
        for (var e = this.offset, n = this.limit(); e < n; e++) t(this.segments[e]);
    }, t.prototype.toArray = function() {
        return this.segments.slice(this.offset, this.limit());
    }, t.comparator = function(t, e) {
        for (var n = Math.min(t.length, e.length), r = 0; r < n; r++) {
            var i = t.get(r), o = e.get(r);
            if (i < o) return -1;
            if (i > o) return 1;
        }
        return t.length < e.length ? -1 : t.length > e.length ? 1 : 0;
    }, t;
}(), lt = /** @class */ function(e) {
    function n() {
        return null !== e && e.apply(this, arguments) || this;
    }
    return t(n, e), n.prototype.construct = function(t, e, r) {
        return new n(t, e, r);
    }, n.prototype.canonicalString = function() {
        // NOTE: The client is ignorant of any path segments containing escape
        // sequences (e.g. __id123__) and just passes them through raw (they exist
        // for legacy reasons and should not be used frequently).
        return this.toArray().join("/");
    }, n.prototype.toString = function() {
        return this.canonicalString();
    }, 
    /**
     * Returns a string representation of this path
     * where each path segment has been encoded with
     * `encodeURIComponent`.
     */
    n.prototype.toUriEncodedString = function() {
        return this.toArray().map(encodeURIComponent).join("/");
    }, 
    /**
     * Creates a resource path from the given slash-delimited string. If multiple
     * arguments are provided, all components are combined. Leading and trailing
     * slashes from all components are ignored.
     */
    n.fromString = function() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        // NOTE: The client is ignorant of any path segments containing escape
        // sequences (e.g. __id123__) and just passes them through raw (they exist
        // for legacy reasons and should not be used frequently).
                for (var r = [], i = 0, o = t; i < o.length; i++) {
            var a = o[i];
            if (a.indexOf("//") >= 0) throw new j(K.INVALID_ARGUMENT, "Invalid segment (".concat(a, "). Paths must not contain // in them."));
            // Strip leading and traling slashed.
                        r.push.apply(r, a.split("/").filter((function(t) {
                return t.length > 0;
            })));
        }
        return new n(r);
    }, n.emptyPath = function() {
        return new n([]);
    }, n;
}(ct), ht = /^[_a-zA-Z][_a-zA-Z0-9]*$/, ft = /** @class */ function(e) {
    function n() {
        return null !== e && e.apply(this, arguments) || this;
    }
    return t(n, e), n.prototype.construct = function(t, e, r) {
        return new n(t, e, r);
    }, 
    /**
     * Returns true if the string could be used as a segment in a field path
     * without escaping.
     */
    n.isValidIdentifier = function(t) {
        return ht.test(t);
    }, n.prototype.canonicalString = function() {
        return this.toArray().map((function(t) {
            return t = t.replace(/\\/g, "\\\\").replace(/`/g, "\\`"), n.isValidIdentifier(t) || (t = "`" + t + "`"), 
            t;
        })).join(".");
    }, n.prototype.toString = function() {
        return this.canonicalString();
    }, 
    /**
     * Returns true if this field references the key of a document.
     */
    n.prototype.isKeyField = function() {
        return 1 === this.length && "__name__" === this.get(0);
    }, 
    /**
     * The field designating the key of a document.
     */
    n.keyField = function() {
        return new n([ "__name__" ]);
    }, 
    /**
     * Parses a field string from the given server-formatted string.
     *
     * - Splitting the empty string is not allowed (for now at least).
     * - Empty segments within the string (e.g. if there are two consecutive
     *   separators) are not allowed.
     *
     * TODO(b/37244157): we should make this more strict. Right now, it allows
     * non-identifier path components, even if they aren't escaped.
     */
    n.fromServerFormat = function(t) {
        for (var e = [], r = "", i = 0, o = function() {
            if (0 === r.length) throw new j(K.INVALID_ARGUMENT, "Invalid field path (".concat(t, "). Paths must not be empty, begin with '.', end with '.', or contain '..'"));
            e.push(r), r = "";
        }, a = !1; i < t.length; ) {
            var u = t[i];
            if ("\\" === u) {
                if (i + 1 === t.length) throw new j(K.INVALID_ARGUMENT, "Path has trailing escape character: " + t);
                var s = t[i + 1];
                if ("\\" !== s && "." !== s && "`" !== s) throw new j(K.INVALID_ARGUMENT, "Path has invalid escape sequence: " + t);
                r += s, i += 2;
            } else "`" === u ? (a = !a, i++) : "." !== u || a ? (r += u, i++) : (o(), i++);
        }
        if (o(), a) throw new j(K.INVALID_ARGUMENT, "Unterminated ` in path: " + t);
        return new n(e);
    }, n.emptyPath = function() {
        return new n([]);
    }, n;
}(ct), dt = /** @class */ function() {
    function t(t) {
        this.path = t;
    }
    return t.fromPath = function(e) {
        return new t(lt.fromString(e));
    }, t.fromName = function(e) {
        return new t(lt.fromString(e).popFirst(5));
    }, t.empty = function() {
        return new t(lt.emptyPath());
    }, Object.defineProperty(t.prototype, "collectionGroup", {
        get: function() {
            return this.path.popLast().lastSegment();
        },
        enumerable: !1,
        configurable: !0
    }), 
    /** Returns true if the document is in the specified collectionId. */ t.prototype.hasCollectionId = function(t) {
        return this.path.length >= 2 && this.path.get(this.path.length - 2) === t;
    }, 
    /** Returns the collection group (i.e. the name of the parent collection) for this key. */ t.prototype.getCollectionGroup = function() {
        return this.path.get(this.path.length - 2);
    }, 
    /** Returns the fully qualified path to the parent collection. */ t.prototype.getCollectionPath = function() {
        return this.path.popLast();
    }, t.prototype.isEqual = function(t) {
        return null !== t && 0 === lt.comparator(this.path, t.path);
    }, t.prototype.toString = function() {
        return this.path.toString();
    }, t.comparator = function(t, e) {
        return lt.comparator(t.path, e.path);
    }, t.isDocumentKey = function(t) {
        return t.length % 2 == 0;
    }, 
    /**
     * Creates and returns a new document key with the given segments.
     *
     * @param segments - The segments of the path to the document
     * @returns A new instance of DocumentKey
     */
    t.fromSegments = function(e) {
        return new t(new lt(e.slice()));
    }, t;
}(), pt = function(
/**
     * The index ID. Returns -1 if the index ID is not available (e.g. the index
     * has not yet been persisted).
     */
t, 
/** The collection ID this index applies to. */
e, 
/** The field segments for this index. */
n, 
/** Shows how up-to-date the index is for the current user. */
r) {
    this.indexId = t, this.collectionGroup = e, this.fields = n, this.indexState = r;
};

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A version of a document in Firestore. This corresponds to the version
 * timestamp, such as update_time or read_time.
 */
/** An ID for an index that has not yet been added to persistence.  */
/** Returns the ArrayContains/ArrayContainsAny segment for this index. */
function vt(t) {
    return t.fields.find((function(t) {
        return 2 /* IndexKind.CONTAINS */ === t.kind;
    }));
}

/** Returns all directional (ascending/descending) segments for this index. */ function mt(t) {
    return t.fields.filter((function(t) {
        return 2 /* IndexKind.CONTAINS */ !== t.kind;
    }));
}

/**
 * Returns the order of the document key component for the given index.
 *
 * PORTING NOTE: This is only used in the Web IndexedDb implementation.
 */
/**
 * Compares indexes by collection group and segments. Ignores update time and
 * index ID.
 */ function yt(t, e) {
    var n = it(t.collectionGroup, e.collectionGroup);
    if (0 !== n) return n;
    for (var r = 0; r < Math.min(t.fields.length, e.fields.length); ++r) if (0 !== (n = wt(t.fields[r], e.fields[r]))) return n;
    return it(t.fields.length, e.fields.length);
}

/** Returns a debug representation of the field index */ pt.UNKNOWN_ID = -1;

/** An index component consisting of field path and index type.  */
var gt = function(
/** The field path of the component. */
t, 
/** The fields sorting order. */
e) {
    this.fieldPath = t, this.kind = e;
};

function wt(t, e) {
    var n = ft.comparator(t.fieldPath, e.fieldPath);
    return 0 !== n ? n : it(t.kind, e.kind);
}

/**
 * Stores the "high water mark" that indicates how updated the Index is for the
 * current user.
 */ var bt = /** @class */ function() {
    function t(
    /**
     * Indicates when the index was last updated (relative to other indexes).
     */
    t, 
    /** The the latest indexed read time, document and batch id. */
    e) {
        this.sequenceNumber = t, this.offset = e
        /** The state of an index that has not yet been backfilled. */;
    }
    return t.empty = function() {
        return new t(0, Et.min());
    }, t;
}();

/**
 * Creates an offset that matches all documents with a read time higher than
 * `readTime`.
 */ function It(t, e) {
    // We want to create an offset that matches all documents with a read time
    // greater than the provided read time. To do so, we technically need to
    // create an offset for `(readTime, MAX_DOCUMENT_KEY)`. While we could use
    // Unicode codepoints to generate MAX_DOCUMENT_KEY, it is much easier to use
    // `(readTime + 1, DocumentKey.empty())` since `> DocumentKey.empty()` matches
    // all valid document IDs.
    var n = t.toTimestamp().seconds, r = t.toTimestamp().nanoseconds + 1, i = st.fromTimestamp(1e9 === r ? new ut(n + 1, 0) : new ut(n, r));
    return new Et(i, dt.empty(), e);
}

/** Creates a new offset based on the provided document. */ function _t(t) {
    return new Et(t.readTime, t.key, -1);
}

/**
 * Stores the latest read time, document and batch ID that were processed for an
 * index.
 */ var Et = /** @class */ function() {
    function t(
    /**
     * The latest read time version that has been indexed by Firestore for this
     * field index.
     */
    t, 
    /**
     * The key of the last document that was indexed for this query. Use
     * `DocumentKey.empty()` if no document has been indexed.
     */
    e, 
    /*
     * The largest mutation batch id that's been processed by Firestore.
     */
    n) {
        this.readTime = t, this.documentKey = e, this.largestBatchId = n
        /** Returns an offset that sorts before all regular offsets. */;
    }
    return t.min = function() {
        return new t(st.min(), dt.empty(), -1);
    }, 
    /** Returns an offset that sorts after all regular offsets. */ t.max = function() {
        return new t(st.max(), dt.empty(), -1);
    }, t;
}();

function Tt(t, e) {
    var n = t.readTime.compareTo(e.readTime);
    return 0 !== n ? n : 0 !== (n = dt.comparator(t.documentKey, e.documentKey)) ? n : it(t.largestBatchId, e.largestBatchId);
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var St = "The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.", xt = /** @class */ function() {
    function t() {
        this.onCommittedListeners = [];
    }
    return t.prototype.addOnCommittedListener = function(t) {
        this.onCommittedListeners.push(t);
    }, t.prototype.raiseOnCommittedEvent = function() {
        this.onCommittedListeners.forEach((function(t) {
            return t();
        }));
    }, t;
}();

/**
 * A base class representing a persistence transaction, encapsulating both the
 * transaction's sequence numbers as well as a list of onCommitted listeners.
 *
 * When you call Persistence.runTransaction(), it will create a transaction and
 * pass it to your callback. You then pass it to any method that operates
 * on persistence.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Verifies the error thrown by a LocalStore operation. If a LocalStore
 * operation fails because the primary lease has been taken by another client,
 * we ignore the error (the persistence layer will immediately call
 * `applyPrimaryLease` to propagate the primary state change). All other errors
 * are re-thrown.
 *
 * @param err - An error returned by a LocalStore operation.
 * @returns A Promise that resolves after we recovered, or the original error.
 */
function Ct(t) {
    return e(this, void 0, void 0, (function() {
        return n(this, (function(e) {
            if (t.code !== K.FAILED_PRECONDITION || t.message !== St) throw t;
            return F("LocalStore", "Unexpectedly lost primary lease"), [ 2 /*return*/ ];
        }));
    }));
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * PersistencePromise is essentially a re-implementation of Promise except
 * it has a .next() method instead of .then() and .next() and .catch() callbacks
 * are executed synchronously when a PersistencePromise resolves rather than
 * asynchronously (Promise implementations use setImmediate() or similar).
 *
 * This is necessary to interoperate with IndexedDB which will automatically
 * commit transactions if control is returned to the event loop without
 * synchronously initiating another operation on the transaction.
 *
 * NOTE: .then() and .catch() only allow a single consumer, unlike normal
 * Promises.
 */ var Dt = /** @class */ function() {
    function t(t) {
        var e = this;
        // NOTE: next/catchCallback will always point to our own wrapper functions,
        // not the user's raw next() or catch() callbacks.
                this.nextCallback = null, this.catchCallback = null, 
        // When the operation resolves, we'll set result or error and mark isDone.
        this.result = void 0, this.error = void 0, this.isDone = !1, 
        // Set to true when .then() or .catch() are called and prevents additional
        // chaining.
        this.callbackAttached = !1, t((function(t) {
            e.isDone = !0, e.result = t, e.nextCallback && 
            // value should be defined unless T is Void, but we can't express
            // that in the type system.
            e.nextCallback(t);
        }), (function(t) {
            e.isDone = !0, e.error = t, e.catchCallback && e.catchCallback(t);
        }));
    }
    return t.prototype.catch = function(t) {
        return this.next(void 0, t);
    }, t.prototype.next = function(e, n) {
        var r = this;
        return this.callbackAttached && U(), this.callbackAttached = !0, this.isDone ? this.error ? this.wrapFailure(n, this.error) : this.wrapSuccess(e, this.result) : new t((function(t, i) {
            r.nextCallback = function(n) {
                r.wrapSuccess(e, n).next(t, i);
            }, r.catchCallback = function(e) {
                r.wrapFailure(n, e).next(t, i);
            };
        }));
    }, t.prototype.toPromise = function() {
        var t = this;
        return new Promise((function(e, n) {
            t.next(e, n);
        }));
    }, t.prototype.wrapUserFunction = function(e) {
        try {
            var n = e();
            return n instanceof t ? n : t.resolve(n);
        } catch (e) {
            return t.reject(e);
        }
    }, t.prototype.wrapSuccess = function(e, n) {
        return e ? this.wrapUserFunction((function() {
            return e(n);
        })) : t.resolve(n);
    }, t.prototype.wrapFailure = function(e, n) {
        return e ? this.wrapUserFunction((function() {
            return e(n);
        })) : t.reject(n);
    }, t.resolve = function(e) {
        return new t((function(t, n) {
            t(e);
        }));
    }, t.reject = function(e) {
        return new t((function(t, n) {
            n(e);
        }));
    }, t.waitFor = function(
    // Accept all Promise types in waitFor().
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    e) {
        return new t((function(t, n) {
            var r = 0, i = 0, o = !1;
            e.forEach((function(e) {
                ++r, e.next((function() {
                    ++i, o && i === r && t();
                }), (function(t) {
                    return n(t);
                }));
            })), o = !0, i === r && t();
        }));
    }, 
    /**
     * Given an array of predicate functions that asynchronously evaluate to a
     * boolean, implements a short-circuiting `or` between the results. Predicates
     * will be evaluated until one of them returns `true`, then stop. The final
     * result will be whether any of them returned `true`.
     */
    t.or = function(e) {
        for (var n = t.resolve(!1), r = function(e) {
            n = n.next((function(n) {
                return n ? t.resolve(n) : e();
            }));
        }, i = 0, o = e; i < o.length; i++) {
            r(o[i]);
        }
        return n;
    }, t.forEach = function(t, e) {
        var n = this, r = [];
        return t.forEach((function(t, i) {
            r.push(e.call(n, t, i));
        })), this.waitFor(r);
    }, 
    /**
     * Concurrently map all array elements through asynchronous function.
     */
    t.mapArray = function(e, n) {
        return new t((function(t, r) {
            for (var i = e.length, o = new Array(i), a = 0, u = function(u) {
                var s = u;
                n(e[s]).next((function(e) {
                    o[s] = e, ++a === i && t(o);
                }), (function(t) {
                    return r(t);
                }));
            }, s = 0; s < i; s++) u(s);
        }));
    }, 
    /**
     * An alternative to recursive PersistencePromise calls, that avoids
     * potential memory problems from unbounded chains of promises.
     *
     * The `action` will be called repeatedly while `condition` is true.
     */
    t.doWhile = function(e, n) {
        return new t((function(t, r) {
            var i = function() {
                !0 === e() ? n().next((function() {
                    i();
                }), r) : t();
            };
            i();
        }));
    }, t;
}(), Nt = /** @class */ function() {
    function t(t, e) {
        var n = this;
        this.action = t, this.transaction = e, this.aborted = !1, 
        /**
             * A `Promise` that resolves with the result of the IndexedDb transaction.
             */
        this.V = new Q, this.transaction.oncomplete = function() {
            n.V.resolve();
        }, this.transaction.onabort = function() {
            e.error ? n.V.reject(new Pt(t, e.error)) : n.V.resolve();
        }, this.transaction.onerror = function(e) {
            var r = Vt(e.target.error);
            n.V.reject(new Pt(t, r));
        };
    }
    return t.open = function(e, n, r, i) {
        try {
            return new t(n, e.transaction(i, r));
        } catch (e) {
            throw new Pt(n, e);
        }
    }, Object.defineProperty(t.prototype, "m", {
        get: function() {
            return this.V.promise;
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype.abort = function(t) {
        t && this.V.reject(t), this.aborted || (F("SimpleDb", "Aborting transaction:", t ? t.message : "Client-initiated abort"), 
        this.aborted = !0, this.transaction.abort());
    }, t.prototype.g = function() {
        // If the browser supports V3 IndexedDB, we invoke commit() explicitly to
        // speed up index DB processing if the event loop remains blocks.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var t = this.transaction;
        this.aborted || "function" != typeof t.commit || t.commit();
    }, 
    /**
     * Returns a SimpleDbStore<KeyType, ValueType> for the specified store. All
     * operations performed on the SimpleDbStore happen within the context of this
     * transaction and it cannot be used anymore once the transaction is
     * completed.
     *
     * Note that we can't actually enforce that the KeyType and ValueType are
     * correct, but they allow type safety through the rest of the consuming code.
     */
    t.prototype.store = function(t) {
        var e = this.transaction.objectStore(t);
        return new Rt(e);
    }, t;
}(), At = /** @class */ function() {
    /*
     * Creates a new SimpleDb wrapper for IndexedDb database `name`.
     *
     * Note that `version` must not be a downgrade. IndexedDB does not support
     * downgrading the schema version. We currently do not support any way to do
     * versioning outside of IndexedDB's versioning mechanism, as only
     * version-upgrade transactions are allowed to do things like create
     * objectstores.
     */
    function t(e, n, r) {
        this.name = e, this.version = n, this.p = r, 
        // NOTE: According to https://bugs.webkit.org/show_bug.cgi?id=197050, the
        // bug we're checking for should exist in iOS >= 12.2 and < 13, but for
        // whatever reason it's much harder to hit after 12.2 so we only proactively
        // log on 12.2.
        12.2 === t.S(d()) && V("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.");
    }
    /** Deletes the specified database. */    return t.delete = function(t) {
        return F("SimpleDb", "Removing database:", t), Mt(window.indexedDB.deleteDatabase(t)).toPromise();
    }, 
    /** Returns true if IndexedDB is available in the current environment. */ t.D = function() {
        if (!y()) return !1;
        if (t.C()) return !0;
        // We extensively use indexed array values and compound keys,
        // which IE and Edge do not support. However, they still have indexedDB
        // defined on the window, so we need to check for them here and make sure
        // to return that persistence is not enabled for those browsers.
        // For tracking support of this feature, see here:
        // https://developer.microsoft.com/en-us/microsoft-edge/platform/status/indexeddbarraysandmultientrysupport/
        // Check the UA string to find out the browser.
                var e = d(), n = t.S(e), r = 0 < n && n < 10, i = t.v(e), o = 0 < i && i < 4.5;
        // IE 10
        // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';
        // IE 11
        // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';
        // Edge
        // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML,
        // like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';
        // iOS Safari: Disable for users running iOS version < 10.
                return !(e.indexOf("MSIE ") > 0 || e.indexOf("Trident/") > 0 || e.indexOf("Edge/") > 0 || r || o);
    }, 
    /**
     * Returns true if the backing IndexedDB store is the Node IndexedDBShim
     * (see https://github.com/axemclion/IndexedDBShim).
     */
    t.C = function() {
        var t;
        return "undefined" != typeof process && "YES" === (null === (t = process.__PRIVATE_env) || void 0 === t ? void 0 : t.F);
    }, 
    /** Helper to get a typed SimpleDbStore from a transaction. */ t.M = function(t, e) {
        return t.store(e);
    }, 
    // visible for testing
    /** Parse User Agent to determine iOS version. Returns -1 if not found. */
    t.S = function(t) {
        var e = t.match(/i(?:phone|pad|pod) os ([\d_]+)/i), n = e ? e[1].split("_").slice(0, 2).join(".") : "-1";
        return Number(n);
    }, 
    // visible for testing
    /** Parse User Agent to determine Android version. Returns -1 if not found. */
    t.v = function(t) {
        var e = t.match(/Android ([\d.]+)/i), n = e ? e[1].split(".").slice(0, 2).join(".") : "-1";
        return Number(n);
    }, 
    /**
     * Opens the specified database, creating or upgrading it if necessary.
     */
    t.prototype.O = function(t) {
        return e(this, void 0, void 0, (function() {
            var e, r = this;
            return n(this, (function(n) {
                switch (n.label) {
                  case 0:
                    return this.db ? [ 3 /*break*/ , 2 ] : (F("SimpleDb", "Opening database:", this.name), 
                    e = this, [ 4 /*yield*/ , new Promise((function(e, n) {
                        // TODO(mikelehen): Investigate browser compatibility.
                        // https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB
                        // suggests IE9 and older WebKit browsers handle upgrade
                        // differently. They expect setVersion, as described here:
                        // https://developer.mozilla.org/en-US/docs/Web/API/IDBVersionChangeRequest/setVersion
                        var i = indexedDB.open(r.name, r.version);
                        i.onsuccess = function(t) {
                            var n = t.target.result;
                            e(n);
                        }, i.onblocked = function() {
                            n(new Pt(t, "Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."));
                        }, i.onerror = function(e) {
                            var r = e.target.error;
                            "VersionError" === r.name ? n(new j(K.FAILED_PRECONDITION, "A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")) : "InvalidStateError" === r.name ? n(new j(K.FAILED_PRECONDITION, "Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: " + r)) : n(new Pt(t, r));
                        }, i.onupgradeneeded = function(t) {
                            F("SimpleDb", 'Database "' + r.name + '" requires upgrade from version:', t.oldVersion);
                            var e = t.target.result;
                            r.p.N(e, i.transaction, t.oldVersion, r.version).next((function() {
                                F("SimpleDb", "Database upgrade to version " + r.version + " complete");
                            }));
                        };
                    })) ]);

                  case 1:
                    e.db = n.sent(), n.label = 2;

                  case 2:
                    return [ 2 /*return*/ , (this.L && (this.db.onversionchange = function(t) {
                        return r.L(t);
                    }), this.db) ];
                }
            }));
        }));
    }, t.prototype.B = function(t) {
        this.L = t, this.db && (this.db.onversionchange = function(e) {
            return t(e);
        });
    }, t.prototype.runTransaction = function(t, r, i, o) {
        return e(this, void 0, void 0, (function() {
            var e, a, u, s, c;
            return n(this, (function(l) {
                switch (l.label) {
                  case 0:
                    e = "readonly" === r, a = 0, u = function() {
                        var r, u, c, l, h, f;
                        return n(this, (function(n) {
                            switch (n.label) {
                              case 0:
                                ++a, n.label = 1;

                              case 1:
                                return n.trys.push([ 1, 4, , 5 ]), [ 4 /*yield*/ , s.O(t) ];

                              case 2:
                                // Wait for the transaction to complete (i.e. IndexedDb's onsuccess event to
                                // fire), but still return the original transactionFnResult back to the
                                // caller.
                                return s.db = n.sent(), r = Nt.open(s.db, t, e ? "readonly" : "readwrite", i), u = o(r).next((function(t) {
                                    return r.g(), t;
                                })).catch((function(t) {
                                    // Abort the transaction if there was an error.
                                    return r.abort(t), Dt.reject(t);
                                })).toPromise(), c = {}, u.catch((function() {})), [ 4 /*yield*/ , r.m ];

                              case 3:
                                return [ 2 /*return*/ , (c.value = (
                                // Wait for the transaction to complete (i.e. IndexedDb's onsuccess event to
                                // fire), but still return the original transactionFnResult back to the
                                // caller.
                                n.sent(), u), c) ];

                              case 4:
                                // TODO(schmidt-sebastian): We could probably be smarter about this and
                                // not retry exceptions that are likely unrecoverable (such as quota
                                // exceeded errors).
                                // Note: We cannot use an instanceof check for FirestoreException, since the
                                // exception is wrapped in a generic error by our async/await handling.
                                return l = n.sent(), f = "FirebaseError" !== (h = l).name && a < 3, F("SimpleDb", "Transaction failed with error:", h.message, "Retrying:", f), 
                                s.close(), f ? [ 3 /*break*/ , 5 ] : [ 2 /*return*/ , {
                                    value: Promise.reject(h)
                                } ];

                              case 5:
                                return [ 2 /*return*/ ];
                            }
                        }));
                    }, s = this, l.label = 1;

                  case 1:
                    return [ 5 /*yield**/ , u() ];

                  case 2:
                    if ("object" == typeof (c = l.sent())) return [ 2 /*return*/ , c.value ];
                    l.label = 3;

                  case 3:
                    return [ 3 /*break*/ , 1 ];

                  case 4:
                    return [ 2 /*return*/ ];
                }
            }));
        }));
    }, t.prototype.close = function() {
        this.db && this.db.close(), this.db = void 0;
    }, t;
}(), kt = /** @class */ function() {
    function t(t) {
        this.k = t, this.q = !1, this.K = null;
    }
    return Object.defineProperty(t.prototype, "isDone", {
        get: function() {
            return this.q;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "$", {
        get: function() {
            return this.K;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "cursor", {
        set: function(t) {
            this.k = t;
        },
        enumerable: !1,
        configurable: !0
    }), 
    /**
     * This function can be called to stop iteration at any point.
     */
    t.prototype.done = function() {
        this.q = !0;
    }, 
    /**
     * This function can be called to skip to that next key, which could be
     * an index or a primary key.
     */
    t.prototype.U = function(t) {
        this.K = t;
    }, 
    /**
     * Delete the current cursor value from the object store.
     *
     * NOTE: You CANNOT do this with a keysOnly query.
     */
    t.prototype.delete = function() {
        return Mt(this.k.delete());
    }, t;
}(), Pt = /** @class */ function(e) {
    function n(t, n) {
        var r = this;
        return (r = e.call(this, K.UNAVAILABLE, "IndexedDB transaction '".concat(t, "' failed: ").concat(n)) || this).name = "IndexedDbTransactionError", 
        r;
    }
    return t(n, e), n;
}(j);

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// References to `window` are guarded by SimpleDb.isAvailable()
/* eslint-disable no-restricted-globals */
/**
 * Wraps an IDBTransaction and exposes a store() method to get a handle to a
 * specific object store.
 */
/** Verifies whether `e` is an IndexedDbTransactionError. */ function Ot(t) {
    // Use name equality, as instanceof checks on errors don't work with errors
    // that wrap other errors.
    return "IndexedDbTransactionError" === t.name;
}

/**
 * A wrapper around an IDBObjectStore providing an API that:
 *
 * 1) Has generic KeyType / ValueType parameters to provide strongly-typed
 * methods for acting against the object store.
 * 2) Deals with IndexedDB's onsuccess / onerror event callbacks, making every
 * method return a PersistencePromise instead.
 * 3) Provides a higher-level API to avoid needing to do excessive wrapping of
 * intermediate IndexedDB types (IDBCursorWithValue, etc.)
 */ var Rt = /** @class */ function() {
    function t(t) {
        this.store = t;
    }
    return t.prototype.put = function(t, e) {
        var n;
        return void 0 !== e ? (F("SimpleDb", "PUT", this.store.name, t, e), n = this.store.put(e, t)) : (F("SimpleDb", "PUT", this.store.name, "<auto-key>", t), 
        n = this.store.put(t)), Mt(n);
    }, 
    /**
     * Adds a new value into an Object Store and returns the new key. Similar to
     * IndexedDb's `add()`, this method will fail on primary key collisions.
     *
     * @param value - The object to write.
     * @returns The key of the value to add.
     */
    t.prototype.add = function(t) {
        return F("SimpleDb", "ADD", this.store.name, t, t), Mt(this.store.add(t));
    }, 
    /**
     * Gets the object with the specified key from the specified store, or null
     * if no object exists with the specified key.
     *
     * @key The key of the object to get.
     * @returns The object with the specified key or null if no object exists.
     */
    t.prototype.get = function(t) {
        var e = this;
        // We're doing an unsafe cast to ValueType.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                return Mt(this.store.get(t)).next((function(n) {
            // Normalize nonexistence to null.
            return void 0 === n && (n = null), F("SimpleDb", "GET", e.store.name, t, n), n;
        }));
    }, t.prototype.delete = function(t) {
        return F("SimpleDb", "DELETE", this.store.name, t), Mt(this.store.delete(t));
    }, 
    /**
     * If we ever need more of the count variants, we can add overloads. For now,
     * all we need is to count everything in a store.
     *
     * Returns the number of rows in the store.
     */
    t.prototype.count = function() {
        return F("SimpleDb", "COUNT", this.store.name), Mt(this.store.count());
    }, t.prototype.W = function(t, e) {
        var n = this.options(t, e), r = n.index ? this.store.index(n.index) : this.store;
        // Use `getAll()` if the browser supports IndexedDB v3, as it is roughly
        // 20% faster.
                if ("function" == typeof r.getAll) {
            var i = r.getAll(n.range);
            return new Dt((function(t, e) {
                i.onerror = function(t) {
                    e(t.target.error);
                }, i.onsuccess = function(e) {
                    t(e.target.result);
                };
            }));
        }
        var o = this.cursor(n), a = [];
        return this.G(o, (function(t, e) {
            a.push(e);
        })).next((function() {
            return a;
        }));
    }, 
    /**
     * Loads the first `count` elements from the provided index range. Loads all
     * elements if no limit is provided.
     */
    t.prototype.j = function(t, e) {
        var n = this.store.getAll(t, null === e ? void 0 : e);
        return new Dt((function(t, e) {
            n.onerror = function(t) {
                e(t.target.error);
            }, n.onsuccess = function(e) {
                t(e.target.result);
            };
        }));
    }, t.prototype.H = function(t, e) {
        F("SimpleDb", "DELETE ALL", this.store.name);
        var n = this.options(t, e);
        n.J = !1;
        var r = this.cursor(n);
        return this.G(r, (function(t, e, n) {
            return n.delete();
        }));
    }, t.prototype.Y = function(t, e) {
        var n;
        e ? n = t : (n = {}, e = t);
        var r = this.cursor(n);
        return this.G(r, e);
    }, 
    /**
     * Iterates over a store, but waits for the given callback to complete for
     * each entry before iterating the next entry. This allows the callback to do
     * asynchronous work to determine if this iteration should continue.
     *
     * The provided callback should return `true` to continue iteration, and
     * `false` otherwise.
     */
    t.prototype.Z = function(t) {
        var e = this.cursor({});
        return new Dt((function(n, r) {
            e.onerror = function(t) {
                var e = Vt(t.target.error);
                r(e);
            }, e.onsuccess = function(e) {
                var r = e.target.result;
                r ? t(r.primaryKey, r.value).next((function(t) {
                    t ? r.continue() : n();
                })) : n();
            };
        }));
    }, t.prototype.G = function(t, e) {
        var n = [];
        return new Dt((function(r, i) {
            t.onerror = function(t) {
                i(t.target.error);
            }, t.onsuccess = function(t) {
                var i = t.target.result;
                if (i) {
                    var o = new kt(i), a = e(i.primaryKey, i.value, o);
                    if (a instanceof Dt) {
                        var u = a.catch((function(t) {
                            return o.done(), Dt.reject(t);
                        }));
                        n.push(u);
                    }
                    o.isDone ? r() : null === o.$ ? i.continue() : i.continue(o.$);
                } else r();
            };
        })).next((function() {
            return Dt.waitFor(n);
        }));
    }, t.prototype.options = function(t, e) {
        var n;
        return void 0 !== t && ("string" == typeof t ? n = t : e = t), {
            index: n,
            range: e
        };
    }, t.prototype.cursor = function(t) {
        var e = "next";
        if (t.reverse && (e = "prev"), t.index) {
            var n = this.store.index(t.index);
            return t.J ? n.openKeyCursor(t.range, e) : n.openCursor(t.range, e);
        }
        return this.store.openCursor(t.range, e);
    }, t;
}();

/**
 * Wraps an IDBRequest in a PersistencePromise, using the onsuccess / onerror
 * handlers to resolve / reject the PersistencePromise as appropriate.
 */ function Mt(t) {
    return new Dt((function(e, n) {
        t.onsuccess = function(t) {
            var n = t.target.result;
            e(n);
        }, t.onerror = function(t) {
            var e = Vt(t.target.error);
            n(e);
        };
    }));
}

// Guard so we only report the error once.
var Ft = !1;

function Vt(t) {
    var e = At.S(d());
    if (e >= 12.2 && e < 13) {
        var n = "An internal error was encountered in the Indexed Database server";
        if (t.message.indexOf(n) >= 0) {
            // Wrap error in a more descriptive one.
            var r = new j("internal", "IOS_INDEXEDDB_BUG1: IndexedDb has thrown '".concat(n, "'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround."));
            return Ft || (Ft = !0, 
            // Throw a global exception outside of this promise chain, for the user to
            // potentially catch.
            setTimeout((function() {
                throw r;
            }), 0)), r;
        }
    }
    return t;
}

/** This class is responsible for the scheduling of Index Backfiller. */ var Lt = /** @class */ function() {
    function t(t, e) {
        this.asyncQueue = t, this.X = e, this.task = null;
    }
    return t.prototype.start = function() {
        this.ee(15e3);
    }, t.prototype.stop = function() {
        this.task && (this.task.cancel(), this.task = null);
    }, Object.defineProperty(t.prototype, "started", {
        get: function() {
            return null !== this.task;
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype.ee = function(t) {
        var r = this;
        F("IndexBackfiller", "Scheduled in ".concat(t, "ms")), this.task = this.asyncQueue.enqueueAfterDelay("index_backfill" /* TimerId.IndexBackfill */ , t, (function() {
            return e(r, void 0, void 0, (function() {
                var t, e, r, i;
                return n(this, (function(n) {
                    switch (n.label) {
                      case 0:
                        this.task = null, n.label = 1;

                      case 1:
                        return n.trys.push([ 1, 3, , 7 ]), t = F, e = [ "IndexBackfiller" ], r = "Documents written: ".concat, 
                        [ 4 /*yield*/ , this.X.te() ];

                      case 2:
                        return t.apply(void 0, e.concat([ r.apply("Documents written: ", [ n.sent() ]) ])), 
                        [ 3 /*break*/ , 7 ];

                      case 3:
                        return Ot(i = n.sent()) ? (F("IndexBackfiller", "Ignoring IndexedDB error during index backfill: ", i), 
                        [ 3 /*break*/ , 6 ]) : [ 3 /*break*/ , 4 ];

                      case 4:
                        return [ 4 /*yield*/ , Ct(i) ];

                      case 5:
                        n.sent(), n.label = 6;

                      case 6:
                        return [ 3 /*break*/ , 7 ];

                      case 7:
                        return [ 4 /*yield*/ , this.ee(6e4) ];

                      case 8:
                        return n.sent(), [ 2 /*return*/ ];
                    }
                }));
            }));
        }));
    }, t;
}(), qt = /** @class */ function() {
    function t(
    /**
     * LocalStore provides access to IndexManager and LocalDocumentView.
     * These properties will update when the user changes. Consequently,
     * making a local copy of IndexManager and LocalDocumentView will require
     * updates over time. The simpler solution is to rely on LocalStore to have
     * an up-to-date references to IndexManager and LocalDocumentStore.
     */
    t, e) {
        this.localStore = t, this.persistence = e;
    }
    return t.prototype.te = function(t) {
        return void 0 === t && (t = 50), e(this, void 0, void 0, (function() {
            var e = this;
            return n(this, (function(n) {
                return [ 2 /*return*/ , this.persistence.runTransaction("Backfill Indexes", "readwrite-primary", (function(n) {
                    return e.ne(n, t);
                })) ];
            }));
        }));
    }, 
    /** Writes index entries until the cap is reached. Returns the number of documents processed. */ t.prototype.ne = function(t, e) {
        var n = this, r = new Set, i = e, o = !0;
        return Dt.doWhile((function() {
            return !0 === o && i > 0;
        }), (function() {
            return n.localStore.indexManager.getNextCollectionGroupToUpdate(t).next((function(e) {
                if (null !== e && !r.has(e)) return F("IndexBackfiller", "Processing collection: ".concat(e)), 
                n.re(t, e, i).next((function(t) {
                    i -= t, r.add(e);
                }));
                o = !1;
            }));
        })).next((function() {
            return e - i;
        }));
    }, 
    /**
     * Writes entries for the provided collection group. Returns the number of documents processed.
     */
    t.prototype.re = function(t, e, n) {
        var r = this;
        // Use the earliest offset of all field indexes to query the local cache.
                return this.localStore.indexManager.getMinOffsetFromCollectionGroup(t, e).next((function(i) {
            return r.localStore.localDocuments.getNextDocuments(t, e, i, n).next((function(n) {
                var o = n.changes;
                return r.localStore.indexManager.updateIndexEntries(t, o).next((function() {
                    return r.ie(i, n);
                })).next((function(n) {
                    return F("IndexBackfiller", "Updating offset: ".concat(n)), r.localStore.indexManager.updateCollectionGroup(t, e, n);
                })).next((function() {
                    return o.size;
                }));
            }));
        }));
    }, 
    /** Returns the next offset based on the provided documents. */ t.prototype.ie = function(t, e) {
        var n = t;
        return e.changes.forEach((function(t, e) {
            var r = _t(e);
            Tt(r, n) > 0 && (n = r);
        })), new Et(n.readTime, n.documentKey, Math.max(e.batchId, t.largestBatchId));
    }, t;
}(), Ut = /** @class */ function() {
    function t(t, e) {
        var n = this;
        this.previousValue = t, e && (e.sequenceNumberHandler = function(t) {
            return n.se(t);
        }, this.oe = function(t) {
            return e.writeSequenceNumber(t);
        });
    }
    return t.prototype.se = function(t) {
        return this.previousValue = Math.max(t, this.previousValue), this.previousValue;
    }, t.prototype.next = function() {
        var t = ++this.previousValue;
        return this.oe && this.oe(t), t;
    }, t;
}();

/** Implements the steps for backfilling indexes. */
/**
 * Returns whether a variable is either undefined or null.
 */
function Bt(t) {
    return null == t;
}

/** Returns whether the value represents -0. */ function zt(t) {
    // Detect if the value is -0.0. Based on polyfill from
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
    return 0 === t && 1 / t == -1 / 0;
}

/**
 * Returns whether a value is an integer and in the safe integer range
 * @param value - The value to test for being an integer and in the safe range
 */ function Gt(t) {
    return "number" == typeof t && Number.isInteger(t) && !zt(t) && t <= Number.MAX_SAFE_INTEGER && t >= Number.MIN_SAFE_INTEGER;
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Encodes a resource path into a IndexedDb-compatible string form.
 */ function Kt(t) {
    for (var e = "", n = 0; n < t.length; n++) e.length > 0 && (e = Qt(e)), e = jt(t.get(n), e);
    return Qt(e);
}

/** Encodes a single segment of a resource path into the given result */ function jt(t, e) {
    for (var n = e, r = t.length, i = 0; i < r; i++) {
        var o = t.charAt(i);
        switch (o) {
          case "\0":
            n += "";
            break;

          case "":
            n += "";
            break;

          default:
            n += o;
        }
    }
    return n;
}

/** Encodes a path separator into the given result */ function Qt(t) {
    return t + "";
}

/**
 * Decodes the given IndexedDb-compatible string form of a resource path into
 * a ResourcePath instance. Note that this method is not suitable for use with
 * decoding resource names from the server; those are One Platform format
 * strings.
 */ function Wt(t) {
    // Event the empty path must encode as a path of at least length 2. A path
    // with exactly 2 must be the empty path.
    var e = t.length;
    if (B(e >= 2), 2 === e) return B("" === t.charAt(0) && "" === t.charAt(1)), lt.emptyPath();
    // Escape characters cannot exist past the second-to-last position in the
    // source value.
        for (var n = e - 2, r = [], i = "", o = 0; o < e; ) {
        // The last two characters of a valid encoded path must be a separator, so
        // there must be an end to this segment.
        var a = t.indexOf("", o);
        switch ((a < 0 || a > n) && U(), t.charAt(a + 1)) {
          case "":
            var u = t.substring(o, a), s = void 0;
            0 === i.length ? 
            // Avoid copying for the common case of a segment that excludes \0
            // and \001
            s = u : (s = i += u, i = ""), r.push(s);
            break;

          case "":
            i += t.substring(o, a), i += "\0";
            break;

          case "":
            // The escape character can be used in the output to encode itself.
            i += t.substring(o, a + 1);
            break;

          default:
            U();
        }
        o = a + 2;
    }
    return new lt(r);
}

/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ Ut._e = -1;

var Yt = [ "userId", "batchId" ];

/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Name of the IndexedDb object store.
 *
 * Note that the name 'owner' is chosen to ensure backwards compatibility with
 * older clients that only supported single locked access to the persistence
 * layer.
 */
/**
 * Creates a [userId, encodedPath] key for use in the DbDocumentMutations
 * index to iterate over all at document mutations for a given path or lower.
 */ function Ht(t, e) {
    return [ t, Kt(e) ];
}

/**
 * Creates a full index key of [userId, encodedPath, batchId] for inserting
 * and deleting into the DbDocumentMutations index.
 */ function Jt(t, e, n) {
    return [ t, Kt(e), n ];
}

/**
 * Because we store all the useful information for this store in the key,
 * there is no useful information to store as the value. The raw (unencoded)
 * path cannot be stored because IndexedDb doesn't store prototype
 * information.
 */ var Xt = {}, Zt = [ "prefixPath", "collectionGroup", "readTime", "documentId" ], $t = [ "prefixPath", "collectionGroup", "documentId" ], te = [ "collectionGroup", "readTime", "prefixPath", "documentId" ], ee = [ "canonicalId", "targetId" ], ne = [ "targetId", "path" ], re = [ "path", "targetId" ], ie = [ "collectionId", "parent" ], oe = [ "indexId", "uid" ], ae = [ "uid", "sequenceNumber" ], ue = [ "indexId", "uid", "arrayValue", "directionalValue", "orderedDocumentKey", "documentKey" ], se = [ "indexId", "uid", "orderedDocumentKey" ], ce = [ "userId", "collectionPath", "documentId" ], le = [ "userId", "collectionPath", "largestBatchId" ], he = [ "userId", "collectionGroup", "largestBatchId" ], fe = r(r([], r(r([], r(r([], r(r([], [ "mutationQueues", "mutations", "documentMutations", "remoteDocuments", "targets", "owner", "targetGlobal", "targetDocuments" ], !1), [ "clientMetadata" ], !1), !0), [ "remoteDocumentGlobal" ], !1), !0), [ "collectionParents" ], !1), !0), [ "bundles", "namedQueries" ], !1), de = r(r([], fe, !0), [ "documentOverlays" ], !1), pe = [ "mutationQueues", "mutations", "documentMutations", "remoteDocumentsV14", "targets", "owner", "targetGlobal", "targetDocuments", "clientMetadata", "remoteDocumentGlobal", "collectionParents", "bundles", "namedQueries", "documentOverlays" ], ve = pe, me = r(r([], ve, !0), [ "indexConfiguration", "indexState", "indexEntries" ], !1), ye = me, ge = /** @class */ function(e) {
    function n(t, n) {
        var r = this;
        return (r = e.call(this) || this).ae = t, r.currentSequenceNumber = n, r;
    }
    return t(n, e), n;
}(xt);

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function we(t, e) {
    var n = G(t);
    return At.M(n.ae, e);
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function be(t) {
    var e = 0;
    for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && e++;
    return e;
}

function Ie(t, e) {
    for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && e(n, t[n]);
}

function _e(t) {
    for (var e in t) if (Object.prototype.hasOwnProperty.call(t, e)) return !1;
    return !0;
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// An immutable sorted map implementation, based on a Left-leaning Red-Black
// tree.
var Ee = /** @class */ function() {
    function t(t, e) {
        this.comparator = t, this.root = e || Se.EMPTY;
    }
    // Returns a copy of the map, with the specified key/value added or replaced.
        return t.prototype.insert = function(e, n) {
        return new t(this.comparator, this.root.insert(e, n, this.comparator).copy(null, null, Se.BLACK, null, null));
    }, 
    // Returns a copy of the map, with the specified key removed.
    t.prototype.remove = function(e) {
        return new t(this.comparator, this.root.remove(e, this.comparator).copy(null, null, Se.BLACK, null, null));
    }, 
    // Returns the value of the node with the given key, or null.
    t.prototype.get = function(t) {
        for (var e = this.root; !e.isEmpty(); ) {
            var n = this.comparator(t, e.key);
            if (0 === n) return e.value;
            n < 0 ? e = e.left : n > 0 && (e = e.right);
        }
        return null;
    }, 
    // Returns the index of the element in this sorted map, or -1 if it doesn't
    // exist.
    t.prototype.indexOf = function(t) {
        for (
        // Number of nodes that were pruned when descending right
        var e = 0, n = this.root; !n.isEmpty(); ) {
            var r = this.comparator(t, n.key);
            if (0 === r) return e + n.left.size;
            r < 0 ? n = n.left : (
            // Count all nodes left of the node plus the node itself
            e += n.left.size + 1, n = n.right);
        }
        // Node not found
                return -1;
    }, t.prototype.isEmpty = function() {
        return this.root.isEmpty();
    }, Object.defineProperty(t.prototype, "size", {
        // Returns the total number of nodes in the map.
        get: function() {
            return this.root.size;
        },
        enumerable: !1,
        configurable: !0
    }), 
    // Returns the minimum key in the map.
    t.prototype.minKey = function() {
        return this.root.minKey();
    }, 
    // Returns the maximum key in the map.
    t.prototype.maxKey = function() {
        return this.root.maxKey();
    }, 
    // Traverses the map in key order and calls the specified action function
    // for each key/value pair. If action returns true, traversal is aborted.
    // Returns the first truthy value returned by action, or the last falsey
    // value returned by action.
    t.prototype.inorderTraversal = function(t) {
        return this.root.inorderTraversal(t);
    }, t.prototype.forEach = function(t) {
        this.inorderTraversal((function(e, n) {
            return t(e, n), !1;
        }));
    }, t.prototype.toString = function() {
        var t = [];
        return this.inorderTraversal((function(e, n) {
            return t.push("".concat(e, ":").concat(n)), !1;
        })), "{".concat(t.join(", "), "}");
    }, 
    // Traverses the map in reverse key order and calls the specified action
    // function for each key/value pair. If action returns true, traversal is
    // aborted.
    // Returns the first truthy value returned by action, or the last falsey
    // value returned by action.
    t.prototype.reverseTraversal = function(t) {
        return this.root.reverseTraversal(t);
    }, 
    // Returns an iterator over the SortedMap.
    t.prototype.getIterator = function() {
        return new Te(this.root, null, this.comparator, !1);
    }, t.prototype.getIteratorFrom = function(t) {
        return new Te(this.root, t, this.comparator, !1);
    }, t.prototype.getReverseIterator = function() {
        return new Te(this.root, null, this.comparator, !0);
    }, t.prototype.getReverseIteratorFrom = function(t) {
        return new Te(this.root, t, this.comparator, !0);
    }, t;
}(), Te = /** @class */ function() {
    function t(t, e, n, r) {
        this.isReverse = r, this.nodeStack = [];
        for (var i = 1; !t.isEmpty(); ) if (i = e ? n(t.key, e) : 1, 
        // flip the comparison if we're going in reverse
        e && r && (i *= -1), i < 0) 
        // This node is less than our start key. ignore it
        t = this.isReverse ? t.left : t.right; else {
            if (0 === i) {
                // This node is exactly equal to our start key. Push it on the stack,
                // but stop iterating;
                this.nodeStack.push(t);
                break;
            }
            // This node is greater than our start key, add it to the stack and move
            // to the next one
                        this.nodeStack.push(t), t = this.isReverse ? t.right : t.left;
        }
    }
    return t.prototype.getNext = function() {
        var t = this.nodeStack.pop(), e = {
            key: t.key,
            value: t.value
        };
        if (this.isReverse) for (t = t.left; !t.isEmpty(); ) this.nodeStack.push(t), t = t.right; else for (t = t.right; !t.isEmpty(); ) this.nodeStack.push(t), 
        t = t.left;
        return e;
    }, t.prototype.hasNext = function() {
        return this.nodeStack.length > 0;
    }, t.prototype.peek = function() {
        if (0 === this.nodeStack.length) return null;
        var t = this.nodeStack[this.nodeStack.length - 1];
        return {
            key: t.key,
            value: t.value
        };
    }, t;
}(), Se = /** @class */ function() {
    function t(e, n, r, i, o) {
        this.key = e, this.value = n, this.color = null != r ? r : t.RED, this.left = null != i ? i : t.EMPTY, 
        this.right = null != o ? o : t.EMPTY, this.size = this.left.size + 1 + this.right.size;
    }
    // Returns a copy of the current node, optionally replacing pieces of it.
        return t.prototype.copy = function(e, n, r, i, o) {
        return new t(null != e ? e : this.key, null != n ? n : this.value, null != r ? r : this.color, null != i ? i : this.left, null != o ? o : this.right);
    }, t.prototype.isEmpty = function() {
        return !1;
    }, 
    // Traverses the tree in key order and calls the specified action function
    // for each node. If action returns true, traversal is aborted.
    // Returns the first truthy value returned by action, or the last falsey
    // value returned by action.
    t.prototype.inorderTraversal = function(t) {
        return this.left.inorderTraversal(t) || t(this.key, this.value) || this.right.inorderTraversal(t);
    }, 
    // Traverses the tree in reverse key order and calls the specified action
    // function for each node. If action returns true, traversal is aborted.
    // Returns the first truthy value returned by action, or the last falsey
    // value returned by action.
    t.prototype.reverseTraversal = function(t) {
        return this.right.reverseTraversal(t) || t(this.key, this.value) || this.left.reverseTraversal(t);
    }, 
    // Returns the minimum node in the tree.
    t.prototype.min = function() {
        return this.left.isEmpty() ? this : this.left.min();
    }, 
    // Returns the maximum key in the tree.
    t.prototype.minKey = function() {
        return this.min().key;
    }, 
    // Returns the maximum key in the tree.
    t.prototype.maxKey = function() {
        return this.right.isEmpty() ? this.key : this.right.maxKey();
    }, 
    // Returns new tree, with the key/value added.
    t.prototype.insert = function(t, e, n) {
        var r = this, i = n(t, r.key);
        return (r = i < 0 ? r.copy(null, null, null, r.left.insert(t, e, n), null) : 0 === i ? r.copy(null, e, null, null, null) : r.copy(null, null, null, null, r.right.insert(t, e, n))).fixUp();
    }, t.prototype.removeMin = function() {
        if (this.left.isEmpty()) return t.EMPTY;
        var e = this;
        return e.left.isRed() || e.left.left.isRed() || (e = e.moveRedLeft()), (e = e.copy(null, null, null, e.left.removeMin(), null)).fixUp();
    }, 
    // Returns new tree, with the specified item removed.
    t.prototype.remove = function(e, n) {
        var r, i = this;
        if (n(e, i.key) < 0) i.left.isEmpty() || i.left.isRed() || i.left.left.isRed() || (i = i.moveRedLeft()), 
        i = i.copy(null, null, null, i.left.remove(e, n), null); else {
            if (i.left.isRed() && (i = i.rotateRight()), i.right.isEmpty() || i.right.isRed() || i.right.left.isRed() || (i = i.moveRedRight()), 
            0 === n(e, i.key)) {
                if (i.right.isEmpty()) return t.EMPTY;
                r = i.right.min(), i = i.copy(r.key, r.value, null, null, i.right.removeMin());
            }
            i = i.copy(null, null, null, null, i.right.remove(e, n));
        }
        return i.fixUp();
    }, t.prototype.isRed = function() {
        return this.color;
    }, 
    // Returns new tree after performing any needed rotations.
    t.prototype.fixUp = function() {
        var t = this;
        return t.right.isRed() && !t.left.isRed() && (t = t.rotateLeft()), t.left.isRed() && t.left.left.isRed() && (t = t.rotateRight()), 
        t.left.isRed() && t.right.isRed() && (t = t.colorFlip()), t;
    }, t.prototype.moveRedLeft = function() {
        var t = this.colorFlip();
        return t.right.left.isRed() && (t = (t = (t = t.copy(null, null, null, null, t.right.rotateRight())).rotateLeft()).colorFlip()), 
        t;
    }, t.prototype.moveRedRight = function() {
        var t = this.colorFlip();
        return t.left.left.isRed() && (t = (t = t.rotateRight()).colorFlip()), t;
    }, t.prototype.rotateLeft = function() {
        var e = this.copy(null, null, t.RED, null, this.right.left);
        return this.right.copy(null, null, this.color, e, null);
    }, t.prototype.rotateRight = function() {
        var e = this.copy(null, null, t.RED, this.left.right, null);
        return this.left.copy(null, null, this.color, null, e);
    }, t.prototype.colorFlip = function() {
        var t = this.left.copy(null, null, !this.left.color, null, null), e = this.right.copy(null, null, !this.right.color, null, null);
        return this.copy(null, null, !this.color, t, e);
    }, 
    // For testing.
    t.prototype.checkMaxDepth = function() {
        var t = this.check();
        return Math.pow(2, t) <= this.size + 1;
    }, 
    // In a balanced RB tree, the black-depth (number of black nodes) from root to
    // leaves is equal on both sides.  This function verifies that or asserts.
    t.prototype.check = function() {
        if (this.isRed() && this.left.isRed()) throw U();
        if (this.right.isRed()) throw U();
        var t = this.left.check();
        if (t !== this.right.check()) throw U();
        return t + (this.isRed() ? 0 : 1);
    }, t;
}();

// end SortedMap
// An iterator over an LLRBNode.
// end LLRBNode
// Empty node is shared between all LLRB trees.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
Se.EMPTY = null, Se.RED = !0, Se.BLACK = !1, 
// end LLRBEmptyNode
Se.EMPTY = new (/** @class */ function() {
    function t() {
        this.size = 0;
    }
    return Object.defineProperty(t.prototype, "key", {
        get: function() {
            throw U();
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "value", {
        get: function() {
            throw U();
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "color", {
        get: function() {
            throw U();
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "left", {
        get: function() {
            throw U();
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "right", {
        get: function() {
            throw U();
        },
        enumerable: !1,
        configurable: !0
    }), 
    // Returns a copy of the current node.
    t.prototype.copy = function(t, e, n, r, i) {
        return this;
    }, 
    // Returns a copy of the tree, with the specified key/value added.
    t.prototype.insert = function(t, e, n) {
        return new Se(t, e);
    }, 
    // Returns a copy of the tree, with the specified key removed.
    t.prototype.remove = function(t, e) {
        return this;
    }, t.prototype.isEmpty = function() {
        return !0;
    }, t.prototype.inorderTraversal = function(t) {
        return !1;
    }, t.prototype.reverseTraversal = function(t) {
        return !1;
    }, t.prototype.minKey = function() {
        return null;
    }, t.prototype.maxKey = function() {
        return null;
    }, t.prototype.isRed = function() {
        return !1;
    }, 
    // For testing.
    t.prototype.checkMaxDepth = function() {
        return !0;
    }, t.prototype.check = function() {
        return 0;
    }, t;
}());

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * SortedSet is an immutable (copy-on-write) collection that holds elements
 * in order specified by the provided comparator.
 *
 * NOTE: if provided comparator returns 0 for two elements, we consider them to
 * be equal!
 */
var xe = /** @class */ function() {
    function t(t) {
        this.comparator = t, this.data = new Ee(this.comparator);
    }
    return t.prototype.has = function(t) {
        return null !== this.data.get(t);
    }, t.prototype.first = function() {
        return this.data.minKey();
    }, t.prototype.last = function() {
        return this.data.maxKey();
    }, Object.defineProperty(t.prototype, "size", {
        get: function() {
            return this.data.size;
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype.indexOf = function(t) {
        return this.data.indexOf(t);
    }, 
    /** Iterates elements in order defined by "comparator" */ t.prototype.forEach = function(t) {
        this.data.inorderTraversal((function(e, n) {
            return t(e), !1;
        }));
    }, 
    /** Iterates over `elem`s such that: range[0] &lt;= elem &lt; range[1]. */ t.prototype.forEachInRange = function(t, e) {
        for (var n = this.data.getIteratorFrom(t[0]); n.hasNext(); ) {
            var r = n.getNext();
            if (this.comparator(r.key, t[1]) >= 0) return;
            e(r.key);
        }
    }, 
    /**
     * Iterates over `elem`s such that: start &lt;= elem until false is returned.
     */
    t.prototype.forEachWhile = function(t, e) {
        var n;
        for (n = void 0 !== e ? this.data.getIteratorFrom(e) : this.data.getIterator(); n.hasNext(); ) if (!t(n.getNext().key)) return;
    }, 
    /** Finds the least element greater than or equal to `elem`. */ t.prototype.firstAfterOrEqual = function(t) {
        var e = this.data.getIteratorFrom(t);
        return e.hasNext() ? e.getNext().key : null;
    }, t.prototype.getIterator = function() {
        return new Ce(this.data.getIterator());
    }, t.prototype.getIteratorFrom = function(t) {
        return new Ce(this.data.getIteratorFrom(t));
    }, 
    /** Inserts or updates an element */ t.prototype.add = function(t) {
        return this.copy(this.data.remove(t).insert(t, !0));
    }, 
    /** Deletes an element */ t.prototype.delete = function(t) {
        return this.has(t) ? this.copy(this.data.remove(t)) : this;
    }, t.prototype.isEmpty = function() {
        return this.data.isEmpty();
    }, t.prototype.unionWith = function(t) {
        var e = this;
        // Make sure `result` always refers to the larger one of the two sets.
                return e.size < t.size && (e = t, t = this), t.forEach((function(t) {
            e = e.add(t);
        })), e;
    }, t.prototype.isEqual = function(e) {
        if (!(e instanceof t)) return !1;
        if (this.size !== e.size) return !1;
        for (var n = this.data.getIterator(), r = e.data.getIterator(); n.hasNext(); ) {
            var i = n.getNext().key, o = r.getNext().key;
            if (0 !== this.comparator(i, o)) return !1;
        }
        return !0;
    }, t.prototype.toArray = function() {
        var t = [];
        return this.forEach((function(e) {
            t.push(e);
        })), t;
    }, t.prototype.toString = function() {
        var t = [];
        return this.forEach((function(e) {
            return t.push(e);
        })), "SortedSet(" + t.toString() + ")";
    }, t.prototype.copy = function(e) {
        var n = new t(this.comparator);
        return n.data = e, n;
    }, t;
}(), Ce = /** @class */ function() {
    function t(t) {
        this.iter = t;
    }
    return t.prototype.getNext = function() {
        return this.iter.getNext().key;
    }, t.prototype.hasNext = function() {
        return this.iter.hasNext();
    }, t;
}();

/**
 * Compares two sorted sets for equality using their natural ordering. The
 * method computes the intersection and invokes `onAdd` for every element that
 * is in `after` but not `before`. `onRemove` is invoked for every element in
 * `before` but missing from `after`.
 *
 * The method creates a copy of both `before` and `after` and runs in O(n log
 * n), where n is the size of the two lists.
 *
 * @param before - The elements that exist in the original set.
 * @param after - The elements to diff against the original set.
 * @param comparator - The comparator for the elements in before and after.
 * @param onAdd - A function to invoke for every element that is part of `
 * after` but not `before`.
 * @param onRemove - A function to invoke for every element that is part of
 * `before` but not `after`.
 */
/**
 * Returns the next element from the iterator or `undefined` if none available.
 */
function De(t) {
    return t.hasNext() ? t.getNext() : void 0;
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Provides a set of fields that can be used to partially patch a document.
 * FieldMask is used in conjunction with ObjectValue.
 * Examples:
 *   foo - Overwrites foo entirely with the provided value. If foo is not
 *         present in the companion ObjectValue, the field is deleted.
 *   foo.bar - Overwrites only the field bar of the object foo.
 *             If foo is not an object, foo is replaced with an object
 *             containing foo
 */ var Ne = /** @class */ function() {
    function t(t) {
        this.fields = t, 
        // TODO(dimond): validation of FieldMask
        // Sort the field mask to support `FieldMask.isEqual()` and assert below.
        t.sort(ft.comparator);
    }
    return t.empty = function() {
        return new t([]);
    }, 
    /**
     * Returns a new FieldMask object that is the result of adding all the given
     * fields paths to this field mask.
     */
    t.prototype.unionWith = function(e) {
        for (var n = new xe(ft.comparator), r = 0, i = this.fields; r < i.length; r++) {
            var o = i[r];
            n = n.add(o);
        }
        for (var a = 0, u = e; a < u.length; a++) {
            var s = u[a];
            n = n.add(s);
        }
        return new t(n.toArray());
    }, 
    /**
     * Verifies that `fieldPath` is included by at least one field in this field
     * mask.
     *
     * This is an O(n) operation, where `n` is the size of the field mask.
     */
    t.prototype.covers = function(t) {
        for (var e = 0, n = this.fields; e < n.length; e++) {
            if (n[e].isPrefixOf(t)) return !0;
        }
        return !1;
    }, t.prototype.isEqual = function(t) {
        return ot(this.fields, t.fields, (function(t, e) {
            return t.isEqual(e);
        }));
    }, t;
}(), Ae = /** @class */ function(e) {
    function n() {
        var t = this;
        return (t = e.apply(this, arguments) || this).name = "Base64DecodeError", t;
    }
    return t(n, e), n;
}(Error);

/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * An error encountered while decoding base64 string.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/** Converts a Base64 encoded string to a binary string. */
/** True if and only if the Base64 conversion functions are available. */
function ke() {
    return "undefined" != typeof atob;
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Immutable class that represents a "proto" byte string.
 *
 * Proto byte strings can either be Base64-encoded strings or Uint8Arrays when
 * sent on the wire. This class abstracts away this differentiation by holding
 * the proto byte string in a common class that must be converted into a string
 * before being sent as a proto.
 * @internal
 */ var Pe = /** @class */ function() {
    function t(t) {
        this.binaryString = t;
    }
    return t.fromBase64String = function(e) {
        var n = function(t) {
            try {
                return atob(t);
            } catch (t) {
                // Check that `DOMException` is defined before using it to avoid
                // "ReferenceError: Property 'DOMException' doesn't exist" in react-native.
                // (https://github.com/firebase/firebase-js-sdk/issues/7115)
                throw "undefined" != typeof DOMException && t instanceof DOMException ? new Ae("Invalid base64 string: " + t) : t;
            }
        }(e);
        return new t(n);
    }, t.fromUint8Array = function(e) {
        // TODO(indexing); Remove the copy of the byte string here as this method
        // is frequently called during indexing.
        var n = 
        /**
 * Helper function to convert an Uint8array to a binary string.
 */
        function(t) {
            for (var e = "", n = 0; n < t.length; ++n) e += String.fromCharCode(t[n]);
            return e;
        }(e);
        return new t(n);
    }, t.prototype[Symbol.iterator] = function() {
        var t = this, e = 0;
        return {
            next: function() {
                return e < t.binaryString.length ? {
                    value: t.binaryString.charCodeAt(e++),
                    done: !1
                } : {
                    value: void 0,
                    done: !0
                };
            }
        };
    }, t.prototype.toBase64 = function() {
        return t = this.binaryString, btoa(t);
        var t;
    }, t.prototype.toUint8Array = function() {
        return function(t) {
            for (var e = new Uint8Array(t.length), n = 0; n < t.length; n++) e[n] = t.charCodeAt(n);
            return e;
        }(this.binaryString);
    }, t.prototype.approximateByteSize = function() {
        return 2 * this.binaryString.length;
    }, t.prototype.compareTo = function(t) {
        return it(this.binaryString, t.binaryString);
    }, t.prototype.isEqual = function(t) {
        return this.binaryString === t.binaryString;
    }, t;
}();

Pe.EMPTY_BYTE_STRING = new Pe("");

var Oe = new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);

/**
 * Converts the possible Proto values for a timestamp value into a "seconds and
 * nanos" representation.
 */ function Re(t) {
    // The json interface (for the browser) will return an iso timestamp string,
    // while the proto js library (for node) will return a
    // google.protobuf.Timestamp instance.
    if (B(!!t), "string" == typeof t) {
        // The date string can have higher precision (nanos) than the Date class
        // (millis), so we do some custom parsing here.
        // Parse the nanos right out of the string.
        var e = 0, n = Oe.exec(t);
        if (B(!!n), n[1]) {
            // Pad the fraction out to 9 digits (nanos).
            var r = n[1];
            r = (r + "000000000").substr(0, 9), e = Number(r);
        }
        // Parse the date to get the seconds.
                var i = new Date(t);
        return {
            seconds: Math.floor(i.getTime() / 1e3),
            nanos: e
        };
    }
    return {
        seconds: Me(t.seconds),
        nanos: Me(t.nanos)
    };
}

/**
 * Converts the possible Proto types for numbers into a JavaScript number.
 * Returns 0 if the value is not numeric.
 */ function Me(t) {
    // TODO(bjornick): Handle int64 greater than 53 bits.
    return "number" == typeof t ? t : "string" == typeof t ? Number(t) : 0;
}

/** Converts the possible Proto types for Blobs into a ByteString. */ function Fe(t) {
    return "string" == typeof t ? Pe.fromBase64String(t) : Pe.fromUint8Array(t);
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Represents a locally-applied ServerTimestamp.
 *
 * Server Timestamps are backed by MapValues that contain an internal field
 * `__type__` with a value of `server_timestamp`. The previous value and local
 * write time are stored in its `__previous_value__` and `__local_write_time__`
 * fields respectively.
 *
 * Notes:
 * - ServerTimestampValue instances are created as the result of applying a
 *   transform. They can only exist in the local view of a document. Therefore
 *   they do not need to be parsed or serialized.
 * - When evaluated locally (e.g. for snapshot.data()), they by default
 *   evaluate to `null`. This behavior can be configured by passing custom
 *   FieldValueOptions to value().
 * - With respect to other ServerTimestampValues, they sort by their
 *   localWriteTime.
 */ function Ve(t) {
    var e, n;
    return "server_timestamp" === (null === (n = ((null === (e = null == t ? void 0 : t.mapValue) || void 0 === e ? void 0 : e.fields) || {}).__type__) || void 0 === n ? void 0 : n.stringValue);
}

/**
 * Creates a new ServerTimestamp proto value (using the internal format).
 */
/**
 * Returns the value of the field before this ServerTimestamp was set.
 *
 * Preserving the previous values allows the user to display the last resoled
 * value until the backend responds with the timestamp.
 */ function Le(t) {
    var e = t.mapValue.fields.__previous_value__;
    return Ve(e) ? Le(e) : e;
}

/**
 * Returns the local time at which this timestamp was first set.
 */ function qe(t) {
    var e = Re(t.mapValue.fields.__local_write_time__.timestampValue);
    return new ut(e.seconds, e.nanos);
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var Ue = 
/**
     * Constructs a DatabaseInfo using the provided host, databaseId and
     * persistenceKey.
     *
     * @param databaseId - The database to use.
     * @param appId - The Firebase App Id.
     * @param persistenceKey - A unique identifier for this Firestore's local
     * storage (used in conjunction with the databaseId).
     * @param host - The Firestore backend host to connect to.
     * @param ssl - Whether to use SSL when connecting.
     * @param forceLongPolling - Whether to use the forceLongPolling option
     * when using WebChannel as the network transport.
     * @param autoDetectLongPolling - Whether to use the detectBufferingProxy
     * option when using WebChannel as the network transport.
     * @param longPollingOptions Options that configure long-polling.
     * @param useFetchStreams Whether to use the Fetch API instead of
     * XMLHTTPRequest
     */
function(t, e, n, r, i, o, a, u, s) {
    this.databaseId = t, this.appId = e, this.persistenceKey = n, this.host = r, this.ssl = i, 
    this.forceLongPolling = o, this.autoDetectLongPolling = a, this.longPollingOptions = u, 
    this.useFetchStreams = s;
}, Be = /** @class */ function() {
    function t(t, e) {
        this.projectId = t, this.database = e || "(default)";
    }
    return t.empty = function() {
        return new t("", "");
    }, Object.defineProperty(t.prototype, "isDefaultDatabase", {
        get: function() {
            return "(default)" === this.database;
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype.isEqual = function(e) {
        return e instanceof t && e.projectId === this.projectId && e.database === this.database;
    }, t;
}(), ze = {
    mapValue: {
        fields: {
            __type__: {
                stringValue: "__max__"
            }
        }
    }
}, Ge = {
    nullValue: "NULL_VALUE"
};

/** The default database name for a project. */
/**
 * Represents the database ID a Firestore client is associated with.
 * @internal
 */
/** Extracts the backend's type order for the provided value. */
function Ke(t) {
    return "nullValue" in t ? 0 /* TypeOrder.NullValue */ : "booleanValue" in t ? 1 /* TypeOrder.BooleanValue */ : "integerValue" in t || "doubleValue" in t ? 2 /* TypeOrder.NumberValue */ : "timestampValue" in t ? 3 /* TypeOrder.TimestampValue */ : "stringValue" in t ? 5 /* TypeOrder.StringValue */ : "bytesValue" in t ? 6 /* TypeOrder.BlobValue */ : "referenceValue" in t ? 7 /* TypeOrder.RefValue */ : "geoPointValue" in t ? 8 /* TypeOrder.GeoPointValue */ : "arrayValue" in t ? 9 /* TypeOrder.ArrayValue */ : "mapValue" in t ? Ve(t) ? 4 /* TypeOrder.ServerTimestampValue */ : an(t) ? 9007199254740991 /* TypeOrder.MaxValue */ : 10 /* TypeOrder.ObjectValue */ : U();
}

/** Tests `left` and `right` for equality based on the backend semantics. */ function je(t, e) {
    if (t === e) return !0;
    var n = Ke(t);
    if (n !== Ke(e)) return !1;
    switch (n) {
      case 0 /* TypeOrder.NullValue */ :
      case 9007199254740991 /* TypeOrder.MaxValue */ :
        return !0;

      case 1 /* TypeOrder.BooleanValue */ :
        return t.booleanValue === e.booleanValue;

      case 4 /* TypeOrder.ServerTimestampValue */ :
        return qe(t).isEqual(qe(e));

      case 3 /* TypeOrder.TimestampValue */ :
        return function(t, e) {
            if ("string" == typeof t.timestampValue && "string" == typeof e.timestampValue && t.timestampValue.length === e.timestampValue.length) 
            // Use string equality for ISO 8601 timestamps
            return t.timestampValue === e.timestampValue;
            var n = Re(t.timestampValue), r = Re(e.timestampValue);
            return n.seconds === r.seconds && n.nanos === r.nanos;
        }(t, e);

      case 5 /* TypeOrder.StringValue */ :
        return t.stringValue === e.stringValue;

      case 6 /* TypeOrder.BlobValue */ :
        return function(t, e) {
            return Fe(t.bytesValue).isEqual(Fe(e.bytesValue));
        }(t, e);

      case 7 /* TypeOrder.RefValue */ :
        return t.referenceValue === e.referenceValue;

      case 8 /* TypeOrder.GeoPointValue */ :
        return function(t, e) {
            return Me(t.geoPointValue.latitude) === Me(e.geoPointValue.latitude) && Me(t.geoPointValue.longitude) === Me(e.geoPointValue.longitude);
        }(t, e);

      case 2 /* TypeOrder.NumberValue */ :
        return function(t, e) {
            if ("integerValue" in t && "integerValue" in e) return Me(t.integerValue) === Me(e.integerValue);
            if ("doubleValue" in t && "doubleValue" in e) {
                var n = Me(t.doubleValue), r = Me(e.doubleValue);
                return n === r ? zt(n) === zt(r) : isNaN(n) && isNaN(r);
            }
            return !1;
        }(t, e);

      case 9 /* TypeOrder.ArrayValue */ :
        return ot(t.arrayValue.values || [], e.arrayValue.values || [], je);

      case 10 /* TypeOrder.ObjectValue */ :
        return function(t, e) {
            var n = t.mapValue.fields || {}, r = e.mapValue.fields || {};
            if (be(n) !== be(r)) return !1;
            for (var i in n) if (n.hasOwnProperty(i) && (void 0 === r[i] || !je(n[i], r[i]))) return !1;
            return !0;
        }(t, e);

      default:
        return U();
    }
}

function Qe(t, e) {
    return void 0 !== (t.values || []).find((function(t) {
        return je(t, e);
    }));
}

function We(t, e) {
    if (t === e) return 0;
    var n = Ke(t), r = Ke(e);
    if (n !== r) return it(n, r);
    switch (n) {
      case 0 /* TypeOrder.NullValue */ :
      case 9007199254740991 /* TypeOrder.MaxValue */ :
        return 0;

      case 1 /* TypeOrder.BooleanValue */ :
        return it(t.booleanValue, e.booleanValue);

      case 2 /* TypeOrder.NumberValue */ :
        return function(t, e) {
            var n = Me(t.integerValue || t.doubleValue), r = Me(e.integerValue || e.doubleValue);
            return n < r ? -1 : n > r ? 1 : n === r ? 0 : 
            // one or both are NaN.
            isNaN(n) ? isNaN(r) ? 0 : -1 : 1;
        }(t, e);

      case 3 /* TypeOrder.TimestampValue */ :
        return Ye(t.timestampValue, e.timestampValue);

      case 4 /* TypeOrder.ServerTimestampValue */ :
        return Ye(qe(t), qe(e));

      case 5 /* TypeOrder.StringValue */ :
        return it(t.stringValue, e.stringValue);

      case 6 /* TypeOrder.BlobValue */ :
        return function(t, e) {
            var n = Fe(t), r = Fe(e);
            return n.compareTo(r);
        }(t.bytesValue, e.bytesValue);

      case 7 /* TypeOrder.RefValue */ :
        return function(t, e) {
            for (var n = t.split("/"), r = e.split("/"), i = 0; i < n.length && i < r.length; i++) {
                var o = it(n[i], r[i]);
                if (0 !== o) return o;
            }
            return it(n.length, r.length);
        }(t.referenceValue, e.referenceValue);

      case 8 /* TypeOrder.GeoPointValue */ :
        return function(t, e) {
            var n = it(Me(t.latitude), Me(e.latitude));
            return 0 !== n ? n : it(Me(t.longitude), Me(e.longitude));
        }(t.geoPointValue, e.geoPointValue);

      case 9 /* TypeOrder.ArrayValue */ :
        return function(t, e) {
            for (var n = t.values || [], r = e.values || [], i = 0; i < n.length && i < r.length; ++i) {
                var o = We(n[i], r[i]);
                if (o) return o;
            }
            return it(n.length, r.length);
        }(t.arrayValue, e.arrayValue);

      case 10 /* TypeOrder.ObjectValue */ :
        return function(t, e) {
            if (t === ze.mapValue && e === ze.mapValue) return 0;
            if (t === ze.mapValue) return 1;
            if (e === ze.mapValue) return -1;
            var n = t.fields || {}, r = Object.keys(n), i = e.fields || {}, o = Object.keys(i);
            // Even though MapValues are likely sorted correctly based on their insertion
            // order (e.g. when received from the backend), local modifications can bring
            // elements out of order. We need to re-sort the elements to ensure that
            // canonical IDs are independent of insertion order.
                        r.sort(), o.sort();
            for (var a = 0; a < r.length && a < o.length; ++a) {
                var u = it(r[a], o[a]);
                if (0 !== u) return u;
                var s = We(n[r[a]], i[o[a]]);
                if (0 !== s) return s;
            }
            return it(r.length, o.length);
        }(t.mapValue, e.mapValue);

      default:
        throw U();
    }
}

function Ye(t, e) {
    if ("string" == typeof t && "string" == typeof e && t.length === e.length) return it(t, e);
    var n = Re(t), r = Re(e), i = it(n.seconds, r.seconds);
    return 0 !== i ? i : it(n.nanos, r.nanos);
}

function He(t) {
    return Je(t);
}

function Je(t) {
    return "nullValue" in t ? "null" : "booleanValue" in t ? "" + t.booleanValue : "integerValue" in t ? "" + t.integerValue : "doubleValue" in t ? "" + t.doubleValue : "timestampValue" in t ? function(t) {
        var e = Re(t);
        return "time(".concat(e.seconds, ",").concat(e.nanos, ")");
    }(t.timestampValue) : "stringValue" in t ? t.stringValue : "bytesValue" in t ? function(t) {
        return Fe(t).toBase64();
    }(t.bytesValue) : "referenceValue" in t ? function(t) {
        return dt.fromName(t).toString();
    }(t.referenceValue) : "geoPointValue" in t ? function(t) {
        return "geo(".concat(t.latitude, ",").concat(t.longitude, ")");
    }(t.geoPointValue) : "arrayValue" in t ? function(t) {
        for (var e = "[", n = !0, r = 0, i = t.values || []; r < i.length; r++) {
            n ? n = !1 : e += ",", e += Je(i[r]);
        }
        return e + "]";
    }(t.arrayValue) : "mapValue" in t ? function(t) {
        for (
        // Iteration order in JavaScript is not guaranteed. To ensure that we generate
        // matching canonical IDs for identical maps, we need to sort the keys.
        var e = "{", n = !0, r = 0, i = Object.keys(t.fields || {}).sort(); r < i.length; r++) {
            var o = i[r];
            n ? n = !1 : e += ",", e += "".concat(o, ":").concat(Je(t.fields[o]));
        }
        return e + "}";
    }(t.mapValue) : U();
}

function Xe(t) {
    switch (Ke(t)) {
      case 0 /* TypeOrder.NullValue */ :
      case 1 /* TypeOrder.BooleanValue */ :
        return 4;

      case 2 /* TypeOrder.NumberValue */ :
        return 8;

      case 3 /* TypeOrder.TimestampValue */ :
      case 8 /* TypeOrder.GeoPointValue */ :
        // GeoPoints are made up of two distinct numbers (latitude + longitude)
        return 16;

      case 4 /* TypeOrder.ServerTimestampValue */ :
        var e = Le(t);
        return e ? 16 + Xe(e) : 16;

      case 5 /* TypeOrder.StringValue */ :
        // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures:
        // "JavaScript's String type is [...] a set of elements of 16-bit unsigned
        // integer values"
        return 2 * t.stringValue.length;

      case 6 /* TypeOrder.BlobValue */ :
        return Fe(t.bytesValue).approximateByteSize();

      case 7 /* TypeOrder.RefValue */ :
        return t.referenceValue.length;

      case 9 /* TypeOrder.ArrayValue */ :
        return function(t) {
            return (t.values || []).reduce((function(t, e) {
                return t + Xe(e);
            }), 0);
        }(t.arrayValue);

      case 10 /* TypeOrder.ObjectValue */ :
        return function(t) {
            var e = 0;
            return Ie(t.fields, (function(t, n) {
                e += t.length + Xe(n);
            })), e;
        }(t.mapValue);

      default:
        throw U();
    }
}

function Ze(t, e) {
    return {
        referenceValue: "projects/".concat(t.projectId, "/databases/").concat(t.database, "/documents/").concat(e.path.canonicalString())
    };
}

/** Returns true if `value` is an IntegerValue . */ function $e(t) {
    return !!t && "integerValue" in t;
}

/** Returns true if `value` is a DoubleValue. */
/** Returns true if `value` is an ArrayValue. */ function tn(t) {
    return !!t && "arrayValue" in t;
}

/** Returns true if `value` is a NullValue. */ function en(t) {
    return !!t && "nullValue" in t;
}

/** Returns true if `value` is NaN. */ function nn(t) {
    return !!t && "doubleValue" in t && isNaN(Number(t.doubleValue));
}

/** Returns true if `value` is a MapValue. */ function rn(t) {
    return !!t && "mapValue" in t;
}

/** Creates a deep copy of `source`. */ function on(t) {
    if (t.geoPointValue) return {
        geoPointValue: Object.assign({}, t.geoPointValue)
    };
    if (t.timestampValue && "object" == typeof t.timestampValue) return {
        timestampValue: Object.assign({}, t.timestampValue)
    };
    if (t.mapValue) {
        var e = {
            mapValue: {
                fields: {}
            }
        };
        return Ie(t.mapValue.fields, (function(t, n) {
            return e.mapValue.fields[t] = on(n);
        })), e;
    }
    if (t.arrayValue) {
        for (var n = {
            arrayValue: {
                values: []
            }
        }, r = 0; r < (t.arrayValue.values || []).length; ++r) n.arrayValue.values[r] = on(t.arrayValue.values[r]);
        return n;
    }
    return Object.assign({}, t);
}

/** Returns true if the Value represents the canonical {@link #MAX_VALUE} . */ function an(t) {
    return "__max__" === (((t.mapValue || {}).fields || {}).__type__ || {}).stringValue;
}

/** Returns the lowest value for the given value type (inclusive). */ function un(t) {
    return "nullValue" in t ? Ge : "booleanValue" in t ? {
        booleanValue: !1
    } : "integerValue" in t || "doubleValue" in t ? {
        doubleValue: NaN
    } : "timestampValue" in t ? {
        timestampValue: {
            seconds: Number.MIN_SAFE_INTEGER
        }
    } : "stringValue" in t ? {
        stringValue: ""
    } : "bytesValue" in t ? {
        bytesValue: ""
    } : "referenceValue" in t ? Ze(Be.empty(), dt.empty()) : "geoPointValue" in t ? {
        geoPointValue: {
            latitude: -90,
            longitude: -180
        }
    } : "arrayValue" in t ? {
        arrayValue: {}
    } : "mapValue" in t ? {
        mapValue: {}
    } : U();
}

/** Returns the largest value for the given value type (exclusive). */ function sn(t) {
    return "nullValue" in t ? {
        booleanValue: !1
    } : "booleanValue" in t ? {
        doubleValue: NaN
    } : "integerValue" in t || "doubleValue" in t ? {
        timestampValue: {
            seconds: Number.MIN_SAFE_INTEGER
        }
    } : "timestampValue" in t ? {
        stringValue: ""
    } : "stringValue" in t ? {
        bytesValue: ""
    } : "bytesValue" in t ? Ze(Be.empty(), dt.empty()) : "referenceValue" in t ? {
        geoPointValue: {
            latitude: -90,
            longitude: -180
        }
    } : "geoPointValue" in t ? {
        arrayValue: {}
    } : "arrayValue" in t ? {
        mapValue: {}
    } : "mapValue" in t ? ze : U();
}

function cn(t, e) {
    var n = We(t.value, e.value);
    return 0 !== n ? n : t.inclusive && !e.inclusive ? -1 : !t.inclusive && e.inclusive ? 1 : 0;
}

function ln(t, e) {
    var n = We(t.value, e.value);
    return 0 !== n ? n : t.inclusive && !e.inclusive ? 1 : !t.inclusive && e.inclusive ? -1 : 0;
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * An ObjectValue represents a MapValue in the Firestore Proto and offers the
 * ability to add and remove fields (via the ObjectValueBuilder).
 */ var hn = /** @class */ function() {
    function t(t) {
        this.value = t;
    }
    return t.empty = function() {
        return new t({
            mapValue: {}
        });
    }, 
    /**
     * Returns the value at the given path or null.
     *
     * @param path - the path to search
     * @returns The value at the path or null if the path is not set.
     */
    t.prototype.field = function(t) {
        if (t.isEmpty()) return this.value;
        for (var e = this.value, n = 0; n < t.length - 1; ++n) if (!rn(e = (e.mapValue.fields || {})[t.get(n)])) return null;
        return (e = (e.mapValue.fields || {})[t.lastSegment()]) || null;
    }, 
    /**
     * Sets the field to the provided value.
     *
     * @param path - The field path to set.
     * @param value - The value to set.
     */
    t.prototype.set = function(t, e) {
        this.getFieldsMap(t.popLast())[t.lastSegment()] = on(e);
    }, 
    /**
     * Sets the provided fields to the provided values.
     *
     * @param data - A map of fields to values (or null for deletes).
     */
    t.prototype.setAll = function(t) {
        var e = this, n = ft.emptyPath(), r = {}, i = [];
        t.forEach((function(t, o) {
            if (!n.isImmediateParentOf(o)) {
                // Insert the accumulated changes at this parent location
                var a = e.getFieldsMap(n);
                e.applyChanges(a, r, i), r = {}, i = [], n = o.popLast();
            }
            t ? r[o.lastSegment()] = on(t) : i.push(o.lastSegment());
        }));
        var o = this.getFieldsMap(n);
        this.applyChanges(o, r, i);
    }, 
    /**
     * Removes the field at the specified path. If there is no field at the
     * specified path, nothing is changed.
     *
     * @param path - The field path to remove.
     */
    t.prototype.delete = function(t) {
        var e = this.field(t.popLast());
        rn(e) && e.mapValue.fields && delete e.mapValue.fields[t.lastSegment()];
    }, t.prototype.isEqual = function(t) {
        return je(this.value, t.value);
    }, 
    /**
     * Returns the map that contains the leaf element of `path`. If the parent
     * entry does not yet exist, or if it is not a map, a new map will be created.
     */
    t.prototype.getFieldsMap = function(t) {
        var e = this.value;
        e.mapValue.fields || (e.mapValue = {
            fields: {}
        });
        for (var n = 0; n < t.length; ++n) {
            var r = e.mapValue.fields[t.get(n)];
            rn(r) && r.mapValue.fields || (r = {
                mapValue: {
                    fields: {}
                }
            }, e.mapValue.fields[t.get(n)] = r), e = r;
        }
        return e.mapValue.fields;
    }, 
    /**
     * Modifies `fieldsMap` by adding, replacing or deleting the specified
     * entries.
     */
    t.prototype.applyChanges = function(t, e, n) {
        Ie(e, (function(e, n) {
            return t[e] = n;
        }));
        for (var r = 0, i = n; r < i.length; r++) {
            var o = i[r];
            delete t[o];
        }
    }, t.prototype.clone = function() {
        return new t(on(this.value));
    }, t;
}();

/**
 * Returns a FieldMask built from all fields in a MapValue.
 */ function fn(t) {
    var e = [];
    return Ie(t.fields, (function(t, n) {
        var r = new ft([ t ]);
        if (rn(n)) {
            var i = fn(n.mapValue).fields;
            if (0 === i.length) 
            // Preserve the empty map by adding it to the FieldMask.
            e.push(r); else 
            // For nested and non-empty ObjectValues, add the FieldPath of the
            // leaf nodes.
            for (var o = 0, a = i; o < a.length; o++) {
                var u = a[o];
                e.push(r.child(u));
            }
        } else 
        // For nested and non-empty ObjectValues, add the FieldPath of the leaf
        // nodes.
        e.push(r);
    })), new Ne(e)
    /**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
    /**
 * Represents a document in Firestore with a key, version, data and whether it
 * has local mutations applied to it.
 *
 * Documents can transition between states via `convertToFoundDocument()`,
 * `convertToNoDocument()` and `convertToUnknownDocument()`. If a document does
 * not transition to one of these states even after all mutations have been
 * applied, `isValidDocument()` returns false and the document should be removed
 * from all views.
 */;
}

var dn = /** @class */ function() {
    function t(t, e, n, r, i, o, a) {
        this.key = t, this.documentType = e, this.version = n, this.readTime = r, this.createTime = i, 
        this.data = o, this.documentState = a
        /**
     * Creates a document with no known version or data, but which can serve as
     * base document for mutations.
     */;
    }
    return t.newInvalidDocument = function(e) {
        return new t(e, 0 /* DocumentType.INVALID */ , 
        /* version */ st.min(), 
        /* readTime */ st.min(), 
        /* createTime */ st.min(), hn.empty(), 0 /* DocumentState.SYNCED */);
    }, 
    /**
     * Creates a new document that is known to exist with the given data at the
     * given version.
     */
    t.newFoundDocument = function(e, n, r, i) {
        return new t(e, 1 /* DocumentType.FOUND_DOCUMENT */ , 
        /* version */ n, 
        /* readTime */ st.min(), 
        /* createTime */ r, i, 0 /* DocumentState.SYNCED */);
    }, 
    /** Creates a new document that is known to not exist at the given version. */ t.newNoDocument = function(e, n) {
        return new t(e, 2 /* DocumentType.NO_DOCUMENT */ , 
        /* version */ n, 
        /* readTime */ st.min(), 
        /* createTime */ st.min(), hn.empty(), 0 /* DocumentState.SYNCED */);
    }, 
    /**
     * Creates a new document that is known to exist at the given version but
     * whose data is not known (e.g. a document that was updated without a known
     * base document).
     */
    t.newUnknownDocument = function(e, n) {
        return new t(e, 3 /* DocumentType.UNKNOWN_DOCUMENT */ , 
        /* version */ n, 
        /* readTime */ st.min(), 
        /* createTime */ st.min(), hn.empty(), 2 /* DocumentState.HAS_COMMITTED_MUTATIONS */);
    }, 
    /**
     * Changes the document type to indicate that it exists and that its version
     * and data are known.
     */
    t.prototype.convertToFoundDocument = function(t, e) {
        // If a document is switching state from being an invalid or deleted
        // document to a valid (FOUND_DOCUMENT) document, either due to receiving an
        // update from Watch or due to applying a local set mutation on top
        // of a deleted document, our best guess about its createTime would be the
        // version at which the document transitioned to a FOUND_DOCUMENT.
        return !this.createTime.isEqual(st.min()) || 2 /* DocumentType.NO_DOCUMENT */ !== this.documentType && 0 /* DocumentType.INVALID */ !== this.documentType || (this.createTime = t), 
        this.version = t, this.documentType = 1 /* DocumentType.FOUND_DOCUMENT */ , this.data = e, 
        this.documentState = 0 /* DocumentState.SYNCED */ , this;
    }, 
    /**
     * Changes the document type to indicate that it doesn't exist at the given
     * version.
     */
    t.prototype.convertToNoDocument = function(t) {
        return this.version = t, this.documentType = 2 /* DocumentType.NO_DOCUMENT */ , 
        this.data = hn.empty(), this.documentState = 0 /* DocumentState.SYNCED */ , this;
    }, 
    /**
     * Changes the document type to indicate that it exists at a given version but
     * that its data is not known (e.g. a document that was updated without a known
     * base document).
     */
    t.prototype.convertToUnknownDocument = function(t) {
        return this.version = t, this.documentType = 3 /* DocumentType.UNKNOWN_DOCUMENT */ , 
        this.data = hn.empty(), this.documentState = 2 /* DocumentState.HAS_COMMITTED_MUTATIONS */ , 
        this;
    }, t.prototype.setHasCommittedMutations = function() {
        return this.documentState = 2 /* DocumentState.HAS_COMMITTED_MUTATIONS */ , this;
    }, t.prototype.setHasLocalMutations = function() {
        return this.documentState = 1 /* DocumentState.HAS_LOCAL_MUTATIONS */ , this.version = st.min(), 
        this;
    }, t.prototype.setReadTime = function(t) {
        return this.readTime = t, this;
    }, Object.defineProperty(t.prototype, "hasLocalMutations", {
        get: function() {
            return 1 /* DocumentState.HAS_LOCAL_MUTATIONS */ === this.documentState;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "hasCommittedMutations", {
        get: function() {
            return 2 /* DocumentState.HAS_COMMITTED_MUTATIONS */ === this.documentState;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "hasPendingWrites", {
        get: function() {
            return this.hasLocalMutations || this.hasCommittedMutations;
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype.isValidDocument = function() {
        return 0 /* DocumentType.INVALID */ !== this.documentType;
    }, t.prototype.isFoundDocument = function() {
        return 1 /* DocumentType.FOUND_DOCUMENT */ === this.documentType;
    }, t.prototype.isNoDocument = function() {
        return 2 /* DocumentType.NO_DOCUMENT */ === this.documentType;
    }, t.prototype.isUnknownDocument = function() {
        return 3 /* DocumentType.UNKNOWN_DOCUMENT */ === this.documentType;
    }, t.prototype.isEqual = function(e) {
        return e instanceof t && this.key.isEqual(e.key) && this.version.isEqual(e.version) && this.documentType === e.documentType && this.documentState === e.documentState && this.data.isEqual(e.data);
    }, t.prototype.mutableCopy = function() {
        return new t(this.key, this.documentType, this.version, this.readTime, this.createTime, this.data.clone(), this.documentState);
    }, t.prototype.toString = function() {
        return "Document(".concat(this.key, ", ").concat(this.version, ", ").concat(JSON.stringify(this.data.value), ", {createTime: ").concat(this.createTime, "}), {documentType: ").concat(this.documentType, "}), {documentState: ").concat(this.documentState, "})");
    }, t;
}(), pn = function(t, e) {
    this.position = t, this.inclusive = e;
};

/**
 * Compares the value for field `field` in the provided documents. Throws if
 * the field does not exist in both documents.
 */
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Represents a bound of a query.
 *
 * The bound is specified with the given components representing a position and
 * whether it's just before or just after the position (relative to whatever the
 * query order is).
 *
 * The position represents a logical index position for a query. It's a prefix
 * of values for the (potentially implicit) order by clauses of a query.
 *
 * Bound provides a function to determine whether a document comes before or
 * after a bound. This is influenced by whether the position is just before or
 * just after the provided values.
 */ function vn(t, e, n) {
    for (var r = 0, i = 0; i < t.position.length; i++) {
        var o = e[i], a = t.position[i];
        if (r = o.field.isKeyField() ? dt.comparator(dt.fromName(a.referenceValue), n.key) : We(a, n.data.field(o.field)), 
        "desc" /* Direction.DESCENDING */ === o.dir && (r *= -1), 0 !== r) break;
    }
    return r;
}

/**
 * Returns true if a document sorts after a bound using the provided sort
 * order.
 */ function mn(t, e) {
    if (null === t) return null === e;
    if (null === e) return !1;
    if (t.inclusive !== e.inclusive || t.position.length !== e.position.length) return !1;
    for (var n = 0; n < t.position.length; n++) if (!je(t.position[n], e.position[n])) return !1;
    return !0;
}

/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * An ordering on a field, in some Direction. Direction defaults to ASCENDING.
 */ var yn = function(t, e /* Direction.ASCENDING */) {
    void 0 === e && (e = "asc"), this.field = t, this.dir = e;
};

function gn(t, e) {
    return t.dir === e.dir && t.field.isEqual(e.field);
}

/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var wn = function() {}, bn = /** @class */ function(e) {
    function n(t, n, r) {
        var i = this;
        return (i = e.call(this) || this).field = t, i.op = n, i.value = r, i;
    }
    /**
     * Creates a filter based on the provided arguments.
     */    return t(n, e), n.create = function(t, e, r) {
        return t.isKeyField() ? "in" /* Operator.IN */ === e || "not-in" /* Operator.NOT_IN */ === e ? this.createKeyFieldInFilter(t, e, r) : new An(t, e, r) : "array-contains" /* Operator.ARRAY_CONTAINS */ === e ? new Rn(t, r) : "in" /* Operator.IN */ === e ? new Mn(t, r) : "not-in" /* Operator.NOT_IN */ === e ? new Fn(t, r) : "array-contains-any" /* Operator.ARRAY_CONTAINS_ANY */ === e ? new Vn(t, r) : new n(t, e, r);
    }, n.createKeyFieldInFilter = function(t, e, n) {
        return "in" /* Operator.IN */ === e ? new kn(t, n) : new Pn(t, n);
    }, n.prototype.matches = function(t) {
        var e = t.data.field(this.field);
        // Types do not have to match in NOT_EQUAL filters.
                return "!=" /* Operator.NOT_EQUAL */ === this.op ? null !== e && this.matchesComparison(We(e, this.value)) : null !== e && Ke(this.value) === Ke(e) && this.matchesComparison(We(e, this.value));
        // Only compare types with matching backend order (such as double and int).
        }, n.prototype.matchesComparison = function(t) {
        switch (this.op) {
          case "<" /* Operator.LESS_THAN */ :
            return t < 0;

          case "<=" /* Operator.LESS_THAN_OR_EQUAL */ :
            return t <= 0;

          case "==" /* Operator.EQUAL */ :
            return 0 === t;

          case "!=" /* Operator.NOT_EQUAL */ :
            return 0 !== t;

          case ">" /* Operator.GREATER_THAN */ :
            return t > 0;

          case ">=" /* Operator.GREATER_THAN_OR_EQUAL */ :
            return t >= 0;

          default:
            return U();
        }
    }, n.prototype.isInequality = function() {
        return [ "<" /* Operator.LESS_THAN */ , "<=" /* Operator.LESS_THAN_OR_EQUAL */ , ">" /* Operator.GREATER_THAN */ , ">=" /* Operator.GREATER_THAN_OR_EQUAL */ , "!=" /* Operator.NOT_EQUAL */ , "not-in" /* Operator.NOT_IN */ ].indexOf(this.op) >= 0;
    }, n.prototype.getFlattenedFilters = function() {
        return [ this ];
    }, n.prototype.getFilters = function() {
        return [ this ];
    }, n;
}(wn), In = /** @class */ function(e) {
    function n(t, n) {
        var r = this;
        return (r = e.call(this) || this).filters = t, r.op = n, r.ue = null, r;
    }
    /**
     * Creates a filter based on the provided arguments.
     */    return t(n, e), n.create = function(t, e) {
        return new n(t, e);
    }, n.prototype.matches = function(t) {
        return _n(this) ? void 0 === this.filters.find((function(e) {
            return !e.matches(t);
        })) : void 0 !== this.filters.find((function(e) {
            return e.matches(t);
        }));
    }, n.prototype.getFlattenedFilters = function() {
        return null !== this.ue || (this.ue = this.filters.reduce((function(t, e) {
            return t.concat(e.getFlattenedFilters());
        }), [])), this.ue;
    }, 
    // Returns a mutable copy of `this.filters`
    n.prototype.getFilters = function() {
        return Object.assign([], this.filters);
    }, n;
}(wn);

function _n(t) {
    return "and" /* CompositeOperator.AND */ === t.op;
}

function En(t) {
    return "or" /* CompositeOperator.OR */ === t.op;
}

/**
 * Returns true if this filter is a conjunction of field filters only. Returns false otherwise.
 */ function Tn(t) {
    return Sn(t) && _n(t);
}

/**
 * Returns true if this filter does not contain any composite filters. Returns false otherwise.
 */ function Sn(t) {
    for (var e = 0, n = t.filters; e < n.length; e++) {
        if (n[e] instanceof In) return !1;
    }
    return !0;
}

function xn(t) {
    if (t instanceof bn) 
    // TODO(b/29183165): Technically, this won't be unique if two values have
    // the same description, such as the int 3 and the string "3". So we should
    // add the types in here somehow, too.
    return t.field.canonicalString() + t.op.toString() + He(t.value);
    if (Tn(t)) 
    // Older SDK versions use an implicit AND operation between their filters.
    // In the new SDK versions, the developer may use an explicit AND filter.
    // To stay consistent with the old usages, we add a special case to ensure
    // the canonical ID for these two are the same. For example:
    // `col.whereEquals("a", 1).whereEquals("b", 2)` should have the same
    // canonical ID as `col.where(and(equals("a",1), equals("b",2)))`.
    return t.filters.map((function(t) {
        return xn(t);
    })).join(",");
    // filter instanceof CompositeFilter
    var e = t.filters.map((function(t) {
        return xn(t);
    })).join(",");
    return "".concat(t.op, "(").concat(e, ")");
}

function Cn(t, e) {
    return t instanceof bn ? function(t, e) {
        return e instanceof bn && t.op === e.op && t.field.isEqual(e.field) && je(t.value, e.value);
    }(t, e) : t instanceof In ? function(t, e) {
        return e instanceof In && t.op === e.op && t.filters.length === e.filters.length && t.filters.reduce((function(t, n, r) {
            return t && Cn(n, e.filters[r]);
        }), !0);
    }(t, e) : void U();
}

function Dn(t, e) {
    var n = t.filters.concat(e);
    return In.create(n, t.op);
}

/** Returns a debug description for `filter`. */ function Nn(t) {
    return t instanceof bn ? function(t) {
        return "".concat(t.field.canonicalString(), " ").concat(t.op, " ").concat(He(t.value));
    }(t) : t instanceof In ? function(t) {
        return t.op.toString() + " {" + t.getFilters().map(Nn).join(" ,") + "}";
    }(t) : "Filter";
}

var An = /** @class */ function(e) {
    function n(t, n, r) {
        var i = this;
        return (i = e.call(this, t, n, r) || this).key = dt.fromName(r.referenceValue), 
        i;
    }
    return t(n, e), n.prototype.matches = function(t) {
        var e = dt.comparator(t.key, this.key);
        return this.matchesComparison(e);
    }, n;
}(bn), kn = /** @class */ function(e) {
    function n(t, n) {
        var r = this;
        return (r = e.call(this, t, "in" /* Operator.IN */ , n) || this).keys = On("in" /* Operator.IN */ , n), 
        r;
    }
    return t(n, e), n.prototype.matches = function(t) {
        return this.keys.some((function(e) {
            return e.isEqual(t.key);
        }));
    }, n;
}(bn), Pn = /** @class */ function(e) {
    function n(t, n) {
        var r = this;
        return (r = e.call(this, t, "not-in" /* Operator.NOT_IN */ , n) || this).keys = On("not-in" /* Operator.NOT_IN */ , n), 
        r;
    }
    return t(n, e), n.prototype.matches = function(t) {
        return !this.keys.some((function(e) {
            return e.isEqual(t.key);
        }));
    }, n;
}(bn);

/** Filter that matches on key fields within an array. */ function On(t, e) {
    var n;
    return ((null === (n = e.arrayValue) || void 0 === n ? void 0 : n.values) || []).map((function(t) {
        return dt.fromName(t.referenceValue);
    }));
}

/** A Filter that implements the array-contains operator. */ var Rn = /** @class */ function(e) {
    function n(t, n) {
        return e.call(this, t, "array-contains" /* Operator.ARRAY_CONTAINS */ , n) || this;
    }
    return t(n, e), n.prototype.matches = function(t) {
        var e = t.data.field(this.field);
        return tn(e) && Qe(e.arrayValue, this.value);
    }, n;
}(bn), Mn = /** @class */ function(e) {
    function n(t, n) {
        return e.call(this, t, "in" /* Operator.IN */ , n) || this;
    }
    return t(n, e), n.prototype.matches = function(t) {
        var e = t.data.field(this.field);
        return null !== e && Qe(this.value.arrayValue, e);
    }, n;
}(bn), Fn = /** @class */ function(e) {
    function n(t, n) {
        return e.call(this, t, "not-in" /* Operator.NOT_IN */ , n) || this;
    }
    return t(n, e), n.prototype.matches = function(t) {
        if (Qe(this.value.arrayValue, {
            nullValue: "NULL_VALUE"
        })) return !1;
        var e = t.data.field(this.field);
        return null !== e && !Qe(this.value.arrayValue, e);
    }, n;
}(bn), Vn = /** @class */ function(e) {
    function n(t, n) {
        return e.call(this, t, "array-contains-any" /* Operator.ARRAY_CONTAINS_ANY */ , n) || this;
    }
    return t(n, e), n.prototype.matches = function(t) {
        var e = this, n = t.data.field(this.field);
        return !(!tn(n) || !n.arrayValue.values) && n.arrayValue.values.some((function(t) {
            return Qe(e.value.arrayValue, t);
        }));
    }, n;
}(bn), Ln = function(t, e, n, r, i, o, a) {
    void 0 === e && (e = null), void 0 === n && (n = []), void 0 === r && (r = []), 
    void 0 === i && (i = null), void 0 === o && (o = null), void 0 === a && (a = null), 
    this.path = t, this.collectionGroup = e, this.orderBy = n, this.filters = r, this.limit = i, 
    this.startAt = o, this.endAt = a, this.ce = null;
};

/** A Filter that implements the IN operator. */
/**
 * Initializes a Target with a path and optional additional query constraints.
 * Path must currently be empty if this is a collection group query.
 *
 * NOTE: you should always construct `Target` from `Query.toTarget` instead of
 * using this factory method, because `Query` provides an implicit `orderBy`
 * property.
 */
function qn(t, e, n, r, i, o, a) {
    return void 0 === e && (e = null), void 0 === n && (n = []), void 0 === r && (r = []), 
    void 0 === i && (i = null), void 0 === o && (o = null), void 0 === a && (a = null), 
    new Ln(t, e, n, r, i, o, a);
}

function Un(t) {
    var e = G(t);
    if (null === e.ce) {
        var n = e.path.canonicalString();
        null !== e.collectionGroup && (n += "|cg:" + e.collectionGroup), n += "|f:", n += e.filters.map((function(t) {
            return xn(t);
        })).join(","), n += "|ob:", n += e.orderBy.map((function(t) {
            return function(t) {
                // TODO(b/29183165): Make this collision robust.
                return t.field.canonicalString() + t.dir;
            }(t);
        })).join(","), Bt(e.limit) || (n += "|l:", n += e.limit), e.startAt && (n += "|lb:", 
        n += e.startAt.inclusive ? "b:" : "a:", n += e.startAt.position.map((function(t) {
            return He(t);
        })).join(",")), e.endAt && (n += "|ub:", n += e.endAt.inclusive ? "a:" : "b:", n += e.endAt.position.map((function(t) {
            return He(t);
        })).join(",")), e.ce = n;
    }
    return e.ce;
}

function Bn(t, e) {
    if (t.limit !== e.limit) return !1;
    if (t.orderBy.length !== e.orderBy.length) return !1;
    for (var n = 0; n < t.orderBy.length; n++) if (!gn(t.orderBy[n], e.orderBy[n])) return !1;
    if (t.filters.length !== e.filters.length) return !1;
    for (var r = 0; r < t.filters.length; r++) if (!Cn(t.filters[r], e.filters[r])) return !1;
    return t.collectionGroup === e.collectionGroup && !!t.path.isEqual(e.path) && !!mn(t.startAt, e.startAt) && mn(t.endAt, e.endAt);
}

function zn(t) {
    return dt.isDocumentKey(t.path) && null === t.collectionGroup && 0 === t.filters.length;
}

/** Returns the field filters that target the given field path. */ function Gn(t, e) {
    return t.filters.filter((function(t) {
        return t instanceof bn && t.field.isEqual(e);
    }));
}

/**
 * Returns the values that are used in ARRAY_CONTAINS or ARRAY_CONTAINS_ANY
 * filters. Returns `null` if there are no such filters.
 */
/**
 * Returns the value to use as the lower bound for ascending index segment at
 * the provided `fieldPath` (or the upper bound for an descending segment).
 */ function Kn(t, e, n) {
    // Process all filters to find a value for the current field segment
    for (var r = Ge, i = !0, o = 0, a = Gn(t, e); o < a.length; o++) {
        var u = a[o], s = Ge, c = !0;
        switch (u.op) {
          case "<" /* Operator.LESS_THAN */ :
          case "<=" /* Operator.LESS_THAN_OR_EQUAL */ :
            s = un(u.value);
            break;

          case "==" /* Operator.EQUAL */ :
          case "in" /* Operator.IN */ :
          case ">=" /* Operator.GREATER_THAN_OR_EQUAL */ :
            s = u.value;
            break;

          case ">" /* Operator.GREATER_THAN */ :
            s = u.value, c = !1;
            break;

          case "!=" /* Operator.NOT_EQUAL */ :
          case "not-in" /* Operator.NOT_IN */ :
            s = Ge;
            // Remaining filters cannot be used as lower bounds.
                }
        cn({
            value: r,
            inclusive: i
        }, {
            value: s,
            inclusive: c
        }) < 0 && (r = s, i = c);
    }
    // If there is an additional bound, compare the values against the existing
    // range to see if we can narrow the scope.
        if (null !== n) for (var l = 0; l < t.orderBy.length; ++l) if (t.orderBy[l].field.isEqual(e)) {
        var h = n.position[l];
        cn({
            value: r,
            inclusive: i
        }, {
            value: h,
            inclusive: n.inclusive
        }) < 0 && (r = h, i = n.inclusive);
        break;
    }
    return {
        value: r,
        inclusive: i
    };
}

/**
 * Returns the value to use as the upper bound for ascending index segment at
 * the provided `fieldPath` (or the lower bound for a descending segment).
 */ function jn(t, e, n) {
    // Process all filters to find a value for the current field segment
    for (var r = ze, i = !0, o = 0, a = Gn(t, e); o < a.length; o++) {
        var u = a[o], s = ze, c = !0;
        switch (u.op) {
          case ">=" /* Operator.GREATER_THAN_OR_EQUAL */ :
          case ">" /* Operator.GREATER_THAN */ :
            s = sn(u.value), c = !1;
            break;

          case "==" /* Operator.EQUAL */ :
          case "in" /* Operator.IN */ :
          case "<=" /* Operator.LESS_THAN_OR_EQUAL */ :
            s = u.value;
            break;

          case "<" /* Operator.LESS_THAN */ :
            s = u.value, c = !1;
            break;

          case "!=" /* Operator.NOT_EQUAL */ :
          case "not-in" /* Operator.NOT_IN */ :
            s = ze;
            // Remaining filters cannot be used as upper bounds.
                }
        ln({
            value: r,
            inclusive: i
        }, {
            value: s,
            inclusive: c
        }) > 0 && (r = s, i = c);
    }
    // If there is an additional bound, compare the values against the existing
    // range to see if we can narrow the scope.
        if (null !== n) for (var l = 0; l < t.orderBy.length; ++l) if (t.orderBy[l].field.isEqual(e)) {
        var h = n.position[l];
        ln({
            value: r,
            inclusive: i
        }, {
            value: h,
            inclusive: n.inclusive
        }) > 0 && (r = h, i = n.inclusive);
        break;
    }
    return {
        value: r,
        inclusive: i
    };
}

/** Returns the number of segments of a perfect index for this target. */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Query encapsulates all the query attributes we support in the SDK. It can
 * be run against the LocalStore, as well as be converted to a `Target` to
 * query the RemoteStore results.
 *
 * Visible for testing.
 */ var Qn = 
/**
     * Initializes a Query with a path and optional additional query constraints.
     * Path must currently be empty if this is a collection group query.
     */
function(t, e, n, r, i, o /* LimitType.First */ , a, u) {
    void 0 === e && (e = null), void 0 === n && (n = []), void 0 === r && (r = []), 
    void 0 === i && (i = null), void 0 === o && (o = "F"), void 0 === a && (a = null), 
    void 0 === u && (u = null), this.path = t, this.collectionGroup = e, this.explicitOrderBy = n, 
    this.filters = r, this.limit = i, this.limitType = o, this.startAt = a, this.endAt = u, 
    this.le = null, 
    // The corresponding `Target` of this `Query` instance, for use with
    // non-aggregate queries.
    this.he = null, 
    // The corresponding `Target` of this `Query` instance, for use with
    // aggregate queries. Unlike targets for non-aggregate queries,
    // aggregate query targets do not contain normalized order-bys, they only
    // contain explicit order-bys.
    this.Pe = null, this.startAt, this.endAt;
};

/** Creates a new Query instance with the options provided. */ function Wn(t, e, n, r, i, o, a, u) {
    return new Qn(t, e, n, r, i, o, a, u);
}

/** Creates a new Query for a query that matches all documents at `path` */ function Yn(t) {
    return new Qn(t);
}

/**
 * Helper to convert a collection group query into a collection query at a
 * specific path. This is used when executing collection group queries, since
 * we have to split the query into a set of collection queries at multiple
 * paths.
 */
/**
 * Returns true if this query does not specify any query constraints that
 * could remove results.
 */ function Hn(t) {
    return 0 === t.filters.length && null === t.limit && null == t.startAt && null == t.endAt && (0 === t.explicitOrderBy.length || 1 === t.explicitOrderBy.length && t.explicitOrderBy[0].field.isKeyField());
}

// Returns the sorted set of inequality filter fields used in this query.
/**
 * Returns whether the query matches a collection group rather than a specific
 * collection.
 */ function Jn(t) {
    return null !== t.collectionGroup;
}

/**
 * Returns the normalized order-by constraint that is used to execute the Query,
 * which can be different from the order-by constraints the user provided (e.g.
 * the SDK and backend always orders by `__name__`). The normalized order-by
 * includes implicit order-bys in addition to the explicit user provided
 * order-bys.
 */ function Xn(t) {
    var e = G(t);
    if (null === e.le) {
        e.le = [];
        // Any explicit order by fields should be added as is.
        for (var n = new Set, r = 0, i = e.explicitOrderBy; r < i.length; r++) {
            var o = i[r];
            e.le.push(o), n.add(o.field.canonicalString());
        }
        // The order of the implicit ordering always matches the last explicit order by.
                var a = e.explicitOrderBy.length > 0 ? e.explicitOrderBy[e.explicitOrderBy.length - 1].dir : "asc" /* Direction.ASCENDING */ , u = function(t) {
            var e = new xe(ft.comparator);
            return t.filters.forEach((function(t) {
                t.getFlattenedFilters().forEach((function(t) {
                    t.isInequality() && (e = e.add(t.field));
                }));
            })), e;
        }(e);
        // Any inequality fields not explicitly ordered should be implicitly ordered in a lexicographical
        // order. When there are multiple inequality filters on the same field, the field should be added
        // only once.
        // Note: `SortedSet<FieldPath>` sorts the key field before other fields. However, we want the key
        // field to be sorted last.
                u.forEach((function(t) {
            n.has(t.canonicalString()) || t.isKeyField() || e.le.push(new yn(t, a));
        })), 
        // Add the document key field to the last if it is not explicitly ordered.
        n.has(ft.keyField().canonicalString()) || e.le.push(new yn(ft.keyField(), a));
    }
    return e.le;
}

/**
 * Converts this `Query` instance to its corresponding `Target` representation.
 */ function Zn(t) {
    var e = G(t);
    return e.he || (e.he = $n(e, Xn(t))), e.he
    /**
 * Converts this `Query` instance to its corresponding `Target` representation,
 * for use within an aggregate query. Unlike targets for non-aggregate queries,
 * aggregate query targets do not contain normalized order-bys, they only
 * contain explicit order-bys.
 */;
}

function $n(t, e) {
    if ("F" /* LimitType.First */ === t.limitType) return qn(t.path, t.collectionGroup, e, t.filters, t.limit, t.startAt, t.endAt);
    // Flip the orderBy directions since we want the last results
    e = e.map((function(t) {
        var e = "desc" /* Direction.DESCENDING */ === t.dir ? "asc" /* Direction.ASCENDING */ : "desc" /* Direction.DESCENDING */;
        return new yn(t.field, e);
    }));
    // We need to swap the cursors to match the now-flipped query ordering.
    var n = t.endAt ? new pn(t.endAt.position, t.endAt.inclusive) : null, r = t.startAt ? new pn(t.startAt.position, t.startAt.inclusive) : null;
    // Now return as a LimitType.First query.
        return qn(t.path, t.collectionGroup, e, t.filters, t.limit, n, r);
}

function tr(t, e) {
    var n = t.filters.concat([ e ]);
    return new Qn(t.path, t.collectionGroup, t.explicitOrderBy.slice(), n, t.limit, t.limitType, t.startAt, t.endAt);
}

function er(t, e, n) {
    return new Qn(t.path, t.collectionGroup, t.explicitOrderBy.slice(), t.filters.slice(), e, n, t.startAt, t.endAt);
}

function nr(t, e) {
    return Bn(Zn(t), Zn(e)) && t.limitType === e.limitType;
}

// TODO(b/29183165): This is used to get a unique string from a query to, for
// example, use as a dictionary key, but the implementation is subject to
// collisions. Make it collision-free.
function rr(t) {
    return "".concat(Un(Zn(t)), "|lt:").concat(t.limitType);
}

function ir(t) {
    return "Query(target=".concat(function(t) {
        var e = t.path.canonicalString();
        return null !== t.collectionGroup && (e += " collectionGroup=" + t.collectionGroup), 
        t.filters.length > 0 && (e += ", filters: [".concat(t.filters.map((function(t) {
            return Nn(t);
        })).join(", "), "]")), Bt(t.limit) || (e += ", limit: " + t.limit), t.orderBy.length > 0 && (e += ", orderBy: [".concat(t.orderBy.map((function(t) {
            return function(t) {
                return "".concat(t.field.canonicalString(), " (").concat(t.dir, ")");
            }(t);
        })).join(", "), "]")), t.startAt && (e += ", startAt: ", e += t.startAt.inclusive ? "b:" : "a:", 
        e += t.startAt.position.map((function(t) {
            return He(t);
        })).join(",")), t.endAt && (e += ", endAt: ", e += t.endAt.inclusive ? "a:" : "b:", 
        e += t.endAt.position.map((function(t) {
            return He(t);
        })).join(",")), "Target(".concat(e, ")");
    }(Zn(t)), "; limitType=").concat(t.limitType, ")");
}

/** Returns whether `doc` matches the constraints of `query`. */ function or(t, e) {
    return e.isFoundDocument() && function(t, e) {
        var n = e.key.path;
        return null !== t.collectionGroup ? e.key.hasCollectionId(t.collectionGroup) && t.path.isPrefixOf(n) : dt.isDocumentKey(t.path) ? t.path.isEqual(n) : t.path.isImmediateParentOf(n);
    }(t, e) && function(t, e) {
        // We must use `queryNormalizedOrderBy()` to get the list of all orderBys (both implicit and explicit).
        // Note that for OR queries, orderBy applies to all disjunction terms and implicit orderBys must
        // be taken into account. For example, the query "a > 1 || b==1" has an implicit "orderBy a" due
        // to the inequality, and is evaluated as "a > 1 orderBy a || b==1 orderBy a".
        // A document with content of {b:1} matches the filters, but does not match the orderBy because
        // it's missing the field 'a'.
        for (var n = 0, r = Xn(t); n < r.length; n++) {
            var i = r[n];
            // order-by key always matches
                        if (!i.field.isKeyField() && null === e.data.field(i.field)) return !1;
        }
        return !0;
    }(t, e) && function(t, e) {
        for (var n = 0, r = t.filters; n < r.length; n++) {
            if (!r[n].matches(e)) return !1;
        }
        return !0;
    }(t, e) && function(t, e) {
        return !(t.startAt && 
        /**
 * Returns true if a document sorts before a bound using the provided sort
 * order.
 */
        !function(t, e, n) {
            var r = vn(t, e, n);
            return t.inclusive ? r <= 0 : r < 0;
        }(t.startAt, Xn(t), e)) && !(t.endAt && !function(t, e, n) {
            var r = vn(t, e, n);
            return t.inclusive ? r >= 0 : r > 0;
        }(t.endAt, Xn(t), e));
    }(t, e);
}

function ar(t) {
    return t.collectionGroup || (t.path.length % 2 == 1 ? t.path.lastSegment() : t.path.get(t.path.length - 2));
}

/**
 * Returns a new comparator function that can be used to compare two documents
 * based on the Query's ordering constraint.
 */ function ur(t) {
    return function(e, n) {
        for (var r = !1, i = 0, o = Xn(t); i < o.length; i++) {
            var a = o[i], u = sr(a, e, n);
            if (0 !== u) return u;
            r = r || a.field.isKeyField();
        }
        return 0;
    };
}

function sr(t, e, n) {
    var r = t.field.isKeyField() ? dt.comparator(e.key, n.key) : function(t, e, n) {
        var r = e.data.field(t), i = n.data.field(t);
        return null !== r && null !== i ? We(r, i) : U();
    }(t.field, e, n);
    switch (t.dir) {
      case "asc" /* Direction.ASCENDING */ :
        return r;

      case "desc" /* Direction.DESCENDING */ :
        return -1 * r;

      default:
        return U();
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A map implementation that uses objects as keys. Objects must have an
 * associated equals function and must be immutable. Entries in the map are
 * stored together with the key being produced from the mapKeyFn. This map
 * automatically handles collisions of keys.
 */ var cr = /** @class */ function() {
    function t(t, e) {
        this.mapKeyFn = t, this.equalsFn = e, 
        /**
             * The inner map for a key/value pair. Due to the possibility of collisions we
             * keep a list of entries that we do a linear search through to find an actual
             * match. Note that collisions should be rare, so we still expect near
             * constant time lookups in practice.
             */
        this.inner = {}, 
        /** The number of entries stored in the map */
        this.innerSize = 0
        /** Get a value for this key, or undefined if it does not exist. */;
    }
    return t.prototype.get = function(t) {
        var e = this.mapKeyFn(t), n = this.inner[e];
        if (void 0 !== n) for (var r = 0, i = n; r < i.length; r++) {
            var o = i[r], a = o[0], u = o[1];
            if (this.equalsFn(a, t)) return u;
        }
    }, t.prototype.has = function(t) {
        return void 0 !== this.get(t);
    }, 
    /** Put this key and value in the map. */ t.prototype.set = function(t, e) {
        var n = this.mapKeyFn(t), r = this.inner[n];
        if (void 0 === r) return this.inner[n] = [ [ t, e ] ], void this.innerSize++;
        for (var i = 0; i < r.length; i++) if (this.equalsFn(r[i][0], t)) 
        // This is updating an existing entry and does not increase `innerSize`.
        return void (r[i] = [ t, e ]);
        r.push([ t, e ]), this.innerSize++;
    }, 
    /**
     * Remove this key from the map. Returns a boolean if anything was deleted.
     */
    t.prototype.delete = function(t) {
        var e = this.mapKeyFn(t), n = this.inner[e];
        if (void 0 === n) return !1;
        for (var r = 0; r < n.length; r++) if (this.equalsFn(n[r][0], t)) return 1 === n.length ? delete this.inner[e] : n.splice(r, 1), 
        this.innerSize--, !0;
        return !1;
    }, t.prototype.forEach = function(t) {
        Ie(this.inner, (function(e, n) {
            for (var r = 0, i = n; r < i.length; r++) {
                var o = i[r], a = o[0], u = o[1];
                t(a, u);
            }
        }));
    }, t.prototype.isEmpty = function() {
        return _e(this.inner);
    }, t.prototype.size = function() {
        return this.innerSize;
    }, t;
}(), lr = new Ee(dt.comparator);

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function hr() {
    return lr;
}

var fr = new Ee(dt.comparator);

function dr() {
    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
    for (var n = fr, r = 0, i = t; r < i.length; r++) {
        var o = i[r];
        n = n.insert(o.key, o);
    }
    return n;
}

function pr(t) {
    var e = fr;
    return t.forEach((function(t, n) {
        return e = e.insert(t, n.overlayedDocument);
    })), e;
}

function vr() {
    return yr();
}

function mr() {
    return yr();
}

function yr() {
    return new cr((function(t) {
        return t.toString();
    }), (function(t, e) {
        return t.isEqual(e);
    }));
}

var gr = new Ee(dt.comparator), wr = new xe(dt.comparator);

function br() {
    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
    for (var n = wr, r = 0, i = t; r < i.length; r++) {
        var o = i[r];
        n = n.add(o);
    }
    return n;
}

var Ir = new xe(it);

function _r() {
    return Ir;
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Returns an DoubleValue for `value` that is encoded based the serializer's
 * `useProto3Json` setting.
 */ function Er(t, e) {
    if (t.useProto3Json) {
        if (isNaN(e)) return {
            doubleValue: "NaN"
        };
        if (e === 1 / 0) return {
            doubleValue: "Infinity"
        };
        if (e === -1 / 0) return {
            doubleValue: "-Infinity"
        };
    }
    return {
        doubleValue: zt(e) ? "-0" : e
    };
}

/**
 * Returns an IntegerValue for `value`.
 */ function Tr(t) {
    return {
        integerValue: "" + t
    };
}

/**
 * Returns a value for a number that's appropriate to put into a proto.
 * The return value is an IntegerValue if it can safely represent the value,
 * otherwise a DoubleValue is returned.
 */ function Sr(t, e) {
    return Gt(e) ? Tr(e) : Er(t, e);
}

/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/** Used to represent a field transform on a mutation. */ var xr = function() {
    // Make sure that the structural type of `TransformOperation` is unique.
    // See https://github.com/microsoft/TypeScript/issues/5451
    this._ = void 0;
};

/**
 * Computes the local transform result against the provided `previousValue`,
 * optionally using the provided localWriteTime.
 */ function Cr(t, e, n) {
    return t instanceof Ar ? function(t, e) {
        var n = {
            fields: {
                __type__: {
                    stringValue: "server_timestamp"
                },
                __local_write_time__: {
                    timestampValue: {
                        seconds: t.seconds,
                        nanos: t.nanoseconds
                    }
                }
            }
        };
        // We should avoid storing deeply nested server timestamp map values
        // because we never use the intermediate "previous values".
        // For example:
        // previous: 42L, add: t1, result: t1 -> 42L
        // previous: t1,  add: t2, result: t2 -> 42L (NOT t2 -> t1 -> 42L)
        // previous: t2,  add: t3, result: t3 -> 42L (NOT t3 -> t2 -> t1 -> 42L)
        // `getPreviousValue` recursively traverses server timestamps to find the
        // least recent Value.
                return e && Ve(e) && (e = Le(e)), e && (n.fields.__previous_value__ = e), 
        {
            mapValue: n
        };
    }(n, e) : t instanceof kr ? Pr(t, e) : t instanceof Or ? Rr(t, e) : function(t, e) {
        // PORTING NOTE: Since JavaScript's integer arithmetic is limited to 53 bit
        // precision and resolves overflows by reducing precision, we do not
        // manually cap overflows at 2^63.
        var n = Nr(t, e), r = Fr(n) + Fr(t.Ie);
        return $e(n) && $e(t.Ie) ? Tr(r) : Er(t.serializer, r);
    }(t, e);
}

/**
 * Computes a final transform result after the transform has been acknowledged
 * by the server, potentially using the server-provided transformResult.
 */ function Dr(t, e, n) {
    // The server just sends null as the transform result for array operations,
    // so we have to calculate a result the same as we do for local
    // applications.
    return t instanceof kr ? Pr(t, e) : t instanceof Or ? Rr(t, e) : n;
}

/**
 * If this transform operation is not idempotent, returns the base value to
 * persist for this transform. If a base value is returned, the transform
 * operation is always applied to this base value, even if document has
 * already been updated.
 *
 * Base values provide consistent behavior for non-idempotent transforms and
 * allow us to return the same latency-compensated value even if the backend
 * has already applied the transform operation. The base value is null for
 * idempotent transforms, as they can be re-played even if the backend has
 * already applied them.
 *
 * @returns a base value to store along with the mutation, or null for
 * idempotent transforms.
 */ function Nr(t, e) {
    return t instanceof Mr ? 
    /** Returns true if `value` is either an IntegerValue or a DoubleValue. */
    function(t) {
        return $e(t) || function(t) {
            return !!t && "doubleValue" in t;
        }(t);
    }(e) ? e : {
        integerValue: 0
    } : null;
}

/** Transforms a value into a server-generated timestamp. */ var Ar = /** @class */ function(e) {
    function n() {
        return null !== e && e.apply(this, arguments) || this;
    }
    return t(n, e), n;
}(xr), kr = /** @class */ function(e) {
    function n(t) {
        var n = this;
        return (n = e.call(this) || this).elements = t, n;
    }
    return t(n, e), n;
}(xr);

/** Transforms an array value via a union operation. */ function Pr(t, e) {
    for (var n = Vr(e), r = function(t) {
        n.some((function(e) {
            return je(e, t);
        })) || n.push(t);
    }, i = 0, o = t.elements; i < o.length; i++) {
        r(o[i]);
    }
    return {
        arrayValue: {
            values: n
        }
    };
}

/** Transforms an array value via a remove operation. */ var Or = /** @class */ function(e) {
    function n(t) {
        var n = this;
        return (n = e.call(this) || this).elements = t, n;
    }
    return t(n, e), n;
}(xr);

function Rr(t, e) {
    for (var n = Vr(e), r = function(t) {
        n = n.filter((function(e) {
            return !je(e, t);
        }));
    }, i = 0, o = t.elements; i < o.length; i++) {
        r(o[i]);
    }
    return {
        arrayValue: {
            values: n
        }
    };
}

/**
 * Implements the backend semantics for locally computed NUMERIC_ADD (increment)
 * transforms. Converts all field values to integers or doubles, but unlike the
 * backend does not cap integer values at 2^63. Instead, JavaScript number
 * arithmetic is used and precision loss can occur for values greater than 2^53.
 */ var Mr = /** @class */ function(e) {
    function n(t, n) {
        var r = this;
        return (r = e.call(this) || this).serializer = t, r.Ie = n, r;
    }
    return t(n, e), n;
}(xr);

function Fr(t) {
    return Me(t.integerValue || t.doubleValue);
}

function Vr(t) {
    return tn(t) && t.arrayValue.values ? t.arrayValue.values.slice() : [];
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/** A field path and the TransformOperation to perform upon it. */ var Lr = function(t, e) {
    this.field = t, this.transform = e;
};

/** The result of successfully applying a mutation to the backend. */
var qr = function(
/**
     * The version at which the mutation was committed:
     *
     * - For most operations, this is the updateTime in the WriteResult.
     * - For deletes, the commitTime of the WriteResponse (because deletes are
     *   not stored and have no updateTime).
     *
     * Note that these versions can be different: No-op writes will not change
     * the updateTime even though the commitTime advances.
     */
t, 
/**
     * The resulting fields returned from the backend after a mutation
     * containing field transforms has been committed. Contains one FieldValue
     * for each FieldTransform that was in the mutation.
     *
     * Will be empty if the mutation did not contain any field transforms.
     */
e) {
    this.version = t, this.transformResults = e;
}, Ur = /** @class */ function() {
    function t(t, e) {
        this.updateTime = t, this.exists = e
        /** Creates a new empty Precondition. */;
    }
    return t.none = function() {
        return new t;
    }, 
    /** Creates a new Precondition with an exists flag. */ t.exists = function(e) {
        return new t(void 0, e);
    }, 
    /** Creates a new Precondition based on a version a document exists at. */ t.updateTime = function(e) {
        return new t(e);
    }, Object.defineProperty(t.prototype, "isNone", {
        /** Returns whether this Precondition is empty. */ get: function() {
            return void 0 === this.updateTime && void 0 === this.exists;
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype.isEqual = function(t) {
        return this.exists === t.exists && (this.updateTime ? !!t.updateTime && this.updateTime.isEqual(t.updateTime) : !t.updateTime);
    }, t;
}();

/**
 * Encodes a precondition for a mutation. This follows the model that the
 * backend accepts with the special case of an explicit "empty" precondition
 * (meaning no precondition).
 */
/** Returns true if the preconditions is valid for the given document. */ function Br(t, e) {
    return void 0 !== t.updateTime ? e.isFoundDocument() && e.version.isEqual(t.updateTime) : void 0 === t.exists || t.exists === e.isFoundDocument();
}

/**
 * A mutation describes a self-contained change to a document. Mutations can
 * create, replace, delete, and update subsets of documents.
 *
 * Mutations not only act on the value of the document but also its version.
 *
 * For local mutations (mutations that haven't been committed yet), we preserve
 * the existing version for Set and Patch mutations. For Delete mutations, we
 * reset the version to 0.
 *
 * Here's the expected transition table.
 *
 * MUTATION           APPLIED TO            RESULTS IN
 *
 * SetMutation        Document(v3)          Document(v3)
 * SetMutation        NoDocument(v3)        Document(v0)
 * SetMutation        InvalidDocument(v0)   Document(v0)
 * PatchMutation      Document(v3)          Document(v3)
 * PatchMutation      NoDocument(v3)        NoDocument(v3)
 * PatchMutation      InvalidDocument(v0)   UnknownDocument(v3)
 * DeleteMutation     Document(v3)          NoDocument(v0)
 * DeleteMutation     NoDocument(v3)        NoDocument(v0)
 * DeleteMutation     InvalidDocument(v0)   NoDocument(v0)
 *
 * For acknowledged mutations, we use the updateTime of the WriteResponse as
 * the resulting version for Set and Patch mutations. As deletes have no
 * explicit update time, we use the commitTime of the WriteResponse for
 * Delete mutations.
 *
 * If a mutation is acknowledged by the backend but fails the precondition check
 * locally, we transition to an `UnknownDocument` and rely on Watch to send us
 * the updated version.
 *
 * Field transforms are used only with Patch and Set Mutations. We use the
 * `updateTransforms` message to store transforms, rather than the `transforms`s
 * messages.
 *
 * ## Subclassing Notes
 *
 * Every type of mutation needs to implement its own applyToRemoteDocument() and
 * applyToLocalView() to implement the actual behavior of applying the mutation
 * to some source document (see `setMutationApplyToRemoteDocument()` for an
 * example).
 */ var zr = function() {};

/**
 * A utility method to calculate a `Mutation` representing the overlay from the
 * final state of the document, and a `FieldMask` representing the fields that
 * are mutated by the local mutations.
 */ function Gr(t, e) {
    if (!t.hasLocalMutations || e && 0 === e.fields.length) return null;
    // mask is null when sets or deletes are applied to the current document.
        if (null === e) return t.isNoDocument() ? new ei(t.key, Ur.none()) : new Yr(t.key, t.data, Ur.none());
    for (var n = t.data, r = hn.empty(), i = new xe(ft.comparator), o = 0, a = e.fields; o < a.length; o++) {
        var u = a[o];
        if (!i.has(u)) {
            var s = n.field(u);
            // If we are deleting a nested field, we take the immediate parent as
            // the mask used to construct the resulting mutation.
            // Justification: Nested fields can create parent fields implicitly. If
            // only a leaf entry is deleted in later mutations, the parent field
            // should still remain, but we may have lost this information.
            // Consider mutation (foo.bar 1), then mutation (foo.bar delete()).
            // This leaves the final result (foo, {}). Despite the fact that `doc`
            // has the correct result, `foo` is not in `mask`, and the resulting
            // mutation would miss `foo`.
                        null === s && u.length > 1 && (u = u.popLast(), s = n.field(u)), null === s ? r.delete(u) : r.set(u, s), 
            i = i.add(u);
        }
    }
    return new Hr(t.key, r, new Ne(i.toArray()), Ur.none());
}

/**
 * Applies this mutation to the given document for the purposes of computing a
 * new remote document. If the input document doesn't match the expected state
 * (e.g. it is invalid or outdated), the document type may transition to
 * unknown.
 *
 * @param mutation - The mutation to apply.
 * @param document - The document to mutate. The input document can be an
 *     invalid document if the client has no knowledge of the pre-mutation state
 *     of the document.
 * @param mutationResult - The result of applying the mutation from the backend.
 */ function Kr(t, e, n) {
    t instanceof Yr ? function(t, e, n) {
        // Unlike setMutationApplyToLocalView, if we're applying a mutation to a
        // remote document the server has accepted the mutation so the precondition
        // must have held.
        var r = t.value.clone(), i = Xr(t.fieldTransforms, e, n.transformResults);
        r.setAll(i), e.convertToFoundDocument(n.version, r).setHasCommittedMutations();
    }(t, e, n) : t instanceof Hr ? function(t, e, n) {
        if (Br(t.precondition, e)) {
            var r = Xr(t.fieldTransforms, e, n.transformResults), i = e.data;
            i.setAll(Jr(t)), i.setAll(r), e.convertToFoundDocument(n.version, i).setHasCommittedMutations();
        } else e.convertToUnknownDocument(n.version);
    }(t, e, n) : function(t, e, n) {
        // Unlike applyToLocalView, if we're applying a mutation to a remote
        // document the server has accepted the mutation so the precondition must
        // have held.
        e.convertToNoDocument(n.version).setHasCommittedMutations();
    }(0, e, n);
}

/**
 * Applies this mutation to the given document for the purposes of computing
 * the new local view of a document. If the input document doesn't match the
 * expected state, the document is not modified.
 *
 * @param mutation - The mutation to apply.
 * @param document - The document to mutate. The input document can be an
 *     invalid document if the client has no knowledge of the pre-mutation state
 *     of the document.
 * @param previousMask - The fields that have been updated before applying this mutation.
 * @param localWriteTime - A timestamp indicating the local write time of the
 *     batch this mutation is a part of.
 * @returns A `FieldMask` representing the fields that are changed by applying this mutation.
 */ function jr(t, e, n, r) {
    return t instanceof Yr ? function(t, e, n, r) {
        if (!Br(t.precondition, e)) 
        // The mutation failed to apply (e.g. a document ID created with add()
        // caused a name collision).
        return n;
        var i = t.value.clone(), o = Zr(t.fieldTransforms, r, e);
        return i.setAll(o), e.convertToFoundDocument(e.version, i).setHasLocalMutations(), 
        null;
        // SetMutation overwrites all fields.
        }(t, e, n, r) : t instanceof Hr ? function(t, e, n, r) {
        if (!Br(t.precondition, e)) return n;
        var i = Zr(t.fieldTransforms, r, e), o = e.data;
        return o.setAll(Jr(t)), o.setAll(i), e.convertToFoundDocument(e.version, o).setHasLocalMutations(), 
        null === n ? null : n.unionWith(t.fieldMask.fields).unionWith(t.fieldTransforms.map((function(t) {
            return t.field;
        })));
    }(t, e, n, r) : function(t, e, n) {
        return Br(t.precondition, e) ? (e.convertToNoDocument(e.version).setHasLocalMutations(), 
        null) : n;
    }(t, e, n);
}

/**
 * If this mutation is not idempotent, returns the base value to persist with
 * this mutation. If a base value is returned, the mutation is always applied
 * to this base value, even if document has already been updated.
 *
 * The base value is a sparse object that consists of only the document
 * fields for which this mutation contains a non-idempotent transformation
 * (e.g. a numeric increment). The provided value guarantees consistent
 * behavior for non-idempotent transforms and allow us to return the same
 * latency-compensated value even if the backend has already applied the
 * mutation. The base value is null for idempotent mutations, as they can be
 * re-played even if the backend has already applied them.
 *
 * @returns a base value to store along with the mutation, or null for
 * idempotent mutations.
 */ function Qr(t, e) {
    for (var n = null, r = 0, i = t.fieldTransforms; r < i.length; r++) {
        var o = i[r], a = e.data.field(o.field), u = Nr(o.transform, a || null);
        null != u && (null === n && (n = hn.empty()), n.set(o.field, u));
    }
    return n || null;
}

function Wr(t, e) {
    return t.type === e.type && !!t.key.isEqual(e.key) && !!t.precondition.isEqual(e.precondition) && !!function(t, e) {
        return void 0 === t && void 0 === e || !(!t || !e) && ot(t, e, (function(t, e) {
            return function(t, e) {
                return t.field.isEqual(e.field) && function(t, e) {
                    return t instanceof kr && e instanceof kr || t instanceof Or && e instanceof Or ? ot(t.elements, e.elements, je) : t instanceof Mr && e instanceof Mr ? je(t.Ie, e.Ie) : t instanceof Ar && e instanceof Ar;
                }(t.transform, e.transform);
            }(t, e);
        }));
    }(t.fieldTransforms, e.fieldTransforms) && (0 /* MutationType.Set */ === t.type ? t.value.isEqual(e.value) : 1 /* MutationType.Patch */ !== t.type || t.data.isEqual(e.data) && t.fieldMask.isEqual(e.fieldMask));
}

/**
 * A mutation that creates or replaces the document at the given key with the
 * object value contents.
 */ var Yr = /** @class */ function(e) {
    function n(t, n, r, i) {
        void 0 === i && (i = []);
        var o = this;
        return (o = e.call(this) || this).key = t, o.value = n, o.precondition = r, o.fieldTransforms = i, 
        o.type = 0 /* MutationType.Set */ , o;
    }
    return t(n, e), n.prototype.getFieldMask = function() {
        return null;
    }, n;
}(zr), Hr = /** @class */ function(e) {
    function n(t, n, r, i, o) {
        void 0 === o && (o = []);
        var a = this;
        return (a = e.call(this) || this).key = t, a.data = n, a.fieldMask = r, a.precondition = i, 
        a.fieldTransforms = o, a.type = 1 /* MutationType.Patch */ , a;
    }
    return t(n, e), n.prototype.getFieldMask = function() {
        return this.fieldMask;
    }, n;
}(zr);

function Jr(t) {
    var e = new Map;
    return t.fieldMask.fields.forEach((function(n) {
        if (!n.isEmpty()) {
            var r = t.data.field(n);
            e.set(n, r);
        }
    })), e
    /**
 * Creates a list of "transform results" (a transform result is a field value
 * representing the result of applying a transform) for use after a mutation
 * containing transforms has been acknowledged by the server.
 *
 * @param fieldTransforms - The field transforms to apply the result to.
 * @param mutableDocument - The current state of the document after applying all
 * previous mutations.
 * @param serverTransformResults - The transform results received by the server.
 * @returns The transform results list.
 */;
}

function Xr(t, e, n) {
    var r = new Map;
    B(t.length === n.length);
    for (var i = 0; i < n.length; i++) {
        var o = t[i], a = o.transform, u = e.data.field(o.field);
        r.set(o.field, Dr(a, u, n[i]));
    }
    return r;
}

/**
 * Creates a list of "transform results" (a transform result is a field value
 * representing the result of applying a transform) for use when applying a
 * transform locally.
 *
 * @param fieldTransforms - The field transforms to apply the result to.
 * @param localWriteTime - The local time of the mutation (used to
 *     generate ServerTimestampValues).
 * @param mutableDocument - The document to apply transforms on.
 * @returns The transform results list.
 */ function Zr(t, e, n) {
    for (var r = new Map, i = 0, o = t; i < o.length; i++) {
        var a = o[i], u = a.transform, s = n.data.field(a.field);
        r.set(a.field, Cr(u, s, e));
    }
    return r;
}

/** A mutation that deletes the document at the given key. */ var $r, ti, ei = /** @class */ function(e) {
    function n(t, n) {
        var r = this;
        return (r = e.call(this) || this).key = t, r.precondition = n, r.type = 2 /* MutationType.Delete */ , 
        r.fieldTransforms = [], r;
    }
    return t(n, e), n.prototype.getFieldMask = function() {
        return null;
    }, n;
}(zr), ni = /** @class */ function(e) {
    function n(t, n) {
        var r = this;
        return (r = e.call(this) || this).key = t, r.precondition = n, r.type = 3 /* MutationType.Verify */ , 
        r.fieldTransforms = [], r;
    }
    return t(n, e), n.prototype.getFieldMask = function() {
        return null;
    }, n;
}(zr), ri = /** @class */ function() {
    /**
     * @param batchId - The unique ID of this mutation batch.
     * @param localWriteTime - The original write time of this mutation.
     * @param baseMutations - Mutations that are used to populate the base
     * values when this mutation is applied locally. This can be used to locally
     * overwrite values that are persisted in the remote document cache. Base
     * mutations are never sent to the backend.
     * @param mutations - The user-provided mutations in this mutation batch.
     * User-provided mutations are applied both locally and remotely on the
     * backend.
     */
    function t(t, e, n, r) {
        this.batchId = t, this.localWriteTime = e, this.baseMutations = n, this.mutations = r
        /**
     * Applies all the mutations in this MutationBatch to the specified document
     * to compute the state of the remote document
     *
     * @param document - The document to apply mutations to.
     * @param batchResult - The result of applying the MutationBatch to the
     * backend.
     */;
    }
    return t.prototype.applyToRemoteDocument = function(t, e) {
        for (var n = e.mutationResults, r = 0; r < this.mutations.length; r++) {
            var i = this.mutations[r];
            i.key.isEqual(t.key) && Kr(i, t, n[r]);
        }
    }, 
    /**
     * Computes the local view of a document given all the mutations in this
     * batch.
     *
     * @param document - The document to apply mutations to.
     * @param mutatedFields - Fields that have been updated before applying this mutation batch.
     * @returns A `FieldMask` representing all the fields that are mutated.
     */
    t.prototype.applyToLocalView = function(t, e) {
        // First, apply the base state. This allows us to apply non-idempotent
        // transform against a consistent set of values.
        for (var n = 0, r = this.baseMutations; n < r.length; n++) {
            var i = r[n];
            i.key.isEqual(t.key) && (e = jr(i, t, e, this.localWriteTime));
        }
        // Second, apply all user-provided mutations.
                for (var o = 0, a = this.mutations; o < a.length; o++) {
            var u = a[o];
            u.key.isEqual(t.key) && (e = jr(u, t, e, this.localWriteTime));
        }
        return e;
    }, 
    /**
     * Computes the local view for all provided documents given the mutations in
     * this batch. Returns a `DocumentKey` to `Mutation` map which can be used to
     * replace all the mutation applications.
     */
    t.prototype.applyToLocalDocumentSet = function(t, e) {
        var n = this, r = mr();
        // TODO(mrschmidt): This implementation is O(n^2). If we apply the mutations
        // directly (as done in `applyToLocalView()`), we can reduce the complexity
        // to O(n).
                return this.mutations.forEach((function(i) {
            var o = t.get(i.key), a = o.overlayedDocument, u = n.applyToLocalView(a, o.mutatedFields), s = Gr(a, 
            // Set mutatedFields to null if the document is only from local mutations.
            // This creates a Set or Delete mutation, instead of trying to create a
            // patch mutation as the overlay.
            u = e.has(i.key) ? null : u);
            // TODO(mutabledocuments): This method should take a MutableDocumentMap
            // and we should remove this cast.
                        null !== s && r.set(i.key, s), a.isValidDocument() || a.convertToNoDocument(st.min());
        })), r;
    }, t.prototype.keys = function() {
        return this.mutations.reduce((function(t, e) {
            return t.add(e.key);
        }), br());
    }, t.prototype.isEqual = function(t) {
        return this.batchId === t.batchId && ot(this.mutations, t.mutations, (function(t, e) {
            return Wr(t, e);
        })) && ot(this.baseMutations, t.baseMutations, (function(t, e) {
            return Wr(t, e);
        }));
    }, t;
}(), ii = /** @class */ function() {
    function t(t, e, n, 
    /**
     * A pre-computed mapping from each mutated document to the resulting
     * version.
     */
    r) {
        this.batch = t, this.commitVersion = e, this.mutationResults = n, this.docVersions = r
        /**
     * Creates a new MutationBatchResult for the given batch and results. There
     * must be one result for each mutation in the batch. This static factory
     * caches a document=&gt;version mapping (docVersions).
     */;
    }
    return t.from = function(e, n, r) {
        B(e.mutations.length === r.length);
        for (var i = gr, o = e.mutations, a = 0; a < o.length; a++) i = i.insert(o[a].key, r[a].version);
        return new t(e, n, r, i);
    }, t;
}(), oi = /** @class */ function() {
    function t(t, e) {
        this.largestBatchId = t, this.mutation = e;
    }
    return t.prototype.getKey = function() {
        return this.mutation.key;
    }, t.prototype.isEqual = function(t) {
        return null !== t && this.mutation === t.mutation;
    }, t.prototype.toString = function() {
        return "Overlay{\n      largestBatchId: ".concat(this.largestBatchId, ",\n      mutation: ").concat(this.mutation.toString(), "\n    }");
    }, t;
}(), ai = function(t, e, n) {
    this.alias = t, this.aggregateType = e, this.fieldPath = n;
}, ui = function(t, e) {
    this.count = t, this.unchangedNames = e;
};

/**
 * Determines whether an error code represents a permanent error when received
 * in response to a non-write operation.
 *
 * See isPermanentWriteError for classifying write errors.
 */
function si(t) {
    switch (t) {
      default:
        return U();

      case K.CANCELLED:
      case K.UNKNOWN:
      case K.DEADLINE_EXCEEDED:
      case K.RESOURCE_EXHAUSTED:
      case K.INTERNAL:
      case K.UNAVAILABLE:
 // Unauthenticated means something went wrong with our token and we need
        // to retry with new credentials which will happen automatically.
              case K.UNAUTHENTICATED:
        return !1;

      case K.INVALID_ARGUMENT:
      case K.NOT_FOUND:
      case K.ALREADY_EXISTS:
      case K.PERMISSION_DENIED:
      case K.FAILED_PRECONDITION:
 // Aborted might be retried in some scenarios, but that is dependant on
        // the context and should handled individually by the calling code.
        // See https://cloud.google.com/apis/design/errors.
              case K.ABORTED:
      case K.OUT_OF_RANGE:
      case K.UNIMPLEMENTED:
      case K.DATA_LOSS:
        return !0;
    }
}

/**
 * Determines whether an error code represents a permanent error when received
 * in response to a write operation.
 *
 * Write operations must be handled specially because as of b/119437764, ABORTED
 * errors on the write stream should be retried too (even though ABORTED errors
 * are not generally retryable).
 *
 * Note that during the initial handshake on the write stream an ABORTED error
 * signals that we should discard our stream token (i.e. it is permanent). This
 * means a handshake error should be classified with isPermanentError, above.
 */
/**
 * Maps an error Code from GRPC status code number, like 0, 1, or 14. These
 * are not the same as HTTP status codes.
 *
 * @returns The Code equivalent to the given GRPC status code. Fails if there
 *     is no match.
 */ function ci(t) {
    if (void 0 === t) 
    // This shouldn't normally happen, but in certain error cases (like trying
    // to send invalid proto messages) we may get an error with no GRPC code.
    return V("GRPC error has no .code"), K.UNKNOWN;
    switch (t) {
      case $r.OK:
        return K.OK;

      case $r.CANCELLED:
        return K.CANCELLED;

      case $r.UNKNOWN:
        return K.UNKNOWN;

      case $r.DEADLINE_EXCEEDED:
        return K.DEADLINE_EXCEEDED;

      case $r.RESOURCE_EXHAUSTED:
        return K.RESOURCE_EXHAUSTED;

      case $r.INTERNAL:
        return K.INTERNAL;

      case $r.UNAVAILABLE:
        return K.UNAVAILABLE;

      case $r.UNAUTHENTICATED:
        return K.UNAUTHENTICATED;

      case $r.INVALID_ARGUMENT:
        return K.INVALID_ARGUMENT;

      case $r.NOT_FOUND:
        return K.NOT_FOUND;

      case $r.ALREADY_EXISTS:
        return K.ALREADY_EXISTS;

      case $r.PERMISSION_DENIED:
        return K.PERMISSION_DENIED;

      case $r.FAILED_PRECONDITION:
        return K.FAILED_PRECONDITION;

      case $r.ABORTED:
        return K.ABORTED;

      case $r.OUT_OF_RANGE:
        return K.OUT_OF_RANGE;

      case $r.UNIMPLEMENTED:
        return K.UNIMPLEMENTED;

      case $r.DATA_LOSS:
        return K.DATA_LOSS;

      default:
        return U();
    }
}

/**
 * Converts an HTTP response's error status to the equivalent error code.
 *
 * @param status - An HTTP error response status ("FAILED_PRECONDITION",
 * "UNKNOWN", etc.)
 * @returns The equivalent Code. Non-matching responses are mapped to
 *     Code.UNKNOWN.
 */ (ti = $r || ($r = {}))[ti.OK = 0] = "OK", ti[ti.CANCELLED = 1] = "CANCELLED", 
ti[ti.UNKNOWN = 2] = "UNKNOWN", ti[ti.INVALID_ARGUMENT = 3] = "INVALID_ARGUMENT", 
ti[ti.DEADLINE_EXCEEDED = 4] = "DEADLINE_EXCEEDED", ti[ti.NOT_FOUND = 5] = "NOT_FOUND", 
ti[ti.ALREADY_EXISTS = 6] = "ALREADY_EXISTS", ti[ti.PERMISSION_DENIED = 7] = "PERMISSION_DENIED", 
ti[ti.UNAUTHENTICATED = 16] = "UNAUTHENTICATED", ti[ti.RESOURCE_EXHAUSTED = 8] = "RESOURCE_EXHAUSTED", 
ti[ti.FAILED_PRECONDITION = 9] = "FAILED_PRECONDITION", ti[ti.ABORTED = 10] = "ABORTED", 
ti[ti.OUT_OF_RANGE = 11] = "OUT_OF_RANGE", ti[ti.UNIMPLEMENTED = 12] = "UNIMPLEMENTED", 
ti[ti.INTERNAL = 13] = "INTERNAL", ti[ti.UNAVAILABLE = 14] = "UNAVAILABLE", ti[ti.DATA_LOSS = 15] = "DATA_LOSS";

/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * The global, singleton instance of TestingHooksSpi.
 *
 * This variable will be `null` in all cases _except_ when running from
 * integration tests that have registered callbacks to be notified of events
 * that happen during the test execution.
 */
var li = null;

/**
 * Sets the value of the `testingHooksSpi` object.
 * @param instance the instance to set.
 */
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * An instance of the Platform's 'TextEncoder' implementation.
 */ function hi() {
    return new TextEncoder;
}

/**
 * An instance of the Platform's 'TextDecoder' implementation.
 */
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var fi = new b([ 4294967295, 4294967295 ], 0);

// Hash a string using md5 hashing algorithm.
function di(t) {
    var e = hi().encode(t), n = new N;
    return n.update(e), new Uint8Array(n.digest());
}

// Interpret the 16 bytes array as two 64-bit unsigned integers, encoded using
// 2’s complement using little endian.
function pi(t) {
    var e = new DataView(t.buffer), n = e.getUint32(0, /* littleEndian= */ !0), r = e.getUint32(4, /* littleEndian= */ !0), i = e.getUint32(8, /* littleEndian= */ !0), o = e.getUint32(12, /* littleEndian= */ !0);
    return [ new b([ n, r ], 0), new b([ i, o ], 0) ];
}

var vi = /** @class */ function() {
    function t(t, e, n) {
        if (this.bitmap = t, this.padding = e, this.hashCount = n, e < 0 || e >= 8) throw new mi("Invalid padding: ".concat(e));
        if (n < 0) throw new mi("Invalid hash count: ".concat(n));
        if (t.length > 0 && 0 === this.hashCount) 
        // Only empty bloom filter can have 0 hash count.
        throw new mi("Invalid hash count: ".concat(n));
        if (0 === t.length && 0 !== e) 
        // Empty bloom filter should have 0 padding.
        throw new mi("Invalid padding when bitmap length is 0: ".concat(e));
        this.Te = 8 * t.length - e, 
        // Set the bit count in Integer to avoid repetition in mightContain().
        this.Ee = b.fromNumber(this.Te);
    }
    // Calculate the ith hash value based on the hashed 64bit integers,
    // and calculate its corresponding bit index in the bitmap to be checked.
        return t.prototype.de = function(t, e, n) {
        // Calculate hashed value h(i) = h1 + (i * h2).
        var r = t.add(e.multiply(b.fromNumber(n)));
        // Wrap if hash value overflow 64bit.
                return 1 === r.compare(fi) && (r = new b([ r.getBits(0), r.getBits(1) ], 0)), 
        r.modulo(this.Ee).toNumber();
    }, 
    // Return whether the bit on the given index in the bitmap is set to 1.
    t.prototype.Ae = function(t) {
        return 0 != (this.bitmap[Math.floor(t / 8)] & 1 << t % 8);
    }, t.prototype.mightContain = function(t) {
        // Empty bitmap should always return false on membership check.
        if (0 === this.Te) return !1;
        for (var e = pi(di(t)), n = e[0], r = e[1], i = 0; i < this.hashCount; i++) {
            var o = this.de(n, r, i);
            if (!this.Ae(o)) return !1;
        }
        return !0;
    }, 
    /** Create bloom filter for testing purposes only. */ t.create = function(e, n, r) {
        var i = e % 8 == 0 ? 0 : 8 - e % 8, o = new t(new Uint8Array(Math.ceil(e / 8)), i, n);
        return r.forEach((function(t) {
            return o.insert(t);
        })), o;
    }, t.prototype.insert = function(t) {
        if (0 !== this.Te) for (var e = pi(di(t)), n = e[0], r = e[1], i = 0; i < this.hashCount; i++) {
            var o = this.de(n, r, i);
            this.Re(o);
        }
    }, t.prototype.Re = function(t) {
        var e = Math.floor(t / 8), n = t % 8;
        this.bitmap[e] |= 1 << n;
    }, t;
}(), mi = /** @class */ function(e) {
    function n() {
        var t = this;
        return (t = e.apply(this, arguments) || this).name = "BloomFilterError", t;
    }
    return t(n, e), n;
}(Error), yi = /** @class */ function() {
    function t(
    /**
     * The snapshot version this event brings us up to, or MIN if not set.
     */
    t, 
    /**
     * A map from target to changes to the target. See TargetChange.
     */
    e, 
    /**
     * A map of targets that is known to be inconsistent, and the purpose for
     * re-listening. Listens for these targets should be re-established without
     * resume tokens.
     */
    n, 
    /**
     * A set of which documents have changed or been deleted, along with the
     * doc's new values (if not deleted).
     */
    r, 
    /**
     * A set of which document updates are due only to limbo resolution targets.
     */
    i) {
        this.snapshotVersion = t, this.targetChanges = e, this.targetMismatches = n, this.documentUpdates = r, 
        this.resolvedLimboDocuments = i;
    }
    /**
     * HACK: Views require RemoteEvents in order to determine whether the view is
     * CURRENT, but secondary tabs don't receive remote events. So this method is
     * used to create a synthesized RemoteEvent that can be used to apply a
     * CURRENT status change to a View, for queries executed in a different tab.
     */
    // PORTING NOTE: Multi-tab only
        return t.createSynthesizedRemoteEventForCurrentChange = function(e, n, r) {
        var i = new Map;
        return i.set(e, gi.createSynthesizedTargetChangeForCurrentChange(e, n, r)), new t(st.min(), i, new Ee(it), hr(), br());
    }, t;
}(), gi = /** @class */ function() {
    function t(
    /**
     * An opaque, server-assigned token that allows watching a query to be resumed
     * after disconnecting without retransmitting all the data that matches the
     * query. The resume token essentially identifies a point in time from which
     * the server should resume sending results.
     */
    t, 
    /**
     * The "current" (synced) status of this target. Note that "current"
     * has special meaning in the RPC protocol that implies that a target is
     * both up-to-date and consistent with the rest of the watch stream.
     */
    e, 
    /**
     * The set of documents that were newly assigned to this target as part of
     * this remote event.
     */
    n, 
    /**
     * The set of documents that were already assigned to this target but received
     * an update during this remote event.
     */
    r, 
    /**
     * The set of documents that were removed from this target as part of this
     * remote event.
     */
    i) {
        this.resumeToken = t, this.current = e, this.addedDocuments = n, this.modifiedDocuments = r, 
        this.removedDocuments = i
        /**
     * This method is used to create a synthesized TargetChanges that can be used to
     * apply a CURRENT status change to a View (for queries executed in a different
     * tab) or for new queries (to raise snapshots with correct CURRENT status).
     */;
    }
    return t.createSynthesizedTargetChangeForCurrentChange = function(e, n, r) {
        return new t(r, n, br(), br(), br());
    }, t;
}(), wi = function(
/** The new document applies to all of these targets. */
t, 
/** The new document is removed from all of these targets. */
e, 
/** The key of the document for this change. */
n, 
/**
     * The new document or NoDocument if it was deleted. Is null if the
     * document went out of view without the server sending a new document.
     */
r) {
    this.Ve = t, this.removedTargetIds = e, this.key = n, this.me = r;
}, bi = function(t, e) {
    this.targetId = t, this.fe = e;
}, Ii = function(
/** What kind of change occurred to the watch target. */
t, 
/** The target IDs that were added/removed/set. */
e, 
/**
     * An opaque, server-assigned token that allows watching a target to be
     * resumed after disconnecting without retransmitting all the data that
     * matches the target. The resume token essentially identifies a point in
     * time from which the server should resume sending results.
     */
n
/** An RPC error indicating why the watch failed. */ , r) {
    void 0 === n && (n = Pe.EMPTY_BYTE_STRING), void 0 === r && (r = null), this.state = t, 
    this.targetIds = e, this.resumeToken = n, this.cause = r;
}, _i = /** @class */ function() {
    function t() {
        /**
         * The number of pending responses (adds or removes) that we are waiting on.
         * We only consider targets active that have no pending responses.
         */
        this.ge = 0, 
        /**
             * Keeps track of the document changes since the last raised snapshot.
             *
             * These changes are continuously updated as we receive document updates and
             * always reflect the current set of changes against the last issued snapshot.
             */
        this.pe = Si(), 
        /** See public getters for explanations of these fields. */
        this.ye = Pe.EMPTY_BYTE_STRING, this.we = !1, 
        /**
             * Whether this target state should be included in the next snapshot. We
             * initialize to true so that newly-added targets are included in the next
             * RemoteEvent.
             */
        this.Se = !0;
    }
    return Object.defineProperty(t.prototype, "current", {
        /**
         * Whether this target has been marked 'current'.
         *
         * 'Current' has special meaning in the RPC protocol: It implies that the
         * Watch backend has sent us all changes up to the point at which the target
         * was added and that the target is consistent with the rest of the watch
         * stream.
         */
        get: function() {
            return this.we;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "resumeToken", {
        /** The last resume token sent to us for this target. */ get: function() {
            return this.ye;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "be", {
        /** Whether this target has pending target adds or target removes. */ get: function() {
            return 0 !== this.ge;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "De", {
        /** Whether we have modified any state that should trigger a snapshot. */ get: function() {
            return this.Se;
        },
        enumerable: !1,
        configurable: !0
    }), 
    /**
     * Applies the resume token to the TargetChange, but only when it has a new
     * value. Empty resumeTokens are discarded.
     */
    t.prototype.Ce = function(t) {
        t.approximateByteSize() > 0 && (this.Se = !0, this.ye = t);
    }, 
    /**
     * Creates a target change from the current set of changes.
     *
     * To reset the document changes after raising this snapshot, call
     * `clearPendingChanges()`.
     */
    t.prototype.ve = function() {
        var t = br(), e = br(), n = br();
        return this.pe.forEach((function(r, i) {
            switch (i) {
              case 0 /* ChangeType.Added */ :
                t = t.add(r);
                break;

              case 2 /* ChangeType.Modified */ :
                e = e.add(r);
                break;

              case 1 /* ChangeType.Removed */ :
                n = n.add(r);
                break;

              default:
                U();
            }
        })), new gi(this.ye, this.we, t, e, n);
    }, 
    /**
     * Resets the document changes and sets `hasPendingChanges` to false.
     */
    t.prototype.Fe = function() {
        this.Se = !1, this.pe = Si();
    }, t.prototype.Me = function(t, e) {
        this.Se = !0, this.pe = this.pe.insert(t, e);
    }, t.prototype.xe = function(t) {
        this.Se = !0, this.pe = this.pe.remove(t);
    }, t.prototype.Oe = function() {
        this.ge += 1;
    }, t.prototype.Ne = function() {
        this.ge -= 1, B(this.ge >= 0);
    }, t.prototype.Le = function() {
        this.Se = !0, this.we = !0;
    }, t;
}(), Ei = /** @class */ function() {
    function t(t) {
        this.Be = t, 
        /** The internal state of all tracked targets. */
        this.ke = new Map, 
        /** Keeps track of the documents to update since the last raised snapshot. */
        this.qe = hr(), 
        /** A mapping of document keys to their set of target IDs. */
        this.Qe = Ti(), 
        /**
             * A map of targets with existence filter mismatches. These targets are
             * known to be inconsistent and their listens needs to be re-established by
             * RemoteStore.
             */
        this.Ke = new Ee(it)
        /**
     * Processes and adds the DocumentWatchChange to the current set of changes.
     */;
    }
    return t.prototype.$e = function(t) {
        for (var e = 0, n = t.Ve; e < n.length; e++) {
            var r = n[e];
            t.me && t.me.isFoundDocument() ? this.Ue(r, t.me) : this.We(r, t.key, t.me);
        }
        for (var i = 0, o = t.removedTargetIds; i < o.length; i++) {
            var a = o[i];
            this.We(a, t.key, t.me);
        }
    }, 
    /** Processes and adds the WatchTargetChange to the current set of changes. */ t.prototype.Ge = function(t) {
        var e = this;
        this.forEachTarget(t, (function(n) {
            var r = e.ze(n);
            switch (t.state) {
              case 0 /* WatchTargetChangeState.NoChange */ :
                e.je(n) && r.Ce(t.resumeToken);
                break;

              case 1 /* WatchTargetChangeState.Added */ :
                // We need to decrement the number of pending acks needed from watch
                // for this targetId.
                r.Ne(), r.be || 
                // We have a freshly added target, so we need to reset any state
                // that we had previously. This can happen e.g. when remove and add
                // back a target for existence filter mismatches.
                r.Fe(), r.Ce(t.resumeToken);
                break;

              case 2 /* WatchTargetChangeState.Removed */ :
                // We need to keep track of removed targets to we can post-filter and
                // remove any target changes.
                // We need to decrement the number of pending acks needed from watch
                // for this targetId.
                r.Ne(), r.be || e.removeTarget(n);
                break;

              case 3 /* WatchTargetChangeState.Current */ :
                e.je(n) && (r.Le(), r.Ce(t.resumeToken));
                break;

              case 4 /* WatchTargetChangeState.Reset */ :
                e.je(n) && (
                // Reset the target and synthesizes removes for all existing
                // documents. The backend will re-add any documents that still
                // match the target before it sends the next global snapshot.
                e.He(n), r.Ce(t.resumeToken));
                break;

              default:
                U();
            }
        }));
    }, 
    /**
     * Iterates over all targetIds that the watch change applies to: either the
     * targetIds explicitly listed in the change or the targetIds of all currently
     * active targets.
     */
    t.prototype.forEachTarget = function(t, e) {
        var n = this;
        t.targetIds.length > 0 ? t.targetIds.forEach(e) : this.ke.forEach((function(t, r) {
            n.je(r) && e(r);
        }));
    }, 
    /**
     * Handles existence filters and synthesizes deletes for filter mismatches.
     * Targets that are invalidated by filter mismatches are added to
     * `pendingTargetResets`.
     */
    t.prototype.Je = function(t) {
        var e = t.targetId, n = t.fe.count, r = this.Ye(e);
        if (r) {
            var i = r.target;
            if (zn(i)) if (0 === n) {
                // The existence filter told us the document does not exist. We deduce
                // that this document does not exist and apply a deleted document to
                // our updates. Without applying this deleted document there might be
                // another query that will raise this document as part of a snapshot
                // until it is resolved, essentially exposing inconsistency between
                // queries.
                var o = new dt(i.path);
                this.We(e, o, dn.newNoDocument(o, st.min()));
            } else B(1 === n); else {
                var a = this.Ze(e);
                // Existence filter mismatch. Mark the documents as being in limbo, and
                // raise a snapshot with `isFromCache:true`.
                                if (a !== n) {
                    // Apply bloom filter to identify and mark removed documents.
                    var u = this.Xe(t), s = u ? this.et(u, t, a) : 1 /* BloomFilterApplicationStatus.Skipped */;
                    if (0 /* BloomFilterApplicationStatus.Success */ !== s) {
                        // If bloom filter application fails, we reset the mapping and
                        // trigger re-run of the query.
                        this.He(e);
                        var c = 2 /* BloomFilterApplicationStatus.FalsePositive */ === s ? "TargetPurposeExistenceFilterMismatchBloom" /* TargetPurpose.ExistenceFilterMismatchBloom */ : "TargetPurposeExistenceFilterMismatch" /* TargetPurpose.ExistenceFilterMismatch */;
                        this.Ke = this.Ke.insert(e, c);
                    }
                    null == li || li.tt(function(t, e, n, r, i) {
                        var o, a, u, s, c, l, h = {
                            localCacheCount: t,
                            existenceFilterCount: e.count,
                            databaseId: n.database,
                            projectId: n.projectId
                        }, f = e.unchangedNames;
                        return f && (h.bloomFilter = {
                            applied: 0 /* BloomFilterApplicationStatus.Success */ === i,
                            hashCount: null !== (o = null == f ? void 0 : f.hashCount) && void 0 !== o ? o : 0,
                            bitmapLength: null !== (s = null === (u = null === (a = null == f ? void 0 : f.bits) || void 0 === a ? void 0 : a.bitmap) || void 0 === u ? void 0 : u.length) && void 0 !== s ? s : 0,
                            padding: null !== (l = null === (c = null == f ? void 0 : f.bits) || void 0 === c ? void 0 : c.padding) && void 0 !== l ? l : 0,
                            mightContain: function(t) {
                                var e;
                                return null !== (e = null == r ? void 0 : r.mightContain(t)) && void 0 !== e && e;
                            }
                        }), h;
                    }(a, t.fe, this.Be.nt(), u, s));
                }
            }
        }
    }, 
    /**
     * Parse the bloom filter from the "unchanged_names" field of an existence
     * filter.
     */
    t.prototype.Xe = function(t) {
        var e = t.fe.unchangedNames;
        if (!e || !e.bits) return null;
        var n, r, i = e.bits, o = i.bitmap, a = void 0 === o ? "" : o, u = i.padding, s = void 0 === u ? 0 : u, c = e.hashCount, l = void 0 === c ? 0 : c;
        try {
            n = Fe(a).toUint8Array();
        } catch (t) {
            if (t instanceof Ae) return L("Decoding the base64 bloom filter in existence filter failed (" + t.message + "); ignoring the bloom filter and falling back to full re-query."), 
            null;
            throw t;
        }
        try {
            // BloomFilter throws error if the inputs are invalid.
            r = new vi(n, s, l);
        } catch (t) {
            return L(t instanceof mi ? "BloomFilter error: " : "Applying bloom filter failed: ", t), 
            null;
        }
        return 0 === r.Te ? null : r;
    }, 
    /**
     * Apply bloom filter to remove the deleted documents, and return the
     * application status.
     */
    t.prototype.et = function(t, e, n) {
        return e.fe.count === n - this.rt(t, e.targetId) ? 0 /* BloomFilterApplicationStatus.Success */ : 2 /* BloomFilterApplicationStatus.FalsePositive */;
    }, 
    /**
     * Filter out removed documents based on bloom filter membership result and
     * return number of documents removed.
     */
    t.prototype.rt = function(t, e) {
        var n = this, r = this.Be.getRemoteKeysForTarget(e), i = 0;
        return r.forEach((function(r) {
            var o = n.Be.nt(), a = "projects/".concat(o.projectId, "/databases/").concat(o.database, "/documents/").concat(r.path.canonicalString());
            t.mightContain(a) || (n.We(e, r, /*updatedDocument=*/ null), i++);
        })), i;
    }, 
    /**
     * Converts the currently accumulated state into a remote event at the
     * provided snapshot version. Resets the accumulated changes before returning.
     */
    t.prototype.it = function(t) {
        var e = this, n = new Map;
        this.ke.forEach((function(r, i) {
            var o = e.Ye(i);
            if (o) {
                if (r.current && zn(o.target)) {
                    // Document queries for document that don't exist can produce an empty
                    // result set. To update our local cache, we synthesize a document
                    // delete if we have not previously received the document. This
                    // resolves the limbo state of the document, removing it from
                    // limboDocumentRefs.
                    // TODO(dimond): Ideally we would have an explicit lookup target
                    // instead resulting in an explicit delete message and we could
                    // remove this special logic.
                    var a = new dt(o.target.path);
                    null !== e.qe.get(a) || e.st(i, a) || e.We(i, a, dn.newNoDocument(a, t));
                }
                r.De && (n.set(i, r.ve()), r.Fe());
            }
        }));
        var r = br();
        // We extract the set of limbo-only document updates as the GC logic
        // special-cases documents that do not appear in the target cache.
        // TODO(gsoltis): Expand on this comment once GC is available in the JS
        // client.
                this.Qe.forEach((function(t, n) {
            var i = !0;
            n.forEachWhile((function(t) {
                var n = e.Ye(t);
                return !n || "TargetPurposeLimboResolution" /* TargetPurpose.LimboResolution */ === n.purpose || (i = !1, 
                !1);
            })), i && (r = r.add(t));
        })), this.qe.forEach((function(e, n) {
            return n.setReadTime(t);
        }));
        var i = new yi(t, n, this.Ke, this.qe, r);
        return this.qe = hr(), this.Qe = Ti(), this.Ke = new Ee(it), i;
    }, 
    /**
     * Adds the provided document to the internal list of document updates and
     * its document key to the given target's mapping.
     */
    // Visible for testing.
    t.prototype.Ue = function(t, e) {
        if (this.je(t)) {
            var n = this.st(t, e.key) ? 2 /* ChangeType.Modified */ : 0 /* ChangeType.Added */;
            this.ze(t).Me(e.key, n), this.qe = this.qe.insert(e.key, e), this.Qe = this.Qe.insert(e.key, this.ot(e.key).add(t));
        }
    }, 
    /**
     * Removes the provided document from the target mapping. If the
     * document no longer matches the target, but the document's state is still
     * known (e.g. we know that the document was deleted or we received the change
     * that caused the filter mismatch), the new document can be provided
     * to update the remote document cache.
     */
    // Visible for testing.
    t.prototype.We = function(t, e, n) {
        if (this.je(t)) {
            var r = this.ze(t);
            this.st(t, e) ? r.Me(e, 1 /* ChangeType.Removed */) : 
            // The document may have entered and left the target before we raised a
            // snapshot, so we can just ignore the change.
            r.xe(e), this.Qe = this.Qe.insert(e, this.ot(e).delete(t)), n && (this.qe = this.qe.insert(e, n));
        }
    }, t.prototype.removeTarget = function(t) {
        this.ke.delete(t);
    }, 
    /**
     * Returns the current count of documents in the target. This includes both
     * the number of documents that the LocalStore considers to be part of the
     * target as well as any accumulated changes.
     */
    t.prototype.Ze = function(t) {
        var e = this.ze(t).ve();
        return this.Be.getRemoteKeysForTarget(t).size + e.addedDocuments.size - e.removedDocuments.size;
    }, 
    /**
     * Increment the number of acks needed from watch before we can consider the
     * server to be 'in-sync' with the client's active targets.
     */
    t.prototype.Oe = function(t) {
        this.ze(t).Oe();
    }, t.prototype.ze = function(t) {
        var e = this.ke.get(t);
        return e || (e = new _i, this.ke.set(t, e)), e;
    }, t.prototype.ot = function(t) {
        var e = this.Qe.get(t);
        return e || (e = new xe(it), this.Qe = this.Qe.insert(t, e)), e;
    }, 
    /**
     * Verifies that the user is still interested in this target (by calling
     * `getTargetDataForTarget()`) and that we are not waiting for pending ADDs
     * from watch.
     */
    t.prototype.je = function(t) {
        var e = null !== this.Ye(t);
        return e || F("WatchChangeAggregator", "Detected inactive target", t), e;
    }, 
    /**
     * Returns the TargetData for an active target (i.e. a target that the user
     * is still interested in that has no outstanding target change requests).
     */
    t.prototype.Ye = function(t) {
        var e = this.ke.get(t);
        return e && e.be ? null : this.Be._t(t);
    }, 
    /**
     * Resets the state of a Watch target to its initial state (e.g. sets
     * 'current' to false, clears the resume token and removes its target mapping
     * from all documents).
     */
    t.prototype.He = function(t) {
        var e = this;
        this.ke.set(t, new _i), this.Be.getRemoteKeysForTarget(t).forEach((function(n) {
            e.We(t, n, /*updatedDocument=*/ null);
        }));
    }, 
    /**
     * Returns whether the LocalStore considers the document to be part of the
     * specified target.
     */
    t.prototype.st = function(t, e) {
        return this.Be.getRemoteKeysForTarget(t).has(e);
    }, t;
}();

function Ti() {
    return new Ee(dt.comparator);
}

function Si() {
    return new Ee(dt.comparator);
}

var xi = {
    asc: "ASCENDING",
    desc: "DESCENDING"
}, Ci = {
    "<": "LESS_THAN",
    "<=": "LESS_THAN_OR_EQUAL",
    ">": "GREATER_THAN",
    ">=": "GREATER_THAN_OR_EQUAL",
    "==": "EQUAL",
    "!=": "NOT_EQUAL",
    "array-contains": "ARRAY_CONTAINS",
    in: "IN",
    "not-in": "NOT_IN",
    "array-contains-any": "ARRAY_CONTAINS_ANY"
}, Di = {
    and: "AND",
    or: "OR"
}, Ni = function(t, e) {
    this.databaseId = t, this.useProto3Json = e;
};

/**
 * This class generates JsonObject values for the Datastore API suitable for
 * sending to either GRPC stub methods or via the JSON/HTTP REST API.
 *
 * The serializer supports both Protobuf.js and Proto3 JSON formats. By
 * setting `useProto3Json` to true, the serializer will use the Proto3 JSON
 * format.
 *
 * For a description of the Proto3 JSON format check
 * https://developers.google.com/protocol-buffers/docs/proto3#json
 *
 * TODO(klimt): We can remove the databaseId argument if we keep the full
 * resource name in documents.
 */
/**
 * Returns a value for a number (or null) that's appropriate to put into
 * a google.protobuf.Int32Value proto.
 * DO NOT USE THIS FOR ANYTHING ELSE.
 * This method cheats. It's typed as returning "number" because that's what
 * our generated proto interfaces say Int32Value must be. But GRPC actually
 * expects a { value: <number> } struct.
 */
function Ai(t, e) {
    return t.useProto3Json || Bt(e) ? e : {
        value: e
    };
}

/**
 * Returns a number (or null) from a google.protobuf.Int32Value proto.
 */
/**
 * Returns a value for a Date that's appropriate to put into a proto.
 */ function ki(t, e) {
    return t.useProto3Json ? "".concat(new Date(1e3 * e.seconds).toISOString().replace(/\.\d*/, "").replace("Z", ""), ".").concat(("000000000" + e.nanoseconds).slice(-9), "Z") : {
        seconds: "" + e.seconds,
        nanos: e.nanoseconds
    };
}

/**
 * Returns a value for bytes that's appropriate to put in a proto.
 *
 * Visible for testing.
 */ function Pi(t, e) {
    return t.useProto3Json ? e.toBase64() : e.toUint8Array();
}

/**
 * Returns a ByteString based on the proto string value.
 */ function Oi(t, e) {
    return ki(t, e.toTimestamp());
}

function Ri(t) {
    return B(!!t), st.fromTimestamp(function(t) {
        var e = Re(t);
        return new ut(e.seconds, e.nanos);
    }(t));
}

function Mi(t, e) {
    return Fi(t, e).canonicalString();
}

function Fi(t, e) {
    var n = function(t) {
        return new lt([ "projects", t.projectId, "databases", t.database ]);
    }(t).child("documents");
    return void 0 === e ? n : n.child(e);
}

function Vi(t) {
    var e = lt.fromString(t);
    return B(oo(e)), e;
}

function Li(t, e) {
    return Mi(t.databaseId, e.path);
}

function qi(t, e) {
    var n = Vi(e);
    if (n.get(1) !== t.databaseId.projectId) throw new j(K.INVALID_ARGUMENT, "Tried to deserialize key from different project: " + n.get(1) + " vs " + t.databaseId.projectId);
    if (n.get(3) !== t.databaseId.database) throw new j(K.INVALID_ARGUMENT, "Tried to deserialize key from different database: " + n.get(3) + " vs " + t.databaseId.database);
    return new dt(Gi(n));
}

function Ui(t, e) {
    return Mi(t.databaseId, e);
}

function Bi(t) {
    var e = Vi(t);
    // In v1beta1 queries for collections at the root did not have a trailing
    // "/documents". In v1 all resource paths contain "/documents". Preserve the
    // ability to read the v1beta1 form for compatibility with queries persisted
    // in the local target cache.
        return 4 === e.length ? lt.emptyPath() : Gi(e);
}

function zi(t) {
    return new lt([ "projects", t.databaseId.projectId, "databases", t.databaseId.database ]).canonicalString();
}

function Gi(t) {
    return B(t.length > 4 && "documents" === t.get(4)), t.popFirst(5)
    /** Creates a Document proto from key and fields (but no create/update time) */;
}

function Ki(t, e, n) {
    return {
        name: Li(t, e),
        fields: n.value.mapValue.fields
    };
}

function ji(t, e, n) {
    var r = qi(t, e.name), i = Ri(e.updateTime), o = e.createTime ? Ri(e.createTime) : st.min(), a = new hn({
        mapValue: {
            fields: e.fields
        }
    }), u = dn.newFoundDocument(r, i, o, a);
    return n && u.setHasCommittedMutations(), n ? u.setHasCommittedMutations() : u;
}

function Qi(t, e) {
    var n;
    if (e instanceof Yr) n = {
        update: Ki(t, e.key, e.value)
    }; else if (e instanceof ei) n = {
        delete: Li(t, e.key)
    }; else if (e instanceof Hr) n = {
        update: Ki(t, e.key, e.data),
        updateMask: io(e.fieldMask)
    }; else {
        if (!(e instanceof ni)) return U();
        n = {
            verify: Li(t, e.key)
        };
    }
    return e.fieldTransforms.length > 0 && (n.updateTransforms = e.fieldTransforms.map((function(t) {
        return function(t, e) {
            var n = e.transform;
            if (n instanceof Ar) return {
                fieldPath: e.field.canonicalString(),
                setToServerValue: "REQUEST_TIME"
            };
            if (n instanceof kr) return {
                fieldPath: e.field.canonicalString(),
                appendMissingElements: {
                    values: n.elements
                }
            };
            if (n instanceof Or) return {
                fieldPath: e.field.canonicalString(),
                removeAllFromArray: {
                    values: n.elements
                }
            };
            if (n instanceof Mr) return {
                fieldPath: e.field.canonicalString(),
                increment: n.Ie
            };
            throw U();
        }(0, t);
    }))), e.precondition.isNone || (n.currentDocument = function(t, e) {
        return void 0 !== e.updateTime ? {
            updateTime: Oi(t, e.updateTime)
        } : void 0 !== e.exists ? {
            exists: e.exists
        } : U();
    }(t, e.precondition)), n;
}

function Wi(t, e) {
    var n = e.currentDocument ? function(t) {
        return void 0 !== t.updateTime ? Ur.updateTime(Ri(t.updateTime)) : void 0 !== t.exists ? Ur.exists(t.exists) : Ur.none();
    }(e.currentDocument) : Ur.none(), r = e.updateTransforms ? e.updateTransforms.map((function(e) {
        return function(t, e) {
            var n = null;
            if ("setToServerValue" in e) B("REQUEST_TIME" === e.setToServerValue), n = new Ar; else if ("appendMissingElements" in e) {
                var r = e.appendMissingElements.values || [];
                n = new kr(r);
            } else if ("removeAllFromArray" in e) {
                var i = e.removeAllFromArray.values || [];
                n = new Or(i);
            } else "increment" in e ? n = new Mr(t, e.increment) : U();
            var o = ft.fromServerFormat(e.fieldPath);
            return new Lr(o, n);
        }(t, e);
    })) : [];
    if (e.update) {
        e.update.name;
        var i = qi(t, e.update.name), o = new hn({
            mapValue: {
                fields: e.update.fields
            }
        });
        if (e.updateMask) {
            var a = function(t) {
                var e = t.fieldPaths || [];
                return new Ne(e.map((function(t) {
                    return ft.fromServerFormat(t);
                })));
            }(e.updateMask);
            return new Hr(i, o, a, n, r);
        }
        return new Yr(i, o, n, r);
    }
    if (e.delete) {
        var u = qi(t, e.delete);
        return new ei(u, n);
    }
    if (e.verify) {
        var s = qi(t, e.verify);
        return new ni(s, n);
    }
    return U();
}

function Yi(t, e) {
    return {
        documents: [ Ui(t, e.path) ]
    };
}

function Hi(t, e) {
    // Dissect the path into parent, collectionId, and optional key filter.
    var n, r = {
        structuredQuery: {}
    }, i = e.path;
    null !== e.collectionGroup ? (n = i, r.structuredQuery.from = [ {
        collectionId: e.collectionGroup,
        allDescendants: !0
    } ]) : (n = i.popLast(), r.structuredQuery.from = [ {
        collectionId: i.lastSegment()
    } ]), r.parent = Ui(t, n);
    var o = function(t) {
        if (0 !== t.length) return ro(In.create(t, "and" /* CompositeOperator.AND */));
    }(e.filters);
    o && (r.structuredQuery.where = o);
    var a = function(t) {
        if (0 !== t.length) return t.map((function(t) {
            // visible for testing
            return function(t) {
                return {
                    field: eo(t.field),
                    direction: Zi(t.dir)
                };
            }(t);
        }));
    }(e.orderBy);
    a && (r.structuredQuery.orderBy = a);
    var u = Ai(t, e.limit);
    return null !== u && (r.structuredQuery.limit = u), e.startAt && (r.structuredQuery.startAt = function(t) {
        return {
            before: t.inclusive,
            values: t.position
        };
    }(e.startAt)), e.endAt && (r.structuredQuery.endAt = function(t) {
        return {
            before: !t.inclusive,
            values: t.position
        };
    }(e.endAt)), {
        ut: r,
        parent: n
    };
}

function Ji(t) {
    var e = Bi(t.parent), n = t.structuredQuery, r = n.from ? n.from.length : 0, i = null;
    if (r > 0) {
        B(1 === r);
        var o = n.from[0];
        o.allDescendants ? i = o.collectionId : e = e.child(o.collectionId);
    }
    var a = [];
    n.where && (a = function(t) {
        var e = Xi(t);
        return e instanceof In && Tn(e) ? e.getFilters() : [ e ];
    }(n.where));
    var u = [];
    n.orderBy && (u = function(t) {
        return t.map((function(t) {
            return function(t) {
                return new yn(no(t.field), 
                // visible for testing
                function(t) {
                    switch (t) {
                      case "ASCENDING":
                        return "asc" /* Direction.ASCENDING */;

                      case "DESCENDING":
                        return "desc" /* Direction.DESCENDING */;

                      default:
                        return;
                    }
                }(t.direction));
            }(t);
        }));
    }(n.orderBy));
    var s = null;
    n.limit && (s = function(t) {
        var e;
        return Bt(e = "object" == typeof t ? t.value : t) ? null : e;
    }(n.limit));
    var c = null;
    n.startAt && (c = function(t) {
        var e = !!t.before, n = t.values || [];
        return new pn(n, e);
    }(n.startAt));
    var l = null;
    return n.endAt && (l = function(t) {
        var e = !t.before, n = t.values || [];
        return new pn(n, e);
    }(n.endAt)), Wn(e, i, u, a, s, "F" /* LimitType.First */ , c, l);
}

function Xi(t) {
    return void 0 !== t.unaryFilter ? function(t) {
        switch (t.unaryFilter.op) {
          case "IS_NAN":
            var e = no(t.unaryFilter.field);
            return bn.create(e, "==" /* Operator.EQUAL */ , {
                doubleValue: NaN
            });

          case "IS_NULL":
            var n = no(t.unaryFilter.field);
            return bn.create(n, "==" /* Operator.EQUAL */ , {
                nullValue: "NULL_VALUE"
            });

          case "IS_NOT_NAN":
            var r = no(t.unaryFilter.field);
            return bn.create(r, "!=" /* Operator.NOT_EQUAL */ , {
                doubleValue: NaN
            });

          case "IS_NOT_NULL":
            var i = no(t.unaryFilter.field);
            return bn.create(i, "!=" /* Operator.NOT_EQUAL */ , {
                nullValue: "NULL_VALUE"
            });

          default:
            return U();
        }
    }(t) : void 0 !== t.fieldFilter ? function(t) {
        return bn.create(no(t.fieldFilter.field), function(t) {
            switch (t) {
              case "EQUAL":
                return "==" /* Operator.EQUAL */;

              case "NOT_EQUAL":
                return "!=" /* Operator.NOT_EQUAL */;

              case "GREATER_THAN":
                return ">" /* Operator.GREATER_THAN */;

              case "GREATER_THAN_OR_EQUAL":
                return ">=" /* Operator.GREATER_THAN_OR_EQUAL */;

              case "LESS_THAN":
                return "<" /* Operator.LESS_THAN */;

              case "LESS_THAN_OR_EQUAL":
                return "<=" /* Operator.LESS_THAN_OR_EQUAL */;

              case "ARRAY_CONTAINS":
                return "array-contains" /* Operator.ARRAY_CONTAINS */;

              case "IN":
                return "in" /* Operator.IN */;

              case "NOT_IN":
                return "not-in" /* Operator.NOT_IN */;

              case "ARRAY_CONTAINS_ANY":
                return "array-contains-any" /* Operator.ARRAY_CONTAINS_ANY */;

              default:
                return U();
            }
        }(t.fieldFilter.op), t.fieldFilter.value);
    }(t) : void 0 !== t.compositeFilter ? function(t) {
        return In.create(t.compositeFilter.filters.map((function(t) {
            return Xi(t);
        })), function(t) {
            switch (t) {
              case "AND":
                return "and" /* CompositeOperator.AND */;

              case "OR":
                return "or" /* CompositeOperator.OR */;

              default:
                return U();
            }
        }(t.compositeFilter.op));
    }(t) : U();
}

function Zi(t) {
    return xi[t];
}

function $i(t) {
    return Ci[t];
}

function to(t) {
    return Di[t];
}

function eo(t) {
    return {
        fieldPath: t.canonicalString()
    };
}

function no(t) {
    return ft.fromServerFormat(t.fieldPath);
}

function ro(t) {
    return t instanceof bn ? function(t) {
        if ("==" /* Operator.EQUAL */ === t.op) {
            if (nn(t.value)) return {
                unaryFilter: {
                    field: eo(t.field),
                    op: "IS_NAN"
                }
            };
            if (en(t.value)) return {
                unaryFilter: {
                    field: eo(t.field),
                    op: "IS_NULL"
                }
            };
        } else if ("!=" /* Operator.NOT_EQUAL */ === t.op) {
            if (nn(t.value)) return {
                unaryFilter: {
                    field: eo(t.field),
                    op: "IS_NOT_NAN"
                }
            };
            if (en(t.value)) return {
                unaryFilter: {
                    field: eo(t.field),
                    op: "IS_NOT_NULL"
                }
            };
        }
        return {
            fieldFilter: {
                field: eo(t.field),
                op: $i(t.op),
                value: t.value
            }
        };
    }(t) : t instanceof In ? function(t) {
        var e = t.getFilters().map((function(t) {
            return ro(t);
        }));
        return 1 === e.length ? e[0] : {
            compositeFilter: {
                op: to(t.op),
                filters: e
            }
        };
    }(t) : U();
}

function io(t) {
    var e = [];
    return t.fields.forEach((function(t) {
        return e.push(t.canonicalString());
    })), {
        fieldPaths: e
    };
}

function oo(t) {
    // Resource names have at least 4 components (project ID, database ID)
    return t.length >= 4 && "projects" === t.get(0) && "databases" === t.get(2);
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * An immutable set of metadata that the local store tracks for each target.
 */ var ao = /** @class */ function() {
    function t(
    /** The target being listened to. */
    t, 
    /**
     * The target ID to which the target corresponds; Assigned by the
     * LocalStore for user listens and by the SyncEngine for limbo watches.
     */
    e, 
    /** The purpose of the target. */
    n, 
    /**
     * The sequence number of the last transaction during which this target data
     * was modified.
     */
    r, 
    /** The latest snapshot version seen for this target. */
    i
    /**
     * The maximum snapshot version at which the associated view
     * contained no limbo documents.
     */ , o
    /**
     * An opaque, server-assigned token that allows watching a target to be
     * resumed after disconnecting without retransmitting all the data that
     * matches the target. The resume token essentially identifies a point in
     * time from which the server should resume sending results.
     */ , a
    /**
     * The number of documents that last matched the query at the resume token or
     * read time. Documents are counted only when making a listen request with
     * resume token or read time, otherwise, keep it null.
     */ , u) {
        void 0 === i && (i = st.min()), void 0 === o && (o = st.min()), void 0 === a && (a = Pe.EMPTY_BYTE_STRING), 
        void 0 === u && (u = null), this.target = t, this.targetId = e, this.purpose = n, 
        this.sequenceNumber = r, this.snapshotVersion = i, this.lastLimboFreeSnapshotVersion = o, 
        this.resumeToken = a, this.expectedCount = u;
    }
    /** Creates a new target data instance with an updated sequence number. */    return t.prototype.withSequenceNumber = function(e) {
        return new t(this.target, this.targetId, this.purpose, e, this.snapshotVersion, this.lastLimboFreeSnapshotVersion, this.resumeToken, this.expectedCount);
    }, 
    /**
     * Creates a new target data instance with an updated resume token and
     * snapshot version.
     */
    t.prototype.withResumeToken = function(e, n) {
        return new t(this.target, this.targetId, this.purpose, this.sequenceNumber, n, this.lastLimboFreeSnapshotVersion, e, 
        /* expectedCount= */ null);
    }, 
    /**
     * Creates a new target data instance with an updated expected count.
     */
    t.prototype.withExpectedCount = function(e) {
        return new t(this.target, this.targetId, this.purpose, this.sequenceNumber, this.snapshotVersion, this.lastLimboFreeSnapshotVersion, this.resumeToken, e);
    }, 
    /**
     * Creates a new target data instance with an updated last limbo free
     * snapshot version number.
     */
    t.prototype.withLastLimboFreeSnapshotVersion = function(e) {
        return new t(this.target, this.targetId, this.purpose, this.sequenceNumber, this.snapshotVersion, e, this.resumeToken, this.expectedCount);
    }, t;
}(), uo = function(t) {
    this.ct = t;
};

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/** Serializer for values stored in the LocalStore. */
/** Encodes a document for storage locally. */ function so(t, e) {
    var n = e.key, r = {
        prefixPath: n.getCollectionPath().popLast().toArray(),
        collectionGroup: n.collectionGroup,
        documentId: n.path.lastSegment(),
        readTime: co(e.readTime),
        hasCommittedMutations: e.hasCommittedMutations
    };
    if (e.isFoundDocument()) r.document = function(t, e) {
        return {
            name: Li(t, e.key),
            fields: e.data.value.mapValue.fields,
            updateTime: ki(t, e.version.toTimestamp()),
            createTime: ki(t, e.createTime.toTimestamp())
        };
    }(t.ct, e); else if (e.isNoDocument()) r.noDocument = {
        path: n.path.toArray(),
        readTime: lo(e.version)
    }; else {
        if (!e.isUnknownDocument()) return U();
        r.unknownDocument = {
            path: n.path.toArray(),
            version: lo(e.version)
        };
    }
    return r;
}

function co(t) {
    var e = t.toTimestamp();
    return [ e.seconds, e.nanoseconds ];
}

function lo(t) {
    var e = t.toTimestamp();
    return {
        seconds: e.seconds,
        nanoseconds: e.nanoseconds
    };
}

function ho(t) {
    var e = new ut(t.seconds, t.nanoseconds);
    return st.fromTimestamp(e);
}

/** Encodes a batch of mutations into a DbMutationBatch for local storage. */
/** Decodes a DbMutationBatch into a MutationBatch */ function fo(t, e) {
    // Squash old transform mutations into existing patch or set mutations.
    // The replacement of representing `transforms` with `update_transforms`
    // on the SDK means that old `transform` mutations stored in IndexedDB need
    // to be updated to `update_transforms`.
    // TODO(b/174608374): Remove this code once we perform a schema migration.
    for (var n = (e.baseMutations || []).map((function(e) {
        return Wi(t.ct, e);
    })), r = 0; r < e.mutations.length - 1; ++r) {
        var i = e.mutations[r];
        if (r + 1 < e.mutations.length && void 0 !== e.mutations[r + 1].transform) {
            var o = e.mutations[r + 1];
            i.updateTransforms = o.transform.fieldTransforms, e.mutations.splice(r + 1, 1), 
            ++r;
        }
    }
    var a = e.mutations.map((function(e) {
        return Wi(t.ct, e);
    })), u = ut.fromMillis(e.localWriteTimeMs);
    return new ri(e.batchId, u, n, a);
}

/** Decodes a DbTarget into TargetData */ function po(t) {
    var e, n = ho(t.readTime), r = void 0 !== t.lastLimboFreeSnapshotVersion ? ho(t.lastLimboFreeSnapshotVersion) : st.min();
    return e = 
    /**
     * A helper function for figuring out what kind of query has been stored.
     */
    function(t) {
        return void 0 !== t.documents;
    }(t.query) ? function(t) {
        return B(1 === t.documents.length), Zn(Yn(Bi(t.documents[0])));
    }(t.query) : function(t) {
        return Zn(Ji(t));
    }(t.query), new ao(e, t.targetId, "TargetPurposeListen" /* TargetPurpose.Listen */ , t.lastListenSequenceNumber, n, r, Pe.fromBase64String(t.resumeToken))
    /** Encodes TargetData into a DbTarget for storage locally. */;
}

function vo(t, e) {
    var n, r = lo(e.snapshotVersion), i = lo(e.lastLimboFreeSnapshotVersion);
    n = zn(e.target) ? Yi(t.ct, e.target) : Hi(t.ct, e.target).ut;
    // We can't store the resumeToken as a ByteString in IndexedDb, so we
    // convert it to a base64 string for storage.
    var o = e.resumeToken.toBase64();
    // lastListenSequenceNumber is always 0 until we do real GC.
        return {
        targetId: e.targetId,
        canonicalId: Un(e.target),
        readTime: r,
        resumeToken: o,
        lastListenSequenceNumber: e.sequenceNumber,
        lastLimboFreeSnapshotVersion: i,
        query: n
    };
}

/**
 * Encodes a `BundledQuery` from bundle proto to a Query object.
 *
 * This reconstructs the original query used to build the bundle being loaded,
 * including features exists only in SDKs (for example: limit-to-last).
 */ function mo(t) {
    var e = Ji({
        parent: t.parent,
        structuredQuery: t.structuredQuery
    });
    return "LAST" === t.limitType ? er(e, e.limit, "L" /* LimitType.Last */) : e;
}

/** Encodes a NamedQuery proto object to a NamedQuery model object. */
/** Encodes a DbDocumentOverlay object to an Overlay model object. */ function yo(t, e) {
    return new oi(e.largestBatchId, Wi(t.ct, e.overlayMutation));
}

/** Decodes an Overlay model object into a DbDocumentOverlay object. */
/**
 * Returns the DbDocumentOverlayKey corresponding to the given user and
 * document key.
 */ function go(t, e) {
    var n = e.path.lastSegment();
    return [ t, Kt(e.path.popLast()), n ];
}

function wo(t, e, n, r) {
    return {
        indexId: t,
        uid: e,
        sequenceNumber: n,
        readTime: lo(r.readTime),
        documentKey: Kt(r.documentKey.path),
        largestBatchId: r.largestBatchId
    };
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var bo = /** @class */ function() {
    function t() {}
    return t.prototype.getBundleMetadata = function(t, e) {
        return Io(t).get(e).next((function(t) {
            if (t) return function(t) {
                return {
                    id: t.bundleId,
                    createTime: ho(t.createTime),
                    version: t.version
                };
            }(t);
        }));
    }, t.prototype.saveBundleMetadata = function(t, e) {
        return Io(t).put(function(t) {
            return {
                bundleId: t.id,
                createTime: lo(Ri(t.createTime)),
                version: t.version
            };
        }(e));
    }, t.prototype.getNamedQuery = function(t, e) {
        return _o(t).get(e).next((function(t) {
            if (t) return function(t) {
                return {
                    name: t.name,
                    query: mo(t.bundledQuery),
                    readTime: ho(t.readTime)
                };
            }(t);
        }));
    }, t.prototype.saveNamedQuery = function(t, e) {
        return _o(t).put(function(t) {
            return {
                name: t.name,
                readTime: lo(Ri(t.readTime)),
                bundledQuery: t.bundledQuery
            };
        }(e));
    }, t;
}();

/**
 * Helper to get a typed SimpleDbStore for the bundles object store.
 */ function Io(t) {
    return we(t, "bundles");
}

/**
 * Helper to get a typed SimpleDbStore for the namedQueries object store.
 */ function _o(t) {
    return we(t, "namedQueries");
}

/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Implementation of DocumentOverlayCache using IndexedDb.
 */ var Eo = /** @class */ function() {
    /**
     * @param serializer - The document serializer.
     * @param userId - The userId for which we are accessing overlays.
     */
    function t(t, e) {
        this.serializer = t, this.userId = e;
    }
    return t.lt = function(e, n) {
        return new t(e, n.uid || "");
    }, t.prototype.getOverlay = function(t, e) {
        var n = this;
        return To(t).get(go(this.userId, e)).next((function(t) {
            return t ? yo(n.serializer, t) : null;
        }));
    }, t.prototype.getOverlays = function(t, e) {
        var n = this, r = vr();
        return Dt.forEach(e, (function(e) {
            return n.getOverlay(t, e).next((function(t) {
                null !== t && r.set(e, t);
            }));
        })).next((function() {
            return r;
        }));
    }, t.prototype.saveOverlays = function(t, e, n) {
        var r = this, i = [];
        return n.forEach((function(n, o) {
            var a = new oi(e, o);
            i.push(r.ht(t, a));
        })), Dt.waitFor(i);
    }, t.prototype.removeOverlaysForBatchId = function(t, e, n) {
        var r = this, i = new Set;
        // Get the set of unique collection paths.
        e.forEach((function(t) {
            return i.add(Kt(t.getCollectionPath()));
        }));
        var o = [];
        return i.forEach((function(e) {
            var i = IDBKeyRange.bound([ r.userId, e, n ], [ r.userId, e, n + 1 ], 
            /*lowerOpen=*/ !1, 
            /*upperOpen=*/ !0);
            o.push(To(t).H("collectionPathOverlayIndex", i));
        })), Dt.waitFor(o);
    }, t.prototype.getOverlaysForCollection = function(t, e, n) {
        var r = this, i = vr(), o = Kt(e), a = IDBKeyRange.bound([ this.userId, o, n ], [ this.userId, o, Number.POSITIVE_INFINITY ], 
        /*lowerOpen=*/ !0);
        return To(t).W("collectionPathOverlayIndex", a).next((function(t) {
            for (var e = 0, n = t; e < n.length; e++) {
                var o = n[e], a = yo(r.serializer, o);
                i.set(a.getKey(), a);
            }
            return i;
        }));
    }, t.prototype.getOverlaysForCollectionGroup = function(t, e, n, r) {
        var i, o = this, a = vr(), u = IDBKeyRange.bound([ this.userId, e, n ], [ this.userId, e, Number.POSITIVE_INFINITY ], 
        /*lowerOpen=*/ !0);
        return To(t).Y({
            index: "collectionGroupOverlayIndex",
            range: u
        }, (function(t, e, n) {
            // We do not want to return partial batch overlays, even if the size
            // of the result set exceeds the given `count` argument. Therefore, we
            // continue to aggregate results even after the result size exceeds
            // `count` if there are more overlays from the `currentBatchId`.
            var u = yo(o.serializer, e);
            a.size() < r || u.largestBatchId === i ? (a.set(u.getKey(), u), i = u.largestBatchId) : n.done();
        })).next((function() {
            return a;
        }));
    }, t.prototype.ht = function(t, e) {
        return To(t).put(function(t, e, n) {
            var r = go(e, n.mutation.key);
            return r[0], {
                userId: e,
                collectionPath: r[1],
                documentId: r[2],
                collectionGroup: n.mutation.key.getCollectionGroup(),
                largestBatchId: n.largestBatchId,
                overlayMutation: Qi(t.ct, n.mutation)
            };
        }(this.serializer, this.userId, e));
    }, t;
}();

/**
 * Helper to get a typed SimpleDbStore for the document overlay object store.
 */ function To(t) {
    return we(t, "documentOverlays");
}

/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// Note: This code is copied from the backend. Code that is not used by
// Firestore was removed.
/** Firestore index value writer.  */ var So = /** @class */ function() {
    function t() {}
    // The write methods below short-circuit writing terminators for values
    // containing a (terminating) truncated value.
    // As an example, consider the resulting encoding for:
    // ["bar", [2, "foo"]] -> (STRING, "bar", TERM, ARRAY, NUMBER, 2, STRING, "foo", TERM, TERM, TERM)
    // ["bar", [2, truncated("foo")]] -> (STRING, "bar", TERM, ARRAY, NUMBER, 2, STRING, "foo", TRUNC)
    // ["bar", truncated(["foo"])] -> (STRING, "bar", TERM, ARRAY. STRING, "foo", TERM, TRUNC)
    /** Writes an index value.  */    return t.prototype.Pt = function(t, e) {
        this.It(t, e), 
        // Write separator to split index values
        // (see go/firestore-storage-format#encodings).
        e.Tt();
    }, t.prototype.It = function(t, e) {
        if ("nullValue" in t) this.Et(e, 5); else if ("booleanValue" in t) this.Et(e, 10), 
        e.dt(t.booleanValue ? 1 : 0); else if ("integerValue" in t) this.Et(e, 15), e.dt(Me(t.integerValue)); else if ("doubleValue" in t) {
            var n = Me(t.doubleValue);
            isNaN(n) ? this.Et(e, 13) : (this.Et(e, 15), zt(n) ? 
            // -0.0, 0 and 0.0 are all considered the same
            e.dt(0) : e.dt(n));
        } else if ("timestampValue" in t) {
            var r = t.timestampValue;
            this.Et(e, 20), "string" == typeof r && (r = Re(r)), e.At("".concat(r.seconds || "")), 
            e.dt(r.nanos || 0);
        } else if ("stringValue" in t) this.Rt(t.stringValue, e), this.Vt(e); else if ("bytesValue" in t) this.Et(e, 30), 
        e.ft(Fe(t.bytesValue)), this.Vt(e); else if ("referenceValue" in t) this.gt(t.referenceValue, e); else if ("geoPointValue" in t) {
            var i = t.geoPointValue;
            this.Et(e, 45), e.dt(i.latitude || 0), e.dt(i.longitude || 0);
        } else "mapValue" in t ? an(t) ? this.Et(e, Number.MAX_SAFE_INTEGER) : (this.yt(t.mapValue, e), 
        this.Vt(e)) : "arrayValue" in t ? (this.wt(t.arrayValue, e), this.Vt(e)) : U();
    }, t.prototype.Rt = function(t, e) {
        this.Et(e, 25), this.St(t, e);
    }, t.prototype.St = function(t, e) {
        e.At(t);
    }, t.prototype.yt = function(t, e) {
        var n = t.fields || {};
        this.Et(e, 55);
        for (var r = 0, i = Object.keys(n); r < i.length; r++) {
            var o = i[r];
            this.Rt(o, e), this.It(n[o], e);
        }
    }, t.prototype.wt = function(t, e) {
        var n = t.values || [];
        this.Et(e, 50);
        for (var r = 0, i = n; r < i.length; r++) {
            var o = i[r];
            this.It(o, e);
        }
    }, t.prototype.gt = function(t, e) {
        var n = this;
        this.Et(e, 37), dt.fromName(t).path.forEach((function(t) {
            n.Et(e, 60), n.St(t, e);
        }));
    }, t.prototype.Et = function(t, e) {
        t.dt(e);
    }, t.prototype.Vt = function(t) {
        // While the SDK does not implement truncation, the truncation marker is
        // used to terminate all variable length values (which are strings, bytes,
        // references, arrays and maps).
        t.dt(2);
    }, t;
}();

/**
 * Counts the number of zeros in a byte.
 *
 * Visible for testing.
 */
function xo(t) {
    if (0 === t) return 8;
    var e = 0;
    return t >> 4 == 0 && (
    // Test if the first four bits are zero.
    e += 4, t <<= 4), t >> 6 == 0 && (
    // Test if the first two (or next two) bits are zero.
    e += 2, t <<= 2), t >> 7 == 0 && (
    // Test if the remaining bit is zero.
    e += 1), e
    /** Counts the number of leading zeros in the given byte array. */
    /**
 * Returns the number of bytes required to store "value". Leading zero bytes
 * are skipped.
 */;
}

function Co(t) {
    // This is just the number of bytes for the unsigned representation of the number.
    var e = 64 - function(t) {
        for (var e = 0, n = 0; n < 8; ++n) {
            var r = xo(255 & t[n]);
            if (e += r, 8 !== r) break;
        }
        return e;
    }(t);
    return Math.ceil(e / 8);
}

/**
 * OrderedCodeWriter is a minimal-allocation implementation of the writing
 * behavior defined by the backend.
 *
 * The code is ported from its Java counterpart.
 */ So.bt = new So;

var Do = /** @class */ function() {
    function t() {
        this.buffer = new Uint8Array(1024), this.position = 0;
    }
    return t.prototype.Dt = function(t) {
        for (var e = t[Symbol.iterator](), n = e.next(); !n.done; ) this.Ct(n.value), n = e.next();
        this.vt();
    }, t.prototype.Ft = function(t) {
        for (var e = t[Symbol.iterator](), n = e.next(); !n.done; ) this.Mt(n.value), n = e.next();
        this.xt();
    }, 
    /** Writes utf8 bytes into this byte sequence, ascending. */ t.prototype.Ot = function(t) {
        for (var e = 0, n = t; e < n.length; e++) {
            var r = n[e], i = r.charCodeAt(0);
            if (i < 128) this.Ct(i); else if (i < 2048) this.Ct(960 | i >>> 6), this.Ct(128 | 63 & i); else if (r < "\ud800" || "\udbff" < r) this.Ct(480 | i >>> 12), 
            this.Ct(128 | 63 & i >>> 6), this.Ct(128 | 63 & i); else {
                var o = r.codePointAt(0);
                this.Ct(240 | o >>> 18), this.Ct(128 | 63 & o >>> 12), this.Ct(128 | 63 & o >>> 6), 
                this.Ct(128 | 63 & o);
            }
        }
        this.vt();
    }, 
    /** Writes utf8 bytes into this byte sequence, descending */ t.prototype.Nt = function(t) {
        for (var e = 0, n = t; e < n.length; e++) {
            var r = n[e], i = r.charCodeAt(0);
            if (i < 128) this.Mt(i); else if (i < 2048) this.Mt(960 | i >>> 6), this.Mt(128 | 63 & i); else if (r < "\ud800" || "\udbff" < r) this.Mt(480 | i >>> 12), 
            this.Mt(128 | 63 & i >>> 6), this.Mt(128 | 63 & i); else {
                var o = r.codePointAt(0);
                this.Mt(240 | o >>> 18), this.Mt(128 | 63 & o >>> 12), this.Mt(128 | 63 & o >>> 6), 
                this.Mt(128 | 63 & o);
            }
        }
        this.xt();
    }, t.prototype.Lt = function(t) {
        // Values are encoded with a single byte length prefix, followed by the
        // actual value in big-endian format with leading 0 bytes dropped.
        var e = this.Bt(t), n = Co(e);
        this.kt(1 + n), this.buffer[this.position++] = 255 & n;
        // Write the length
        for (var r = e.length - n; r < e.length; ++r) this.buffer[this.position++] = 255 & e[r];
    }, t.prototype.qt = function(t) {
        // Values are encoded with a single byte length prefix, followed by the
        // inverted value in big-endian format with leading 0 bytes dropped.
        var e = this.Bt(t), n = Co(e);
        this.kt(1 + n), this.buffer[this.position++] = ~(255 & n);
        // Write the length
        for (var r = e.length - n; r < e.length; ++r) this.buffer[this.position++] = ~(255 & e[r]);
    }, 
    /**
     * Writes the "infinity" byte sequence that sorts after all other byte
     * sequences written in ascending order.
     */
    t.prototype.Qt = function() {
        this.Kt(255), this.Kt(255);
    }, 
    /**
     * Writes the "infinity" byte sequence that sorts before all other byte
     * sequences written in descending order.
     */
    t.prototype.$t = function() {
        this.Ut(255), this.Ut(255);
    }, 
    /**
     * Resets the buffer such that it is the same as when it was newly
     * constructed.
     */
    t.prototype.reset = function() {
        this.position = 0;
    }, t.prototype.seed = function(t) {
        this.kt(t.length), this.buffer.set(t, this.position), this.position += t.length;
    }, 
    /** Makes a copy of the encoded bytes in this buffer.  */ t.prototype.Wt = function() {
        return this.buffer.slice(0, this.position);
    }, 
    /**
     * Encodes `val` into an encoding so that the order matches the IEEE 754
     * floating-point comparison results with the following exceptions:
     *   -0.0 < 0.0
     *   all non-NaN < NaN
     *   NaN = NaN
     */
    t.prototype.Bt = function(t) {
        var e = 
        /** Converts a JavaScript number to a byte array (using big endian encoding). */
        function(t) {
            var e = new DataView(new ArrayBuffer(8));
            return e.setFloat64(0, t, /* littleEndian= */ !1), new Uint8Array(e.buffer);
        }(t), n = 0 != (128 & e[0]);
        // Check if the first bit is set. We use a bit mask since value[0] is
        // encoded as a number from 0 to 255.
        // Revert the two complement to get natural ordering
                e[0] ^= n ? 255 : 128;
        for (var r = 1; r < e.length; ++r) e[r] ^= n ? 255 : 0;
        return e;
    }, 
    /** Writes a single byte ascending to the buffer. */ t.prototype.Ct = function(t) {
        var e = 255 & t;
        0 === e ? (this.Kt(0), this.Kt(255)) : 255 === e ? (this.Kt(255), this.Kt(0)) : this.Kt(e);
    }, 
    /** Writes a single byte descending to the buffer.  */ t.prototype.Mt = function(t) {
        var e = 255 & t;
        0 === e ? (this.Ut(0), this.Ut(255)) : 255 === e ? (this.Ut(255), this.Ut(0)) : this.Ut(t);
    }, t.prototype.vt = function() {
        this.Kt(0), this.Kt(1);
    }, t.prototype.xt = function() {
        this.Ut(0), this.Ut(1);
    }, t.prototype.Kt = function(t) {
        this.kt(1), this.buffer[this.position++] = t;
    }, t.prototype.Ut = function(t) {
        this.kt(1), this.buffer[this.position++] = ~t;
    }, t.prototype.kt = function(t) {
        var e = t + this.position;
        if (!(e <= this.buffer.length)) {
            // Try doubling.
            var n = 2 * this.buffer.length;
            // Still not big enough? Just allocate the right size.
                        n < e && (n = e);
            // Create the new buffer.
            var r = new Uint8Array(n);
            r.set(this.buffer), // copy old data
            this.buffer = r;
        }
    }, t;
}(), No = /** @class */ function() {
    function t(t) {
        this.Gt = t;
    }
    return t.prototype.ft = function(t) {
        this.Gt.Dt(t);
    }, t.prototype.At = function(t) {
        this.Gt.Ot(t);
    }, t.prototype.dt = function(t) {
        this.Gt.Lt(t);
    }, t.prototype.Tt = function() {
        this.Gt.Qt();
    }, t;
}(), Ao = /** @class */ function() {
    function t(t) {
        this.Gt = t;
    }
    return t.prototype.ft = function(t) {
        this.Gt.Ft(t);
    }, t.prototype.At = function(t) {
        this.Gt.Nt(t);
    }, t.prototype.dt = function(t) {
        this.Gt.qt(t);
    }, t.prototype.Tt = function() {
        this.Gt.$t();
    }, t;
}(), ko = /** @class */ function() {
    function t() {
        this.Gt = new Do, this.zt = new No(this.Gt), this.jt = new Ao(this.Gt);
    }
    return t.prototype.seed = function(t) {
        this.Gt.seed(t);
    }, t.prototype.Ht = function(t) {
        return 0 /* IndexKind.ASCENDING */ === t ? this.zt : this.jt;
    }, t.prototype.Wt = function() {
        return this.Gt.Wt();
    }, t.prototype.reset = function() {
        this.Gt.reset();
    }, t;
}(), Po = /** @class */ function() {
    function t(t, e, n, r) {
        this.indexId = t, this.documentKey = e, this.arrayValue = n, this.directionalValue = r
        /**
     * Returns an IndexEntry entry that sorts immediately after the current
     * directional value.
     */;
    }
    return t.prototype.Jt = function() {
        var e = this.directionalValue.length, n = 0 === e || 255 === this.directionalValue[e - 1] ? e + 1 : e, r = new Uint8Array(n);
        return r.set(this.directionalValue, 0), n !== e ? r.set([ 0 ], this.directionalValue.length) : ++r[r.length - 1], 
        new t(this.indexId, this.documentKey, this.arrayValue, r);
    }, t;
}();

function Oo(t, e) {
    var n = t.indexId - e.indexId;
    return 0 !== n ? n : 0 !== (n = Ro(t.arrayValue, e.arrayValue)) ? n : 0 !== (n = Ro(t.directionalValue, e.directionalValue)) ? n : dt.comparator(t.documentKey, e.documentKey);
}

function Ro(t, e) {
    for (var n = 0; n < t.length && n < e.length; ++n) {
        var r = t[n] - e[n];
        if (0 !== r) return r;
    }
    return t.length - e.length;
}

/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A light query planner for Firestore.
 *
 * This class matches a `FieldIndex` against a Firestore Query `Target`. It
 * determines whether a given index can be used to serve the specified target.
 *
 * The following table showcases some possible index configurations:
 *
 * Query                                               | Index
 * -----------------------------------------------------------------------------
 * where('a', '==', 'a').where('b', '==', 'b')         | a ASC, b DESC
 * where('a', '==', 'a').where('b', '==', 'b')         | a ASC
 * where('a', '==', 'a').where('b', '==', 'b')         | b DESC
 * where('a', '>=', 'a').orderBy('a')                  | a ASC
 * where('a', '>=', 'a').orderBy('a', 'desc')          | a DESC
 * where('a', '>=', 'a').orderBy('a').orderBy('b')     | a ASC, b ASC
 * where('a', '>=', 'a').orderBy('a').orderBy('b')     | a ASC
 * where('a', 'array-contains', 'a').orderBy('b')      | a CONTAINS, b ASCENDING
 * where('a', 'array-contains', 'a').orderBy('b')      | a CONTAINS
 */ var Mo = /** @class */ function() {
    function t(t) {
        // The inequality filters of the target (if it exists).
        // Note: The sort on FieldFilters is not required. Using SortedSet here just to utilize the custom
        // comparator.
        this.Yt = new xe((function(t, e) {
            return ft.comparator(t.field, e.field);
        })), this.collectionId = null != t.collectionGroup ? t.collectionGroup : t.path.lastSegment(), 
        this.Zt = t.orderBy, this.Xt = [];
        for (var e = 0, n = t.filters; e < n.length; e++) {
            var r = n[e];
            r.isInequality() ? this.Yt = this.Yt.add(r) : this.Xt.push(r);
        }
    }
    return Object.defineProperty(t.prototype, "en", {
        get: function() {
            return this.Yt.size > 1;
        },
        enumerable: !1,
        configurable: !0
    }), 
    /**
     * Returns whether the index can be used to serve the TargetIndexMatcher's
     * target.
     *
     * An index is considered capable of serving the target when:
     * - The target uses all index segments for its filters and orderBy clauses.
     *   The target can have additional filter and orderBy clauses, but not
     *   fewer.
     * - If an ArrayContains/ArrayContainsAnyfilter is used, the index must also
     *   have a corresponding `CONTAINS` segment.
     * - All directional index segments can be mapped to the target as a series of
     *   equality filters, a single inequality filter and a series of orderBy
     *   clauses.
     * - The segments that represent the equality filters may appear out of order.
     * - The optional segment for the inequality filter must appear after all
     *   equality segments.
     * - The segments that represent that orderBy clause of the target must appear
     *   in order after all equality and inequality segments. Single orderBy
     *   clauses cannot be skipped, but a continuous orderBy suffix may be
     *   omitted.
     */
    t.prototype.tn = function(t) {
        if (B(t.collectionGroup === this.collectionId), this.en) 
        // Only single inequality is supported for now.
        // TODO(Add support for multiple inequality query): b/298441043
        return !1;
        // If there is an array element, find a matching filter.
                var e = vt(t);
        if (void 0 !== e && !this.nn(e)) return !1;
        // Process all equalities first. Equalities can appear out of order.
        for (var n = mt(t), r = new Set, i = 0, o = 0; i < n.length && this.nn(n[i]); ++i) r = r.add(n[i].fieldPath.canonicalString());
        // If we already have processed all segments, all segments are used to serve
        // the equality filters and we do not need to map any segments to the
        // target's inequality and orderBy clauses.
                if (i === n.length) return !0;
        if (this.Yt.size > 0) {
            // Only a single inequality is currently supported. Get the only entry in the set.
            var a = this.Yt.getIterator().getNext();
            // If there is an inequality filter and the field was not in one of the
            // equality filters above, the next segment must match both the filter
            // and the first orderBy clause.
                        if (!r.has(a.field.canonicalString())) {
                var u = n[i];
                if (!this.rn(a, u) || !this.sn(this.Zt[o++], u)) return !1;
            }
            ++i;
        }
        // All remaining segments need to represent the prefix of the target's
        // orderBy.
                for (;i < n.length; ++i) {
            var s = n[i];
            if (o >= this.Zt.length || !this.sn(this.Zt[o++], s)) return !1;
        }
        return !0;
    }, 
    /**
     * Returns a full matched field index for this target. Currently multiple
     * inequality query is not supported so function returns null.
     */
    t.prototype.on = function() {
        if (this.en) return null;
        // We want to make sure only one segment created for one field. For example,
        // in case like a == 3 and a > 2, Index {a ASCENDING} will only be created
        // once.
                for (var t = new xe(ft.comparator), e = [], n = 0, r = this.Xt; n < r.length; n++) {
            var i = r[n];
            if (!i.field.isKeyField()) if ("array-contains" /* Operator.ARRAY_CONTAINS */ === i.op || "array-contains-any" /* Operator.ARRAY_CONTAINS_ANY */ === i.op) e.push(new gt(i.field, 2 /* IndexKind.CONTAINS */)); else {
                if (t.has(i.field)) continue;
                t = t.add(i.field), e.push(new gt(i.field, 0 /* IndexKind.ASCENDING */));
            }
        }
        // Note: We do not explicitly check `this.inequalityFilter` but rather rely
        // on the target defining an appropriate "order by" to ensure that the
        // required index segment is added. The query engine would reject a query
        // with an inequality filter that lacks the required order-by clause.
                for (var o = 0, a = this.Zt; o < a.length; o++) {
            var u = a[o];
            // Stop adding more segments if we see a order-by on key. Typically this
            // is the default implicit order-by which is covered in the index_entry
            // table as a separate column. If it is not the default order-by, the
            // generated index will be missing some segments optimized for order-bys,
            // which is probably fine.
                        u.field.isKeyField() || t.has(u.field) || (t = t.add(u.field), e.push(new gt(u.field, "asc" /* Direction.ASCENDING */ === u.dir ? 0 /* IndexKind.ASCENDING */ : 1 /* IndexKind.DESCENDING */)));
        }
        return new pt(pt.UNKNOWN_ID, this.collectionId, e, bt.empty());
    }, t.prototype.nn = function(t) {
        for (var e = 0, n = this.Xt; e < n.length; e++) {
            var r = n[e];
            if (this.rn(r, t)) return !0;
        }
        return !1;
    }, t.prototype.rn = function(t, e) {
        if (void 0 === t || !t.field.isEqual(e.fieldPath)) return !1;
        var n = "array-contains" /* Operator.ARRAY_CONTAINS */ === t.op || "array-contains-any" /* Operator.ARRAY_CONTAINS_ANY */ === t.op;
        return 2 /* IndexKind.CONTAINS */ === e.kind === n;
    }, t.prototype.sn = function(t, e) {
        return !!t.field.isEqual(e.fieldPath) && (0 /* IndexKind.ASCENDING */ === e.kind && "asc" /* Direction.ASCENDING */ === t.dir || 1 /* IndexKind.DESCENDING */ === e.kind && "desc" /* Direction.DESCENDING */ === t.dir);
    }, t;
}();

/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Provides utility functions that help with boolean logic transformations needed for handling
 * complex filters used in queries.
 */
/**
 * The `in` filter is only a syntactic sugar over a disjunction of equalities. For instance: `a in
 * [1,2,3]` is in fact `a==1 || a==2 || a==3`. This method expands any `in` filter in the given
 * input into a disjunction of equality filters and returns the expanded filter.
 */ function Fo(t) {
    var e, n;
    if (B(t instanceof bn || t instanceof In), t instanceof bn) {
        if (t instanceof Mn) {
            var r = (null === (n = null === (e = t.value.arrayValue) || void 0 === e ? void 0 : e.values) || void 0 === n ? void 0 : n.map((function(e) {
                return bn.create(t.field, "==" /* Operator.EQUAL */ , e);
            }))) || [];
            return In.create(r, "or" /* CompositeOperator.OR */);
        }
        // We have reached other kinds of field filters.
                return t;
    }
    // We have a composite filter.
        var i = t.filters.map((function(t) {
        return Fo(t);
    }));
    return In.create(i, t.op);
}

/**
 * Given a composite filter, returns the list of terms in its disjunctive normal form.
 *
 * <p>Each element in the return value is one term of the resulting DNF. For instance: For the
 * input: (A || B) && C, the DNF form is: (A && C) || (B && C), and the return value is a list
 * with two elements: a composite filter that performs (A && C), and a composite filter that
 * performs (B && C).
 *
 * @param filter the composite filter to calculate DNF transform for.
 * @return the terms in the DNF transform.
 */ function Vo(t) {
    if (0 === t.getFilters().length) return [];
    var e = Bo(Fo(t));
    return B(Uo(e)), Lo(e) || qo(e) ? [ e ] : e.getFilters()
    /** Returns true if the given filter is a single field filter. e.g. (a == 10). */;
}

function Lo(t) {
    return t instanceof bn;
}

/**
 * Returns true if the given filter is the conjunction of one or more field filters. e.g. (a == 10
 * && b == 20)
 */ function qo(t) {
    return t instanceof In && Tn(t);
}

/**
 * Returns whether or not the given filter is in disjunctive normal form (DNF).
 *
 * <p>In boolean logic, a disjunctive normal form (DNF) is a canonical normal form of a logical
 * formula consisting of a disjunction of conjunctions; it can also be described as an OR of ANDs.
 *
 * <p>For more info, visit: https://en.wikipedia.org/wiki/Disjunctive_normal_form
 */ function Uo(t) {
    return Lo(t) || qo(t) || 
    /**
     * Returns true if the given filter is the disjunction of one or more "flat conjunctions" and
     * field filters. e.g. (a == 10) || (b==20 && c==30)
     */
    function(t) {
        if (t instanceof In && En(t)) {
            for (var e = 0, n = t.getFilters(); e < n.length; e++) {
                var r = n[e];
                if (!Lo(r) && !qo(r)) return !1;
            }
            return !0;
        }
        return !1;
    }(t);
}

function Bo(t) {
    if (B(t instanceof bn || t instanceof In), t instanceof bn) return t;
    if (1 === t.filters.length) return Bo(t.filters[0]);
    // Compute DNF for each of the subfilters first
        var e = t.filters.map((function(t) {
        return Bo(t);
    })), n = In.create(e, t.op);
    return Uo(n = Ko(n)) ? n : (B(n instanceof In), B(_n(n)), B(n.filters.length > 1), 
    n.filters.reduce((function(t, e) {
        return zo(t, e);
    })));
}

function zo(t, e) {
    var n;
    return B(t instanceof bn || t instanceof In), B(e instanceof bn || e instanceof In), 
    // FieldFilter FieldFilter
    n = t instanceof bn ? e instanceof bn ? function(t, e) {
        // Conjunction distribution for two field filters is the conjunction of them.
        return In.create([ t, e ], "and" /* CompositeOperator.AND */);
    }(t, e) : Go(t, e) : e instanceof bn ? Go(e, t) : function(t, e) {
        // There are four cases:
        // (A & B) & (C & D) --> (A & B & C & D)
        // (A & B) & (C | D) --> (A & B & C) | (A & B & D)
        // (A | B) & (C & D) --> (C & D & A) | (C & D & B)
        // (A | B) & (C | D) --> (A & C) | (A & D) | (B & C) | (B & D)
        // Case 1 is a merge.
        if (B(t.filters.length > 0 && e.filters.length > 0), _n(t) && _n(e)) return Dn(t, e.getFilters());
        // Case 2,3,4 all have at least one side (lhs or rhs) that is a disjunction. In all three cases
        // we should take each element of the disjunction and distribute it over the other side, and
        // return the disjunction of the distribution results.
                var n = En(t) ? t : e, r = En(t) ? e : t, i = n.filters.map((function(t) {
            return zo(t, r);
        }));
        return In.create(i, "or" /* CompositeOperator.OR */);
    }(t, e), Ko(n);
}

function Go(t, e) {
    // There are two cases:
    // A & (B & C) --> (A & B & C)
    // A & (B | C) --> (A & B) | (A & C)
    if (_n(e)) 
    // Case 1
    return Dn(e, t.getFilters());
    // Case 2
    var n = e.filters.map((function(e) {
        return zo(t, e);
    }));
    return In.create(n, "or" /* CompositeOperator.OR */);
}

/**
 * Applies the associativity property to the given filter and returns the resulting filter.
 *
 * <ul>
 *   <li>A | (B | C) == (A | B) | C == (A | B | C)
 *   <li>A & (B & C) == (A & B) & C == (A & B & C)
 * </ul>
 *
 * <p>For more info, visit: https://en.wikipedia.org/wiki/Associative_property#Propositional_logic
 */ function Ko(t) {
    if (B(t instanceof bn || t instanceof In), t instanceof bn) return t;
    var e = t.getFilters();
    // If the composite filter only contains 1 filter, apply associativity to it.
        if (1 === e.length) return Ko(e[0]);
    // Associativity applied to a flat composite filter results is itself.
        if (Sn(t)) return t;
    // First apply associativity to all subfilters. This will in turn recursively apply
    // associativity to all nested composite filters and field filters.
        var n = e.map((function(t) {
        return Ko(t);
    })), r = [];
    // For composite subfilters that perform the same kind of logical operation as `compositeFilter`
    // take out their filters and add them to `compositeFilter`. For example:
    // compositeFilter = (A | (B | C | D))
    // compositeSubfilter = (B | C | D)
    // Result: (A | B | C | D)
    // Note that the `compositeSubfilter` has been eliminated, and its filters (B, C, D) have been
    // added to the top-level "compositeFilter".
        return n.forEach((function(e) {
        e instanceof bn ? r.push(e) : e instanceof In && (e.op === t.op ? 
        // compositeFilter: (A | (B | C))
        // compositeSubfilter: (B | C)
        // Result: (A | B | C)
        r.push.apply(
        // compositeFilter: (A | (B | C))
        // compositeSubfilter: (B | C)
        // Result: (A | B | C)
        r, e.filters) : 
        // compositeFilter: (A | (B & C))
        // compositeSubfilter: (B & C)
        // Result: (A | (B & C))
        r.push(e));
    })), 1 === r.length ? r[0] : In.create(r, t.op)
    /**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
    /**
 * An in-memory implementation of IndexManager.
 */;
}

var jo = /** @class */ function() {
    function t() {
        this._n = new Qo;
    }
    return t.prototype.addToCollectionParentIndex = function(t, e) {
        return this._n.add(e), Dt.resolve();
    }, t.prototype.getCollectionParents = function(t, e) {
        return Dt.resolve(this._n.getEntries(e));
    }, t.prototype.addFieldIndex = function(t, e) {
        // Field indices are not supported with memory persistence.
        return Dt.resolve();
    }, t.prototype.deleteFieldIndex = function(t, e) {
        // Field indices are not supported with memory persistence.
        return Dt.resolve();
    }, t.prototype.deleteAllFieldIndexes = function(t) {
        // Field indices are not supported with memory persistence.
        return Dt.resolve();
    }, t.prototype.createTargetIndexes = function(t, e) {
        // Field indices are not supported with memory persistence.
        return Dt.resolve();
    }, t.prototype.getDocumentsMatchingTarget = function(t, e) {
        // Field indices are not supported with memory persistence.
        return Dt.resolve(null);
    }, t.prototype.getIndexType = function(t, e) {
        // Field indices are not supported with memory persistence.
        return Dt.resolve(0 /* IndexType.NONE */);
    }, t.prototype.getFieldIndexes = function(t, e) {
        // Field indices are not supported with memory persistence.
        return Dt.resolve([]);
    }, t.prototype.getNextCollectionGroupToUpdate = function(t) {
        // Field indices are not supported with memory persistence.
        return Dt.resolve(null);
    }, t.prototype.getMinOffset = function(t, e) {
        return Dt.resolve(Et.min());
    }, t.prototype.getMinOffsetFromCollectionGroup = function(t, e) {
        return Dt.resolve(Et.min());
    }, t.prototype.updateCollectionGroup = function(t, e, n) {
        // Field indices are not supported with memory persistence.
        return Dt.resolve();
    }, t.prototype.updateIndexEntries = function(t, e) {
        // Field indices are not supported with memory persistence.
        return Dt.resolve();
    }, t;
}(), Qo = /** @class */ function() {
    function t() {
        this.index = {};
    }
    // Returns false if the entry already existed.
        return t.prototype.add = function(t) {
        var e = t.lastSegment(), n = t.popLast(), r = this.index[e] || new xe(lt.comparator), i = !r.has(n);
        return this.index[e] = r.add(n), i;
    }, t.prototype.has = function(t) {
        var e = t.lastSegment(), n = t.popLast(), r = this.index[e];
        return r && r.has(n);
    }, t.prototype.getEntries = function(t) {
        return (this.index[t] || new xe(lt.comparator)).toArray();
    }, t;
}(), Wo = new Uint8Array(0), Yo = /** @class */ function() {
    function t(t, e) {
        this.databaseId = e, 
        /**
             * An in-memory copy of the index entries we've already written since the SDK
             * launched. Used to avoid re-writing the same entry repeatedly.
             *
             * This is *NOT* a complete cache of what's in persistence and so can never be
             * used to satisfy reads.
             */
        this.an = new Qo, 
        /**
             * Maps from a target to its equivalent list of sub-targets. Each sub-target
             * contains only one term from the target's disjunctive normal form (DNF).
             */
        this.un = new cr((function(t) {
            return Un(t);
        }), (function(t, e) {
            return Bn(t, e);
        })), this.uid = t.uid || ""
        /**
     * Adds a new entry to the collection parent index.
     *
     * Repeated calls for the same collectionPath should be avoided within a
     * transaction as IndexedDbIndexManager only caches writes once a transaction
     * has been committed.
     */;
    }
    return t.prototype.addToCollectionParentIndex = function(t, e) {
        var n = this;
        if (!this.an.has(e)) {
            var r = e.lastSegment(), i = e.popLast();
            t.addOnCommittedListener((function() {
                // Add the collection to the in memory cache only if the transaction was
                // successfully committed.
                n.an.add(e);
            }));
            var o = {
                collectionId: r,
                parent: Kt(i)
            };
            return Ho(t).put(o);
        }
        return Dt.resolve();
    }, t.prototype.getCollectionParents = function(t, e) {
        var n = [], r = IDBKeyRange.bound([ e, "" ], [ at(e), "" ], 
        /*lowerOpen=*/ !1, 
        /*upperOpen=*/ !0);
        return Ho(t).W(r).next((function(t) {
            for (var r = 0, i = t; r < i.length; r++) {
                var o = i[r];
                // This collectionId guard shouldn't be necessary (and isn't as long
                // as we're running in a real browser), but there's a bug in
                // indexeddbshim that breaks our range in our tests running in node:
                // https://github.com/axemclion/IndexedDBShim/issues/334
                                if (o.collectionId !== e) break;
                n.push(Wt(o.parent));
            }
            return n;
        }));
    }, t.prototype.addFieldIndex = function(t, e) {
        var n = this, r = Xo(t), i = function(t) {
            return {
                indexId: t.indexId,
                collectionGroup: t.collectionGroup,
                fields: t.fields.map((function(t) {
                    return [ t.fieldPath.canonicalString(), t.kind ];
                }))
            };
        }(e);
        // TODO(indexing): Verify that the auto-incrementing index ID works in
        // Safari & Firefox.
                delete i.indexId;
        // `indexId` is auto-populated by IndexedDb
        var o = r.add(i);
        if (e.indexState) {
            var a = Zo(t);
            return o.next((function(t) {
                a.put(wo(t, n.uid, e.indexState.sequenceNumber, e.indexState.offset));
            }));
        }
        return o.next();
    }, t.prototype.deleteFieldIndex = function(t, e) {
        var n = Xo(t), r = Zo(t), i = Jo(t);
        return n.delete(e.indexId).next((function() {
            return r.delete(IDBKeyRange.bound([ e.indexId ], [ e.indexId + 1 ], 
            /*lowerOpen=*/ !1, 
            /*upperOpen=*/ !0));
        })).next((function() {
            return i.delete(IDBKeyRange.bound([ e.indexId ], [ e.indexId + 1 ], 
            /*lowerOpen=*/ !1, 
            /*upperOpen=*/ !0));
        }));
    }, t.prototype.deleteAllFieldIndexes = function(t) {
        var e = Xo(t), n = Jo(t), r = Zo(t);
        return e.H().next((function() {
            return n.H();
        })).next((function() {
            return r.H();
        }));
    }, t.prototype.createTargetIndexes = function(t, e) {
        var n = this;
        return Dt.forEach(this.cn(e), (function(e) {
            return n.getIndexType(t, e).next((function(r) {
                if (0 /* IndexType.NONE */ === r || 1 /* IndexType.PARTIAL */ === r) {
                    var i = new Mo(e).on();
                    if (null != i) return n.addFieldIndex(t, i);
                }
            }));
        }));
    }, t.prototype.getDocumentsMatchingTarget = function(t, e) {
        var n = this, r = Jo(t), i = !0, o = new Map;
        return Dt.forEach(this.cn(e), (function(e) {
            return n.ln(t, e).next((function(t) {
                i && (i = !!t), o.set(e, t);
            }));
        })).next((function() {
            if (i) {
                var t = br(), a = [];
                return Dt.forEach(o, (function(i, o) {
                    F("IndexedDbIndexManager", "Using index ".concat(function(t) {
                        return "id=".concat(t.indexId, "|cg=").concat(t.collectionGroup, "|f=").concat(t.fields.map((function(t) {
                            return "".concat(t.fieldPath, ":").concat(t.kind);
                        })).join(","));
                    }(i), " to execute ").concat(Un(e)));
                    var u = function(t, e) {
                        var n = vt(e);
                        if (void 0 === n) return null;
                        for (var r = 0, i = Gn(t, n.fieldPath); r < i.length; r++) {
                            var o = i[r];
                            switch (o.op) {
                              case "array-contains-any" /* Operator.ARRAY_CONTAINS_ANY */ :
                                return o.value.arrayValue.values || [];

                              case "array-contains" /* Operator.ARRAY_CONTAINS */ :
                                return [ o.value ];
                                // Remaining filters are not array filters.
                                                        }
                        }
                        return null;
                    }(o, i), s = function(t, e) {
                        for (var n = new Map, r = 0, i = mt(e); r < i.length; r++) for (var o = i[r], a = 0, u = Gn(t, o.fieldPath); a < u.length; a++) {
                            var s = u[a];
                            switch (s.op) {
                              case "==" /* Operator.EQUAL */ :
                              case "in" /* Operator.IN */ :
                                // Encode equality prefix, which is encoded in the index value before
                                // the inequality (e.g. `a == 'a' && b != 'b'` is encoded to
                                // `value != 'ab'`).
                                n.set(o.fieldPath.canonicalString(), s.value);
                                break;

                              case "not-in" /* Operator.NOT_IN */ :
                              case "!=" /* Operator.NOT_EQUAL */ :
                                // NotIn/NotEqual is always a suffix. There cannot be any remaining
                                // segments and hence we can return early here.
                                return n.set(o.fieldPath.canonicalString(), s.value), Array.from(n.values());
                                // Remaining filters cannot be used as notIn bounds.
                                                        }
                        }
                        return null;
                    }(o, i), c = function(t, e) {
                        // For each segment, retrieve a lower bound if there is a suitable filter or
                        // startAt.
                        for (var n = [], r = !0, i = 0, o = mt(e); i < o.length; i++) {
                            var a = o[i], u = 0 /* IndexKind.ASCENDING */ === a.kind ? Kn(t, a.fieldPath, t.startAt) : jn(t, a.fieldPath, t.startAt);
                            n.push(u.value), r && (r = u.inclusive);
                        }
                        return new pn(n, r);
                    }(o, i), l = function(t, e) {
                        // For each segment, retrieve an upper bound if there is a suitable filter or
                        // endAt.
                        for (var n = [], r = !0, i = 0, o = mt(e); i < o.length; i++) {
                            var a = o[i], u = 0 /* IndexKind.ASCENDING */ === a.kind ? jn(t, a.fieldPath, t.endAt) : Kn(t, a.fieldPath, t.endAt);
                            n.push(u.value), r && (r = u.inclusive);
                        }
                        return new pn(n, r);
                    }(o, i), h = n.hn(i, o, c), f = n.hn(i, o, l), d = n.Pn(i, o, s), p = n.In(i.indexId, u, h, c.inclusive, f, l.inclusive, d);
                    return Dt.forEach(p, (function(n) {
                        return r.j(n, e.limit).next((function(e) {
                            e.forEach((function(e) {
                                var n = dt.fromSegments(e.documentKey);
                                t.has(n) || (t = t.add(n), a.push(n));
                            }));
                        }));
                    }));
                })).next((function() {
                    return a;
                }));
            }
            return Dt.resolve(null);
        }));
    }, t.prototype.cn = function(t) {
        var e = this.un.get(t);
        return e || (e = 0 === t.filters.length ? [ t ] : Vo(In.create(t.filters, "and" /* CompositeOperator.AND */)).map((function(e) {
            return qn(t.path, t.collectionGroup, t.orderBy, e.getFilters(), t.limit, t.startAt, t.endAt);
        })), this.un.set(t, e), e);
    }, 
    /**
     * Constructs a key range query on `DbIndexEntryStore` that unions all
     * bounds.
     */
    t.prototype.In = function(t, e, n, r, i, o, a) {
        for (var u = this, s = (null != e ? e.length : 1) * Math.max(n.length, i.length), c = s / (null != e ? e.length : 1), l = [], h = function(s) {
            var h = e ? f.Tn(e[s / c]) : Wo, d = f.En(t, h, n[s % c], r), p = f.dn(t, h, i[s % c], o), v = a.map((function(e) {
                return u.En(t, h, e, 
                /* inclusive= */ !0);
            }));
            l.push.apply(l, f.createRange(d, p, v));
        }, f = this, d = 0
        // The number of total index scans we union together. This is similar to a
        // distributed normal form, but adapted for array values. We create a single
        // index range per value in an ARRAY_CONTAINS or ARRAY_CONTAINS_ANY filter
        // combined with the values from the query bounds.
        ; d < s; ++d) h(d);
        return l;
    }, 
    /** Generates the lower bound for `arrayValue` and `directionalValue`. */ t.prototype.En = function(t, e, n, r) {
        var i = new Po(t, dt.empty(), e, n);
        return r ? i : i.Jt();
    }, 
    /** Generates the upper bound for `arrayValue` and `directionalValue`. */ t.prototype.dn = function(t, e, n, r) {
        var i = new Po(t, dt.empty(), e, n);
        return r ? i.Jt() : i;
    }, t.prototype.ln = function(t, e) {
        var n = new Mo(e), r = null != e.collectionGroup ? e.collectionGroup : e.path.lastSegment();
        return this.getFieldIndexes(t, r).next((function(t) {
            for (
            // Return the index with the most number of segments.
            var e = null, r = 0, i = t; r < i.length; r++) {
                var o = i[r];
                n.tn(o) && (!e || o.fields.length > e.fields.length) && (e = o);
            }
            return e;
        }));
    }, t.prototype.getIndexType = function(t, e) {
        var n = this, r = 2 /* IndexType.FULL */ , i = this.cn(e);
        return Dt.forEach(i, (function(e) {
            return n.ln(t, e).next((function(t) {
                t ? 0 /* IndexType.NONE */ !== r && t.fields.length < function(t) {
                    for (var e = new xe(ft.comparator), n = !1, r = 0, i = t.filters; r < i.length; r++) for (var o = 0, a = i[r].getFlattenedFilters(); o < a.length; o++) {
                        var u = a[o];
                        // __name__ is not an explicit segment of any index, so we don't need to
                        // count it.
                                                u.field.isKeyField() || (
                        // ARRAY_CONTAINS or ARRAY_CONTAINS_ANY filters must be counted separately.
                        // For instance, it is possible to have an index for "a ARRAY a ASC". Even
                        // though these are on the same field, they should be counted as two
                        // separate segments in an index.
                        "array-contains" /* Operator.ARRAY_CONTAINS */ === u.op || "array-contains-any" /* Operator.ARRAY_CONTAINS_ANY */ === u.op ? n = !0 : e = e.add(u.field));
                    }
                    for (var s = 0, c = t.orderBy; s < c.length; s++) {
                        var l = c[s];
                        // __name__ is not an explicit segment of any index, so we don't need to
                        // count it.
                                                l.field.isKeyField() || (e = e.add(l.field));
                    }
                    return e.size + (n ? 1 : 0);
                }(e) && (r = 1 /* IndexType.PARTIAL */) : r = 0 /* IndexType.NONE */;
            }));
        })).next((function() {
            // OR queries have more than one sub-target (one sub-target per DNF term). We currently consider
            // OR queries that have a `limit` to have a partial index. For such queries we perform sorting
            // and apply the limit in memory as a post-processing step.
            return function(t) {
                return null !== t.limit;
            }(e) && i.length > 1 && 2 /* IndexType.FULL */ === r ? 1 /* IndexType.PARTIAL */ : r;
        }));
    }, 
    /**
     * Returns the byte encoded form of the directional values in the field index.
     * Returns `null` if the document does not have all fields specified in the
     * index.
     */
    t.prototype.An = function(t, e) {
        for (var n = new ko, r = 0, i = mt(t); r < i.length; r++) {
            var o = i[r], a = e.data.field(o.fieldPath);
            if (null == a) return null;
            var u = n.Ht(o.kind);
            So.bt.Pt(a, u);
        }
        return n.Wt();
    }, 
    /** Encodes a single value to the ascending index format. */ t.prototype.Tn = function(t) {
        var e = new ko;
        return So.bt.Pt(t, e.Ht(0 /* IndexKind.ASCENDING */)), e.Wt();
    }, 
    /**
     * Returns an encoded form of the document key that sorts based on the key
     * ordering of the field index.
     */
    t.prototype.Rn = function(t, e) {
        var n = new ko;
        return So.bt.Pt(Ze(this.databaseId, e), n.Ht(function(t) {
            var e = mt(t);
            return 0 === e.length ? 0 /* IndexKind.ASCENDING */ : e[e.length - 1].kind;
        }(t))), n.Wt();
    }, 
    /**
     * Encodes the given field values according to the specification in `target`.
     * For IN queries, a list of possible values is returned.
     */
    t.prototype.Pn = function(t, e, n) {
        if (null === n) return [];
        var r = [];
        r.push(new ko);
        for (var i = 0, o = 0, a = mt(t); o < a.length; o++) for (var u = a[o], s = n[i++], c = 0, l = r; c < l.length; c++) {
            var h = l[c];
            if (this.Vn(e, u.fieldPath) && tn(s)) r = this.mn(r, u, s); else {
                var f = h.Ht(u.kind);
                So.bt.Pt(s, f);
            }
        }
        return this.fn(r);
    }, 
    /**
     * Encodes the given bounds according to the specification in `target`. For IN
     * queries, a list of possible values is returned.
     */
    t.prototype.hn = function(t, e, n) {
        return this.Pn(t, e, n.position);
    }, 
    /** Returns the byte representation for the provided encoders. */ t.prototype.fn = function(t) {
        for (var e = [], n = 0; n < t.length; ++n) e[n] = t[n].Wt();
        return e;
    }, 
    /**
     * Creates a separate encoder for each element of an array.
     *
     * The method appends each value to all existing encoders (e.g. filter("a",
     * "==", "a1").filter("b", "in", ["b1", "b2"]) becomes ["a1,b1", "a1,b2"]). A
     * list of new encoders is returned.
     */
    t.prototype.mn = function(t, e, n) {
        for (var i = r([], t, !0), o = [], a = 0, u = n.arrayValue.values || []; a < u.length; a++) for (var s = u[a], c = 0, l = i; c < l.length; c++) {
            var h = l[c], f = new ko;
            f.seed(h.Wt()), So.bt.Pt(s, f.Ht(e.kind)), o.push(f);
        }
        return o;
    }, t.prototype.Vn = function(t, e) {
        return !!t.filters.find((function(t) {
            return t instanceof bn && t.field.isEqual(e) && ("in" /* Operator.IN */ === t.op || "not-in" /* Operator.NOT_IN */ === t.op);
        }));
    }, t.prototype.getFieldIndexes = function(t, e) {
        var n = this, r = Xo(t), i = Zo(t);
        return (e ? r.W("collectionGroupIndex", IDBKeyRange.bound(e, e)) : r.W()).next((function(t) {
            var e = [];
            return Dt.forEach(t, (function(t) {
                return i.get([ t.indexId, n.uid ]).next((function(n) {
                    e.push(function(t, e) {
                        var n = e ? new bt(e.sequenceNumber, new Et(ho(e.readTime), new dt(Wt(e.documentKey)), e.largestBatchId)) : bt.empty(), r = t.fields.map((function(t) {
                            var e = t[0], n = t[1];
                            return new gt(ft.fromServerFormat(e), n);
                        }));
                        return new pt(t.indexId, t.collectionGroup, r, n);
                    }(t, n));
                }));
            })).next((function() {
                return e;
            }));
        }));
    }, t.prototype.getNextCollectionGroupToUpdate = function(t) {
        return this.getFieldIndexes(t).next((function(t) {
            return 0 === t.length ? null : (t.sort((function(t, e) {
                var n = t.indexState.sequenceNumber - e.indexState.sequenceNumber;
                return 0 !== n ? n : it(t.collectionGroup, e.collectionGroup);
            })), t[0].collectionGroup);
        }));
    }, t.prototype.updateCollectionGroup = function(t, e, n) {
        var r = this, i = Xo(t), o = Zo(t);
        return this.gn(t).next((function(t) {
            return i.W("collectionGroupIndex", IDBKeyRange.bound(e, e)).next((function(e) {
                return Dt.forEach(e, (function(e) {
                    return o.put(wo(e.indexId, r.uid, t, n));
                }));
            }));
        }));
    }, t.prototype.updateIndexEntries = function(t, e) {
        var n = this, r = new Map;
        // Porting Note: `getFieldIndexes()` on Web does not cache index lookups as
        // it could be used across different IndexedDB transactions. As any cached
        // data might be invalidated by other multi-tab clients, we can only trust
        // data within a single IndexedDB transaction. We therefore add a cache
        // here.
                return Dt.forEach(e, (function(e, i) {
            var o = r.get(e.collectionGroup);
            return (o ? Dt.resolve(o) : n.getFieldIndexes(t, e.collectionGroup)).next((function(o) {
                return r.set(e.collectionGroup, o), Dt.forEach(o, (function(r) {
                    return n.pn(t, e, r).next((function(e) {
                        var o = n.yn(i, r);
                        return e.isEqual(o) ? Dt.resolve() : n.wn(t, i, r, e, o);
                    }));
                }));
            }));
        }));
    }, t.prototype.Sn = function(t, e, n, r) {
        return Jo(t).put({
            indexId: r.indexId,
            uid: this.uid,
            arrayValue: r.arrayValue,
            directionalValue: r.directionalValue,
            orderedDocumentKey: this.Rn(n, e.key),
            documentKey: e.key.path.toArray()
        });
    }, t.prototype.bn = function(t, e, n, r) {
        return Jo(t).delete([ r.indexId, this.uid, r.arrayValue, r.directionalValue, this.Rn(n, e.key), e.key.path.toArray() ]);
    }, t.prototype.pn = function(t, e, n) {
        var r = Jo(t), i = new xe(Oo);
        return r.Y({
            index: "documentKeyIndex",
            range: IDBKeyRange.only([ n.indexId, this.uid, this.Rn(n, e) ])
        }, (function(t, r) {
            i = i.add(new Po(n.indexId, e, r.arrayValue, r.directionalValue));
        })).next((function() {
            return i;
        }));
    }, 
    /** Creates the index entries for the given document. */ t.prototype.yn = function(t, e) {
        var n = new xe(Oo), r = this.An(e, t);
        if (null == r) return n;
        var i = vt(e);
        if (null != i) {
            var o = t.data.field(i.fieldPath);
            if (tn(o)) for (var a = 0, u = o.arrayValue.values || []; a < u.length; a++) {
                var s = u[a];
                n = n.add(new Po(e.indexId, t.key, this.Tn(s), r));
            }
        } else n = n.add(new Po(e.indexId, t.key, Wo, r));
        return n;
    }, 
    /**
     * Updates the index entries for the provided document by deleting entries
     * that are no longer referenced in `newEntries` and adding all newly added
     * entries.
     */
    t.prototype.wn = function(t, e, n, r, i) {
        var o = this;
        F("IndexedDbIndexManager", "Updating index entries for document '%s'", e.key);
        var a = [];
        return function(t, e, n, r, i) {
            // Walk through the two sets at the same time, using the ordering defined by
            // `comparator`.
            for (var o = t.getIterator(), a = e.getIterator(), u = De(o), s = De(a); u || s; ) {
                var c = !1, l = !1;
                if (u && s) {
                    var h = n(u, s);
                    h < 0 ? 
                    // The element was removed if the next element in our ordered
                    // walkthrough is only in `before`.
                    l = !0 : h > 0 && (
                    // The element was added if the next element in our ordered walkthrough
                    // is only in `after`.
                    c = !0);
                } else null != u ? l = !0 : c = !0;
                c ? (r(s), s = De(a)) : l ? (i(u), u = De(o)) : (u = De(o), s = De(a));
            }
        }(r, i, Oo, (
        /* onAdd= */ function(r) {
            a.push(o.Sn(t, e, n, r));
        }), (
        /* onRemove= */ function(r) {
            a.push(o.bn(t, e, n, r));
        })), Dt.waitFor(a);
    }, t.prototype.gn = function(t) {
        var e = 1;
        return Zo(t).Y({
            index: "sequenceNumberIndex",
            reverse: !0,
            range: IDBKeyRange.upperBound([ this.uid, Number.MAX_SAFE_INTEGER ])
        }, (function(t, n, r) {
            r.done(), e = n.sequenceNumber + 1;
        })).next((function() {
            return e;
        }));
    }, 
    /**
     * Returns a new set of IDB ranges that splits the existing range and excludes
     * any values that match the `notInValue` from these ranges. As an example,
     * '[foo > 2 && foo != 3]` becomes  `[foo > 2 && < 3, foo > 3]`.
     */
    t.prototype.createRange = function(t, e, n) {
        // The notIn values need to be sorted and unique so that we can return a
        // sorted set of non-overlapping ranges.
        n = n.sort((function(t, e) {
            return Oo(t, e);
        })).filter((function(t, e, n) {
            return !e || 0 !== Oo(t, n[e - 1]);
        }));
        var r = [];
        r.push(t);
        for (var i = 0, o = n; i < o.length; i++) {
            var a = o[i], u = Oo(a, t), s = Oo(a, e);
            if (0 === u) 
            // `notInValue` is the lower bound. We therefore need to raise the bound
            // to the next value.
            r[0] = t.Jt(); else if (u > 0 && s < 0) 
            // `notInValue` is in the middle of the range
            r.push(a), r.push(a.Jt()); else if (s > 0) 
            // `notInValue` (and all following values) are out of the range
            break;
        }
        r.push(e);
        for (var c = [], l = 0; l < r.length; l += 2) {
            // If we encounter two bounds that will create an unmatchable key range,
            // then we return an empty set of key ranges.
            if (this.Dn(r[l], r[l + 1])) return [];
            var h = [ r[l].indexId, this.uid, r[l].arrayValue, r[l].directionalValue, Wo, [] ], f = [ r[l + 1].indexId, this.uid, r[l + 1].arrayValue, r[l + 1].directionalValue, Wo, [] ];
            c.push(IDBKeyRange.bound(h, f));
        }
        return c;
    }, t.prototype.Dn = function(t, e) {
        // If lower bound is greater than the upper bound, then the key
        // range can never be matched.
        return Oo(t, e) > 0;
    }, t.prototype.getMinOffsetFromCollectionGroup = function(t, e) {
        return this.getFieldIndexes(t, e).next($o);
    }, t.prototype.getMinOffset = function(t, e) {
        var n = this;
        return Dt.mapArray(this.cn(e), (function(e) {
            return n.ln(t, e).next((function(t) {
                return t || U();
            }));
        })).next($o);
    }, t;
}();

/**
 * Internal implementation of the collection-parent index exposed by MemoryIndexManager.
 * Also used for in-memory caching by IndexedDbIndexManager and initial index population
 * in indexeddb_schema.ts
 */
/**
 * Helper to get a typed SimpleDbStore for the collectionParents
 * document store.
 */
function Ho(t) {
    return we(t, "collectionParents");
}

/**
 * Helper to get a typed SimpleDbStore for the index entry object store.
 */ function Jo(t) {
    return we(t, "indexEntries");
}

/**
 * Helper to get a typed SimpleDbStore for the index configuration object store.
 */ function Xo(t) {
    return we(t, "indexConfiguration");
}

/**
 * Helper to get a typed SimpleDbStore for the index state object store.
 */ function Zo(t) {
    return we(t, "indexState");
}

function $o(t) {
    B(0 !== t.length);
    for (var e = t[0].indexState.offset, n = e.largestBatchId, r = 1; r < t.length; r++) {
        var i = t[r].indexState.offset;
        Tt(i, e) < 0 && (e = i), n < i.largestBatchId && (n = i.largestBatchId);
    }
    return new Et(e.readTime, e.documentKey, n);
}

/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var ta = {
    didRun: !1,
    sequenceNumbersCollected: 0,
    targetsRemoved: 0,
    documentsRemoved: 0
}, ea = /** @class */ function() {
    function t(
    // When we attempt to collect, we will only do so if the cache size is greater than this
    // threshold. Passing `COLLECTION_DISABLED` here will cause collection to always be skipped.
    t, 
    // The percentage of sequence numbers that we will attempt to collect
    e, 
    // A cap on the total number of sequence numbers that will be collected. This prevents
    // us from collecting a huge number of sequence numbers if the cache has grown very large.
    n) {
        this.cacheSizeCollectionThreshold = t, this.percentileToCollect = e, this.maximumSequenceNumbersToCollect = n;
    }
    return t.withCacheSize = function(e) {
        return new t(e, t.DEFAULT_COLLECTION_PERCENTILE, t.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT);
    }, t;
}();

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Delete a mutation batch and the associated document mutations.
 * @returns A PersistencePromise of the document mutations that were removed.
 */
function na(t, e, n) {
    var r = t.store("mutations"), i = t.store("documentMutations"), o = [], a = IDBKeyRange.only(n.batchId), u = 0, s = r.Y({
        range: a
    }, (function(t, e, n) {
        return u++, n.delete();
    }));
    o.push(s.next((function() {
        B(1 === u);
    })));
    for (var c = [], l = 0, h = n.mutations; l < h.length; l++) {
        var f = h[l], d = Jt(e, f.key.path, n.batchId);
        o.push(i.delete(d)), c.push(f.key);
    }
    return Dt.waitFor(o).next((function() {
        return c;
    }));
}

/**
 * Returns an approximate size for the given document.
 */ function ra(t) {
    if (!t) return 0;
    var e;
    if (t.document) e = t.document; else if (t.unknownDocument) e = t.unknownDocument; else {
        if (!t.noDocument) throw U();
        e = t.noDocument;
    }
    return JSON.stringify(e).length;
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/** A mutation queue for a specific user, backed by IndexedDB. */ ea.DEFAULT_COLLECTION_PERCENTILE = 10, 
ea.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT = 1e3, ea.DEFAULT = new ea(41943040, ea.DEFAULT_COLLECTION_PERCENTILE, ea.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT), 
ea.DISABLED = new ea(-1, 0, 0);

var ia = /** @class */ function() {
    function t(
    /**
     * The normalized userId (e.g. null UID => "" userId) used to store /
     * retrieve mutations.
     */
    t, e, n, r) {
        this.userId = t, this.serializer = e, this.indexManager = n, this.referenceDelegate = r, 
        /**
             * Caches the document keys for pending mutation batches. If the mutation
             * has been removed from IndexedDb, the cached value may continue to
             * be used to retrieve the batch's document keys. To remove a cached value
             * locally, `removeCachedMutationKeys()` should be invoked either directly
             * or through `removeMutationBatches()`.
             *
             * With multi-tab, when the primary client acknowledges or rejects a mutation,
             * this cache is used by secondary clients to invalidate the local
             * view of the documents that were previously affected by the mutation.
             */
        // PORTING NOTE: Multi-tab only.
        this.Cn = {}
        /**
     * Creates a new mutation queue for the given user.
     * @param user - The user for which to create a mutation queue.
     * @param serializer - The serializer to use when persisting to IndexedDb.
     */;
    }
    return t.lt = function(e, n, r, i) {
        // TODO(mcg): Figure out what constraints there are on userIDs
        // In particular, are there any reserved characters? are empty ids allowed?
        // For the moment store these together in the same mutations table assuming
        // that empty userIDs aren't allowed.
        return B("" !== e.uid), new t(e.isAuthenticated() ? e.uid : "", n, r, i);
    }, t.prototype.checkEmpty = function(t) {
        var e = !0, n = IDBKeyRange.bound([ this.userId, Number.NEGATIVE_INFINITY ], [ this.userId, Number.POSITIVE_INFINITY ]);
        return aa(t).Y({
            index: "userMutationsIndex",
            range: n
        }, (function(t, n, r) {
            e = !1, r.done();
        })).next((function() {
            return e;
        }));
    }, t.prototype.addMutationBatch = function(t, e, n, r) {
        var i = this, o = ua(t), a = aa(t);
        // The IndexedDb implementation in Chrome (and Firefox) does not handle
        // compound indices that include auto-generated keys correctly. To ensure
        // that the index entry is added correctly in all browsers, we perform two
        // writes: The first write is used to retrieve the next auto-generated Batch
        // ID, and the second write populates the index and stores the actual
        // mutation batch.
        // See: https://bugs.chromium.org/p/chromium/issues/detail?id=701972
        // We write an empty object to obtain key
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return a.add({}).next((function(u) {
            B("number" == typeof u);
            for (var s = new ri(u, e, n, r), c = function(t, e, n) {
                var r = n.baseMutations.map((function(e) {
                    return Qi(t.ct, e);
                })), i = n.mutations.map((function(e) {
                    return Qi(t.ct, e);
                }));
                return {
                    userId: e,
                    batchId: n.batchId,
                    localWriteTimeMs: n.localWriteTime.toMillis(),
                    baseMutations: r,
                    mutations: i
                };
            }(i.serializer, i.userId, s), l = [], h = new xe((function(t, e) {
                return it(t.canonicalString(), e.canonicalString());
            })), f = 0, d = r; f < d.length; f++) {
                var p = d[f], v = Jt(i.userId, p.key.path, u);
                h = h.add(p.key.path.popLast()), l.push(a.put(c)), l.push(o.put(v, Xt));
            }
            return h.forEach((function(e) {
                l.push(i.indexManager.addToCollectionParentIndex(t, e));
            })), t.addOnCommittedListener((function() {
                i.Cn[u] = s.keys();
            })), Dt.waitFor(l).next((function() {
                return s;
            }));
        }));
    }, t.prototype.lookupMutationBatch = function(t, e) {
        var n = this;
        return aa(t).get(e).next((function(t) {
            return t ? (B(t.userId === n.userId), fo(n.serializer, t)) : null;
        }));
    }, 
    /**
     * Returns the document keys for the mutation batch with the given batchId.
     * For primary clients, this method returns `null` after
     * `removeMutationBatches()` has been called. Secondary clients return a
     * cached result until `removeCachedMutationKeys()` is invoked.
     */
    // PORTING NOTE: Multi-tab only.
    t.prototype.vn = function(t, e) {
        var n = this;
        return this.Cn[e] ? Dt.resolve(this.Cn[e]) : this.lookupMutationBatch(t, e).next((function(t) {
            if (t) {
                var r = t.keys();
                return n.Cn[e] = r, r;
            }
            return null;
        }));
    }, t.prototype.getNextMutationBatchAfterBatchId = function(t, e) {
        var n = this, r = e + 1, i = IDBKeyRange.lowerBound([ this.userId, r ]), o = null;
        return aa(t).Y({
            index: "userMutationsIndex",
            range: i
        }, (function(t, e, i) {
            e.userId === n.userId && (B(e.batchId >= r), o = fo(n.serializer, e)), i.done();
        })).next((function() {
            return o;
        }));
    }, t.prototype.getHighestUnacknowledgedBatchId = function(t) {
        var e = IDBKeyRange.upperBound([ this.userId, Number.POSITIVE_INFINITY ]), n = -1;
        return aa(t).Y({
            index: "userMutationsIndex",
            range: e,
            reverse: !0
        }, (function(t, e, r) {
            n = e.batchId, r.done();
        })).next((function() {
            return n;
        }));
    }, t.prototype.getAllMutationBatches = function(t) {
        var e = this, n = IDBKeyRange.bound([ this.userId, -1 ], [ this.userId, Number.POSITIVE_INFINITY ]);
        return aa(t).W("userMutationsIndex", n).next((function(t) {
            return t.map((function(t) {
                return fo(e.serializer, t);
            }));
        }));
    }, t.prototype.getAllMutationBatchesAffectingDocumentKey = function(t, e) {
        var n = this, r = Ht(this.userId, e.path), i = IDBKeyRange.lowerBound(r), o = [];
        // Scan the document-mutation index starting with a prefix starting with
        // the given documentKey.
                return ua(t).Y({
            range: i
        }, (function(r, i, a) {
            var u = r[0], s = r[1], c = r[2], l = Wt(s);
            // Only consider rows matching exactly the specific key of
            // interest. Note that because we order by path first, and we
            // order terminators before path separators, we'll encounter all
            // the index rows for documentKey contiguously. In particular, all
            // the rows for documentKey will occur before any rows for
            // documents nested in a subcollection beneath documentKey so we
            // can stop as soon as we hit any such row.
                        if (u === n.userId && e.path.isEqual(l)) 
            // Look up the mutation batch in the store.
            return aa(t).get(c).next((function(t) {
                if (!t) throw U();
                B(t.userId === n.userId), o.push(fo(n.serializer, t));
            }));
            a.done();
        })).next((function() {
            return o;
        }));
    }, t.prototype.getAllMutationBatchesAffectingDocumentKeys = function(t, e) {
        var n = this, r = new xe(it), i = [];
        return e.forEach((function(e) {
            var o = Ht(n.userId, e.path), a = IDBKeyRange.lowerBound(o), u = ua(t).Y({
                range: a
            }, (function(t, i, o) {
                var a = t[0], u = t[1], s = t[2], c = Wt(u);
                // Only consider rows matching exactly the specific key of
                // interest. Note that because we order by path first, and we
                // order terminators before path separators, we'll encounter all
                // the index rows for documentKey contiguously. In particular, all
                // the rows for documentKey will occur before any rows for
                // documents nested in a subcollection beneath documentKey so we
                // can stop as soon as we hit any such row.
                                a === n.userId && e.path.isEqual(c) ? r = r.add(s) : o.done();
            }));
            i.push(u);
        })), Dt.waitFor(i).next((function() {
            return n.Fn(t, r);
        }));
    }, t.prototype.getAllMutationBatchesAffectingQuery = function(t, e) {
        var n = this, r = e.path, i = r.length + 1, o = Ht(this.userId, r), a = IDBKeyRange.lowerBound(o), u = new xe(it);
        return ua(t).Y({
            range: a
        }, (function(t, e, o) {
            var a = t[0], s = t[1], c = t[2], l = Wt(s);
            a === n.userId && r.isPrefixOf(l) ? 
            // Rows with document keys more than one segment longer than the
            // query path can't be matches. For example, a query on 'rooms'
            // can't match the document /rooms/abc/messages/xyx.
            // TODO(mcg): we'll need a different scanner when we implement
            // ancestor queries.
            l.length === i && (u = u.add(c)) : o.done();
        })).next((function() {
            return n.Fn(t, u);
        }));
    }, t.prototype.Fn = function(t, e) {
        var n = this, r = [], i = [];
        // TODO(rockwood): Implement this using iterate.
        return e.forEach((function(e) {
            i.push(aa(t).get(e).next((function(t) {
                if (null === t) throw U();
                B(t.userId === n.userId), r.push(fo(n.serializer, t));
            })));
        })), Dt.waitFor(i).next((function() {
            return r;
        }));
    }, t.prototype.removeMutationBatch = function(t, e) {
        var n = this;
        return na(t.ae, this.userId, e).next((function(r) {
            return t.addOnCommittedListener((function() {
                n.Mn(e.batchId);
            })), Dt.forEach(r, (function(e) {
                return n.referenceDelegate.markPotentiallyOrphaned(t, e);
            }));
        }));
    }, 
    /**
     * Clears the cached keys for a mutation batch. This method should be
     * called by secondary clients after they process mutation updates.
     *
     * Note that this method does not have to be called from primary clients as
     * the corresponding cache entries are cleared when an acknowledged or
     * rejected batch is removed from the mutation queue.
     */
    // PORTING NOTE: Multi-tab only
    t.prototype.Mn = function(t) {
        delete this.Cn[t];
    }, t.prototype.performConsistencyCheck = function(t) {
        var e = this;
        return this.checkEmpty(t).next((function(n) {
            if (!n) return Dt.resolve();
            // Verify that there are no entries in the documentMutations index if
            // the queue is empty.
                        var r = IDBKeyRange.lowerBound(
            /**
 * Creates a [userId] key for use in the DbDocumentMutations index to iterate
 * over all of a user's document mutations.
 */
            function(t) {
                return [ t ];
            }(e.userId)), i = [];
            return ua(t).Y({
                range: r
            }, (function(t, n, r) {
                if (t[0] === e.userId) {
                    var o = Wt(t[1]);
                    i.push(o);
                } else r.done();
            })).next((function() {
                B(0 === i.length);
            }));
        }));
    }, t.prototype.containsKey = function(t, e) {
        return oa(t, this.userId, e);
    }, 
    // PORTING NOTE: Multi-tab only (state is held in memory in other clients).
    /** Returns the mutation queue's metadata from IndexedDb. */
    t.prototype.xn = function(t) {
        var e = this;
        return sa(t).get(this.userId).next((function(t) {
            return t || {
                userId: e.userId,
                lastAcknowledgedBatchId: -1,
                lastStreamToken: ""
            };
        }));
    }, t;
}();

/**
 * @returns true if the mutation queue for the given user contains a pending
 *         mutation for the given key.
 */ function oa(t, e, n) {
    var r = Ht(e, n.path), i = r[1], o = IDBKeyRange.lowerBound(r), a = !1;
    return ua(t).Y({
        range: o,
        J: !0
    }, (function(t, n, r) {
        var o = t[0], u = t[1];
 /*batchID*/        t[2], o === e && u === i && (a = !0), 
        r.done();
    })).next((function() {
        return a;
    }));
}

/** Returns true if any mutation queue contains the given document. */
/**
 * Helper to get a typed SimpleDbStore for the mutations object store.
 */ function aa(t) {
    return we(t, "mutations");
}

/**
 * Helper to get a typed SimpleDbStore for the mutationQueues object store.
 */ function ua(t) {
    return we(t, "documentMutations");
}

/**
 * Helper to get a typed SimpleDbStore for the mutationQueues object store.
 */ function sa(t) {
    return we(t, "mutationQueues");
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/** Offset to ensure non-overlapping target ids. */
/**
 * Generates monotonically increasing target IDs for sending targets to the
 * watch stream.
 *
 * The client constructs two generators, one for the target cache, and one for
 * for the sync engine (to generate limbo documents targets). These
 * generators produce non-overlapping IDs (by using even and odd IDs
 * respectively).
 *
 * By separating the target ID space, the query cache can generate target IDs
 * that persist across client restarts, while sync engine can independently
 * generate in-memory target IDs that are transient and can be reused after a
 * restart.
 */ var ca = /** @class */ function() {
    function t(t) {
        this.On = t;
    }
    return t.prototype.next = function() {
        return this.On += 2, this.On;
    }, t.Nn = function() {
        // The target cache generator must return '2' in its first call to `next()`
        // as there is no differentiation in the protocol layer between an unset
        // number and the number '0'. If we were to sent a target with target ID
        // '0', the backend would consider it unset and replace it with its own ID.
        return new t(0);
    }, t.Ln = function() {
        // Sync engine assigns target IDs for limbo document detection.
        return new t(-1);
    }, t;
}(), la = /** @class */ function() {
    function t(t, e) {
        this.referenceDelegate = t, this.serializer = e;
    }
    // PORTING NOTE: We don't cache global metadata for the target cache, since
    // some of it (in particular `highestTargetId`) can be modified by secondary
    // tabs. We could perhaps be more granular (and e.g. still cache
    // `lastRemoteSnapshotVersion` in memory) but for simplicity we currently go
    // to IndexedDb whenever we need to read metadata. We can revisit if it turns
    // out to have a meaningful performance impact.
        return t.prototype.allocateTargetId = function(t) {
        var e = this;
        return this.Bn(t).next((function(n) {
            var r = new ca(n.highestTargetId);
            return n.highestTargetId = r.next(), e.kn(t, n).next((function() {
                return n.highestTargetId;
            }));
        }));
    }, t.prototype.getLastRemoteSnapshotVersion = function(t) {
        return this.Bn(t).next((function(t) {
            return st.fromTimestamp(new ut(t.lastRemoteSnapshotVersion.seconds, t.lastRemoteSnapshotVersion.nanoseconds));
        }));
    }, t.prototype.getHighestSequenceNumber = function(t) {
        return this.Bn(t).next((function(t) {
            return t.highestListenSequenceNumber;
        }));
    }, t.prototype.setTargetsMetadata = function(t, e, n) {
        var r = this;
        return this.Bn(t).next((function(i) {
            return i.highestListenSequenceNumber = e, n && (i.lastRemoteSnapshotVersion = n.toTimestamp()), 
            e > i.highestListenSequenceNumber && (i.highestListenSequenceNumber = e), r.kn(t, i);
        }));
    }, t.prototype.addTargetData = function(t, e) {
        var n = this;
        return this.qn(t, e).next((function() {
            return n.Bn(t).next((function(r) {
                return r.targetCount += 1, n.Qn(e, r), n.kn(t, r);
            }));
        }));
    }, t.prototype.updateTargetData = function(t, e) {
        return this.qn(t, e);
    }, t.prototype.removeTargetData = function(t, e) {
        var n = this;
        return this.removeMatchingKeysForTargetId(t, e.targetId).next((function() {
            return ha(t).delete(e.targetId);
        })).next((function() {
            return n.Bn(t);
        })).next((function(e) {
            return B(e.targetCount > 0), e.targetCount -= 1, n.kn(t, e);
        }));
    }, 
    /**
     * Drops any targets with sequence number less than or equal to the upper bound, excepting those
     * present in `activeTargetIds`. Document associations for the removed targets are also removed.
     * Returns the number of targets removed.
     */
    t.prototype.removeTargets = function(t, e, n) {
        var r = this, i = 0, o = [];
        return ha(t).Y((function(a, u) {
            var s = po(u);
            s.sequenceNumber <= e && null === n.get(s.targetId) && (i++, o.push(r.removeTargetData(t, s)));
        })).next((function() {
            return Dt.waitFor(o);
        })).next((function() {
            return i;
        }));
    }, 
    /**
     * Call provided function with each `TargetData` that we have cached.
     */
    t.prototype.forEachTarget = function(t, e) {
        return ha(t).Y((function(t, n) {
            var r = po(n);
            e(r);
        }));
    }, t.prototype.Bn = function(t) {
        return fa(t).get("targetGlobalKey").next((function(t) {
            return B(null !== t), t;
        }));
    }, t.prototype.kn = function(t, e) {
        return fa(t).put("targetGlobalKey", e);
    }, t.prototype.qn = function(t, e) {
        return ha(t).put(vo(this.serializer, e));
    }, 
    /**
     * In-place updates the provided metadata to account for values in the given
     * TargetData. Saving is done separately. Returns true if there were any
     * changes to the metadata.
     */
    t.prototype.Qn = function(t, e) {
        var n = !1;
        return t.targetId > e.highestTargetId && (e.highestTargetId = t.targetId, n = !0), 
        t.sequenceNumber > e.highestListenSequenceNumber && (e.highestListenSequenceNumber = t.sequenceNumber, 
        n = !0), n;
    }, t.prototype.getTargetCount = function(t) {
        return this.Bn(t).next((function(t) {
            return t.targetCount;
        }));
    }, t.prototype.getTargetData = function(t, e) {
        // Iterating by the canonicalId may yield more than one result because
        // canonicalId values are not required to be unique per target. This query
        // depends on the queryTargets index to be efficient.
        var n = Un(e), r = IDBKeyRange.bound([ n, Number.NEGATIVE_INFINITY ], [ n, Number.POSITIVE_INFINITY ]), i = null;
        return ha(t).Y({
            range: r,
            index: "queryTargetsIndex"
        }, (function(t, n, r) {
            var o = po(n);
            // After finding a potential match, check that the target is
            // actually equal to the requested target.
                        Bn(e, o.target) && (i = o, r.done());
        })).next((function() {
            return i;
        }));
    }, t.prototype.addMatchingKeys = function(t, e, n) {
        var r = this, i = [], o = da(t);
        // PORTING NOTE: The reverse index (documentsTargets) is maintained by
        // IndexedDb.
                return e.forEach((function(e) {
            var a = Kt(e.path);
            i.push(o.put({
                targetId: n,
                path: a
            })), i.push(r.referenceDelegate.addReference(t, n, e));
        })), Dt.waitFor(i);
    }, t.prototype.removeMatchingKeys = function(t, e, n) {
        var r = this, i = da(t);
        // PORTING NOTE: The reverse index (documentsTargets) is maintained by
        // IndexedDb.
                return Dt.forEach(e, (function(e) {
            var o = Kt(e.path);
            return Dt.waitFor([ i.delete([ n, o ]), r.referenceDelegate.removeReference(t, n, e) ]);
        }));
    }, t.prototype.removeMatchingKeysForTargetId = function(t, e) {
        var n = da(t), r = IDBKeyRange.bound([ e ], [ e + 1 ], 
        /*lowerOpen=*/ !1, 
        /*upperOpen=*/ !0);
        return n.delete(r);
    }, t.prototype.getMatchingKeysForTargetId = function(t, e) {
        var n = IDBKeyRange.bound([ e ], [ e + 1 ], 
        /*lowerOpen=*/ !1, 
        /*upperOpen=*/ !0), r = da(t), i = br();
        return r.Y({
            range: n,
            J: !0
        }, (function(t, e, n) {
            var r = Wt(t[1]), o = new dt(r);
            i = i.add(o);
        })).next((function() {
            return i;
        }));
    }, t.prototype.containsKey = function(t, e) {
        var n = Kt(e.path), r = IDBKeyRange.bound([ n ], [ at(n) ], 
        /*lowerOpen=*/ !1, 
        /*upperOpen=*/ !0), i = 0;
        return da(t).Y({
            index: "documentTargetsIndex",
            J: !0,
            range: r
        }, (function(t, e, n) {
            var r = t[0];
            t[1], 
            // Having a sentinel row for a document does not count as containing that document;
            // For the target cache, containing the document means the document is part of some
            // target.
            0 !== r && (i++, n.done());
        })).next((function() {
            return i > 0;
        }));
    }, 
    /**
     * Looks up a TargetData entry by target ID.
     *
     * @param targetId - The target ID of the TargetData entry to look up.
     * @returns The cached TargetData entry, or null if the cache has no entry for
     * the target.
     */
    // PORTING NOTE: Multi-tab only.
    t.prototype._t = function(t, e) {
        return ha(t).get(e).next((function(t) {
            return t ? po(t) : null;
        }));
    }, t;
}();

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Helper to get a typed SimpleDbStore for the queries object store.
 */
function ha(t) {
    return we(t, "targets");
}

/**
 * Helper to get a typed SimpleDbStore for the target globals object store.
 */ function fa(t) {
    return we(t, "targetGlobal");
}

/**
 * Helper to get a typed SimpleDbStore for the document target object store.
 */ function da(t) {
    return we(t, "targetDocuments");
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function pa(t, e) {
    var n = t[0], r = t[1], i = e[0], o = e[1], a = it(n, i);
    return 0 === a ? it(r, o) : a;
}

/**
 * Used to calculate the nth sequence number. Keeps a rolling buffer of the
 * lowest n values passed to `addElement`, and finally reports the largest of
 * them in `maxValue`.
 */ var va = /** @class */ function() {
    function t(t) {
        this.Kn = t, this.buffer = new xe(pa), this.$n = 0;
    }
    return t.prototype.Un = function() {
        return ++this.$n;
    }, t.prototype.Wn = function(t) {
        var e = [ t, this.Un() ];
        if (this.buffer.size < this.Kn) this.buffer = this.buffer.add(e); else {
            var n = this.buffer.last();
            pa(e, n) < 0 && (this.buffer = this.buffer.delete(n).add(e));
        }
    }, Object.defineProperty(t.prototype, "maxValue", {
        get: function() {
            // Guaranteed to be non-empty. If we decide we are not collecting any
            // sequence numbers, nthSequenceNumber below short-circuits. If we have
            // decided that we are collecting n sequence numbers, it's because n is some
            // percentage of the existing sequence numbers. That means we should never
            // be in a situation where we are collecting sequence numbers but don't
            // actually have any.
            return this.buffer.last()[0];
        },
        enumerable: !1,
        configurable: !0
    }), t;
}(), ma = /** @class */ function() {
    function t(t, e, n) {
        this.garbageCollector = t, this.asyncQueue = e, this.localStore = n, this.Gn = null;
    }
    return t.prototype.start = function() {
        -1 !== this.garbageCollector.params.cacheSizeCollectionThreshold && this.zn(6e4);
    }, t.prototype.stop = function() {
        this.Gn && (this.Gn.cancel(), this.Gn = null);
    }, Object.defineProperty(t.prototype, "started", {
        get: function() {
            return null !== this.Gn;
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype.zn = function(t) {
        var r = this;
        F("LruGarbageCollector", "Garbage collection scheduled in ".concat(t, "ms")), this.Gn = this.asyncQueue.enqueueAfterDelay("lru_garbage_collection" /* TimerId.LruGarbageCollection */ , t, (function() {
            return e(r, void 0, void 0, (function() {
                var t;
                return n(this, (function(e) {
                    switch (e.label) {
                      case 0:
                        this.Gn = null, e.label = 1;

                      case 1:
                        return e.trys.push([ 1, 3, , 7 ]), [ 4 /*yield*/ , this.localStore.collectGarbage(this.garbageCollector) ];

                      case 2:
                        return e.sent(), [ 3 /*break*/ , 7 ];

                      case 3:
                        return Ot(t = e.sent()) ? (F("LruGarbageCollector", "Ignoring IndexedDB error during garbage collection: ", t), 
                        [ 3 /*break*/ , 6 ]) : [ 3 /*break*/ , 4 ];

                      case 4:
                        return [ 4 /*yield*/ , Ct(t) ];

                      case 5:
                        e.sent(), e.label = 6;

                      case 6:
                        return [ 3 /*break*/ , 7 ];

                      case 7:
                        return [ 4 /*yield*/ , this.zn(3e5) ];

                      case 8:
                        return e.sent(), [ 2 /*return*/ ];
                    }
                }));
            }));
        }));
    }, t;
}(), ya = /** @class */ function() {
    function t(t, e) {
        this.jn = t, this.params = e;
    }
    return t.prototype.calculateTargetCount = function(t, e) {
        return this.jn.Hn(t).next((function(t) {
            return Math.floor(e / 100 * t);
        }));
    }, t.prototype.nthSequenceNumber = function(t, e) {
        var n = this;
        if (0 === e) return Dt.resolve(Ut._e);
        var r = new va(e);
        return this.jn.forEachTarget(t, (function(t) {
            return r.Wn(t.sequenceNumber);
        })).next((function() {
            return n.jn.Jn(t, (function(t) {
                return r.Wn(t);
            }));
        })).next((function() {
            return r.maxValue;
        }));
    }, t.prototype.removeTargets = function(t, e, n) {
        return this.jn.removeTargets(t, e, n);
    }, t.prototype.removeOrphanedDocuments = function(t, e) {
        return this.jn.removeOrphanedDocuments(t, e);
    }, t.prototype.collect = function(t, e) {
        var n = this;
        return -1 === this.params.cacheSizeCollectionThreshold ? (F("LruGarbageCollector", "Garbage collection skipped; disabled"), 
        Dt.resolve(ta)) : this.getCacheSize(t).next((function(r) {
            return r < n.params.cacheSizeCollectionThreshold ? (F("LruGarbageCollector", "Garbage collection skipped; Cache size ".concat(r, " is lower than threshold ").concat(n.params.cacheSizeCollectionThreshold)), 
            ta) : n.Yn(t, e);
        }));
    }, t.prototype.getCacheSize = function(t) {
        return this.jn.getCacheSize(t);
    }, t.prototype.Yn = function(t, e) {
        var n, r, i, o, a, u, s, c = this, l = Date.now();
        return this.calculateTargetCount(t, this.params.percentileToCollect).next((function(e) {
            // Cap at the configured max
            return e > c.params.maximumSequenceNumbersToCollect ? (F("LruGarbageCollector", "Capping sequence numbers to collect down to the maximum of ".concat(c.params.maximumSequenceNumbersToCollect, " from ").concat(e)), 
            r = c.params.maximumSequenceNumbersToCollect) : r = e, o = Date.now(), c.nthSequenceNumber(t, r);
        })).next((function(r) {
            return n = r, a = Date.now(), c.removeTargets(t, n, e);
        })).next((function(e) {
            return i = e, u = Date.now(), c.removeOrphanedDocuments(t, n);
        })).next((function(t) {
            return s = Date.now(), R() <= h.DEBUG && F("LruGarbageCollector", "LRU Garbage Collection\n\tCounted targets in ".concat(o - l, "ms\n\tDetermined least recently used ").concat(r, " in ") + (a - o) + "ms\n" + "\tRemoved ".concat(i, " targets in ") + (u - a) + "ms\n" + "\tRemoved ".concat(t, " documents in ") + (s - u) + "ms\n" + "Total Duration: ".concat(s - l, "ms")), 
            Dt.resolve({
                didRun: !0,
                sequenceNumbersCollected: r,
                targetsRemoved: i,
                documentsRemoved: t
            });
        }));
    }, t;
}();

/**
 * This class is responsible for the scheduling of LRU garbage collection. It handles checking
 * whether or not GC is enabled, as well as which delay to use before the next run.
 */ function ga(t, e) {
    return new ya(t, e);
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/** Provides LRU functionality for IndexedDB persistence. */ var wa = /** @class */ function() {
    function t(t, e) {
        this.db = t, this.garbageCollector = ga(this, e);
    }
    return t.prototype.Hn = function(t) {
        var e = this.Zn(t);
        return this.db.getTargetCache().getTargetCount(t).next((function(t) {
            return e.next((function(e) {
                return t + e;
            }));
        }));
    }, t.prototype.Zn = function(t) {
        var e = 0;
        return this.Jn(t, (function(t) {
            e++;
        })).next((function() {
            return e;
        }));
    }, t.prototype.forEachTarget = function(t, e) {
        return this.db.getTargetCache().forEachTarget(t, e);
    }, t.prototype.Jn = function(t, e) {
        return this.Xn(t, (function(t, n) {
            return e(n);
        }));
    }, t.prototype.addReference = function(t, e, n) {
        return ba(t, n);
    }, t.prototype.removeReference = function(t, e, n) {
        return ba(t, n);
    }, t.prototype.removeTargets = function(t, e, n) {
        return this.db.getTargetCache().removeTargets(t, e, n);
    }, t.prototype.markPotentiallyOrphaned = function(t, e) {
        return ba(t, e);
    }, 
    /**
     * Returns true if anything would prevent this document from being garbage
     * collected, given that the document in question is not present in any
     * targets and has a sequence number less than or equal to the upper bound for
     * the collection run.
     */
    t.prototype.er = function(t, e) {
        return function(t, e) {
            var n = !1;
            return sa(t).Z((function(r) {
                return oa(t, r, e).next((function(t) {
                    return t && (n = !0), Dt.resolve(!t);
                }));
            })).next((function() {
                return n;
            }));
        }(t, e);
    }, t.prototype.removeOrphanedDocuments = function(t, e) {
        var n = this, r = this.db.getRemoteDocumentCache().newChangeBuffer(), i = [], o = 0;
        return this.Xn(t, (function(a, u) {
            if (u <= e) {
                var s = n.er(t, a).next((function(e) {
                    if (!e) 
                    // Our size accounting requires us to read all documents before
                    // removing them.
                    return o++, r.getEntry(t, a).next((function() {
                        return r.removeEntry(a, st.min()), da(t).delete(function(t) {
                            return [ 0, Kt(t.path) ];
                        }(a));
                    }));
                }));
                i.push(s);
            }
        })).next((function() {
            return Dt.waitFor(i);
        })).next((function() {
            return r.apply(t);
        })).next((function() {
            return o;
        }));
    }, t.prototype.removeTarget = function(t, e) {
        var n = e.withSequenceNumber(t.currentSequenceNumber);
        return this.db.getTargetCache().updateTargetData(t, n);
    }, t.prototype.updateLimboDocument = function(t, e) {
        return ba(t, e);
    }, 
    /**
     * Call provided function for each document in the cache that is 'orphaned'. Orphaned
     * means not a part of any target, so the only entry in the target-document index for
     * that document will be the sentinel row (targetId 0), which will also have the sequence
     * number for the last time the document was accessed.
     */
    t.prototype.Xn = function(t, e) {
        var n, r = da(t), i = Ut._e;
        return r.Y({
            index: "documentTargetsIndex"
        }, (function(t, r) {
            var o = t[0];
            t[1];
            var a = r.path, u = r.sequenceNumber;
            0 === o ? (
            // if nextToReport is valid, report it, this is a new key so the
            // last one must not be a member of any targets.
            i !== Ut._e && e(new dt(Wt(n)), i), 
            // set nextToReport to be this sequence number. It's the next one we
            // might report, if we don't find any targets for this document.
            // Note that the sequence number must be defined when the targetId
            // is 0.
            i = u, n = a) : 
            // set nextToReport to be invalid, we know we don't need to report
            // this one since we found a target for it.
            i = Ut._e;
        })).next((function() {
            // Since we report sequence numbers after getting to the next key, we
            // need to check if the last key we iterated over was an orphaned
            // document and report it.
            i !== Ut._e && e(new dt(Wt(n)), i);
        }));
    }, t.prototype.getCacheSize = function(t) {
        return this.db.getRemoteDocumentCache().getSize(t);
    }, t;
}();

function ba(t, e) {
    return da(t).put(function(t, e) {
        return {
            targetId: 0,
            path: Kt(t.path),
            sequenceNumber: e
        };
    }(e, t.currentSequenceNumber));
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * An in-memory buffer of entries to be written to a RemoteDocumentCache.
 * It can be used to batch up a set of changes to be written to the cache, but
 * additionally supports reading entries back with the `getEntry()` method,
 * falling back to the underlying RemoteDocumentCache if no entry is
 * buffered.
 *
 * Entries added to the cache *must* be read first. This is to facilitate
 * calculating the size delta of the pending changes.
 *
 * PORTING NOTE: This class was implemented then removed from other platforms.
 * If byte-counting ends up being needed on the other platforms, consider
 * porting this class as part of that implementation work.
 */ var Ia = /** @class */ function() {
    function t() {
        // A mapping of document key to the new cache entry that should be written.
        this.changes = new cr((function(t) {
            return t.toString();
        }), (function(t, e) {
            return t.isEqual(e);
        })), this.changesApplied = !1
        /**
     * Buffers a `RemoteDocumentCache.addEntry()` call.
     *
     * You can only modify documents that have already been retrieved via
     * `getEntry()/getEntries()` (enforced via IndexedDbs `apply()`).
     */;
    }
    return t.prototype.addEntry = function(t) {
        this.assertNotApplied(), this.changes.set(t.key, t);
    }, 
    /**
     * Buffers a `RemoteDocumentCache.removeEntry()` call.
     *
     * You can only remove documents that have already been retrieved via
     * `getEntry()/getEntries()` (enforced via IndexedDbs `apply()`).
     */
    t.prototype.removeEntry = function(t, e) {
        this.assertNotApplied(), this.changes.set(t, dn.newInvalidDocument(t).setReadTime(e));
    }, 
    /**
     * Looks up an entry in the cache. The buffered changes will first be checked,
     * and if no buffered change applies, this will forward to
     * `RemoteDocumentCache.getEntry()`.
     *
     * @param transaction - The transaction in which to perform any persistence
     *     operations.
     * @param documentKey - The key of the entry to look up.
     * @returns The cached document or an invalid document if we have nothing
     * cached.
     */
    t.prototype.getEntry = function(t, e) {
        this.assertNotApplied();
        var n = this.changes.get(e);
        return void 0 !== n ? Dt.resolve(n) : this.getFromCache(t, e);
    }, 
    /**
     * Looks up several entries in the cache, forwarding to
     * `RemoteDocumentCache.getEntry()`.
     *
     * @param transaction - The transaction in which to perform any persistence
     *     operations.
     * @param documentKeys - The keys of the entries to look up.
     * @returns A map of cached documents, indexed by key. If an entry cannot be
     *     found, the corresponding key will be mapped to an invalid document.
     */
    t.prototype.getEntries = function(t, e) {
        return this.getAllFromCache(t, e);
    }, 
    /**
     * Applies buffered changes to the underlying RemoteDocumentCache, using
     * the provided transaction.
     */
    t.prototype.apply = function(t) {
        return this.assertNotApplied(), this.changesApplied = !0, this.applyChanges(t);
    }, 
    /** Helper to assert this.changes is not null  */ t.prototype.assertNotApplied = function() {}, 
    t;
}(), _a = /** @class */ function() {
    function t(t) {
        this.serializer = t;
    }
    return t.prototype.setIndexManager = function(t) {
        this.indexManager = t;
    }, 
    /**
     * Adds the supplied entries to the cache.
     *
     * All calls of `addEntry` are required to go through the RemoteDocumentChangeBuffer
     * returned by `newChangeBuffer()` to ensure proper accounting of metadata.
     */
    t.prototype.addEntry = function(t, e, n) {
        return xa(t).put(n);
    }, 
    /**
     * Removes a document from the cache.
     *
     * All calls of `removeEntry`  are required to go through the RemoteDocumentChangeBuffer
     * returned by `newChangeBuffer()` to ensure proper accounting of metadata.
     */
    t.prototype.removeEntry = function(t, e, n) {
        return xa(t).delete(
        /**
 * Returns a key that can be used for document lookups via the primary key of
 * the DbRemoteDocument object store.
 */
        function(t, e) {
            var n = t.path.toArray();
            return [ 
            /* prefix path */ n.slice(0, n.length - 2), 
            /* collection id */ n[n.length - 2], co(e), 
            /* document id */ n[n.length - 1] ];
        }(e, n));
    }, 
    /**
     * Updates the current cache size.
     *
     * Callers to `addEntry()` and `removeEntry()` *must* call this afterwards to update the
     * cache's metadata.
     */
    t.prototype.updateMetadata = function(t, e) {
        var n = this;
        return this.getMetadata(t).next((function(r) {
            return r.byteSize += e, n.tr(t, r);
        }));
    }, t.prototype.getEntry = function(t, e) {
        var n = this, r = dn.newInvalidDocument(e);
        return xa(t).Y({
            index: "documentKeyIndex",
            range: IDBKeyRange.only(Ca(e))
        }, (function(t, i) {
            r = n.nr(e, i);
        })).next((function() {
            return r;
        }));
    }, 
    /**
     * Looks up an entry in the cache.
     *
     * @param documentKey - The key of the entry to look up.
     * @returns The cached document entry and its size.
     */
    t.prototype.rr = function(t, e) {
        var n = this, r = {
            size: 0,
            document: dn.newInvalidDocument(e)
        };
        return xa(t).Y({
            index: "documentKeyIndex",
            range: IDBKeyRange.only(Ca(e))
        }, (function(t, i) {
            r = {
                document: n.nr(e, i),
                size: ra(i)
            };
        })).next((function() {
            return r;
        }));
    }, t.prototype.getEntries = function(t, e) {
        var n = this, r = hr();
        return this.ir(t, e, (function(t, e) {
            var i = n.nr(t, e);
            r = r.insert(t, i);
        })).next((function() {
            return r;
        }));
    }, 
    /**
     * Looks up several entries in the cache.
     *
     * @param documentKeys - The set of keys entries to look up.
     * @returns A map of documents indexed by key and a map of sizes indexed by
     *     key (zero if the document does not exist).
     */
    t.prototype.sr = function(t, e) {
        var n = this, r = hr(), i = new Ee(dt.comparator);
        return this.ir(t, e, (function(t, e) {
            var o = n.nr(t, e);
            r = r.insert(t, o), i = i.insert(t, ra(e));
        })).next((function() {
            return {
                documents: r,
                _r: i
            };
        }));
    }, t.prototype.ir = function(t, e, n) {
        if (e.isEmpty()) return Dt.resolve();
        var i = new xe(Na);
        e.forEach((function(t) {
            return i = i.add(t);
        }));
        var o = IDBKeyRange.bound(Ca(i.first()), Ca(i.last())), a = i.getIterator(), u = a.getNext();
        return xa(t).Y({
            index: "documentKeyIndex",
            range: o
        }, (function(t, e, i) {
            // Go through keys not found in cache.
            for (var o = dt.fromSegments(r(r([], e.prefixPath, !0), [ e.collectionGroup, e.documentId ], !1)); u && Na(u, o) < 0; ) n(u, null), 
            u = a.getNext();
            u && u.isEqual(o) && (
            // Key found in cache.
            n(u, e), u = a.hasNext() ? a.getNext() : null), 
            // Skip to the next key (if there is one).
            u ? i.U(Ca(u)) : i.done();
        })).next((function() {
            // The rest of the keys are not in the cache. One case where `iterate`
            // above won't go through them is when the cache is empty.
            for (;u; ) n(u, null), u = a.hasNext() ? a.getNext() : null;
        }));
    }, t.prototype.getDocumentsMatchingQuery = function(t, e, n, r, i) {
        var o = this, a = e.path, u = [ a.popLast().toArray(), a.lastSegment(), co(n.readTime), n.documentKey.path.isEmpty() ? "" : n.documentKey.path.lastSegment() ], s = [ a.popLast().toArray(), a.lastSegment(), [ Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER ], "" ];
        return xa(t).W(IDBKeyRange.bound(u, s, !0)).next((function(t) {
            null == i || i.incrementDocumentReadCount(t.length);
            for (var n = hr(), a = 0, u = t; a < u.length; a++) {
                var s = u[a], c = o.nr(dt.fromSegments(s.prefixPath.concat(s.collectionGroup, s.documentId)), s);
                c.isFoundDocument() && (or(e, c) || r.has(c.key)) && (
                // Either the document matches the given query, or it is mutated.
                n = n.insert(c.key, c));
            }
            return n;
        }));
    }, t.prototype.getAllFromCollectionGroup = function(t, e, n, r) {
        var i = this, o = hr(), a = Da(e, n), u = Da(e, Et.max());
        return xa(t).Y({
            index: "collectionGroupIndex",
            range: IDBKeyRange.bound(a, u, !0)
        }, (function(t, e, n) {
            var a = i.nr(dt.fromSegments(e.prefixPath.concat(e.collectionGroup, e.documentId)), e);
            (o = o.insert(a.key, a)).size === r && n.done();
        })).next((function() {
            return o;
        }));
    }, t.prototype.newChangeBuffer = function(t) {
        return new Ta(this, !!t && t.trackRemovals);
    }, t.prototype.getSize = function(t) {
        return this.getMetadata(t).next((function(t) {
            return t.byteSize;
        }));
    }, t.prototype.getMetadata = function(t) {
        return Sa(t).get("remoteDocumentGlobalKey").next((function(t) {
            return B(!!t), t;
        }));
    }, t.prototype.tr = function(t, e) {
        return Sa(t).put("remoteDocumentGlobalKey", e);
    }, 
    /**
     * Decodes `dbRemoteDoc` and returns the document (or an invalid document if
     * the document corresponds to the format used for sentinel deletes).
     */
    t.prototype.nr = function(t, e) {
        if (e) {
            var n = 
            /** Decodes a remote document from storage locally to a Document. */ function(t, e) {
                var n;
                if (e.document) n = ji(t.ct, e.document, !!e.hasCommittedMutations); else if (e.noDocument) {
                    var r = dt.fromSegments(e.noDocument.path), i = ho(e.noDocument.readTime);
                    n = dn.newNoDocument(r, i), e.hasCommittedMutations && n.setHasCommittedMutations();
                } else {
                    if (!e.unknownDocument) return U();
                    var o = dt.fromSegments(e.unknownDocument.path), a = ho(e.unknownDocument.version);
                    n = dn.newUnknownDocument(o, a);
                }
                return e.readTime && n.setReadTime(function(t) {
                    var e = new ut(t[0], t[1]);
                    return st.fromTimestamp(e);
                }(e.readTime)), n;
            }(this.serializer, e);
            // Whether the document is a sentinel removal and should only be used in the
            // `getNewDocumentChanges()`
                        if (!n.isNoDocument() || !n.version.isEqual(st.min())) return n;
        }
        return dn.newInvalidDocument(t);
    }, t;
}();

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * The RemoteDocumentCache for IndexedDb. To construct, invoke
 * `newIndexedDbRemoteDocumentCache()`.
 */
/** Creates a new IndexedDbRemoteDocumentCache. */ function Ea(t) {
    return new _a(t);
}

/**
 * Handles the details of adding and updating documents in the IndexedDbRemoteDocumentCache.
 *
 * Unlike the MemoryRemoteDocumentChangeBuffer, the IndexedDb implementation computes the size
 * delta for all submitted changes. This avoids having to re-read all documents from IndexedDb
 * when we apply the changes.
 */ var Ta = /** @class */ function(e) {
    /**
     * @param documentCache - The IndexedDbRemoteDocumentCache to apply the changes to.
     * @param trackRemovals - Whether to create sentinel deletes that can be tracked by
     * `getNewDocumentChanges()`.
     */
    function n(t, n) {
        var r = this;
        return (r = e.call(this) || this).ar = t, r.trackRemovals = n, 
        // A map of document sizes and read times prior to applying the changes in
        // this buffer.
        r.ur = new cr((function(t) {
            return t.toString();
        }), (function(t, e) {
            return t.isEqual(e);
        })), r;
    }
    return t(n, e), n.prototype.applyChanges = function(t) {
        var e = this, n = [], r = 0, i = new xe((function(t, e) {
            return it(t.canonicalString(), e.canonicalString());
        }));
        return this.changes.forEach((function(o, a) {
            var u = e.ur.get(o);
            if (n.push(e.ar.removeEntry(t, o, u.readTime)), a.isValidDocument()) {
                var s = so(e.ar.serializer, a);
                i = i.add(o.path.popLast());
                var c = ra(s);
                r += c - u.size, n.push(e.ar.addEntry(t, o, s));
            } else if (r -= u.size, e.trackRemovals) {
                // In order to track removals, we store a "sentinel delete" in the
                // RemoteDocumentCache. This entry is represented by a NoDocument
                // with a version of 0 and ignored by `maybeDecodeDocument()` but
                // preserved in `getNewDocumentChanges()`.
                var l = so(e.ar.serializer, a.convertToNoDocument(st.min()));
                n.push(e.ar.addEntry(t, o, l));
            }
        })), i.forEach((function(r) {
            n.push(e.ar.indexManager.addToCollectionParentIndex(t, r));
        })), n.push(this.ar.updateMetadata(t, r)), Dt.waitFor(n);
    }, n.prototype.getFromCache = function(t, e) {
        var n = this;
        // Record the size of everything we load from the cache so we can compute a delta later.
                return this.ar.rr(t, e).next((function(t) {
            return n.ur.set(e, {
                size: t.size,
                readTime: t.document.readTime
            }), t.document;
        }));
    }, n.prototype.getAllFromCache = function(t, e) {
        var n = this;
        // Record the size of everything we load from the cache so we can compute
        // a delta later.
                return this.ar.sr(t, e).next((function(t) {
            var e = t.documents;
            // Note: `getAllFromCache` returns two maps instead of a single map from
            // keys to `DocumentSizeEntry`s. This is to allow returning the
            // `MutableDocumentMap` directly, without a conversion.
            return t._r.forEach((function(t, r) {
                n.ur.set(t, {
                    size: r,
                    readTime: e.get(t).readTime
                });
            })), e;
        }));
    }, n;
}(Ia);

function Sa(t) {
    return we(t, "remoteDocumentGlobal");
}

/**
 * Helper to get a typed SimpleDbStore for the remoteDocuments object store.
 */ function xa(t) {
    return we(t, "remoteDocumentsV14");
}

/**
 * Returns a key that can be used for document lookups on the
 * `DbRemoteDocumentDocumentKeyIndex` index.
 */ function Ca(t) {
    var e = t.path.toArray();
    return [ 
    /* prefix path */ e.slice(0, e.length - 2), 
    /* collection id */ e[e.length - 2], 
    /* document id */ e[e.length - 1] ];
}

function Da(t, e) {
    var n = e.documentKey.path.toArray();
    return [ 
    /* collection id */ t, co(e.readTime), 
    /* prefix path */ n.slice(0, n.length - 2), 
    /* document id */ n.length > 0 ? n[n.length - 1] : "" ];
}

/**
 * Comparator that compares document keys according to the primary key sorting
 * used by the `DbRemoteDocumentDocument` store (by prefix path, collection id
 * and then document ID).
 *
 * Visible for testing.
 */ function Na(t, e) {
    for (var n = t.path.toArray(), r = e.path.toArray(), i = 0, o = 0
    // The ordering is based on https://chromium.googlesource.com/chromium/blink/+/fe5c21fef94dae71c1c3344775b8d8a7f7e6d9ec/Source/modules/indexeddb/IDBKey.cpp#74
    ; o < n.length - 2 && o < r.length - 2; ++o) if (i = it(n[o], r[o])) return i;
    return (i = it(n.length, r.length)) || ((i = it(n[n.length - 2], r[r.length - 2])) || it(n[n.length - 1], r[r.length - 1]));
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Schema Version for the Web client:
 * 1.  Initial version including Mutation Queue, Query Cache, and Remote
 *     Document Cache
 * 2.  Used to ensure a targetGlobal object exists and add targetCount to it. No
 *     longer required because migration 3 unconditionally clears it.
 * 3.  Dropped and re-created Query Cache to deal with cache corruption related
 *     to limbo resolution. Addresses
 *     https://github.com/firebase/firebase-ios-sdk/issues/1548
 * 4.  Multi-Tab Support.
 * 5.  Removal of held write acks.
 * 6.  Create document global for tracking document cache size.
 * 7.  Ensure every cached document has a sentinel row with a sequence number.
 * 8.  Add collection-parent index for Collection Group queries.
 * 9.  Change RemoteDocumentChanges store to be keyed by readTime rather than
 *     an auto-incrementing ID. This is required for Index-Free queries.
 * 10. Rewrite the canonical IDs to the explicit Protobuf-based format.
 * 11. Add bundles and named_queries for bundle support.
 * 12. Add document overlays.
 * 13. Rewrite the keys of the remote document cache to allow for efficient
 *     document lookup via `getAll()`.
 * 14. Add overlays.
 * 15. Add indexing support.
 * 16. Parse timestamp strings before creating index entries.
 */
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Represents a local view (overlay) of a document, and the fields that are
 * locally mutated.
 */ var Aa = function(t, 
/**
     * The fields that are locally mutated by patch mutations.
     *
     * If the overlayed	document is from set or delete mutations, this is `null`.
     * If there is no overlay (mutation) for the document, this is an empty `FieldMask`.
     */
e) {
    this.overlayedDocument = t, this.mutatedFields = e;
}, ka = /** @class */ function() {
    function t(t, e, n, r) {
        this.remoteDocumentCache = t, this.mutationQueue = e, this.documentOverlayCache = n, 
        this.indexManager = r
        /**
     * Get the local view of the document identified by `key`.
     *
     * @returns Local view of the document or null if we don't have any cached
     * state for it.
     */;
    }
    return t.prototype.getDocument = function(t, e) {
        var n = this, r = null;
        return this.documentOverlayCache.getOverlay(t, e).next((function(i) {
            return r = i, n.remoteDocumentCache.getEntry(t, e);
        })).next((function(t) {
            return null !== r && jr(r.mutation, t, Ne.empty(), ut.now()), t;
        }));
    }, 
    /**
     * Gets the local view of the documents identified by `keys`.
     *
     * If we don't have cached state for a document in `keys`, a NoDocument will
     * be stored for that key in the resulting set.
     */
    t.prototype.getDocuments = function(t, e) {
        var n = this;
        return this.remoteDocumentCache.getEntries(t, e).next((function(e) {
            return n.getLocalViewOfDocuments(t, e, br()).next((function() {
                return e;
            }));
        }));
    }, 
    /**
     * Similar to `getDocuments`, but creates the local view from the given
     * `baseDocs` without retrieving documents from the local store.
     *
     * @param transaction - The transaction this operation is scoped to.
     * @param docs - The documents to apply local mutations to get the local views.
     * @param existenceStateChanged - The set of document keys whose existence state
     *   is changed. This is useful to determine if some documents overlay needs
     *   to be recalculated.
     */
    t.prototype.getLocalViewOfDocuments = function(t, e, n) {
        var r = this;
        void 0 === n && (n = br());
        var i = vr();
        return this.populateOverlays(t, i, e).next((function() {
            return r.computeViews(t, e, i, n).next((function(t) {
                var e = dr();
                return t.forEach((function(t, n) {
                    e = e.insert(t, n.overlayedDocument);
                })), e;
            }));
        }));
    }, 
    /**
     * Gets the overlayed documents for the given document map, which will include
     * the local view of those documents and a `FieldMask` indicating which fields
     * are mutated locally, `null` if overlay is a Set or Delete mutation.
     */
    t.prototype.getOverlayedDocuments = function(t, e) {
        var n = this, r = vr();
        return this.populateOverlays(t, r, e).next((function() {
            return n.computeViews(t, e, r, br());
        }));
    }, 
    /**
     * Fetches the overlays for {@code docs} and adds them to provided overlay map
     * if the map does not already contain an entry for the given document key.
     */
    t.prototype.populateOverlays = function(t, e, n) {
        var r = [];
        return n.forEach((function(t) {
            e.has(t) || r.push(t);
        })), this.documentOverlayCache.getOverlays(t, r).next((function(t) {
            t.forEach((function(t, n) {
                e.set(t, n);
            }));
        }));
    }, 
    /**
     * Computes the local view for the given documents.
     *
     * @param docs - The documents to compute views for. It also has the base
     *   version of the documents.
     * @param overlays - The overlays that need to be applied to the given base
     *   version of the documents.
     * @param existenceStateChanged - A set of documents whose existence states
     *   might have changed. This is used to determine if we need to re-calculate
     *   overlays from mutation queues.
     * @return A map represents the local documents view.
     */
    t.prototype.computeViews = function(t, e, n, r) {
        var i = hr(), o = yr(), a = yr();
        return e.forEach((function(t, e) {
            var a = n.get(e.key);
            // Recalculate an overlay if the document's existence state changed due to
            // a remote event *and* the overlay is a PatchMutation. This is because
            // document existence state can change if some patch mutation's
            // preconditions are met.
            // NOTE: we recalculate when `overlay` is undefined as well, because there
            // might be a patch mutation whose precondition does not match before the
            // change (hence overlay is undefined), but would now match.
                        r.has(e.key) && (void 0 === a || a.mutation instanceof Hr) ? i = i.insert(e.key, e) : void 0 !== a ? (o.set(e.key, a.mutation.getFieldMask()), 
            jr(a.mutation, e, a.mutation.getFieldMask(), ut.now())) : 
            // no overlay exists
            // Using EMPTY to indicate there is no overlay for the document.
            o.set(e.key, Ne.empty());
        })), this.recalculateAndSaveOverlays(t, i).next((function(t) {
            return t.forEach((function(t, e) {
                return o.set(t, e);
            })), e.forEach((function(t, e) {
                var n;
                return a.set(t, new Aa(e, null !== (n = o.get(t)) && void 0 !== n ? n : null));
            })), a;
        }));
    }, t.prototype.recalculateAndSaveOverlays = function(t, e) {
        var n = this, r = yr(), i = new Ee((function(t, e) {
            return t - e;
        })), o = br();
        return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(t, e).next((function(t) {
            for (var n = function(t) {
                t.keys().forEach((function(n) {
                    var o = e.get(n);
                    if (null !== o) {
                        var a = r.get(n) || Ne.empty();
                        a = t.applyToLocalView(o, a), r.set(n, a);
                        var u = (i.get(t.batchId) || br()).add(n);
                        i = i.insert(t.batchId, u);
                    }
                }));
            }, o = 0, a = t; o < a.length; o++) {
                n(a[o]);
            }
        })).next((function() {
            // Iterate in descending order of batch IDs, and skip documents that are
            // already saved.
            for (var a = [], u = i.getReverseIterator(), s = function() {
                var i = u.getNext(), s = i.key, c = i.value, l = mr();
                c.forEach((function(t) {
                    if (!o.has(t)) {
                        var n = Gr(e.get(t), r.get(t));
                        null !== n && l.set(t, n), o = o.add(t);
                    }
                })), a.push(n.documentOverlayCache.saveOverlays(t, s, l));
            }; u.hasNext(); ) s();
            return Dt.waitFor(a);
        })).next((function() {
            return r;
        }));
    }, 
    /**
     * Recalculates overlays by reading the documents from remote document cache
     * first, and saves them after they are calculated.
     */
    t.prototype.recalculateAndSaveOverlaysForDocumentKeys = function(t, e) {
        var n = this;
        return this.remoteDocumentCache.getEntries(t, e).next((function(e) {
            return n.recalculateAndSaveOverlays(t, e);
        }));
    }, 
    /**
     * Performs a query against the local view of all documents.
     *
     * @param transaction - The persistence transaction.
     * @param query - The query to match documents against.
     * @param offset - Read time and key to start scanning by (exclusive).
     * @param context - A optional tracker to keep a record of important details
     *   during database local query execution.
     */
    t.prototype.getDocumentsMatchingQuery = function(t, e, n, r) {
        /**
 * Returns whether the query matches a single document by path (rather than a
 * collection).
 */
        return function(t) {
            return dt.isDocumentKey(t.path) && null === t.collectionGroup && 0 === t.filters.length;
        }(e) ? this.getDocumentsMatchingDocumentQuery(t, e.path) : Jn(e) ? this.getDocumentsMatchingCollectionGroupQuery(t, e, n, r) : this.getDocumentsMatchingCollectionQuery(t, e, n, r);
    }, 
    /**
     * Given a collection group, returns the next documents that follow the provided offset, along
     * with an updated batch ID.
     *
     * <p>The documents returned by this method are ordered by remote version from the provided
     * offset. If there are no more remote documents after the provided offset, documents with
     * mutations in order of batch id from the offset are returned. Since all documents in a batch are
     * returned together, the total number of documents returned can exceed {@code count}.
     *
     * @param transaction
     * @param collectionGroup The collection group for the documents.
     * @param offset The offset to index into.
     * @param count The number of documents to return
     * @return A LocalWriteResult with the documents that follow the provided offset and the last processed batch id.
     */
    t.prototype.getNextDocuments = function(t, e, n, r) {
        var i = this;
        return this.remoteDocumentCache.getAllFromCollectionGroup(t, e, n, r).next((function(o) {
            var a = r - o.size > 0 ? i.documentOverlayCache.getOverlaysForCollectionGroup(t, e, n.largestBatchId, r - o.size) : Dt.resolve(vr()), u = -1, s = o;
            // The callsite will use the largest batch ID together with the latest read time to create
            // a new index offset. Since we only process batch IDs if all remote documents have been read,
            // no overlay will increase the overall read time. This is why we only need to special case
            // the batch id.
                        return a.next((function(e) {
                return Dt.forEach(e, (function(e, n) {
                    return u < n.largestBatchId && (u = n.largestBatchId), o.get(e) ? Dt.resolve() : i.remoteDocumentCache.getEntry(t, e).next((function(t) {
                        s = s.insert(e, t);
                    }));
                })).next((function() {
                    return i.populateOverlays(t, e, o);
                })).next((function() {
                    return i.computeViews(t, s, e, br());
                })).next((function(t) {
                    return {
                        batchId: u,
                        changes: pr(t)
                    };
                }));
            }));
        }));
    }, t.prototype.getDocumentsMatchingDocumentQuery = function(t, e) {
        // Just do a simple document lookup.
        return this.getDocument(t, new dt(e)).next((function(t) {
            var e = dr();
            return t.isFoundDocument() && (e = e.insert(t.key, t)), e;
        }));
    }, t.prototype.getDocumentsMatchingCollectionGroupQuery = function(t, e, n, r) {
        var i = this, o = e.collectionGroup, a = dr();
        return this.indexManager.getCollectionParents(t, o).next((function(u) {
            return Dt.forEach(u, (function(u) {
                var s = function(t, e) {
                    return new Qn(e, 
                    /*collectionGroup=*/ null, t.explicitOrderBy.slice(), t.filters.slice(), t.limit, t.limitType, t.startAt, t.endAt);
                }(e, u.child(o));
                return i.getDocumentsMatchingCollectionQuery(t, s, n, r).next((function(t) {
                    t.forEach((function(t, e) {
                        a = a.insert(t, e);
                    }));
                }));
            })).next((function() {
                return a;
            }));
        }));
    }, t.prototype.getDocumentsMatchingCollectionQuery = function(t, e, n, r) {
        var i, o = this;
        // Query the remote documents and overlay mutations.
                return this.documentOverlayCache.getOverlaysForCollection(t, e.path, n.largestBatchId).next((function(a) {
            return i = a, o.remoteDocumentCache.getDocumentsMatchingQuery(t, e, n, i, r);
        })).next((function(t) {
            // As documents might match the query because of their overlay we need to
            // include documents for all overlays in the initial document set.
            i.forEach((function(e, n) {
                var r = n.getKey();
                null === t.get(r) && (t = t.insert(r, dn.newInvalidDocument(r)));
            }));
            // Apply the overlays and match against the query.
            var n = dr();
            return t.forEach((function(t, r) {
                var o = i.get(t);
                void 0 !== o && jr(o.mutation, r, Ne.empty(), ut.now()), 
                // Finally, insert the documents that still match the query
                or(e, r) && (n = n.insert(t, r));
            })), n;
        }));
    }, t;
}(), Pa = /** @class */ function() {
    function t(t) {
        this.serializer = t, this.cr = new Map, this.lr = new Map;
    }
    return t.prototype.getBundleMetadata = function(t, e) {
        return Dt.resolve(this.cr.get(e));
    }, t.prototype.saveBundleMetadata = function(t, e) {
        return this.cr.set(e.id, 
        /** Decodes a BundleMetadata proto into a BundleMetadata object. */
        function(t) {
            return {
                id: t.id,
                version: t.version,
                createTime: Ri(t.createTime)
            };
        }(e)), Dt.resolve();
    }, t.prototype.getNamedQuery = function(t, e) {
        return Dt.resolve(this.lr.get(e));
    }, t.prototype.saveNamedQuery = function(t, e) {
        return this.lr.set(e.name, function(t) {
            return {
                name: t.name,
                query: mo(t.bundledQuery),
                readTime: Ri(t.readTime)
            };
        }(e)), Dt.resolve();
    }, t;
}(), Oa = /** @class */ function() {
    function t() {
        // A map sorted by DocumentKey, whose value is a pair of the largest batch id
        // for the overlay and the overlay itself.
        this.overlays = new Ee(dt.comparator), this.hr = new Map;
    }
    return t.prototype.getOverlay = function(t, e) {
        return Dt.resolve(this.overlays.get(e));
    }, t.prototype.getOverlays = function(t, e) {
        var n = this, r = vr();
        return Dt.forEach(e, (function(e) {
            return n.getOverlay(t, e).next((function(t) {
                null !== t && r.set(e, t);
            }));
        })).next((function() {
            return r;
        }));
    }, t.prototype.saveOverlays = function(t, e, n) {
        var r = this;
        return n.forEach((function(n, i) {
            r.ht(t, e, i);
        })), Dt.resolve();
    }, t.prototype.removeOverlaysForBatchId = function(t, e, n) {
        var r = this, i = this.hr.get(n);
        return void 0 !== i && (i.forEach((function(t) {
            return r.overlays = r.overlays.remove(t);
        })), this.hr.delete(n)), Dt.resolve();
    }, t.prototype.getOverlaysForCollection = function(t, e, n) {
        for (var r = vr(), i = e.length + 1, o = new dt(e.child("")), a = this.overlays.getIteratorFrom(o); a.hasNext(); ) {
            var u = a.getNext().value, s = u.getKey();
            if (!e.isPrefixOf(s.path)) break;
            // Documents from sub-collections
                        s.path.length === i && u.largestBatchId > n && r.set(u.getKey(), u);
        }
        return Dt.resolve(r);
    }, t.prototype.getOverlaysForCollectionGroup = function(t, e, n, r) {
        for (var i = new Ee((function(t, e) {
            return t - e;
        })), o = this.overlays.getIterator(); o.hasNext(); ) {
            var a = o.getNext().value;
            if (a.getKey().getCollectionGroup() === e && a.largestBatchId > n) {
                var u = i.get(a.largestBatchId);
                null === u && (u = vr(), i = i.insert(a.largestBatchId, u)), u.set(a.getKey(), a);
            }
        }
        for (var s = vr(), c = i.getIterator(); c.hasNext() && (c.getNext().value.forEach((function(t, e) {
            return s.set(t, e);
        })), !(s.size() >= r)); ) ;
        return Dt.resolve(s);
    }, t.prototype.ht = function(t, e, n) {
        // Remove the association of the overlay to its batch id.
        var r = this.overlays.get(n.key);
        if (null !== r) {
            var i = this.hr.get(r.largestBatchId).delete(n.key);
            this.hr.set(r.largestBatchId, i);
        }
        this.overlays = this.overlays.insert(n.key, new oi(e, n));
        // Create the association of this overlay to the given largestBatchId.
        var o = this.hr.get(e);
        void 0 === o && (o = br(), this.hr.set(e, o)), this.hr.set(e, o.add(n.key));
    }, t;
}(), Ra = /** @class */ function() {
    function t() {
        // A set of outstanding references to a document sorted by key.
        this.Pr = new xe(Ma.Ir), 
        // A set of outstanding references to a document sorted by target id.
        this.Tr = new xe(Ma.Er)
        /** Returns true if the reference set contains no references. */;
    }
    return t.prototype.isEmpty = function() {
        return this.Pr.isEmpty();
    }, 
    /** Adds a reference to the given document key for the given ID. */ t.prototype.addReference = function(t, e) {
        var n = new Ma(t, e);
        this.Pr = this.Pr.add(n), this.Tr = this.Tr.add(n);
    }, 
    /** Add references to the given document keys for the given ID. */ t.prototype.dr = function(t, e) {
        var n = this;
        t.forEach((function(t) {
            return n.addReference(t, e);
        }));
    }, 
    /**
     * Removes a reference to the given document key for the given
     * ID.
     */
    t.prototype.removeReference = function(t, e) {
        this.Ar(new Ma(t, e));
    }, t.prototype.Rr = function(t, e) {
        var n = this;
        t.forEach((function(t) {
            return n.removeReference(t, e);
        }));
    }, 
    /**
     * Clears all references with a given ID. Calls removeRef() for each key
     * removed.
     */
    t.prototype.Vr = function(t) {
        var e = this, n = new dt(new lt([])), r = new Ma(n, t), i = new Ma(n, t + 1), o = [];
        return this.Tr.forEachInRange([ r, i ], (function(t) {
            e.Ar(t), o.push(t.key);
        })), o;
    }, t.prototype.mr = function() {
        var t = this;
        this.Pr.forEach((function(e) {
            return t.Ar(e);
        }));
    }, t.prototype.Ar = function(t) {
        this.Pr = this.Pr.delete(t), this.Tr = this.Tr.delete(t);
    }, t.prototype.gr = function(t) {
        var e = new dt(new lt([])), n = new Ma(e, t), r = new Ma(e, t + 1), i = br();
        return this.Tr.forEachInRange([ n, r ], (function(t) {
            i = i.add(t.key);
        })), i;
    }, t.prototype.containsKey = function(t) {
        var e = new Ma(t, 0), n = this.Pr.firstAfterOrEqual(e);
        return null !== n && t.isEqual(n.key);
    }, t;
}(), Ma = /** @class */ function() {
    function t(t, e) {
        this.key = t, this.pr = e
        /** Compare by key then by ID */;
    }
    return t.Ir = function(t, e) {
        return dt.comparator(t.key, e.key) || it(t.pr, e.pr);
    }, 
    /** Compare by ID then by key */ t.Er = function(t, e) {
        return it(t.pr, e.pr) || dt.comparator(t.key, e.key);
    }, t;
}(), Fa = /** @class */ function() {
    function t(t, e) {
        this.indexManager = t, this.referenceDelegate = e, 
        /**
             * The set of all mutations that have been sent but not yet been applied to
             * the backend.
             */
        this.mutationQueue = [], 
        /** Next value to use when assigning sequential IDs to each mutation batch. */
        this.yr = 1, 
        /** An ordered mapping between documents and the mutations batch IDs. */
        this.wr = new xe(Ma.Ir);
    }
    return t.prototype.checkEmpty = function(t) {
        return Dt.resolve(0 === this.mutationQueue.length);
    }, t.prototype.addMutationBatch = function(t, e, n, r) {
        var i = this.yr;
        this.yr++, this.mutationQueue.length > 0 && this.mutationQueue[this.mutationQueue.length - 1];
        var o = new ri(i, e, n, r);
        this.mutationQueue.push(o);
        // Track references by document key and index collection parents.
        for (var a = 0, u = r; a < u.length; a++) {
            var s = u[a];
            this.wr = this.wr.add(new Ma(s.key, i)), this.indexManager.addToCollectionParentIndex(t, s.key.path.popLast());
        }
        return Dt.resolve(o);
    }, t.prototype.lookupMutationBatch = function(t, e) {
        return Dt.resolve(this.Sr(e));
    }, t.prototype.getNextMutationBatchAfterBatchId = function(t, e) {
        var n = e + 1, r = this.br(n), i = r < 0 ? 0 : r;
        // The requested batchId may still be out of range so normalize it to the
        // start of the queue.
                return Dt.resolve(this.mutationQueue.length > i ? this.mutationQueue[i] : null);
    }, t.prototype.getHighestUnacknowledgedBatchId = function() {
        return Dt.resolve(0 === this.mutationQueue.length ? -1 : this.yr - 1);
    }, t.prototype.getAllMutationBatches = function(t) {
        return Dt.resolve(this.mutationQueue.slice());
    }, t.prototype.getAllMutationBatchesAffectingDocumentKey = function(t, e) {
        var n = this, r = new Ma(e, 0), i = new Ma(e, Number.POSITIVE_INFINITY), o = [];
        return this.wr.forEachInRange([ r, i ], (function(t) {
            var e = n.Sr(t.pr);
            o.push(e);
        })), Dt.resolve(o);
    }, t.prototype.getAllMutationBatchesAffectingDocumentKeys = function(t, e) {
        var n = this, r = new xe(it);
        return e.forEach((function(t) {
            var e = new Ma(t, 0), i = new Ma(t, Number.POSITIVE_INFINITY);
            n.wr.forEachInRange([ e, i ], (function(t) {
                r = r.add(t.pr);
            }));
        })), Dt.resolve(this.Dr(r));
    }, t.prototype.getAllMutationBatchesAffectingQuery = function(t, e) {
        // Use the query path as a prefix for testing if a document matches the
        // query.
        var n = e.path, r = n.length + 1, i = n;
        // Construct a document reference for actually scanning the index. Unlike
        // the prefix the document key in this reference must have an even number of
        // segments. The empty segment can be used a suffix of the query path
        // because it precedes all other segments in an ordered traversal.
                dt.isDocumentKey(i) || (i = i.child(""));
        var o = new Ma(new dt(i), 0), a = new xe(it);
        // Find unique batchIDs referenced by all documents potentially matching the
        // query.
                return this.wr.forEachWhile((function(t) {
            var e = t.key.path;
            return !!n.isPrefixOf(e) && (
            // Rows with document keys more than one segment longer than the query
            // path can't be matches. For example, a query on 'rooms' can't match
            // the document /rooms/abc/messages/xyx.
            // TODO(mcg): we'll need a different scanner when we implement
            // ancestor queries.
            e.length === r && (a = a.add(t.pr)), !0);
        }), o), Dt.resolve(this.Dr(a));
    }, t.prototype.Dr = function(t) {
        var e = this, n = [];
        // Construct an array of matching batches, sorted by batchID to ensure that
        // multiple mutations affecting the same document key are applied in order.
                return t.forEach((function(t) {
            var r = e.Sr(t);
            null !== r && n.push(r);
        })), n;
    }, t.prototype.removeMutationBatch = function(t, e) {
        var n = this;
        B(0 === this.Cr(e.batchId, "removed")), this.mutationQueue.shift();
        var r = this.wr;
        return Dt.forEach(e.mutations, (function(i) {
            var o = new Ma(i.key, e.batchId);
            return r = r.delete(o), n.referenceDelegate.markPotentiallyOrphaned(t, i.key);
        })).next((function() {
            n.wr = r;
        }));
    }, t.prototype.Mn = function(t) {
        // No-op since the memory mutation queue does not maintain a separate cache.
    }, t.prototype.containsKey = function(t, e) {
        var n = new Ma(e, 0), r = this.wr.firstAfterOrEqual(n);
        return Dt.resolve(e.isEqual(r && r.key));
    }, t.prototype.performConsistencyCheck = function(t) {
        return this.mutationQueue.length, Dt.resolve();
    }, 
    /**
     * Finds the index of the given batchId in the mutation queue and asserts that
     * the resulting index is within the bounds of the queue.
     *
     * @param batchId - The batchId to search for
     * @param action - A description of what the caller is doing, phrased in passive
     * form (e.g. "acknowledged" in a routine that acknowledges batches).
     */
    t.prototype.Cr = function(t, e) {
        return this.br(t);
    }, 
    /**
     * Finds the index of the given batchId in the mutation queue. This operation
     * is O(1).
     *
     * @returns The computed index of the batch with the given batchId, based on
     * the state of the queue. Note this index can be negative if the requested
     * batchId has already been remvoed from the queue or past the end of the
     * queue if the batchId is larger than the last added batch.
     */
    t.prototype.br = function(t) {
        return 0 === this.mutationQueue.length ? 0 : t - this.mutationQueue[0].batchId;
        // Examine the front of the queue to figure out the difference between the
        // batchId and indexes in the array. Note that since the queue is ordered
        // by batchId, if the first batch has a larger batchId then the requested
        // batchId doesn't exist in the queue.
        }, 
    /**
     * A version of lookupMutationBatch that doesn't return a promise, this makes
     * other functions that uses this code easier to read and more efficent.
     */
    t.prototype.Sr = function(t) {
        var e = this.br(t);
        return e < 0 || e >= this.mutationQueue.length ? null : this.mutationQueue[e];
    }, t;
}(), Va = /** @class */ function() {
    /**
     * @param sizer - Used to assess the size of a document. For eager GC, this is
     * expected to just return 0 to avoid unnecessarily doing the work of
     * calculating the size.
     */
    function t(t) {
        this.vr = t, 
        /** Underlying cache of documents and their read times. */
        this.docs = new Ee(dt.comparator), 
        /** Size of all cached documents. */
        this.size = 0;
    }
    return t.prototype.setIndexManager = function(t) {
        this.indexManager = t;
    }, 
    /**
     * Adds the supplied entry to the cache and updates the cache size as appropriate.
     *
     * All calls of `addEntry`  are required to go through the RemoteDocumentChangeBuffer
     * returned by `newChangeBuffer()`.
     */
    t.prototype.addEntry = function(t, e) {
        var n = e.key, r = this.docs.get(n), i = r ? r.size : 0, o = this.vr(e);
        return this.docs = this.docs.insert(n, {
            document: e.mutableCopy(),
            size: o
        }), this.size += o - i, this.indexManager.addToCollectionParentIndex(t, n.path.popLast());
    }, 
    /**
     * Removes the specified entry from the cache and updates the cache size as appropriate.
     *
     * All calls of `removeEntry` are required to go through the RemoteDocumentChangeBuffer
     * returned by `newChangeBuffer()`.
     */
    t.prototype.removeEntry = function(t) {
        var e = this.docs.get(t);
        e && (this.docs = this.docs.remove(t), this.size -= e.size);
    }, t.prototype.getEntry = function(t, e) {
        var n = this.docs.get(e);
        return Dt.resolve(n ? n.document.mutableCopy() : dn.newInvalidDocument(e));
    }, t.prototype.getEntries = function(t, e) {
        var n = this, r = hr();
        return e.forEach((function(t) {
            var e = n.docs.get(t);
            r = r.insert(t, e ? e.document.mutableCopy() : dn.newInvalidDocument(t));
        })), Dt.resolve(r);
    }, t.prototype.getDocumentsMatchingQuery = function(t, e, n, r) {
        for (var i = hr(), o = e.path, a = new dt(o.child("")), u = this.docs.getIteratorFrom(a)
        // Documents are ordered by key, so we can use a prefix scan to narrow down
        // the documents we need to match the query against.
        ; u.hasNext(); ) {
            var s = u.getNext(), c = s.key, l = s.value.document;
            if (!o.isPrefixOf(c.path)) break;
            c.path.length > o.length + 1 || Tt(_t(l), n) <= 0 || (r.has(l.key) || or(e, l)) && (i = i.insert(l.key, l.mutableCopy()));
        }
        return Dt.resolve(i);
    }, t.prototype.getAllFromCollectionGroup = function(t, e, n, r) {
        // This method should only be called from the IndexBackfiller if persistence
        // is enabled.
        U();
    }, t.prototype.Fr = function(t, e) {
        return Dt.forEach(this.docs, (function(t) {
            return e(t);
        }));
    }, t.prototype.newChangeBuffer = function(t) {
        // `trackRemovals` is ignores since the MemoryRemoteDocumentCache keeps
        // a separate changelog and does not need special handling for removals.
        return new La(this);
    }, t.prototype.getSize = function(t) {
        return Dt.resolve(this.size);
    }, t;
}(), La = /** @class */ function(e) {
    function n(t) {
        var n = this;
        return (n = e.call(this) || this).ar = t, n;
    }
    return t(n, e), n.prototype.applyChanges = function(t) {
        var e = this, n = [];
        return this.changes.forEach((function(r, i) {
            i.isValidDocument() ? n.push(e.ar.addEntry(t, i)) : e.ar.removeEntry(r);
        })), Dt.waitFor(n);
    }, n.prototype.getFromCache = function(t, e) {
        return this.ar.getEntry(t, e);
    }, n.prototype.getAllFromCache = function(t, e) {
        return this.ar.getEntries(t, e);
    }, n;
}(Ia), qa = /** @class */ function() {
    function t(t) {
        this.persistence = t, 
        /**
             * Maps a target to the data about that target
             */
        this.Mr = new cr((function(t) {
            return Un(t);
        }), Bn), 
        /** The last received snapshot version. */
        this.lastRemoteSnapshotVersion = st.min(), 
        /** The highest numbered target ID encountered. */
        this.highestTargetId = 0, 
        /** The highest sequence number encountered. */
        this.Or = 0, 
        /**
             * A ordered bidirectional mapping between documents and the remote target
             * IDs.
             */
        this.Nr = new Ra, this.targetCount = 0, this.Lr = ca.Nn();
    }
    return t.prototype.forEachTarget = function(t, e) {
        return this.Mr.forEach((function(t, n) {
            return e(n);
        })), Dt.resolve();
    }, t.prototype.getLastRemoteSnapshotVersion = function(t) {
        return Dt.resolve(this.lastRemoteSnapshotVersion);
    }, t.prototype.getHighestSequenceNumber = function(t) {
        return Dt.resolve(this.Or);
    }, t.prototype.allocateTargetId = function(t) {
        return this.highestTargetId = this.Lr.next(), Dt.resolve(this.highestTargetId);
    }, t.prototype.setTargetsMetadata = function(t, e, n) {
        return n && (this.lastRemoteSnapshotVersion = n), e > this.Or && (this.Or = e), 
        Dt.resolve();
    }, t.prototype.qn = function(t) {
        this.Mr.set(t.target, t);
        var e = t.targetId;
        e > this.highestTargetId && (this.Lr = new ca(e), this.highestTargetId = e), t.sequenceNumber > this.Or && (this.Or = t.sequenceNumber);
    }, t.prototype.addTargetData = function(t, e) {
        return this.qn(e), this.targetCount += 1, Dt.resolve();
    }, t.prototype.updateTargetData = function(t, e) {
        return this.qn(e), Dt.resolve();
    }, t.prototype.removeTargetData = function(t, e) {
        return this.Mr.delete(e.target), this.Nr.Vr(e.targetId), this.targetCount -= 1, 
        Dt.resolve();
    }, t.prototype.removeTargets = function(t, e, n) {
        var r = this, i = 0, o = [];
        return this.Mr.forEach((function(a, u) {
            u.sequenceNumber <= e && null === n.get(u.targetId) && (r.Mr.delete(a), o.push(r.removeMatchingKeysForTargetId(t, u.targetId)), 
            i++);
        })), Dt.waitFor(o).next((function() {
            return i;
        }));
    }, t.prototype.getTargetCount = function(t) {
        return Dt.resolve(this.targetCount);
    }, t.prototype.getTargetData = function(t, e) {
        var n = this.Mr.get(e) || null;
        return Dt.resolve(n);
    }, t.prototype.addMatchingKeys = function(t, e, n) {
        return this.Nr.dr(e, n), Dt.resolve();
    }, t.prototype.removeMatchingKeys = function(t, e, n) {
        this.Nr.Rr(e, n);
        var r = this.persistence.referenceDelegate, i = [];
        return r && e.forEach((function(e) {
            i.push(r.markPotentiallyOrphaned(t, e));
        })), Dt.waitFor(i);
    }, t.prototype.removeMatchingKeysForTargetId = function(t, e) {
        return this.Nr.Vr(e), Dt.resolve();
    }, t.prototype.getMatchingKeysForTargetId = function(t, e) {
        var n = this.Nr.gr(e);
        return Dt.resolve(n);
    }, t.prototype.containsKey = function(t, e) {
        return Dt.resolve(this.Nr.containsKey(e));
    }, t;
}(), Ua = /** @class */ function() {
    /**
     * The constructor accepts a factory for creating a reference delegate. This
     * allows both the delegate and this instance to have strong references to
     * each other without having nullable fields that would then need to be
     * checked or asserted on every access.
     */
    function t(t, e) {
        var n = this;
        this.Br = {}, this.overlays = {}, this.kr = new Ut(0), this.qr = !1, this.qr = !0, 
        this.referenceDelegate = t(this), this.Qr = new qa(this), this.indexManager = new jo, 
        this.remoteDocumentCache = function(t) {
            return new Va(t);
        }((function(t) {
            return n.referenceDelegate.Kr(t);
        })), this.serializer = new uo(e), this.$r = new Pa(this.serializer);
    }
    return t.prototype.start = function() {
        return Promise.resolve();
    }, t.prototype.shutdown = function() {
        // No durable state to ensure is closed on shutdown.
        return this.qr = !1, Promise.resolve();
    }, Object.defineProperty(t.prototype, "started", {
        get: function() {
            return this.qr;
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype.setDatabaseDeletedListener = function() {
        // No op.
    }, t.prototype.setNetworkEnabled = function() {
        // No op.
    }, t.prototype.getIndexManager = function(t) {
        // We do not currently support indices for memory persistence, so we can
        // return the same shared instance of the memory index manager.
        return this.indexManager;
    }, t.prototype.getDocumentOverlayCache = function(t) {
        var e = this.overlays[t.toKey()];
        return e || (e = new Oa, this.overlays[t.toKey()] = e), e;
    }, t.prototype.getMutationQueue = function(t, e) {
        var n = this.Br[t.toKey()];
        return n || (n = new Fa(e, this.referenceDelegate), this.Br[t.toKey()] = n), n;
    }, t.prototype.getTargetCache = function() {
        return this.Qr;
    }, t.prototype.getRemoteDocumentCache = function() {
        return this.remoteDocumentCache;
    }, t.prototype.getBundleCache = function() {
        return this.$r;
    }, t.prototype.runTransaction = function(t, e, n) {
        var r = this;
        F("MemoryPersistence", "Starting transaction:", t);
        var i = new Ba(this.kr.next());
        return this.referenceDelegate.Ur(), n(i).next((function(t) {
            return r.referenceDelegate.Wr(i).next((function() {
                return t;
            }));
        })).toPromise().then((function(t) {
            return i.raiseOnCommittedEvent(), t;
        }));
    }, t.prototype.Gr = function(t, e) {
        return Dt.or(Object.values(this.Br).map((function(n) {
            return function() {
                return n.containsKey(t, e);
            };
        })));
    }, t;
}(), Ba = /** @class */ function(e) {
    function n(t) {
        var n = this;
        return (n = e.call(this) || this).currentSequenceNumber = t, n;
    }
    return t(n, e), n;
}(xt), za = /** @class */ function() {
    function t(t) {
        this.persistence = t, 
        /** Tracks all documents that are active in Query views. */
        this.zr = new Ra, 
        /** The list of documents that are potentially GCed after each transaction. */
        this.jr = null;
    }
    return t.Hr = function(e) {
        return new t(e);
    }, Object.defineProperty(t.prototype, "Jr", {
        get: function() {
            if (this.jr) return this.jr;
            throw U();
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype.addReference = function(t, e, n) {
        return this.zr.addReference(n, e), this.Jr.delete(n.toString()), Dt.resolve();
    }, t.prototype.removeReference = function(t, e, n) {
        return this.zr.removeReference(n, e), this.Jr.add(n.toString()), Dt.resolve();
    }, t.prototype.markPotentiallyOrphaned = function(t, e) {
        return this.Jr.add(e.toString()), Dt.resolve();
    }, t.prototype.removeTarget = function(t, e) {
        var n = this;
        this.zr.Vr(e.targetId).forEach((function(t) {
            return n.Jr.add(t.toString());
        }));
        var r = this.persistence.getTargetCache();
        return r.getMatchingKeysForTargetId(t, e.targetId).next((function(t) {
            t.forEach((function(t) {
                return n.Jr.add(t.toString());
            }));
        })).next((function() {
            return r.removeTargetData(t, e);
        }));
    }, t.prototype.Ur = function() {
        this.jr = new Set;
    }, t.prototype.Wr = function(t) {
        var e = this, n = this.persistence.getRemoteDocumentCache().newChangeBuffer();
        // Remove newly orphaned documents.
                return Dt.forEach(this.Jr, (function(r) {
            var i = dt.fromPath(r);
            return e.Yr(t, i).next((function(t) {
                t || n.removeEntry(i, st.min());
            }));
        })).next((function() {
            return e.jr = null, n.apply(t);
        }));
    }, t.prototype.updateLimboDocument = function(t, e) {
        var n = this;
        return this.Yr(t, e).next((function(t) {
            t ? n.Jr.delete(e.toString()) : n.Jr.add(e.toString());
        }));
    }, t.prototype.Kr = function(t) {
        // For eager GC, we don't care about the document size, there are no size thresholds.
        return 0;
    }, t.prototype.Yr = function(t, e) {
        var n = this;
        return Dt.or([ function() {
            return Dt.resolve(n.zr.containsKey(e));
        }, function() {
            return n.persistence.getTargetCache().containsKey(t, e);
        }, function() {
            return n.persistence.Gr(t, e);
        } ]);
    }, t;
}(), Ga = /** @class */ function() {
    function t(t, e) {
        this.persistence = t, this.Zr = new cr((function(t) {
            return Kt(t.path);
        }), (function(t, e) {
            return t.isEqual(e);
        })), this.garbageCollector = ga(this, e);
    }
    return t.Hr = function(e, n) {
        return new t(e, n);
    }, 
    // No-ops, present so memory persistence doesn't have to care which delegate
    // it has.
    t.prototype.Ur = function() {}, t.prototype.Wr = function(t) {
        return Dt.resolve();
    }, t.prototype.forEachTarget = function(t, e) {
        return this.persistence.getTargetCache().forEachTarget(t, e);
    }, t.prototype.Hn = function(t) {
        var e = this.Zn(t);
        return this.persistence.getTargetCache().getTargetCount(t).next((function(t) {
            return e.next((function(e) {
                return t + e;
            }));
        }));
    }, t.prototype.Zn = function(t) {
        var e = 0;
        return this.Jn(t, (function(t) {
            e++;
        })).next((function() {
            return e;
        }));
    }, t.prototype.Jn = function(t, e) {
        var n = this;
        return Dt.forEach(this.Zr, (function(r, i) {
            return n.er(t, r, i).next((function(t) {
                return t ? Dt.resolve() : e(i);
            }));
        }));
    }, t.prototype.removeTargets = function(t, e, n) {
        return this.persistence.getTargetCache().removeTargets(t, e, n);
    }, t.prototype.removeOrphanedDocuments = function(t, e) {
        var n = this, r = 0, i = this.persistence.getRemoteDocumentCache(), o = i.newChangeBuffer();
        return i.Fr(t, (function(i) {
            return n.er(t, i, e).next((function(t) {
                t || (r++, o.removeEntry(i, st.min()));
            }));
        })).next((function() {
            return o.apply(t);
        })).next((function() {
            return r;
        }));
    }, t.prototype.markPotentiallyOrphaned = function(t, e) {
        return this.Zr.set(e, t.currentSequenceNumber), Dt.resolve();
    }, t.prototype.removeTarget = function(t, e) {
        var n = e.withSequenceNumber(t.currentSequenceNumber);
        return this.persistence.getTargetCache().updateTargetData(t, n);
    }, t.prototype.addReference = function(t, e, n) {
        return this.Zr.set(n, t.currentSequenceNumber), Dt.resolve();
    }, t.prototype.removeReference = function(t, e, n) {
        return this.Zr.set(n, t.currentSequenceNumber), Dt.resolve();
    }, t.prototype.updateLimboDocument = function(t, e) {
        return this.Zr.set(e, t.currentSequenceNumber), Dt.resolve();
    }, t.prototype.Kr = function(t) {
        var e = t.key.toString().length;
        return t.isFoundDocument() && (e += Xe(t.data.value)), e;
    }, t.prototype.er = function(t, e, n) {
        var r = this;
        return Dt.or([ function() {
            return r.persistence.Gr(t, e);
        }, function() {
            return r.persistence.getTargetCache().containsKey(t, e);
        }, function() {
            var t = r.Zr.get(e);
            return Dt.resolve(void 0 !== t && t > n);
        } ]);
    }, t.prototype.getCacheSize = function(t) {
        return this.persistence.getRemoteDocumentCache().getSize(t);
    }, t;
}(), Ka = /** @class */ function() {
    function t(t) {
        this.serializer = t;
    }
    /**
     * Performs database creation and schema upgrades.
     *
     * Note that in production, this method is only ever used to upgrade the schema
     * to SCHEMA_VERSION. Different values of toVersion are only used for testing
     * and local feature development.
     */    return t.prototype.N = function(t, e, n, r) {
        var i = this, o = new Nt("createOrUpgrade", e);
        n < 1 && r >= 1 && (function(t) {
            t.createObjectStore("owner");
        }(t), function(t) {
            t.createObjectStore("mutationQueues", {
                keyPath: "userId"
            }), t.createObjectStore("mutations", {
                keyPath: "batchId",
                autoIncrement: !0
            }).createIndex("userMutationsIndex", Yt, {
                unique: !0
            }), t.createObjectStore("documentMutations");
        }(t), ja(t), function(t) {
            t.createObjectStore("remoteDocuments");
        }(t));
        // Migration 2 to populate the targetGlobal object no longer needed since
        // migration 3 unconditionally clears it.
        var a = Dt.resolve();
        return n < 3 && r >= 3 && (
        // Brand new clients don't need to drop and recreate--only clients that
        // potentially have corrupt data.
        0 !== n && (function(t) {
            t.deleteObjectStore("targetDocuments"), t.deleteObjectStore("targets"), t.deleteObjectStore("targetGlobal");
        }(t), ja(t)), a = a.next((function() {
            /**
     * Creates the target global singleton row.
     *
     * @param txn - The version upgrade transaction for indexeddb
     */
            return function(t) {
                var e = t.store("targetGlobal"), n = {
                    highestTargetId: 0,
                    highestListenSequenceNumber: 0,
                    lastRemoteSnapshotVersion: st.min().toTimestamp(),
                    targetCount: 0
                };
                return e.put("targetGlobalKey", n);
            }(o);
        }))), n < 4 && r >= 4 && (0 !== n && (
        // Schema version 3 uses auto-generated keys to generate globally unique
        // mutation batch IDs (this was previously ensured internally by the
        // client). To migrate to the new schema, we have to read all mutations
        // and write them back out. We preserve the existing batch IDs to guarantee
        // consistency with other object stores. Any further mutation batch IDs will
        // be auto-generated.
        a = a.next((function() {
            return function(t, e) {
                return e.store("mutations").W().next((function(n) {
                    t.deleteObjectStore("mutations"), t.createObjectStore("mutations", {
                        keyPath: "batchId",
                        autoIncrement: !0
                    }).createIndex("userMutationsIndex", Yt, {
                        unique: !0
                    });
                    var r = e.store("mutations"), i = n.map((function(t) {
                        return r.put(t);
                    }));
                    return Dt.waitFor(i);
                }));
            }(t, o);
        }))), a = a.next((function() {
            !function(t) {
                t.createObjectStore("clientMetadata", {
                    keyPath: "clientId"
                });
            }(t);
        }))), n < 5 && r >= 5 && (a = a.next((function() {
            return i.Xr(o);
        }))), n < 6 && r >= 6 && (a = a.next((function() {
            return function(t) {
                t.createObjectStore("remoteDocumentGlobal");
            }(t), i.ei(o);
        }))), n < 7 && r >= 7 && (a = a.next((function() {
            return i.ti(o);
        }))), n < 8 && r >= 8 && (a = a.next((function() {
            return i.ni(t, o);
        }))), n < 9 && r >= 9 && (a = a.next((function() {
            // Multi-Tab used to manage its own changelog, but this has been moved
            // to the DbRemoteDocument object store itself. Since the previous change
            // log only contained transient data, we can drop its object store.
            !function(t) {
                t.objectStoreNames.contains("remoteDocumentChanges") && t.deleteObjectStore("remoteDocumentChanges");
            }(t);
            // Note: Schema version 9 used to create a read time index for the
            // RemoteDocumentCache. This is now done with schema version 13.
                }))), n < 10 && r >= 10 && (a = a.next((function() {
            return i.ri(o);
        }))), n < 11 && r >= 11 && (a = a.next((function() {
            !function(t) {
                t.createObjectStore("bundles", {
                    keyPath: "bundleId"
                });
            }(t), function(t) {
                t.createObjectStore("namedQueries", {
                    keyPath: "name"
                });
            }(t);
        }))), n < 12 && r >= 12 && (a = a.next((function() {
            !function(t) {
                var e = t.createObjectStore("documentOverlays", {
                    keyPath: ce
                });
                e.createIndex("collectionPathOverlayIndex", le, {
                    unique: !1
                }), e.createIndex("collectionGroupOverlayIndex", he, {
                    unique: !1
                });
            }(t);
        }))), n < 13 && r >= 13 && (a = a.next((function() {
            return function(t) {
                var e = t.createObjectStore("remoteDocumentsV14", {
                    keyPath: Zt
                });
                e.createIndex("documentKeyIndex", $t), e.createIndex("collectionGroupIndex", te);
            }(t);
        })).next((function() {
            return i.ii(t, o);
        })).next((function() {
            return t.deleteObjectStore("remoteDocuments");
        }))), n < 14 && r >= 14 && (a = a.next((function() {
            return i.si(t, o);
        }))), n < 15 && r >= 15 && (a = a.next((function() {
            return function(t) {
                t.createObjectStore("indexConfiguration", {
                    keyPath: "indexId",
                    autoIncrement: !0
                }).createIndex("collectionGroupIndex", "collectionGroup", {
                    unique: !1
                }), t.createObjectStore("indexState", {
                    keyPath: oe
                }).createIndex("sequenceNumberIndex", ae, {
                    unique: !1
                }), t.createObjectStore("indexEntries", {
                    keyPath: ue
                }).createIndex("documentKeyIndex", se, {
                    unique: !1
                });
            }(t);
        }))), n < 16 && r >= 16 && (
        // Clear the object stores to remove possibly corrupted index entries
        a = a.next((function() {
            e.objectStore("indexState").clear();
        })).next((function() {
            e.objectStore("indexEntries").clear();
        }))), a;
    }, t.prototype.ei = function(t) {
        var e = 0;
        return t.store("remoteDocuments").Y((function(t, n) {
            e += ra(n);
        })).next((function() {
            var n = {
                byteSize: e
            };
            return t.store("remoteDocumentGlobal").put("remoteDocumentGlobalKey", n);
        }));
    }, t.prototype.Xr = function(t) {
        var e = this, n = t.store("mutationQueues"), r = t.store("mutations");
        return n.W().next((function(n) {
            return Dt.forEach(n, (function(n) {
                var i = IDBKeyRange.bound([ n.userId, -1 ], [ n.userId, n.lastAcknowledgedBatchId ]);
                return r.W("userMutationsIndex", i).next((function(r) {
                    return Dt.forEach(r, (function(r) {
                        B(r.userId === n.userId);
                        var i = fo(e.serializer, r);
                        return na(t, n.userId, i).next((function() {}));
                    }));
                }));
            }));
        }));
    }, 
    /**
     * Ensures that every document in the remote document cache has a corresponding sentinel row
     * with a sequence number. Missing rows are given the most recently used sequence number.
     */
    t.prototype.ti = function(t) {
        var e = t.store("targetDocuments"), n = t.store("remoteDocuments");
        return t.store("targetGlobal").get("targetGlobalKey").next((function(t) {
            var r = [];
            return n.Y((function(n, i) {
                var o = new lt(n), a = function(t) {
                    return [ 0, Kt(t) ];
                }(o);
                r.push(e.get(a).next((function(n) {
                    return n ? Dt.resolve() : function(n) {
                        return e.put({
                            targetId: 0,
                            path: Kt(n),
                            sequenceNumber: t.highestListenSequenceNumber
                        });
                    }(o);
                })));
            })).next((function() {
                return Dt.waitFor(r);
            }));
        }));
    }, t.prototype.ni = function(t, e) {
        // Create the index.
        t.createObjectStore("collectionParents", {
            keyPath: ie
        });
        var n = e.store("collectionParents"), r = new Qo, i = function(t) {
            if (r.add(t)) {
                var e = t.lastSegment(), i = t.popLast();
                return n.put({
                    collectionId: e,
                    parent: Kt(i)
                });
            }
        };
        // Helper to add an index entry iff we haven't already written it.
        // Index existing remote documents.
                return e.store("remoteDocuments").Y({
            J: !0
        }, (function(t, e) {
            var n = new lt(t);
            return i(n.popLast());
        })).next((function() {
            return e.store("documentMutations").Y({
                J: !0
            }, (function(t, e) {
                t[0];
                var n = t[1];
                t[2];
                var r = Wt(n);
                return i(r.popLast());
            }));
        }));
    }, t.prototype.ri = function(t) {
        var e = this, n = t.store("targets");
        return n.Y((function(t, r) {
            var i = po(r), o = vo(e.serializer, i);
            return n.put(o);
        }));
    }, t.prototype.ii = function(t, e) {
        var n = e.store("remoteDocuments"), r = [];
        return n.Y((function(t, n) {
            var i = e.store("remoteDocumentsV14"), o = function(t) {
                return t.document ? new dt(lt.fromString(t.document.name).popFirst(5)) : t.noDocument ? dt.fromSegments(t.noDocument.path) : t.unknownDocument ? dt.fromSegments(t.unknownDocument.path) : U();
            }(n).path.toArray(), a = {
                prefixPath: o.slice(0, o.length - 2),
                collectionGroup: o[o.length - 2],
                documentId: o[o.length - 1],
                readTime: n.readTime || [ 0, 0 ],
                unknownDocument: n.unknownDocument,
                noDocument: n.noDocument,
                document: n.document,
                hasCommittedMutations: !!n.hasCommittedMutations
            };
            r.push(i.put(a));
        })).next((function() {
            return Dt.waitFor(r);
        }));
    }, t.prototype.si = function(t, e) {
        var n = this, r = e.store("mutations"), i = Ea(this.serializer), o = new Ua(za.Hr, this.serializer.ct);
        return r.W().next((function(t) {
            var r = new Map;
            return t.forEach((function(t) {
                var e, i = null !== (e = r.get(t.userId)) && void 0 !== e ? e : br();
                fo(n.serializer, t).keys().forEach((function(t) {
                    return i = i.add(t);
                })), r.set(t.userId, i);
            })), Dt.forEach(r, (function(t, r) {
                var a = new k(r), u = Eo.lt(n.serializer, a), s = o.getIndexManager(a), c = ia.lt(a, n.serializer, s, o.referenceDelegate);
                return new ka(i, c, u, s).recalculateAndSaveOverlaysForDocumentKeys(new ge(e, Ut._e), t).next();
            }));
        }));
    }, t;
}();

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A readonly view of the local state of all documents we're tracking (i.e. we
 * have a cached version in remoteDocumentCache or local mutations for the
 * document). The view is computed by applying the mutations in the
 * MutationQueue to the RemoteDocumentCache.
 */ function ja(t) {
    t.createObjectStore("targetDocuments", {
        keyPath: ne
    }).createIndex("documentTargetsIndex", re, {
        unique: !0
    }), 
    // NOTE: This is unique only because the TargetId is the suffix.
    t.createObjectStore("targets", {
        keyPath: "targetId"
    }).createIndex("queryTargetsIndex", ee, {
        unique: !0
    }), t.createObjectStore("targetGlobal");
}

var Qa = "Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.", Wa = /** @class */ function() {
    function t(
    /**
     * Whether to synchronize the in-memory state of multiple tabs and share
     * access to local persistence.
     */
    e, n, r, i, o, a, u, s, c, 
    /**
     * If set to true, forcefully obtains database access. Existing tabs will
     * no longer be able to access IndexedDB.
     */
    l, h) {
        if (void 0 === h && (h = 16), this.allowTabSynchronization = e, this.persistenceKey = n, 
        this.clientId = r, this.oi = o, this.window = a, this.document = u, this._i = c, 
        this.ai = l, this.ui = h, this.kr = null, this.qr = !1, this.isPrimary = !1, this.networkEnabled = !0, 
        /** Our window.unload handler, if registered. */
        this.ci = null, this.inForeground = !1, 
        /** Our 'visibilitychange' listener if registered. */
        this.li = null, 
        /** The client metadata refresh task. */
        this.hi = null, 
        /** The last time we garbage collected the client metadata object store. */
        this.Pi = Number.NEGATIVE_INFINITY, 
        /** A listener to notify on primary state changes. */
        this.Ii = function(t) {
            return Promise.resolve();
        }, !t.D()) throw new j(K.UNIMPLEMENTED, "This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");
        this.referenceDelegate = new wa(this, i), this.Ti = n + "main", this.serializer = new uo(s), 
        this.Ei = new At(this.Ti, this.ui, new Ka(this.serializer)), this.Qr = new la(this.referenceDelegate, this.serializer), 
        this.remoteDocumentCache = Ea(this.serializer), this.$r = new bo, this.window && this.window.localStorage ? this.di = this.window.localStorage : (this.di = null, 
        !1 === l && V("IndexedDbPersistence", "LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."));
    }
    /**
     * Attempt to start IndexedDb persistence.
     *
     * @returns Whether persistence was enabled.
     */    return t.prototype.start = function() {
        var t = this;
        // NOTE: This is expected to fail sometimes (in the case of another tab
        // already having the persistence lock), so it's the first thing we should
        // do.
                return this.Ai().then((function() {
            if (!t.isPrimary && !t.allowTabSynchronization) 
            // Fail `start()` if `synchronizeTabs` is disabled and we cannot
            // obtain the primary lease.
            throw new j(K.FAILED_PRECONDITION, Qa);
            return t.Ri(), t.Vi(), t.mi(), t.runTransaction("getHighestListenSequenceNumber", "readonly", (function(e) {
                return t.Qr.getHighestSequenceNumber(e);
            }));
        })).then((function(e) {
            t.kr = new Ut(e, t._i);
        })).then((function() {
            t.qr = !0;
        })).catch((function(e) {
            return t.Ei && t.Ei.close(), Promise.reject(e);
        }));
    }, 
    /**
     * Registers a listener that gets called when the primary state of the
     * instance changes. Upon registering, this listener is invoked immediately
     * with the current primary state.
     *
     * PORTING NOTE: This is only used for Web multi-tab.
     */
    t.prototype.fi = function(t) {
        var r = this;
        return this.Ii = function(i) {
            return e(r, void 0, void 0, (function() {
                return n(this, (function(e) {
                    return this.started ? [ 2 /*return*/ , t(i) ] : [ 2 /*return*/ ];
                }));
            }));
        }, t(this.isPrimary);
    }, 
    /**
     * Registers a listener that gets called when the database receives a
     * version change event indicating that it has deleted.
     *
     * PORTING NOTE: This is only used for Web multi-tab.
     */
    t.prototype.setDatabaseDeletedListener = function(t) {
        var r = this;
        this.Ei.B((function(i) {
            return e(r, void 0, void 0, (function() {
                return n(this, (function(e) {
                    switch (e.label) {
                      case 0:
                        return null === i.newVersion ? [ 4 /*yield*/ , t() ] : [ 3 /*break*/ , 2 ];

                      case 1:
                        e.sent(), e.label = 2;

                      case 2:
                        return [ 2 /*return*/ ];
                    }
                }));
            }));
        }));
    }, 
    /**
     * Adjusts the current network state in the client's metadata, potentially
     * affecting the primary lease.
     *
     * PORTING NOTE: This is only used for Web multi-tab.
     */
    t.prototype.setNetworkEnabled = function(t) {
        var r = this;
        this.networkEnabled !== t && (this.networkEnabled = t, 
        // Schedule a primary lease refresh for immediate execution. The eventual
        // lease update will be propagated via `primaryStateListener`.
        this.oi.enqueueAndForget((function() {
            return e(r, void 0, void 0, (function() {
                return n(this, (function(t) {
                    switch (t.label) {
                      case 0:
                        return this.started ? [ 4 /*yield*/ , this.Ai() ] : [ 3 /*break*/ , 2 ];

                      case 1:
                        t.sent(), t.label = 2;

                      case 2:
                        return [ 2 /*return*/ ];
                    }
                }));
            }));
        })));
    }, 
    /**
     * Updates the client metadata in IndexedDb and attempts to either obtain or
     * extend the primary lease for the local client. Asynchronously notifies the
     * primary state listener if the client either newly obtained or released its
     * primary lease.
     */
    t.prototype.Ai = function() {
        var t = this;
        return this.runTransaction("updateClientMetadataAndTryBecomePrimary", "readwrite", (function(e) {
            return Ha(e).put({
                clientId: t.clientId,
                updateTimeMs: Date.now(),
                networkEnabled: t.networkEnabled,
                inForeground: t.inForeground
            }).next((function() {
                if (t.isPrimary) return t.gi(e).next((function(e) {
                    e || (t.isPrimary = !1, t.oi.enqueueRetryable((function() {
                        return t.Ii(!1);
                    })));
                }));
            })).next((function() {
                return t.pi(e);
            })).next((function(n) {
                return t.isPrimary && !n ? t.yi(e).next((function() {
                    return !1;
                })) : !!n && t.wi(e).next((function() {
                    return !0;
                }));
            }));
        })).catch((function(e) {
            if (Ot(e)) 
            // Proceed with the existing state. Any subsequent access to
            // IndexedDB will verify the lease.
            return F("IndexedDbPersistence", "Failed to extend owner lease: ", e), t.isPrimary;
            if (!t.allowTabSynchronization) throw e;
            return F("IndexedDbPersistence", "Releasing owner lease after error during lease refresh", e), 
            /* isPrimary= */ !1;
        })).then((function(e) {
            t.isPrimary !== e && t.oi.enqueueRetryable((function() {
                return t.Ii(e);
            })), t.isPrimary = e;
        }));
    }, t.prototype.gi = function(t) {
        var e = this;
        return Ya(t).get("owner").next((function(t) {
            return Dt.resolve(e.Si(t));
        }));
    }, t.prototype.bi = function(t) {
        return Ha(t).delete(this.clientId);
    }, 
    /**
     * If the garbage collection threshold has passed, prunes the
     * RemoteDocumentChanges and the ClientMetadata store based on the last update
     * time of all clients.
     */
    t.prototype.Di = function() {
        return e(this, void 0, void 0, (function() {
            var t, e, r, i, o = this;
            return n(this, (function(n) {
                switch (n.label) {
                  case 0:
                    return !this.isPrimary || this.Ci(this.Pi, 18e5) ? [ 3 /*break*/ , 2 ] : (this.Pi = Date.now(), 
                    [ 4 /*yield*/ , this.runTransaction("maybeGarbageCollectMultiClientState", "readwrite-primary", (function(t) {
                        var e = we(t, "clientMetadata");
                        return e.W().next((function(t) {
                            var n = o.vi(t, 18e5), r = t.filter((function(t) {
                                return -1 === n.indexOf(t);
                            }));
                            // Delete metadata for clients that are no longer considered active.
                                                        return Dt.forEach(r, (function(t) {
                                return e.delete(t.clientId);
                            })).next((function() {
                                return r;
                            }));
                        }));
                    })).catch((function() {
                        return [];
                    })) ]);

                  case 1:
                    // Delete potential leftover entries that may continue to mark the
                    // inactive clients as zombied in LocalStorage.
                    // Ideally we'd delete the IndexedDb and LocalStorage zombie entries for
                    // the client atomically, but we can't. So we opt to delete the IndexedDb
                    // entries first to avoid potentially reviving a zombied client.
                    if (t = n.sent(), this.di) for (e = 0, r = t; e < r.length; e++) i = r[e], this.di.removeItem(this.Fi(i.clientId));
                    n.label = 2;

                  case 2:
                    return [ 2 /*return*/ ];
                }
            }));
        }));
    }, 
    /**
     * Schedules a recurring timer to update the client metadata and to either
     * extend or acquire the primary lease if the client is eligible.
     */
    t.prototype.mi = function() {
        var t = this;
        this.hi = this.oi.enqueueAfterDelay("client_metadata_refresh" /* TimerId.ClientMetadataRefresh */ , 4e3, (function() {
            return t.Ai().then((function() {
                return t.Di();
            })).then((function() {
                return t.mi();
            }));
        }));
    }, 
    /** Checks whether `client` is the local client. */ t.prototype.Si = function(t) {
        return !!t && t.ownerId === this.clientId;
    }, 
    /**
     * Evaluate the state of all active clients and determine whether the local
     * client is or can act as the holder of the primary lease. Returns whether
     * the client is eligible for the lease, but does not actually acquire it.
     * May return 'false' even if there is no active leaseholder and another
     * (foreground) client should become leaseholder instead.
     */
    t.prototype.pi = function(t) {
        var e = this;
        return this.ai ? Dt.resolve(!0) : Ya(t).get("owner").next((function(n) {
            // A client is eligible for the primary lease if:
            // - its network is enabled and the client's tab is in the foreground.
            // - its network is enabled and no other client's tab is in the
            //   foreground.
            // - every clients network is disabled and the client's tab is in the
            //   foreground.
            // - every clients network is disabled and no other client's tab is in
            //   the foreground.
            // - the `forceOwningTab` setting was passed in.
            if (null !== n && e.Ci(n.leaseTimestampMs, 5e3) && !e.Mi(n.ownerId)) {
                if (e.Si(n) && e.networkEnabled) return !0;
                if (!e.Si(n)) {
                    if (!n.allowTabSynchronization) 
                    // Fail the `canActAsPrimary` check if the current leaseholder has
                    // not opted into multi-tab synchronization. If this happens at
                    // client startup, we reject the Promise returned by
                    // `enablePersistence()` and the user can continue to use Firestore
                    // with in-memory persistence.
                    // If this fails during a lease refresh, we will instead block the
                    // AsyncQueue from executing further operations. Note that this is
                    // acceptable since mixing & matching different `synchronizeTabs`
                    // settings is not supported.
                    // TODO(b/114226234): Remove this check when `synchronizeTabs` can
                    // no longer be turned off.
                    throw new j(K.FAILED_PRECONDITION, Qa);
                    return !1;
                }
            }
            return !(!e.networkEnabled || !e.inForeground) || Ha(t).W().next((function(t) {
                return void 0 === e.vi(t, 5e3).find((function(t) {
                    if (e.clientId !== t.clientId) {
                        var n = !e.networkEnabled && t.networkEnabled, r = !e.inForeground && t.inForeground, i = e.networkEnabled === t.networkEnabled;
                        if (n || r && i) return !0;
                    }
                    return !1;
                }));
            }));
        })).next((function(t) {
            return e.isPrimary !== t && F("IndexedDbPersistence", "Client ".concat(t ? "is" : "is not", " eligible for a primary lease.")), 
            t;
        }));
    }, t.prototype.shutdown = function() {
        return e(this, void 0, void 0, (function() {
            var t = this;
            return n(this, (function(e) {
                switch (e.label) {
                  case 0:
                    // Use `SimpleDb.runTransaction` directly to avoid failing if another tab
                    // has obtained the primary lease.
                    // The shutdown() operations are idempotent and can be called even when
                    // start() aborted (e.g. because it couldn't acquire the persistence lease).
                    return this.qr = !1, this.xi(), this.hi && (this.hi.cancel(), this.hi = null), this.Oi(), 
                    this.Ni(), [ 4 /*yield*/ , this.Ei.runTransaction("shutdown", "readwrite", [ "owner", "clientMetadata" ], (function(e) {
                        var n = new ge(e, Ut._e);
                        return t.yi(n).next((function() {
                            return t.bi(n);
                        }));
                    })) ];

                  case 1:
                    // The shutdown() operations are idempotent and can be called even when
                    // start() aborted (e.g. because it couldn't acquire the persistence lease).
                    // Use `SimpleDb.runTransaction` directly to avoid failing if another tab
                    // has obtained the primary lease.
                    return e.sent(), this.Ei.close(), 
                    // Remove the entry marking the client as zombied from LocalStorage since
                    // we successfully deleted its metadata from IndexedDb.
                    this.Li(), [ 2 /*return*/ ];
                }
            }));
        }));
    }, 
    /**
     * Returns clients that are not zombied and have an updateTime within the
     * provided threshold.
     */
    t.prototype.vi = function(t, e) {
        var n = this;
        return t.filter((function(t) {
            return n.Ci(t.updateTimeMs, e) && !n.Mi(t.clientId);
        }));
    }, 
    /**
     * Returns the IDs of the clients that are currently active. If multi-tab
     * is not supported, returns an array that only contains the local client's
     * ID.
     *
     * PORTING NOTE: This is only used for Web multi-tab.
     */
    t.prototype.Bi = function() {
        var t = this;
        return this.runTransaction("getActiveClients", "readonly", (function(e) {
            return Ha(e).W().next((function(e) {
                return t.vi(e, 18e5).map((function(t) {
                    return t.clientId;
                }));
            }));
        }));
    }, Object.defineProperty(t.prototype, "started", {
        get: function() {
            return this.qr;
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype.getMutationQueue = function(t, e) {
        return ia.lt(t, this.serializer, e, this.referenceDelegate);
    }, t.prototype.getTargetCache = function() {
        return this.Qr;
    }, t.prototype.getRemoteDocumentCache = function() {
        return this.remoteDocumentCache;
    }, t.prototype.getIndexManager = function(t) {
        return new Yo(t, this.serializer.ct.databaseId);
    }, t.prototype.getDocumentOverlayCache = function(t) {
        return Eo.lt(this.serializer, t);
    }, t.prototype.getBundleCache = function() {
        return this.$r;
    }, t.prototype.runTransaction = function(t, e, n) {
        var r = this;
        F("IndexedDbPersistence", "Starting transaction:", t);
        var i, o = "readonly" === e ? "readonly" : "readwrite", a = 
        /** Returns the object stores for the provided schema. */
        function(t) {
            return 16 === t ? ye : 15 === t ? me : 14 === t ? ve : 13 === t ? pe : 12 === t ? de : 11 === t ? fe : void U();
        }(this.ui);
        // Do all transactions as readwrite against all object stores, since we
        // are the only reader/writer.
        return this.Ei.runTransaction(t, o, a, (function(o) {
            return i = new ge(o, r.kr ? r.kr.next() : Ut._e), "readwrite-primary" === e ? r.gi(i).next((function(t) {
                return !!t || r.pi(i);
            })).next((function(e) {
                if (!e) throw V("Failed to obtain primary lease for action '".concat(t, "'.")), 
                r.isPrimary = !1, r.oi.enqueueRetryable((function() {
                    return r.Ii(!1);
                })), new j(K.FAILED_PRECONDITION, St);
                return n(i);
            })).next((function(t) {
                return r.wi(i).next((function() {
                    return t;
                }));
            })) : r.ki(i).next((function() {
                return n(i);
            }));
        })).then((function(t) {
            return i.raiseOnCommittedEvent(), t;
        }));
    }, 
    /**
     * Verifies that the current tab is the primary leaseholder or alternatively
     * that the leaseholder has opted into multi-tab synchronization.
     */
    // TODO(b/114226234): Remove this check when `synchronizeTabs` can no longer
    // be turned off.
    t.prototype.ki = function(t) {
        var e = this;
        return Ya(t).get("owner").next((function(t) {
            if (null !== t && e.Ci(t.leaseTimestampMs, 5e3) && !e.Mi(t.ownerId) && !e.Si(t) && !(e.ai || e.allowTabSynchronization && t.allowTabSynchronization)) throw new j(K.FAILED_PRECONDITION, Qa);
        }));
    }, 
    /**
     * Obtains or extends the new primary lease for the local client. This
     * method does not verify that the client is eligible for this lease.
     */
    t.prototype.wi = function(t) {
        var e = {
            ownerId: this.clientId,
            allowTabSynchronization: this.allowTabSynchronization,
            leaseTimestampMs: Date.now()
        };
        return Ya(t).put("owner", e);
    }, t.D = function() {
        return At.D();
    }, 
    /** Checks the primary lease and removes it if we are the current primary. */ t.prototype.yi = function(t) {
        var e = this, n = Ya(t);
        return n.get("owner").next((function(t) {
            return e.Si(t) ? (F("IndexedDbPersistence", "Releasing primary lease."), n.delete("owner")) : Dt.resolve();
        }));
    }, 
    /** Verifies that `updateTimeMs` is within `maxAgeMs`. */ t.prototype.Ci = function(t, e) {
        var n = Date.now();
        return !(t < n - e || t > n && (V("Detected an update time that is in the future: ".concat(t, " > ").concat(n)), 
        1));
    }, t.prototype.Ri = function() {
        var t = this;
        null !== this.document && "function" == typeof this.document.addEventListener && (this.li = function() {
            t.oi.enqueueAndForget((function() {
                return t.inForeground = "visible" === t.document.visibilityState, t.Ai();
            }));
        }, this.document.addEventListener("visibilitychange", this.li), this.inForeground = "visible" === this.document.visibilityState);
    }, t.prototype.Oi = function() {
        this.li && (this.document.removeEventListener("visibilitychange", this.li), this.li = null);
    }, 
    /**
     * Attaches a window.unload handler that will synchronously write our
     * clientId to a "zombie client id" location in LocalStorage. This can be used
     * by tabs trying to acquire the primary lease to determine that the lease
     * is no longer valid even if the timestamp is recent. This is particularly
     * important for the refresh case (so the tab correctly re-acquires the
     * primary lease). LocalStorage is used for this rather than IndexedDb because
     * it is a synchronous API and so can be used reliably from  an unload
     * handler.
     */
    t.prototype.Vi = function() {
        var t, e = this;
        "function" == typeof (null === (t = this.window) || void 0 === t ? void 0 : t.addEventListener) && (this.ci = function() {
            // Note: In theory, this should be scheduled on the AsyncQueue since it
            // accesses internal state. We execute this code directly during shutdown
            // to make sure it gets a chance to run.
            e.xi();
            var t = /(?:Version|Mobile)\/1[456]/;
            p() && (navigator.appVersion.match(t) || navigator.userAgent.match(t)) && 
            // On Safari 14, 15, and 16, we do not run any cleanup actions as it might
            // trigger a bug that prevents Safari from re-opening IndexedDB during
            // the next page load.
            // See https://bugs.webkit.org/show_bug.cgi?id=226547
            e.oi.enterRestrictedMode(/* purgeExistingTasks= */ !0), e.oi.enqueueAndForget((function() {
                return e.shutdown();
            }));
        }, this.window.addEventListener("pagehide", this.ci));
    }, t.prototype.Ni = function() {
        this.ci && (this.window.removeEventListener("pagehide", this.ci), this.ci = null);
    }, 
    /**
     * Returns whether a client is "zombied" based on its LocalStorage entry.
     * Clients become zombied when their tab closes without running all of the
     * cleanup logic in `shutdown()`.
     */
    t.prototype.Mi = function(t) {
        var e;
        try {
            var n = null !== (null === (e = this.di) || void 0 === e ? void 0 : e.getItem(this.Fi(t)));
            return F("IndexedDbPersistence", "Client '".concat(t, "' ").concat(n ? "is" : "is not", " zombied in LocalStorage")), 
            n;
        } catch (t) {
            // Gracefully handle if LocalStorage isn't working.
            return V("IndexedDbPersistence", "Failed to get zombied client id.", t), !1;
        }
    }, 
    /**
     * Record client as zombied (a client that had its tab closed). Zombied
     * clients are ignored during primary tab selection.
     */
    t.prototype.xi = function() {
        if (this.di) try {
            this.di.setItem(this.Fi(this.clientId), String(Date.now()));
        } catch (t) {
            // Gracefully handle if LocalStorage isn't available / working.
            V("Failed to set zombie client id.", t);
        }
    }, 
    /** Removes the zombied client entry if it exists. */ t.prototype.Li = function() {
        if (this.di) try {
            this.di.removeItem(this.Fi(this.clientId));
        } catch (t) {
            // Ignore
        }
    }, t.prototype.Fi = function(t) {
        return "firestore_zombie_".concat(this.persistenceKey, "_").concat(t);
    }, t;
}();

/**
 * Oldest acceptable age in milliseconds for client metadata before the client
 * is considered inactive and its associated data is garbage collected.
 */
/**
 * An IndexedDB-backed instance of Persistence. Data is stored persistently
 * across sessions.
 *
 * On Web only, the Firestore SDKs support shared access to its persistence
 * layer. This allows multiple browser tabs to read and write to IndexedDb and
 * to synchronize state even without network connectivity. Shared access is
 * currently optional and not enabled unless all clients invoke
 * `enablePersistence()` with `{synchronizeTabs:true}`.
 *
 * In multi-tab mode, if multiple clients are active at the same time, the SDK
 * will designate one client as the “primary client”. An effort is made to pick
 * a visible, network-connected and active client, and this client is
 * responsible for letting other clients know about its presence. The primary
 * client writes a unique client-generated identifier (the client ID) to
 * IndexedDb’s “owner” store every 4 seconds. If the primary client fails to
 * update this entry, another client can acquire the lease and take over as
 * primary.
 *
 * Some persistence operations in the SDK are designated as primary-client only
 * operations. This includes the acknowledgment of mutations and all updates of
 * remote documents. The effects of these operations are written to persistence
 * and then broadcast to other tabs via LocalStorage (see
 * `WebStorageSharedClientState`), which then refresh their state from
 * persistence.
 *
 * Similarly, the primary client listens to notifications sent by secondary
 * clients to discover persistence changes written by secondary clients, such as
 * the addition of new mutations and query targets.
 *
 * If multi-tab is not enabled and another tab already obtained the primary
 * lease, IndexedDbPersistence enters a failed state and all subsequent
 * operations will automatically fail.
 *
 * Additionally, there is an optimization so that when a tab is closed, the
 * primary lease is released immediately (this is especially important to make
 * sure that a refreshed tab is able to immediately re-acquire the primary
 * lease). Unfortunately, IndexedDB cannot be reliably used in window.unload
 * since it is an asynchronous API. So in addition to attempting to give up the
 * lease, the leaseholder writes its client ID to a "zombiedClient" entry in
 * LocalStorage which acts as an indicator that another tab should go ahead and
 * take the primary lease immediately regardless of the current lease timestamp.
 *
 * TODO(b/114226234): Remove `synchronizeTabs` section when multi-tab is no
 * longer optional.
 */
/**
 * Helper to get a typed SimpleDbStore for the primary client object store.
 */
function Ya(t) {
    return we(t, "owner");
}

/**
 * Helper to get a typed SimpleDbStore for the client metadata object store.
 */ function Ha(t) {
    return we(t, "clientMetadata");
}

/**
 * Generates a string used as a prefix when storing data in IndexedDB and
 * LocalStorage.
 */ function Ja(t, e) {
    // Use two different prefix formats:
    //   * firestore / persistenceKey / projectID . databaseID / ...
    //   * firestore / persistenceKey / projectID / ...
    // projectIDs are DNS-compatible names and cannot contain dots
    // so there's no danger of collisions.
    var n = t.projectId;
    return t.isDefaultDatabase || (n += "." + t.database), "firestore/" + e + "/" + n + "/"
    /**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
    /**
 * A set of changes to what documents are currently in view and out of view for
 * a given query. These changes are sent to the LocalStore by the View (via
 * the SyncEngine) and are used to pin / unpin documents as appropriate.
 */;
}

var Xa = /** @class */ function() {
    function t(t, e, n, r) {
        this.targetId = t, this.fromCache = e, this.qi = n, this.Qi = r;
    }
    return t.Ki = function(e, n) {
        for (var r = br(), i = br(), o = 0, a = n.docChanges; o < a.length; o++) {
            var u = a[o];
            switch (u.type) {
              case 0 /* ChangeType.Added */ :
                r = r.add(u.doc.key);
                break;

              case 1 /* ChangeType.Removed */ :
                i = i.add(u.doc.key);
                // do nothing
                        }
        }
        return new t(e, n.fromCache, r, i);
    }, t;
}(), Za = /** @class */ function() {
    function t() {
        /**
         * Counts the number of documents passed through during local query execution.
         */
        this._documentReadCount = 0;
    }
    return Object.defineProperty(t.prototype, "documentReadCount", {
        get: function() {
            return this._documentReadCount;
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype.incrementDocumentReadCount = function(t) {
        this._documentReadCount += t;
    }, t;
}(), $a = /** @class */ function() {
    function t() {
        this.$i = !1, this.Ui = !1, 
        /**
             * SDK only decides whether it should create index when collection size is
             * larger than this.
             */
        this.Wi = 100, this.Gi = p() ? 8 : At.v(d()) > 0 ? 6 : 4
        /** Sets the document view to query against. */;
    }
    return t.prototype.initialize = function(t, e) {
        this.zi = t, this.indexManager = e, this.$i = !0;
    }, 
    /** Returns all local documents matching the specified query. */ t.prototype.getDocumentsMatchingQuery = function(t, e, n, r) {
        var i = this, o = {
            result: null
        };
        // Stores the result from executing the query; using this object is more
        // convenient than passing the result between steps of the persistence
        // transaction and improves readability comparatively.
                return this.ji(t, e).next((function(t) {
            o.result = t;
        })).next((function() {
            if (!o.result) return i.Hi(t, e, r, n).next((function(t) {
                o.result = t;
            }));
        })).next((function() {
            if (!o.result) {
                var n = new Za;
                return i.Ji(t, e, n).next((function(r) {
                    if (o.result = r, i.Ui) return i.Yi(t, e, n, r.size);
                }));
            }
        })).next((function() {
            return o.result;
        }));
    }, t.prototype.Yi = function(t, e, n, r) {
        return n.documentReadCount < this.Wi ? (R() <= h.DEBUG && F("QueryEngine", "SDK will not create cache indexes for query:", ir(e), "since it only creates cache indexes for collection contains", "more than or equal to", this.Wi, "documents"), 
        Dt.resolve()) : (R() <= h.DEBUG && F("QueryEngine", "Query:", ir(e), "scans", n.documentReadCount, "local documents and returns", r, "documents as results."), 
        n.documentReadCount > this.Gi * r ? (R() <= h.DEBUG && F("QueryEngine", "The SDK decides to create cache indexes for query:", ir(e), "as using cache indexes may help improve performance."), 
        this.indexManager.createTargetIndexes(t, Zn(e))) : Dt.resolve());
    }, 
    /**
     * Performs an indexed query that evaluates the query based on a collection's
     * persisted index values. Returns `null` if an index is not available.
     */
    t.prototype.ji = function(t, e) {
        var n = this;
        if (Hn(e)) 
        // Queries that match all documents don't benefit from using
        // key-based lookups. It is more efficient to scan all documents in a
        // collection, rather than to perform individual lookups.
        return Dt.resolve(null);
        var r = Zn(e);
        return this.indexManager.getIndexType(t, r).next((function(i) {
            return 0 /* IndexType.NONE */ === i ? null : (null !== e.limit && 1 /* IndexType.PARTIAL */ === i && (
            // We cannot apply a limit for targets that are served using a partial
            // index. If a partial index will be used to serve the target, the
            // query may return a superset of documents that match the target
            // (e.g. if the index doesn't include all the target's filters), or
            // may return the correct set of documents in the wrong order (e.g. if
            // the index doesn't include a segment for one of the orderBys).
            // Therefore, a limit should not be applied in such cases.
            e = er(e, null, "F" /* LimitType.First */), r = Zn(e)), n.indexManager.getDocumentsMatchingTarget(t, r).next((function(i) {
                var o = br.apply(void 0, i);
                return n.zi.getDocuments(t, o).next((function(i) {
                    return n.indexManager.getMinOffset(t, r).next((function(r) {
                        var a = n.Zi(e, i);
                        return n.Xi(e, a, o, r.readTime) ? n.ji(t, er(e, null, "F" /* LimitType.First */)) : n.es(t, a, e, r);
                    }));
                }));
            })));
        }));
    }, 
    /**
     * Performs a query based on the target's persisted query mapping. Returns
     * `null` if the mapping is not available or cannot be used.
     */
    t.prototype.Hi = function(t, e, n, r) {
        var i = this;
        return Hn(e) || r.isEqual(st.min()) ? Dt.resolve(null) : this.zi.getDocuments(t, n).next((function(o) {
            var a = i.Zi(e, o);
            return i.Xi(e, a, n, r) ? Dt.resolve(null) : (R() <= h.DEBUG && F("QueryEngine", "Re-using previous result from %s to execute query: %s", r.toString(), ir(e)), 
            i.es(t, a, e, It(r, -1)).next((function(t) {
                return t;
            })));
        }));
        // Queries that have never seen a snapshot without limbo free documents
        // should also be run as a full collection scan.
        }, 
    /** Applies the query filter and sorting to the provided documents.  */ t.prototype.Zi = function(t, e) {
        // Sort the documents and re-apply the query filter since previously
        // matching documents do not necessarily still match the query.
        var n = new xe(ur(t));
        return e.forEach((function(e, r) {
            or(t, r) && (n = n.add(r));
        })), n;
    }, 
    /**
     * Determines if a limit query needs to be refilled from cache, making it
     * ineligible for index-free execution.
     *
     * @param query - The query.
     * @param sortedPreviousResults - The documents that matched the query when it
     * was last synchronized, sorted by the query's comparator.
     * @param remoteKeys - The document keys that matched the query at the last
     * snapshot.
     * @param limboFreeSnapshotVersion - The version of the snapshot when the
     * query was last synchronized.
     */
    t.prototype.Xi = function(t, e, n, r) {
        if (null === t.limit) 
        // Queries without limits do not need to be refilled.
        return !1;
        if (n.size !== e.size) 
        // The query needs to be refilled if a previously matching document no
        // longer matches.
        return !0;
        // Limit queries are not eligible for index-free query execution if there is
        // a potential that an older document from cache now sorts before a document
        // that was previously part of the limit. This, however, can only happen if
        // the document at the edge of the limit goes out of limit.
        // If a document that is not the limit boundary sorts differently,
        // the boundary of the limit itself did not change and documents from cache
        // will continue to be "rejected" by this boundary. Therefore, we can ignore
        // any modifications that don't affect the last document.
                var i = "F" /* LimitType.First */ === t.limitType ? e.last() : e.first();
        return !!i && (i.hasPendingWrites || i.version.compareTo(r) > 0);
    }, t.prototype.Ji = function(t, e, n) {
        return R() <= h.DEBUG && F("QueryEngine", "Using full collection scan to execute query:", ir(e)), 
        this.zi.getDocumentsMatchingQuery(t, e, Et.min(), n);
    }, 
    /**
     * Combines the results from an indexed execution with the remaining documents
     * that have not yet been indexed.
     */
    t.prototype.es = function(t, e, n, r) {
        // Retrieve all results for documents that were updated since the offset.
        return this.zi.getDocumentsMatchingQuery(t, n, r).next((function(t) {
            // Merge with existing results
            return e.forEach((function(e) {
                t = t.insert(e.key, e);
            })), t;
        }));
    }, t;
}(), tu = /** @class */ function() {
    function t(
    /** Manages our in-memory or durable persistence. */
    t, e, n, r) {
        this.persistence = t, this.ts = e, this.serializer = r, 
        /**
             * Maps a targetID to data about its target.
             *
             * PORTING NOTE: We are using an immutable data structure on Web to make re-runs
             * of `applyRemoteEvent()` idempotent.
             */
        this.ns = new Ee(it), 
        /** Maps a target to its targetID. */
        // TODO(wuandy): Evaluate if TargetId can be part of Target.
        this.rs = new cr((function(t) {
            return Un(t);
        }), Bn), 
        /**
             * A per collection group index of the last read time processed by
             * `getNewDocumentChanges()`.
             *
             * PORTING NOTE: This is only used for multi-tab synchronization.
             */
        this.ss = new Map, this.os = t.getRemoteDocumentCache(), this.Qr = t.getTargetCache(), 
        this.$r = t.getBundleCache(), this._s(n);
    }
    return t.prototype._s = function(t) {
        // TODO(indexing): Add spec tests that test these components change after a
        // user change
        this.documentOverlayCache = this.persistence.getDocumentOverlayCache(t), this.indexManager = this.persistence.getIndexManager(t), 
        this.mutationQueue = this.persistence.getMutationQueue(t, this.indexManager), this.localDocuments = new ka(this.os, this.mutationQueue, this.documentOverlayCache, this.indexManager), 
        this.os.setIndexManager(this.indexManager), this.ts.initialize(this.localDocuments, this.indexManager);
    }, t.prototype.collectGarbage = function(t) {
        var e = this;
        return this.persistence.runTransaction("Collect garbage", "readwrite-primary", (function(n) {
            return t.collect(n, e.ns);
        }));
    }, t;
}();

/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A tracker to keep a record of important details during database local query
 * execution.
 */ function eu(
/** Manages our in-memory or durable persistence. */
t, e, n, r) {
    return new tu(t, e, n, r);
}

/**
 * Tells the LocalStore that the currently authenticated user has changed.
 *
 * In response the local store switches the mutation queue to the new user and
 * returns any resulting document changes.
 */
// PORTING NOTE: Android and iOS only return the documents affected by the
// change.
function nu(t, r) {
    return e(this, void 0, void 0, (function() {
        var e;
        return n(this, (function(n) {
            switch (n.label) {
              case 0:
                return [ 4 /*yield*/ , (e = G(t)).persistence.runTransaction("Handle user change", "readonly", (function(t) {
                    // Swap out the mutation queue, grabbing the pending mutation batches
                    // before and after.
                    var n;
                    return e.mutationQueue.getAllMutationBatches(t).next((function(i) {
                        return n = i, e._s(r), e.mutationQueue.getAllMutationBatches(t);
                    })).next((function(r) {
                        for (var i = [], o = [], a = br(), u = 0, s = n
                        // Union the old/new changed keys.
                        ; u < s.length; u++) {
                            var c = s[u];
                            i.push(c.batchId);
                            for (var l = 0, h = c.mutations; l < h.length; l++) {
                                var f = h[l];
                                a = a.add(f.key);
                            }
                        }
                        for (var d = 0, p = r; d < p.length; d++) {
                            var v = p[d];
                            o.push(v.batchId);
                            for (var m = 0, y = v.mutations; m < y.length; m++) {
                                var g = y[m];
                                a = a.add(g.key);
                            }
                        }
                        // Return the set of all (potentially) changed documents and the list
                        // of mutation batch IDs that were affected by change.
                                                return e.localDocuments.getDocuments(t, a).next((function(t) {
                            return {
                                us: t,
                                removedBatchIds: i,
                                addedBatchIds: o
                            };
                        }));
                    }));
                })) ];

              case 1:
                return [ 2 /*return*/ , n.sent() ];
            }
        }));
    }));
}

/* Accepts locally generated Mutations and commit them to storage. */
/**
 * Acknowledges the given batch.
 *
 * On the happy path when a batch is acknowledged, the local store will
 *
 *  + remove the batch from the mutation queue;
 *  + apply the changes to the remote document cache;
 *  + recalculate the latency compensated view implied by those changes (there
 *    may be mutations in the queue that affect the documents but haven't been
 *    acknowledged yet); and
 *  + give the changed documents back the sync engine
 *
 * @returns The resulting (modified) documents.
 */ function ru(t, e) {
    var n = G(t);
    return n.persistence.runTransaction("Acknowledge batch", "readwrite-primary", (function(t) {
        var r = e.batch.keys(), i = n.os.newChangeBuffer({
            trackRemovals: !0
        });
        return function(t, e, n, r) {
            var i = n.batch, o = i.keys(), a = Dt.resolve();
            return o.forEach((function(t) {
                a = a.next((function() {
                    return r.getEntry(e, t);
                })).next((function(e) {
                    var o = n.docVersions.get(t);
                    B(null !== o), e.version.compareTo(o) < 0 && (i.applyToRemoteDocument(e, n), e.isValidDocument() && (
                    // We use the commitVersion as the readTime rather than the
                    // document's updateTime since the updateTime is not advanced
                    // for updates that do not modify the underlying document.
                    e.setReadTime(n.commitVersion), r.addEntry(e)));
                }));
            })), a.next((function() {
                return t.mutationQueue.removeMutationBatch(e, i);
            }));
        }(n, t, e, i).next((function() {
            return i.apply(t);
        })).next((function() {
            return n.mutationQueue.performConsistencyCheck(t);
        })).next((function() {
            return n.documentOverlayCache.removeOverlaysForBatchId(t, r, e.batch.batchId);
        })).next((function() {
            return n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(t, function(t) {
                for (var e = br(), n = 0; n < t.mutationResults.length; ++n) t.mutationResults[n].transformResults.length > 0 && (e = e.add(t.batch.mutations[n].key));
                return e;
            }(e));
        })).next((function() {
            return n.localDocuments.getDocuments(t, r);
        }));
    }));
}

/**
 * Returns the last consistent snapshot processed (used by the RemoteStore to
 * determine whether to buffer incoming snapshots from the backend).
 */ function iu(t) {
    var e = G(t);
    return e.persistence.runTransaction("Get last remote snapshot version", "readonly", (function(t) {
        return e.Qr.getLastRemoteSnapshotVersion(t);
    }));
}

/**
 * Updates the "ground-state" (remote) documents. We assume that the remote
 * event reflects any write batches that have been acknowledged or rejected
 * (i.e. we do not re-apply local mutations to updates from this event).
 *
 * LocalDocuments are re-calculated if there are remaining mutations in the
 * queue.
 */ function ou(t, e) {
    var n = G(t), r = e.snapshotVersion, i = n.ns;
    return n.persistence.runTransaction("Apply remote event", "readwrite-primary", (function(t) {
        var o = n.os.newChangeBuffer({
            trackRemovals: !0
        });
        // Reset newTargetDataByTargetMap in case this transaction gets re-run.
                i = n.ns;
        var a = [];
        e.targetChanges.forEach((function(o, u) {
            var s = i.get(u);
            if (s) {
                // Only update the remote keys if the target is still active. This
                // ensures that we can persist the updated target data along with
                // the updated assignment.
                a.push(n.Qr.removeMatchingKeys(t, o.removedDocuments, u).next((function() {
                    return n.Qr.addMatchingKeys(t, o.addedDocuments, u);
                })));
                var c = s.withSequenceNumber(t.currentSequenceNumber);
                null !== e.targetMismatches.get(u) ? c = c.withResumeToken(Pe.EMPTY_BYTE_STRING, st.min()).withLastLimboFreeSnapshotVersion(st.min()) : o.resumeToken.approximateByteSize() > 0 && (c = c.withResumeToken(o.resumeToken, r)), 
                i = i.insert(u, c), 
                // Update the target data if there are target changes (or if
                // sufficient time has passed since the last update).
                /**
     * Returns true if the newTargetData should be persisted during an update of
     * an active target. TargetData should always be persisted when a target is
     * being released and should not call this function.
     *
     * While the target is active, TargetData updates can be omitted when nothing
     * about the target has changed except metadata like the resume token or
     * snapshot version. Occasionally it's worth the extra write to prevent these
     * values from getting too stale after a crash, but this doesn't have to be
     * too frequent.
     */
                function(t, e, n) {
                    // Always persist target data if we don't already have a resume token.
                    return 0 === t.resumeToken.approximateByteSize() || (
                    // Don't allow resume token changes to be buffered indefinitely. This
                    // allows us to be reasonably up-to-date after a crash and avoids needing
                    // to loop over all active queries on shutdown. Especially in the browser
                    // we may not get time to do anything interesting while the current tab is
                    // closing.
                    e.snapshotVersion.toMicroseconds() - t.snapshotVersion.toMicroseconds() >= 3e8 || n.addedDocuments.size + n.modifiedDocuments.size + n.removedDocuments.size > 0);
                }(s, c, o) && a.push(n.Qr.updateTargetData(t, c));
            }
        }));
        var u = hr(), s = br();
        // HACK: The only reason we allow a null snapshot version is so that we
        // can synthesize remote events when we get permission denied errors while
        // trying to resolve the state of a locally cached document that is in
        // limbo.
                if (e.documentUpdates.forEach((function(r) {
            e.resolvedLimboDocuments.has(r) && a.push(n.persistence.referenceDelegate.updateLimboDocument(t, r));
        })), 
        // Each loop iteration only affects its "own" doc, so it's safe to get all
        // the remote documents in advance in a single call.
        a.push(au(t, o, e.documentUpdates).next((function(t) {
            u = t.cs, s = t.ls;
        }))), !r.isEqual(st.min())) {
            var c = n.Qr.getLastRemoteSnapshotVersion(t).next((function(e) {
                return n.Qr.setTargetsMetadata(t, t.currentSequenceNumber, r);
            }));
            a.push(c);
        }
        return Dt.waitFor(a).next((function() {
            return o.apply(t);
        })).next((function() {
            return n.localDocuments.getLocalViewOfDocuments(t, u, s);
        })).next((function() {
            return u;
        }));
    })).then((function(t) {
        return n.ns = i, t;
    }));
}

/**
 * Populates document change buffer with documents from backend or a bundle.
 * Returns the document changes resulting from applying those documents, and
 * also a set of documents whose existence state are changed as a result.
 *
 * @param txn - Transaction to use to read existing documents from storage.
 * @param documentBuffer - Document buffer to collect the resulted changes to be
 *        applied to storage.
 * @param documents - Documents to be applied.
 */ function au(t, e, n) {
    var r = br(), i = br();
    return n.forEach((function(t) {
        return r = r.add(t);
    })), e.getEntries(t, r).next((function(t) {
        var r = hr();
        return n.forEach((function(n, o) {
            var a = t.get(n);
            // Check if see if there is a existence state change for this document.
                        o.isFoundDocument() !== a.isFoundDocument() && (i = i.add(n)), 
            // Note: The order of the steps below is important, since we want
            // to ensure that rejected limbo resolutions (which fabricate
            // NoDocuments with SnapshotVersion.min()) never add documents to
            // cache.
            o.isNoDocument() && o.version.isEqual(st.min()) ? (
            // NoDocuments with SnapshotVersion.min() are used in manufactured
            // events. We remove these documents from cache since we lost
            // access.
            e.removeEntry(n, o.readTime), r = r.insert(n, o)) : !a.isValidDocument() || o.version.compareTo(a.version) > 0 || 0 === o.version.compareTo(a.version) && a.hasPendingWrites ? (e.addEntry(o), 
            r = r.insert(n, o)) : F("LocalStore", "Ignoring outdated watch update for ", n, ". Current version:", a.version, " Watch version:", o.version);
        })), {
            cs: r,
            ls: i
        };
    }))
    /**
 * Gets the mutation batch after the passed in batchId in the mutation queue
 * or null if empty.
 * @param afterBatchId - If provided, the batch to search after.
 * @returns The next mutation or null if there wasn't one.
 */;
}

function uu(t, e) {
    var n = G(t);
    return n.persistence.runTransaction("Get next mutation batch", "readonly", (function(t) {
        return void 0 === e && (e = -1), n.mutationQueue.getNextMutationBatchAfterBatchId(t, e);
    }));
}

/**
 * Reads the current value of a Document with a given key or null if not
 * found - used for testing.
 */
/**
 * Assigns the given target an internal ID so that its results can be pinned so
 * they don't get GC'd. A target must be allocated in the local store before
 * the store can be used to manage its view.
 *
 * Allocating an already allocated `Target` will return the existing `TargetData`
 * for that `Target`.
 */ function su(t, e) {
    var n = G(t);
    return n.persistence.runTransaction("Allocate target", "readwrite", (function(t) {
        var r;
        return n.Qr.getTargetData(t, e).next((function(i) {
            return i ? (
            // This target has been listened to previously, so reuse the
            // previous targetID.
            // TODO(mcg): freshen last accessed date?
            r = i, Dt.resolve(r)) : n.Qr.allocateTargetId(t).next((function(i) {
                return r = new ao(e, i, "TargetPurposeListen" /* TargetPurpose.Listen */ , t.currentSequenceNumber), 
                n.Qr.addTargetData(t, r).next((function() {
                    return r;
                }));
            }));
        }));
    })).then((function(t) {
        // If Multi-Tab is enabled, the existing target data may be newer than
        // the in-memory data
        var r = n.ns.get(t.targetId);
        return (null === r || t.snapshotVersion.compareTo(r.snapshotVersion) > 0) && (n.ns = n.ns.insert(t.targetId, t), 
        n.rs.set(e, t.targetId)), t;
    }));
}

/**
 * Returns the TargetData as seen by the LocalStore, including updates that may
 * have not yet been persisted to the TargetCache.
 */
// Visible for testing.
/**
 * Unpins all the documents associated with the given target. If
 * `keepPersistedTargetData` is set to false and Eager GC enabled, the method
 * directly removes the associated target data from the target cache.
 *
 * Releasing a non-existing `Target` is a no-op.
 */
// PORTING NOTE: `keepPersistedTargetData` is multi-tab only.
function cu(t, r, i) {
    return e(this, void 0, void 0, (function() {
        var e, o, a, u;
        return n(this, (function(n) {
            switch (n.label) {
              case 0:
                e = G(t), o = e.ns.get(r), a = i ? "readwrite" : "readwrite-primary", n.label = 1;

              case 1:
                return n.trys.push([ 1, 4, , 5 ]), i ? [ 3 /*break*/ , 3 ] : [ 4 /*yield*/ , e.persistence.runTransaction("Release target", a, (function(t) {
                    return e.persistence.referenceDelegate.removeTarget(t, o);
                })) ];

              case 2:
                n.sent(), n.label = 3;

              case 3:
                return [ 3 /*break*/ , 5 ];

              case 4:
                if (!Ot(u = n.sent())) throw u;
                // All `releaseTarget` does is record the final metadata state for the
                // target, but we've been recording this periodically during target
                // activity. If we lose this write this could cause a very slight
                // difference in the order of target deletion during GC, but we
                // don't define exact LRU semantics so this is acceptable.
                                return F("LocalStore", "Failed to update sequence numbers for target ".concat(r, ": ").concat(u)), 
                [ 3 /*break*/ , 5 ];

              case 5:
                return e.ns = e.ns.remove(r), e.rs.delete(o.target), [ 2 /*return*/ ];
            }
        }));
    }));
}

/**
 * Runs the specified query against the local store and returns the results,
 * potentially taking advantage of query data from previous executions (such
 * as the set of remote keys).
 *
 * @param usePreviousResults - Whether results from previous executions can
 * be used to optimize this query execution.
 */ function lu(t, e, n) {
    var r = G(t), i = st.min(), o = br();
    return r.persistence.runTransaction("Execute query", "readwrite", (// Use readwrite instead of readonly so indexes can be created
    // Use readwrite instead of readonly so indexes can be created
    function(// Use readwrite instead of readonly so indexes can be created
    t) {
        return function(t, e, n) {
            var r = G(t), i = r.rs.get(n);
            return void 0 !== i ? Dt.resolve(r.ns.get(i)) : r.Qr.getTargetData(e, n);
        }(r, t, Zn(e)).next((function(e) {
            if (e) return i = e.lastLimboFreeSnapshotVersion, r.Qr.getMatchingKeysForTargetId(t, e.targetId).next((function(t) {
                o = t;
            }));
        })).next((function() {
            return r.ts.getDocumentsMatchingQuery(t, e, n ? i : st.min(), n ? o : br());
        })).next((function(t) {
            return du(r, ar(e), t), {
                documents: t,
                hs: o
            };
        }));
    }));
}

// PORTING NOTE: Multi-Tab only.
function hu(t, e) {
    var n = G(t), r = G(n.Qr), i = n.ns.get(e);
    return i ? Promise.resolve(i.target) : n.persistence.runTransaction("Get target data", "readonly", (function(t) {
        return r._t(t, e).next((function(t) {
            return t ? t.target : null;
        }));
    }));
}

/**
 * Returns the set of documents that have been updated since the last call.
 * If this is the first call, returns the set of changes since client
 * initialization. Further invocations will return document that have changed
 * since the prior call.
 */
// PORTING NOTE: Multi-Tab only.
function fu(t, e) {
    var n = G(t), r = n.ss.get(e) || st.min();
    // Get the current maximum read time for the collection. This should always
    // exist, but to reduce the chance for regressions we default to
    // SnapshotVersion.Min()
    // TODO(indexing): Consider removing the default value.
        return n.persistence.runTransaction("Get new document changes", "readonly", (function(t) {
        return n.os.getAllFromCollectionGroup(t, e, It(r, -1), 
        /* limit= */ Number.MAX_SAFE_INTEGER);
    })).then((function(t) {
        return du(n, e, t), t;
    }));
}

/** Sets the collection group's maximum read time from the given documents. */
// PORTING NOTE: Multi-Tab only.
function du(t, e, n) {
    var r = t.ss.get(e) || st.min();
    n.forEach((function(t, e) {
        e.readTime.compareTo(r) > 0 && (r = e.readTime);
    })), t.ss.set(e, r);
}

/**
 * Creates a new target using the given bundle name, which will be used to
 * hold the keys of all documents from the bundle in query-document mappings.
 * This ensures that the loaded documents do not get garbage collected
 * right away.
 */
/**
 * Applies the documents from a bundle to the "ground-state" (remote)
 * documents.
 *
 * LocalDocuments are re-calculated if there are remaining mutations in the
 * queue.
 */ function pu(t, r, i, o) {
    return e(this, void 0, void 0, (function() {
        var e, a, u, s, c, l, h, f, d, p;
        return n(this, (function(n) {
            switch (n.label) {
              case 0:
                for (e = G(t), a = br(), u = hr(), s = 0, c = i; s < c.length; s++) l = c[s], h = r.Ps(l.metadata.name), 
                l.document && (a = a.add(h)), (f = r.Is(l)).setReadTime(r.Ts(l.metadata.readTime)), 
                u = u.insert(h, f);
                return d = e.os.newChangeBuffer({
                    trackRemovals: !0
                }), [ 4 /*yield*/ , su(e, function(t) {
                    // It is OK that the path used for the query is not valid, because this will
                    // not be read and queried.
                    return Zn(Yn(lt.fromString("__bundle__/docs/".concat(t))));
                }(o)) ];

              case 1:
                // Allocates a target to hold all document keys from the bundle, such that
                // they will not get garbage collected right away.
                return p = n.sent(), [ 2 /*return*/ , e.persistence.runTransaction("Apply bundle documents", "readwrite", (function(t) {
                    return au(t, d, u).next((function(e) {
                        return d.apply(t), e;
                    })).next((function(n) {
                        return e.Qr.removeMatchingKeysForTargetId(t, p.targetId).next((function() {
                            return e.Qr.addMatchingKeys(t, a, p.targetId);
                        })).next((function() {
                            return e.localDocuments.getLocalViewOfDocuments(t, n.cs, n.ls);
                        })).next((function() {
                            return n.cs;
                        }));
                    }));
                })) ];
            }
        }));
    }));
}

/**
 * Returns a promise of a boolean to indicate if the given bundle has already
 * been loaded and the create time is newer than the current loading bundle.
 */
/**
 * Saves the given `NamedQuery` to local persistence.
 */ function vu(t, r, i) {
    return void 0 === i && (i = br()), e(this, void 0, void 0, (function() {
        var e, o;
        return n(this, (function(n) {
            switch (n.label) {
              case 0:
                return [ 4 /*yield*/ , su(t, Zn(mo(r.bundledQuery))) ];

              case 1:
                return e = n.sent(), [ 2 /*return*/ , (o = G(t)).persistence.runTransaction("Save named query", "readwrite", (function(t) {
                    var n = Ri(r.readTime);
                    // Simply save the query itself if it is older than what the SDK already
                    // has.
                                        if (e.snapshotVersion.compareTo(n) >= 0) return o.$r.saveNamedQuery(t, r);
                    // Update existing target data because the query from the bundle is newer.
                                        var a = e.withResumeToken(Pe.EMPTY_BYTE_STRING, n);
                    return o.ns = o.ns.insert(a.targetId, a), o.Qr.updateTargetData(t, a).next((function() {
                        return o.Qr.removeMatchingKeysForTargetId(t, e.targetId);
                    })).next((function() {
                        return o.Qr.addMatchingKeys(t, i, e.targetId);
                    })).next((function() {
                        return o.$r.saveNamedQuery(t, r);
                    }));
                })) ];
            }
        }));
    }));
}

/** Assembles the key for a client state in WebStorage */ function mu(t, e) {
    return "firestore_clients_".concat(t, "_").concat(e);
}

// The format of the WebStorage key that stores the mutation state is:
//     firestore_mutations_<persistence_prefix>_<batch_id>
//     (for unauthenticated users)
// or: firestore_mutations_<persistence_prefix>_<batch_id>_<user_uid>
// 'user_uid' is last to avoid needing to escape '_' characters that it might
// contain.
/** Assembles the key for a mutation batch in WebStorage */ function yu(t, e, n) {
    var r = "firestore_mutations_".concat(t, "_").concat(n);
    return e.isAuthenticated() && (r += "_".concat(e.uid)), r;
}

// The format of the WebStorage key that stores a query target's metadata is:
//     firestore_targets_<persistence_prefix>_<target_id>
/** Assembles the key for a query state in WebStorage */ function gu(t, e) {
    return "firestore_targets_".concat(t, "_").concat(e);
}

// The WebStorage prefix that stores the primary tab's online state. The
// format of the key is:
//     firestore_online_state_<persistence_prefix>
/**
 * Holds the state of a mutation batch, including its user ID, batch ID and
 * whether the batch is 'pending', 'acknowledged' or 'rejected'.
 */
// Visible for testing
var wu = /** @class */ function() {
    function t(t, e, n, r) {
        this.user = t, this.batchId = e, this.state = n, this.error = r
        /**
     * Parses a MutationMetadata from its JSON representation in WebStorage.
     * Logs a warning and returns null if the format of the data is not valid.
     */;
    }
    return t.Es = function(e, n, r) {
        var i, o = JSON.parse(r), a = "object" == typeof o && -1 !== [ "pending", "acknowledged", "rejected" ].indexOf(o.state) && (void 0 === o.error || "object" == typeof o.error);
        return a && o.error && ((a = "string" == typeof o.error.message && "string" == typeof o.error.code) && (i = new j(o.error.code, o.error.message))), 
        a ? new t(e, n, o.state, i) : (V("SharedClientState", "Failed to parse mutation state for ID '".concat(n, "': ").concat(r)), 
        null);
    }, t.prototype.ds = function() {
        var t = {
            state: this.state,
            updateTimeMs: Date.now()
        };
        return this.error && (t.error = {
            code: this.error.code,
            message: this.error.message
        }), JSON.stringify(t);
    }, t;
}(), bu = /** @class */ function() {
    function t(t, e, n) {
        this.targetId = t, this.state = e, this.error = n
        /**
     * Parses a QueryTargetMetadata from its JSON representation in WebStorage.
     * Logs a warning and returns null if the format of the data is not valid.
     */;
    }
    return t.Es = function(e, n) {
        var r, i = JSON.parse(n), o = "object" == typeof i && -1 !== [ "not-current", "current", "rejected" ].indexOf(i.state) && (void 0 === i.error || "object" == typeof i.error);
        return o && i.error && ((o = "string" == typeof i.error.message && "string" == typeof i.error.code) && (r = new j(i.error.code, i.error.message))), 
        o ? new t(e, i.state, r) : (V("SharedClientState", "Failed to parse target state for ID '".concat(e, "': ").concat(n)), 
        null);
    }, t.prototype.ds = function() {
        var t = {
            state: this.state,
            updateTimeMs: Date.now()
        };
        return this.error && (t.error = {
            code: this.error.code,
            message: this.error.message
        }), JSON.stringify(t);
    }, t;
}(), Iu = /** @class */ function() {
    function t(t, e) {
        this.clientId = t, this.activeTargetIds = e
        /**
     * Parses a RemoteClientState from the JSON representation in WebStorage.
     * Logs a warning and returns null if the format of the data is not valid.
     */;
    }
    return t.Es = function(e, n) {
        for (var r = JSON.parse(n), i = "object" == typeof r && r.activeTargetIds instanceof Array, o = _r(), a = 0; i && a < r.activeTargetIds.length; ++a) i = Gt(r.activeTargetIds[a]), 
        o = o.add(r.activeTargetIds[a]);
        return i ? new t(e, o) : (V("SharedClientState", "Failed to parse client data for instance '".concat(e, "': ").concat(n)), 
        null);
    }, t;
}(), _u = /** @class */ function() {
    function t(t, e) {
        this.clientId = t, this.onlineState = e
        /**
     * Parses a SharedOnlineState from its JSON representation in WebStorage.
     * Logs a warning and returns null if the format of the data is not valid.
     */;
    }
    return t.Es = function(e) {
        var n = JSON.parse(e);
        return "object" == typeof n && -1 !== [ "Unknown", "Online", "Offline" ].indexOf(n.onlineState) && "string" == typeof n.clientId ? new t(n.clientId, n.onlineState) : (V("SharedClientState", "Failed to parse online state: ".concat(e)), 
        null);
    }, t;
}(), Eu = /** @class */ function() {
    function t() {
        this.activeTargetIds = _r();
    }
    return t.prototype.As = function(t) {
        this.activeTargetIds = this.activeTargetIds.add(t);
    }, t.prototype.Rs = function(t) {
        this.activeTargetIds = this.activeTargetIds.delete(t);
    }, 
    /**
     * Converts this entry into a JSON-encoded format we can use for WebStorage.
     * Does not encode `clientId` as it is part of the key in WebStorage.
     */
    t.prototype.ds = function() {
        var t = {
            activeTargetIds: this.activeTargetIds.toArray(),
            updateTimeMs: Date.now()
        };
        return JSON.stringify(t);
    }, t;
}(), Tu = /** @class */ function() {
    function t(t, e, n, r, i) {
        this.window = t, this.oi = e, this.persistenceKey = n, this.Vs = r, this.syncEngine = null, 
        this.onlineStateHandler = null, this.sequenceNumberHandler = null, this.fs = this.gs.bind(this), 
        this.ps = new Ee(it), this.started = !1, 
        /**
             * Captures WebStorage events that occur before `start()` is called. These
             * events are replayed once `WebStorageSharedClientState` is started.
             */
        this.ys = [];
        // Escape the special characters mentioned here:
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
        var o = n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        this.storage = this.window.localStorage, this.currentUser = i, this.ws = mu(this.persistenceKey, this.Vs), 
        this.Ss = 
        /** Assembles the key for the current sequence number. */
        function(t) {
            return "firestore_sequence_number_".concat(t);
        }(this.persistenceKey), this.ps = this.ps.insert(this.Vs, new Eu), this.bs = new RegExp("^firestore_clients_".concat(o, "_([^_]*)$")), 
        this.Ds = new RegExp("^firestore_mutations_".concat(o, "_(\\d+)(?:_(.*))?$")), this.Cs = new RegExp("^firestore_targets_".concat(o, "_(\\d+)$")), 
        this.vs = 
        /** Assembles the key for the online state of the primary tab. */
        function(t) {
            return "firestore_online_state_".concat(t);
        }(this.persistenceKey), this.Fs = function(t) {
            return "firestore_bundle_loaded_v2_".concat(t);
        }(this.persistenceKey), 
        // Rather than adding the storage observer during start(), we add the
        // storage observer during initialization. This ensures that we collect
        // events before other components populate their initial state (during their
        // respective start() calls). Otherwise, we might for example miss a
        // mutation that is added after LocalStore's start() processed the existing
        // mutations but before we observe WebStorage events.
        this.window.addEventListener("storage", this.fs);
    }
    /** Returns 'true' if WebStorage is available in the current environment. */    return t.D = function(t) {
        return !(!t || !t.localStorage);
    }, t.prototype.start = function() {
        return e(this, void 0, void 0, (function() {
            var t, e, r, i, o, a, u, s, c, l, h, f = this;
            return n(this, (function(n) {
                switch (n.label) {
                  case 0:
                    return [ 4 /*yield*/ , this.syncEngine.Bi() ];

                  case 1:
                    for (t = n.sent(), e = 0, r = t; e < r.length; e++) (i = r[e]) !== this.Vs && (o = this.getItem(mu(this.persistenceKey, i))) && (a = Iu.Es(i, o)) && (this.ps = this.ps.insert(a.clientId, a));
                    for (this.Ms(), (u = this.storage.getItem(this.vs)) && (s = this.xs(u)) && this.Os(s), 
                    c = 0, l = this.ys; c < l.length; c++) h = l[c], this.gs(h);
                    return this.ys = [], 
                    // Register a window unload hook to remove the client metadata entry from
                    // WebStorage even if `shutdown()` was not called.
                    this.window.addEventListener("pagehide", (function() {
                        return f.shutdown();
                    })), this.started = !0, [ 2 /*return*/ ];
                }
            }));
        }));
    }, t.prototype.writeSequenceNumber = function(t) {
        this.setItem(this.Ss, JSON.stringify(t));
    }, t.prototype.getAllActiveQueryTargets = function() {
        return this.Ns(this.ps);
    }, t.prototype.isActiveQueryTarget = function(t) {
        var e = !1;
        return this.ps.forEach((function(n, r) {
            r.activeTargetIds.has(t) && (e = !0);
        })), e;
    }, t.prototype.addPendingMutation = function(t) {
        this.Ls(t, "pending");
    }, t.prototype.updateMutationState = function(t, e, n) {
        this.Ls(t, e, n), 
        // Once a final mutation result is observed by other clients, they no longer
        // access the mutation's metadata entry. Since WebStorage replays events
        // in order, it is safe to delete the entry right after updating it.
        this.Bs(t);
    }, t.prototype.addLocalQueryTarget = function(t) {
        var e = "not-current";
        // Lookup an existing query state if the target ID was already registered
        // by another tab
                if (this.isActiveQueryTarget(t)) {
            var n = this.storage.getItem(gu(this.persistenceKey, t));
            if (n) {
                var r = bu.Es(t, n);
                r && (e = r.state);
            }
        }
        return this.ks.As(t), this.Ms(), e;
    }, t.prototype.removeLocalQueryTarget = function(t) {
        this.ks.Rs(t), this.Ms();
    }, t.prototype.isLocalQueryTarget = function(t) {
        return this.ks.activeTargetIds.has(t);
    }, t.prototype.clearQueryState = function(t) {
        this.removeItem(gu(this.persistenceKey, t));
    }, t.prototype.updateQueryState = function(t, e, n) {
        this.qs(t, e, n);
    }, t.prototype.handleUserChange = function(t, e, n) {
        var r = this;
        e.forEach((function(t) {
            r.Bs(t);
        })), this.currentUser = t, n.forEach((function(t) {
            r.addPendingMutation(t);
        }));
    }, t.prototype.setOnlineState = function(t) {
        this.Qs(t);
    }, t.prototype.notifyBundleLoaded = function(t) {
        this.Ks(t);
    }, t.prototype.shutdown = function() {
        this.started && (this.window.removeEventListener("storage", this.fs), this.removeItem(this.ws), 
        this.started = !1);
    }, t.prototype.getItem = function(t) {
        var e = this.storage.getItem(t);
        return F("SharedClientState", "READ", t, e), e;
    }, t.prototype.setItem = function(t, e) {
        F("SharedClientState", "SET", t, e), this.storage.setItem(t, e);
    }, t.prototype.removeItem = function(t) {
        F("SharedClientState", "REMOVE", t), this.storage.removeItem(t);
    }, t.prototype.gs = function(t) {
        var r = this, i = t;
        // Note: The function is typed to take Event to be interface-compatible with
        // `Window.addEventListener`.
                if (i.storageArea === this.storage) {
            if (F("SharedClientState", "EVENT", i.key, i.newValue), i.key === this.ws) return void V("Received WebStorage notification for local change. Another client might have garbage-collected our state");
            this.oi.enqueueRetryable((function() {
                return e(r, void 0, void 0, (function() {
                    var t, e, r, o, a, u, s, c = this;
                    return n(this, (function(n) {
                        switch (n.label) {
                          case 0:
                            return this.started ? null === i.key ? [ 3 /*break*/ , 7 ] : this.bs.test(i.key) ? null == i.newValue ? (t = this.$s(i.key), 
                            [ 2 /*return*/ , this.Us(t, null) ]) : (e = this.Ws(i.key, i.newValue)) ? [ 2 /*return*/ , this.Us(e.clientId, e) ] : [ 3 /*break*/ , 7 ] : [ 3 /*break*/ , 1 ] : [ 3 /*break*/ , 8 ];

                          case 1:
                            return this.Ds.test(i.key) ? null !== i.newValue && (r = this.Gs(i.key, i.newValue)) ? [ 2 /*return*/ , this.zs(r) ] : [ 3 /*break*/ , 7 ] : [ 3 /*break*/ , 2 ];

                          case 2:
                            return this.Cs.test(i.key) ? null !== i.newValue && (o = this.js(i.key, i.newValue)) ? [ 2 /*return*/ , this.Hs(o) ] : [ 3 /*break*/ , 7 ] : [ 3 /*break*/ , 3 ];

                          case 3:
                            return i.key !== this.vs ? [ 3 /*break*/ , 4 ] : null !== i.newValue && (a = this.xs(i.newValue)) ? [ 2 /*return*/ , this.Os(a) ] : [ 3 /*break*/ , 7 ];

                          case 4:
                            return i.key !== this.Ss ? [ 3 /*break*/ , 5 ] : (u = function(t) {
                                var e = Ut._e;
                                if (null != t) try {
                                    var n = JSON.parse(t);
                                    B("number" == typeof n), e = n;
                                } catch (t) {
                                    V("SharedClientState", "Failed to read sequence number from WebStorage", t);
                                }
                                return e;
                            }(i.newValue), u !== Ut._e && this.sequenceNumberHandler(u), [ 3 /*break*/ , 7 ]);

                          case 5:
                            return i.key !== this.Fs ? [ 3 /*break*/ , 7 ] : (s = this.Js(i.newValue), [ 4 /*yield*/ , Promise.all(s.map((function(t) {
                                return c.syncEngine.Ys(t);
                            }))) ]);

                          case 6:
                            n.sent(), n.label = 7;

                          case 7:
                            return [ 3 /*break*/ , 9 ];

                          case 8:
                            this.ys.push(i), n.label = 9;

                          case 9:
                            return [ 2 /*return*/ ];
                        }
                    }));
                }));
            }));
        }
    }, Object.defineProperty(t.prototype, "ks", {
        get: function() {
            return this.ps.get(this.Vs);
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype.Ms = function() {
        this.setItem(this.ws, this.ks.ds());
    }, t.prototype.Ls = function(t, e, n) {
        var r = new wu(this.currentUser, t, e, n), i = yu(this.persistenceKey, this.currentUser, t);
        this.setItem(i, r.ds());
    }, t.prototype.Bs = function(t) {
        var e = yu(this.persistenceKey, this.currentUser, t);
        this.removeItem(e);
    }, t.prototype.Qs = function(t) {
        var e = {
            clientId: this.Vs,
            onlineState: t
        };
        this.storage.setItem(this.vs, JSON.stringify(e));
    }, t.prototype.qs = function(t, e, n) {
        var r = gu(this.persistenceKey, t), i = new bu(t, e, n);
        this.setItem(r, i.ds());
    }, t.prototype.Ks = function(t) {
        var e = JSON.stringify(Array.from(t));
        this.setItem(this.Fs, e);
    }, 
    /**
     * Parses a client state key in WebStorage. Returns null if the key does not
     * match the expected key format.
     */
    t.prototype.$s = function(t) {
        var e = this.bs.exec(t);
        return e ? e[1] : null;
    }, 
    /**
     * Parses a client state in WebStorage. Returns 'null' if the value could not
     * be parsed.
     */
    t.prototype.Ws = function(t, e) {
        var n = this.$s(t);
        return Iu.Es(n, e);
    }, 
    /**
     * Parses a mutation batch state in WebStorage. Returns 'null' if the value
     * could not be parsed.
     */
    t.prototype.Gs = function(t, e) {
        var n = this.Ds.exec(t), r = Number(n[1]), i = void 0 !== n[2] ? n[2] : null;
        return wu.Es(new k(i), r, e);
    }, 
    /**
     * Parses a query target state from WebStorage. Returns 'null' if the value
     * could not be parsed.
     */
    t.prototype.js = function(t, e) {
        var n = this.Cs.exec(t), r = Number(n[1]);
        return bu.Es(r, e);
    }, 
    /**
     * Parses an online state from WebStorage. Returns 'null' if the value
     * could not be parsed.
     */
    t.prototype.xs = function(t) {
        return _u.Es(t);
    }, t.prototype.Js = function(t) {
        return JSON.parse(t);
    }, t.prototype.zs = function(t) {
        return e(this, void 0, void 0, (function() {
            return n(this, (function(e) {
                return t.user.uid === this.currentUser.uid ? [ 2 /*return*/ , this.syncEngine.Zs(t.batchId, t.state, t.error) ] : (F("SharedClientState", "Ignoring mutation for non-active user ".concat(t.user.uid)), 
                [ 2 /*return*/ ]);
            }));
        }));
    }, t.prototype.Hs = function(t) {
        return this.syncEngine.Xs(t.targetId, t.state, t.error);
    }, t.prototype.Us = function(t, e) {
        var n = this, r = e ? this.ps.insert(t, e) : this.ps.remove(t), i = this.Ns(this.ps), o = this.Ns(r), a = [], u = [];
        return o.forEach((function(t) {
            i.has(t) || a.push(t);
        })), i.forEach((function(t) {
            o.has(t) || u.push(t);
        })), this.syncEngine.eo(a, u).then((function() {
            n.ps = r;
        }));
    }, t.prototype.Os = function(t) {
        // We check whether the client that wrote this online state is still active
        // by comparing its client ID to the list of clients kept active in
        // IndexedDb. If a client does not update their IndexedDb client state
        // within 5 seconds, it is considered inactive and we don't emit an online
        // state event.
        this.ps.get(t.clientId) && this.onlineStateHandler(t.onlineState);
    }, t.prototype.Ns = function(t) {
        var e = _r();
        return t.forEach((function(t, n) {
            e = e.unionWith(n.activeTargetIds);
        })), e;
    }, t;
}(), Su = /** @class */ function() {
    function t() {
        this.no = new Eu, this.ro = {}, this.onlineStateHandler = null, this.sequenceNumberHandler = null;
    }
    return t.prototype.addPendingMutation = function(t) {
        // No op.
    }, t.prototype.updateMutationState = function(t, e, n) {
        // No op.
    }, t.prototype.addLocalQueryTarget = function(t) {
        return this.no.As(t), this.ro[t] || "not-current";
    }, t.prototype.updateQueryState = function(t, e, n) {
        this.ro[t] = e;
    }, t.prototype.removeLocalQueryTarget = function(t) {
        this.no.Rs(t);
    }, t.prototype.isLocalQueryTarget = function(t) {
        return this.no.activeTargetIds.has(t);
    }, t.prototype.clearQueryState = function(t) {
        delete this.ro[t];
    }, t.prototype.getAllActiveQueryTargets = function() {
        return this.no.activeTargetIds;
    }, t.prototype.isActiveQueryTarget = function(t) {
        return this.no.activeTargetIds.has(t);
    }, t.prototype.start = function() {
        return this.no = new Eu, Promise.resolve();
    }, t.prototype.handleUserChange = function(t, e, n) {
        // No op.
    }, t.prototype.setOnlineState = function(t) {
        // No op.
    }, t.prototype.shutdown = function() {}, t.prototype.writeSequenceNumber = function(t) {}, 
    t.prototype.notifyBundleLoaded = function(t) {
        // No op.
    }, t;
}(), xu = /** @class */ function() {
    function t() {}
    return t.prototype.io = function(t) {
        // No-op.
    }, t.prototype.shutdown = function() {
        // No-op.
    }, t;
}(), Cu = /** @class */ function() {
    function t() {
        var t = this;
        this.so = function() {
            return t.oo();
        }, this._o = function() {
            return t.ao();
        }, this.uo = [], this.co();
    }
    return t.prototype.io = function(t) {
        this.uo.push(t);
    }, t.prototype.shutdown = function() {
        window.removeEventListener("online", this.so), window.removeEventListener("offline", this._o);
    }, t.prototype.co = function() {
        window.addEventListener("online", this.so), window.addEventListener("offline", this._o);
    }, t.prototype.oo = function() {
        F("ConnectivityMonitor", "Network connectivity changed: AVAILABLE");
        for (var t = 0, e = this.uo; t < e.length; t++) {
            (0, e[t])(0 /* NetworkStatus.AVAILABLE */);
        }
    }, t.prototype.ao = function() {
        F("ConnectivityMonitor", "Network connectivity changed: UNAVAILABLE");
        for (var t = 0, e = this.uo; t < e.length; t++) {
            (0, e[t])(1 /* NetworkStatus.UNAVAILABLE */);
        }
    }, 
    // TODO(chenbrian): Consider passing in window either into this component or
    // here for testing via FakeWindow.
    /** Checks that all used attributes of window are available. */
    t.D = function() {
        return "undefined" != typeof window && void 0 !== window.addEventListener && void 0 !== window.removeEventListener;
    }, t;
}(), Du = null;

/**
 * Holds the state of a query target, including its target ID and whether the
 * target is 'not-current', 'current' or 'rejected'.
 */
// Visible for testing
/**
 * Generates and returns an initial value for `lastUniqueDebugId`.
 *
 * The returned value is randomly selected from a range of integers that are
 * represented as 8 hexadecimal digits. This means that (within reason) any
 * numbers generated by incrementing the returned number by 1 will also be
 * represented by 8 hexadecimal digits. This leads to all "IDs" having the same
 * length when converted to a hexadecimal string, making reading logs containing
 * these IDs easier to follow. And since the return value is randomly selected
 * it will help to differentiate between logs from different executions.
 */
/**
 * Generates and returns a unique ID as a hexadecimal string.
 *
 * The returned ID is intended to be used in debug logging messages to help
 * correlate log messages that may be spatially separated in the logs, but
 * logically related. For example, a network connection could include the same
 * "debug ID" string in all of its log messages to help trace a specific
 * connection over time.
 *
 * @return the 10-character generated ID (e.g. "0xa1b2c3d4").
 */
function Nu() {
    return null === Du ? Du = 268435456 + Math.round(2147483648 * Math.random()) : Du++, 
    "0x" + Du.toString(16)
    /**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */;
}

var Au = {
    BatchGetDocuments: "batchGet",
    Commit: "commit",
    RunQuery: "runQuery",
    RunAggregationQuery: "runAggregationQuery"
}, ku = /** @class */ function() {
    function t(t) {
        this.lo = t.lo, this.ho = t.ho;
    }
    return t.prototype.Po = function(t) {
        this.Io = t;
    }, t.prototype.To = function(t) {
        this.Eo = t;
    }, t.prototype.onMessage = function(t) {
        this.Ao = t;
    }, t.prototype.close = function() {
        this.ho();
    }, t.prototype.send = function(t) {
        this.lo(t);
    }, t.prototype.Ro = function() {
        this.Io();
    }, t.prototype.Vo = function(t) {
        this.Eo(t);
    }, t.prototype.mo = function(t) {
        this.Ao(t);
    }, t;
}(), Pu = "WebChannelConnection", Ou = /** @class */ function(e) {
    function n(t) {
        var n = this;
        return (n = e.call(this, t) || this).forceLongPolling = t.forceLongPolling, n.autoDetectLongPolling = t.autoDetectLongPolling, 
        n.useFetchStreams = t.useFetchStreams, n.longPollingOptions = t.longPollingOptions, 
        n;
    }
    /**
     * Base class for all Rest-based connections to the backend (WebChannel and
     * HTTP).
     */
    return t(n, e), n.prototype.Co = function(t, e, n, r) {
        var i = Nu();
        return new Promise((function(o, a) {
            var u = new I;
            u.setWithCredentials(!0), u.listenOnce(_.COMPLETE, (function() {
                try {
                    switch (u.getLastErrorCode()) {
                      case E.NO_ERROR:
                        var e = u.getResponseJson();
                        F(Pu, "XHR for RPC '".concat(t, "' ").concat(i, " received:"), JSON.stringify(e)), 
                        o(e);
                        break;

                      case E.TIMEOUT:
                        F(Pu, "RPC '".concat(t, "' ").concat(i, " timed out")), a(new j(K.DEADLINE_EXCEEDED, "Request time out"));
                        break;

                      case E.HTTP_ERROR:
                        var n = u.getStatus();
                        if (F(Pu, "RPC '".concat(t, "' ").concat(i, " failed with status:"), n, "response text:", u.getResponseText()), 
                        n > 0) {
                            var r = u.getResponseJson();
                            Array.isArray(r) && (r = r[0]);
                            var s = null == r ? void 0 : r.error;
                            if (s && s.status && s.message) {
                                var c = function(t) {
                                    var e = t.toLowerCase().replace(/_/g, "-");
                                    return Object.values(K).indexOf(e) >= 0 ? e : K.UNKNOWN;
                                }(s.status);
                                a(new j(c, s.message));
                            } else a(new j(K.UNKNOWN, "Server responded with status " + u.getStatus()));
                        } else 
                        // If we received an HTTP_ERROR but there's no status code,
                        // it's most probably a connection issue
                        a(new j(K.UNAVAILABLE, "Connection failed."));
                        break;

                      default:
                        U();
                    }
                } finally {
                    F(Pu, "RPC '".concat(t, "' ").concat(i, " completed."));
                }
            }));
            var s = JSON.stringify(r);
            F(Pu, "RPC '".concat(t, "' ").concat(i, " sending request:"), r), u.send(e, "POST", s, n, 15);
        }));
    }, n.prototype.Fo = function(t, e, n) {
        var r = Nu(), i = [ this.fo, "/", "google.firestore.v1.Firestore", "/", t, "/channel" ], o = T(), a = S(), u = {
            // Required for backend stickiness, routing behavior is based on this
            // parameter.
            httpSessionIdParam: "gsessionid",
            initMessageHeaders: {},
            messageUrlParams: {
                // This param is used to improve routing and project isolation by the
                // backend and must be included in every request.
                database: "projects/".concat(this.databaseId.projectId, "/databases/").concat(this.databaseId.database)
            },
            sendRawJson: !0,
            supportsCrossDomainXhr: !0,
            internalChannelParams: {
                // Override the default timeout (randomized between 10-20 seconds) since
                // a large write batch on a slow internet connection may take a long
                // time to send to the backend. Rather than have WebChannel impose a
                // tight timeout which could lead to infinite timeouts and retries, we
                // set it very large (5-10 minutes) and rely on the browser's builtin
                // timeouts to kick in if the request isn't working.
                forwardChannelRequestTimeoutMs: 6e5
            },
            forceLongPolling: this.forceLongPolling,
            detectBufferingProxy: this.autoDetectLongPolling
        }, s = this.longPollingOptions.timeoutSeconds;
        void 0 !== s && (u.longPollingTimeout = Math.round(1e3 * s)), this.useFetchStreams && (u.useFetchStreams = !0), 
        this.Do(u.initMessageHeaders, e, n), 
        // Sending the custom headers we just added to request.initMessageHeaders
        // (Authorization, etc.) will trigger the browser to make a CORS preflight
        // request because the XHR will no longer meet the criteria for a "simple"
        // CORS request:
        // https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#Simple_requests
        // Therefore to avoid the CORS preflight request (an extra network
        // roundtrip), we use the encodeInitMessageHeaders option to specify that
        // the headers should instead be encoded in the request's POST payload,
        // which is recognized by the webchannel backend.
        u.encodeInitMessageHeaders = !0;
        var c = i.join("");
        F(Pu, "Creating RPC '".concat(t, "' stream ").concat(r, ": ").concat(c), u);
        var l = o.createWebChannel(c, u), h = !1, f = !1, d = new ku({
            lo: function(e) {
                f ? F(Pu, "Not sending because RPC '".concat(t, "' stream ").concat(r, " is closed:"), e) : (h || (F(Pu, "Opening RPC '".concat(t, "' stream ").concat(r, " transport.")), 
                l.open(), h = !0), F(Pu, "RPC '".concat(t, "' stream ").concat(r, " sending:"), e), 
                l.send(e));
            },
            ho: function() {
                return l.close();
            }
        }), p = function(t, e, n) {
            // TODO(dimond): closure typing seems broken because WebChannel does
            // not implement goog.events.Listenable
            t.listen(e, (function(t) {
                try {
                    n(t);
                } catch (t) {
                    setTimeout((function() {
                        throw t;
                    }), 0);
                }
            }));
        };
        // WebChannel supports sending the first message with the handshake - saving
        // a network round trip. However, it will have to call send in the same
        // JS event loop as open. In order to enforce this, we delay actually
        // opening the WebChannel until send is called. Whether we have called
        // open is tracked with this variable.
                // Closure events are guarded and exceptions are swallowed, so catch any
        // exception and rethrow using a setTimeout so they become visible again.
        // Note that eventually this function could go away if we are confident
        // enough the code is exception free.
        return p(l, x.EventType.OPEN, (function() {
            f || F(Pu, "RPC '".concat(t, "' stream ").concat(r, " transport opened."));
        })), p(l, x.EventType.CLOSE, (function() {
            f || (f = !0, F(Pu, "RPC '".concat(t, "' stream ").concat(r, " transport closed")), 
            d.Vo());
        })), p(l, x.EventType.ERROR, (function(e) {
            f || (f = !0, L(Pu, "RPC '".concat(t, "' stream ").concat(r, " transport errored:"), e), 
            d.Vo(new j(K.UNAVAILABLE, "The operation could not be completed")));
        })), p(l, x.EventType.MESSAGE, (function(e) {
            var n;
            if (!f) {
                var i = e.data[0];
                B(!!i);
                // TODO(b/35143891): There is a bug in One Platform that caused errors
                // (and only errors) to be wrapped in an extra array. To be forward
                // compatible with the bug we need to check either condition. The latter
                // can be removed once the fix has been rolled out.
                // Use any because msgData.error is not typed.
                var o = i, a = o.error || (null === (n = o[0]) || void 0 === n ? void 0 : n.error);
                if (a) {
                    F(Pu, "RPC '".concat(t, "' stream ").concat(r, " received error:"), a);
                    // error.status will be a string like 'OK' or 'NOT_FOUND'.
                    var u = a.status, s = 
                    /**
 * Maps an error Code from a GRPC status identifier like 'NOT_FOUND'.
 *
 * @returns The Code equivalent to the given status string or undefined if
 *     there is no match.
 */
                    function(t) {
                        // lookup by string
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        var e = $r[t];
                        if (void 0 !== e) return ci(e);
                    }(u), c = a.message;
                    void 0 === s && (s = K.INTERNAL, c = "Unknown error status: " + u + " with message " + a.message), 
                    // Mark closed so no further events are propagated
                    f = !0, d.Vo(new j(s, c)), l.close();
                } else F(Pu, "RPC '".concat(t, "' stream ").concat(r, " received:"), i), d.mo(i);
            }
        })), p(a, C.STAT_EVENT, (function(e) {
            e.stat === D.PROXY ? F(Pu, "RPC '".concat(t, "' stream ").concat(r, " detected buffering proxy")) : e.stat === D.NOPROXY && F(Pu, "RPC '".concat(t, "' stream ").concat(r, " detected no buffering proxy"));
        })), setTimeout((function() {
            // Technically we could/should wait for the WebChannel opened event,
            // but because we want to send the first message with the WebChannel
            // handshake we pretend the channel opened here (asynchronously), and
            // then delay the actual open until the first message is sent.
            d.Ro();
        }), 0), d;
    }, n;
}(/** @class */ function() {
    function t(t) {
        this.databaseInfo = t, this.databaseId = t.databaseId;
        var e = t.ssl ? "https" : "http", n = encodeURIComponent(this.databaseId.projectId), r = encodeURIComponent(this.databaseId.database);
        this.fo = e + "://" + t.host, this.po = "projects/".concat(n, "/databases/").concat(r), 
        this.yo = "(default)" === this.databaseId.database ? "project_id=".concat(n) : "project_id=".concat(n, "&database_id=").concat(r);
    }
    return Object.defineProperty(t.prototype, "wo", {
        get: function() {
            // Both `invokeRPC()` and `invokeStreamingRPC()` use their `path` arguments to determine
            // where to run the query, and expect the `request` to NOT specify the "path".
            return !1;
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype.So = function(t, e, n, r, i) {
        var o = Nu(), a = this.bo(t, e.toUriEncodedString());
        F("RestConnection", "Sending RPC '".concat(t, "' ").concat(o, ":"), a, n);
        var u = {
            "google-cloud-resource-prefix": this.po,
            "x-goog-request-params": this.yo
        };
        return this.Do(u, r, i), this.Co(t, a, u, n).then((function(e) {
            return F("RestConnection", "Received RPC '".concat(t, "' ").concat(o, ": "), e), 
            e;
        }), (function(e) {
            throw L("RestConnection", "RPC '".concat(t, "' ").concat(o, " failed with error: "), e, "url: ", a, "request:", n), 
            e;
        }));
    }, t.prototype.vo = function(t, e, n, r, i, o) {
        // The REST API automatically aggregates all of the streamed results, so we
        // can just use the normal invoke() method.
        return this.So(t, e, n, r, i);
    }, 
    /**
     * Modifies the headers for a request, adding any authorization token if
     * present and any additional headers for the request.
     */
    t.prototype.Do = function(t, e, n) {
        t["X-Goog-Api-Client"] = "gl-js/ fire/" + P, 
        // Content-Type: text/plain will avoid preflight requests which might
        // mess with CORS and redirects by proxies. If we add custom headers
        // we will need to change this code to potentially use the $httpOverwrite
        // parameter supported by ESF to avoid triggering preflight requests.
        t["Content-Type"] = "text/plain", this.databaseInfo.appId && (t["X-Firebase-GMPID"] = this.databaseInfo.appId), 
        e && e.headers.forEach((function(e, n) {
            return t[n] = e;
        })), n && n.headers.forEach((function(e, n) {
            return t[n] = e;
        }));
    }, t.prototype.bo = function(t, e) {
        var n = Au[t];
        return "".concat(this.fo, "/v1/").concat(e, ":").concat(n);
    }, 
    /**
     * Closes and cleans up any resources associated with the connection. This
     * implementation is a no-op because there are no resources associated
     * with the RestConnection that need to be cleaned up.
     */
    t.prototype.terminate = function() {
        // No-op
    }, t;
}());

/**
 * Maps RPC names to the corresponding REST endpoint name.
 *
 * We use array notation to avoid mangling.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Provides a simple helper class that implements the Stream interface to
 * bridge to other implementations that are streams but do not implement the
 * interface. The stream callbacks are invoked with the callOn... methods.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/** Initializes the WebChannelConnection for the browser. */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/** The Platform's 'window' implementation or null if not available. */
function Ru() {
    // `window` is not always available, e.g. in ReactNative and WebWorkers.
    // eslint-disable-next-line no-restricted-globals
    return "undefined" != typeof window ? window : null;
}

/** The Platform's 'document' implementation or null if not available. */ function Mu() {
    // `document` is not always available, e.g. in ReactNative and WebWorkers.
    // eslint-disable-next-line no-restricted-globals
    return "undefined" != typeof document ? document : null;
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Fu(t) {
    return new Ni(t, /* useProto3Json= */ !0);
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A helper for running delayed tasks following an exponential backoff curve
 * between attempts.
 *
 * Each delay is made up of a "base" delay which follows the exponential
 * backoff curve, and a +/- 50% "jitter" that is calculated and added to the
 * base delay. This prevents clients from accidentally synchronizing their
 * delays causing spikes of load to the backend.
 */ var Vu = /** @class */ function() {
    function t(
    /**
     * The AsyncQueue to run backoff operations on.
     */
    t, 
    /**
     * The ID to use when scheduling backoff operations on the AsyncQueue.
     */
    e, 
    /**
     * The initial delay (used as the base delay on the first retry attempt).
     * Note that jitter will still be applied, so the actual delay could be as
     * little as 0.5*initialDelayMs.
     */
    n
    /**
     * The multiplier to use to determine the extended base delay after each
     * attempt.
     */ , r
    /**
     * The maximum base delay after which no further backoff is performed.
     * Note that jitter will still be applied, so the actual delay could be as
     * much as 1.5*maxDelayMs.
     */ , i) {
        void 0 === n && (n = 1e3), void 0 === r && (r = 1.5), void 0 === i && (i = 6e4), 
        this.oi = t, this.timerId = e, this.Mo = n, this.xo = r, this.Oo = i, this.No = 0, 
        this.Lo = null, 
        /** The last backoff attempt, as epoch milliseconds. */
        this.Bo = Date.now(), this.reset();
    }
    /**
     * Resets the backoff delay.
     *
     * The very next backoffAndWait() will have no delay. If it is called again
     * (i.e. due to an error), initialDelayMs (plus jitter) will be used, and
     * subsequent ones will increase according to the backoffFactor.
     */    return t.prototype.reset = function() {
        this.No = 0;
    }, 
    /**
     * Resets the backoff delay to the maximum delay (e.g. for use after a
     * RESOURCE_EXHAUSTED error).
     */
    t.prototype.ko = function() {
        this.No = this.Oo;
    }, 
    /**
     * Returns a promise that resolves after currentDelayMs, and increases the
     * delay for any subsequent attempts. If there was a pending backoff operation
     * already, it will be canceled.
     */
    t.prototype.qo = function(t) {
        var e = this;
        // Cancel any pending backoff operation.
                this.cancel();
        // First schedule using the current base (which may be 0 and should be
        // honored as such).
        var n = Math.floor(this.No + this.Qo()), r = Math.max(0, Date.now() - this.Bo), i = Math.max(0, n - r);
        // Guard against lastAttemptTime being in the future due to a clock change.
                i > 0 && F("ExponentialBackoff", "Backing off for ".concat(i, " ms (base delay: ").concat(this.No, " ms, delay with jitter: ").concat(n, " ms, last attempt: ").concat(r, " ms ago)")), 
        this.Lo = this.oi.enqueueAfterDelay(this.timerId, i, (function() {
            return e.Bo = Date.now(), t();
        })), 
        // Apply backoff factor to determine next delay and ensure it is within
        // bounds.
        this.No *= this.xo, this.No < this.Mo && (this.No = this.Mo), this.No > this.Oo && (this.No = this.Oo);
    }, t.prototype.Ko = function() {
        null !== this.Lo && (this.Lo.skipDelay(), this.Lo = null);
    }, t.prototype.cancel = function() {
        null !== this.Lo && (this.Lo.cancel(), this.Lo = null);
    }, 
    /** Returns a random value in the range [-currentBaseMs/2, currentBaseMs/2] */ t.prototype.Qo = function() {
        return (Math.random() - .5) * this.No;
    }, t;
}(), Lu = /** @class */ function() {
    function t(t, e, n, r, i, o, a, u) {
        this.oi = t, this.$o = n, this.Uo = r, this.connection = i, this.authCredentialsProvider = o, 
        this.appCheckCredentialsProvider = a, this.listener = u, this.state = 0 /* PersistentStreamState.Initial */ , 
        /**
             * A close count that's incremented every time the stream is closed; used by
             * getCloseGuardedDispatcher() to invalidate callbacks that happen after
             * close.
             */
        this.Wo = 0, this.Go = null, this.zo = null, this.stream = null, this.jo = new Vu(t, e)
        /**
     * Returns true if start() has been called and no error has occurred. True
     * indicates the stream is open or in the process of opening (which
     * encompasses respecting backoff, getting auth tokens, and starting the
     * actual RPC). Use isOpen() to determine if the stream is open and ready for
     * outbound requests.
     */;
    }
    return t.prototype.Ho = function() {
        return 1 /* PersistentStreamState.Starting */ === this.state || 5 /* PersistentStreamState.Backoff */ === this.state || this.Jo();
    }, 
    /**
     * Returns true if the underlying RPC is open (the onOpen() listener has been
     * called) and the stream is ready for outbound requests.
     */
    t.prototype.Jo = function() {
        return 2 /* PersistentStreamState.Open */ === this.state || 3 /* PersistentStreamState.Healthy */ === this.state;
    }, 
    /**
     * Starts the RPC. Only allowed if isStarted() returns false. The stream is
     * not immediately ready for use: onOpen() will be invoked when the RPC is
     * ready for outbound requests, at which point isOpen() will return true.
     *
     * When start returns, isStarted() will return true.
     */
    t.prototype.start = function() {
        4 /* PersistentStreamState.Error */ !== this.state ? this.auth() : this.Yo();
    }, 
    /**
     * Stops the RPC. This call is idempotent and allowed regardless of the
     * current isStarted() state.
     *
     * When stop returns, isStarted() and isOpen() will both return false.
     */
    t.prototype.stop = function() {
        return e(this, void 0, void 0, (function() {
            return n(this, (function(t) {
                switch (t.label) {
                  case 0:
                    return this.Ho() ? [ 4 /*yield*/ , this.close(0 /* PersistentStreamState.Initial */) ] : [ 3 /*break*/ , 2 ];

                  case 1:
                    t.sent(), t.label = 2;

                  case 2:
                    return [ 2 /*return*/ ];
                }
            }));
        }));
    }, 
    /**
     * After an error the stream will usually back off on the next attempt to
     * start it. If the error warrants an immediate restart of the stream, the
     * sender can use this to indicate that the receiver should not back off.
     *
     * Each error will call the onClose() listener. That function can decide to
     * inhibit backoff if required.
     */
    t.prototype.Zo = function() {
        this.state = 0 /* PersistentStreamState.Initial */ , this.jo.reset();
    }, 
    /**
     * Marks this stream as idle. If no further actions are performed on the
     * stream for one minute, the stream will automatically close itself and
     * notify the stream's onClose() handler with Status.OK. The stream will then
     * be in a !isStarted() state, requiring the caller to start the stream again
     * before further use.
     *
     * Only streams that are in state 'Open' can be marked idle, as all other
     * states imply pending network operations.
     */
    t.prototype.Xo = function() {
        var t = this;
        // Starts the idle time if we are in state 'Open' and are not yet already
        // running a timer (in which case the previous idle timeout still applies).
                this.Jo() && null === this.Go && (this.Go = this.oi.enqueueAfterDelay(this.$o, 6e4, (function() {
            return t.e_();
        })));
    }, 
    /** Sends a message to the underlying stream. */ t.prototype.t_ = function(t) {
        this.n_(), this.stream.send(t);
    }, 
    /** Called by the idle timer when the stream should close due to inactivity. */ t.prototype.e_ = function() {
        return e(this, void 0, void 0, (function() {
            return n(this, (function(t) {
                return this.Jo() ? [ 2 /*return*/ , this.close(0 /* PersistentStreamState.Initial */) ] : [ 2 /*return*/ ];
            }));
        }));
    }, 
    /** Marks the stream as active again. */ t.prototype.n_ = function() {
        this.Go && (this.Go.cancel(), this.Go = null);
    }, 
    /** Cancels the health check delayed operation. */ t.prototype.r_ = function() {
        this.zo && (this.zo.cancel(), this.zo = null);
    }, 
    /**
     * Closes the stream and cleans up as necessary:
     *
     * * closes the underlying GRPC stream;
     * * calls the onClose handler with the given 'error';
     * * sets internal stream state to 'finalState';
     * * adjusts the backoff timer based on the error
     *
     * A new stream can be opened by calling start().
     *
     * @param finalState - the intended state of the stream after closing.
     * @param error - the error the connection was closed with.
     */
    t.prototype.close = function(t, r) {
        return e(this, void 0, void 0, (function() {
            return n(this, (function(e) {
                switch (e.label) {
                  case 0:
                    // Notify the listener that the stream closed.
                    // Cancel any outstanding timers (they're guaranteed not to execute).
                    return this.n_(), this.r_(), this.jo.cancel(), 
                    // Invalidates any stream-related callbacks (e.g. from auth or the
                    // underlying stream), guaranteeing they won't execute.
                    this.Wo++, 4 /* PersistentStreamState.Error */ !== t ? 
                    // If this is an intentional close ensure we don't delay our next connection attempt.
                    this.jo.reset() : r && r.code === K.RESOURCE_EXHAUSTED ? (
                    // Log the error. (Probably either 'quota exceeded' or 'max queue length reached'.)
                    V(r.toString()), V("Using maximum backoff delay to prevent overloading the backend."), 
                    this.jo.ko()) : r && r.code === K.UNAUTHENTICATED && 3 /* PersistentStreamState.Healthy */ !== this.state && (
                    // "unauthenticated" error means the token was rejected. This should rarely
                    // happen since both Auth and AppCheck ensure a sufficient TTL when we
                    // request a token. If a user manually resets their system clock this can
                    // fail, however. In this case, we should get a Code.UNAUTHENTICATED error
                    // before we received the first message and we need to invalidate the token
                    // to ensure that we fetch a new token.
                    this.authCredentialsProvider.invalidateToken(), this.appCheckCredentialsProvider.invalidateToken()), 
                    // Clean up the underlying stream because we are no longer interested in events.
                    null !== this.stream && (this.i_(), this.stream.close(), this.stream = null), 
                    // This state must be assigned before calling onClose() to allow the callback to
                    // inhibit backoff or otherwise manipulate the state in its non-started state.
                    this.state = t, [ 4 /*yield*/ , this.listener.To(r) ];

                  case 1:
                    // Cancel any outstanding timers (they're guaranteed not to execute).
                    // Notify the listener that the stream closed.
                    return e.sent(), [ 2 /*return*/ ];
                }
            }));
        }));
    }, 
    /**
     * Can be overridden to perform additional cleanup before the stream is closed.
     * Calling super.tearDown() is not required.
     */
    t.prototype.i_ = function() {}, t.prototype.auth = function() {
        var t = this;
        this.state = 1 /* PersistentStreamState.Starting */;
        var e = this.s_(this.Wo), n = this.Wo;
        // TODO(mikelehen): Just use dispatchIfNotClosed, but see TODO below.
                Promise.all([ this.authCredentialsProvider.getToken(), this.appCheckCredentialsProvider.getToken() ]).then((function(e) {
            var r = e[0], i = e[1];
            // Stream can be stopped while waiting for authentication.
            // TODO(mikelehen): We really should just use dispatchIfNotClosed
            // and let this dispatch onto the queue, but that opened a spec test can
            // of worms that I don't want to deal with in this PR.
                        t.Wo === n && 
            // Normally we'd have to schedule the callback on the AsyncQueue.
            // However, the following calls are safe to be called outside the
            // AsyncQueue since they don't chain asynchronous calls
            t.o_(r, i);
        }), (function(n) {
            e((function() {
                var e = new j(K.UNKNOWN, "Fetching auth token failed: " + n.message);
                return t.__(e);
            }));
        }));
    }, t.prototype.o_ = function(t, e) {
        var n = this, r = this.s_(this.Wo);
        this.stream = this.a_(t, e), this.stream.Po((function() {
            r((function() {
                return n.state = 2 /* PersistentStreamState.Open */ , n.zo = n.oi.enqueueAfterDelay(n.Uo, 1e4, (function() {
                    return n.Jo() && (n.state = 3 /* PersistentStreamState.Healthy */), Promise.resolve();
                })), n.listener.Po();
            }));
        })), this.stream.To((function(t) {
            r((function() {
                return n.__(t);
            }));
        })), this.stream.onMessage((function(t) {
            r((function() {
                return n.onMessage(t);
            }));
        }));
    }, t.prototype.Yo = function() {
        var t = this;
        this.state = 5 /* PersistentStreamState.Backoff */ , this.jo.qo((function() {
            return e(t, void 0, void 0, (function() {
                return n(this, (function(t) {
                    return this.state = 0 /* PersistentStreamState.Initial */ , this.start(), [ 2 /*return*/ ];
                }));
            }));
        }));
    }, 
    // Visible for tests
    t.prototype.__ = function(t) {
        // In theory the stream could close cleanly, however, in our current model
        // we never expect this to happen because if we stop a stream ourselves,
        // this callback will never be called. To prevent cases where we retry
        // without a backoff accidentally, we set the stream to error in all cases.
        return F("PersistentStream", "close with error: ".concat(t)), this.stream = null, 
        this.close(4 /* PersistentStreamState.Error */ , t);
    }, 
    /**
     * Returns a "dispatcher" function that dispatches operations onto the
     * AsyncQueue but only runs them if closeCount remains unchanged. This allows
     * us to turn auth / stream callbacks into no-ops if the stream is closed /
     * re-opened, etc.
     */
    t.prototype.s_ = function(t) {
        var e = this;
        return function(n) {
            e.oi.enqueueAndForget((function() {
                return e.Wo === t ? n() : (F("PersistentStream", "stream callback skipped by getCloseGuardedDispatcher."), 
                Promise.resolve());
            }));
        };
    }, t;
}(), qu = /** @class */ function(e) {
    function n(t, n, r, i, o, a) {
        var u = this;
        return (u = e.call(this, t, "listen_stream_connection_backoff" /* TimerId.ListenStreamConnectionBackoff */ , "listen_stream_idle" /* TimerId.ListenStreamIdle */ , "health_check_timeout" /* TimerId.HealthCheckTimeout */ , n, r, i, a) || this).serializer = o, 
        u;
    }
    return t(n, e), n.prototype.a_ = function(t, e) {
        return this.connection.Fo("Listen", t, e);
    }, n.prototype.onMessage = function(t) {
        // A successful response means the stream is healthy
        this.jo.reset();
        var e = function(t, e) {
            var n;
            if ("targetChange" in e) {
                e.targetChange;
                // proto3 default value is unset in JSON (undefined), so use 'NO_CHANGE'
                // if unset
                var r = function(t) {
                    return "NO_CHANGE" === t ? 0 /* WatchTargetChangeState.NoChange */ : "ADD" === t ? 1 /* WatchTargetChangeState.Added */ : "REMOVE" === t ? 2 /* WatchTargetChangeState.Removed */ : "CURRENT" === t ? 3 /* WatchTargetChangeState.Current */ : "RESET" === t ? 4 /* WatchTargetChangeState.Reset */ : U();
                }(e.targetChange.targetChangeType || "NO_CHANGE"), i = e.targetChange.targetIds || [], o = function(t, e) {
                    return t.useProto3Json ? (B(void 0 === e || "string" == typeof e), Pe.fromBase64String(e || "")) : (B(void 0 === e || 
                    // Check if the value is an instance of both Buffer and Uint8Array,
                    // despite the fact that Buffer extends Uint8Array. In some
                    // environments, such as jsdom, the prototype chain of Buffer
                    // does not indicate that it extends Uint8Array.
                    e instanceof Buffer || e instanceof Uint8Array), Pe.fromUint8Array(e || new Uint8Array));
                }(t, e.targetChange.resumeToken), a = e.targetChange.cause, u = a && function(t) {
                    var e = void 0 === t.code ? K.UNKNOWN : ci(t.code);
                    return new j(e, t.message || "");
                }(a);
                n = new Ii(r, i, o, u || null);
            } else if ("documentChange" in e) {
                e.documentChange;
                var s = e.documentChange;
                s.document, s.document.name, s.document.updateTime;
                var c = qi(t, s.document.name), l = Ri(s.document.updateTime), h = s.document.createTime ? Ri(s.document.createTime) : st.min(), f = new hn({
                    mapValue: {
                        fields: s.document.fields
                    }
                }), d = dn.newFoundDocument(c, l, h, f), p = s.targetIds || [], v = s.removedTargetIds || [];
                n = new wi(p, v, d.key, d);
            } else if ("documentDelete" in e) {
                e.documentDelete;
                var m = e.documentDelete;
                m.document;
                var y = qi(t, m.document), g = m.readTime ? Ri(m.readTime) : st.min(), w = dn.newNoDocument(y, g), b = m.removedTargetIds || [];
                n = new wi([], b, w.key, w);
            } else if ("documentRemove" in e) {
                e.documentRemove;
                var I = e.documentRemove;
                I.document;
                var _ = qi(t, I.document), E = I.removedTargetIds || [];
                n = new wi([], E, _, null);
            } else {
                if (!("filter" in e)) return U();
                e.filter;
                var T = e.filter;
                T.targetId;
                var S = T.count, x = void 0 === S ? 0 : S, C = T.unchangedNames, D = new ui(x, C), N = T.targetId;
                n = new bi(N, D);
            }
            return n;
        }(this.serializer, t), n = function(t) {
            // We have only reached a consistent snapshot for the entire stream if there
            // is a read_time set and it applies to all targets (i.e. the list of
            // targets is empty). The backend is guaranteed to send such responses.
            if (!("targetChange" in t)) return st.min();
            var e = t.targetChange;
            return e.targetIds && e.targetIds.length ? st.min() : e.readTime ? Ri(e.readTime) : st.min();
        }(t);
        return this.listener.u_(e, n);
    }, 
    /**
     * Registers interest in the results of the given target. If the target
     * includes a resumeToken it will be included in the request. Results that
     * affect the target will be streamed back as WatchChange messages that
     * reference the targetId.
     */
    n.prototype.c_ = function(t) {
        var e = {};
        e.database = zi(this.serializer), e.addTarget = function(t, e) {
            var n, r = e.target;
            if ((n = zn(r) ? {
                documents: Yi(t, r)
            } : {
                query: Hi(t, r).ut
            }).targetId = e.targetId, e.resumeToken.approximateByteSize() > 0) {
                n.resumeToken = Pi(t, e.resumeToken);
                var i = Ai(t, e.expectedCount);
                null !== i && (n.expectedCount = i);
            } else if (e.snapshotVersion.compareTo(st.min()) > 0) {
                // TODO(wuandy): Consider removing above check because it is most likely true.
                // Right now, many tests depend on this behaviour though (leaving min() out
                // of serialization).
                n.readTime = ki(t, e.snapshotVersion.toTimestamp());
                var o = Ai(t, e.expectedCount);
                null !== o && (n.expectedCount = o);
            }
            return n;
        }(this.serializer, t);
        var n = function(t, e) {
            var n = function(t) {
                switch (t) {
                  case "TargetPurposeListen" /* TargetPurpose.Listen */ :
                    return null;

                  case "TargetPurposeExistenceFilterMismatch" /* TargetPurpose.ExistenceFilterMismatch */ :
                    return "existence-filter-mismatch";

                  case "TargetPurposeExistenceFilterMismatchBloom" /* TargetPurpose.ExistenceFilterMismatchBloom */ :
                    return "existence-filter-mismatch-bloom";

                  case "TargetPurposeLimboResolution" /* TargetPurpose.LimboResolution */ :
                    return "limbo-document";

                  default:
                    return U();
                }
            }(e.purpose);
            return null == n ? null : {
                "goog-listen-tags": n
            };
        }(this.serializer, t);
        n && (e.labels = n), this.t_(e);
    }, 
    /**
     * Unregisters interest in the results of the target associated with the
     * given targetId.
     */
    n.prototype.l_ = function(t) {
        var e = {};
        e.database = zi(this.serializer), e.removeTarget = t, this.t_(e);
    }, n;
}(Lu), Uu = /** @class */ function(e) {
    function n(t, n, r, i, o, a) {
        var u = this;
        return (u = e.call(this, t, "write_stream_connection_backoff" /* TimerId.WriteStreamConnectionBackoff */ , "write_stream_idle" /* TimerId.WriteStreamIdle */ , "health_check_timeout" /* TimerId.HealthCheckTimeout */ , n, r, i, a) || this).serializer = o, 
        u.h_ = !1, u;
    }
    return t(n, e), Object.defineProperty(n.prototype, "P_", {
        /**
         * Tracks whether or not a handshake has been successfully exchanged and
         * the stream is ready to accept mutations.
         */
        get: function() {
            return this.h_;
        },
        enumerable: !1,
        configurable: !0
    }), 
    // Override of PersistentStream.start
    n.prototype.start = function() {
        this.h_ = !1, this.lastStreamToken = void 0, e.prototype.start.call(this);
    }, n.prototype.i_ = function() {
        this.h_ && this.I_([]);
    }, n.prototype.a_ = function(t, e) {
        return this.connection.Fo("Write", t, e);
    }, n.prototype.onMessage = function(t) {
        if (
        // Always capture the last stream token.
        B(!!t.streamToken), this.lastStreamToken = t.streamToken, this.h_) {
            // A successful first write response means the stream is healthy,
            // Note, that we could consider a successful handshake healthy, however,
            // the write itself might be causing an error we want to back off from.
            this.jo.reset();
            var e = function(t, e) {
                return t && t.length > 0 ? (B(void 0 !== e), t.map((function(t) {
                    return function(t, e) {
                        // NOTE: Deletes don't have an updateTime.
                        var n = t.updateTime ? Ri(t.updateTime) : Ri(e);
                        return n.isEqual(st.min()) && (
                        // The Firestore Emulator currently returns an update time of 0 for
                        // deletes of non-existing documents (rather than null). This breaks the
                        // test "get deleted doc while offline with source=cache" as NoDocuments
                        // with version 0 are filtered by IndexedDb's RemoteDocumentCache.
                        // TODO(#2149): Remove this when Emulator is fixed
                        n = Ri(e)), new qr(n, t.transformResults || []);
                    }(t, e);
                }))) : [];
            }(t.writeResults, t.commitTime), n = Ri(t.commitTime);
            return this.listener.T_(n, e);
        }
        // The first response is always the handshake response
                return B(!t.writeResults || 0 === t.writeResults.length), this.h_ = !0, 
        this.listener.E_();
    }, 
    /**
     * Sends an initial streamToken to the server, performing the handshake
     * required to make the StreamingWrite RPC work. Subsequent
     * calls should wait until onHandshakeComplete was called.
     */
    n.prototype.d_ = function() {
        // TODO(dimond): Support stream resumption. We intentionally do not set the
        // stream token on the handshake, ignoring any stream token we might have.
        var t = {};
        t.database = zi(this.serializer), this.t_(t);
    }, 
    /** Sends a group of mutations to the Firestore backend to apply. */ n.prototype.I_ = function(t) {
        var e = this, n = {
            streamToken: this.lastStreamToken,
            writes: t.map((function(t) {
                return Qi(e.serializer, t);
            }))
        };
        this.t_(n);
    }, n;
}(Lu), Bu = /** @class */ function(e) {
    function n(t, n, r, i) {
        var o = this;
        return (o = e.call(this) || this).authCredentials = t, o.appCheckCredentials = n, 
        o.connection = r, o.serializer = i, o.A_ = !1, o;
    }
    return t(n, e), n.prototype.R_ = function() {
        if (this.A_) throw new j(K.FAILED_PRECONDITION, "The client has already been terminated.");
    }, 
    /** Invokes the provided RPC with auth and AppCheck tokens. */ n.prototype.So = function(t, e, n, r) {
        var i = this;
        return this.R_(), Promise.all([ this.authCredentials.getToken(), this.appCheckCredentials.getToken() ]).then((function(o) {
            var a = o[0], u = o[1];
            return i.connection.So(t, Fi(e, n), r, a, u);
        })).catch((function(t) {
            throw "FirebaseError" === t.name ? (t.code === K.UNAUTHENTICATED && (i.authCredentials.invalidateToken(), 
            i.appCheckCredentials.invalidateToken()), t) : new j(K.UNKNOWN, t.toString());
        }));
    }, 
    /** Invokes the provided RPC with streamed results with auth and AppCheck tokens. */ n.prototype.vo = function(t, e, n, r, i) {
        var o = this;
        return this.R_(), Promise.all([ this.authCredentials.getToken(), this.appCheckCredentials.getToken() ]).then((function(a) {
            var u = a[0], s = a[1];
            return o.connection.vo(t, Fi(e, n), r, u, s, i);
        })).catch((function(t) {
            throw "FirebaseError" === t.name ? (t.code === K.UNAUTHENTICATED && (o.authCredentials.invalidateToken(), 
            o.appCheckCredentials.invalidateToken()), t) : new j(K.UNKNOWN, t.toString());
        }));
    }, n.prototype.terminate = function() {
        this.A_ = !0, this.connection.terminate();
    }, n;
}((function() {}));

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A PersistentStream is an abstract base class that represents a streaming RPC
 * to the Firestore backend. It's built on top of the connections own support
 * for streaming RPCs, and adds several critical features for our clients:
 *
 *   - Exponential backoff on failure
 *   - Authentication via CredentialsProvider
 *   - Dispatching all callbacks into the shared worker queue
 *   - Closing idle streams after 60 seconds of inactivity
 *
 * Subclasses of PersistentStream implement serialization of models to and
 * from the JSON representation of the protocol buffers for a specific
 * streaming RPC.
 *
 * ## Starting and Stopping
 *
 * Streaming RPCs are stateful and need to be start()ed before messages can
 * be sent and received. The PersistentStream will call the onOpen() function
 * of the listener once the stream is ready to accept requests.
 *
 * Should a start() fail, PersistentStream will call the registered onClose()
 * listener with a FirestoreError indicating what went wrong.
 *
 * A PersistentStream can be started and stopped repeatedly.
 *
 * Generic types:
 *  SendType: The type of the outgoing message of the underlying
 *    connection stream
 *  ReceiveType: The type of the incoming message of the underlying
 *    connection stream
 *  ListenerType: The type of the listener that will be used for callbacks
 */
/**
 * A component used by the RemoteStore to track the OnlineState (that is,
 * whether or not the client as a whole should be considered to be online or
 * offline), implementing the appropriate heuristics.
 *
 * In particular, when the client is trying to connect to the backend, we
 * allow up to MAX_WATCH_STREAM_FAILURES within ONLINE_STATE_TIMEOUT_MS for
 * a connection to succeed. If we have too many failures or the timeout elapses,
 * then we set the OnlineState to Offline, and the client will behave as if
 * it is offline (get()s will return cached data, etc.).
 */
var zu = /** @class */ function() {
    function t(t, e) {
        this.asyncQueue = t, this.onlineStateHandler = e, 
        /** The current OnlineState. */
        this.state = "Unknown" /* OnlineState.Unknown */ , 
        /**
             * A count of consecutive failures to open the stream. If it reaches the
             * maximum defined by MAX_WATCH_STREAM_FAILURES, we'll set the OnlineState to
             * Offline.
             */
        this.m_ = 0, 
        /**
             * A timer that elapses after ONLINE_STATE_TIMEOUT_MS, at which point we
             * transition from OnlineState.Unknown to OnlineState.Offline without waiting
             * for the stream to actually fail (MAX_WATCH_STREAM_FAILURES times).
             */
        this.f_ = null, 
        /**
             * Whether the client should log a warning message if it fails to connect to
             * the backend (initially true, cleared after a successful stream, or if we've
             * logged the message already).
             */
        this.g_ = !0
        /**
     * Called by RemoteStore when a watch stream is started (including on each
     * backoff attempt).
     *
     * If this is the first attempt, it sets the OnlineState to Unknown and starts
     * the onlineStateTimer.
     */;
    }
    return t.prototype.p_ = function() {
        var t = this;
        0 === this.m_ && (this.y_("Unknown" /* OnlineState.Unknown */), this.f_ = this.asyncQueue.enqueueAfterDelay("online_state_timeout" /* TimerId.OnlineStateTimeout */ , 1e4, (function() {
            return t.f_ = null, t.w_("Backend didn't respond within 10 seconds."), t.y_("Offline" /* OnlineState.Offline */), 
            Promise.resolve();
        })));
    }, 
    /**
     * Updates our OnlineState as appropriate after the watch stream reports a
     * failure. The first failure moves us to the 'Unknown' state. We then may
     * allow multiple failures (based on MAX_WATCH_STREAM_FAILURES) before we
     * actually transition to the 'Offline' state.
     */
    t.prototype.S_ = function(t) {
        "Online" /* OnlineState.Online */ === this.state ? this.y_("Unknown" /* OnlineState.Unknown */) : (this.m_++, 
        this.m_ >= 1 && (this.b_(), this.w_("Connection failed 1 times. Most recent error: ".concat(t.toString())), 
        this.y_("Offline" /* OnlineState.Offline */)));
    }, 
    /**
     * Explicitly sets the OnlineState to the specified state.
     *
     * Note that this resets our timers / failure counters, etc. used by our
     * Offline heuristics, so must not be used in place of
     * handleWatchStreamStart() and handleWatchStreamFailure().
     */
    t.prototype.set = function(t) {
        this.b_(), this.m_ = 0, "Online" /* OnlineState.Online */ === t && (
        // We've connected to watch at least once. Don't warn the developer
        // about being offline going forward.
        this.g_ = !1), this.y_(t);
    }, t.prototype.y_ = function(t) {
        t !== this.state && (this.state = t, this.onlineStateHandler(t));
    }, t.prototype.w_ = function(t) {
        var e = "Could not reach Cloud Firestore backend. ".concat(t, "\nThis typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.");
        this.g_ ? (V(e), this.g_ = !1) : F("OnlineStateTracker", e);
    }, t.prototype.b_ = function() {
        null !== this.f_ && (this.f_.cancel(), this.f_ = null);
    }, t;
}(), Gu = function(
/**
     * The local store, used to fill the write pipeline with outbound mutations.
     */
t, 
/** The client-side proxy for interacting with the backend. */
r, i, o, a) {
    var u = this;
    this.localStore = t, this.datastore = r, this.asyncQueue = i, this.remoteSyncer = {}, 
    /**
             * A list of up to MAX_PENDING_WRITES writes that we have fetched from the
             * LocalStore via fillWritePipeline() and have or will send to the write
             * stream.
             *
             * Whenever writePipeline.length > 0 the RemoteStore will attempt to start or
             * restart the write stream. When the stream is established the writes in the
             * pipeline will be sent in order.
             *
             * Writes remain in writePipeline until they are acknowledged by the backend
             * and thus will automatically be re-sent if the stream is interrupted /
             * restarted before they're acknowledged.
             *
             * Write responses from the backend are linked to their originating request
             * purely based on order, and so we can just shift() writes from the front of
             * the writePipeline as we receive responses.
             */
    this.D_ = [], 
    /**
             * A mapping of watched targets that the client cares about tracking and the
             * user has explicitly called a 'listen' for this target.
             *
             * These targets may or may not have been sent to or acknowledged by the
             * server. On re-establishing the listen stream, these targets should be sent
             * to the server. The targets removed with unlistens are removed eagerly
             * without waiting for confirmation from the listen stream.
             */
    this.C_ = new Map, 
    /**
             * A set of reasons for why the RemoteStore may be offline. If empty, the
             * RemoteStore may start its network connections.
             */
    this.v_ = new Set, 
    /**
             * Event handlers that get called when the network is disabled or enabled.
             *
             * PORTING NOTE: These functions are used on the Web client to create the
             * underlying streams (to support tree-shakeable streams). On Android and iOS,
             * the streams are created during construction of RemoteStore.
             */
    this.F_ = [], this.M_ = a, this.M_.io((function(t) {
        i.enqueueAndForget((function() {
            return e(u, void 0, void 0, (function() {
                return n(this, (function(t) {
                    switch (t.label) {
                      case 0:
                        return Zu(this) ? (F("RemoteStore", "Restarting streams for network reachability change."), 
                        [ 4 /*yield*/ , function(t) {
                            return e(this, void 0, void 0, (function() {
                                var e;
                                return n(this, (function(n) {
                                    switch (n.label) {
                                      case 0:
                                        return (e = G(t)).v_.add(4 /* OfflineCause.ConnectivityChange */), [ 4 /*yield*/ , ju(e) ];

                                      case 1:
                                        return n.sent(), e.x_.set("Unknown" /* OnlineState.Unknown */), e.v_.delete(4 /* OfflineCause.ConnectivityChange */), 
                                        [ 4 /*yield*/ , Ku(e) ];

                                      case 2:
                                        return n.sent(), [ 2 /*return*/ ];
                                    }
                                }));
                            }));
                        }(this) ]) : [ 3 /*break*/ , 2 ];

                      case 1:
                        t.sent(), t.label = 2;

                      case 2:
                        return [ 2 /*return*/ ];
                    }
                }));
            }));
        }));
    })), this.x_ = new zu(i, o);
};

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Ku(t) {
    return e(this, void 0, void 0, (function() {
        var e, r;
        return n(this, (function(n) {
            switch (n.label) {
              case 0:
                if (!Zu(t)) return [ 3 /*break*/ , 4 ];
                e = 0, r = t.F_, n.label = 1;

              case 1:
                return e < r.length ? [ 4 /*yield*/ , (0, r[e])(/* enabled= */ !0) ] : [ 3 /*break*/ , 4 ];

              case 2:
                n.sent(), n.label = 3;

              case 3:
                return e++, [ 3 /*break*/ , 1 ];

              case 4:
                return [ 2 /*return*/ ];
            }
        }));
    }));
}

/**
 * Temporarily disables the network. The network can be re-enabled using
 * enableNetwork().
 */ function ju(t) {
    return e(this, void 0, void 0, (function() {
        var e, r;
        return n(this, (function(n) {
            switch (n.label) {
              case 0:
                e = 0, r = t.F_, n.label = 1;

              case 1:
                return e < r.length ? [ 4 /*yield*/ , (0, r[e])(/* enabled= */ !1) ] : [ 3 /*break*/ , 4 ];

              case 2:
                n.sent(), n.label = 3;

              case 3:
                return e++, [ 3 /*break*/ , 1 ];

              case 4:
                return [ 2 /*return*/ ];
            }
        }));
    }));
}

/**
 * Starts new listen for the given target. Uses resume token if provided. It
 * is a no-op if the target of given `TargetData` is already being listened to.
 */ function Qu(t, e) {
    var n = G(t);
    n.C_.has(e.targetId) || (
    // Mark this as something the client is currently listening for.
    n.C_.set(e.targetId, e), Xu(n) ? 
    // The listen will be sent in onWatchStreamOpen
    Ju(n) : ps(n).Jo() && Yu(n, e));
}

/**
 * Removes the listen from server. It is a no-op if the given target id is
 * not being listened to.
 */ function Wu(t, e) {
    var n = G(t), r = ps(n);
    n.C_.delete(e), r.Jo() && Hu(n, e), 0 === n.C_.size && (r.Jo() ? r.Xo() : Zu(n) && 
    // Revert to OnlineState.Unknown if the watch stream is not open and we
    // have no listeners, since without any listens to send we cannot
    // confirm if the stream is healthy and upgrade to OnlineState.Online.
    n.x_.set("Unknown" /* OnlineState.Unknown */));
}

/**
 * We need to increment the the expected number of pending responses we're due
 * from watch so we wait for the ack to process any messages from this target.
 */ function Yu(t, e) {
    if (t.O_.Oe(e.targetId), e.resumeToken.approximateByteSize() > 0 || e.snapshotVersion.compareTo(st.min()) > 0) {
        var n = t.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;
        e = e.withExpectedCount(n);
    }
    ps(t).c_(e);
}

/**
 * We need to increment the expected number of pending responses we're due
 * from watch so we wait for the removal on the server before we process any
 * messages from this target.
 */ function Hu(t, e) {
    t.O_.Oe(e), ps(t).l_(e);
}

function Ju(t) {
    t.O_ = new Ei({
        getRemoteKeysForTarget: function(e) {
            return t.remoteSyncer.getRemoteKeysForTarget(e);
        },
        _t: function(e) {
            return t.C_.get(e) || null;
        },
        nt: function() {
            return t.datastore.serializer.databaseId;
        }
    }), ps(t).start(), t.x_.p_()
    /**
 * Returns whether the watch stream should be started because it's necessary
 * and has not yet been started.
 */;
}

function Xu(t) {
    return Zu(t) && !ps(t).Ho() && t.C_.size > 0;
}

function Zu(t) {
    return 0 === G(t).v_.size;
}

function $u(t) {
    t.O_ = void 0;
}

function ts(t) {
    return e(this, void 0, void 0, (function() {
        return n(this, (function(e) {
            return t.C_.forEach((function(e, n) {
                Yu(t, e);
            })), [ 2 /*return*/ ];
        }));
    }));
}

function es(t, r) {
    return e(this, void 0, void 0, (function() {
        return n(this, (function(e) {
            return $u(t), 
            // If we still need the watch stream, retry the connection.
            Xu(t) ? (t.x_.S_(r), Ju(t)) : 
            // No need to restart watch stream because there are no active targets.
            // The online state is set to unknown because there is no active attempt
            // at establishing a connection
            t.x_.set("Unknown" /* OnlineState.Unknown */), [ 2 /*return*/ ];
        }));
    }));
}

function ns(t, r, i) {
    return e(this, void 0, void 0, (function() {
        var o, a, u;
        return n(this, (function(s) {
            switch (s.label) {
              case 0:
                if (t.x_.set("Online" /* OnlineState.Online */), !(r instanceof Ii && 2 /* WatchTargetChangeState.Removed */ === r.state && r.cause)) 
                // Mark the client as online since we got a message from the server
                return [ 3 /*break*/ , 6 ];
                s.label = 1;

              case 1:
                return s.trys.push([ 1, 3, , 5 ]), [ 4 /*yield*/ , 
                /** Handles an error on a target */
                function(t, r) {
                    return e(this, void 0, void 0, (function() {
                        var e, i, o, a;
                        return n(this, (function(n) {
                            switch (n.label) {
                              case 0:
                                e = r.cause, i = 0, o = r.targetIds, n.label = 1;

                              case 1:
                                return i < o.length ? (a = o[i], t.C_.has(a) ? [ 4 /*yield*/ , t.remoteSyncer.rejectListen(a, e) ] : [ 3 /*break*/ , 3 ]) : [ 3 /*break*/ , 5 ];

                              case 2:
                                n.sent(), t.C_.delete(a), t.O_.removeTarget(a), n.label = 3;

                              case 3:
                                n.label = 4;

                              case 4:
                                return i++, [ 3 /*break*/ , 1 ];

                              case 5:
                                return [ 2 /*return*/ ];
                            }
                        }));
                    }));
                }(t, r) ];

              case 2:
                return s.sent(), [ 3 /*break*/ , 5 ];

              case 3:
                return o = s.sent(), F("RemoteStore", "Failed to remove targets %s: %s ", r.targetIds.join(","), o), 
                [ 4 /*yield*/ , rs(t, o) ];

              case 4:
                return s.sent(), [ 3 /*break*/ , 5 ];

              case 5:
                return [ 3 /*break*/ , 13 ];

              case 6:
                if (r instanceof wi ? t.O_.$e(r) : r instanceof bi ? t.O_.Je(r) : t.O_.Ge(r), i.isEqual(st.min())) return [ 3 /*break*/ , 13 ];
                s.label = 7;

              case 7:
                return s.trys.push([ 7, 11, , 13 ]), [ 4 /*yield*/ , iu(t.localStore) ];

              case 8:
                return a = s.sent(), i.compareTo(a) >= 0 ? [ 4 /*yield*/ , 
                /**
                 * Takes a batch of changes from the Datastore, repackages them as a
                 * RemoteEvent, and passes that on to the listener, which is typically the
                 * SyncEngine.
                 */
                function(t, e) {
                    var n = t.O_.it(e);
                    // Update in-memory resume tokens. LocalStore will update the
                    // persistent view of these when applying the completed RemoteEvent.
                                        return n.targetChanges.forEach((function(n, r) {
                        if (n.resumeToken.approximateByteSize() > 0) {
                            var i = t.C_.get(r);
                            // A watched target might have been removed already.
                                                        i && t.C_.set(r, i.withResumeToken(n.resumeToken, e));
                        }
                    })), 
                    // Re-establish listens for the targets that have been invalidated by
                    // existence filter mismatches.
                    n.targetMismatches.forEach((function(e, n) {
                        var r = t.C_.get(e);
                        if (r) {
                            // Clear the resume token for the target, since we're in a known mismatch
                            // state.
                            t.C_.set(e, r.withResumeToken(Pe.EMPTY_BYTE_STRING, r.snapshotVersion)), 
                            // Cause a hard reset by unwatching and rewatching immediately, but
                            // deliberately don't send a resume token so that we get a full update.
                            Hu(t, e);
                            // Mark the target we send as being on behalf of an existence filter
                            // mismatch, but don't actually retain that in listenTargets. This ensures
                            // that we flag the first re-listen this way without impacting future
                            // listens of this target (that might happen e.g. on reconnect).
                            var i = new ao(r.target, e, n, r.sequenceNumber);
                            Yu(t, i);
                        }
                    })), t.remoteSyncer.applyRemoteEvent(n);
                }(t, i) ] : [ 3 /*break*/ , 10 ];

                // We have received a target change with a global snapshot if the snapshot
                // version is not equal to SnapshotVersion.min().
                              case 9:
                // We have received a target change with a global snapshot if the snapshot
                // version is not equal to SnapshotVersion.min().
                s.sent(), s.label = 10;

              case 10:
                return [ 3 /*break*/ , 13 ];

              case 11:
                return F("RemoteStore", "Failed to raise snapshot:", u = s.sent()), [ 4 /*yield*/ , rs(t, u) ];

              case 12:
                return s.sent(), [ 3 /*break*/ , 13 ];

              case 13:
                return [ 2 /*return*/ ];
            }
        }));
    }));
}

/**
 * Recovery logic for IndexedDB errors that takes the network offline until
 * `op` succeeds. Retries are scheduled with backoff using
 * `enqueueRetryable()`. If `op()` is not provided, IndexedDB access is
 * validated via a generic operation.
 *
 * The returned Promise is resolved once the network is disabled and before
 * any retry attempt.
 */ function rs(t, r, i) {
    return e(this, void 0, void 0, (function() {
        var o = this;
        return n(this, (function(a) {
            switch (a.label) {
              case 0:
                if (!Ot(r)) throw r;
                // Disable network and raise offline snapshots
                return t.v_.add(1 /* OfflineCause.IndexedDbFailed */), [ 4 /*yield*/ , ju(t) ];

              case 1:
                // Disable network and raise offline snapshots
                return a.sent(), t.x_.set("Offline" /* OnlineState.Offline */), i || (
                // Use a simple read operation to determine if IndexedDB recovered.
                // Ideally, we would expose a health check directly on SimpleDb, but
                // RemoteStore only has access to persistence through LocalStore.
                i = function() {
                    return iu(t.localStore);
                }), 
                // Probe IndexedDB periodically and re-enable network
                t.asyncQueue.enqueueRetryable((function() {
                    return e(o, void 0, void 0, (function() {
                        return n(this, (function(e) {
                            switch (e.label) {
                              case 0:
                                return F("RemoteStore", "Retrying IndexedDB access"), [ 4 /*yield*/ , i() ];

                              case 1:
                                return e.sent(), t.v_.delete(1 /* OfflineCause.IndexedDbFailed */), [ 4 /*yield*/ , Ku(t) ];

                              case 2:
                                return e.sent(), [ 2 /*return*/ ];
                            }
                        }));
                    }));
                })), [ 2 /*return*/ ];
            }
        }));
    }));
}

/**
 * Executes `op`. If `op` fails, takes the network offline until `op`
 * succeeds. Returns after the first attempt.
 */ function is(t, e) {
    return e().catch((function(n) {
        return rs(t, n, e);
    }));
}

function os(t) {
    return e(this, void 0, void 0, (function() {
        var e, r, i, o, a;
        return n(this, (function(n) {
            switch (n.label) {
              case 0:
                e = G(t), r = vs(e), i = e.D_.length > 0 ? e.D_[e.D_.length - 1].batchId : -1, n.label = 1;

              case 1:
                if (!
                /**
 * Returns true if we can add to the write pipeline (i.e. the network is
 * enabled and the write pipeline is not full).
 */
                function(t) {
                    return Zu(t) && t.D_.length < 10;
                }
                /**
 * Queues additional writes to be sent to the write stream, sending them
 * immediately if the write stream is established.
 */ (e)) return [ 3 /*break*/ , 7 ];
                n.label = 2;

              case 2:
                return n.trys.push([ 2, 4, , 6 ]), [ 4 /*yield*/ , uu(e.localStore, i) ];

              case 3:
                return null === (o = n.sent()) ? (0 === e.D_.length && r.Xo(), [ 3 /*break*/ , 7 ]) : (i = o.batchId, 
                function(t, e) {
                    t.D_.push(e);
                    var n = vs(t);
                    n.Jo() && n.P_ && n.I_(e.mutations);
                }(e, o), [ 3 /*break*/ , 6 ]);

              case 4:
                return a = n.sent(), [ 4 /*yield*/ , rs(e, a) ];

              case 5:
                return n.sent(), [ 3 /*break*/ , 6 ];

              case 6:
                return [ 3 /*break*/ , 1 ];

              case 7:
                return as(e) && us(e), [ 2 /*return*/ ];
            }
        }));
    }));
}

function as(t) {
    return Zu(t) && !vs(t).Ho() && t.D_.length > 0;
}

function us(t) {
    vs(t).start();
}

function ss(t) {
    return e(this, void 0, void 0, (function() {
        return n(this, (function(e) {
            return vs(t).d_(), [ 2 /*return*/ ];
        }));
    }));
}

function cs(t) {
    return e(this, void 0, void 0, (function() {
        var e, r, i, o;
        return n(this, (function(n) {
            // Send the write pipeline now that the stream is established.
            for (e = vs(t), r = 0, i = t.D_; r < i.length; r++) o = i[r], e.I_(o.mutations);
            return [ 2 /*return*/ ];
        }));
    }));
}

function ls(t, r, i) {
    return e(this, void 0, void 0, (function() {
        var e, o;
        return n(this, (function(n) {
            switch (n.label) {
              case 0:
                return e = t.D_.shift(), o = ii.from(e, r, i), [ 4 /*yield*/ , is(t, (function() {
                    return t.remoteSyncer.applySuccessfulWrite(o);
                })) ];

              case 1:
                // It's possible that with the completion of this mutation another
                // slot has freed up.
                return n.sent(), [ 4 /*yield*/ , os(t) ];

              case 2:
                // It's possible that with the completion of this mutation another
                // slot has freed up.
                return n.sent(), [ 2 /*return*/ ];
            }
        }));
    }));
}

function hs(t, r) {
    return e(this, void 0, void 0, (function() {
        return n(this, (function(i) {
            switch (i.label) {
              case 0:
                return r && vs(t).P_ ? [ 4 /*yield*/ , function(t, r) {
                    return e(this, void 0, void 0, (function() {
                        var e;
                        return n(this, (function(n) {
                            switch (n.label) {
                              case 0:
                                return function(t) {
                                    return si(t) && t !== K.ABORTED;
                                }(r.code) ? (e = t.D_.shift(), 
                                // In this case it's also unlikely that the server itself is melting
                                // down -- this was just a bad request so inhibit backoff on the next
                                // restart.
                                vs(t).Zo(), [ 4 /*yield*/ , is(t, (function() {
                                    return t.remoteSyncer.rejectFailedWrite(e.batchId, r);
                                })) ]) : [ 3 /*break*/ , 3 ];

                              case 1:
                                // It's possible that with the completion of this mutation
                                // another slot has freed up.
                                return n.sent(), [ 4 /*yield*/ , os(t) ];

                              case 2:
                                // In this case it's also unlikely that the server itself is melting
                                // down -- this was just a bad request so inhibit backoff on the next
                                // restart.
                                // It's possible that with the completion of this mutation
                                // another slot has freed up.
                                n.sent(), n.label = 3;

                              case 3:
                                return [ 2 /*return*/ ];
                            }
                        }));
                    }));
                }(t, r) ] : [ 3 /*break*/ , 2 ];

                // This error affects the actual write.
                              case 1:
                // This error affects the actual write.
                i.sent(), i.label = 2;

              case 2:
                // If the write stream closed after the write handshake completes, a write
                // operation failed and we fail the pending operation.
                // The write stream might have been started by refilling the write
                // pipeline for failed writes
                return as(t) && us(t), [ 2 /*return*/ ];
            }
        }));
    }));
}

function fs(t, r) {
    return e(this, void 0, void 0, (function() {
        var e, i;
        return n(this, (function(n) {
            switch (n.label) {
              case 0:
                return (e = G(t)).asyncQueue.verifyOperationInProgress(), F("RemoteStore", "RemoteStore received new credentials"), 
                i = Zu(e), 
                // Tear down and re-create our network streams. This will ensure we get a
                // fresh auth token for the new user and re-fill the write pipeline with
                // new mutations from the LocalStore (since mutations are per-user).
                e.v_.add(3 /* OfflineCause.CredentialChange */), [ 4 /*yield*/ , ju(e) ];

              case 1:
                return n.sent(), i && 
                // Don't set the network status to Unknown if we are offline.
                e.x_.set("Unknown" /* OnlineState.Unknown */), [ 4 /*yield*/ , e.remoteSyncer.handleCredentialChange(r) ];

              case 2:
                return n.sent(), e.v_.delete(3 /* OfflineCause.CredentialChange */), [ 4 /*yield*/ , Ku(e) ];

              case 3:
                // Tear down and re-create our network streams. This will ensure we get a
                // fresh auth token for the new user and re-fill the write pipeline with
                // new mutations from the LocalStore (since mutations are per-user).
                return n.sent(), [ 2 /*return*/ ];
            }
        }));
    }));
}

/**
 * Toggles the network state when the client gains or loses its primary lease.
 */ function ds(t, r) {
    return e(this, void 0, void 0, (function() {
        var e;
        return n(this, (function(n) {
            switch (n.label) {
              case 0:
                return e = G(t), r ? (e.v_.delete(2 /* OfflineCause.IsSecondary */), [ 4 /*yield*/ , Ku(e) ]) : [ 3 /*break*/ , 2 ];

              case 1:
                return n.sent(), [ 3 /*break*/ , 5 ];

              case 2:
                return r ? [ 3 /*break*/ , 4 ] : (e.v_.add(2 /* OfflineCause.IsSecondary */), [ 4 /*yield*/ , ju(e) ]);

              case 3:
                n.sent(), e.x_.set("Unknown" /* OnlineState.Unknown */), n.label = 4;

              case 4:
                n.label = 5;

              case 5:
                return [ 2 /*return*/ ];
            }
        }));
    }));
}

/**
 * If not yet initialized, registers the WatchStream and its network state
 * callback with `remoteStoreImpl`. Returns the existing stream if one is
 * already available.
 *
 * PORTING NOTE: On iOS and Android, the WatchStream gets registered on startup.
 * This is not done on Web to allow it to be tree-shaken.
 */ function ps(t) {
    var r = this;
    return t.N_ || (
    // Create stream (but note that it is not started yet).
    t.N_ = function(t, e, n) {
        var r = G(t);
        return r.R_(), new qu(e, r.connection, r.authCredentials, r.appCheckCredentials, r.serializer, n);
    }(t.datastore, t.asyncQueue, {
        Po: ts.bind(null, t),
        To: es.bind(null, t),
        u_: ns.bind(null, t)
    }), t.F_.push((function(i) {
        return e(r, void 0, void 0, (function() {
            return n(this, (function(e) {
                switch (e.label) {
                  case 0:
                    return i ? (t.N_.Zo(), Xu(t) ? Ju(t) : t.x_.set("Unknown" /* OnlineState.Unknown */), 
                    [ 3 /*break*/ , 3 ]) : [ 3 /*break*/ , 1 ];

                  case 1:
                    return [ 4 /*yield*/ , t.N_.stop() ];

                  case 2:
                    e.sent(), $u(t), e.label = 3;

                  case 3:
                    return [ 2 /*return*/ ];
                }
            }));
        }));
    }))), t.N_
    /**
 * If not yet initialized, registers the WriteStream and its network state
 * callback with `remoteStoreImpl`. Returns the existing stream if one is
 * already available.
 *
 * PORTING NOTE: On iOS and Android, the WriteStream gets registered on startup.
 * This is not done on Web to allow it to be tree-shaken.
 */;
}

function vs(t) {
    var r = this;
    return t.L_ || (
    // Create stream (but note that it is not started yet).
    t.L_ = function(t, e, n) {
        var r = G(t);
        return r.R_(), new Uu(e, r.connection, r.authCredentials, r.appCheckCredentials, r.serializer, n);
    }(t.datastore, t.asyncQueue, {
        Po: ss.bind(null, t),
        To: hs.bind(null, t),
        E_: cs.bind(null, t),
        T_: ls.bind(null, t)
    }), t.F_.push((function(i) {
        return e(r, void 0, void 0, (function() {
            return n(this, (function(e) {
                switch (e.label) {
                  case 0:
                    return i ? (t.L_.Zo(), [ 4 /*yield*/ , os(t) ]) : [ 3 /*break*/ , 2 ];

                  case 1:
                    // This will start the write stream if necessary.
                    return e.sent(), [ 3 /*break*/ , 4 ];

                  case 2:
                    return [ 4 /*yield*/ , t.L_.stop() ];

                  case 3:
                    e.sent(), t.D_.length > 0 && (F("RemoteStore", "Stopping write stream with ".concat(t.D_.length, " pending writes")), 
                    t.D_ = []), e.label = 4;

                  case 4:
                    return [ 2 /*return*/ ];
                }
            }));
        }));
    }))), t.L_
    /**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
    /**
 * Represents an operation scheduled to be run in the future on an AsyncQueue.
 *
 * It is created via DelayedOperation.createAndSchedule().
 *
 * Supports cancellation (via cancel()) and early execution (via skipDelay()).
 *
 * Note: We implement `PromiseLike` instead of `Promise`, as the `Promise` type
 * in newer versions of TypeScript defines `finally`, which is not available in
 * IE.
 */;
}

var ms = /** @class */ function() {
    function t(t, e, n, r, i) {
        this.asyncQueue = t, this.timerId = e, this.targetTimeMs = n, this.op = r, this.removalCallback = i, 
        this.deferred = new Q, this.then = this.deferred.promise.then.bind(this.deferred.promise), 
        // It's normal for the deferred promise to be canceled (due to cancellation)
        // and so we attach a dummy catch callback to avoid
        // 'UnhandledPromiseRejectionWarning' log spam.
        this.deferred.promise.catch((function(t) {}));
    }
    return Object.defineProperty(t.prototype, "promise", {
        get: function() {
            return this.deferred.promise;
        },
        enumerable: !1,
        configurable: !0
    }), 
    /**
     * Creates and returns a DelayedOperation that has been scheduled to be
     * executed on the provided asyncQueue after the provided delayMs.
     *
     * @param asyncQueue - The queue to schedule the operation on.
     * @param id - A Timer ID identifying the type of operation this is.
     * @param delayMs - The delay (ms) before the operation should be scheduled.
     * @param op - The operation to run.
     * @param removalCallback - A callback to be called synchronously once the
     *   operation is executed or canceled, notifying the AsyncQueue to remove it
     *   from its delayedOperations list.
     *   PORTING NOTE: This exists to prevent making removeDelayedOperation() and
     *   the DelayedOperation class public.
     */
    t.createAndSchedule = function(e, n, r, i, o) {
        var a = new t(e, n, Date.now() + r, i, o);
        return a.start(r), a;
    }, 
    /**
     * Starts the timer. This is called immediately after construction by
     * createAndSchedule().
     */
    t.prototype.start = function(t) {
        var e = this;
        this.timerHandle = setTimeout((function() {
            return e.handleDelayElapsed();
        }), t);
    }, 
    /**
     * Queues the operation to run immediately (if it hasn't already been run or
     * canceled).
     */
    t.prototype.skipDelay = function() {
        return this.handleDelayElapsed();
    }, 
    /**
     * Cancels the operation if it hasn't already been executed or canceled. The
     * promise will be rejected.
     *
     * As long as the operation has not yet been run, calling cancel() provides a
     * guarantee that the operation will not be run.
     */
    t.prototype.cancel = function(t) {
        null !== this.timerHandle && (this.clearTimeout(), this.deferred.reject(new j(K.CANCELLED, "Operation cancelled" + (t ? ": " + t : ""))));
    }, t.prototype.handleDelayElapsed = function() {
        var t = this;
        this.asyncQueue.enqueueAndForget((function() {
            return null !== t.timerHandle ? (t.clearTimeout(), t.op().then((function(e) {
                return t.deferred.resolve(e);
            }))) : Promise.resolve();
        }));
    }, t.prototype.clearTimeout = function() {
        null !== this.timerHandle && (this.removalCallback(this), clearTimeout(this.timerHandle), 
        this.timerHandle = null);
    }, t;
}();

/**
 * Returns a FirestoreError that can be surfaced to the user if the provided
 * error is an IndexedDbTransactionError. Re-throws the error otherwise.
 */ function ys(t, e) {
    if (V("AsyncQueue", "".concat(e, ": ").concat(t)), Ot(t)) return new j(K.UNAVAILABLE, "".concat(e, ": ").concat(t));
    throw t;
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * DocumentSet is an immutable (copy-on-write) collection that holds documents
 * in order specified by the provided comparator. We always add a document key
 * comparator on top of what is provided to guarantee document equality based on
 * the key.
 */ var gs, ws, bs = /** @class */ function() {
    /** The default ordering is by key if the comparator is omitted */
    function t(t) {
        // We are adding document key comparator to the end as it's the only
        // guaranteed unique property of a document.
        this.comparator = t ? function(e, n) {
            return t(e, n) || dt.comparator(e.key, n.key);
        } : function(t, e) {
            return dt.comparator(t.key, e.key);
        }, this.keyedMap = dr(), this.sortedSet = new Ee(this.comparator)
        /**
     * Returns an empty copy of the existing DocumentSet, using the same
     * comparator.
     */;
    }
    return t.emptySet = function(e) {
        return new t(e.comparator);
    }, t.prototype.has = function(t) {
        return null != this.keyedMap.get(t);
    }, t.prototype.get = function(t) {
        return this.keyedMap.get(t);
    }, t.prototype.first = function() {
        return this.sortedSet.minKey();
    }, t.prototype.last = function() {
        return this.sortedSet.maxKey();
    }, t.prototype.isEmpty = function() {
        return this.sortedSet.isEmpty();
    }, 
    /**
     * Returns the index of the provided key in the document set, or -1 if the
     * document key is not present in the set;
     */
    t.prototype.indexOf = function(t) {
        var e = this.keyedMap.get(t);
        return e ? this.sortedSet.indexOf(e) : -1;
    }, Object.defineProperty(t.prototype, "size", {
        get: function() {
            return this.sortedSet.size;
        },
        enumerable: !1,
        configurable: !0
    }), 
    /** Iterates documents in order defined by "comparator" */ t.prototype.forEach = function(t) {
        this.sortedSet.inorderTraversal((function(e, n) {
            return t(e), !1;
        }));
    }, 
    /** Inserts or updates a document with the same key */ t.prototype.add = function(t) {
        // First remove the element if we have it.
        var e = this.delete(t.key);
        return e.copy(e.keyedMap.insert(t.key, t), e.sortedSet.insert(t, null));
    }, 
    /** Deletes a document with a given key */ t.prototype.delete = function(t) {
        var e = this.get(t);
        return e ? this.copy(this.keyedMap.remove(t), this.sortedSet.remove(e)) : this;
    }, t.prototype.isEqual = function(e) {
        if (!(e instanceof t)) return !1;
        if (this.size !== e.size) return !1;
        for (var n = this.sortedSet.getIterator(), r = e.sortedSet.getIterator(); n.hasNext(); ) {
            var i = n.getNext().key, o = r.getNext().key;
            if (!i.isEqual(o)) return !1;
        }
        return !0;
    }, t.prototype.toString = function() {
        var t = [];
        return this.forEach((function(e) {
            t.push(e.toString());
        })), 0 === t.length ? "DocumentSet ()" : "DocumentSet (\n  " + t.join("  \n") + "\n)";
    }, t.prototype.copy = function(e, n) {
        var r = new t;
        return r.comparator = this.comparator, r.keyedMap = e, r.sortedSet = n, r;
    }, t;
}(), Is = /** @class */ function() {
    function t() {
        this.B_ = new Ee(dt.comparator);
    }
    return t.prototype.track = function(t) {
        var e = t.doc.key, n = this.B_.get(e);
        n ? 
        // Merge the new change with the existing change.
        0 /* ChangeType.Added */ !== t.type && 3 /* ChangeType.Metadata */ === n.type ? this.B_ = this.B_.insert(e, t) : 3 /* ChangeType.Metadata */ === t.type && 1 /* ChangeType.Removed */ !== n.type ? this.B_ = this.B_.insert(e, {
            type: n.type,
            doc: t.doc
        }) : 2 /* ChangeType.Modified */ === t.type && 2 /* ChangeType.Modified */ === n.type ? this.B_ = this.B_.insert(e, {
            type: 2 /* ChangeType.Modified */ ,
            doc: t.doc
        }) : 2 /* ChangeType.Modified */ === t.type && 0 /* ChangeType.Added */ === n.type ? this.B_ = this.B_.insert(e, {
            type: 0 /* ChangeType.Added */ ,
            doc: t.doc
        }) : 1 /* ChangeType.Removed */ === t.type && 0 /* ChangeType.Added */ === n.type ? this.B_ = this.B_.remove(e) : 1 /* ChangeType.Removed */ === t.type && 2 /* ChangeType.Modified */ === n.type ? this.B_ = this.B_.insert(e, {
            type: 1 /* ChangeType.Removed */ ,
            doc: n.doc
        }) : 0 /* ChangeType.Added */ === t.type && 1 /* ChangeType.Removed */ === n.type ? this.B_ = this.B_.insert(e, {
            type: 2 /* ChangeType.Modified */ ,
            doc: t.doc
        }) : 
        // This includes these cases, which don't make sense:
        // Added->Added
        // Removed->Removed
        // Modified->Added
        // Removed->Modified
        // Metadata->Added
        // Removed->Metadata
        U() : this.B_ = this.B_.insert(e, t);
    }, t.prototype.k_ = function() {
        var t = [];
        return this.B_.inorderTraversal((function(e, n) {
            t.push(n);
        })), t;
    }, t;
}(), _s = /** @class */ function() {
    function t(t, e, n, r, i, o, a, u, s) {
        this.query = t, this.docs = e, this.oldDocs = n, this.docChanges = r, this.mutatedKeys = i, 
        this.fromCache = o, this.syncStateChanged = a, this.excludesMetadataChanges = u, 
        this.hasCachedResults = s
        /** Returns a view snapshot as if all documents in the snapshot were added. */;
    }
    return t.fromInitialDocuments = function(e, n, r, i, o) {
        var a = [];
        return n.forEach((function(t) {
            a.push({
                type: 0 /* ChangeType.Added */ ,
                doc: t
            });
        })), new t(e, n, bs.emptySet(n), a, r, i, 
        /* syncStateChanged= */ !0, 
        /* excludesMetadataChanges= */ !1, o);
    }, Object.defineProperty(t.prototype, "hasPendingWrites", {
        get: function() {
            return !this.mutatedKeys.isEmpty();
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype.isEqual = function(t) {
        if (!(this.fromCache === t.fromCache && this.hasCachedResults === t.hasCachedResults && this.syncStateChanged === t.syncStateChanged && this.mutatedKeys.isEqual(t.mutatedKeys) && nr(this.query, t.query) && this.docs.isEqual(t.docs) && this.oldDocs.isEqual(t.oldDocs))) return !1;
        var e = this.docChanges, n = t.docChanges;
        if (e.length !== n.length) return !1;
        for (var r = 0; r < e.length; r++) if (e[r].type !== n[r].type || !e[r].doc.isEqual(n[r].doc)) return !1;
        return !0;
    }, t;
}(), Es = /** @class */ function() {
    function t() {
        this.q_ = void 0, this.Q_ = [];
    }
    // Helper methods that checks if the query has listeners that listening to remote store
        return t.prototype.K_ = function() {
        return this.Q_.some((function(t) {
            return t.U_();
        }));
    }, t;
}(), Ts = function() {
    this.queries = new cr((function(t) {
        return rr(t);
    }), nr), this.onlineState = "Unknown" /* OnlineState.Unknown */ , this.W_ = new Set;
};

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * DocumentChangeSet keeps track of a set of changes to docs in a query, merging
 * duplicate events for the same doc.
 */ function Ss(t, r) {
    return e(this, void 0, void 0, (function() {
        var e, i, o, a, u, s, c, l;
        return n(this, (function(n) {
            switch (n.label) {
              case 0:
                e = G(t), i = 3 /* ListenerSetupAction.NoActionRequired */ , o = r.query, (a = e.queries.get(o)) ? !a.K_() && r.U_() && (
                // Query has been listening to local cache, and tries to add a new listener sourced from watch.
                i = 2 /* ListenerSetupAction.RequireWatchConnectionOnly */) : (a = new Es, i = r.U_() ? 0 /* ListenerSetupAction.InitializeLocalListenAndRequireWatchConnection */ : 1 /* ListenerSetupAction.InitializeLocalListenOnly */), 
                n.label = 1;

              case 1:
                switch (n.trys.push([ 1, 9, , 10 ]), i) {
                  case 0 /* ListenerSetupAction.InitializeLocalListenAndRequireWatchConnection */ :
                    return [ 3 /*break*/ , 2 ];

 /* ListenerSetupAction.InitializeLocalListenAndRequireWatchConnection */                  case 1 /* ListenerSetupAction.InitializeLocalListenOnly */ :
                    return [ 3 /*break*/ , 4 ];

 /* ListenerSetupAction.InitializeLocalListenOnly */                  case 2 /* ListenerSetupAction.RequireWatchConnectionOnly */ :
                    return [ 3 /*break*/ , 6 ];
 /* ListenerSetupAction.RequireWatchConnectionOnly */                }
                return [ 3 /*break*/ , 8 ];

              case 2:
                return u = a, [ 4 /*yield*/ , e.onListen(o, 
                /** enableRemoteListen= */ !0) ];

              case 3:
                return u.q_ = n.sent(), [ 3 /*break*/ , 8 ];

              case 4:
                return s = a, [ 4 /*yield*/ , e.onListen(o, 
                /** enableRemoteListen= */ !1) ];

              case 5:
                return s.q_ = n.sent(), [ 3 /*break*/ , 8 ];

              case 6:
                return [ 4 /*yield*/ , e.onFirstRemoteStoreListen(o) ];

              case 7:
                n.sent(), n.label = 8;

              case 8:
                return [ 3 /*break*/ , 10 ];

              case 9:
                return c = n.sent(), l = ys(c, "Initialization of query '".concat(ir(r.query), "' failed")), 
                [ 2 /*return*/ , void r.onError(l) ];

              case 10:
                return e.queries.set(o, a), a.Q_.push(r), 
                // Run global snapshot listeners if a consistent snapshot has been emitted.
                r.G_(e.onlineState), a.q_ && r.z_(a.q_) && Ns(e), [ 2 /*return*/ ];
            }
        }));
    }));
}

function xs(t, r) {
    return e(this, void 0, void 0, (function() {
        var e, i, o, a, u;
        return n(this, (function(n) {
            switch (e = G(t), i = r.query, o = 3 /* ListenerRemovalAction.NoActionRequired */ , 
            (a = e.queries.get(i)) && (u = a.Q_.indexOf(r)) >= 0 && (a.Q_.splice(u, 1), 0 === a.Q_.length ? o = r.U_() ? 0 /* ListenerRemovalAction.TerminateLocalListenAndRequireWatchDisconnection */ : 1 /* ListenerRemovalAction.TerminateLocalListenOnly */ : !a.K_() && r.U_() && (
            // The removed listener is the last one that sourced from watch.
            o = 2 /* ListenerRemovalAction.RequireWatchDisconnectionOnly */)), o) {
              case 0 /* ListenerRemovalAction.TerminateLocalListenAndRequireWatchDisconnection */ :
                return [ 2 /*return*/ , (e.queries.delete(i), e.onUnlisten(i, 
                /** disableRemoteListen= */ !0)) ];

              case 1 /* ListenerRemovalAction.TerminateLocalListenOnly */ :
                return [ 2 /*return*/ , (e.queries.delete(i), e.onUnlisten(i, 
                /** disableRemoteListen= */ !1)) ];

              case 2 /* ListenerRemovalAction.RequireWatchDisconnectionOnly */ :
                return [ 2 /*return*/ , e.onLastRemoteStoreUnlisten(i) ];

              default:
                return [ 2 /*return*/ ];
            }
        }));
    }));
}

function Cs(t, e) {
    for (var n = G(t), r = !1, i = 0, o = e; i < o.length; i++) {
        var a = o[i], u = a.query, s = n.queries.get(u);
        if (s) {
            for (var c = 0, l = s.Q_; c < l.length; c++) {
                l[c].z_(a) && (r = !0);
            }
            s.q_ = a;
        }
    }
    r && Ns(n);
}

function Ds(t, e, n) {
    var r = G(t), i = r.queries.get(e);
    if (i) for (var o = 0, a = i.Q_; o < a.length; o++) {
        a[o].onError(n);
    }
    // Remove all listeners. NOTE: We don't need to call syncEngine.unlisten()
    // after an error.
        r.queries.delete(e);
}

// Call all global snapshot listeners that have been set.
function Ns(t) {
    t.W_.forEach((function(t) {
        t.next();
    }));
}

/** Listen to both cache and server changes */
(ws = gs || (gs = {})).j_ = "default", 
/** Listen to changes in cache only */
ws.Cache = "cache";

/**
 * QueryListener takes a series of internal view snapshots and determines
 * when to raise the event.
 *
 * It uses an Observer to dispatch events.
 */
var As = /** @class */ function() {
    function t(t, e, n) {
        this.query = t, this.H_ = e, 
        /**
             * Initial snapshots (e.g. from cache) may not be propagated to the wrapped
             * observer. This flag is set to true once we've actually raised an event.
             */
        this.J_ = !1, this.Y_ = null, this.onlineState = "Unknown" /* OnlineState.Unknown */ , 
        this.options = n || {}
        /**
     * Applies the new ViewSnapshot to this listener, raising a user-facing event
     * if applicable (depending on what changed, whether the user has opted into
     * metadata-only changes, etc.). Returns true if a user-facing event was
     * indeed raised.
     */;
    }
    return t.prototype.z_ = function(t) {
        if (!this.options.includeMetadataChanges) {
            for (
            // Remove the metadata only changes.
            var e = [], n = 0, r = t.docChanges; n < r.length; n++) {
                var i = r[n];
                3 /* ChangeType.Metadata */ !== i.type && e.push(i);
            }
            t = new _s(t.query, t.docs, t.oldDocs, e, t.mutatedKeys, t.fromCache, t.syncStateChanged, 
            /* excludesMetadataChanges= */ !0, t.hasCachedResults);
        }
        var o = !1;
        return this.J_ ? this.Z_(t) && (this.H_.next(t), o = !0) : this.X_(t, this.onlineState) && (this.ea(t), 
        o = !0), this.Y_ = t, o;
    }, t.prototype.onError = function(t) {
        this.H_.error(t);
    }, 
    /** Returns whether a snapshot was raised. */ t.prototype.G_ = function(t) {
        this.onlineState = t;
        var e = !1;
        return this.Y_ && !this.J_ && this.X_(this.Y_, t) && (this.ea(this.Y_), e = !0), 
        e;
    }, t.prototype.X_ = function(t, e) {
        // Always raise the first event when we're synced
        if (!t.fromCache) return !0;
        // Always raise event if listening to cache
                if (!this.U_()) return !0;
        // NOTE: We consider OnlineState.Unknown as online (it should become Offline
        // or Online if we wait long enough).
                var n = "Offline" /* OnlineState.Offline */ !== e;
        // Don't raise the event if we're online, aren't synced yet (checked
        // above) and are waiting for a sync.
                return (!this.options.ta || !n) && (!t.docs.isEmpty() || t.hasCachedResults || "Offline" /* OnlineState.Offline */ === e);
        // Raise data from cache if we have any documents, have cached results before,
        // or we are offline.
        }, t.prototype.Z_ = function(t) {
        // We don't need to handle includeDocumentMetadataChanges here because
        // the Metadata only changes have already been stripped out if needed.
        // At this point the only changes we will see are the ones we should
        // propagate.
        if (t.docChanges.length > 0) return !0;
        var e = this.Y_ && this.Y_.hasPendingWrites !== t.hasPendingWrites;
        return !(!t.syncStateChanged && !e) && !0 === this.options.includeMetadataChanges;
        // Generally we should have hit one of the cases above, but it's possible
        // to get here if there were only metadata docChanges and they got
        // stripped out.
        }, t.prototype.ea = function(t) {
        t = _s.fromInitialDocuments(t.query, t.docs, t.mutatedKeys, t.fromCache, t.hasCachedResults), 
        this.J_ = !0, this.H_.next(t);
    }, t.prototype.U_ = function() {
        return this.options.source !== gs.Cache;
    }, t;
}(), ks = /** @class */ function() {
    function t(t, 
    // How many bytes this element takes to store in the bundle.
    e) {
        this.na = t, this.byteLength = e;
    }
    return t.prototype.ra = function() {
        return "metadata" in this.na;
    }, t;
}(), Ps = /** @class */ function() {
    function t(t) {
        this.serializer = t;
    }
    return t.prototype.Ps = function(t) {
        return qi(this.serializer, t);
    }, 
    /**
     * Converts a BundleDocument to a MutableDocument.
     */
    t.prototype.Is = function(t) {
        return t.metadata.exists ? ji(this.serializer, t.document, !1) : dn.newNoDocument(this.Ps(t.metadata.name), this.Ts(t.metadata.readTime));
    }, t.prototype.Ts = function(t) {
        return Ri(t);
    }, t;
}(), Os = /** @class */ function() {
    function t(t, e, n) {
        this.ia = t, this.localStore = e, this.serializer = n, 
        /** Batched queries to be saved into storage */
        this.queries = [], 
        /** Batched documents to be saved into storage */
        this.documents = [], 
        /** The collection groups affected by this bundle. */
        this.collectionGroups = new Set, this.progress = Rs(t)
        /**
     * Adds an element from the bundle to the loader.
     *
     * Returns a new progress if adding the element leads to a new progress,
     * otherwise returns null.
     */;
    }
    return t.prototype.sa = function(t) {
        this.progress.bytesLoaded += t.byteLength;
        var e = this.progress.documentsLoaded;
        if (t.na.namedQuery) this.queries.push(t.na.namedQuery); else if (t.na.documentMetadata) {
            this.documents.push({
                metadata: t.na.documentMetadata
            }), t.na.documentMetadata.exists || ++e;
            var n = lt.fromString(t.na.documentMetadata.name);
            this.collectionGroups.add(n.get(n.length - 2));
        } else t.na.document && (this.documents[this.documents.length - 1].document = t.na.document, 
        ++e);
        return e !== this.progress.documentsLoaded ? (this.progress.documentsLoaded = e, 
        Object.assign({}, this.progress)) : null;
    }, t.prototype.oa = function(t) {
        for (var e = new Map, n = new Ps(this.serializer), r = 0, i = t; r < i.length; r++) {
            var o = i[r];
            if (o.metadata.queries) for (var a = n.Ps(o.metadata.name), u = 0, s = o.metadata.queries; u < s.length; u++) {
                var c = s[u], l = (e.get(c) || br()).add(a);
                e.set(c, l);
            }
        }
        return e;
    }, 
    /**
     * Update the progress to 'Success' and return the updated progress.
     */
    t.prototype.complete = function() {
        return e(this, void 0, void 0, (function() {
            var t, e, r, i, o;
            return n(this, (function(n) {
                switch (n.label) {
                  case 0:
                    return [ 4 /*yield*/ , pu(this.localStore, new Ps(this.serializer), this.documents, this.ia.id) ];

                  case 1:
                    t = n.sent(), e = this.oa(this.documents), r = 0, i = this.queries, n.label = 2;

                  case 2:
                    return r < i.length ? (o = i[r], [ 4 /*yield*/ , vu(this.localStore, o, e.get(o.name)) ]) : [ 3 /*break*/ , 5 ];

                  case 3:
                    n.sent(), n.label = 4;

                  case 4:
                    return r++, [ 3 /*break*/ , 2 ];

                  case 5:
                    return [ 2 /*return*/ , (this.progress.taskState = "Success", {
                        progress: this.progress,
                        _a: this.collectionGroups,
                        aa: t
                    }) ];
                }
            }));
        }));
    }, t;
}();

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A complete element in the bundle stream, together with the byte length it
 * occupies in the stream.
 */
/**
 * Returns a `LoadBundleTaskProgress` representing the initial progress of
 * loading a bundle.
 */
function Rs(t) {
    return {
        taskState: "Running",
        documentsLoaded: 0,
        bytesLoaded: 0,
        totalDocuments: t.totalDocuments,
        totalBytes: t.totalBytes
    };
}

/**
 * Returns a `LoadBundleTaskProgress` representing the progress that the loading
 * has succeeded.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var Ms = function(t) {
    this.key = t;
}, Fs = function(t) {
    this.key = t;
}, Vs = /** @class */ function() {
    function t(t, 
    /** Documents included in the remote target */
    e) {
        this.query = t, this.ua = e, this.ca = null, this.hasCachedResults = !1, 
        /**
             * A flag whether the view is current with the backend. A view is considered
             * current after it has seen the current flag from the backend and did not
             * lose consistency within the watch stream (e.g. because of an existence
             * filter mismatch).
             */
        this.current = !1, 
        /** Documents in the view but not in the remote target */
        this.la = br(), 
        /** Document Keys that have local changes */
        this.mutatedKeys = br(), this.ha = ur(t), this.Pa = new bs(this.ha);
    }
    return Object.defineProperty(t.prototype, "Ia", {
        /**
         * The set of remote documents that the server has told us belongs to the target associated with
         * this view.
         */
        get: function() {
            return this.ua;
        },
        enumerable: !1,
        configurable: !0
    }), 
    /**
     * Iterates over a set of doc changes, applies the query limit, and computes
     * what the new results should be, what the changes were, and whether we may
     * need to go back to the local cache for more results. Does not make any
     * changes to the view.
     * @param docChanges - The doc changes to apply to this view.
     * @param previousChanges - If this is being called with a refill, then start
     *        with this set of docs and changes instead of the current view.
     * @returns a new set of docs, changes, and refill flag.
     */
    t.prototype.Ta = function(t, e) {
        var n = this, r = e ? e.Ea : new Is, i = e ? e.Pa : this.Pa, o = e ? e.mutatedKeys : this.mutatedKeys, a = i, u = !1, s = "F" /* LimitType.First */ === this.query.limitType && i.size === this.query.limit ? i.last() : null, c = "L" /* LimitType.Last */ === this.query.limitType && i.size === this.query.limit ? i.first() : null;
        // Drop documents out to meet limit/limitToLast requirement.
        if (t.inorderTraversal((function(t, e) {
            var l = i.get(t), h = or(n.query, e) ? e : null, f = !!l && n.mutatedKeys.has(l.key), d = !!h && (h.hasLocalMutations || 
            // We only consider committed mutations for documents that were
            // mutated during the lifetime of the view.
            n.mutatedKeys.has(h.key) && h.hasCommittedMutations), p = !1;
            // Calculate change
            l && h ? l.data.isEqual(h.data) ? f !== d && (r.track({
                type: 3 /* ChangeType.Metadata */ ,
                doc: h
            }), p = !0) : n.da(l, h) || (r.track({
                type: 2 /* ChangeType.Modified */ ,
                doc: h
            }), p = !0, (s && n.ha(h, s) > 0 || c && n.ha(h, c) < 0) && (
            // This doc moved from inside the limit to outside the limit.
            // That means there may be some other doc in the local cache
            // that should be included instead.
            u = !0)) : !l && h ? (r.track({
                type: 0 /* ChangeType.Added */ ,
                doc: h
            }), p = !0) : l && !h && (r.track({
                type: 1 /* ChangeType.Removed */ ,
                doc: l
            }), p = !0, (s || c) && (
            // A doc was removed from a full limit query. We'll need to
            // requery from the local cache to see if we know about some other
            // doc that should be in the results.
            u = !0)), p && (h ? (a = a.add(h), o = d ? o.add(t) : o.delete(t)) : (a = a.delete(t), 
            o = o.delete(t)));
        })), null !== this.query.limit) for (;a.size > this.query.limit; ) {
            var l = "F" /* LimitType.First */ === this.query.limitType ? a.last() : a.first();
            a = a.delete(l.key), o = o.delete(l.key), r.track({
                type: 1 /* ChangeType.Removed */ ,
                doc: l
            });
        }
        return {
            Pa: a,
            Ea: r,
            Xi: u,
            mutatedKeys: o
        };
    }, t.prototype.da = function(t, e) {
        // We suppress the initial change event for documents that were modified as
        // part of a write acknowledgment (e.g. when the value of a server transform
        // is applied) as Watch will send us the same document again.
        // By suppressing the event, we only raise two user visible events (one with
        // `hasPendingWrites` and the final state of the document) instead of three
        // (one with `hasPendingWrites`, the modified document with
        // `hasPendingWrites` and the final state of the document).
        return t.hasLocalMutations && e.hasCommittedMutations && !e.hasLocalMutations;
    }, 
    /**
     * Updates the view with the given ViewDocumentChanges and optionally updates
     * limbo docs and sync state from the provided target change.
     * @param docChanges - The set of changes to make to the view's docs.
     * @param limboResolutionEnabled - Whether to update limbo documents based on
     *        this change.
     * @param targetChange - A target change to apply for computing limbo docs and
     *        sync state.
     * @param targetIsPendingReset - Whether the target is pending to reset due to
     *        existence filter mismatch. If not explicitly specified, it is treated
     *        equivalently to `false`.
     * @returns A new ViewChange with the given docs, changes, and sync state.
     */
    // PORTING NOTE: The iOS/Android clients always compute limbo document changes.
    t.prototype.applyChanges = function(t, e, n, r) {
        var i = this, o = this.Pa;
        this.Pa = t.Pa, this.mutatedKeys = t.mutatedKeys;
        // Sort changes based on type and query comparator
        var a = t.Ea.k_();
        a.sort((function(t, e) {
            return function(t, e) {
                var n = function(t) {
                    switch (t) {
                      case 0 /* ChangeType.Added */ :
                        return 1;

                      case 2 /* ChangeType.Modified */ :
                      case 3 /* ChangeType.Metadata */ :
                        // A metadata change is converted to a modified change at the public
                        // api layer.  Since we sort by document key and then change type,
                        // metadata and modified changes must be sorted equivalently.
                        return 2;

                      case 1 /* ChangeType.Removed */ :
                        return 0;

                      default:
                        return U();
                    }
                };
                return n(t) - n(e);
            }(t.type, e.type) || i.ha(t.doc, e.doc);
        })), this.Aa(n), r = null != r && r;
        var u = e && !r ? this.Ra() : [], s = 0 === this.la.size && this.current && !r ? 1 /* SyncState.Synced */ : 0 /* SyncState.Local */ , c = s !== this.ca;
        // We are at synced state if there is no limbo docs are waiting to be resolved, view is current
        // with the backend, and the query is not pending to reset due to existence filter mismatch.
                return this.ca = s, 0 !== a.length || c ? {
            snapshot: new _s(this.query, t.Pa, o, a, t.mutatedKeys, 0 /* SyncState.Local */ === s, c, 
            /* excludesMetadataChanges= */ !1, !!n && n.resumeToken.approximateByteSize() > 0),
            Va: u
        } : {
            Va: u
        };
        // no changes
        }, 
    /**
     * Applies an OnlineState change to the view, potentially generating a
     * ViewChange if the view's syncState changes as a result.
     */
    t.prototype.G_ = function(t) {
        return this.current && "Offline" /* OnlineState.Offline */ === t ? (
        // If we're offline, set `current` to false and then call applyChanges()
        // to refresh our syncState and generate a ViewChange as appropriate. We
        // are guaranteed to get a new TargetChange that sets `current` back to
        // true once the client is back online.
        this.current = !1, this.applyChanges({
            Pa: this.Pa,
            Ea: new Is,
            mutatedKeys: this.mutatedKeys,
            Xi: !1
        }, 
        /* limboResolutionEnabled= */ !1)) : {
            Va: []
        };
    }, 
    /**
     * Returns whether the doc for the given key should be in limbo.
     */
    t.prototype.ma = function(t) {
        // If the remote end says it's part of this query, it's not in limbo.
        return !this.ua.has(t) && 
        // The local store doesn't think it's a result, so it shouldn't be in limbo.
        !!this.Pa.has(t) && !this.Pa.get(t).hasLocalMutations;
    }, 
    /**
     * Updates syncedDocuments, current, and limbo docs based on the given change.
     * Returns the list of changes to which docs are in limbo.
     */
    t.prototype.Aa = function(t) {
        var e = this;
        t && (t.addedDocuments.forEach((function(t) {
            return e.ua = e.ua.add(t);
        })), t.modifiedDocuments.forEach((function(t) {})), t.removedDocuments.forEach((function(t) {
            return e.ua = e.ua.delete(t);
        })), this.current = t.current);
    }, t.prototype.Ra = function() {
        var t = this;
        // We can only determine limbo documents when we're in-sync with the server.
                if (!this.current) return [];
        // TODO(klimt): Do this incrementally so that it's not quadratic when
        // updating many documents.
                var e = this.la;
        this.la = br(), this.Pa.forEach((function(e) {
            t.ma(e.key) && (t.la = t.la.add(e.key));
        }));
        // Diff the new limbo docs with the old limbo docs.
        var n = [];
        return e.forEach((function(e) {
            t.la.has(e) || n.push(new Fs(e));
        })), this.la.forEach((function(t) {
            e.has(t) || n.push(new Ms(t));
        })), n;
    }, 
    /**
     * Update the in-memory state of the current view with the state read from
     * persistence.
     *
     * We update the query view whenever a client's primary status changes:
     * - When a client transitions from primary to secondary, it can miss
     *   LocalStorage updates and its query views may temporarily not be
     *   synchronized with the state on disk.
     * - For secondary to primary transitions, the client needs to update the list
     *   of `syncedDocuments` since secondary clients update their query views
     *   based purely on synthesized RemoteEvents.
     *
     * @param queryResult.documents - The documents that match the query according
     * to the LocalStore.
     * @param queryResult.remoteKeys - The keys of the documents that match the
     * query according to the backend.
     *
     * @returns The ViewChange that resulted from this synchronization.
     */
    // PORTING NOTE: Multi-tab only.
    t.prototype.fa = function(t) {
        this.ua = t.hs, this.la = br();
        var e = this.Ta(t.documents);
        return this.applyChanges(e, /* limboResolutionEnabled= */ !0);
    }, 
    /**
     * Returns a view snapshot as if this query was just listened to. Contains
     * a document add for every existing document and the `fromCache` and
     * `hasPendingWrites` status of the already established view.
     */
    // PORTING NOTE: Multi-tab only.
    t.prototype.ga = function() {
        return _s.fromInitialDocuments(this.query, this.Pa, this.mutatedKeys, 0 /* SyncState.Local */ === this.ca, this.hasCachedResults);
    }, t;
}(), Ls = function(
/**
     * The query itself.
     */
t, 
/**
     * The target number created by the client that is used in the watch
     * stream to identify this query.
     */
e, 
/**
     * The view is responsible for computing the final merged truth of what
     * docs are in the query. It gets notified of local and remote changes,
     * and applies the query filters and limits to determine the most correct
     * possible results.
     */
n) {
    this.query = t, this.targetId = e, this.view = n;
}, qs = function(t) {
    this.key = t, 
    /**
             * Set to true once we've received a document. This is used in
             * getRemoteKeysForTarget() and ultimately used by WatchChangeAggregator to
             * decide whether it needs to manufacture a delete event for the target once
             * the target is CURRENT.
             */
    this.pa = !1;
}, Us = /** @class */ function() {
    function t(t, e, n, 
    // PORTING NOTE: Manages state synchronization in multi-tab environments.
    r, i, o) {
        this.localStore = t, this.remoteStore = e, this.eventManager = n, this.sharedClientState = r, 
        this.currentUser = i, this.maxConcurrentLimboResolutions = o, this.ya = {}, this.wa = new cr((function(t) {
            return rr(t);
        }), nr), this.Sa = new Map, 
        /**
             * The keys of documents that are in limbo for which we haven't yet started a
             * limbo resolution query. The strings in this set are the result of calling
             * `key.path.canonicalString()` where `key` is a `DocumentKey` object.
             *
             * The `Set` type was chosen because it provides efficient lookup and removal
             * of arbitrary elements and it also maintains insertion order, providing the
             * desired queue-like FIFO semantics.
             */
        this.ba = new Set, 
        /**
             * Keeps track of the target ID for each document that is in limbo with an
             * active target.
             */
        this.Da = new Ee(dt.comparator), 
        /**
             * Keeps track of the information about an active limbo resolution for each
             * active target ID that was started for the purpose of limbo resolution.
             */
        this.Ca = new Map, this.va = new Ra, 
        /** Stores user completion handlers, indexed by User and BatchId. */
        this.Fa = {}, 
        /** Stores user callbacks waiting for all pending writes to be acknowledged. */
        this.Ma = new Map, this.xa = ca.Ln(), this.onlineState = "Unknown" /* OnlineState.Unknown */ , 
        // The primary state is set to `true` or `false` immediately after Firestore
        // startup. In the interim, a client should only be considered primary if
        // `isPrimary` is true.
        this.Oa = void 0;
    }
    return Object.defineProperty(t.prototype, "isPrimaryClient", {
        get: function() {
            return !0 === this.Oa;
        },
        enumerable: !1,
        configurable: !0
    }), t;
}();

/**
 * Initiates the new listen, resolves promise when listen enqueued to the
 * server. All the subsequent view snapshots or errors are sent to the
 * subscribed handlers. Returns the initial snapshot.
 */
function Bs(t, r, i) {
    return void 0 === i && (i = !0), e(this, void 0, void 0, (function() {
        var e, o, a;
        return n(this, (function(n) {
            switch (n.label) {
              case 0:
                return e = wc(t), (a = e.wa.get(r)) ? (
                // PORTING NOTE: With Multi-Tab Web, it is possible that a query view
                // already exists when EventManager calls us for the first time. This
                // happens when the primary tab is already listening to this query on
                // behalf of another tab and the user of the primary also starts listening
                // to the query. EventManager will not have an assigned target ID in this
                // case and calls `listen` to obtain this ID.
                e.sharedClientState.addLocalQueryTarget(a.targetId), o = a.view.ga(), [ 3 /*break*/ , 3 ]) : [ 3 /*break*/ , 1 ];

              case 1:
                return [ 4 /*yield*/ , Gs(e, r, i, 
                /** shouldInitializeView= */ !0) ];

              case 2:
                o = n.sent(), n.label = 3;

              case 3:
                return [ 2 /*return*/ , o ];
            }
        }));
    }));
}

/** Query has been listening to the cache, and tries to initiate the remote store listen */ function zs(t, r) {
    return e(this, void 0, void 0, (function() {
        return n(this, (function(e) {
            switch (e.label) {
              case 0:
                return [ 4 /*yield*/ , Gs(wc(t), r, 
                /** shouldListenToRemote= */ !0, 
                /** shouldInitializeView= */ !1) ];

              case 1:
                return e.sent(), [ 2 /*return*/ ];
            }
        }));
    }));
}

function Gs(t, r, i, o) {
    return e(this, void 0, void 0, (function() {
        var e, a, u, s;
        return n(this, (function(n) {
            switch (n.label) {
              case 0:
                return [ 4 /*yield*/ , su(t.localStore, Zn(r)) ];

              case 1:
                return e = n.sent(), a = e.targetId, u = i ? t.sharedClientState.addLocalQueryTarget(a) : "not-current", 
                o ? [ 4 /*yield*/ , Ks(t, r, a, "current" === u, e.resumeToken) ] : [ 3 /*break*/ , 3 ];

              case 2:
                s = n.sent(), n.label = 3;

              case 3:
                return [ 2 /*return*/ , (t.isPrimaryClient && i && Qu(t.remoteStore, e), s) ];
            }
        }));
    }));
}

/**
 * Registers a view for a previously unknown query and computes its initial
 * snapshot.
 */ function Ks(t, r, i, o, a) {
    return e(this, void 0, void 0, (function() {
        var u, s, c, l, h, f;
        return n(this, (function(d) {
            switch (d.label) {
              case 0:
                // PORTING NOTE: On Web only, we inject the code that registers new Limbo
                // targets based on view changes. This allows us to only depend on Limbo
                // changes when user code includes queries.
                return t.Na = function(r, i, o) {
                    return function(t, r, i, o) {
                        return e(this, void 0, void 0, (function() {
                            var e, a, u, s;
                            return n(this, (function(n) {
                                switch (n.label) {
                                  case 0:
                                    return e = r.view.Ta(i), e.Xi ? [ 4 /*yield*/ , lu(t.localStore, r.query, 
                                    /* usePreviousResults= */ !1).then((function(t) {
                                        var n = t.documents;
                                        return r.view.Ta(n, e);
                                    })) ] : [ 3 /*break*/ , 2 ];

                                  case 1:
                                    // The query has a limit and some docs were removed, so we need
                                    // to re-run the query against the local store to make sure we
                                    // didn't lose any good docs that had been past the limit.
                                    e = n.sent(), n.label = 2;

                                  case 2:
                                    return a = o && o.targetChanges.get(r.targetId), u = o && null != o.targetMismatches.get(r.targetId), 
                                    s = r.view.applyChanges(e, 
                                    /* limboResolutionEnabled= */ t.isPrimaryClient, a, u), [ 2 /*return*/ , (ic(t, r.targetId, s.Va), 
                                    s.snapshot) ];
                                }
                            }));
                        }));
                    }(t, r, i, o);
                }, [ 4 /*yield*/ , lu(t.localStore, r, 
                /* usePreviousResults= */ !0) ];

              case 1:
                return u = d.sent(), s = new Vs(r, u.hs), c = s.Ta(u.documents), l = gi.createSynthesizedTargetChangeForCurrentChange(i, o && "Offline" /* OnlineState.Offline */ !== t.onlineState, a), 
                h = s.applyChanges(c, 
                /* limboResolutionEnabled= */ t.isPrimaryClient, l), ic(t, i, h.Va), f = new Ls(r, i, s), 
                [ 2 /*return*/ , (t.wa.set(r, f), t.Sa.has(i) ? t.Sa.get(i).push(r) : t.Sa.set(i, [ r ]), 
                h.snapshot) ];
            }
        }));
    }));
}

/** Stops listening to the query. */ function js(t, r, i) {
    return e(this, void 0, void 0, (function() {
        var e, o, a;
        return n(this, (function(n) {
            switch (n.label) {
              case 0:
                return e = G(t), o = e.wa.get(r), (a = e.Sa.get(o.targetId)).length > 1 ? [ 2 /*return*/ , (e.Sa.set(o.targetId, a.filter((function(t) {
                    return !nr(t, r);
                }))), void e.wa.delete(r)) ] : e.isPrimaryClient ? (
                // We need to remove the local query target first to allow us to verify
                // whether any other client is still interested in this target.
                e.sharedClientState.removeLocalQueryTarget(o.targetId), e.sharedClientState.isActiveQueryTarget(o.targetId) ? [ 3 /*break*/ , 2 ] : [ 4 /*yield*/ , cu(e.localStore, o.targetId, 
                /*keepPersistedTargetData=*/ !1).then((function() {
                    e.sharedClientState.clearQueryState(o.targetId), i && Wu(e.remoteStore, o.targetId), 
                    nc(e, o.targetId);
                })).catch(Ct) ]) : [ 3 /*break*/ , 3 ];

              case 1:
                n.sent(), n.label = 2;

              case 2:
                return [ 3 /*break*/ , 5 ];

              case 3:
                return nc(e, o.targetId), [ 4 /*yield*/ , cu(e.localStore, o.targetId, 
                /*keepPersistedTargetData=*/ !0) ];

              case 4:
                n.sent(), n.label = 5;

              case 5:
                return [ 2 /*return*/ ];
            }
        }));
    }));
}

/** Unlistens to the remote store while still listening to the cache. */ function Qs(t, r) {
    return e(this, void 0, void 0, (function() {
        var e, i, o;
        return n(this, (function(n) {
            return e = G(t), i = e.wa.get(r), o = e.Sa.get(i.targetId), e.isPrimaryClient && 1 === o.length && (
            // PORTING NOTE: Unregister the target ID with local Firestore client as
            // watch target.
            e.sharedClientState.removeLocalQueryTarget(i.targetId), Wu(e.remoteStore, i.targetId)), 
            [ 2 /*return*/ ];
        }));
    }));
}

/**
 * Initiates the write of local mutation batch which involves adding the
 * writes to the mutation queue, notifying the remote store about new
 * mutations and raising events for any changes this write caused.
 *
 * The promise returned by this call is resolved when the above steps
 * have completed, *not* when the write was acked by the backend. The
 * userCallback is resolved once the write was acked/rejected by the
 * backend (or failed locally for any other reason).
 */ function Ws(t, r, i) {
    return e(this, void 0, void 0, (function() {
        var e, o, a, u;
        return n(this, (function(n) {
            switch (n.label) {
              case 0:
                e = bc(t), n.label = 1;

              case 1:
                return n.trys.push([ 1, 5, , 6 ]), [ 4 /*yield*/ , function(t, e) {
                    var n, r, i = G(t), o = ut.now(), a = e.reduce((function(t, e) {
                        return t.add(e.key);
                    }), br());
                    return i.persistence.runTransaction("Locally write mutations", "readwrite", (function(t) {
                        // Figure out which keys do not have a remote version in the cache, this
                        // is needed to create the right overlay mutation: if no remote version
                        // presents, we do not need to create overlays as patch mutations.
                        // TODO(Overlay): Is there a better way to determine this? Using the
                        //  document version does not work because local mutations set them back
                        //  to 0.
                        var u = hr(), s = br();
                        return i.os.getEntries(t, a).next((function(t) {
                            (u = t).forEach((function(t, e) {
                                e.isValidDocument() || (s = s.add(t));
                            }));
                        })).next((function() {
                            return i.localDocuments.getOverlayedDocuments(t, u);
                        })).next((function(r) {
                            n = r;
                            for (
                            // For non-idempotent mutations (such as `FieldValue.increment()`),
                            // we record the base state in a separate patch mutation. This is
                            // later used to guarantee consistent values and prevents flicker
                            // even if the backend sends us an update that already includes our
                            // transform.
                            var a = [], u = 0, s = e; u < s.length; u++) {
                                var c = s[u], l = Qr(c, n.get(c.key).overlayedDocument);
                                null != l && 
                                // NOTE: The base state should only be applied if there's some
                                // existing document to override, so use a Precondition of
                                // exists=true
                                a.push(new Hr(c.key, l, fn(l.value.mapValue), Ur.exists(!0)));
                            }
                            return i.mutationQueue.addMutationBatch(t, o, a, e);
                        })).next((function(e) {
                            r = e;
                            var o = e.applyToLocalDocumentSet(n, s);
                            return i.documentOverlayCache.saveOverlays(t, e.batchId, o);
                        }));
                    })).then((function() {
                        return {
                            batchId: r.batchId,
                            changes: pr(n)
                        };
                    }));
                }(e.localStore, r) ];

              case 2:
                return o = n.sent(), e.sharedClientState.addPendingMutation(o.batchId), function(t, e, n) {
                    var r = t.Fa[t.currentUser.toKey()];
                    r || (r = new Ee(it)), r = r.insert(e, n), t.Fa[t.currentUser.toKey()] = r;
                }(e, o.batchId, i), [ 4 /*yield*/ , uc(e, o.changes) ];

              case 3:
                return n.sent(), [ 4 /*yield*/ , os(e.remoteStore) ];

              case 4:
                return n.sent(), [ 3 /*break*/ , 6 ];

              case 5:
                return a = n.sent(), u = ys(a, "Failed to persist write"), i.reject(u), [ 3 /*break*/ , 6 ];

              case 6:
                return [ 2 /*return*/ ];
            }
        }));
    }));
}

/**
 * Applies one remote event to the sync engine, notifying any views of the
 * changes, and releasing any pending mutation batches that would become
 * visible because of the snapshot version the remote event contains.
 */ function Ys(t, r) {
    return e(this, void 0, void 0, (function() {
        var e, i;
        return n(this, (function(n) {
            switch (n.label) {
              case 0:
                e = G(t), n.label = 1;

              case 1:
                return n.trys.push([ 1, 4, , 6 ]), [ 4 /*yield*/ , ou(e.localStore, r) ];

              case 2:
                return i = n.sent(), 
                // Update `receivedDocument` as appropriate for any limbo targets.
                r.targetChanges.forEach((function(t, n) {
                    var r = e.Ca.get(n);
                    r && (
                    // Since this is a limbo resolution lookup, it's for a single document
                    // and it could be added, modified, or removed, but not a combination.
                    B(t.addedDocuments.size + t.modifiedDocuments.size + t.removedDocuments.size <= 1), 
                    t.addedDocuments.size > 0 ? r.pa = !0 : t.modifiedDocuments.size > 0 ? B(r.pa) : t.removedDocuments.size > 0 && (B(r.pa), 
                    r.pa = !1));
                })), [ 4 /*yield*/ , uc(e, i, r) ];

              case 3:
                // Update `receivedDocument` as appropriate for any limbo targets.
                return n.sent(), [ 3 /*break*/ , 6 ];

              case 4:
                return [ 4 /*yield*/ , Ct(n.sent()) ];

              case 5:
                return n.sent(), [ 3 /*break*/ , 6 ];

              case 6:
                return [ 2 /*return*/ ];
            }
        }));
    }));
}

/**
 * Applies an OnlineState change to the sync engine and notifies any views of
 * the change.
 */ function Hs(t, e, n) {
    var r = G(t);
    // If we are the secondary client, we explicitly ignore the remote store's
    // online state (the local client may go offline, even though the primary
    // tab remains online) and only apply the primary tab's online state from
    // SharedClientState.
        if (r.isPrimaryClient && 0 /* OnlineStateSource.RemoteStore */ === n || !r.isPrimaryClient && 1 /* OnlineStateSource.SharedClientState */ === n) {
        var i = [];
        r.wa.forEach((function(t, n) {
            var r = n.view.G_(e);
            r.snapshot && i.push(r.snapshot);
        })), function(t, e) {
            var n = G(t);
            n.onlineState = e;
            var r = !1;
            n.queries.forEach((function(t, n) {
                for (var i = 0, o = n.Q_; i < o.length; i++) {
                    // Run global snapshot listeners if a consistent snapshot has been emitted.
                    o[i].G_(e) && (r = !0);
                }
            })), r && Ns(n);
        }(r.eventManager, e), i.length && r.ya.u_(i), r.onlineState = e, r.isPrimaryClient && r.sharedClientState.setOnlineState(e);
    }
}

/**
 * Rejects the listen for the given targetID. This can be triggered by the
 * backend for any active target.
 *
 * @param syncEngine - The sync engine implementation.
 * @param targetId - The targetID corresponds to one previously initiated by the
 * user as part of TargetData passed to listen() on RemoteStore.
 * @param err - A description of the condition that has forced the rejection.
 * Nearly always this will be an indication that the user is no longer
 * authorized to see the data matching the target.
 */ function Js(t, r, i) {
    return e(this, void 0, void 0, (function() {
        var e, o, a, u, s, c;
        return n(this, (function(n) {
            switch (n.label) {
              case 0:
                // PORTING NOTE: Multi-tab only.
                return (e = G(t)).sharedClientState.updateQueryState(r, "rejected", i), o = e.Ca.get(r), 
                (a = o && o.key) ? (
                // TODO(b/217189216): This limbo document should ideally have a read time,
                // so that it is picked up by any read-time based scans. The backend,
                // however, does not send a read time for target removals.
                u = (u = new Ee(dt.comparator)).insert(a, dn.newNoDocument(a, st.min())), s = br().add(a), 
                c = new yi(st.min(), 
                /* targetChanges= */ new Map, 
                /* targetMismatches= */ new Ee(it), u, s), [ 4 /*yield*/ , Ys(e, c) ]) : [ 3 /*break*/ , 2 ];

              case 1:
                return n.sent(), 
                // Since this query failed, we won't want to manually unlisten to it.
                // We only remove it from bookkeeping after we successfully applied the
                // RemoteEvent. If `applyRemoteEvent()` throws, we want to re-listen to
                // this query when the RemoteStore restarts the Watch stream, which should
                // re-trigger the target failure.
                e.Da = e.Da.remove(a), e.Ca.delete(r), ac(e), [ 3 /*break*/ , 4 ];

              case 2:
                return [ 4 /*yield*/ , cu(e.localStore, r, 
                /* keepPersistedTargetData */ !1).then((function() {
                    return nc(e, r, i);
                })).catch(Ct) ];

              case 3:
                n.sent(), n.label = 4;

              case 4:
                return [ 2 /*return*/ ];
            }
        }));
    }));
}

function Xs(t, r) {
    return e(this, void 0, void 0, (function() {
        var e, i, o;
        return n(this, (function(n) {
            switch (n.label) {
              case 0:
                e = G(t), i = r.batch.batchId, n.label = 1;

              case 1:
                return n.trys.push([ 1, 4, , 6 ]), [ 4 /*yield*/ , ru(e.localStore, r) ];

              case 2:
                return o = n.sent(), 
                // The local store may or may not be able to apply the write result and
                // raise events immediately (depending on whether the watcher is caught
                // up), so we raise user callbacks first so that they consistently happen
                // before listen events.
                ec(e, i, /*error=*/ null), tc(e, i), e.sharedClientState.updateMutationState(i, "acknowledged"), 
                [ 4 /*yield*/ , uc(e, o) ];

              case 3:
                // The local store may or may not be able to apply the write result and
                // raise events immediately (depending on whether the watcher is caught
                // up), so we raise user callbacks first so that they consistently happen
                // before listen events.
                return n.sent(), [ 3 /*break*/ , 6 ];

              case 4:
                return [ 4 /*yield*/ , Ct(n.sent()) ];

              case 5:
                return n.sent(), [ 3 /*break*/ , 6 ];

              case 6:
                return [ 2 /*return*/ ];
            }
        }));
    }));
}

function Zs(t, r, i) {
    return e(this, void 0, void 0, (function() {
        var e, o;
        return n(this, (function(n) {
            switch (n.label) {
              case 0:
                e = G(t), n.label = 1;

              case 1:
                return n.trys.push([ 1, 4, , 6 ]), [ 4 /*yield*/ , function(t, e) {
                    var n = G(t);
                    return n.persistence.runTransaction("Reject batch", "readwrite-primary", (function(t) {
                        var r;
                        return n.mutationQueue.lookupMutationBatch(t, e).next((function(e) {
                            return B(null !== e), r = e.keys(), n.mutationQueue.removeMutationBatch(t, e);
                        })).next((function() {
                            return n.mutationQueue.performConsistencyCheck(t);
                        })).next((function() {
                            return n.documentOverlayCache.removeOverlaysForBatchId(t, r, e);
                        })).next((function() {
                            return n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(t, r);
                        })).next((function() {
                            return n.localDocuments.getDocuments(t, r);
                        }));
                    }));
                }(e.localStore, r) ];

              case 2:
                return o = n.sent(), 
                // The local store may or may not be able to apply the write result and
                // raise events immediately (depending on whether the watcher is caught up),
                // so we raise user callbacks first so that they consistently happen before
                // listen events.
                ec(e, r, i), tc(e, r), e.sharedClientState.updateMutationState(r, "rejected", i), 
                [ 4 /*yield*/ , uc(e, o) ];

              case 3:
                // The local store may or may not be able to apply the write result and
                // raise events immediately (depending on whether the watcher is caught up),
                // so we raise user callbacks first so that they consistently happen before
                // listen events.
                return n.sent(), [ 3 /*break*/ , 6 ];

              case 4:
                return [ 4 /*yield*/ , Ct(n.sent()) ];

              case 5:
                return n.sent(), [ 3 /*break*/ , 6 ];

              case 6:
                return [ 2 /*return*/ ];
            }
        }));
    }));
}

/**
 * Registers a user callback that resolves when all pending mutations at the moment of calling
 * are acknowledged .
 */ function $s(t, r) {
    return e(this, void 0, void 0, (function() {
        var e, i, o, a, u;
        return n(this, (function(n) {
            switch (n.label) {
              case 0:
                Zu((e = G(t)).remoteStore) || F("SyncEngine", "The network is disabled. The task returned by 'awaitPendingWrites()' will not complete until the network is enabled."), 
                n.label = 1;

              case 1:
                return n.trys.push([ 1, 3, , 4 ]), [ 4 /*yield*/ , function(t) {
                    var e = G(t);
                    return e.persistence.runTransaction("Get highest unacknowledged batch id", "readonly", (function(t) {
                        return e.mutationQueue.getHighestUnacknowledgedBatchId(t);
                    }));
                }(e.localStore) ];

              case 2:
                return -1 === (i = n.sent()) ? [ 2 /*return*/ , void r.resolve() ] : ((o = e.Ma.get(i) || []).push(r), 
                e.Ma.set(i, o), [ 3 /*break*/ , 4 ]);

              case 3:
                return a = n.sent(), u = ys(a, "Initialization of waitForPendingWrites() operation failed"), 
                r.reject(u), [ 3 /*break*/ , 4 ];

              case 4:
                return [ 2 /*return*/ ];
            }
        }));
    }));
}

/**
 * Triggers the callbacks that are waiting for this batch id to get acknowledged by server,
 * if there are any.
 */ function tc(t, e) {
    (t.Ma.get(e) || []).forEach((function(t) {
        t.resolve();
    })), t.Ma.delete(e)
    /** Reject all outstanding callbacks waiting for pending writes to complete. */;
}

function ec(t, e, n) {
    var r = G(t), i = r.Fa[r.currentUser.toKey()];
    // NOTE: Mutations restored from persistence won't have callbacks, so it's
    // okay for there to be no callback for this ID.
    if (i) {
        var o = i.get(e);
        o && (n ? o.reject(n) : o.resolve(), i = i.remove(e)), r.Fa[r.currentUser.toKey()] = i;
    }
}

function nc(t, e, n) {
    void 0 === n && (n = null), t.sharedClientState.removeLocalQueryTarget(e);
    for (var r = 0, i = t.Sa.get(e); r < i.length; r++) {
        var o = i[r];
        t.wa.delete(o), n && t.ya.La(o, n);
    }
    t.Sa.delete(e), t.isPrimaryClient && t.va.Vr(e).forEach((function(e) {
        t.va.containsKey(e) || 
        // We removed the last reference for this key
        rc(t, e);
    }));
}

function rc(t, e) {
    t.ba.delete(e.path.canonicalString());
    // It's possible that the target already got removed because the query failed. In that case,
    // the key won't exist in `limboTargetsByKey`. Only do the cleanup if we still have the target.
    var n = t.Da.get(e);
    null !== n && (Wu(t.remoteStore, n), t.Da = t.Da.remove(e), t.Ca.delete(n), ac(t));
}

function ic(t, e, n) {
    for (var r = 0, i = n; r < i.length; r++) {
        var o = i[r];
        o instanceof Ms ? (t.va.addReference(o.key, e), oc(t, o)) : o instanceof Fs ? (F("SyncEngine", "Document no longer in limbo: " + o.key), 
        t.va.removeReference(o.key, e), t.va.containsKey(o.key) || 
        // We removed the last reference for this key
        rc(t, o.key)) : U();
    }
}

function oc(t, e) {
    var n = e.key, r = n.path.canonicalString();
    t.Da.get(n) || t.ba.has(r) || (F("SyncEngine", "New document in limbo: " + n), t.ba.add(r), 
    ac(t));
}

/**
 * Starts listens for documents in limbo that are enqueued for resolution,
 * subject to a maximum number of concurrent resolutions.
 *
 * Without bounding the number of concurrent resolutions, the server can fail
 * with "resource exhausted" errors which can lead to pathological client
 * behavior as seen in https://github.com/firebase/firebase-js-sdk/issues/2683.
 */ function ac(t) {
    for (;t.ba.size > 0 && t.Da.size < t.maxConcurrentLimboResolutions; ) {
        var e = t.ba.values().next().value;
        t.ba.delete(e);
        var n = new dt(lt.fromString(e)), r = t.xa.next();
        t.Ca.set(r, new qs(n)), t.Da = t.Da.insert(n, r), Qu(t.remoteStore, new ao(Zn(Yn(n.path)), r, "TargetPurposeLimboResolution" /* TargetPurpose.LimboResolution */ , Ut._e));
    }
}

function uc(t, r, i) {
    return e(this, void 0, void 0, (function() {
        var o, a, u, s;
        return n(this, (function(c) {
            switch (c.label) {
              case 0:
                return o = G(t), a = [], u = [], s = [], o.wa.isEmpty() ? [ 3 /*break*/ , 3 ] : (o.wa.forEach((function(t, e) {
                    s.push(o.Na(e, r, i).then((function(t) {
                        // Update views if there are actual changes.
                        if (
                        // If there are changes, or we are handling a global snapshot, notify
                        // secondary clients to update query state.
                        (t || i) && o.isPrimaryClient && o.sharedClientState.updateQueryState(e.targetId, (null == t ? void 0 : t.fromCache) ? "not-current" : "current"), 
                        t) {
                            a.push(t);
                            var n = Xa.Ki(e.targetId, t);
                            u.push(n);
                        }
                    })));
                })), [ 4 /*yield*/ , Promise.all(s) ]);

              case 1:
                return c.sent(), o.ya.u_(a), [ 4 /*yield*/ , function(t, r) {
                    return e(this, void 0, void 0, (function() {
                        var e, i, o, a, u, s, c, l, h;
                        return n(this, (function(n) {
                            switch (n.label) {
                              case 0:
                                e = G(t), n.label = 1;

                              case 1:
                                return n.trys.push([ 1, 3, , 4 ]), [ 4 /*yield*/ , e.persistence.runTransaction("notifyLocalViewChanges", "readwrite", (function(t) {
                                    return Dt.forEach(r, (function(n) {
                                        return Dt.forEach(n.qi, (function(r) {
                                            return e.persistence.referenceDelegate.addReference(t, n.targetId, r);
                                        })).next((function() {
                                            return Dt.forEach(n.Qi, (function(r) {
                                                return e.persistence.referenceDelegate.removeReference(t, n.targetId, r);
                                            }));
                                        }));
                                    }));
                                })) ];

                              case 2:
                                return n.sent(), [ 3 /*break*/ , 4 ];

                              case 3:
                                if (!Ot(i = n.sent())) throw i;
                                // If `notifyLocalViewChanges` fails, we did not advance the sequence
                                // number for the documents that were included in this transaction.
                                // This might trigger them to be deleted earlier than they otherwise
                                // would have, but it should not invalidate the integrity of the data.
                                                                return F("LocalStore", "Failed to update sequence numbers: " + i), 
                                [ 3 /*break*/ , 4 ];

                              case 4:
                                for (o = 0, a = r; o < a.length; o++) u = a[o], s = u.targetId, u.fromCache || (c = e.ns.get(s), 
                                l = c.snapshotVersion, h = c.withLastLimboFreeSnapshotVersion(l), 
                                // Advance the last limbo free snapshot version
                                e.ns = e.ns.insert(s, h));
                                return [ 2 /*return*/ ];
                            }
                        }));
                    }));
                }(o.localStore, u) ];

              case 2:
                c.sent(), c.label = 3;

              case 3:
                return [ 2 /*return*/ ];
            }
        }));
    }));
}

function sc(t, r) {
    return e(this, void 0, void 0, (function() {
        var e, i;
        return n(this, (function(n) {
            switch (n.label) {
              case 0:
                return (e = G(t)).currentUser.isEqual(r) ? [ 3 /*break*/ , 3 ] : (F("SyncEngine", "User change. New user:", r.toKey()), 
                [ 4 /*yield*/ , nu(e.localStore, r) ]);

              case 1:
                return i = n.sent(), e.currentUser = r, 
                // Fails tasks waiting for pending writes requested by previous user.
                function(t, e) {
                    t.Ma.forEach((function(t) {
                        t.forEach((function(t) {
                            t.reject(new j(K.CANCELLED, e));
                        }));
                    })), t.Ma.clear();
                }(e, "'waitForPendingWrites' promise is rejected due to a user change."), 
                // TODO(b/114226417): Consider calling this only in the primary tab.
                e.sharedClientState.handleUserChange(r, i.removedBatchIds, i.addedBatchIds), [ 4 /*yield*/ , uc(e, i.us) ];

              case 2:
                n.sent(), n.label = 3;

              case 3:
                return [ 2 /*return*/ ];
            }
        }));
    }));
}

function cc(t, e) {
    var n = G(t), r = n.Ca.get(e);
    if (r && r.pa) return br().add(r.key);
    var i = br(), o = n.Sa.get(e);
    if (!o) return i;
    for (var a = 0, u = o; a < u.length; a++) {
        var s = u[a], c = n.wa.get(s);
        i = i.unionWith(c.view.Ia);
    }
    return i;
}

/**
 * Reconcile the list of synced documents in an existing view with those
 * from persistence.
 */ function lc(t, r) {
    return e(this, void 0, void 0, (function() {
        var e, i, o;
        return n(this, (function(n) {
            switch (n.label) {
              case 0:
                return [ 4 /*yield*/ , lu((e = G(t)).localStore, r.query, 
                /* usePreviousResults= */ !0) ];

              case 1:
                return i = n.sent(), o = r.view.fa(i), [ 2 /*return*/ , (e.isPrimaryClient && ic(e, r.targetId, o.Va), 
                o) ];
            }
        }));
    }));
}

/**
 * Retrieves newly changed documents from remote document cache and raises
 * snapshots if needed.
 */
// PORTING NOTE: Multi-Tab only.
function hc(t, r) {
    return e(this, void 0, void 0, (function() {
        var e;
        return n(this, (function(n) {
            return [ 2 /*return*/ , fu((e = G(t)).localStore, r).then((function(t) {
                return uc(e, t);
            })) ];
        }));
    }));
}

/** Applies a mutation state to an existing batch.  */
// PORTING NOTE: Multi-Tab only.
function fc(t, r, i, o) {
    return e(this, void 0, void 0, (function() {
        var e, a;
        return n(this, (function(n) {
            switch (n.label) {
              case 0:
                return [ 4 /*yield*/ , function(t, e) {
                    var n = G(t), r = G(n.mutationQueue);
                    return n.persistence.runTransaction("Lookup mutation documents", "readonly", (function(t) {
                        return r.vn(t, e).next((function(e) {
                            return e ? n.localDocuments.getDocuments(t, e) : Dt.resolve(null);
                        }));
                    }));
                }((e = G(t)).localStore, r) ];

              case 1:
                return null === (a = n.sent()) ? [ 3 /*break*/ , 6 ] : "pending" !== i ? [ 3 /*break*/ , 3 ] : [ 4 /*yield*/ , os(e.remoteStore) ];

              case 2:
                // If we are the primary client, we need to send this write to the
                // backend. Secondary clients will ignore these writes since their remote
                // connection is disabled.
                return n.sent(), [ 3 /*break*/ , 4 ];

              case 3:
                "acknowledged" === i || "rejected" === i ? (
                // NOTE: Both these methods are no-ops for batches that originated from
                // other clients.
                ec(e, r, o || null), tc(e, r), function(t, e) {
                    G(G(t).mutationQueue).Mn(e);
                }(e.localStore, r)) : U(), n.label = 4;

              case 4:
                return [ 4 /*yield*/ , uc(e, a) ];

              case 5:
                return n.sent(), [ 3 /*break*/ , 7 ];

              case 6:
                // A throttled tab may not have seen the mutation before it was completed
                // and removed from the mutation queue, in which case we won't have cached
                // the affected documents. In this case we can safely ignore the update
                // since that means we didn't apply the mutation locally at all (if we
                // had, we would have cached the affected documents), and so we will just
                // see any resulting document changes via normal remote document updates
                // as applicable.
                F("SyncEngine", "Cannot apply mutation batch with id: " + r), n.label = 7;

              case 7:
                return [ 2 /*return*/ ];
            }
        }));
    }));
}

/** Applies a query target change from a different tab. */
// PORTING NOTE: Multi-Tab only.
function dc(t, r) {
    return e(this, void 0, void 0, (function() {
        var e, i, o, a, u, s, c, l;
        return n(this, (function(n) {
            switch (n.label) {
              case 0:
                return wc(e = G(t)), bc(e), !0 !== r || !0 === e.Oa ? [ 3 /*break*/ , 3 ] : (i = e.sharedClientState.getAllActiveQueryTargets(), 
                [ 4 /*yield*/ , pc(e, i.toArray()) ]);

              case 1:
                return o = n.sent(), e.Oa = !0, [ 4 /*yield*/ , ds(e.remoteStore, !0) ];

              case 2:
                for (n.sent(), a = 0, u = o; a < u.length; a++) s = u[a], Qu(e.remoteStore, s);
                return [ 3 /*break*/ , 7 ];

              case 3:
                return !1 !== r || !1 === e.Oa ? [ 3 /*break*/ , 7 ] : (c = [], l = Promise.resolve(), 
                e.Sa.forEach((function(t, n) {
                    e.sharedClientState.isLocalQueryTarget(n) ? c.push(n) : l = l.then((function() {
                        return nc(e, n), cu(e.localStore, n, 
                        /*keepPersistedTargetData=*/ !0);
                    })), Wu(e.remoteStore, n);
                })), [ 4 /*yield*/ , l ]);

              case 4:
                return n.sent(), [ 4 /*yield*/ , pc(e, c) ];

              case 5:
                return n.sent(), 
                // PORTING NOTE: Multi-Tab only.
                function(t) {
                    var e = G(t);
                    e.Ca.forEach((function(t, n) {
                        Wu(e.remoteStore, n);
                    })), e.va.mr(), e.Ca = new Map, e.Da = new Ee(dt.comparator);
                }(e), e.Oa = !1, [ 4 /*yield*/ , ds(e.remoteStore, !1) ];

              case 6:
                n.sent(), n.label = 7;

              case 7:
                return [ 2 /*return*/ ];
            }
        }));
    }));
}

function pc(t, r, i) {
    return e(this, void 0, void 0, (function() {
        var e, i, o, a, u, s, c, l, h, f, d, p, v, m;
        return n(this, (function(n) {
            switch (n.label) {
              case 0:
                e = G(t), i = [], o = [], a = 0, u = r, n.label = 1;

              case 1:
                return a < u.length ? (s = u[a], c = void 0, (l = e.Sa.get(s)) && 0 !== l.length ? [ 4 /*yield*/ , su(e.localStore, Zn(l[0])) ] : [ 3 /*break*/ , 7 ]) : [ 3 /*break*/ , 13 ];

              case 2:
                // For queries that have a local View, we fetch their current state
                // from LocalStore (as the resume token and the snapshot version
                // might have changed) and reconcile their views with the persisted
                // state (the list of syncedDocuments may have gotten out of sync).
                c = n.sent(), h = 0, f = l, n.label = 3;

              case 3:
                return h < f.length ? (d = f[h], p = e.wa.get(d), [ 4 /*yield*/ , lc(e, p) ]) : [ 3 /*break*/ , 6 ];

              case 4:
                (v = n.sent()).snapshot && o.push(v.snapshot), n.label = 5;

              case 5:
                return h++, [ 3 /*break*/ , 3 ];

              case 6:
                return [ 3 /*break*/ , 11 ];

              case 7:
                return [ 4 /*yield*/ , hu(e.localStore, s) ];

              case 8:
                return m = n.sent(), [ 4 /*yield*/ , su(e.localStore, m) ];

              case 9:
                return c = n.sent(), [ 4 /*yield*/ , Ks(e, vc(m), s, 
                /*current=*/ !1, c.resumeToken) ];

              case 10:
                n.sent(), n.label = 11;

              case 11:
                i.push(c), n.label = 12;

              case 12:
                return a++, [ 3 /*break*/ , 1 ];

              case 13:
                return [ 2 /*return*/ , (e.ya.u_(o), i) ];
            }
        }));
    }));
}

/**
 * Creates a `Query` object from the specified `Target`. There is no way to
 * obtain the original `Query`, so we synthesize a `Query` from the `Target`
 * object.
 *
 * The synthesized result might be different from the original `Query`, but
 * since the synthesized `Query` should return the same results as the
 * original one (only the presentation of results might differ), the potential
 * difference will not cause issues.
 */
// PORTING NOTE: Multi-Tab only.
function vc(t) {
    return Wn(t.path, t.collectionGroup, t.orderBy, t.filters, t.limit, "F" /* LimitType.First */ , t.startAt, t.endAt);
}

/** Returns the IDs of the clients that are currently active. */
// PORTING NOTE: Multi-Tab only.
function mc(t) {
    return function(t) {
        return G(G(t).persistence).Bi();
    }(G(t).localStore);
}

/** Applies a query target change from a different tab. */
// PORTING NOTE: Multi-Tab only.
function yc(t, r, i, o) {
    return e(this, void 0, void 0, (function() {
        var e, a, u, s;
        return n(this, (function(n) {
            switch (n.label) {
              case 0:
                if ((e = G(t)).Oa) 
                // If we receive a target state notification via WebStorage, we are
                // either already secondary or another tab has taken the primary lease.
                return [ 2 /*return*/ , void F("SyncEngine", "Ignoring unexpected query state notification.") ];
                if (!((a = e.Sa.get(r)) && a.length > 0)) return [ 3 /*break*/ , 7 ];
                switch (i) {
                  case "current":
                  case "not-current":
                    return [ 3 /*break*/ , 1 ];

                  case "rejected":
                    return [ 3 /*break*/ , 4 ];
                }
                return [ 3 /*break*/ , 6 ];

              case 1:
                return [ 4 /*yield*/ , fu(e.localStore, ar(a[0])) ];

              case 2:
                return u = n.sent(), s = yi.createSynthesizedRemoteEventForCurrentChange(r, "current" === i, Pe.EMPTY_BYTE_STRING), 
                [ 4 /*yield*/ , uc(e, u, s) ];

              case 3:
                return n.sent(), [ 3 /*break*/ , 7 ];

              case 4:
                return [ 4 /*yield*/ , cu(e.localStore, r, 
                /* keepPersistedTargetData */ !0) ];

              case 5:
                return n.sent(), nc(e, r, o), [ 3 /*break*/ , 7 ];

              case 6:
                U(), n.label = 7;

              case 7:
                return [ 2 /*return*/ ];
            }
        }));
    }));
}

/** Adds or removes Watch targets for queries from different tabs. */ function gc(t, r, i) {
    return e(this, void 0, void 0, (function() {
        var e, o, a, u, s, c, l, h, f, d;
        return n(this, (function(p) {
            switch (p.label) {
              case 0:
                if (!(e = wc(t)).Oa) return [ 3 /*break*/ , 10 ];
                o = 0, a = r, p.label = 1;

              case 1:
                return o < a.length ? (u = a[o], e.Sa.has(u) && e.sharedClientState.isActiveQueryTarget(u) ? (F("SyncEngine", "Adding an already active target " + u), 
                [ 3 /*break*/ , 5 ]) : [ 4 /*yield*/ , hu(e.localStore, u) ]) : [ 3 /*break*/ , 6 ];

              case 2:
                return s = p.sent(), [ 4 /*yield*/ , su(e.localStore, s) ];

              case 3:
                return c = p.sent(), [ 4 /*yield*/ , Ks(e, vc(s), c.targetId, 
                /*current=*/ !1, c.resumeToken) ];

              case 4:
                p.sent(), Qu(e.remoteStore, c), p.label = 5;

              case 5:
                return o++, [ 3 /*break*/ , 1 ];

              case 6:
                l = function(t) {
                    return n(this, (function(n) {
                        switch (n.label) {
                          case 0:
                            return e.Sa.has(t) ? [ 4 /*yield*/ , cu(e.localStore, t, 
                            /* keepPersistedTargetData */ !1).then((function() {
                                Wu(e.remoteStore, t), nc(e, t);
                            })).catch(Ct) ] : [ 3 /*break*/ , 2 ];

                            // Release queries that are still active.
                                                      case 1:
                            // Release queries that are still active.
                            n.sent(), n.label = 2;

                          case 2:
                            return [ 2 /*return*/ ];
                        }
                    }));
                }, h = 0, f = i, p.label = 7;

              case 7:
                return h < f.length ? (d = f[h], [ 5 /*yield**/ , l(d) ]) : [ 3 /*break*/ , 10 ];

              case 8:
                p.sent(), p.label = 9;

              case 9:
                return h++, [ 3 /*break*/ , 7 ];

              case 10:
                return [ 2 /*return*/ ];
            }
        }));
    }));
}

function wc(t) {
    var e = G(t);
    return e.remoteStore.remoteSyncer.applyRemoteEvent = Ys.bind(null, e), e.remoteStore.remoteSyncer.getRemoteKeysForTarget = cc.bind(null, e), 
    e.remoteStore.remoteSyncer.rejectListen = Js.bind(null, e), e.ya.u_ = Cs.bind(null, e.eventManager), 
    e.ya.La = Ds.bind(null, e.eventManager), e;
}

function bc(t) {
    var e = G(t);
    return e.remoteStore.remoteSyncer.applySuccessfulWrite = Xs.bind(null, e), e.remoteStore.remoteSyncer.rejectFailedWrite = Zs.bind(null, e), 
    e
    /**
 * Loads a Firestore bundle into the SDK. The returned promise resolves when
 * the bundle finished loading.
 *
 * @param syncEngine - SyncEngine to use.
 * @param bundleReader - Bundle to load into the SDK.
 * @param task - LoadBundleTask used to update the loading progress to public API.
 */;
}

function Ic(t, r, i) {
    var o = G(t);
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
        /** Loads a bundle and returns the list of affected collection groups. */
    (function(t, r, i) {
        return e(this, void 0, void 0, (function() {
            var e, o, a, u, s, c;
            return n(this, (function(n) {
                switch (n.label) {
                  case 0:
                    return n.trys.push([ 0, 14, , 15 ]), [ 4 /*yield*/ , r.getMetadata() ];

                  case 1:
                    return e = n.sent(), [ 4 /*yield*/ , function(t, e) {
                        var n = G(t), r = Ri(e.createTime);
                        return n.persistence.runTransaction("hasNewerBundle", "readonly", (function(t) {
                            return n.$r.getBundleMetadata(t, e.id);
                        })).then((function(t) {
                            return !!t && t.createTime.compareTo(r) >= 0;
                        }));
                    }(t.localStore, e) ];

                  case 2:
                    return n.sent() ? [ 4 /*yield*/ , r.close() ] : [ 3 /*break*/ , 4 ];

                  case 3:
                    return [ 2 /*return*/ , (n.sent(), i._completeWith(function(t) {
                        return {
                            taskState: "Success",
                            documentsLoaded: t.totalDocuments,
                            bytesLoaded: t.totalBytes,
                            totalDocuments: t.totalDocuments,
                            totalBytes: t.totalBytes
                        };
                    }(e)), Promise.resolve(new Set)) ];

                  case 4:
                    return i._updateProgress(Rs(e)), o = new Os(e, t.localStore, r.serializer), [ 4 /*yield*/ , r.Ba() ];

                  case 5:
                    a = n.sent(), n.label = 6;

                  case 6:
                    return a ? [ 4 /*yield*/ , o.sa(a) ] : [ 3 /*break*/ , 10 ];

                  case 7:
                    return (u = n.sent()) && i._updateProgress(u), [ 4 /*yield*/ , r.Ba() ];

                  case 8:
                    a = n.sent(), n.label = 9;

                  case 9:
                    return [ 3 /*break*/ , 6 ];

                  case 10:
                    return [ 4 /*yield*/ , o.complete() ];

                  case 11:
                    return s = n.sent(), [ 4 /*yield*/ , uc(t, s.aa, 
                    /* remoteEvent */ void 0) ];

                  case 12:
                    // Save metadata, so loading the same bundle will skip.
                    return n.sent(), [ 4 /*yield*/ , function(t, e) {
                        var n = G(t);
                        return n.persistence.runTransaction("Save bundle", "readwrite", (function(t) {
                            return n.$r.saveBundleMetadata(t, e);
                        }));
                    }(t.localStore, e) ];

                  case 13:
                    return [ 2 /*return*/ , (
                    // Save metadata, so loading the same bundle will skip.
                    n.sent(), i._completeWith(s.progress), Promise.resolve(s._a)) ];

                  case 14:
                    return c = n.sent(), [ 2 /*return*/ , (L("SyncEngine", "Loading bundle failed with ".concat(c)), 
                    i._failWith(c), Promise.resolve(new Set)) ];

                  case 15:
                    return [ 2 /*return*/ ];
                }
            }));
        }));
    }
    /**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
    /**
 * Provides all components needed for Firestore with in-memory persistence.
 * Uses EagerGC garbage collection.
 */)(o, r, i).then((function(t) {
        o.sharedClientState.notifyBundleLoaded(t);
    }));
}

var _c = /** @class */ function() {
    function t() {
        this.synchronizeTabs = !1;
    }
    return t.prototype.initialize = function(t) {
        return e(this, void 0, void 0, (function() {
            return n(this, (function(e) {
                switch (e.label) {
                  case 0:
                    return this.serializer = Fu(t.databaseInfo.databaseId), this.sharedClientState = this.createSharedClientState(t), 
                    this.persistence = this.createPersistence(t), [ 4 /*yield*/ , this.persistence.start() ];

                  case 1:
                    return e.sent(), this.localStore = this.createLocalStore(t), this.gcScheduler = this.createGarbageCollectionScheduler(t, this.localStore), 
                    this.indexBackfillerScheduler = this.createIndexBackfillerScheduler(t, this.localStore), 
                    [ 2 /*return*/ ];
                }
            }));
        }));
    }, t.prototype.createGarbageCollectionScheduler = function(t, e) {
        return null;
    }, t.prototype.createIndexBackfillerScheduler = function(t, e) {
        return null;
    }, t.prototype.createLocalStore = function(t) {
        return eu(this.persistence, new $a, t.initialUser, this.serializer);
    }, t.prototype.createPersistence = function(t) {
        return new Ua(za.Hr, this.serializer);
    }, t.prototype.createSharedClientState = function(t) {
        return new Su;
    }, t.prototype.terminate = function() {
        return e(this, void 0, void 0, (function() {
            var t, e;
            return n(this, (function(n) {
                switch (n.label) {
                  case 0:
                    return null === (t = this.gcScheduler) || void 0 === t || t.stop(), null === (e = this.indexBackfillerScheduler) || void 0 === e || e.stop(), 
                    this.sharedClientState.shutdown(), [ 4 /*yield*/ , this.persistence.shutdown() ];

                  case 1:
                    return n.sent(), [ 2 /*return*/ ];
                }
            }));
        }));
    }, t;
}(), Ec = /** @class */ function(e) {
    function n(t) {
        var n = this;
        return (n = e.call(this) || this).cacheSizeBytes = t, n;
    }
    return t(n, e), n.prototype.createGarbageCollectionScheduler = function(t, e) {
        B(this.persistence.referenceDelegate instanceof Ga);
        var n = this.persistence.referenceDelegate.garbageCollector;
        return new ma(n, t.asyncQueue, e);
    }, n.prototype.createPersistence = function(t) {
        var e = void 0 !== this.cacheSizeBytes ? ea.withCacheSize(this.cacheSizeBytes) : ea.DEFAULT;
        return new Ua((function(t) {
            return Ga.Hr(t, e);
        }), this.serializer);
    }, n;
}(_c), Tc = /** @class */ function(r) {
    function i(t, e, n) {
        var i = this;
        return (i = r.call(this) || this).ka = t, i.cacheSizeBytes = e, i.forceOwnership = n, 
        i.synchronizeTabs = !1, i;
    }
    return t(i, r), i.prototype.initialize = function(t) {
        return e(this, void 0, void 0, (function() {
            var e = this;
            return n(this, (function(n) {
                switch (n.label) {
                  case 0:
                    return [ 4 /*yield*/ , r.prototype.initialize.call(this, t) ];

                  case 1:
                    return n.sent(), [ 4 /*yield*/ , this.ka.initialize(this, t) ];

                  case 2:
                    // Enqueue writes from a previous session
                    return n.sent(), [ 4 /*yield*/ , bc(this.ka.syncEngine) ];

                  case 3:
                    // Enqueue writes from a previous session
                    return n.sent(), [ 4 /*yield*/ , os(this.ka.remoteStore) ];

                  case 4:
                    // NOTE: This will immediately call the listener, so we make sure to
                    // set it after localStore / remoteStore are started.
                    return n.sent(), [ 4 /*yield*/ , this.persistence.fi((function() {
                        return e.gcScheduler && !e.gcScheduler.started && e.gcScheduler.start(), e.indexBackfillerScheduler && !e.indexBackfillerScheduler.started && e.indexBackfillerScheduler.start(), 
                        Promise.resolve();
                    })) ];

                  case 5:
                    // NOTE: This will immediately call the listener, so we make sure to
                    // set it after localStore / remoteStore are started.
                    return n.sent(), [ 2 /*return*/ ];
                }
            }));
        }));
    }, i.prototype.createLocalStore = function(t) {
        return eu(this.persistence, new $a, t.initialUser, this.serializer);
    }, i.prototype.createGarbageCollectionScheduler = function(t, e) {
        var n = this.persistence.referenceDelegate.garbageCollector;
        return new ma(n, t.asyncQueue, e);
    }, i.prototype.createIndexBackfillerScheduler = function(t, e) {
        var n = new qt(e, this.persistence);
        return new Lt(t.asyncQueue, n);
    }, i.prototype.createPersistence = function(t) {
        var e = Ja(t.databaseInfo.databaseId, t.databaseInfo.persistenceKey), n = void 0 !== this.cacheSizeBytes ? ea.withCacheSize(this.cacheSizeBytes) : ea.DEFAULT;
        return new Wa(this.synchronizeTabs, e, t.clientId, n, t.asyncQueue, Ru(), Mu(), this.serializer, this.sharedClientState, !!this.forceOwnership);
    }, i.prototype.createSharedClientState = function(t) {
        return new Su;
    }, i;
}(_c), Sc = /** @class */ function(r) {
    function i(t, e) {
        var n = this;
        return (n = r.call(this, t, e, /* forceOwnership= */ !1) || this).ka = t, n.cacheSizeBytes = e, 
        n.synchronizeTabs = !0, n;
    }
    return t(i, r), i.prototype.initialize = function(t) {
        return e(this, void 0, void 0, (function() {
            var i, o = this;
            return n(this, (function(a) {
                switch (a.label) {
                  case 0:
                    return [ 4 /*yield*/ , r.prototype.initialize.call(this, t) ];

                  case 1:
                    return a.sent(), i = this.ka.syncEngine, this.sharedClientState instanceof Tu ? (this.sharedClientState.syncEngine = {
                        Zs: fc.bind(null, i),
                        Xs: yc.bind(null, i),
                        eo: gc.bind(null, i),
                        Bi: mc.bind(null, i),
                        Ys: hc.bind(null, i)
                    }, [ 4 /*yield*/ , this.sharedClientState.start() ]) : [ 3 /*break*/ , 3 ];

                  case 2:
                    a.sent(), a.label = 3;

                  case 3:
                    // NOTE: This will immediately call the listener, so we make sure to
                    // set it after localStore / remoteStore are started.
                    return [ 4 /*yield*/ , this.persistence.fi((function(t) {
                        return e(o, void 0, void 0, (function() {
                            return n(this, (function(e) {
                                switch (e.label) {
                                  case 0:
                                    return [ 4 /*yield*/ , dc(this.ka.syncEngine, t) ];

                                  case 1:
                                    return e.sent(), this.gcScheduler && (t && !this.gcScheduler.started ? this.gcScheduler.start() : t || this.gcScheduler.stop()), 
                                    this.indexBackfillerScheduler && (t && !this.indexBackfillerScheduler.started ? this.indexBackfillerScheduler.start() : t || this.indexBackfillerScheduler.stop()), 
                                    [ 2 /*return*/ ];
                                }
                            }));
                        }));
                    })) ];

                  case 4:
                    // NOTE: This will immediately call the listener, so we make sure to
                    // set it after localStore / remoteStore are started.
                    return a.sent(), [ 2 /*return*/ ];
                }
            }));
        }));
    }, i.prototype.createSharedClientState = function(t) {
        var e = Ru();
        if (!Tu.D(e)) throw new j(K.UNIMPLEMENTED, "IndexedDB persistence is only available on platforms that support LocalStorage.");
        var n = Ja(t.databaseInfo.databaseId, t.databaseInfo.persistenceKey);
        return new Tu(e, t.asyncQueue, n, t.clientId, t.initialUser);
    }, i;
}(Tc), xc = /** @class */ function() {
    function t() {}
    return t.prototype.initialize = function(t, r) {
        return e(this, void 0, void 0, (function() {
            var e = this;
            return n(this, (function(n) {
                switch (n.label) {
                  case 0:
                    return this.localStore ? [ 3 /*break*/ , 2 ] : (this.localStore = t.localStore, 
                    this.sharedClientState = t.sharedClientState, this.datastore = this.createDatastore(r), 
                    this.remoteStore = this.createRemoteStore(r), this.eventManager = this.createEventManager(r), 
                    this.syncEngine = this.createSyncEngine(r, 
                    /* startAsPrimary=*/ !t.synchronizeTabs), this.sharedClientState.onlineStateHandler = function(t) {
                        return Hs(e.syncEngine, t, 1 /* OnlineStateSource.SharedClientState */);
                    }, this.remoteStore.remoteSyncer.handleCredentialChange = sc.bind(null, this.syncEngine), 
                    [ 4 /*yield*/ , ds(this.remoteStore, this.syncEngine.isPrimaryClient) ]);

                  case 1:
                    n.sent(), n.label = 2;

                  case 2:
                    return [ 2 /*return*/ ];
                }
            }));
        }));
    }, t.prototype.createEventManager = function(t) {
        return new Ts;
    }, t.prototype.createDatastore = function(t) {
        var e = Fu(t.databaseInfo.databaseId), n = function(t) {
            return new Ou(t);
        }(t.databaseInfo);
        return function(t, e, n, r) {
            return new Bu(t, e, n, r);
        }(t.authCredentials, t.appCheckCredentials, n, e);
    }, t.prototype.createRemoteStore = function(t) {
        var e = this;
        return function(t, e, n, r, i) {
            return new Gu(t, e, n, r, i);
        }(this.localStore, this.datastore, t.asyncQueue, (function(t) {
            return Hs(e.syncEngine, t, 0 /* OnlineStateSource.RemoteStore */);
        }), Cu.D() ? new Cu : new xu);
    }, t.prototype.createSyncEngine = function(t, e) {
        return function(t, e, n, 
        // PORTING NOTE: Manages state synchronization in multi-tab environments.
        r, i, o, a) {
            var u = new Us(t, e, n, r, i, o);
            return a && (u.Oa = !0), u;
        }(this.localStore, this.remoteStore, this.eventManager, this.sharedClientState, t.initialUser, t.maxConcurrentLimboResolutions, e);
    }, t.prototype.terminate = function() {
        return e(this, void 0, void 0, (function() {
            var t;
            return n(this, (function(r) {
                switch (r.label) {
                  case 0:
                    return [ 4 /*yield*/ , function(t) {
                        return e(this, void 0, void 0, (function() {
                            var e;
                            return n(this, (function(n) {
                                switch (n.label) {
                                  case 0:
                                    return e = G(t), F("RemoteStore", "RemoteStore shutting down."), e.v_.add(5 /* OfflineCause.Shutdown */), 
                                    [ 4 /*yield*/ , ju(e) ];

                                  case 1:
                                    return n.sent(), e.M_.shutdown(), 
                                    // Set the OnlineState to Unknown (rather than Offline) to avoid potentially
                                    // triggering spurious listener events with cached data, etc.
                                    e.x_.set("Unknown" /* OnlineState.Unknown */), [ 2 /*return*/ ];
                                }
                            }));
                        }));
                    }(this.remoteStore) ];

                  case 1:
                    return r.sent(), null === (t = this.datastore) || void 0 === t || t.terminate(), 
                    [ 2 /*return*/ ];
                }
            }));
        }));
    }, t;
}();

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * How many bytes to read each time when `ReadableStreamReader.read()` is
 * called. Only applicable for byte streams that we control (e.g. those backed
 * by an UInt8Array).
 */
/**
 * Builds a `ByteStreamReader` from a UInt8Array.
 * @param source - The data source to use.
 * @param bytesPerRead - How many bytes each `read()` from the returned reader
 *        will read.
 */
function Cc(t, r) {
    void 0 === r && (r = 10240);
    var i = 0;
    // The TypeScript definition for ReadableStreamReader changed. We use
    // `any` here to allow this code to compile with different versions.
    // See https://github.com/microsoft/TypeScript/issues/42970
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        read: function() {
            return e(this, void 0, void 0, (function() {
                var e;
                return n(this, (function(n) {
                    return i < t.byteLength ? (e = {
                        value: t.slice(i, i + r),
                        done: !1
                    }, [ 2 /*return*/ , (i += r, e) ]) : [ 2 /*return*/ , {
                        done: !0
                    } ];
                }));
            }));
        },
        cancel: function() {
            return e(this, void 0, void 0, (function() {
                return n(this, (function(t) {
                    return [ 2 /*return*/ ];
                }));
            }));
        },
        releaseLock: function() {},
        closed: Promise.resolve()
    };
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * On web, a `ReadableStream` is wrapped around by a `ByteStreamReader`.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/*
 * A wrapper implementation of Observer<T> that will dispatch events
 * asynchronously. To allow immediate silencing, a mute call is added which
 * causes events scheduled to no longer be raised.
 */ var Dc = /** @class */ function() {
    function t(t) {
        this.observer = t, 
        /**
             * When set to true, will not raise future events. Necessary to deal with
             * async detachment of listener.
             */
        this.muted = !1;
    }
    return t.prototype.next = function(t) {
        this.observer.next && this.qa(this.observer.next, t);
    }, t.prototype.error = function(t) {
        this.observer.error ? this.qa(this.observer.error, t) : V("Uncaught Error in snapshot listener:", t.toString());
    }, t.prototype.Qa = function() {
        this.muted = !0;
    }, t.prototype.qa = function(t, e) {
        var n = this;
        this.muted || setTimeout((function() {
            n.muted || t(e);
        }), 0);
    }, t;
}(), Nc = /** @class */ function() {
    function t(
    /** The reader to read from underlying binary bundle data source. */
    t, e) {
        var n = this;
        this.Ka = t, this.serializer = e, 
        /** Cached bundle metadata. */
        this.metadata = new Q, 
        /**
             * Internal buffer to hold bundle content, accumulating incomplete element
             * content.
             */
        this.buffer = new Uint8Array, this.$a = new TextDecoder("utf-8"), 
        // Read the metadata (which is the first element).
        this.Ua().then((function(t) {
            t && t.ra() ? n.metadata.resolve(t.na.metadata) : n.metadata.reject(new Error("The first element of the bundle is not a metadata, it is\n             ".concat(JSON.stringify(null == t ? void 0 : t.na))));
        }), (function(t) {
            return n.metadata.reject(t);
        }));
    }
    return t.prototype.close = function() {
        return this.Ka.cancel();
    }, t.prototype.getMetadata = function() {
        return e(this, void 0, void 0, (function() {
            return n(this, (function(t) {
                return [ 2 /*return*/ , this.metadata.promise ];
            }));
        }));
    }, t.prototype.Ba = function() {
        return e(this, void 0, void 0, (function() {
            return n(this, (function(t) {
                switch (t.label) {
                  case 0:
                    return [ 4 /*yield*/ , this.getMetadata() ];

                  case 1:
                    // Makes sure metadata is read before proceeding.
                    return [ 2 /*return*/ , (t.sent(), this.Ua()) ];
                }
            }));
        }));
    }, 
    /**
     * Reads from the head of internal buffer, and pulling more data from
     * underlying stream if a complete element cannot be found, until an
     * element(including the prefixed length and the JSON string) is found.
     *
     * Once a complete element is read, it is dropped from internal buffer.
     *
     * Returns either the bundled element, or null if we have reached the end of
     * the stream.
     */
    t.prototype.Ua = function() {
        return e(this, void 0, void 0, (function() {
            var t, e, r, i;
            return n(this, (function(n) {
                switch (n.label) {
                  case 0:
                    return [ 4 /*yield*/ , this.Wa() ];

                  case 1:
                    return null === (t = n.sent()) ? [ 2 /*return*/ , null ] : (e = this.$a.decode(t), 
                    r = Number(e), isNaN(r) && this.Ga("length string (".concat(e, ") is not valid number")), 
                    [ 4 /*yield*/ , this.za(r) ]);

                  case 2:
                    return i = n.sent(), [ 2 /*return*/ , new ks(JSON.parse(i), t.length + r) ];
                }
            }));
        }));
    }, 
    /** First index of '{' from the underlying buffer. */ t.prototype.ja = function() {
        return this.buffer.findIndex((function(t) {
            return t === "{".charCodeAt(0);
        }));
    }, 
    /**
     * Reads from the beginning of the internal buffer, until the first '{', and
     * return the content.
     *
     * If reached end of the stream, returns a null.
     */
    t.prototype.Wa = function() {
        return e(this, void 0, void 0, (function() {
            var t, e;
            return n(this, (function(n) {
                switch (n.label) {
                  case 0:
                    return this.ja() < 0 ? [ 4 /*yield*/ , this.Ha() ] : [ 3 /*break*/ , 3 ];

                  case 1:
                    if (n.sent()) return [ 3 /*break*/ , 3 ];
                    n.label = 2;

                  case 2:
                    return [ 3 /*break*/ , 0 ];

                  case 3:
                    // Broke out of the loop because underlying stream is closed, and there
                    // happens to be no more data to process.
                    return 0 === this.buffer.length ? [ 2 /*return*/ , null ] : (
                    // Broke out of the loop because underlying stream is closed, but still
                    // cannot find an open bracket.
                    (t = this.ja()) < 0 && this.Ga("Reached the end of bundle when a length string is expected."), 
                    e = this.buffer.slice(0, t), [ 2 /*return*/ , (this.buffer = this.buffer.slice(t), 
                    e) ]);
                }
            }));
        }));
    }, 
    /**
     * Reads from a specified position from the internal buffer, for a specified
     * number of bytes, pulling more data from the underlying stream if needed.
     *
     * Returns a string decoded from the read bytes.
     */
    t.prototype.za = function(t) {
        return e(this, void 0, void 0, (function() {
            var e;
            return n(this, (function(n) {
                switch (n.label) {
                  case 0:
                    return this.buffer.length < t ? [ 4 /*yield*/ , this.Ha() ] : [ 3 /*break*/ , 3 ];

                  case 1:
                    n.sent() && this.Ga("Reached the end of bundle when more is expected."), n.label = 2;

                  case 2:
                    return [ 3 /*break*/ , 0 ];

                  case 3:
                    // Update the internal buffer to drop the read json string.
                    return e = this.$a.decode(this.buffer.slice(0, t)), [ 2 /*return*/ , (this.buffer = this.buffer.slice(t), 
                    e) ];
                }
            }));
        }));
    }, t.prototype.Ga = function(t) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        throw this.Ka.cancel(), new Error("Invalid bundle format: ".concat(t));
    }, 
    /**
     * Pulls more data from underlying stream to internal buffer.
     * Returns a boolean indicating whether the stream is finished.
     */
    t.prototype.Ha = function() {
        return e(this, void 0, void 0, (function() {
            var t, e;
            return n(this, (function(n) {
                switch (n.label) {
                  case 0:
                    return [ 4 /*yield*/ , this.Ka.read() ];

                  case 1:
                    return (t = n.sent()).done || ((e = new Uint8Array(this.buffer.length + t.value.length)).set(this.buffer), 
                    e.set(t.value, this.buffer.length), this.buffer = e), [ 2 /*return*/ , t.done ];
                }
            }));
        }));
    }, t;
}(), Ac = /** @class */ function() {
    function t(t) {
        this.datastore = t, 
        // The version of each document that was read during this transaction.
        this.readVersions = new Map, this.mutations = [], this.committed = !1, 
        /**
             * A deferred usage error that occurred previously in this transaction that
             * will cause the transaction to fail once it actually commits.
             */
        this.lastTransactionError = null, 
        /**
             * Set of documents that have been written in the transaction.
             *
             * When there's more than one write to the same key in a transaction, any
             * writes after the first are handled differently.
             */
        this.writtenDocs = new Set;
    }
    return t.prototype.lookup = function(t) {
        return e(this, void 0, void 0, (function() {
            var r, i = this;
            return n(this, (function(o) {
                switch (o.label) {
                  case 0:
                    if (this.ensureCommitNotCalled(), this.mutations.length > 0) throw this.lastTransactionError = new j(K.INVALID_ARGUMENT, "Firestore transactions require all reads to be executed before all writes."), 
                    this.lastTransactionError;
                    return [ 4 /*yield*/ , function(t, r) {
                        return e(this, void 0, void 0, (function() {
                            var e, i, o, a, u;
                            return n(this, (function(n) {
                                switch (n.label) {
                                  case 0:
                                    return e = G(t), i = {
                                        documents: r.map((function(t) {
                                            return Li(e.serializer, t);
                                        }))
                                    }, [ 4 /*yield*/ , e.vo("BatchGetDocuments", e.serializer.databaseId, lt.emptyPath(), i, r.length) ];

                                  case 1:
                                    return o = n.sent(), a = new Map, o.forEach((function(t) {
                                        var n = function(t, e) {
                                            return "found" in e ? function(t, e) {
                                                B(!!e.found), e.found.name, e.found.updateTime;
                                                var n = qi(t, e.found.name), r = Ri(e.found.updateTime), i = e.found.createTime ? Ri(e.found.createTime) : st.min(), o = new hn({
                                                    mapValue: {
                                                        fields: e.found.fields
                                                    }
                                                });
                                                return dn.newFoundDocument(n, r, i, o);
                                            }(t, e) : "missing" in e ? function(t, e) {
                                                B(!!e.missing), B(!!e.readTime);
                                                var n = qi(t, e.missing), r = Ri(e.readTime);
                                                return dn.newNoDocument(n, r);
                                            }(t, e) : U();
                                        }(e.serializer, t);
                                        a.set(n.key.toString(), n);
                                    })), u = [], [ 2 /*return*/ , (r.forEach((function(t) {
                                        var e = a.get(t.toString());
                                        B(!!e), u.push(e);
                                    })), u) ];
                                }
                            }));
                        }));
                    }(this.datastore, t) ];

                  case 1:
                    return [ 2 /*return*/ , ((r = o.sent()).forEach((function(t) {
                        return i.recordVersion(t);
                    })), r) ];
                }
            }));
        }));
    }, t.prototype.set = function(t, e) {
        this.write(e.toMutation(t, this.precondition(t))), this.writtenDocs.add(t.toString());
    }, t.prototype.update = function(t, e) {
        try {
            this.write(e.toMutation(t, this.preconditionForUpdate(t)));
        } catch (t) {
            this.lastTransactionError = t;
        }
        this.writtenDocs.add(t.toString());
    }, t.prototype.delete = function(t) {
        this.write(new ei(t, this.precondition(t))), this.writtenDocs.add(t.toString());
    }, t.prototype.commit = function() {
        return e(this, void 0, void 0, (function() {
            var t, r = this;
            return n(this, (function(i) {
                switch (i.label) {
                  case 0:
                    if (this.ensureCommitNotCalled(), this.lastTransactionError) throw this.lastTransactionError;
                    return t = this.readVersions, 
                    // For each mutation, note that the doc was written.
                    this.mutations.forEach((function(e) {
                        t.delete(e.key.toString());
                    })), 
                    // For each document that was read but not written to, we want to perform
                    // a `verify` operation.
                    t.forEach((function(t, e) {
                        var n = dt.fromPath(e);
                        r.mutations.push(new ni(n, r.precondition(n)));
                    })), [ 4 /*yield*/ , function(t, r) {
                        return e(this, void 0, void 0, (function() {
                            var e, i;
                            return n(this, (function(n) {
                                switch (n.label) {
                                  case 0:
                                    return e = G(t), i = {
                                        writes: r.map((function(t) {
                                            return Qi(e.serializer, t);
                                        }))
                                    }, [ 4 /*yield*/ , e.So("Commit", e.serializer.databaseId, lt.emptyPath(), i) ];

                                  case 1:
                                    return n.sent(), [ 2 /*return*/ ];
                                }
                            }));
                        }));
                    }(this.datastore, this.mutations) ];

                  case 1:
                    // For each mutation, note that the doc was written.
                    return i.sent(), this.committed = !0, [ 2 /*return*/ ];
                }
            }));
        }));
    }, t.prototype.recordVersion = function(t) {
        var e;
        if (t.isFoundDocument()) e = t.version; else {
            if (!t.isNoDocument()) throw U();
            // Represent a deleted doc using SnapshotVersion.min().
                        e = st.min();
        }
        var n = this.readVersions.get(t.key.toString());
        if (n) {
            if (!e.isEqual(n)) 
            // This transaction will fail no matter what.
            throw new j(K.ABORTED, "Document version changed between two reads.");
        } else this.readVersions.set(t.key.toString(), e);
    }, 
    /**
     * Returns the version of this document when it was read in this transaction,
     * as a precondition, or no precondition if it was not read.
     */
    t.prototype.precondition = function(t) {
        var e = this.readVersions.get(t.toString());
        return !this.writtenDocs.has(t.toString()) && e ? e.isEqual(st.min()) ? Ur.exists(!1) : Ur.updateTime(e) : Ur.none();
    }, 
    /**
     * Returns the precondition for a document if the operation is an update.
     */
    t.prototype.preconditionForUpdate = function(t) {
        var e = this.readVersions.get(t.toString());
        // The first time a document is written, we want to take into account the
        // read time and existence
                if (!this.writtenDocs.has(t.toString()) && e) {
            if (e.isEqual(st.min())) 
            // The document doesn't exist, so fail the transaction.
            // This has to be validated locally because you can't send a
            // precondition that a document does not exist without changing the
            // semantics of the backend write to be an insert. This is the reverse
            // of what we want, since we want to assert that the document doesn't
            // exist but then send the update and have it fail. Since we can't
            // express that to the backend, we have to validate locally.
            // Note: this can change once we can send separate verify writes in the
            // transaction.
            throw new j(K.INVALID_ARGUMENT, "Can't update a document that doesn't exist.");
            // Document exists, base precondition on document update time.
                        return Ur.updateTime(e);
        }
        // Document was not read, so we just use the preconditions for a blind
        // update.
                return Ur.exists(!0);
    }, t.prototype.write = function(t) {
        this.ensureCommitNotCalled(), this.mutations.push(t);
    }, t.prototype.ensureCommitNotCalled = function() {}, t;
}(), kc = /** @class */ function() {
    function t(t, e, n, r, i) {
        this.asyncQueue = t, this.datastore = e, this.options = n, this.updateFunction = r, 
        this.deferred = i, this.Ja = n.maxAttempts, this.jo = new Vu(this.asyncQueue, "transaction_retry" /* TimerId.TransactionRetry */)
        /** Runs the transaction and sets the result on deferred. */;
    }
    return t.prototype.Ya = function() {
        this.Ja -= 1, this.Za();
    }, t.prototype.Za = function() {
        var t = this;
        this.jo.qo((function() {
            return e(t, void 0, void 0, (function() {
                var t, e, r = this;
                return n(this, (function(n) {
                    return t = new Ac(this.datastore), (e = this.Xa(t)) && e.then((function(e) {
                        r.asyncQueue.enqueueAndForget((function() {
                            return t.commit().then((function() {
                                r.deferred.resolve(e);
                            })).catch((function(t) {
                                r.eu(t);
                            }));
                        }));
                    })).catch((function(t) {
                        r.eu(t);
                    })), [ 2 /*return*/ ];
                }));
            }));
        }));
    }, t.prototype.Xa = function(t) {
        try {
            var e = this.updateFunction(t);
            return !Bt(e) && e.catch && e.then ? e : (this.deferred.reject(Error("Transaction callback must return a Promise")), 
            null);
        } catch (t) {
            // Do not retry errors thrown by user provided updateFunction.
            return this.deferred.reject(t), null;
        }
    }, t.prototype.eu = function(t) {
        var e = this;
        this.Ja > 0 && this.tu(t) ? (this.Ja -= 1, this.asyncQueue.enqueueAndForget((function() {
            return e.Za(), Promise.resolve();
        }))) : this.deferred.reject(t);
    }, t.prototype.tu = function(t) {
        if ("FirebaseError" === t.name) {
            // In transactions, the backend will fail outdated reads with FAILED_PRECONDITION and
            // non-matching document versions with ABORTED. These errors should be retried.
            var e = t.code;
            return "aborted" === e || "failed-precondition" === e || "already-exists" === e || !si(e);
        }
        return !1;
    }, t;
}(), Pc = /** @class */ function() {
    function t(t, r, 
    /**
     * Asynchronous queue responsible for all of our internal processing. When
     * we get incoming work from the user (via public API) or the network
     * (incoming GRPC messages), we should always schedule onto this queue.
     * This ensures all of our work is properly serialized (e.g. we don't
     * start processing a new operation while the previous one is waiting for
     * an async I/O to complete).
     */
    i, o) {
        var a = this;
        this.authCredentials = t, this.appCheckCredentials = r, this.asyncQueue = i, this.databaseInfo = o, 
        this.user = k.UNAUTHENTICATED, this.clientId = rt.newId(), this.authCredentialListener = function() {
            return Promise.resolve();
        }, this.appCheckCredentialListener = function() {
            return Promise.resolve();
        }, this.authCredentials.start(i, (function(t) {
            return e(a, void 0, void 0, (function() {
                return n(this, (function(e) {
                    switch (e.label) {
                      case 0:
                        return F("FirestoreClient", "Received user=", t.uid), [ 4 /*yield*/ , this.authCredentialListener(t) ];

                      case 1:
                        return e.sent(), this.user = t, [ 2 /*return*/ ];
                    }
                }));
            }));
        })), this.appCheckCredentials.start(i, (function(t) {
            return F("FirestoreClient", "Received new app check token=", t), a.appCheckCredentialListener(t, a.user);
        }));
    }
    return Object.defineProperty(t.prototype, "configuration", {
        get: function() {
            return {
                asyncQueue: this.asyncQueue,
                databaseInfo: this.databaseInfo,
                clientId: this.clientId,
                authCredentials: this.authCredentials,
                appCheckCredentials: this.appCheckCredentials,
                initialUser: this.user,
                maxConcurrentLimboResolutions: 100
            };
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype.setCredentialChangeListener = function(t) {
        this.authCredentialListener = t;
    }, t.prototype.setAppCheckTokenChangeListener = function(t) {
        this.appCheckCredentialListener = t;
    }, 
    /**
     * Checks that the client has not been terminated. Ensures that other methods on //
     * this class cannot be called after the client is terminated. //
     */
    t.prototype.verifyNotTerminated = function() {
        if (this.asyncQueue.isShuttingDown) throw new j(K.FAILED_PRECONDITION, "The client has already been terminated.");
    }, t.prototype.terminate = function() {
        var t = this;
        this.asyncQueue.enterRestrictedMode();
        var r = new Q;
        return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((function() {
            return e(t, void 0, void 0, (function() {
                var t, e;
                return n(this, (function(n) {
                    switch (n.label) {
                      case 0:
                        return n.trys.push([ 0, 5, , 6 ]), this._onlineComponents ? [ 4 /*yield*/ , this._onlineComponents.terminate() ] : [ 3 /*break*/ , 2 ];

                      case 1:
                        n.sent(), n.label = 2;

                      case 2:
                        return this._offlineComponents ? [ 4 /*yield*/ , this._offlineComponents.terminate() ] : [ 3 /*break*/ , 4 ];

                      case 3:
                        n.sent(), n.label = 4;

                      case 4:
                        // The credentials provider must be terminated after shutting down the
                        // RemoteStore as it will prevent the RemoteStore from retrieving auth
                        // tokens.
                        return this.authCredentials.shutdown(), this.appCheckCredentials.shutdown(), r.resolve(), 
                        [ 3 /*break*/ , 6 ];

                      case 5:
                        return t = n.sent(), e = ys(t, "Failed to shutdown persistence"), r.reject(e), [ 3 /*break*/ , 6 ];

                      case 6:
                        return [ 2 /*return*/ ];
                    }
                }));
            }));
        })), r.promise;
    }, t;
}();

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A class representing a bundle.
 *
 * Takes a bundle stream or buffer, and presents abstractions to read bundled
 * elements out of the underlying content.
 */ function Oc(t, r) {
    return e(this, void 0, void 0, (function() {
        var i, o, a = this;
        return n(this, (function(u) {
            switch (u.label) {
              case 0:
                return t.asyncQueue.verifyOperationInProgress(), F("FirestoreClient", "Initializing OfflineComponentProvider"), 
                i = t.configuration, [ 4 /*yield*/ , r.initialize(i) ];

              case 1:
                return u.sent(), o = i.initialUser, t.setCredentialChangeListener((function(t) {
                    return e(a, void 0, void 0, (function() {
                        return n(this, (function(e) {
                            switch (e.label) {
                              case 0:
                                return o.isEqual(t) ? [ 3 /*break*/ , 2 ] : [ 4 /*yield*/ , nu(r.localStore, t) ];

                              case 1:
                                e.sent(), o = t, e.label = 2;

                              case 2:
                                return [ 2 /*return*/ ];
                            }
                        }));
                    }));
                })), 
                // When a user calls clearPersistence() in one client, all other clients
                // need to be terminated to allow the delete to succeed.
                r.persistence.setDatabaseDeletedListener((function() {
                    return t.terminate();
                })), t._offlineComponents = r, [ 2 /*return*/ ];
            }
        }));
    }));
}

function Rc(t, r) {
    return e(this, void 0, void 0, (function() {
        var e;
        return n(this, (function(n) {
            switch (n.label) {
              case 0:
                return t.asyncQueue.verifyOperationInProgress(), [ 4 /*yield*/ , Fc(t) ];

              case 1:
                return e = n.sent(), F("FirestoreClient", "Initializing OnlineComponentProvider"), 
                [ 4 /*yield*/ , r.initialize(e, t.configuration) ];

              case 2:
                return n.sent(), 
                // The CredentialChangeListener of the online component provider takes
                // precedence over the offline component provider.
                t.setCredentialChangeListener((function(t) {
                    return fs(r.remoteStore, t);
                })), t.setAppCheckTokenChangeListener((function(t, e) {
                    return fs(r.remoteStore, e);
                })), t._onlineComponents = r, [ 2 /*return*/ ];
            }
        }));
    }));
}

/**
 * Decides whether the provided error allows us to gracefully disable
 * persistence (as opposed to crashing the client).
 */ function Mc(t) {
    return "FirebaseError" === t.name ? t.code === K.FAILED_PRECONDITION || t.code === K.UNIMPLEMENTED : !("undefined" != typeof DOMException && t instanceof DOMException) || 
    // When the browser is out of quota we could get either quota exceeded
    // or an aborted error depending on whether the error happened during
    // schema migration.
    22 === t.code || 20 === t.code || 
    // Firefox Private Browsing mode disables IndexedDb and returns
    // INVALID_STATE for any usage.
    11 === t.code;
}

function Fc(t) {
    return e(this, void 0, void 0, (function() {
        var e, r;
        return n(this, (function(n) {
            switch (n.label) {
              case 0:
                if (t._offlineComponents) return [ 3 /*break*/ , 8 ];
                if (!t._uninitializedComponentsProvider) return [ 3 /*break*/ , 6 ];
                F("FirestoreClient", "Using user provided OfflineComponentProvider"), n.label = 1;

              case 1:
                return n.trys.push([ 1, 3, , 5 ]), [ 4 /*yield*/ , Oc(t, t._uninitializedComponentsProvider._offline) ];

              case 2:
                return n.sent(), [ 3 /*break*/ , 5 ];

              case 3:
                if (e = n.sent(), !Mc(r = e)) throw r;
                return L("Error using user provided cache. Falling back to memory cache: " + r), 
                [ 4 /*yield*/ , Oc(t, new _c) ];

              case 4:
                return n.sent(), [ 3 /*break*/ , 5 ];

              case 5:
                return [ 3 /*break*/ , 8 ];

              case 6:
                return F("FirestoreClient", "Using default OfflineComponentProvider"), [ 4 /*yield*/ , Oc(t, new _c) ];

              case 7:
                n.sent(), n.label = 8;

              case 8:
                return [ 2 /*return*/ , t._offlineComponents ];
            }
        }));
    }));
}

function Vc(t) {
    return e(this, void 0, void 0, (function() {
        var e;
        return n(this, (function(n) {
            switch (n.label) {
              case 0:
                return t._onlineComponents ? [ 3 /*break*/ , 5 ] : t._uninitializedComponentsProvider ? (F("FirestoreClient", "Using user provided OnlineComponentProvider"), 
                [ 4 /*yield*/ , Rc(t, t._uninitializedComponentsProvider._online) ]) : [ 3 /*break*/ , 2 ];

              case 1:
                return e = n.sent(), [ 3 /*break*/ , 4 ];

              case 2:
                return F("FirestoreClient", "Using default OnlineComponentProvider"), [ 4 /*yield*/ , Rc(t, new xc) ];

              case 3:
                e = n.sent(), n.label = 4;

              case 4:
                e, n.label = 5;

              case 5:
                return [ 2 /*return*/ , t._onlineComponents ];
            }
        }));
    }));
}

function Lc(t) {
    return Fc(t).then((function(t) {
        return t.persistence;
    }));
}

function qc(t) {
    return Fc(t).then((function(t) {
        return t.localStore;
    }));
}

function Uc(t) {
    return Vc(t).then((function(t) {
        return t.remoteStore;
    }));
}

function Bc(t) {
    return Vc(t).then((function(t) {
        return t.syncEngine;
    }));
}

function zc(t) {
    return Vc(t).then((function(t) {
        return t.datastore;
    }));
}

function Gc(t) {
    return e(this, void 0, void 0, (function() {
        var e, r;
        return n(this, (function(n) {
            switch (n.label) {
              case 0:
                return [ 4 /*yield*/ , Vc(t) ];

              case 1:
                return e = n.sent(), [ 2 /*return*/ , ((r = e.eventManager).onListen = Bs.bind(null, e.syncEngine), 
                r.onUnlisten = js.bind(null, e.syncEngine), r.onFirstRemoteStoreListen = zs.bind(null, e.syncEngine), 
                r.onLastRemoteStoreUnlisten = Qs.bind(null, e.syncEngine), r) ];
            }
        }));
    }));
}

/** Enables the network connection and re-enqueues all pending operations. */ function Kc(t, r, i) {
    var o = this;
    void 0 === i && (i = {});
    var a = new Q;
    return t.asyncQueue.enqueueAndForget((function() {
        return e(o, void 0, void 0, (function() {
            var e;
            return n(this, (function(n) {
                switch (n.label) {
                  case 0:
                    return e = function(t, e, n, r, i) {
                        var o = new Dc({
                            next: function(o) {
                                // Remove query first before passing event to user to avoid
                                // user actions affecting the now stale query.
                                e.enqueueAndForget((function() {
                                    return xs(t, a);
                                }));
                                var u = o.docs.has(n);
                                !u && o.fromCache ? 
                                // TODO(dimond): If we're online and the document doesn't
                                // exist then we resolve with a doc.exists set to false. If
                                // we're offline however, we reject the Promise in this
                                // case. Two options: 1) Cache the negative response from
                                // the server so we can deliver that even when you're
                                // offline 2) Actually reject the Promise in the online case
                                // if the document doesn't exist.
                                i.reject(new j(K.UNAVAILABLE, "Failed to get document because the client is offline.")) : u && o.fromCache && r && "server" === r.source ? i.reject(new j(K.UNAVAILABLE, 'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')) : i.resolve(o);
                            },
                            error: function(t) {
                                return i.reject(t);
                            }
                        }), a = new As(Yn(n.path), o, {
                            includeMetadataChanges: !0,
                            ta: !0
                        });
                        return Ss(t, a);
                    }, [ 4 /*yield*/ , Gc(t) ];

                  case 1:
                    return [ 2 /*return*/ , e.apply(void 0, [ n.sent(), t.asyncQueue, r, i, a ]) ];
                }
            }));
        }));
    })), a.promise;
}

function jc(t, r, i) {
    var o = this;
    void 0 === i && (i = {});
    var a = new Q;
    return t.asyncQueue.enqueueAndForget((function() {
        return e(o, void 0, void 0, (function() {
            var e;
            return n(this, (function(n) {
                switch (n.label) {
                  case 0:
                    return e = function(t, e, n, r, i) {
                        var o = new Dc({
                            next: function(n) {
                                // Remove query first before passing event to user to avoid
                                // user actions affecting the now stale query.
                                e.enqueueAndForget((function() {
                                    return xs(t, a);
                                })), n.fromCache && "server" === r.source ? i.reject(new j(K.UNAVAILABLE, 'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')) : i.resolve(n);
                            },
                            error: function(t) {
                                return i.reject(t);
                            }
                        }), a = new As(n, o, {
                            includeMetadataChanges: !0,
                            ta: !0
                        });
                        return Ss(t, a);
                    }, [ 4 /*yield*/ , Gc(t) ];

                  case 1:
                    return [ 2 /*return*/ , e.apply(void 0, [ n.sent(), t.asyncQueue, r, i, a ]) ];
                }
            }));
        }));
    })), a.promise;
}

/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Compares two `ExperimentalLongPollingOptions` objects for equality.
 */
/**
 * Creates and returns a new `ExperimentalLongPollingOptions` with the same
 * option values as the given instance.
 */
function Qc(t) {
    var e = {};
    return void 0 !== t.timeoutSeconds && (e.timeoutSeconds = t.timeoutSeconds), e
    /**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */;
}

var Wc = new Map;

/**
 * An instance map that ensures only one Datastore exists per Firestore
 * instance.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Yc(t, e, n) {
    if (!n) throw new j(K.INVALID_ARGUMENT, "Function ".concat(t, "() cannot be called with an empty ").concat(e, "."));
}

/**
 * Validates that two boolean options are not set at the same time.
 * @internal
 */ function Hc(t, e, n, r) {
    if (!0 === e && !0 === r) throw new j(K.INVALID_ARGUMENT, "".concat(t, " and ").concat(n, " cannot be used together."));
}

/**
 * Validates that `path` refers to a document (indicated by the fact it contains
 * an even numbers of segments).
 */ function Jc(t) {
    if (!dt.isDocumentKey(t)) throw new j(K.INVALID_ARGUMENT, "Invalid document reference. Document references must have an even number of segments, but ".concat(t, " has ").concat(t.length, "."));
}

/**
 * Validates that `path` refers to a collection (indicated by the fact it
 * contains an odd numbers of segments).
 */ function Xc(t) {
    if (dt.isDocumentKey(t)) throw new j(K.INVALID_ARGUMENT, "Invalid collection reference. Collection references must have an odd number of segments, but ".concat(t, " has ").concat(t.length, "."));
}

/**
 * Returns true if it's a non-null object without a custom prototype
 * (i.e. excludes Array, Date, etc.).
 */
/** Returns a string describing the type / value of the provided input. */ function Zc(t) {
    if (void 0 === t) return "undefined";
    if (null === t) return "null";
    if ("string" == typeof t) return t.length > 20 && (t = "".concat(t.substring(0, 20), "...")), 
    JSON.stringify(t);
    if ("number" == typeof t || "boolean" == typeof t) return "" + t;
    if ("object" == typeof t) {
        if (t instanceof Array) return "an array";
        var e = 
        /** try to get the constructor name for an object. */
        function(t) {
            return t.constructor ? t.constructor.name : null;
        }(t);
        return e ? "a custom ".concat(e, " object") : "an object";
    }
    return "function" == typeof t ? "a function" : U();
}

function $c(t, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
e) {
    if ("_delegate" in t && (
    // Unwrap Compat types
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    t = t._delegate), !(t instanceof e)) {
        if (e.name === t.constructor.name) throw new j(K.INVALID_ARGUMENT, "Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");
        var n = Zc(t);
        throw new j(K.INVALID_ARGUMENT, "Expected type '".concat(e.name, "', but it was: ").concat(n));
    }
    return t;
}

function tl(t, e) {
    if (e <= 0) throw new j(K.INVALID_ARGUMENT, "Function ".concat(t, "() requires a positive number, but it was: ").concat(e, "."));
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// settings() defaults:
/**
 * A concrete type describing all the values that can be applied via a
 * user-supplied `FirestoreSettings` object. This is a separate type so that
 * defaults can be supplied and the value can be checked for equality.
 */ var el = /** @class */ function() {
    function t(t) {
        var e, n;
        if (void 0 === t.host) {
            if (void 0 !== t.ssl) throw new j(K.INVALID_ARGUMENT, "Can't provide ssl option if host option is not set");
            this.host = "firestore.googleapis.com", this.ssl = !0;
        } else this.host = t.host, this.ssl = null === (e = t.ssl) || void 0 === e || e;
        if (this.credentials = t.credentials, this.ignoreUndefinedProperties = !!t.ignoreUndefinedProperties, 
        this.localCache = t.localCache, void 0 === t.cacheSizeBytes) this.cacheSizeBytes = 41943040; else {
            if (-1 !== t.cacheSizeBytes && t.cacheSizeBytes < 1048576) throw new j(K.INVALID_ARGUMENT, "cacheSizeBytes must be at least 1048576");
            this.cacheSizeBytes = t.cacheSizeBytes;
        }
        Hc("experimentalForceLongPolling", t.experimentalForceLongPolling, "experimentalAutoDetectLongPolling", t.experimentalAutoDetectLongPolling), 
        this.experimentalForceLongPolling = !!t.experimentalForceLongPolling, this.experimentalForceLongPolling ? this.experimentalAutoDetectLongPolling = !1 : void 0 === t.experimentalAutoDetectLongPolling ? this.experimentalAutoDetectLongPolling = !0 : 
        // For backwards compatibility, coerce the value to boolean even though
        // the TypeScript compiler has narrowed the type to boolean already.
        // noinspection PointlessBooleanExpressionJS
        this.experimentalAutoDetectLongPolling = !!t.experimentalAutoDetectLongPolling, 
        this.experimentalLongPollingOptions = Qc(null !== (n = t.experimentalLongPollingOptions) && void 0 !== n ? n : {}), 
        function(t) {
            if (void 0 !== t.timeoutSeconds) {
                if (isNaN(t.timeoutSeconds)) throw new j(K.INVALID_ARGUMENT, "invalid long polling timeout: ".concat(t.timeoutSeconds, " (must not be NaN)"));
                if (t.timeoutSeconds < 5) throw new j(K.INVALID_ARGUMENT, "invalid long polling timeout: ".concat(t.timeoutSeconds, " (minimum allowed value is 5)"));
                if (t.timeoutSeconds > 30) throw new j(K.INVALID_ARGUMENT, "invalid long polling timeout: ".concat(t.timeoutSeconds, " (maximum allowed value is 30)"));
            }
        }(this.experimentalLongPollingOptions), this.useFetchStreams = !!t.useFetchStreams;
    }
    return t.prototype.isEqual = function(t) {
        return this.host === t.host && this.ssl === t.ssl && this.credentials === t.credentials && this.cacheSizeBytes === t.cacheSizeBytes && this.experimentalForceLongPolling === t.experimentalForceLongPolling && this.experimentalAutoDetectLongPolling === t.experimentalAutoDetectLongPolling && function(t, e) {
            return t.timeoutSeconds === e.timeoutSeconds;
        }(this.experimentalLongPollingOptions, t.experimentalLongPollingOptions) && this.ignoreUndefinedProperties === t.ignoreUndefinedProperties && this.useFetchStreams === t.useFetchStreams;
    }, t;
}(), nl = /** @class */ function() {
    /** @hideconstructor */
    function t(t, e, n, r) {
        this._authCredentials = t, this._appCheckCredentials = e, this._databaseId = n, 
        this._app = r, 
        /**
             * Whether it's a Firestore or Firestore Lite instance.
             */
        this.type = "firestore-lite", this._persistenceKey = "(lite)", this._settings = new el({}), 
        this._settingsFrozen = !1;
    }
    return Object.defineProperty(t.prototype, "app", {
        /**
         * The {@link @firebase/app#FirebaseApp} associated with this `Firestore` service
         * instance.
         */
        get: function() {
            if (!this._app) throw new j(K.FAILED_PRECONDITION, "Firestore was not initialized using the Firebase SDK. 'app' is not available");
            return this._app;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "_initialized", {
        get: function() {
            return this._settingsFrozen;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "_terminated", {
        get: function() {
            return void 0 !== this._terminateTask;
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype._setSettings = function(t) {
        if (this._settingsFrozen) throw new j(K.FAILED_PRECONDITION, "Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");
        this._settings = new el(t), void 0 !== t.credentials && (this._authCredentials = function(t) {
            if (!t) return new Y;
            switch (t.type) {
              case "firstParty":
                return new Z(t.sessionIndex || "0", t.iamToken || null, t.authTokenFactory || null);

              case "provider":
                return t.client;

              default:
                throw new j(K.INVALID_ARGUMENT, "makeAuthCredentialsProvider failed due to invalid credential type");
            }
        }(t.credentials));
    }, t.prototype._getSettings = function() {
        return this._settings;
    }, t.prototype._freezeSettings = function() {
        return this._settingsFrozen = !0, this._settings;
    }, t.prototype._delete = function() {
        return this._terminateTask || (this._terminateTask = this._terminate()), this._terminateTask;
    }, 
    /** Returns a JSON-serializable representation of this `Firestore` instance. */ t.prototype.toJSON = function() {
        return {
            app: this._app,
            databaseId: this._databaseId,
            settings: this._settings
        };
    }, 
    /**
     * Terminates all components used by this client. Subclasses can override
     * this method to clean up their own dependencies, but must also call this
     * method.
     *
     * Only ever called once.
     */
    t.prototype._terminate = function() {
        /**
 * Removes all components associated with the provided instance. Must be called
 * when the `Firestore` instance is terminated.
 */
        return t = this, (e = Wc.get(t)) && (F("ComponentProvider", "Removing Datastore"), 
        Wc.delete(t), e.terminate()), Promise.resolve();
        var t, e;
    }, t;
}();

/**
 * Modify this instance to communicate with the Cloud Firestore emulator.
 *
 * Note: This must be called before this instance has been used to do any
 * operations.
 *
 * @param firestore - The `Firestore` instance to configure to connect to the
 * emulator.
 * @param host - the emulator host (ex: localhost).
 * @param port - the emulator port (ex: 9000).
 * @param options.mockUserToken - the mock auth token to use for unit testing
 * Security Rules.
 */
function rl(t, e, n, r) {
    var i;
    void 0 === r && (r = {});
    var o = (t = $c(t, nl))._getSettings(), a = "".concat(e, ":").concat(n);
    if ("firestore.googleapis.com" !== o.host && o.host !== a && L("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."), 
    t._setSettings(Object.assign(Object.assign({}, o), {
        host: a,
        ssl: !1
    })), r.mockUserToken) {
        var u, s;
        if ("string" == typeof r.mockUserToken) u = r.mockUserToken, s = k.MOCK_USER; else {
            // Let createMockUserToken validate first (catches common mistakes like
            // invalid field "uid" and missing field "sub" / "user_id".)
            u = g(r.mockUserToken, null === (i = t._app) || void 0 === i ? void 0 : i.options.projectId);
            var c = r.mockUserToken.sub || r.mockUserToken.user_id;
            if (!c) throw new j(K.INVALID_ARGUMENT, "mockUserToken must contain 'sub' or 'user_id' field!");
            s = new k(c);
        }
        t._authCredentials = new H(new W(u, s));
    }
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A `Query` refers to a query which you can read or listen to. You can also
 * construct refined `Query` objects by adding filters and ordering.
 */ var il = /** @class */ function() {
    // This is the lite version of the Query class in the main SDK.
    /** @hideconstructor protected */
    function t(t, 
    /**
     * If provided, the `FirestoreDataConverter` associated with this instance.
     */
    e, n) {
        this.converter = e, this._query = n, 
        /** The type of this Firestore reference. */
        this.type = "query", this.firestore = t;
    }
    return t.prototype.withConverter = function(e) {
        return new t(this.firestore, e, this._query);
    }, t;
}(), ol = /** @class */ function() {
    /** @hideconstructor */
    function t(t, 
    /**
     * If provided, the `FirestoreDataConverter` associated with this instance.
     */
    e, n) {
        this.converter = e, this._key = n, 
        /** The type of this Firestore reference. */
        this.type = "document", this.firestore = t;
    }
    return Object.defineProperty(t.prototype, "_path", {
        get: function() {
            return this._key.path;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "id", {
        /**
         * The document's identifier within its collection.
         */
        get: function() {
            return this._key.path.lastSegment();
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "path", {
        /**
         * A string representing the path of the referenced document (relative
         * to the root of the database).
         */
        get: function() {
            return this._key.path.canonicalString();
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "parent", {
        /**
         * The collection this `DocumentReference` belongs to.
         */
        get: function() {
            return new al(this.firestore, this.converter, this._key.path.popLast());
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype.withConverter = function(e) {
        return new t(this.firestore, e, this._key);
    }, t;
}(), al = /** @class */ function(e) {
    /** @hideconstructor */
    function n(t, n, r) {
        var i = this;
        return (i = e.call(this, t, n, Yn(r)) || this)._path = r, 
        /** The type of this Firestore reference. */
        i.type = "collection", i;
    }
    return t(n, e), Object.defineProperty(n.prototype, "id", {
        /** The collection's identifier. */ get: function() {
            return this._query.path.lastSegment();
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(n.prototype, "path", {
        /**
         * A string representing the path of the referenced collection (relative
         * to the root of the database).
         */
        get: function() {
            return this._query.path.canonicalString();
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(n.prototype, "parent", {
        /**
         * A reference to the containing `DocumentReference` if this is a
         * subcollection. If this isn't a subcollection, the reference is null.
         */
        get: function() {
            var t = this._path.popLast();
            return t.isEmpty() ? null : new ol(this.firestore, 
            /* converter= */ null, new dt(t));
        },
        enumerable: !1,
        configurable: !0
    }), n.prototype.withConverter = function(t) {
        return new n(this.firestore, t, this._path);
    }, n;
}(il);

/**
 * A `DocumentReference` refers to a document location in a Firestore database
 * and can be used to write, read, or listen to the location. The document at
 * the referenced location may or may not exist.
 */ function ul(t, e) {
    for (var n = [], i = 2; i < arguments.length; i++) n[i - 2] = arguments[i];
    if (t = m(t), Yc("collection", "path", e), t instanceof nl) {
        var o = lt.fromString.apply(lt, r([ e ], n, !1));
        return Xc(o), new al(t, /* converter= */ null, o);
    }
    if (!(t instanceof ol || t instanceof al)) throw new j(K.INVALID_ARGUMENT, "Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");
    var a = t._path.child(lt.fromString.apply(lt, r([ e ], n, !1)));
    return Xc(a), new al(t.firestore, 
    /* converter= */ null, a);
}

// TODO(firestorelite): Consider using ErrorFactory -
// https://github.com/firebase/firebase-js-sdk/blob/0131e1f/packages/util/src/errors.ts#L106
/**
 * Creates and returns a new `Query` instance that includes all documents in the
 * database that are contained in a collection or subcollection with the
 * given `collectionId`.
 *
 * @param firestore - A reference to the root `Firestore` instance.
 * @param collectionId - Identifies the collections to query over. Every
 * collection or subcollection with this ID as the last segment of its path
 * will be included. Cannot contain a slash.
 * @returns The created `Query`.
 */ function sl(t, e) {
    if (t = $c(t, nl), Yc("collectionGroup", "collection id", e), e.indexOf("/") >= 0) throw new j(K.INVALID_ARGUMENT, "Invalid collection ID '".concat(e, "' passed to function collectionGroup(). Collection IDs must not contain '/'."));
    return new il(t, 
    /* converter= */ null, function(t) {
        return new Qn(lt.emptyPath(), t);
    }(e));
}

function cl(t, e) {
    for (var n = [], i = 2; i < arguments.length; i++) n[i - 2] = arguments[i];
    if (t = m(t), 
    // We allow omission of 'pathString' but explicitly prohibit passing in both
    // 'undefined' and 'null'.
    1 === arguments.length && (e = rt.newId()), Yc("doc", "path", e), t instanceof nl) {
        var o = lt.fromString.apply(lt, r([ e ], n, !1));
        return Jc(o), new ol(t, 
        /* converter= */ null, new dt(o));
    }
    if (!(t instanceof ol || t instanceof al)) throw new j(K.INVALID_ARGUMENT, "Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");
    var a = t._path.child(lt.fromString.apply(lt, r([ e ], n, !1)));
    return Jc(a), new ol(t.firestore, t instanceof al ? t.converter : null, new dt(a));
}

/**
 * Returns true if the provided references are equal.
 *
 * @param left - A reference to compare.
 * @param right - A reference to compare.
 * @returns true if the references point to the same location in the same
 * Firestore database.
 */ function ll(t, e) {
    return t = m(t), e = m(e), (t instanceof ol || t instanceof al) && (e instanceof ol || e instanceof al) && t.firestore === e.firestore && t.path === e.path && t.converter === e.converter
    /**
 * Returns true if the provided queries point to the same collection and apply
 * the same constraints.
 *
 * @param left - A `Query` to compare.
 * @param right - A `Query` to compare.
 * @returns true if the references point to the same location in the same
 * Firestore database.
 */;
}

function hl(t, e) {
    return t = m(t), e = m(e), t instanceof il && e instanceof il && t.firestore === e.firestore && nr(t._query, e._query) && t.converter === e.converter
    /**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */;
}

var fl = /** @class */ function() {
    function t() {
        var t = this;
        // The last promise in the queue.
                this.nu = Promise.resolve(), 
        // A list of retryable operations. Retryable operations are run in order and
        // retried with backoff.
        this.ru = [], 
        // Is this AsyncQueue being shut down? Once it is set to true, it will not
        // be changed again.
        this.iu = !1, 
        // Operations scheduled to be queued in the future. Operations are
        // automatically removed after they are run or canceled.
        this.su = [], 
        // visible for testing
        this.ou = null, 
        // Flag set while there's an outstanding AsyncQueue operation, used for
        // assertion sanity-checks.
        this._u = !1, 
        // Enabled during shutdown on Safari to prevent future access to IndexedDB.
        this.au = !1, 
        // List of TimerIds to fast-forward delays for.
        this.uu = [], 
        // Backoff timer used to schedule retries for retryable operations
        this.jo = new Vu(this, "async_queue_retry" /* TimerId.AsyncQueueRetry */), 
        // Visibility handler that triggers an immediate retry of all retryable
        // operations. Meant to speed up recovery when we regain file system access
        // after page comes into foreground.
        this.cu = function() {
            var e = Mu();
            e && F("AsyncQueue", "Visibility state changed to " + e.visibilityState), t.jo.Ko();
        };
        var e = Mu();
        e && "function" == typeof e.addEventListener && e.addEventListener("visibilitychange", this.cu);
    }
    return Object.defineProperty(t.prototype, "isShuttingDown", {
        get: function() {
            return this.iu;
        },
        enumerable: !1,
        configurable: !0
    }), 
    /**
     * Adds a new operation to the queue without waiting for it to complete (i.e.
     * we ignore the Promise result).
     */
    t.prototype.enqueueAndForget = function(t) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this.enqueue(t);
    }, t.prototype.enqueueAndForgetEvenWhileRestricted = function(t) {
        this.lu(), 
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this.hu(t);
    }, t.prototype.enterRestrictedMode = function(t) {
        if (!this.iu) {
            this.iu = !0, this.au = t || !1;
            var e = Mu();
            e && "function" == typeof e.removeEventListener && e.removeEventListener("visibilitychange", this.cu);
        }
    }, t.prototype.enqueue = function(t) {
        var e = this;
        if (this.lu(), this.iu) 
        // Return a Promise which never resolves.
        return new Promise((function() {}));
        // Create a deferred Promise that we can return to the callee. This
        // allows us to return a "hanging Promise" only to the callee and still
        // advance the queue even when the operation is not run.
                var n = new Q;
        return this.hu((function() {
            return e.iu && e.au ? Promise.resolve() : (t().then(n.resolve, n.reject), n.promise);
        })).then((function() {
            return n.promise;
        }));
    }, t.prototype.enqueueRetryable = function(t) {
        var e = this;
        this.enqueueAndForget((function() {
            return e.ru.push(t), e.Pu();
        }));
    }, 
    /**
     * Runs the next operation from the retryable queue. If the operation fails,
     * reschedules with backoff.
     */
    t.prototype.Pu = function() {
        return e(this, void 0, void 0, (function() {
            var t, e = this;
            return n(this, (function(n) {
                switch (n.label) {
                  case 0:
                    if (0 === this.ru.length) return [ 3 /*break*/ , 5 ];
                    n.label = 1;

                  case 1:
                    return n.trys.push([ 1, 3, , 4 ]), [ 4 /*yield*/ , this.ru[0]() ];

                  case 2:
                    return n.sent(), this.ru.shift(), this.jo.reset(), [ 3 /*break*/ , 4 ];

                  case 3:
                    if (!Ot(t = n.sent())) throw t;
                    // Failure will be handled by AsyncQueue
                                        return F("AsyncQueue", "Operation failed with retryable error: " + t), 
                    [ 3 /*break*/ , 4 ];

                  case 4:
                    this.ru.length > 0 && 
                    // If there are additional operations, we re-schedule `retryNextOp()`.
                    // This is necessary to run retryable operations that failed during
                    // their initial attempt since we don't know whether they are already
                    // enqueued. If, for example, `op1`, `op2`, `op3` are enqueued and `op1`
                    // needs to  be re-run, we will run `op1`, `op1`, `op2` using the
                    // already enqueued calls to `retryNextOp()`. `op3()` will then run in the
                    // call scheduled here.
                    // Since `backoffAndRun()` cancels an existing backoff and schedules a
                    // new backoff on every call, there is only ever a single additional
                    // operation in the queue.
                    this.jo.qo((function() {
                        return e.Pu();
                    })), n.label = 5;

                  case 5:
                    return [ 2 /*return*/ ];
                }
            }));
        }));
    }, t.prototype.hu = function(t) {
        var e = this, n = this.nu.then((function() {
            return e._u = !0, t().catch((function(t) {
                e.ou = t, e._u = !1;
                var n = 
                /**
 * Chrome includes Error.message in Error.stack. Other browsers do not.
 * This returns expected output of message + stack when available.
 * @param error - Error or FirestoreError
 */
                function(t) {
                    var e = t.message || "";
                    return t.stack && (e = t.stack.includes(t.message) ? t.stack : t.message + "\n" + t.stack), 
                    e;
                }(t);
                // Re-throw the error so that this.tail becomes a rejected Promise and
                // all further attempts to chain (via .then) will just short-circuit
                // and return the rejected Promise.
                                throw V("INTERNAL UNHANDLED ERROR: ", n), t;
            })).then((function(t) {
                return e._u = !1, t;
            }));
        }));
        return this.nu = n, n;
    }, t.prototype.enqueueAfterDelay = function(t, e, n) {
        var r = this;
        this.lu(), 
        // Fast-forward delays for timerIds that have been overriden.
        this.uu.indexOf(t) > -1 && (e = 0);
        var i = ms.createAndSchedule(this, t, e, n, (function(t) {
            return r.Iu(t);
        }));
        return this.su.push(i), i;
    }, t.prototype.lu = function() {
        this.ou && U();
    }, t.prototype.verifyOperationInProgress = function() {}, 
    /**
     * Waits until all currently queued tasks are finished executing. Delayed
     * operations are not run.
     */
    t.prototype.Tu = function() {
        return e(this, void 0, void 0, (function() {
            var t;
            return n(this, (function(e) {
                switch (e.label) {
                  case 0:
                    return [ 4 /*yield*/ , t = this.nu ];

                  case 1:
                    e.sent(), e.label = 2;

                  case 2:
                    if (t !== this.nu) return [ 3 /*break*/ , 0 ];
                    e.label = 3;

                  case 3:
                    return [ 2 /*return*/ ];
                }
            }));
        }));
    }, 
    /**
     * For Tests: Determine if a delayed operation with a particular TimerId
     * exists.
     */
    t.prototype.Eu = function(t) {
        for (var e = 0, n = this.su; e < n.length; e++) {
            if (n[e].timerId === t) return !0;
        }
        return !1;
    }, 
    /**
     * For Tests: Runs some or all delayed operations early.
     *
     * @param lastTimerId - Delayed operations up to and including this TimerId
     * will be drained. Pass TimerId.All to run all delayed operations.
     * @returns a Promise that resolves once all operations have been run.
     */
    t.prototype.du = function(t) {
        var e = this;
        // Note that draining may generate more delayed ops, so we do that first.
                return this.Tu().then((function() {
            // Run ops in the same order they'd run if they ran naturally.
            e.su.sort((function(t, e) {
                return t.targetTimeMs - e.targetTimeMs;
            }));
            for (var n = 0, r = e.su; n < r.length; n++) {
                var i = r[n];
                if (i.skipDelay(), "all" /* TimerId.All */ !== t && i.timerId === t) break;
            }
            return e.Tu();
        }));
    }, 
    /**
     * For Tests: Skip all subsequent delays for a timer id.
     */
    t.prototype.Au = function(t) {
        this.uu.push(t);
    }, 
    /** Called once a DelayedOperation is run or canceled. */ t.prototype.Iu = function(t) {
        // NOTE: indexOf / slice are O(n), but delayedOperations is expected to be small.
        var e = this.su.indexOf(t);
        this.su.splice(e, 1);
    }, t;
}();

function dl(t) {
    /**
 * Returns true if obj is an object and contains at least one of the specified
 * methods.
 */
    return function(t, e) {
        if ("object" != typeof t || null === t) return !1;
        for (var n = t, r = 0, i = e; r < i.length; r++) {
            var o = i[r];
            if (o in n && "function" == typeof n[o]) return !0;
        }
        return !1;
    }(t, [ "next", "error", "complete" ]);
}

var pl = /** @class */ function() {
    function t() {
        this._progressObserver = {}, this._taskCompletionResolver = new Q, this._lastProgress = {
            taskState: "Running",
            totalBytes: 0,
            totalDocuments: 0,
            bytesLoaded: 0,
            documentsLoaded: 0
        }
        /**
     * Registers functions to listen to bundle loading progress events.
     * @param next - Called when there is a progress update from bundle loading. Typically `next` calls occur
     *   each time a Firestore document is loaded from the bundle.
     * @param error - Called when an error occurs during bundle loading. The task aborts after reporting the
     *   error, and there should be no more updates after this.
     * @param complete - Called when the loading task is complete.
     */;
    }
    return t.prototype.onProgress = function(t, e, n) {
        this._progressObserver = {
            next: t,
            error: e,
            complete: n
        };
    }, 
    /**
     * Implements the `Promise<LoadBundleTaskProgress>.catch` interface.
     *
     * @param onRejected - Called when an error occurs during bundle loading.
     */
    t.prototype.catch = function(t) {
        return this._taskCompletionResolver.promise.catch(t);
    }, 
    /**
     * Implements the `Promise<LoadBundleTaskProgress>.then` interface.
     *
     * @param onFulfilled - Called on the completion of the loading task with a final `LoadBundleTaskProgress` update.
     *   The update will always have its `taskState` set to `"Success"`.
     * @param onRejected - Called when an error occurs during bundle loading.
     */
    t.prototype.then = function(t, e) {
        return this._taskCompletionResolver.promise.then(t, e);
    }, 
    /**
     * Notifies all observers that bundle loading has completed, with a provided
     * `LoadBundleTaskProgress` object.
     *
     * @private
     */
    t.prototype._completeWith = function(t) {
        this._updateProgress(t), this._progressObserver.complete && this._progressObserver.complete(), 
        this._taskCompletionResolver.resolve(t);
    }, 
    /**
     * Notifies all observers that bundle loading has failed, with a provided
     * `Error` as the reason.
     *
     * @private
     */
    t.prototype._failWith = function(t) {
        this._lastProgress.taskState = "Error", this._progressObserver.next && this._progressObserver.next(this._lastProgress), 
        this._progressObserver.error && this._progressObserver.error(t), this._taskCompletionResolver.reject(t);
    }, 
    /**
     * Notifies a progress update of loading a bundle.
     * @param progress - The new progress.
     *
     * @private
     */
    t.prototype._updateProgress = function(t) {
        this._lastProgress = t, this._progressObserver.next && this._progressObserver.next(t);
    }, t;
}(), vl = -1, ml = /** @class */ function(e) {
    /** @hideconstructor */
    function n(t, n, r, i) {
        var o = this;
        /**
             * Whether it's a {@link Firestore} or Firestore Lite instance.
             */
        return (o = e.call(this, t, n, r, i) || this).type = "firestore", o._queue = new fl, 
        o._persistenceKey = (null == i ? void 0 : i.name) || "[DEFAULT]", o;
    }
    return t(n, e), n.prototype._terminate = function() {
        return this._firestoreClient || 
        // The client must be initialized to ensure that all subsequent API
        // usage throws an exception.
        bl(this), this._firestoreClient.terminate();
    }, n;
}(nl);

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Constant used to indicate the LRU garbage collection should be disabled.
 * Set this value as the `cacheSizeBytes` on the settings passed to the
 * {@link Firestore} instance.
 */
/**
 * Initializes a new instance of {@link Firestore} with the provided settings.
 * Can only be called before any other function, including
 * {@link (getFirestore:1)}. If the custom settings are empty, this function is
 * equivalent to calling {@link (getFirestore:1)}.
 *
 * @param app - The {@link @firebase/app#FirebaseApp} with which the {@link Firestore} instance will
 * be associated.
 * @param settings - A settings object to configure the {@link Firestore} instance.
 * @param databaseId - The name of the database.
 * @returns A newly initialized {@link Firestore} instance.
 */
function yl(t, e, n) {
    n || (n = "(default)");
    var r = _getProvider(t, "firestore");
    if (r.isInitialized(n)) {
        var i = r.getImmediate({
            identifier: n
        }), o = r.getOptions(n);
        if (v(o, e)) return i;
        throw new j(K.FAILED_PRECONDITION, "initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.");
    }
    if (void 0 !== e.cacheSizeBytes && void 0 !== e.localCache) throw new j(K.INVALID_ARGUMENT, "cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object");
    if (void 0 !== e.cacheSizeBytes && -1 !== e.cacheSizeBytes && e.cacheSizeBytes < 1048576) throw new j(K.INVALID_ARGUMENT, "cacheSizeBytes must be at least 1048576");
    return r.initialize({
        options: e,
        instanceIdentifier: n
    });
}

function gl(t, e) {
    var n = "object" == typeof t ? t : u(), i = "string" == typeof t ? t : e || "(default)", o = _getProvider(n, "firestore").getImmediate({
        identifier: i
    });
    if (!o._initialized) {
        var a = w("firestore");
        a && rl.apply(void 0, r([ o ], a, !1));
    }
    return o;
}

/**
 * @internal
 */ function wl(t) {
    return t._firestoreClient || bl(t), t._firestoreClient.verifyNotTerminated(), t._firestoreClient;
}

function bl(t) {
    var e, n, r, i = t._freezeSettings(), o = function(t, e, n, r) {
        return new Ue(t, e, n, r.host, r.ssl, r.experimentalForceLongPolling, r.experimentalAutoDetectLongPolling, Qc(r.experimentalLongPollingOptions), r.useFetchStreams);
    }(t._databaseId, (null === (e = t._app) || void 0 === e ? void 0 : e.options.appId) || "", t._persistenceKey, i);
    t._firestoreClient = new Pc(t._authCredentials, t._appCheckCredentials, t._queue, o), 
    (null === (n = i.localCache) || void 0 === n ? void 0 : n._offlineComponentProvider) && (null === (r = i.localCache) || void 0 === r ? void 0 : r._onlineComponentProvider) && (t._firestoreClient._uninitializedComponentsProvider = {
        _offlineKind: i.localCache.kind,
        _offline: i.localCache._offlineComponentProvider,
        _online: i.localCache._onlineComponentProvider
    });
}

/**
 * Attempts to enable persistent storage, if possible.
 *
 * On failure, `enableIndexedDbPersistence()` will reject the promise or
 * throw an exception. There are several reasons why this can fail, which can be
 * identified by the `code` on the error.
 *
 *   * failed-precondition: The app is already open in another browser tab.
 *   * unimplemented: The browser is incompatible with the offline persistence
 *     implementation.
 *
 * Note that even after a failure, the {@link Firestore} instance will remain
 * usable, however offline persistence will be disabled.
 *
 * Note: `enableIndexedDbPersistence()` must be called before any other functions
 * (other than {@link initializeFirestore}, {@link (getFirestore:1)} or
 * {@link clearIndexedDbPersistence}.
 *
 * Persistence cannot be used in a Node.js environment.
 *
 * @param firestore - The {@link Firestore} instance to enable persistence for.
 * @param persistenceSettings - Optional settings object to configure
 * persistence.
 * @returns A `Promise` that represents successfully enabling persistent storage.
 * @deprecated This function will be removed in a future major release. Instead, set
 * `FirestoreSettings.localCache` to an instance of `PersistentLocalCache` to
 * turn on IndexedDb cache. Calling this function when `FirestoreSettings.localCache`
 * is already specified will throw an exception.
 */ function Il(t, e) {
    kl(t = $c(t, ml));
    var n = wl(t);
    if (n._uninitializedComponentsProvider) throw new j(K.FAILED_PRECONDITION, "SDK cache is already specified.");
    L("enableIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");
    var r = t._freezeSettings(), i = new xc;
    return El(n, i, new Tc(i, r.cacheSizeBytes, null == e ? void 0 : e.forceOwnership));
}

/**
 * Attempts to enable multi-tab persistent storage, if possible. If enabled
 * across all tabs, all operations share access to local persistence, including
 * shared execution of queries and latency-compensated local document updates
 * across all connected instances.
 *
 * On failure, `enableMultiTabIndexedDbPersistence()` will reject the promise or
 * throw an exception. There are several reasons why this can fail, which can be
 * identified by the `code` on the error.
 *
 *   * failed-precondition: The app is already open in another browser tab and
 *     multi-tab is not enabled.
 *   * unimplemented: The browser is incompatible with the offline persistence
 *     implementation.
 *
 * Note that even after a failure, the {@link Firestore} instance will remain
 * usable, however offline persistence will be disabled.
 *
 * @param firestore - The {@link Firestore} instance to enable persistence for.
 * @returns A `Promise` that represents successfully enabling persistent
 * storage.
 * @deprecated This function will be removed in a future major release. Instead, set
 * `FirestoreSettings.localCache` to an instance of `PersistentLocalCache` to
 * turn on indexeddb cache. Calling this function when `FirestoreSettings.localCache`
 * is already specified will throw an exception.
 */ function _l(t) {
    kl(t = $c(t, ml));
    var e = wl(t);
    if (e._uninitializedComponentsProvider) throw new j(K.FAILED_PRECONDITION, "SDK cache is already specified.");
    L("enableMultiTabIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");
    var n = t._freezeSettings(), r = new xc;
    return El(e, r, new Sc(r, n.cacheSizeBytes));
}

/**
 * Registers both the `OfflineComponentProvider` and `OnlineComponentProvider`.
 * If the operation fails with a recoverable error (see
 * `canRecoverFromIndexedDbError()` below), the returned Promise is rejected
 * but the client remains usable.
 */ function El(t, r, i) {
    var o = this, a = new Q;
    return t.asyncQueue.enqueue((function() {
        return e(o, void 0, void 0, (function() {
            var e, o;
            return n(this, (function(n) {
                switch (n.label) {
                  case 0:
                    return n.trys.push([ 0, 3, , 4 ]), [ 4 /*yield*/ , Oc(t, i) ];

                  case 1:
                    return n.sent(), [ 4 /*yield*/ , Rc(t, r) ];

                  case 2:
                    return n.sent(), a.resolve(), [ 3 /*break*/ , 4 ];

                  case 3:
                    if (e = n.sent(), !Mc(o = e)) throw o;
                    return L("Error enabling indexeddb cache. Falling back to memory cache: " + o), 
                    a.reject(o), [ 3 /*break*/ , 4 ];

                  case 4:
                    return [ 2 /*return*/ ];
                }
            }));
        }));
    })).then((function() {
        return a.promise;
    }));
}

/**
 * Clears the persistent storage. This includes pending writes and cached
 * documents.
 *
 * Must be called while the {@link Firestore} instance is not started (after the app is
 * terminated or when the app is first initialized). On startup, this function
 * must be called before other functions (other than {@link
 * initializeFirestore} or {@link (getFirestore:1)})). If the {@link Firestore}
 * instance is still running, the promise will be rejected with the error code
 * of `failed-precondition`.
 *
 * Note: `clearIndexedDbPersistence()` is primarily intended to help write
 * reliable tests that use Cloud Firestore. It uses an efficient mechanism for
 * dropping existing data but does not attempt to securely overwrite or
 * otherwise make cached data unrecoverable. For applications that are sensitive
 * to the disclosure of cached data in between user sessions, we strongly
 * recommend not enabling persistence at all.
 *
 * @param firestore - The {@link Firestore} instance to clear persistence for.
 * @returns A `Promise` that is resolved when the persistent storage is
 * cleared. Otherwise, the promise is rejected with an error.
 */ function Tl(t) {
    var r = this;
    if (t._initialized && !t._terminated) throw new j(K.FAILED_PRECONDITION, "Persistence can only be cleared before a Firestore instance is initialized or after it is terminated.");
    var i = new Q;
    return t._queue.enqueueAndForgetEvenWhileRestricted((function() {
        return e(r, void 0, void 0, (function() {
            var r;
            return n(this, (function(o) {
                switch (o.label) {
                  case 0:
                    return o.trys.push([ 0, 2, , 3 ]), [ 4 /*yield*/ , function(t) {
                        return e(this, void 0, void 0, (function() {
                            var e;
                            return n(this, (function(n) {
                                switch (n.label) {
                                  case 0:
                                    return At.D() ? (e = t + "main", [ 4 /*yield*/ , At.delete(e) ]) : [ 2 /*return*/ , Promise.resolve() ];

                                  case 1:
                                    return n.sent(), [ 2 /*return*/ ];
                                }
                            }));
                        }));
                    }(Ja(t._databaseId, t._persistenceKey)) ];

                  case 1:
                    return o.sent(), i.resolve(), [ 3 /*break*/ , 3 ];

                  case 2:
                    return r = o.sent(), i.reject(r), [ 3 /*break*/ , 3 ];

                  case 3:
                    return [ 2 /*return*/ ];
                }
            }));
        }));
    })), i.promise
    /**
 * Waits until all currently pending writes for the active user have been
 * acknowledged by the backend.
 *
 * The returned promise resolves immediately if there are no outstanding writes.
 * Otherwise, the promise waits for all previously issued writes (including
 * those written in a previous app session), but it does not wait for writes
 * that were added after the function is called. If you want to wait for
 * additional writes, call `waitForPendingWrites()` again.
 *
 * Any outstanding `waitForPendingWrites()` promises are rejected during user
 * changes.
 *
 * @returns A `Promise` which resolves when all currently pending writes have been
 * acknowledged by the backend.
 */;
}

function Sl(t) {
    return function(t) {
        var r = this, i = new Q;
        return t.asyncQueue.enqueueAndForget((function() {
            return e(r, void 0, void 0, (function() {
                var e;
                return n(this, (function(n) {
                    switch (n.label) {
                      case 0:
                        return e = $s, [ 4 /*yield*/ , Bc(t) ];

                      case 1:
                        return [ 2 /*return*/ , e.apply(void 0, [ n.sent(), i ]) ];
                    }
                }));
            }));
        })), i.promise;
    }(wl(t = $c(t, ml)));
}

/**
 * Re-enables use of the network for this {@link Firestore} instance after a prior
 * call to {@link disableNetwork}.
 *
 * @returns A `Promise` that is resolved once the network has been enabled.
 */ function xl(t) {
    return function(t) {
        var r = this;
        return t.asyncQueue.enqueue((function() {
            return e(r, void 0, void 0, (function() {
                var e, r;
                return n(this, (function(n) {
                    switch (n.label) {
                      case 0:
                        return [ 4 /*yield*/ , Lc(t) ];

                      case 1:
                        return e = n.sent(), [ 4 /*yield*/ , Uc(t) ];

                      case 2:
                        return r = n.sent(), [ 2 /*return*/ , (e.setNetworkEnabled(!0), function(t) {
                            var e = G(t);
                            return e.v_.delete(0 /* OfflineCause.UserDisabled */), Ku(e);
                        }(r)) ];
                    }
                }));
            }));
        }));
    }
    /** Disables the network connection. Pending operations will not complete. */ (wl(t = $c(t, ml)));
}

/**
 * Disables network usage for this instance. It can be re-enabled via {@link
 * enableNetwork}. While the network is disabled, any snapshot listeners,
 * `getDoc()` or `getDocs()` calls will return results from cache, and any write
 * operations will be queued until the network is restored.
 *
 * @returns A `Promise` that is resolved once the network has been disabled.
 */ function Cl(t) {
    return function(t) {
        var r = this;
        return t.asyncQueue.enqueue((function() {
            return e(r, void 0, void 0, (function() {
                var r, i;
                return n(this, (function(o) {
                    switch (o.label) {
                      case 0:
                        return [ 4 /*yield*/ , Lc(t) ];

                      case 1:
                        return r = o.sent(), [ 4 /*yield*/ , Uc(t) ];

                      case 2:
                        return i = o.sent(), [ 2 /*return*/ , (r.setNetworkEnabled(!1), function(t) {
                            return e(this, void 0, void 0, (function() {
                                var e;
                                return n(this, (function(n) {
                                    switch (n.label) {
                                      case 0:
                                        return (e = G(t)).v_.add(0 /* OfflineCause.UserDisabled */), [ 4 /*yield*/ , ju(e) ];

                                      case 1:
                                        return n.sent(), 
                                        // Set the OnlineState to Offline so get()s return from cache, etc.
                                        e.x_.set("Offline" /* OnlineState.Offline */), [ 2 /*return*/ ];
                                    }
                                }));
                            }));
                        }(i)) ];
                    }
                }));
            }));
        }));
    }
    /**
 * Returns a Promise that resolves when all writes that were pending at the time
 * this method was called received server acknowledgement. An acknowledgement
 * can be either acceptance or rejection.
 */ (wl(t = $c(t, ml)));
}

/**
 * Terminates the provided {@link Firestore} instance.
 *
 * After calling `terminate()` only the `clearIndexedDbPersistence()` function
 * may be used. Any other function will throw a `FirestoreError`.
 *
 * To restart after termination, create a new instance of FirebaseFirestore with
 * {@link (getFirestore:1)}.
 *
 * Termination does not cancel any pending writes, and any promises that are
 * awaiting a response from the server will not be resolved. If you have
 * persistence enabled, the next time you start this instance, it will resume
 * sending these writes to the server.
 *
 * Note: Under normal circumstances, calling `terminate()` is not required. This
 * function is useful only when you want to force this instance to release all
 * of its resources or in combination with `clearIndexedDbPersistence()` to
 * ensure that all local state is destroyed between test runs.
 *
 * @returns A `Promise` that is resolved when the instance has been successfully
 * terminated.
 */ function Dl(t) {
    return s(t.app, "firestore", t._databaseId.database), t._delete()
    /**
 * Loads a Firestore bundle into the local cache.
 *
 * @param firestore - The {@link Firestore} instance to load bundles for.
 * @param bundleData - An object representing the bundle to be loaded. Valid
 * objects are `ArrayBuffer`, `ReadableStream<Uint8Array>` or `string`.
 *
 * @returns A `LoadBundleTask` object, which notifies callers with progress
 * updates, and completion or error events. It can be used as a
 * `Promise<LoadBundleTaskProgress>`.
 */;
}

function Nl(t, r) {
    var i = wl(t = $c(t, ml)), o = new pl;
    /**
 * Takes an updateFunction in which a set of reads and writes can be performed
 * atomically. In the updateFunction, the client can read and write values
 * using the supplied transaction object. After the updateFunction, all
 * changes will be committed. If a retryable error occurs (ex: some other
 * client has changed any of the data referenced), then the updateFunction
 * will be called again after a backoff. If the updateFunction still fails
 * after all retries, then the transaction will be rejected.
 *
 * The transaction object passed to the updateFunction contains methods for
 * accessing documents and collections. Unlike other datastore access, data
 * accessed with the transaction will not reflect local changes that have not
 * been committed. For this reason, it is required that all reads are
 * performed before any writes. Transactions must be performed while online.
 */
    return function(t, r, i, o) {
        var a = this, u = function(t, e) {
            return function(t, e) {
                return new Nc(t, e);
            }(function(t, e) {
                if (t instanceof Uint8Array) return Cc(t, e);
                if (t instanceof ArrayBuffer) return Cc(new Uint8Array(t), e);
                if (t instanceof ReadableStream) return t.getReader();
                throw new Error("Source of `toByteStreamReader` has to be a ArrayBuffer or ReadableStream");
            }("string" == typeof t ? hi().encode(t) : t), e);
        }(i, Fu(r));
        t.asyncQueue.enqueueAndForget((function() {
            return e(a, void 0, void 0, (function() {
                var e;
                return n(this, (function(n) {
                    switch (n.label) {
                      case 0:
                        return e = Ic, [ 4 /*yield*/ , Bc(t) ];

                      case 1:
                        return e.apply(void 0, [ n.sent(), u, o ]), [ 2 /*return*/ ];
                    }
                }));
            }));
        }));
    }(i, t._databaseId, r, o), o
    /**
 * Reads a Firestore {@link Query} from local cache, identified by the given
 * name.
 *
 * The named queries are packaged  into bundles on the server side (along
 * with resulting documents), and loaded to local cache using `loadBundle`. Once
 * in local cache, use this method to extract a {@link Query} by name.
 *
 * @param firestore - The {@link Firestore} instance to read the query from.
 * @param name - The name of the query.
 * @returns A `Promise` that is resolved with the Query or `null`.
 */;
}

function Al(t, r) {
    return function(t, r) {
        var i = this;
        return t.asyncQueue.enqueue((function() {
            return e(i, void 0, void 0, (function() {
                var e;
                return n(this, (function(n) {
                    switch (n.label) {
                      case 0:
                        return e = function(t, e) {
                            var n = G(t);
                            return n.persistence.runTransaction("Get named query", "readonly", (function(t) {
                                return n.$r.getNamedQuery(t, e);
                            }));
                        }, [ 4 /*yield*/ , qc(t) ];

                      case 1:
                        return [ 2 /*return*/ , e.apply(void 0, [ n.sent(), r ]) ];
                    }
                }));
            }));
        }));
    }(wl(t = $c(t, ml)), r).then((function(e) {
        return e ? new il(t, null, e.query) : null;
    }));
}

function kl(t) {
    if (t._initialized || t._terminated) throw new j(K.FAILED_PRECONDITION, "Firestore has already been started and persistence can no longer be enabled. You can only enable persistence before calling any other methods on a Firestore object.");
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Represents an aggregation that can be performed by Firestore.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var Pl = 
/**
     * Create a new AggregateField<T>
     * @param aggregateType Specifies the type of aggregation operation to perform.
     * @param _internalFieldPath Optionally specifies the field that is aggregated.
     * @internal
     */
function(t, e) {
    void 0 === t && (t = "count"), this._internalFieldPath = e, 
    /** A type string to uniquely identify instances of this class. */
    this.type = "AggregateField", this.aggregateType = t;
}, Ol = /** @class */ function() {
    /** @hideconstructor */
    function t(t, e, n) {
        this._userDataWriter = e, this._data = n, 
        /** A type string to uniquely identify instances of this class. */
        this.type = "AggregateQuerySnapshot", this.query = t
        /**
     * Returns the results of the aggregations performed over the underlying
     * query.
     *
     * The keys of the returned object will be the same as those of the
     * `AggregateSpec` object specified to the aggregation method, and the values
     * will be the corresponding aggregation result.
     *
     * @returns The results of the aggregations performed over the underlying
     * query.
     */;
    }
    return t.prototype.data = function() {
        return this._userDataWriter.convertObjectMap(this._data);
    }, t;
}(), Rl = /** @class */ function() {
    /** @hideconstructor */
    function t(t) {
        this._byteString = t;
    }
    /**
     * Creates a new `Bytes` object from the given Base64 string, converting it to
     * bytes.
     *
     * @param base64 - The Base64 string used to create the `Bytes` object.
     */    return t.fromBase64String = function(e) {
        try {
            return new t(Pe.fromBase64String(e));
        } catch (e) {
            throw new j(K.INVALID_ARGUMENT, "Failed to construct data from Base64 string: " + e);
        }
    }, 
    /**
     * Creates a new `Bytes` object from the given Uint8Array.
     *
     * @param array - The Uint8Array used to create the `Bytes` object.
     */
    t.fromUint8Array = function(e) {
        return new t(Pe.fromUint8Array(e));
    }, 
    /**
     * Returns the underlying bytes as a Base64-encoded string.
     *
     * @returns The Base64-encoded string created from the `Bytes` object.
     */
    t.prototype.toBase64 = function() {
        return this._byteString.toBase64();
    }, 
    /**
     * Returns the underlying bytes in a new `Uint8Array`.
     *
     * @returns The Uint8Array created from the `Bytes` object.
     */
    t.prototype.toUint8Array = function() {
        return this._byteString.toUint8Array();
    }, 
    /**
     * Returns a string representation of the `Bytes` object.
     *
     * @returns A string representation of the `Bytes` object.
     */
    t.prototype.toString = function() {
        return "Bytes(base64: " + this.toBase64() + ")";
    }, 
    /**
     * Returns true if this `Bytes` object is equal to the provided one.
     *
     * @param other - The `Bytes` object to compare against.
     * @returns true if this `Bytes` object is equal to the provided one.
     */
    t.prototype.isEqual = function(t) {
        return this._byteString.isEqual(t._byteString);
    }, t;
}(), Ml = /** @class */ function() {
    /**
     * Creates a `FieldPath` from the provided field names. If more than one field
     * name is provided, the path will point to a nested field in a document.
     *
     * @param fieldNames - A list of field names.
     */
    function t() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        for (var n = 0; n < t.length; ++n) if (0 === t[n].length) throw new j(K.INVALID_ARGUMENT, "Invalid field name at argument $(i + 1). Field names must not be empty.");
        this._internalPath = new ft(t);
    }
    /**
     * Returns true if this `FieldPath` is equal to the provided one.
     *
     * @param other - The `FieldPath` to compare against.
     * @returns true if this `FieldPath` is equal to the provided one.
     */    return t.prototype.isEqual = function(t) {
        return this._internalPath.isEqual(t._internalPath);
    }, t;
}();

/**
 * The results of executing an aggregation query.
 */
/**
 * Returns a special sentinel `FieldPath` to refer to the ID of a document.
 * It can be used in queries to sort or filter by the document ID.
 */
function Fl() {
    return new Ml("__name__");
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Sentinel values that can be used when writing document fields with `set()`
 * or `update()`.
 */ var Vl = 
/**
     * @param _methodName - The public API endpoint that returns this class.
     * @hideconstructor
     */
function(t) {
    this._methodName = t;
}, Ll = /** @class */ function() {
    /**
     * Creates a new immutable `GeoPoint` object with the provided latitude and
     * longitude values.
     * @param latitude - The latitude as number between -90 and 90.
     * @param longitude - The longitude as number between -180 and 180.
     */
    function t(t, e) {
        if (!isFinite(t) || t < -90 || t > 90) throw new j(K.INVALID_ARGUMENT, "Latitude must be a number between -90 and 90, but was: " + t);
        if (!isFinite(e) || e < -180 || e > 180) throw new j(K.INVALID_ARGUMENT, "Longitude must be a number between -180 and 180, but was: " + e);
        this._lat = t, this._long = e;
    }
    return Object.defineProperty(t.prototype, "latitude", {
        /**
         * The latitude of this `GeoPoint` instance.
         */
        get: function() {
            return this._lat;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "longitude", {
        /**
         * The longitude of this `GeoPoint` instance.
         */
        get: function() {
            return this._long;
        },
        enumerable: !1,
        configurable: !0
    }), 
    /**
     * Returns true if this `GeoPoint` is equal to the provided one.
     *
     * @param other - The `GeoPoint` to compare against.
     * @returns true if this `GeoPoint` is equal to the provided one.
     */
    t.prototype.isEqual = function(t) {
        return this._lat === t._lat && this._long === t._long;
    }, 
    /** Returns a JSON-serializable representation of this GeoPoint. */ t.prototype.toJSON = function() {
        return {
            latitude: this._lat,
            longitude: this._long
        };
    }, 
    /**
     * Actually private to JS consumers of our API, so this function is prefixed
     * with an underscore.
     */
    t.prototype._compareTo = function(t) {
        return it(this._lat, t._lat) || it(this._long, t._long);
    }, t;
}(), ql = /^__.*__$/, Ul = /** @class */ function() {
    function t(t, e, n) {
        this.data = t, this.fieldMask = e, this.fieldTransforms = n;
    }
    return t.prototype.toMutation = function(t, e) {
        return null !== this.fieldMask ? new Hr(t, this.data, this.fieldMask, e, this.fieldTransforms) : new Yr(t, this.data, e, this.fieldTransforms);
    }, t;
}(), Bl = /** @class */ function() {
    function t(t, 
    // The fieldMask does not include document transforms.
    e, n) {
        this.data = t, this.fieldMask = e, this.fieldTransforms = n;
    }
    return t.prototype.toMutation = function(t, e) {
        return new Hr(t, this.data, this.fieldMask, e, this.fieldTransforms);
    }, t;
}();

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * An immutable object representing a geographic location in Firestore. The
 * location is represented as latitude/longitude pair.
 *
 * Latitude values are in the range of [-90, 90].
 * Longitude values are in the range of [-180, 180].
 */ function zl(t) {
    switch (t) {
      case 0 /* UserDataSource.Set */ :
 // fall through
              case 2 /* UserDataSource.MergeSet */ :
 // fall through
              case 1 /* UserDataSource.Update */ :
        return !0;

      case 3 /* UserDataSource.Argument */ :
      case 4 /* UserDataSource.ArrayArgument */ :
        return !1;

      default:
        throw U();
    }
}

/** A "context" object passed around while parsing user data. */ var Gl = /** @class */ function() {
    /**
     * Initializes a ParseContext with the given source and path.
     *
     * @param settings - The settings for the parser.
     * @param databaseId - The database ID of the Firestore instance.
     * @param serializer - The serializer to use to generate the Value proto.
     * @param ignoreUndefinedProperties - Whether to ignore undefined properties
     * rather than throw.
     * @param fieldTransforms - A mutable list of field transforms encountered
     * while parsing the data.
     * @param fieldMask - A mutable list of field paths encountered while parsing
     * the data.
     *
     * TODO(b/34871131): We don't support array paths right now, so path can be
     * null to indicate the context represents any location within an array (in
     * which case certain features will not work and errors will be somewhat
     * compromised).
     */
    function t(t, e, n, r, i, o) {
        this.settings = t, this.databaseId = e, this.serializer = n, this.ignoreUndefinedProperties = r, 
        // Minor hack: If fieldTransforms is undefined, we assume this is an
        // external call and we need to validate the entire path.
        void 0 === i && this.Ru(), this.fieldTransforms = i || [], this.fieldMask = o || [];
    }
    return Object.defineProperty(t.prototype, "path", {
        get: function() {
            return this.settings.path;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "Vu", {
        get: function() {
            return this.settings.Vu;
        },
        enumerable: !1,
        configurable: !0
    }), 
    /** Returns a new context with the specified settings overwritten. */ t.prototype.mu = function(e) {
        return new t(Object.assign(Object.assign({}, this.settings), e), this.databaseId, this.serializer, this.ignoreUndefinedProperties, this.fieldTransforms, this.fieldMask);
    }, t.prototype.fu = function(t) {
        var e, n = null === (e = this.path) || void 0 === e ? void 0 : e.child(t), r = this.mu({
            path: n,
            gu: !1
        });
        return r.pu(t), r;
    }, t.prototype.yu = function(t) {
        var e, n = null === (e = this.path) || void 0 === e ? void 0 : e.child(t), r = this.mu({
            path: n,
            gu: !1
        });
        return r.Ru(), r;
    }, t.prototype.wu = function(t) {
        // TODO(b/34871131): We don't support array paths right now; so make path
        // undefined.
        return this.mu({
            path: void 0,
            gu: !0
        });
    }, t.prototype.Su = function(t) {
        return ch(t, this.settings.methodName, this.settings.bu || !1, this.path, this.settings.Du);
    }, 
    /** Returns 'true' if 'fieldPath' was traversed when creating this context. */ t.prototype.contains = function(t) {
        return void 0 !== this.fieldMask.find((function(e) {
            return t.isPrefixOf(e);
        })) || void 0 !== this.fieldTransforms.find((function(e) {
            return t.isPrefixOf(e.field);
        }));
    }, t.prototype.Ru = function() {
        // TODO(b/34871131): Remove null check once we have proper paths for fields
        // within arrays.
        if (this.path) for (var t = 0; t < this.path.length; t++) this.pu(this.path.get(t));
    }, t.prototype.pu = function(t) {
        if (0 === t.length) throw this.Su("Document fields must not be empty");
        if (zl(this.Vu) && ql.test(t)) throw this.Su('Document fields cannot begin and end with "__"');
    }, t;
}(), Kl = /** @class */ function() {
    function t(t, e, n) {
        this.databaseId = t, this.ignoreUndefinedProperties = e, this.serializer = n || Fu(t)
        /** Creates a new top-level parse context. */;
    }
    return t.prototype.Cu = function(t, e, n, r) {
        return void 0 === r && (r = !1), new Gl({
            Vu: t,
            methodName: e,
            Du: n,
            path: ft.emptyPath(),
            gu: !1,
            bu: r
        }, this.databaseId, this.serializer, this.ignoreUndefinedProperties);
    }, t;
}();

/**
 * Helper for parsing raw user input (provided via the API) into internal model
 * classes.
 */ function jl(t) {
    var e = t._freezeSettings(), n = Fu(t._databaseId);
    return new Kl(t._databaseId, !!e.ignoreUndefinedProperties, n);
}

/** Parse document data from a set() call. */ function Ql(t, e, n, r, i, o) {
    void 0 === o && (o = {});
    var a = t.Cu(o.merge || o.mergeFields ? 2 /* UserDataSource.MergeSet */ : 0 /* UserDataSource.Set */ , e, n, i);
    oh("Data must be an object, but it was:", a, r);
    var u, s, c = rh(r, a);
    if (o.merge) u = new Ne(a.fieldMask), s = a.fieldTransforms; else if (o.mergeFields) {
        for (var l = [], h = 0, f = o.mergeFields; h < f.length; h++) {
            var d = ah(e, f[h], n);
            if (!a.contains(d)) throw new j(K.INVALID_ARGUMENT, "Field '".concat(d, "' is specified in your field mask but missing from your input data."));
            lh(l, d) || l.push(d);
        }
        u = new Ne(l), s = a.fieldTransforms.filter((function(t) {
            return u.covers(t.field);
        }));
    } else u = null, s = a.fieldTransforms;
    return new Ul(new hn(c), u, s);
}

var Wl = /** @class */ function(e) {
    function n() {
        return null !== e && e.apply(this, arguments) || this;
    }
    return t(n, e), n.prototype._toFieldTransform = function(t) {
        if (2 /* UserDataSource.MergeSet */ !== t.Vu) throw 1 /* UserDataSource.Update */ === t.Vu ? t.Su("".concat(this._methodName, "() can only appear at the top level of your update data")) : t.Su("".concat(this._methodName, "() cannot be used with set() unless you pass {merge:true}"));
        // No transform to add for a delete, but we need to add it to our
        // fieldMask so it gets deleted.
                return t.fieldMask.push(t.path), null;
    }, n.prototype.isEqual = function(t) {
        return t instanceof n;
    }, n;
}(Vl);

/**
 * Creates a child context for parsing SerializableFieldValues.
 *
 * This is different than calling `ParseContext.contextWith` because it keeps
 * the fieldTransforms and fieldMask separate.
 *
 * The created context has its `dataSource` set to `UserDataSource.Argument`.
 * Although these values are used with writes, any elements in these FieldValues
 * are not considered writes since they cannot contain any FieldValue sentinels,
 * etc.
 *
 * @param fieldValue - The sentinel FieldValue for which to create a child
 *     context.
 * @param context - The parent context.
 * @param arrayElement - Whether or not the FieldValue has an array.
 */ function Yl(t, e, n) {
    return new Gl({
        Vu: 3 /* UserDataSource.Argument */ ,
        Du: e.settings.Du,
        methodName: t._methodName,
        gu: n
    }, e.databaseId, e.serializer, e.ignoreUndefinedProperties);
}

var Hl = /** @class */ function(e) {
    function n() {
        return null !== e && e.apply(this, arguments) || this;
    }
    return t(n, e), n.prototype._toFieldTransform = function(t) {
        return new Lr(t.path, new Ar);
    }, n.prototype.isEqual = function(t) {
        return t instanceof n;
    }, n;
}(Vl), Jl = /** @class */ function(e) {
    function n(t, n) {
        var r = this;
        return (r = e.call(this, t) || this).vu = n, r;
    }
    return t(n, e), n.prototype._toFieldTransform = function(t) {
        var e = Yl(this, t, 
        /*array=*/ !0), n = this.vu.map((function(t) {
            return nh(t, e);
        })), r = new kr(n);
        return new Lr(t.path, r);
    }, n.prototype.isEqual = function(t) {
        return t instanceof n && v(this.vu, t.vu);
    }, n;
}(Vl), Xl = /** @class */ function(e) {
    function n(t, n) {
        var r = this;
        return (r = e.call(this, t) || this).vu = n, r;
    }
    return t(n, e), n.prototype._toFieldTransform = function(t) {
        var e = Yl(this, t, 
        /*array=*/ !0), n = this.vu.map((function(t) {
            return nh(t, e);
        })), r = new Or(n);
        return new Lr(t.path, r);
    }, n.prototype.isEqual = function(t) {
        return t instanceof n && v(this.vu, t.vu);
    }, n;
}(Vl), Zl = /** @class */ function(e) {
    function n(t, n) {
        var r = this;
        return (r = e.call(this, t) || this).Fu = n, r;
    }
    return t(n, e), n.prototype._toFieldTransform = function(t) {
        var e = new Mr(t.serializer, Sr(t.serializer, this.Fu));
        return new Lr(t.path, e);
    }, n.prototype.isEqual = function(t) {
        return t instanceof n && this.Fu === t.Fu;
    }, n;
}(Vl);

/** Parse update data from an update() call. */ function $l(t, e, n, r) {
    var i = t.Cu(1 /* UserDataSource.Update */ , e, n);
    oh("Data must be an object, but it was:", i, r);
    var o = [], a = hn.empty();
    Ie(r, (function(t, r) {
        var u = sh(e, t, n);
        // For Compat types, we have to "extract" the underlying types before
        // performing validation.
                r = m(r);
        var s = i.yu(u);
        if (r instanceof Wl) 
        // Add it to the field mask, but don't add anything to updateData.
        o.push(u); else {
            var c = nh(r, s);
            null != c && (o.push(u), a.set(u, c));
        }
    }));
    var u = new Ne(o);
    return new Bl(a, u, i.fieldTransforms);
}

/** Parse update data from a list of field/value arguments. */ function th(t, e, n, r, i, o) {
    var a = t.Cu(1 /* UserDataSource.Update */ , e, n), u = [ ah(e, r, n) ], s = [ i ];
    if (o.length % 2 != 0) throw new j(K.INVALID_ARGUMENT, "Function ".concat(e, "() needs to be called with an even number of arguments that alternate between field names and values."));
    for (var c = 0; c < o.length; c += 2) u.push(ah(e, o[c])), s.push(o[c + 1]);
    // We iterate in reverse order to pick the last value for a field if the
    // user specified the field multiple times.
    for (var l = [], h = hn.empty(), f = u.length - 1; f >= 0; --f) if (!lh(l, u[f])) {
        var d = u[f], p = s[f];
        // For Compat types, we have to "extract" the underlying types before
        // performing validation.
        p = m(p);
        var v = a.yu(d);
        if (p instanceof Wl) 
        // Add it to the field mask, but don't add anything to updateData.
        l.push(d); else {
            var y = nh(p, v);
            null != y && (l.push(d), h.set(d, y));
        }
    }
    var g = new Ne(l);
    return new Bl(h, g, a.fieldTransforms);
}

/**
 * Parse a "query value" (e.g. value in a where filter or a value in a cursor
 * bound).
 *
 * @param allowArrays - Whether the query value is an array that may directly
 * contain additional arrays (e.g. the operand of an `in` query).
 */ function eh(t, e, n, r) {
    return void 0 === r && (r = !1), nh(n, t.Cu(r ? 4 /* UserDataSource.ArrayArgument */ : 3 /* UserDataSource.Argument */ , e));
}

/**
 * Parses user data to Protobuf Values.
 *
 * @param input - Data to be parsed.
 * @param context - A context object representing the current path being parsed,
 * the source of the data being parsed, etc.
 * @returns The parsed value, or null if the value was a FieldValue sentinel
 * that should not be included in the resulting parsed data.
 */ function nh(t, e) {
    if (ih(
    // Unwrap the API type from the Compat SDK. This will return the API type
    // from firestore-exp.
    t = m(t))) return oh("Unsupported field value:", e, t), rh(t, e);
    if (t instanceof Vl) 
    // FieldValues usually parse into transforms (except deleteField())
    // in which case we do not want to include this field in our parsed data
    // (as doing so will overwrite the field directly prior to the transform
    // trying to transform it). So we don't add this location to
    // context.fieldMask and we return null as our parsing result.
    /**
     * "Parses" the provided FieldValueImpl, adding any necessary transforms to
     * context.fieldTransforms.
     */
    return function(t, e) {
        // Sentinels are only supported with writes, and not within arrays.
        if (!zl(e.Vu)) throw e.Su("".concat(t._methodName, "() can only be used with update() and set()"));
        if (!e.path) throw e.Su("".concat(t._methodName, "() is not currently supported inside arrays"));
        var n = t._toFieldTransform(e);
        n && e.fieldTransforms.push(n);
    }(t, e), null;
    if (void 0 === t && e.ignoreUndefinedProperties) 
    // If the input is undefined it can never participate in the fieldMask, so
    // don't handle this below. If `ignoreUndefinedProperties` is false,
    // `parseScalarValue` will reject an undefined value.
    return null;
    if (
    // If context.path is null we are inside an array and we don't support
    // field mask paths more granular than the top-level array.
    e.path && e.fieldMask.push(e.path), t instanceof Array) {
        // TODO(b/34871131): Include the path containing the array in the error
        // message.
        // In the case of IN queries, the parsed data is an array (representing
        // the set of values to be included for the IN query) that may directly
        // contain additional arrays (each representing an individual field
        // value), so we disable this validation.
        if (e.settings.gu && 4 /* UserDataSource.ArrayArgument */ !== e.Vu) throw e.Su("Nested arrays are not supported");
        return function(t, e) {
            for (var n = [], r = 0, i = 0, o = t; i < o.length; i++) {
                var a = nh(o[i], e.wu(r));
                null == a && (
                // Just include nulls in the array for fields being replaced with a
                // sentinel.
                a = {
                    nullValue: "NULL_VALUE"
                }), n.push(a), r++;
            }
            return {
                arrayValue: {
                    values: n
                }
            };
        }(t, e);
    }
    return function(t, e) {
        if (null === (t = m(t))) return {
            nullValue: "NULL_VALUE"
        };
        if ("number" == typeof t) return Sr(e.serializer, t);
        if ("boolean" == typeof t) return {
            booleanValue: t
        };
        if ("string" == typeof t) return {
            stringValue: t
        };
        if (t instanceof Date) {
            var n = ut.fromDate(t);
            return {
                timestampValue: ki(e.serializer, n)
            };
        }
        if (t instanceof ut) {
            // Firestore backend truncates precision down to microseconds. To ensure
            // offline mode works the same with regards to truncation, perform the
            // truncation immediately without waiting for the backend to do that.
            var r = new ut(t.seconds, 1e3 * Math.floor(t.nanoseconds / 1e3));
            return {
                timestampValue: ki(e.serializer, r)
            };
        }
        if (t instanceof Ll) return {
            geoPointValue: {
                latitude: t.latitude,
                longitude: t.longitude
            }
        };
        if (t instanceof Rl) return {
            bytesValue: Pi(e.serializer, t._byteString)
        };
        if (t instanceof ol) {
            var i = e.databaseId, o = t.firestore._databaseId;
            if (!o.isEqual(i)) throw e.Su("Document reference is for database ".concat(o.projectId, "/").concat(o.database, " but should be for database ").concat(i.projectId, "/").concat(i.database));
            return {
                referenceValue: Mi(t.firestore._databaseId || e.databaseId, t._key.path)
            };
        }
        throw e.Su("Unsupported field value: ".concat(Zc(t)));
    }(t, e);
}

function rh(t, e) {
    var n = {};
    return _e(t) ? 
    // If we encounter an empty object, we explicitly add it to the update
    // mask to ensure that the server creates a map entry.
    e.path && e.path.length > 0 && e.fieldMask.push(e.path) : Ie(t, (function(t, r) {
        var i = nh(r, e.fu(t));
        null != i && (n[t] = i);
    })), {
        mapValue: {
            fields: n
        }
    };
}

function ih(t) {
    return !("object" != typeof t || null === t || t instanceof Array || t instanceof Date || t instanceof ut || t instanceof Ll || t instanceof Rl || t instanceof ol || t instanceof Vl);
}

function oh(t, e, n) {
    if (!ih(n) || !function(t) {
        return "object" == typeof t && null !== t && (Object.getPrototypeOf(t) === Object.prototype || null === Object.getPrototypeOf(t));
    }(n)) {
        var r = Zc(n);
        throw "an object" === r ? e.Su(t + " a custom object") : e.Su(t + " " + r);
    }
}

/**
 * Helper that calls fromDotSeparatedString() but wraps any error thrown.
 */ function ah(t, e, n) {
    if (
    // If required, replace the FieldPath Compat class with with the firestore-exp
    // FieldPath.
    (e = m(e)) instanceof Ml) return e._internalPath;
    if ("string" == typeof e) return sh(t, e);
    throw ch("Field path arguments must be of type string or ", t, 
    /* hasConverter= */ !1, 
    /* path= */ void 0, n);
}

/**
 * Matches any characters in a field path string that are reserved.
 */ var uh = new RegExp("[~\\*/\\[\\]]");

/**
 * Wraps fromDotSeparatedString with an error message about the method that
 * was thrown.
 * @param methodName - The publicly visible method name
 * @param path - The dot-separated string form of a field path which will be
 * split on dots.
 * @param targetDoc - The document against which the field path will be
 * evaluated.
 */ function sh(t, e, n) {
    if (e.search(uh) >= 0) throw ch("Invalid field path (".concat(e, "). Paths must not contain '~', '*', '/', '[', or ']'"), t, 
    /* hasConverter= */ !1, 
    /* path= */ void 0, n);
    try {
        return (new (Ml.bind.apply(Ml, r([ void 0 ], e.split("."), !1))))._internalPath;
    } catch (r) {
        throw ch("Invalid field path (".concat(e, "). Paths must not be empty, begin with '.', end with '.', or contain '..'"), t, 
        /* hasConverter= */ !1, 
        /* path= */ void 0, n);
    }
}

function ch(t, e, n, r, i) {
    var o = r && !r.isEmpty(), a = void 0 !== i, u = "Function ".concat(e, "() called with invalid data");
    n && (u += " (via `toFirestore()`)"), u += ". ";
    var s = "";
    return (o || a) && (s += " (found", o && (s += " in field ".concat(r)), a && (s += " in document ".concat(i)), 
    s += ")"), new j(K.INVALID_ARGUMENT, u + t + s)
    /** Checks `haystack` if FieldPath `needle` is present. Runs in O(n). */;
}

function lh(t, e) {
    return t.some((function(t) {
        return t.isEqual(e);
    }));
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A `DocumentSnapshot` contains data read from a document in your Firestore
 * database. The data can be extracted with `.data()` or `.get(<field>)` to
 * get a specific field.
 *
 * For a `DocumentSnapshot` that points to a non-existing document, any data
 * access will return 'undefined'. You can use the `exists()` method to
 * explicitly verify a document's existence.
 */ var hh = /** @class */ function() {
    // Note: This class is stripped down version of the DocumentSnapshot in
    // the legacy SDK. The changes are:
    // - No support for SnapshotMetadata.
    // - No support for SnapshotOptions.
    /** @hideconstructor protected */
    function t(t, e, n, r, i) {
        this._firestore = t, this._userDataWriter = e, this._key = n, this._document = r, 
        this._converter = i;
    }
    return Object.defineProperty(t.prototype, "id", {
        /** Property of the `DocumentSnapshot` that provides the document's ID. */ get: function() {
            return this._key.path.lastSegment();
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "ref", {
        /**
         * The `DocumentReference` for the document included in the `DocumentSnapshot`.
         */
        get: function() {
            return new ol(this._firestore, this._converter, this._key);
        },
        enumerable: !1,
        configurable: !0
    }), 
    /**
     * Signals whether or not the document at the snapshot's location exists.
     *
     * @returns true if the document exists.
     */
    t.prototype.exists = function() {
        return null !== this._document;
    }, 
    /**
     * Retrieves all fields in the document as an `Object`. Returns `undefined` if
     * the document doesn't exist.
     *
     * @returns An `Object` containing all fields in the document or `undefined`
     * if the document doesn't exist.
     */
    t.prototype.data = function() {
        if (this._document) {
            if (this._converter) {
                // We only want to use the converter and create a new DocumentSnapshot
                // if a converter has been provided.
                var t = new fh(this._firestore, this._userDataWriter, this._key, this._document, 
                /* converter= */ null);
                return this._converter.fromFirestore(t);
            }
            return this._userDataWriter.convertValue(this._document.data.value);
        }
    }, 
    /**
     * Retrieves the field specified by `fieldPath`. Returns `undefined` if the
     * document or field doesn't exist.
     *
     * @param fieldPath - The path (for example 'foo' or 'foo.bar') to a specific
     * field.
     * @returns The data at the specified field location or undefined if no such
     * field exists in the document.
     */
    // We are using `any` here to avoid an explicit cast by our users.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    t.prototype.get = function(t) {
        if (this._document) {
            var e = this._document.data.field(dh("DocumentSnapshot.get", t));
            if (null !== e) return this._userDataWriter.convertValue(e);
        }
    }, t;
}(), fh = /** @class */ function(e) {
    function n() {
        return null !== e && e.apply(this, arguments) || this;
    }
    /**
     * Retrieves all fields in the document as an `Object`.
     *
     * @override
     * @returns An `Object` containing all fields in the document.
     */    return t(n, e), n.prototype.data = function() {
        return e.prototype.data.call(this);
    }, n;
}(hh);

/**
 * A `QueryDocumentSnapshot` contains data read from a document in your
 * Firestore database as part of a query. The document is guaranteed to exist
 * and its data can be extracted with `.data()` or `.get(<field>)` to get a
 * specific field.
 *
 * A `QueryDocumentSnapshot` offers the same API surface as a
 * `DocumentSnapshot`. Since query results contain only existing documents, the
 * `exists` property will always be true and `data()` will never return
 * 'undefined'.
 */
/**
 * Helper that calls `fromDotSeparatedString()` but wraps any error thrown.
 */
function dh(t, e) {
    return "string" == typeof e ? sh(t, e) : e instanceof Ml ? e._internalPath : e._delegate._internalPath;
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function ph(t) {
    if ("L" /* LimitType.Last */ === t.limitType && 0 === t.explicitOrderBy.length) throw new j(K.UNIMPLEMENTED, "limitToLast() queries require specifying at least one orderBy() clause");
}

/**
 * An `AppliableConstraint` is an abstraction of a constraint that can be applied
 * to a Firestore query.
 */ var vh = function() {}, mh = /** @class */ function(e) {
    function n() {
        return null !== e && e.apply(this, arguments) || this;
    }
    return t(n, e), n;
}(vh);

/**
 * A `QueryConstraint` is used to narrow the set of documents returned by a
 * Firestore query. `QueryConstraint`s are created by invoking {@link where},
 * {@link orderBy}, {@link (startAt:1)}, {@link (startAfter:1)}, {@link
 * (endBefore:1)}, {@link (endAt:1)}, {@link limit}, {@link limitToLast} and
 * can then be passed to {@link (query:1)} to create a new query instance that
 * also contains this `QueryConstraint`.
 */ function yh(t, e) {
    for (var n = [], r = 2; r < arguments.length; r++) n[r - 2] = arguments[r];
    var i = [];
    e instanceof vh && i.push(e), function(t) {
        var e = t.filter((function(t) {
            return t instanceof bh;
        })).length, n = t.filter((function(t) {
            return t instanceof gh;
        })).length;
        if (e > 1 || e > 0 && n > 0) throw new j(K.INVALID_ARGUMENT, "InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.");
    }(i = i.concat(n));
    for (var o = 0, a = i; o < a.length; o++) {
        var u = a[o];
        t = u._apply(t);
    }
    return t;
}

/**
 * A `QueryFieldFilterConstraint` is used to narrow the set of documents returned by
 * a Firestore query by filtering on one or more document fields.
 * `QueryFieldFilterConstraint`s are created by invoking {@link where} and can then
 * be passed to {@link (query:1)} to create a new query instance that also contains
 * this `QueryFieldFilterConstraint`.
 */ var gh = /** @class */ function(e) {
    /**
     * @internal
     */
    function n(t, n, r) {
        var i = this;
        return (i = e.call(this) || this)._field = t, i._op = n, i._value = r, 
        /** The type of this query constraint */
        i.type = "where", i;
    }
    return t(n, e), n._create = function(t, e, r) {
        return new n(t, e, r);
    }, n.prototype._apply = function(t) {
        var e = this._parse(t);
        return Vh(t._query, e), new il(t.firestore, t.converter, tr(t._query, e));
    }, n.prototype._parse = function(t) {
        var e = jl(t.firestore), n = function(t, e, n, r, i, o, a) {
            var u;
            if (i.isKeyField()) {
                if ("array-contains" /* Operator.ARRAY_CONTAINS */ === o || "array-contains-any" /* Operator.ARRAY_CONTAINS_ANY */ === o) throw new j(K.INVALID_ARGUMENT, "Invalid Query. You can't perform '".concat(o, "' queries on documentId()."));
                if ("in" /* Operator.IN */ === o || "not-in" /* Operator.NOT_IN */ === o) {
                    Fh(a, o);
                    for (var s = [], c = 0, l = a; c < l.length; c++) {
                        var h = l[c];
                        s.push(Mh(r, t, h));
                    }
                    u = {
                        arrayValue: {
                            values: s
                        }
                    };
                } else u = Mh(r, t, a);
            } else "in" /* Operator.IN */ !== o && "not-in" /* Operator.NOT_IN */ !== o && "array-contains-any" /* Operator.ARRAY_CONTAINS_ANY */ !== o || Fh(a, o), 
            u = eh(n, e, a, 
            /* allowArrays= */ "in" /* Operator.IN */ === o || "not-in" /* Operator.NOT_IN */ === o);
            return bn.create(i, o, u);
        }(t._query, "where", e, t.firestore._databaseId, this._field, this._op, this._value);
        return n;
    }, n;
}(mh);

/**
 * Creates a {@link QueryFieldFilterConstraint} that enforces that documents
 * must contain the specified field and that the value should satisfy the
 * relation constraint provided.
 *
 * @param fieldPath - The path to compare
 * @param opStr - The operation string (e.g "&lt;", "&lt;=", "==", "&lt;",
 *   "&lt;=", "!=").
 * @param value - The value for comparison
 * @returns The created {@link QueryFieldFilterConstraint}.
 */ function wh(t, e, n) {
    var r = e, i = dh("where", t);
    return gh._create(i, r, n);
}

/**
 * A `QueryCompositeFilterConstraint` is used to narrow the set of documents
 * returned by a Firestore query by performing the logical OR or AND of multiple
 * {@link QueryFieldFilterConstraint}s or {@link QueryCompositeFilterConstraint}s.
 * `QueryCompositeFilterConstraint`s are created by invoking {@link or} or
 * {@link and} and can then be passed to {@link (query:1)} to create a new query
 * instance that also contains the `QueryCompositeFilterConstraint`.
 */ var bh = /** @class */ function(e) {
    /**
     * @internal
     */
    function n(
    /** The type of this query constraint */
    t, n) {
        var r = this;
        return (r = e.call(this) || this).type = t, r._queryConstraints = n, r;
    }
    return t(n, e), n._create = function(t, e) {
        return new n(t, e);
    }, n.prototype._parse = function(t) {
        var e = this._queryConstraints.map((function(e) {
            return e._parse(t);
        })).filter((function(t) {
            return t.getFilters().length > 0;
        }));
        return 1 === e.length ? e[0] : In.create(e, this._getOperator());
    }, n.prototype._apply = function(t) {
        var e = this._parse(t);
        return 0 === e.getFilters().length ? t : (function(t, e) {
            for (var n = t, r = 0, i = e.getFlattenedFilters(); r < i.length; r++) {
                var o = i[r];
                Vh(n, o), n = tr(n, o);
            }
        }(t._query, e), new il(t.firestore, t.converter, tr(t._query, e)));
    }, n.prototype._getQueryConstraints = function() {
        return this._queryConstraints;
    }, n.prototype._getOperator = function() {
        return "and" === this.type ? "and" /* CompositeOperator.AND */ : "or" /* CompositeOperator.OR */;
    }, n;
}(vh);

/**
 * Creates a new {@link QueryCompositeFilterConstraint} that is a disjunction of
 * the given filter constraints. A disjunction filter includes a document if it
 * satisfies any of the given filters.
 *
 * @param queryConstraints - Optional. The list of
 * {@link QueryFilterConstraint}s to perform a disjunction for. These must be
 * created with calls to {@link where}, {@link or}, or {@link and}.
 * @returns The newly created {@link QueryCompositeFilterConstraint}.
 */ function Ih() {
    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
    // Only support QueryFilterConstraints
        return t.forEach((function(t) {
        return Lh("or", t);
    })), bh._create("or" /* CompositeOperator.OR */ , t)
    /**
 * Creates a new {@link QueryCompositeFilterConstraint} that is a conjunction of
 * the given filter constraints. A conjunction filter includes a document if it
 * satisfies all of the given filters.
 *
 * @param queryConstraints - Optional. The list of
 * {@link QueryFilterConstraint}s to perform a conjunction for. These must be
 * created with calls to {@link where}, {@link or}, or {@link and}.
 * @returns The newly created {@link QueryCompositeFilterConstraint}.
 */;
}

function _h() {
    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
    // Only support QueryFilterConstraints
        return t.forEach((function(t) {
        return Lh("and", t);
    })), bh._create("and" /* CompositeOperator.AND */ , t)
    /**
 * A `QueryOrderByConstraint` is used to sort the set of documents returned by a
 * Firestore query. `QueryOrderByConstraint`s are created by invoking
 * {@link orderBy} and can then be passed to {@link (query:1)} to create a new query
 * instance that also contains this `QueryOrderByConstraint`.
 *
 * Note: Documents that do not contain the orderBy field will not be present in
 * the query result.
 */;
}

var Eh = /** @class */ function(e) {
    /**
     * @internal
     */
    function n(t, n) {
        var r = this;
        return (r = e.call(this) || this)._field = t, r._direction = n, 
        /** The type of this query constraint */
        r.type = "orderBy", r;
    }
    return t(n, e), n._create = function(t, e) {
        return new n(t, e);
    }, n.prototype._apply = function(t) {
        var e = function(t, e, n) {
            if (null !== t.startAt) throw new j(K.INVALID_ARGUMENT, "Invalid query. You must not call startAt() or startAfter() before calling orderBy().");
            if (null !== t.endAt) throw new j(K.INVALID_ARGUMENT, "Invalid query. You must not call endAt() or endBefore() before calling orderBy().");
            return new yn(e, n);
        }(t._query, this._field, this._direction);
        return new il(t.firestore, t.converter, function(t, e) {
            // TODO(dimond): validate that orderBy does not list the same key twice.
            var n = t.explicitOrderBy.concat([ e ]);
            return new Qn(t.path, t.collectionGroup, n, t.filters.slice(), t.limit, t.limitType, t.startAt, t.endAt);
        }(t._query, e));
    }, n;
}(mh);

/**
 * Creates a {@link QueryOrderByConstraint} that sorts the query result by the
 * specified field, optionally in descending order instead of ascending.
 *
 * Note: Documents that do not contain the specified field will not be present
 * in the query result.
 *
 * @param fieldPath - The field to sort by.
 * @param directionStr - Optional direction to sort by ('asc' or 'desc'). If
 * not specified, order will be ascending.
 * @returns The created {@link QueryOrderByConstraint}.
 */ function Th(t, e) {
    void 0 === e && (e = "asc");
    var n = e, r = dh("orderBy", t);
    return Eh._create(r, n);
}

/**
 * A `QueryLimitConstraint` is used to limit the number of documents returned by
 * a Firestore query.
 * `QueryLimitConstraint`s are created by invoking {@link limit} or
 * {@link limitToLast} and can then be passed to {@link (query:1)} to create a new
 * query instance that also contains this `QueryLimitConstraint`.
 */ var Sh = /** @class */ function(e) {
    /**
     * @internal
     */
    function n(
    /** The type of this query constraint */
    t, n, r) {
        var i = this;
        return (i = e.call(this) || this).type = t, i._limit = n, i._limitType = r, i;
    }
    return t(n, e), n._create = function(t, e, r) {
        return new n(t, e, r);
    }, n.prototype._apply = function(t) {
        return new il(t.firestore, t.converter, er(t._query, this._limit, this._limitType));
    }, n;
}(mh);

/**
 * Creates a {@link QueryLimitConstraint} that only returns the first matching
 * documents.
 *
 * @param limit - The maximum number of items to return.
 * @returns The created {@link QueryLimitConstraint}.
 */ function xh(t) {
    return tl("limit", t), Sh._create("limit", t, "F" /* LimitType.First */)
    /**
 * Creates a {@link QueryLimitConstraint} that only returns the last matching
 * documents.
 *
 * You must specify at least one `orderBy` clause for `limitToLast` queries,
 * otherwise an exception will be thrown during execution.
 *
 * @param limit - The maximum number of items to return.
 * @returns The created {@link QueryLimitConstraint}.
 */;
}

function Ch(t) {
    return tl("limitToLast", t), Sh._create("limitToLast", t, "L" /* LimitType.Last */)
    /**
 * A `QueryStartAtConstraint` is used to exclude documents from the start of a
 * result set returned by a Firestore query.
 * `QueryStartAtConstraint`s are created by invoking {@link (startAt:1)} or
 * {@link (startAfter:1)} and can then be passed to {@link (query:1)} to create a
 * new query instance that also contains this `QueryStartAtConstraint`.
 */;
}

var Dh = /** @class */ function(e) {
    /**
     * @internal
     */
    function n(
    /** The type of this query constraint */
    t, n, r) {
        var i = this;
        return (i = e.call(this) || this).type = t, i._docOrFields = n, i._inclusive = r, 
        i;
    }
    return t(n, e), n._create = function(t, e, r) {
        return new n(t, e, r);
    }, n.prototype._apply = function(t) {
        var e = Rh(t, this.type, this._docOrFields, this._inclusive);
        return new il(t.firestore, t.converter, function(t, e) {
            return new Qn(t.path, t.collectionGroup, t.explicitOrderBy.slice(), t.filters.slice(), t.limit, t.limitType, e, t.endAt);
        }(t._query, e));
    }, n;
}(mh);

function Nh() {
    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
    return Dh._create("startAt", t, 
    /*inclusive=*/ !0);
}

function Ah() {
    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
    return Dh._create("startAfter", t, 
    /*inclusive=*/ !1);
}

/**
 * A `QueryEndAtConstraint` is used to exclude documents from the end of a
 * result set returned by a Firestore query.
 * `QueryEndAtConstraint`s are created by invoking {@link (endAt:1)} or
 * {@link (endBefore:1)} and can then be passed to {@link (query:1)} to create a new
 * query instance that also contains this `QueryEndAtConstraint`.
 */ var kh = /** @class */ function(e) {
    /**
     * @internal
     */
    function n(
    /** The type of this query constraint */
    t, n, r) {
        var i = this;
        return (i = e.call(this) || this).type = t, i._docOrFields = n, i._inclusive = r, 
        i;
    }
    return t(n, e), n._create = function(t, e, r) {
        return new n(t, e, r);
    }, n.prototype._apply = function(t) {
        var e = Rh(t, this.type, this._docOrFields, this._inclusive);
        return new il(t.firestore, t.converter, function(t, e) {
            return new Qn(t.path, t.collectionGroup, t.explicitOrderBy.slice(), t.filters.slice(), t.limit, t.limitType, t.startAt, e);
        }(t._query, e));
    }, n;
}(mh);

function Ph() {
    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
    return kh._create("endBefore", t, 
    /*inclusive=*/ !1);
}

function Oh() {
    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
    return kh._create("endAt", t, 
    /*inclusive=*/ !0);
}

/** Helper function to create a bound from a document or fields */ function Rh(t, e, n, r) {
    if (n[0] = m(n[0]), n[0] instanceof hh) return function(t, e, n, r, i) {
        if (!r) throw new j(K.NOT_FOUND, "Can't use a DocumentSnapshot that doesn't exist for ".concat(n, "()."));
        // Because people expect to continue/end a query at the exact document
        // provided, we need to use the implicit sort order rather than the explicit
        // sort order, because it's guaranteed to contain the document key. That way
        // the position becomes unambiguous and the query continues/ends exactly at
        // the provided document. Without the key (by using the explicit sort
        // orders), multiple documents could match the position, yielding duplicate
        // results.
        for (var o = [], a = 0, u = Xn(t); a < u.length; a++) {
            var s = u[a];
            if (s.field.isKeyField()) o.push(Ze(e, r.key)); else {
                var c = r.data.field(s.field);
                if (Ve(c)) throw new j(K.INVALID_ARGUMENT, 'Invalid query. You are trying to start or end a query using a document for which the field "' + s.field + '" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');
                if (null === c) {
                    var l = s.field.canonicalString();
                    throw new j(K.INVALID_ARGUMENT, "Invalid query. You are trying to start or end a query using a document for which the field '".concat(l, "' (used as the orderBy) does not exist."));
                }
                o.push(c);
            }
        }
        return new pn(o, i);
    }(t._query, t.firestore._databaseId, e, n[0]._document, r);
    var i = jl(t.firestore);
    return function(t, e, n, r, i, o) {
        // Use explicit order by's because it has to match the query the user made
        var a = t.explicitOrderBy;
        if (i.length > a.length) throw new j(K.INVALID_ARGUMENT, "Too many arguments provided to ".concat(r, "(). The number of arguments must be less than or equal to the number of orderBy() clauses"));
        for (var u = [], s = 0; s < i.length; s++) {
            var c = i[s];
            if (a[s].field.isKeyField()) {
                if ("string" != typeof c) throw new j(K.INVALID_ARGUMENT, "Invalid query. Expected a string for document ID in ".concat(r, "(), but got a ").concat(typeof c));
                if (!Jn(t) && -1 !== c.indexOf("/")) throw new j(K.INVALID_ARGUMENT, "Invalid query. When querying a collection and ordering by documentId(), the value passed to ".concat(r, "() must be a plain document ID, but '").concat(c, "' contains a slash."));
                var l = t.path.child(lt.fromString(c));
                if (!dt.isDocumentKey(l)) throw new j(K.INVALID_ARGUMENT, "Invalid query. When querying a collection group and ordering by documentId(), the value passed to ".concat(r, "() must result in a valid document path, but '").concat(l, "' is not because it contains an odd number of segments."));
                var h = new dt(l);
                u.push(Ze(e, h));
            } else {
                var f = eh(n, r, c);
                u.push(f);
            }
        }
        return new pn(u, o);
    }(t._query, t.firestore._databaseId, i, e, n, r);
}

function Mh(t, e, n) {
    if ("string" == typeof (n = m(n))) {
        if ("" === n) throw new j(K.INVALID_ARGUMENT, "Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");
        if (!Jn(e) && -1 !== n.indexOf("/")) throw new j(K.INVALID_ARGUMENT, "Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '".concat(n, "' contains a '/' character."));
        var r = e.path.child(lt.fromString(n));
        if (!dt.isDocumentKey(r)) throw new j(K.INVALID_ARGUMENT, "Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '".concat(r, "' is not because it has an odd number of segments (").concat(r.length, ")."));
        return Ze(t, new dt(r));
    }
    if (n instanceof ol) return Ze(t, n._key);
    throw new j(K.INVALID_ARGUMENT, "Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ".concat(Zc(n), "."));
}

/**
 * Validates that the value passed into a disjunctive filter satisfies all
 * array requirements.
 */ function Fh(t, e) {
    if (!Array.isArray(t) || 0 === t.length) throw new j(K.INVALID_ARGUMENT, "Invalid Query. A non-empty array is required for '".concat(e.toString(), "' filters."));
}

/**
 * Given an operator, returns the set of operators that cannot be used with it.
 *
 * This is not a comprehensive check, and this function should be removed in the
 * long term. Validations should occur in the Firestore backend.
 *
 * Operators in a query must adhere to the following set of rules:
 * 1. Only one inequality per query.
 * 2. `NOT_IN` cannot be used with array, disjunctive, or `NOT_EQUAL` operators.
 */ function Vh(t, e) {
    var n = function(t, e) {
        for (var n = 0, r = t; n < r.length; n++) for (var i = 0, o = r[n].getFlattenedFilters(); i < o.length; i++) {
            var a = o[i];
            if (e.indexOf(a.op) >= 0) return a.op;
        }
        return null;
    }(t.filters, function(t) {
        switch (t) {
          case "!=" /* Operator.NOT_EQUAL */ :
            return [ "!=" /* Operator.NOT_EQUAL */ , "not-in" /* Operator.NOT_IN */ ];

          case "array-contains-any" /* Operator.ARRAY_CONTAINS_ANY */ :
          case "in" /* Operator.IN */ :
            return [ "not-in" /* Operator.NOT_IN */ ];

          case "not-in" /* Operator.NOT_IN */ :
            return [ "array-contains-any" /* Operator.ARRAY_CONTAINS_ANY */ , "in" /* Operator.IN */ , "not-in" /* Operator.NOT_IN */ , "!=" /* Operator.NOT_EQUAL */ ];

          default:
            return [];
        }
    }(e.op));
    if (null !== n) 
    // Special case when it's a duplicate op to give a slightly clearer error message.
    throw n === e.op ? new j(K.INVALID_ARGUMENT, "Invalid query. You cannot use more than one '".concat(e.op.toString(), "' filter.")) : new j(K.INVALID_ARGUMENT, "Invalid query. You cannot use '".concat(e.op.toString(), "' filters with '").concat(n.toString(), "' filters."));
}

function Lh(t, e) {
    if (!(e instanceof gh || e instanceof bh)) throw new j(K.INVALID_ARGUMENT, "Function ".concat(t, "() requires AppliableConstraints created with a call to 'where(...)', 'or(...)', or 'and(...)'."));
}

var qh = /** @class */ function() {
    function t() {}
    return t.prototype.convertValue = function(t, e) {
        switch (void 0 === e && (e = "none"), Ke(t)) {
          case 0 /* TypeOrder.NullValue */ :
            return null;

          case 1 /* TypeOrder.BooleanValue */ :
            return t.booleanValue;

          case 2 /* TypeOrder.NumberValue */ :
            return Me(t.integerValue || t.doubleValue);

          case 3 /* TypeOrder.TimestampValue */ :
            return this.convertTimestamp(t.timestampValue);

          case 4 /* TypeOrder.ServerTimestampValue */ :
            return this.convertServerTimestamp(t, e);

          case 5 /* TypeOrder.StringValue */ :
            return t.stringValue;

          case 6 /* TypeOrder.BlobValue */ :
            return this.convertBytes(Fe(t.bytesValue));

          case 7 /* TypeOrder.RefValue */ :
            return this.convertReference(t.referenceValue);

          case 8 /* TypeOrder.GeoPointValue */ :
            return this.convertGeoPoint(t.geoPointValue);

          case 9 /* TypeOrder.ArrayValue */ :
            return this.convertArray(t.arrayValue, e);

          case 10 /* TypeOrder.ObjectValue */ :
            return this.convertObject(t.mapValue, e);

          default:
            throw U();
        }
    }, t.prototype.convertObject = function(t, e) {
        return this.convertObjectMap(t.fields, e);
    }, 
    /**
     * @internal
     */
    t.prototype.convertObjectMap = function(t, e) {
        var n = this;
        void 0 === e && (e = "none");
        var r = {};
        return Ie(t, (function(t, i) {
            r[t] = n.convertValue(i, e);
        })), r;
    }, t.prototype.convertGeoPoint = function(t) {
        return new Ll(Me(t.latitude), Me(t.longitude));
    }, t.prototype.convertArray = function(t, e) {
        var n = this;
        return (t.values || []).map((function(t) {
            return n.convertValue(t, e);
        }));
    }, t.prototype.convertServerTimestamp = function(t, e) {
        switch (e) {
          case "previous":
            var n = Le(t);
            return null == n ? null : this.convertValue(n, e);

          case "estimate":
            return this.convertTimestamp(qe(t));

          default:
            return null;
        }
    }, t.prototype.convertTimestamp = function(t) {
        var e = Re(t);
        return new ut(e.seconds, e.nanos);
    }, t.prototype.convertDocumentKey = function(t, e) {
        var n = lt.fromString(t);
        B(oo(n));
        var r = new Be(n.get(1), n.get(3)), i = new dt(n.popFirst(5));
        return r.isEqual(e) || 
        // TODO(b/64130202): Somehow support foreign references.
        V("Document ".concat(i, " contains a document reference within a different database (").concat(r.projectId, "/").concat(r.database, ") which is not supported. It will be treated as a reference in the current database (").concat(e.projectId, "/").concat(e.database, ") instead.")), 
        i;
    }, t;
}();

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Converts custom model object of type T into `DocumentData` by applying the
 * converter if it exists.
 *
 * This function is used when converting user objects to `DocumentData`
 * because we want to provide the user with a more specific error message if
 * their `set()` or fails due to invalid data originating from a `toFirestore()`
 * call.
 */ function Uh(t, e, n) {
    // Cast to `any` in order to satisfy the union type constraint on
    // toFirestore().
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return t ? n && (n.merge || n.mergeFields) ? t.toFirestore(e, n) : t.toFirestore(e) : e;
}

var Bh = /** @class */ function(e) {
    function n(t) {
        var n = this;
        return (n = e.call(this) || this).firestore = t, n;
    }
    return t(n, e), n.prototype.convertBytes = function(t) {
        return new Rl(t);
    }, n.prototype.convertReference = function(t) {
        var e = this.convertDocumentKey(t, this.firestore._databaseId);
        return new ol(this.firestore, /* converter= */ null, e);
    }, n;
}(qh);

/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Create an AggregateField object that can be used to compute the sum of
 * a specified field over a range of documents in the result set of a query.
 * @param field Specifies the field to sum across the result set.
 */ function zh(t) {
    return new Pl("sum", ah("sum", t));
}

/**
 * Create an AggregateField object that can be used to compute the average of
 * a specified field over a range of documents in the result set of a query.
 * @param field Specifies the field to average across the result set.
 */ function Gh(t) {
    return new Pl("avg", ah("average", t));
}

/**
 * Create an AggregateField object that can be used to compute the count of
 * documents in the result set of a query.
 */ function Kh() {
    return new Pl("count");
}

/**
 * Compares two 'AggregateField` instances for equality.
 *
 * @param left Compare this AggregateField to the `right`.
 * @param right Compare this AggregateField to the `left`.
 */ function jh(t, e) {
    var n, r;
    return t instanceof Pl && e instanceof Pl && t.aggregateType === e.aggregateType && (null === (n = t._internalFieldPath) || void 0 === n ? void 0 : n.canonicalString()) === (null === (r = e._internalFieldPath) || void 0 === r ? void 0 : r.canonicalString());
}

/**
 * Compares two `AggregateQuerySnapshot` instances for equality.
 *
 * Two `AggregateQuerySnapshot` instances are considered "equal" if they have
 * underlying queries that compare equal, and the same data.
 *
 * @param left - The first `AggregateQuerySnapshot` to compare.
 * @param right - The second `AggregateQuerySnapshot` to compare.
 *
 * @returns `true` if the objects are "equal", as defined above, or `false`
 * otherwise.
 */ function Qh(t, e) {
    return hl(t.query, e.query) && v(t.data(), e.data());
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Metadata about a snapshot, describing the state of the snapshot.
 */ var Wh = /** @class */ function() {
    /** @hideconstructor */
    function t(t, e) {
        this.hasPendingWrites = t, this.fromCache = e
        /**
     * Returns true if this `SnapshotMetadata` is equal to the provided one.
     *
     * @param other - The `SnapshotMetadata` to compare against.
     * @returns true if this `SnapshotMetadata` is equal to the provided one.
     */;
    }
    return t.prototype.isEqual = function(t) {
        return this.hasPendingWrites === t.hasPendingWrites && this.fromCache === t.fromCache;
    }, t;
}(), Yh = /** @class */ function(e) {
    /** @hideconstructor protected */
    function n(t, n, r, i, o, a) {
        var u = this;
        return (u = e.call(this, t, n, r, i, a) || this)._firestore = t, u._firestoreImpl = t, 
        u.metadata = o, u;
    }
    /**
     * Returns whether or not the data exists. True if the document exists.
     */    return t(n, e), n.prototype.exists = function() {
        return e.prototype.exists.call(this);
    }, 
    /**
     * Retrieves all fields in the document as an `Object`. Returns `undefined` if
     * the document doesn't exist.
     *
     * By default, `serverTimestamp()` values that have not yet been
     * set to their final value will be returned as `null`. You can override
     * this by passing an options object.
     *
     * @param options - An options object to configure how data is retrieved from
     * the snapshot (for example the desired behavior for server timestamps that
     * have not yet been set to their final value).
     * @returns An `Object` containing all fields in the document or `undefined` if
     * the document doesn't exist.
     */
    n.prototype.data = function(t) {
        if (void 0 === t && (t = {}), this._document) {
            if (this._converter) {
                // We only want to use the converter and create a new DocumentSnapshot
                // if a converter has been provided.
                var e = new Hh(this._firestore, this._userDataWriter, this._key, this._document, this.metadata, 
                /* converter= */ null);
                return this._converter.fromFirestore(e, t);
            }
            return this._userDataWriter.convertValue(this._document.data.value, t.serverTimestamps);
        }
    }, 
    /**
     * Retrieves the field specified by `fieldPath`. Returns `undefined` if the
     * document or field doesn't exist.
     *
     * By default, a `serverTimestamp()` that has not yet been set to
     * its final value will be returned as `null`. You can override this by
     * passing an options object.
     *
     * @param fieldPath - The path (for example 'foo' or 'foo.bar') to a specific
     * field.
     * @param options - An options object to configure how the field is retrieved
     * from the snapshot (for example the desired behavior for server timestamps
     * that have not yet been set to their final value).
     * @returns The data at the specified field location or undefined if no such
     * field exists in the document.
     */
    // We are using `any` here to avoid an explicit cast by our users.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    n.prototype.get = function(t, e) {
        if (void 0 === e && (e = {}), this._document) {
            var n = this._document.data.field(dh("DocumentSnapshot.get", t));
            if (null !== n) return this._userDataWriter.convertValue(n, e.serverTimestamps);
        }
    }, n;
}(hh), Hh = /** @class */ function(e) {
    function n() {
        return null !== e && e.apply(this, arguments) || this;
    }
    /**
     * Retrieves all fields in the document as an `Object`.
     *
     * By default, `serverTimestamp()` values that have not yet been
     * set to their final value will be returned as `null`. You can override
     * this by passing an options object.
     *
     * @override
     * @param options - An options object to configure how data is retrieved from
     * the snapshot (for example the desired behavior for server timestamps that
     * have not yet been set to their final value).
     * @returns An `Object` containing all fields in the document.
     */    return t(n, e), n.prototype.data = function(t) {
        return void 0 === t && (t = {}), e.prototype.data.call(this, t);
    }, n;
}(Yh), Jh = /** @class */ function() {
    /** @hideconstructor */
    function t(t, e, n, r) {
        this._firestore = t, this._userDataWriter = e, this._snapshot = r, this.metadata = new Wh(r.hasPendingWrites, r.fromCache), 
        this.query = n;
    }
    return Object.defineProperty(t.prototype, "docs", {
        /** An array of all the documents in the `QuerySnapshot`. */ get: function() {
            var t = [];
            return this.forEach((function(e) {
                return t.push(e);
            })), t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "size", {
        /** The number of documents in the `QuerySnapshot`. */ get: function() {
            return this._snapshot.docs.size;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "empty", {
        /** True if there are no documents in the `QuerySnapshot`. */ get: function() {
            return 0 === this.size;
        },
        enumerable: !1,
        configurable: !0
    }), 
    /**
     * Enumerates all of the documents in the `QuerySnapshot`.
     *
     * @param callback - A callback to be called with a `QueryDocumentSnapshot` for
     * each document in the snapshot.
     * @param thisArg - The `this` binding for the callback.
     */
    t.prototype.forEach = function(t, e) {
        var n = this;
        this._snapshot.docs.forEach((function(r) {
            t.call(e, new Hh(n._firestore, n._userDataWriter, r.key, r, new Wh(n._snapshot.mutatedKeys.has(r.key), n._snapshot.fromCache), n.query.converter));
        }));
    }, 
    /**
     * Returns an array of the documents changes since the last snapshot. If this
     * is the first snapshot, all documents will be in the list as 'added'
     * changes.
     *
     * @param options - `SnapshotListenOptions` that control whether metadata-only
     * changes (i.e. only `DocumentSnapshot.metadata` changed) should trigger
     * snapshot events.
     */
    t.prototype.docChanges = function(t) {
        void 0 === t && (t = {});
        var e = !!t.includeMetadataChanges;
        if (e && this._snapshot.excludesMetadataChanges) throw new j(K.INVALID_ARGUMENT, "To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");
        return this._cachedChanges && this._cachedChangesIncludeMetadataChanges === e || (this._cachedChanges = 
        /** Calculates the array of `DocumentChange`s for a given `ViewSnapshot`. */
        function(t, e) {
            if (t._snapshot.oldDocs.isEmpty()) {
                var n = 0;
                return t._snapshot.docChanges.map((function(e) {
                    var r = new Hh(t._firestore, t._userDataWriter, e.doc.key, e.doc, new Wh(t._snapshot.mutatedKeys.has(e.doc.key), t._snapshot.fromCache), t.query.converter);
                    return e.doc, {
                        type: "added",
                        doc: r,
                        oldIndex: -1,
                        newIndex: n++
                    };
                }));
            }
            // A `DocumentSet` that is updated incrementally as changes are applied to use
            // to lookup the index of a document.
            var r = t._snapshot.oldDocs;
            return t._snapshot.docChanges.filter((function(t) {
                return e || 3 /* ChangeType.Metadata */ !== t.type;
            })).map((function(e) {
                var n = new Hh(t._firestore, t._userDataWriter, e.doc.key, e.doc, new Wh(t._snapshot.mutatedKeys.has(e.doc.key), t._snapshot.fromCache), t.query.converter), i = -1, o = -1;
                return 0 /* ChangeType.Added */ !== e.type && (i = r.indexOf(e.doc.key), r = r.delete(e.doc.key)), 
                1 /* ChangeType.Removed */ !== e.type && (o = (r = r.add(e.doc)).indexOf(e.doc.key)), 
                {
                    type: Xh(e.type),
                    doc: n,
                    oldIndex: i,
                    newIndex: o
                };
            }));
        }(this, e), this._cachedChangesIncludeMetadataChanges = e), this._cachedChanges;
    }, t;
}();

/**
 * A `DocumentSnapshot` contains data read from a document in your Firestore
 * database. The data can be extracted with `.data()` or `.get(<field>)` to
 * get a specific field.
 *
 * For a `DocumentSnapshot` that points to a non-existing document, any data
 * access will return 'undefined'. You can use the `exists()` method to
 * explicitly verify a document's existence.
 */ function Xh(t) {
    switch (t) {
      case 0 /* ChangeType.Added */ :
        return "added";

      case 2 /* ChangeType.Modified */ :
      case 3 /* ChangeType.Metadata */ :
        return "modified";

      case 1 /* ChangeType.Removed */ :
        return "removed";

      default:
        return U();
    }
}

// TODO(firestoreexp): Add tests for snapshotEqual with different snapshot
// metadata
/**
 * Returns true if the provided snapshots are equal.
 *
 * @param left - A snapshot to compare.
 * @param right - A snapshot to compare.
 * @returns true if the snapshots are equal.
 */ function Zh(t, e) {
    return t instanceof Yh && e instanceof Yh ? t._firestore === e._firestore && t._key.isEqual(e._key) && (null === t._document ? null === e._document : t._document.isEqual(e._document)) && t._converter === e._converter : t instanceof Jh && e instanceof Jh && t._firestore === e._firestore && hl(t.query, e.query) && t.metadata.isEqual(e.metadata) && t._snapshot.isEqual(e._snapshot);
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Reads the document referred to by this `DocumentReference`.
 *
 * Note: `getDoc()` attempts to provide up-to-date data when possible by waiting
 * for data from the server, but it may return cached data or fail if you are
 * offline and the server cannot be reached. To specify this behavior, invoke
 * {@link getDocFromCache} or {@link getDocFromServer}.
 *
 * @param reference - The reference of the document to fetch.
 * @returns A Promise resolved with a `DocumentSnapshot` containing the
 * current document contents.
 */ function $h(t) {
    t = $c(t, ol);
    var e = $c(t.firestore, ml);
    return Kc(wl(e), t._key).then((function(n) {
        return pf(e, t, n);
    }));
}

var tf = /** @class */ function(e) {
    function n(t) {
        var n = this;
        return (n = e.call(this) || this).firestore = t, n;
    }
    return t(n, e), n.prototype.convertBytes = function(t) {
        return new Rl(t);
    }, n.prototype.convertReference = function(t) {
        var e = this.convertDocumentKey(t, this.firestore._databaseId);
        return new ol(this.firestore, /* converter= */ null, e);
    }, n;
}(qh);

/**
 * Reads the document referred to by this `DocumentReference` from cache.
 * Returns an error if the document is not currently cached.
 *
 * @returns A `Promise` resolved with a `DocumentSnapshot` containing the
 * current document contents.
 */ function ef(t) {
    t = $c(t, ol);
    var r = $c(t.firestore, ml), i = wl(r), o = new tf(r);
    return function(t, r) {
        var i = this, o = new Q;
        return t.asyncQueue.enqueueAndForget((function() {
            return e(i, void 0, void 0, (function() {
                var i;
                return n(this, (function(a) {
                    switch (a.label) {
                      case 0:
                        return i = function(t, r, i) {
                            return e(this, void 0, void 0, (function() {
                                var e, o, a;
                                return n(this, (function(n) {
                                    switch (n.label) {
                                      case 0:
                                        return n.trys.push([ 0, 2, , 3 ]), [ 4 /*yield*/ , function(t, e) {
                                            var n = G(t);
                                            return n.persistence.runTransaction("read document", "readonly", (function(t) {
                                                return n.localDocuments.getDocument(t, e);
                                            }));
                                        }(t, r) ];

                                      case 1:
                                        return (e = n.sent()).isFoundDocument() ? i.resolve(e) : e.isNoDocument() ? i.resolve(null) : i.reject(new j(K.UNAVAILABLE, "Failed to get document from cache. (However, this document may exist on the server. Run again without setting 'source' in the GetOptions to attempt to retrieve the document from the server.)")), 
                                        [ 3 /*break*/ , 3 ];

                                      case 2:
                                        return o = n.sent(), a = ys(o, "Failed to get document '".concat(r, " from cache")), 
                                        i.reject(a), [ 3 /*break*/ , 3 ];

                                      case 3:
                                        return [ 2 /*return*/ ];
                                    }
                                }));
                            }));
                        }, [ 4 /*yield*/ , qc(t) ];

                      case 1:
                        return [ 2 /*return*/ , i.apply(void 0, [ a.sent(), r, o ]) ];
                    }
                }));
            }));
        })), o.promise;
    }(i, t._key).then((function(e) {
        return new Yh(r, o, t._key, e, new Wh(null !== e && e.hasLocalMutations, 
        /* fromCache= */ !0), t.converter);
    }));
}

/**
 * Reads the document referred to by this `DocumentReference` from the server.
 * Returns an error if the network is not available.
 *
 * @returns A `Promise` resolved with a `DocumentSnapshot` containing the
 * current document contents.
 */ function nf(t) {
    t = $c(t, ol);
    var e = $c(t.firestore, ml);
    return Kc(wl(e), t._key, {
        source: "server"
    }).then((function(n) {
        return pf(e, t, n);
    }));
}

/**
 * Executes the query and returns the results as a `QuerySnapshot`.
 *
 * Note: `getDocs()` attempts to provide up-to-date data when possible by
 * waiting for data from the server, but it may return cached data or fail if
 * you are offline and the server cannot be reached. To specify this behavior,
 * invoke {@link getDocsFromCache} or {@link getDocsFromServer}.
 *
 * @returns A `Promise` that will be resolved with the results of the query.
 */ function rf(t) {
    t = $c(t, il);
    var e = $c(t.firestore, ml), n = wl(e), r = new tf(e);
    return ph(t._query), jc(n, t._query).then((function(n) {
        return new Jh(e, r, t, n);
    }))
    /**
 * Executes the query and returns the results as a `QuerySnapshot` from cache.
 * Returns an empty result set if no documents matching the query are currently
 * cached.
 *
 * @returns A `Promise` that will be resolved with the results of the query.
 */;
}

function of(t) {
    t = $c(t, il);
    var r = $c(t.firestore, ml), i = wl(r), o = new tf(r);
    return function(t, r) {
        var i = this, o = new Q;
        return t.asyncQueue.enqueueAndForget((function() {
            return e(i, void 0, void 0, (function() {
                var i;
                return n(this, (function(a) {
                    switch (a.label) {
                      case 0:
                        return i = function(t, r, i) {
                            return e(this, void 0, void 0, (function() {
                                var e, o, a, u, s, c;
                                return n(this, (function(n) {
                                    switch (n.label) {
                                      case 0:
                                        return n.trys.push([ 0, 2, , 3 ]), [ 4 /*yield*/ , lu(t, r, 
                                        /* usePreviousResults= */ !0) ];

                                      case 1:
                                        return e = n.sent(), o = new Vs(r, e.hs), a = o.Ta(e.documents), u = o.applyChanges(a, 
                                        /* limboResolutionEnabled= */ !1), i.resolve(u.snapshot), [ 3 /*break*/ , 3 ];

                                      case 2:
                                        return s = n.sent(), c = ys(s, "Failed to execute query '".concat(r, " against cache")), 
                                        i.reject(c), [ 3 /*break*/ , 3 ];

                                      case 3:
                                        return [ 2 /*return*/ ];
                                    }
                                }));
                            }));
                        }, [ 4 /*yield*/ , qc(t) ];

                      case 1:
                        return [ 2 /*return*/ , i.apply(void 0, [ a.sent(), r, o ]) ];
                    }
                }));
            }));
        })), o.promise;
    }(i, t._query).then((function(e) {
        return new Jh(r, o, t, e);
    }));
}

/**
 * Executes the query and returns the results as a `QuerySnapshot` from the
 * server. Returns an error if the network is not available.
 *
 * @returns A `Promise` that will be resolved with the results of the query.
 */ function af(t) {
    t = $c(t, il);
    var e = $c(t.firestore, ml), n = wl(e), r = new tf(e);
    return jc(n, t._query, {
        source: "server"
    }).then((function(n) {
        return new Jh(e, r, t, n);
    }));
}

function uf(t, e, n) {
    t = $c(t, ol);
    var r = $c(t.firestore, ml), i = Uh(t.converter, e, n);
    return df(r, [ Ql(jl(r), "setDoc", t._key, i, null !== t.converter, n).toMutation(t._key, Ur.none()) ]);
}

function sf(t, e, n) {
    for (var r = [], i = 3; i < arguments.length; i++) r[i - 3] = arguments[i];
    t = $c(t, ol);
    var o = $c(t.firestore, ml), a = jl(o);
    return df(o, [ ("string" == typeof (
    // For Compat types, we have to "extract" the underlying types before
    // performing validation.
    e = m(e)) || e instanceof Ml ? th(a, "updateDoc", t._key, e, n, r) : $l(a, "updateDoc", t._key, e)).toMutation(t._key, Ur.exists(!0)) ]);
}

/**
 * Deletes the document referred to by the specified `DocumentReference`.
 *
 * @param reference - A reference to the document to delete.
 * @returns A Promise resolved once the document has been successfully
 * deleted from the backend (note that it won't resolve while you're offline).
 */ function cf(t) {
    return df($c(t.firestore, ml), [ new ei(t._key, Ur.none()) ]);
}

/**
 * Add a new document to specified `CollectionReference` with the given data,
 * assigning it a document ID automatically.
 *
 * @param reference - A reference to the collection to add this document to.
 * @param data - An Object containing the data for the new document.
 * @returns A `Promise` resolved with a `DocumentReference` pointing to the
 * newly created document after it has been written to the backend (Note that it
 * won't resolve while you're offline).
 */ function lf(t, e) {
    var n = $c(t.firestore, ml), r = cl(t), i = Uh(t.converter, e);
    return df(n, [ Ql(jl(t.firestore), "addDoc", r._key, i, null !== t.converter, {}).toMutation(r._key, Ur.exists(!1)) ]).then((function() {
        return r;
    }));
}

function hf(t) {
    for (var r, i, o, a = [], u = 1; u < arguments.length; u++) a[u - 1] = arguments[u];
    t = m(t);
    var s = {
        includeMetadataChanges: !1,
        source: "default"
    }, c = 0;
    "object" != typeof a[c] || dl(a[c]) || (s = a[c], c++);
    var l, h, f, d = {
        includeMetadataChanges: s.includeMetadataChanges,
        source: s.source
    };
    if (dl(a[c])) {
        var p = a[c];
        a[c] = null === (r = p.next) || void 0 === r ? void 0 : r.bind(p), a[c + 1] = null === (i = p.error) || void 0 === i ? void 0 : i.bind(p), 
        a[c + 2] = null === (o = p.complete) || void 0 === o ? void 0 : o.bind(p);
    }
    if (t instanceof ol) h = $c(t.firestore, ml), f = Yn(t._key.path), l = {
        next: function(e) {
            a[c] && a[c](pf(h, t, e));
        },
        error: a[c + 1],
        complete: a[c + 2]
    }; else {
        var v = $c(t, il);
        h = $c(v.firestore, ml), f = v._query;
        var y = new tf(h);
        l = {
            next: function(t) {
                a[c] && a[c](new Jh(h, y, v, t));
            },
            error: a[c + 1],
            complete: a[c + 2]
        }, ph(t._query);
    }
    return function(t, r, i, o) {
        var a = this, u = new Dc(o), s = new As(r, u, i);
        return t.asyncQueue.enqueueAndForget((function() {
            return e(a, void 0, void 0, (function() {
                var e;
                return n(this, (function(n) {
                    switch (n.label) {
                      case 0:
                        return e = Ss, [ 4 /*yield*/ , Gc(t) ];

                      case 1:
                        return [ 2 /*return*/ , e.apply(void 0, [ n.sent(), s ]) ];
                    }
                }));
            }));
        })), function() {
            u.Qa(), t.asyncQueue.enqueueAndForget((function() {
                return e(a, void 0, void 0, (function() {
                    var e;
                    return n(this, (function(n) {
                        switch (n.label) {
                          case 0:
                            return e = xs, [ 4 /*yield*/ , Gc(t) ];

                          case 1:
                            return [ 2 /*return*/ , e.apply(void 0, [ n.sent(), s ]) ];
                        }
                    }));
                }));
            }));
        };
    }(wl(h), f, d, l);
}

function ff(t, r) {
    return function(t, r) {
        var i = this, o = new Dc(r);
        return t.asyncQueue.enqueueAndForget((function() {
            return e(i, void 0, void 0, (function() {
                var e;
                return n(this, (function(n) {
                    switch (n.label) {
                      case 0:
                        return e = function(t, e) {
                            G(t).W_.add(e), 
                            // Immediately fire an initial event, indicating all existing listeners
                            // are in-sync.
                            e.next();
                        }, [ 4 /*yield*/ , Gc(t) ];

                      case 1:
                        return [ 2 /*return*/ , e.apply(void 0, [ n.sent(), o ]) ];
                    }
                }));
            }));
        })), function() {
            o.Qa(), t.asyncQueue.enqueueAndForget((function() {
                return e(i, void 0, void 0, (function() {
                    var e;
                    return n(this, (function(n) {
                        switch (n.label) {
                          case 0:
                            return e = function(t, e) {
                                G(t).W_.delete(e);
                            }, [ 4 /*yield*/ , Gc(t) ];

                          case 1:
                            return [ 2 /*return*/ , e.apply(void 0, [ n.sent(), o ]) ];
                        }
                    }));
                }));
            }));
        };
    }(wl(t = $c(t, ml)), dl(r) ? r : {
        next: r
    });
}

/**
 * Locally writes `mutations` on the async queue.
 * @internal
 */ function df(t, r) {
    return function(t, r) {
        var i = this, o = new Q;
        return t.asyncQueue.enqueueAndForget((function() {
            return e(i, void 0, void 0, (function() {
                var e;
                return n(this, (function(n) {
                    switch (n.label) {
                      case 0:
                        return e = Ws, [ 4 /*yield*/ , Bc(t) ];

                      case 1:
                        return [ 2 /*return*/ , e.apply(void 0, [ n.sent(), r, o ]) ];
                    }
                }));
            }));
        })), o.promise;
    }(wl(t), r);
}

/**
 * Converts a {@link ViewSnapshot} that contains the single document specified by `ref`
 * to a {@link DocumentSnapshot}.
 */ function pf(t, e, n) {
    var r = n.docs.get(e._key), i = new tf(t);
    return new Yh(t, i, e._key, r, new Wh(n.hasPendingWrites, n.fromCache), e.converter);
}

/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Calculates the number of documents in the result set of the given query
 * without actually downloading the documents.
 *
 * Using this function to count the documents is efficient because only the
 * final count, not the documents' data, is downloaded. This function can
 * count the documents in cases where the result set is prohibitively large to
 * download entirely (thousands of documents).
 *
 * The result received from the server is presented, unaltered, without
 * considering any local state. That is, documents in the local cache are not
 * taken into consideration, neither are local modifications not yet
 * synchronized with the server. Previously-downloaded results, if any, are not
 * used. Every invocation of this function necessarily involves a round trip to
 * the server.
 *
 * @param query The query whose result set size is calculated.
 * @returns A Promise that will be resolved with the count; the count can be
 * retrieved from `snapshot.data().count`, where `snapshot` is the
 * `AggregateQuerySnapshot` to which the returned Promise resolves.
 */ function vf(t) {
    return mf(t, {
        count: Kh()
    });
}

/**
 * Calculates the specified aggregations over the documents in the result
 * set of the given query without actually downloading the documents.
 *
 * Using this function to perform aggregations is efficient because only the
 * final aggregation values, not the documents' data, are downloaded. This
 * function can perform aggregations of the documents in cases where the result
 * set is prohibitively large to download entirely (thousands of documents).
 *
 * The result received from the server is presented, unaltered, without
 * considering any local state. That is, documents in the local cache are not
 * taken into consideration, neither are local modifications not yet
 * synchronized with the server. Previously-downloaded results, if any, are not
 * used. Every invocation of this function necessarily involves a round trip to
 * the server.
 *
 * @param query The query whose result set is aggregated over.
 * @param aggregateSpec An `AggregateSpec` object that specifies the aggregates
 * to perform over the result set. The AggregateSpec specifies aliases for each
 * aggregate, which can be used to retrieve the aggregate result.
 * @example
 * ```typescript
 * const aggregateSnapshot = await getAggregateFromServer(query, {
 *   countOfDocs: count(),
 *   totalHours: sum('hours'),
 *   averageScore: average('score')
 * });
 *
 * const countOfDocs: number = aggregateSnapshot.data().countOfDocs;
 * const totalHours: number = aggregateSnapshot.data().totalHours;
 * const averageScore: number | null = aggregateSnapshot.data().averageScore;
 * ```
 */ function mf(t, r) {
    var i = $c(t.firestore, ml), o = wl(i), a = function(t, e) {
        var n = [];
        for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && n.push(e(t[r], r, t));
        return n;
    }(r, (function(t, e) {
        return new ai(e, t.aggregateType, t._internalFieldPath);
    }));
    // Run the aggregation and convert the results
        return function(t, r, i) {
        var o = this, a = new Q;
        return t.asyncQueue.enqueueAndForget((function() {
            return e(o, void 0, void 0, (function() {
                var o, u;
                return n(this, (function(s) {
                    switch (s.label) {
                      case 0:
                        return s.trys.push([ 0, 2, , 3 ]), [ 4 /*yield*/ , zc(t) ];

                      case 1:
                        return o = s.sent(), a.resolve(
                        // TODO(firestorexp): Make sure there is only one Datastore instance per
                        // firestore-exp client.
                        function(t, r, i) {
                            return e(this, void 0, void 0, (function() {
                                var e, o, a, u, s, c, l, h;
                                return n(this, (function(n) {
                                    switch (n.label) {
                                      case 0:
                                        return o = G(t), a = function(t, e, n) {
                                            var r = Hi(t, e), i = r.ut, o = r.parent, a = {}, u = [], s = 0;
                                            return n.forEach((function(t) {
                                                // Map all client-side aliases to a unique short-form
                                                // alias. This avoids issues with client-side aliases that
                                                // exceed the 1500-byte string size limit.
                                                var e = "aggregate_" + s++;
                                                a[e] = t.alias, "count" === t.aggregateType ? u.push({
                                                    alias: e,
                                                    count: {}
                                                }) : "avg" === t.aggregateType ? u.push({
                                                    alias: e,
                                                    avg: {
                                                        field: eo(t.fieldPath)
                                                    }
                                                }) : "sum" === t.aggregateType && u.push({
                                                    alias: e,
                                                    sum: {
                                                        field: eo(t.fieldPath)
                                                    }
                                                });
                                            })), {
                                                request: {
                                                    structuredAggregationQuery: {
                                                        aggregations: u,
                                                        structuredQuery: i.structuredQuery
                                                    },
                                                    parent: i.parent
                                                },
                                                V_: a,
                                                parent: o
                                            };
                                        }(o.serializer, function(t) {
                                            var e = G(t);
                                            return e.Pe || (
                                            // Do not include implicit order-bys for aggregate queries.
                                            e.Pe = $n(e, t.explicitOrderBy)), e.Pe;
                                        }(r), i), u = a.request, s = a.V_, c = a.parent, o.connection.wo || delete u.parent, 
                                        [ 4 /*yield*/ , o.vo("RunAggregationQuery", o.serializer.databaseId, c, u, 
                                        /*expectedResponseCount=*/ 1) ];

                                      case 1:
                                        return l = n.sent().filter((function(t) {
                                            return !!t.result;
                                        })), 
                                        // Omit RunAggregationQueryResponse that only contain readTimes.
                                        B(1 === l.length), h = null === (e = l[0].result) || void 0 === e ? void 0 : e.aggregateFields, 
                                        [ 2 /*return*/ , Object.keys(h).reduce((function(t, e) {
                                            return t[s[e]] = h[e], t;
                                        }), {}) ];
                                    }
                                }));
                            }));
                        }(o, r, i)), [ 3 /*break*/ , 3 ];

                      case 2:
                        return u = s.sent(), a.reject(u), [ 3 /*break*/ , 3 ];

                      case 3:
                        return [ 2 /*return*/ ];
                    }
                }));
            }));
        })), a.promise;
    }(o, t._query, a).then((function(e) {
        /**
     * Converts the core aggregration result to an `AggregateQuerySnapshot`
     * that can be returned to the consumer.
     * @param query
     * @param aggregateResult Core aggregation result
     * @internal
     */
        return function(t, e, n) {
            var r = new tf(t);
            return new Ol(e, r, n);
        }(i, t, e);
    }));
}

var yf = /** @class */ function() {
    function t(t) {
        this.kind = "memory", this._onlineComponentProvider = new xc, (null == t ? void 0 : t.garbageCollector) ? this._offlineComponentProvider = t.garbageCollector._offlineComponentProvider : this._offlineComponentProvider = new _c;
    }
    return t.prototype.toJSON = function() {
        return {
            kind: this.kind
        };
    }, t;
}(), gf = /** @class */ function() {
    function t(t) {
        var e;
        this.kind = "persistent", (null == t ? void 0 : t.tabManager) ? (t.tabManager._initialize(t), 
        e = t.tabManager) : (e = Cf(void 0))._initialize(t), this._onlineComponentProvider = e._onlineComponentProvider, 
        this._offlineComponentProvider = e._offlineComponentProvider;
    }
    return t.prototype.toJSON = function() {
        return {
            kind: this.kind
        };
    }, t;
}(), wf = /** @class */ function() {
    function t() {
        this.kind = "memoryEager", this._offlineComponentProvider = new _c;
    }
    return t.prototype.toJSON = function() {
        return {
            kind: this.kind
        };
    }, t;
}(), bf = /** @class */ function() {
    function t(t) {
        this.kind = "memoryLru", this._offlineComponentProvider = new Ec(t);
    }
    return t.prototype.toJSON = function() {
        return {
            kind: this.kind
        };
    }, t;
}();

/**
 * Creates an instance of `MemoryEagerGarbageCollector`. This is also the
 * default garbage collector unless it is explicitly specified otherwise.
 */
function If() {
    return new wf;
}

/**
 * Creates an instance of `MemoryLruGarbageCollector`.
 *
 * A target size can be specified as part of the setting parameter. The
 * collector will start deleting documents once the cache size exceeds
 * the given size. The default cache size is 40MB (40 * 1024 * 1024 bytes).
 */ function _f(t) {
    return new bf(null == t ? void 0 : t.cacheSizeBytes);
}

/**
 * Creates an instance of `MemoryLocalCache`. The instance can be set to
 * `FirestoreSettings.cache` to tell the SDK which cache layer to use.
 */ function Ef(t) {
    return new yf(t);
}

/**
 * Creates an instance of `PersistentLocalCache`. The instance can be set to
 * `FirestoreSettings.cache` to tell the SDK which cache layer to use.
 *
 * Persistent cache cannot be used in a Node.js environment.
 */ function Tf(t) {
    return new gf(t);
}

var Sf = /** @class */ function() {
    function t(t) {
        this.forceOwnership = t, this.kind = "persistentSingleTab";
    }
    return t.prototype.toJSON = function() {
        return {
            kind: this.kind
        };
    }, 
    /**
     * @internal
     */
    t.prototype._initialize = function(t) {
        this._onlineComponentProvider = new xc, this._offlineComponentProvider = new Tc(this._onlineComponentProvider, null == t ? void 0 : t.cacheSizeBytes, this.forceOwnership);
    }, t;
}(), xf = /** @class */ function() {
    function t() {
        this.kind = "PersistentMultipleTab";
    }
    return t.prototype.toJSON = function() {
        return {
            kind: this.kind
        };
    }, 
    /**
     * @internal
     */
    t.prototype._initialize = function(t) {
        this._onlineComponentProvider = new xc, this._offlineComponentProvider = new Sc(this._onlineComponentProvider, null == t ? void 0 : t.cacheSizeBytes);
    }, t;
}();

/**
 * Creates an instance of `PersistentSingleTabManager`.
 *
 * @param settings Configures the created tab manager.
 */
function Cf(t) {
    return new Sf(null == t ? void 0 : t.forceOwnership);
}

/**
 * Creates an instance of `PersistentMultipleTabManager`.
 */ function Df() {
    return new xf;
}

/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var Nf = {
    maxAttempts: 5
}, Af = /** @class */ function() {
    /** @hideconstructor */
    function t(t, e) {
        this._firestore = t, this._commitHandler = e, this._mutations = [], this._committed = !1, 
        this._dataReader = jl(t);
    }
    return t.prototype.set = function(t, e, n) {
        this._verifyNotCommitted();
        var r = kf(t, this._firestore), i = Uh(r.converter, e, n), o = Ql(this._dataReader, "WriteBatch.set", r._key, i, null !== r.converter, n);
        return this._mutations.push(o.toMutation(r._key, Ur.none())), this;
    }, t.prototype.update = function(t, e, n) {
        for (var r = [], i = 3; i < arguments.length; i++) r[i - 3] = arguments[i];
        this._verifyNotCommitted();
        var o, a = kf(t, this._firestore);
        // For Compat types, we have to "extract" the underlying types before
        // performing validation.
                return o = "string" == typeof (e = m(e)) || e instanceof Ml ? th(this._dataReader, "WriteBatch.update", a._key, e, n, r) : $l(this._dataReader, "WriteBatch.update", a._key, e), 
        this._mutations.push(o.toMutation(a._key, Ur.exists(!0))), this;
    }, 
    /**
     * Deletes the document referred to by the provided {@link DocumentReference}.
     *
     * @param documentRef - A reference to the document to be deleted.
     * @returns This `WriteBatch` instance. Used for chaining method calls.
     */
    t.prototype.delete = function(t) {
        this._verifyNotCommitted();
        var e = kf(t, this._firestore);
        return this._mutations = this._mutations.concat(new ei(e._key, Ur.none())), this;
    }, 
    /**
     * Commits all of the writes in this write batch as a single atomic unit.
     *
     * The result of these writes will only be reflected in document reads that
     * occur after the returned promise resolves. If the client is offline, the
     * write fails. If you would like to see local modifications or buffer writes
     * until the client is online, use the full Firestore SDK.
     *
     * @returns A `Promise` resolved once all of the writes in the batch have been
     * successfully written to the backend as an atomic unit (note that it won't
     * resolve while you're offline).
     */
    t.prototype.commit = function() {
        return this._verifyNotCommitted(), this._committed = !0, this._mutations.length > 0 ? this._commitHandler(this._mutations) : Promise.resolve();
    }, t.prototype._verifyNotCommitted = function() {
        if (this._committed) throw new j(K.FAILED_PRECONDITION, "A write batch can no longer be used after commit() has been called.");
    }, t;
}();

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A write batch, used to perform multiple writes as a single atomic unit.
 *
 * A `WriteBatch` object can be acquired by calling {@link writeBatch}. It
 * provides methods for adding writes to the write batch. None of the writes
 * will be committed (or visible locally) until {@link WriteBatch.commit} is
 * called.
 */ function kf(t, e) {
    if ((t = m(t)).firestore !== e) throw new j(K.INVALID_ARGUMENT, "Provided document reference is from a different Firestore instance.");
    return t;
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// TODO(mrschmidt) Consider using `BaseTransaction` as the base class in the
// legacy SDK.
/**
 * A reference to a transaction.
 *
 * The `Transaction` object passed to a transaction's `updateFunction` provides
 * the methods to read and write data within the transaction context. See
 * {@link runTransaction}.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A reference to a transaction.
 *
 * The `Transaction` object passed to a transaction's `updateFunction` provides
 * the methods to read and write data within the transaction context. See
 * {@link runTransaction}.
 */ var Pf = /** @class */ function(e) {
    // This class implements the same logic as the Transaction API in the Lite SDK
    // but is subclassed in order to return its own DocumentSnapshot types.
    /** @hideconstructor */
    function n(t, n) {
        var r = this;
        return (r = e.call(this, t, n) || this)._firestore = t, r;
    }
    /**
     * Reads the document referenced by the provided {@link DocumentReference}.
     *
     * @param documentRef - A reference to the document to be read.
     * @returns A `DocumentSnapshot` with the read data.
     */    return t(n, e), n.prototype.get = function(t) {
        var n = this, r = kf(t, this._firestore), i = new tf(this._firestore);
        return e.prototype.get.call(this, t).then((function(t) {
            return new Yh(n._firestore, i, r._key, t._document, new Wh(
            /* hasPendingWrites= */ !1, 
            /* fromCache= */ !1), r.converter);
        }));
    }, n;
}(/** @class */ function() {
    /** @hideconstructor */
    function t(t, e) {
        this._firestore = t, this._transaction = e, this._dataReader = jl(t)
        /**
     * Reads the document referenced by the provided {@link DocumentReference}.
     *
     * @param documentRef - A reference to the document to be read.
     * @returns A `DocumentSnapshot` with the read data.
     */;
    }
    return t.prototype.get = function(t) {
        var e = this, n = kf(t, this._firestore), r = new Bh(this._firestore);
        return this._transaction.lookup([ n._key ]).then((function(t) {
            if (!t || 1 !== t.length) return U();
            var i = t[0];
            if (i.isFoundDocument()) return new hh(e._firestore, r, i.key, i, n.converter);
            if (i.isNoDocument()) return new hh(e._firestore, r, n._key, null, n.converter);
            throw U();
        }));
    }, t.prototype.set = function(t, e, n) {
        var r = kf(t, this._firestore), i = Uh(r.converter, e, n), o = Ql(this._dataReader, "Transaction.set", r._key, i, null !== r.converter, n);
        return this._transaction.set(r._key, o), this;
    }, t.prototype.update = function(t, e, n) {
        for (var r = [], i = 3; i < arguments.length; i++) r[i - 3] = arguments[i];
        var o, a = kf(t, this._firestore);
        // For Compat types, we have to "extract" the underlying types before
        // performing validation.
                return o = "string" == typeof (e = m(e)) || e instanceof Ml ? th(this._dataReader, "Transaction.update", a._key, e, n, r) : $l(this._dataReader, "Transaction.update", a._key, e), 
        this._transaction.update(a._key, o), this;
    }, 
    /**
     * Deletes the document referred to by the provided {@link DocumentReference}.
     *
     * @param documentRef - A reference to the document to be deleted.
     * @returns This `Transaction` instance. Used for chaining method calls.
     */
    t.prototype.delete = function(t) {
        var e = kf(t, this._firestore);
        return this._transaction.delete(e._key), this;
    }, t;
}());

/**
 * Executes the given `updateFunction` and then attempts to commit the changes
 * applied within the transaction. If any document read within the transaction
 * has changed, Cloud Firestore retries the `updateFunction`. If it fails to
 * commit after 5 attempts, the transaction fails.
 *
 * The maximum number of writes allowed in a single transaction is 500.
 *
 * @param firestore - A reference to the Firestore database to run this
 * transaction against.
 * @param updateFunction - The function to execute within the transaction
 * context.
 * @param options - An options object to configure maximum number of attempts to
 * commit.
 * @returns If the transaction completed successfully or was explicitly aborted
 * (the `updateFunction` returned a failed promise), the promise returned by the
 * `updateFunction `is returned here. Otherwise, if the transaction failed, a
 * rejected promise with the corresponding failure error is returned.
 */ function Of(t, r, i) {
    t = $c(t, ml);
    var o = Object.assign(Object.assign({}, Nf), i);
    return function(t) {
        if (t.maxAttempts < 1) throw new j(K.INVALID_ARGUMENT, "Max attempts must be at least 1");
    }(o), function(t, r, i) {
        var o = this, a = new Q;
        return t.asyncQueue.enqueueAndForget((function() {
            return e(o, void 0, void 0, (function() {
                var e;
                return n(this, (function(n) {
                    switch (n.label) {
                      case 0:
                        return [ 4 /*yield*/ , zc(t) ];

                      case 1:
                        return e = n.sent(), new kc(t.asyncQueue, e, i, r, a).Ya(), [ 2 /*return*/ ];
                    }
                }));
            }));
        })), a.promise;
    }(wl(t), (function(e) {
        return r(new Pf(t, e));
    }), o);
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Returns a sentinel for use with {@link @firebase/firestore/lite#(updateDoc:1)} or
 * {@link @firebase/firestore/lite#(setDoc:1)} with `{merge: true}` to mark a field for deletion.
 */ function Rf() {
    return new Wl("deleteField");
}

/**
 * Returns a sentinel used with {@link @firebase/firestore/lite#(setDoc:1)} or {@link @firebase/firestore/lite#(updateDoc:1)} to
 * include a server-generated timestamp in the written data.
 */ function Mf() {
    return new Hl("serverTimestamp");
}

/**
 * Returns a special value that can be used with {@link @firebase/firestore/lite#(setDoc:1)} or {@link
 * @firebase/firestore/lite#(updateDoc:1)} that tells the server to union the given elements with any array
 * value that already exists on the server. Each specified element that doesn't
 * already exist in the array will be added to the end. If the field being
 * modified is not already an array it will be overwritten with an array
 * containing exactly the specified elements.
 *
 * @param elements - The elements to union into the array.
 * @returns The `FieldValue` sentinel for use in a call to `setDoc()` or
 * `updateDoc()`.
 */ function Ff() {
    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
    // NOTE: We don't actually parse the data until it's used in set() or
    // update() since we'd need the Firestore instance to do this.
        return new Jl("arrayUnion", t);
}

/**
 * Returns a special value that can be used with {@link (setDoc:1)} or {@link
 * updateDoc:1} that tells the server to remove the given elements from any
 * array value that already exists on the server. All instances of each element
 * specified will be removed from the array. If the field being modified is not
 * already an array it will be overwritten with an empty array.
 *
 * @param elements - The elements to remove from the array.
 * @returns The `FieldValue` sentinel for use in a call to `setDoc()` or
 * `updateDoc()`
 */ function Vf() {
    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
    // NOTE: We don't actually parse the data until it's used in set() or
    // update() since we'd need the Firestore instance to do this.
        return new Xl("arrayRemove", t);
}

/**
 * Returns a special value that can be used with {@link @firebase/firestore/lite#(setDoc:1)} or {@link
 * @firebase/firestore/lite#(updateDoc:1)} that tells the server to increment the field's current value by
 * the given value.
 *
 * If either the operand or the current field value uses floating point
 * precision, all arithmetic follows IEEE 754 semantics. If both values are
 * integers, values outside of JavaScript's safe number range
 * (`Number.MIN_SAFE_INTEGER` to `Number.MAX_SAFE_INTEGER`) are also subject to
 * precision loss. Furthermore, once processed by the Firestore backend, all
 * integer operations are capped between -2^63 and 2^63-1.
 *
 * If the current field value is not of type `number`, or if the field does not
 * yet exist, the transformation sets the field to the given value.
 *
 * @param n - The value to increment by.
 * @returns The `FieldValue` sentinel for use in a call to `setDoc()` or
 * `updateDoc()`
 */ function Lf(t) {
    return new Zl("increment", t);
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Creates a write batch, used for performing multiple writes as a single
 * atomic operation. The maximum number of writes allowed in a single {@link WriteBatch}
 * is 500.
 *
 * Unlike transactions, write batches are persisted offline and therefore are
 * preferable when you don't need to condition your writes on read data.
 *
 * @returns A {@link WriteBatch} that can be used to atomically execute multiple
 * writes.
 */ function qf(t) {
    return wl(t = $c(t, ml)), new Af(t, (function(e) {
        return df(t, e);
    }))
    /**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */;
}

function Uf(t, i) {
    var o, a = wl(t = $c(t, ml));
    if (!a._uninitializedComponentsProvider || "memory" === (null === (o = a._uninitializedComponentsProvider) || void 0 === o ? void 0 : o._offlineKind)) 
    // PORTING NOTE: We don't return an error if the user has not enabled
    // persistence since `enableIndexeddbPersistence()` can fail on the Web.
    return L("Cannot enable indexes when persistence is disabled"), Promise.resolve();
    var u = function(t) {
        var e = "string" == typeof t ? function(t) {
            try {
                return JSON.parse(t);
            } catch (t) {
                throw new j(K.INVALID_ARGUMENT, "Failed to parse JSON: " + (null == t ? void 0 : t.message));
            }
        }(t) : t, n = [];
        if (Array.isArray(e.indexes)) for (var r = 0, i = e.indexes; r < i.length; r++) {
            var o = i[r], a = Bf(o, "collectionGroup"), u = [];
            if (Array.isArray(o.fields)) for (var s = 0, c = o.fields; s < c.length; s++) {
                var l = c[s], h = sh("setIndexConfiguration", Bf(l, "fieldPath"));
                "CONTAINS" === l.arrayConfig ? u.push(new gt(h, 2 /* IndexKind.CONTAINS */)) : "ASCENDING" === l.order ? u.push(new gt(h, 0 /* IndexKind.ASCENDING */)) : "DESCENDING" === l.order && u.push(new gt(h, 1 /* IndexKind.DESCENDING */));
            }
            n.push(new pt(pt.UNKNOWN_ID, a, u, bt.empty()));
        }
        return n;
    }(i);
    return function(t, i) {
        var o = this;
        return t.asyncQueue.enqueue((function() {
            return e(o, void 0, void 0, (function() {
                var o;
                return n(this, (function(a) {
                    switch (a.label) {
                      case 0:
                        return o = function(t, i) {
                            return e(this, void 0, void 0, (function() {
                                var e, o, a;
                                return n(this, (function(n) {
                                    return e = G(t), o = e.indexManager, a = [], [ 2 /*return*/ , e.persistence.runTransaction("Configure indexes", "readwrite", (function(t) {
                                        return o.getFieldIndexes(t).next((function(e) {
                                            /**
                                 * @license
                                 * Copyright 2017 Google LLC
                                 *
                                 * Licensed under the Apache License, Version 2.0 (the "License");
                                 * you may not use this file except in compliance with the License.
                                 * You may obtain a copy of the License at
                                 *
                                 *   http://www.apache.org/licenses/LICENSE-2.0
                                 *
                                 * Unless required by applicable law or agreed to in writing, software
                                 * distributed under the License is distributed on an "AS IS" BASIS,
                                 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                 * See the License for the specific language governing permissions and
                                 * limitations under the License.
                                 */
                                            /**
                                 * Compares two array for equality using comparator. The method computes the
                                 * intersection and invokes `onAdd` for every element that is in `after` but not
                                 * `before`. `onRemove` is invoked for every element in `before` but missing
                                 * from `after`.
                                 *
                                 * The method creates a copy of both `before` and `after` and runs in O(n log
                                 * n), where n is the size of the two lists.
                                 *
                                 * @param before - The elements that exist in the original array.
                                 * @param after - The elements to diff against the original array.
                                 * @param comparator - The comparator for the elements in before and after.
                                 * @param onAdd - A function to invoke for every element that is part of `
                                 * after` but not `before`.
                                 * @param onRemove - A function to invoke for every element that is part of
                                 * `before` but not `after`.
                                 */
                                            return function(t, e, n, i, o) {
                                                t = r([], t, !0), e = r([], e, !0), t.sort(n), e.sort(n);
                                                for (var a = t.length, u = e.length, s = 0, c = 0; s < u && c < a; ) {
                                                    var l = n(t[c], e[s]);
                                                    l < 0 ? 
                                                    // The element was removed if the next element in our ordered
                                                    // walkthrough is only in `before`.
                                                    o(t[c++]) : l > 0 ? 
                                                    // The element was added if the next element in our ordered walkthrough
                                                    // is only in `after`.
                                                    i(e[s++]) : (s++, c++);
                                                }
                                                for (;s < u; ) i(e[s++]);
                                                for (;c < a; ) o(t[c++]);
                                            }(e, i, yt, (function(e) {
                                                a.push(o.addFieldIndex(t, e));
                                            }), (function(e) {
                                                a.push(o.deleteFieldIndex(t, e));
                                            }));
                                        })).next((function() {
                                            return Dt.waitFor(a);
                                        }));
                                    })) ];
                                }));
                            }));
                        }, [ 4 /*yield*/ , qc(t) ];

                      case 1:
                        return [ 2 /*return*/ , o.apply(void 0, [ a.sent(), i ]) ];
                    }
                }));
            }));
        }));
    }(a, u);
}

function Bf(t, e) {
    if ("string" != typeof t[e]) throw new j(K.INVALID_ARGUMENT, "Missing string value for: " + e);
    return t[e];
}

/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A `PersistentCacheIndexManager` for configuring persistent cache indexes used
 * for local query execution.
 *
 * To use, call `getPersistentCacheIndexManager()` to get an instance.
 */ var zf = 
/** @hideconstructor */
function(t) {
    this._client = t, 
    /** A type string to uniquely identify instances of this class. */
    this.type = "PersistentCacheIndexManager";
};

/**
 * Returns the PersistentCache Index Manager used by the given `Firestore`
 * object.
 *
 * @return The `PersistentCacheIndexManager` instance, or `null` if local
 * persistent storage is not in use.
 */ function Gf(t) {
    var e;
    t = $c(t, ml);
    var n = Jf.get(t);
    if (n) return n;
    var r = wl(t);
    if ("persistent" !== (null === (e = r._uninitializedComponentsProvider) || void 0 === e ? void 0 : e._offlineKind)) return null;
    var i = new zf(r);
    return Jf.set(t, i), i
    /**
 * Enables the SDK to create persistent cache indexes automatically for local
 * query execution when the SDK believes cache indexes can help improve
 * performance.
 *
 * This feature is disabled by default.
 */;
}

function Kf(t) {
    Wf(t, !0);
}

/**
 * Stops creating persistent cache indexes automatically for local query
 * execution. The indexes which have been created by calling
 * `enablePersistentCacheIndexAutoCreation()` still take effect.
 */ function jf(t) {
    Wf(t, !1);
}

/**
 * Removes all persistent cache indexes.
 *
 * Please note this function will also deletes indexes generated by
 * `setIndexConfiguration()`, which is deprecated.
 */ function Qf(t) {
    t._client.verifyNotTerminated(), function(t) {
        var r = this;
        return t.asyncQueue.enqueue((function() {
            return e(r, void 0, void 0, (function() {
                var e;
                return n(this, (function(n) {
                    switch (n.label) {
                      case 0:
                        return e = function(t) {
                            var e = G(t), n = e.indexManager;
                            return e.persistence.runTransaction("Delete All Indexes", "readwrite", (function(t) {
                                return n.deleteAllFieldIndexes(t);
                            }));
                        }, [ 4 /*yield*/ , qc(t) ];

                      case 1:
                        return [ 2 /*return*/ , e.apply(void 0, [ n.sent() ]) ];
                    }
                }));
            }));
        }));
    }(t._client).then((function(t) {
        return F("deleting all persistent cache indexes succeeded");
    })).catch((function(t) {
        return L("deleting all persistent cache indexes failed", t);
    }));
}

function Wf(t, r) {
    t._client.verifyNotTerminated(), function(t, r) {
        var i = this;
        return t.asyncQueue.enqueue((function() {
            return e(i, void 0, void 0, (function() {
                var e;
                return n(this, (function(n) {
                    switch (n.label) {
                      case 0:
                        return e = function(t, e) {
                            G(t).ts.Ui = e;
                        }, [ 4 /*yield*/ , qc(t) ];

                      case 1:
                        return [ 2 /*return*/ , e.apply(void 0, [ n.sent(), r ]) ];
                    }
                }));
            }));
        }));
    }(t._client, r).then((function(t) {
        return F("setting persistent cache index auto creation isEnabled=".concat(r, " succeeded"));
    })).catch((function(t) {
        return L("setting persistent cache index auto creation isEnabled=".concat(r, " failed"), t);
    }));
}

/**
 * Maps `Firestore` instances to their corresponding
 * `PersistentCacheIndexManager` instances.
 *
 * Use a `WeakMap` so that the mapping will be automatically dropped when the
 * `Firestore` instance is garbage collected. This emulates a private member
 * as described in https://goo.gle/454yvug.
 */ var Yf, Hf, Jf = new WeakMap, Xf = /** @class */ function() {
    function t() {
        throw new Error("instances of this class should not be created");
    }
    /**
     * Registers a callback to be notified when an existence filter mismatch
     * occurs in the Watch listen stream.
     *
     * The relative order in which callbacks are notified is unspecified; do not
     * rely on any particular ordering. If a given callback is registered multiple
     * times then it will be notified multiple times, once per registration.
     *
     * @param callback the callback to invoke upon existence filter mismatch.
     *
     * @return a function that, when called, unregisters the given callback; only
     * the first invocation of the returned function does anything; all subsequent
     * invocations do nothing.
     */    return t.onExistenceFilterMismatch = function(t) {
        return Zf.instance.onExistenceFilterMismatch(t);
    }, t;
}(), Zf = /** @class */ function() {
    function t() {
        this.Mu = new Map;
    }
    return Object.defineProperty(t, "instance", {
        get: function() {
            return $f || function(t) {
                if (li) throw new Error("a TestingHooksSpi instance is already set");
                li = t;
            }($f = new t), $f;
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype.tt = function(t) {
        this.Mu.forEach((function(e) {
            return e(t);
        }));
    }, t.prototype.onExistenceFilterMismatch = function(t) {
        var e = Symbol(), n = this.Mu;
        return n.set(e, t), function() {
            return n.delete(e);
        };
    }, t;
}(), $f = null;

/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Testing hooks for use by Firestore's integration test suite to reach into the
 * SDK internals to validate logic and behavior that is not visible from the
 * public API surface.
 *
 * @internal
 */ void 0 === Hf && (Hf = !0), function(t) {
    P = t;
}(i), o(new c("firestore", (function(t, e) {
    var n = e.instanceIdentifier, r = e.options, i = t.getProvider("app").getImmediate(), o = new ml(new J(t.getProvider("auth-internal")), new tt(t.getProvider("app-check-internal")), function(t, e) {
        if (!Object.prototype.hasOwnProperty.apply(t.options, [ "projectId" ])) throw new j(K.INVALID_ARGUMENT, '"projectId" not provided in firebase.initializeApp.');
        return new Be(t.options.projectId, e);
    }(i, n), i);
    return r = Object.assign({
        useFetchStreams: Hf
    }, r), o._setSettings(r), o;
}), "PUBLIC").setMultipleInstances(!0)), a(A, "4.6.0", Yf), 
// BUILD_TARGET will be replaced by values like esm5, esm2017, cjs5, etc during the compilation
a(A, "4.6.0", "esm5");

export { qh as AbstractUserDataWriter, Pl as AggregateField, Ol as AggregateQuerySnapshot, Rl as Bytes, vl as CACHE_SIZE_UNLIMITED, al as CollectionReference, ol as DocumentReference, Yh as DocumentSnapshot, Ml as FieldPath, Vl as FieldValue, ml as Firestore, j as FirestoreError, Ll as GeoPoint, pl as LoadBundleTask, zf as PersistentCacheIndexManager, il as Query, bh as QueryCompositeFilterConstraint, mh as QueryConstraint, Hh as QueryDocumentSnapshot, kh as QueryEndAtConstraint, gh as QueryFieldFilterConstraint, Sh as QueryLimitConstraint, Eh as QueryOrderByConstraint, Jh as QuerySnapshot, Dh as QueryStartAtConstraint, Wh as SnapshotMetadata, ut as Timestamp, Pf as Transaction, Af as WriteBatch, rt as _AutoId, Pe as _ByteString, Be as _DatabaseId, dt as _DocumentKey, et as _EmptyAppCheckTokenProvider, Y as _EmptyAuthCredentialsProvider, ft as _FieldPath, Xf as _TestingHooks, $c as _cast, z as _debugAssert, ke as _isBase64Available, L as _logWarn, Hc as _validateIsNotUsedTogether, lf as addDoc, jh as aggregateFieldEqual, Qh as aggregateQuerySnapshotEqual, _h as and, Vf as arrayRemove, Ff as arrayUnion, Gh as average, Tl as clearIndexedDbPersistence, ul as collection, sl as collectionGroup, rl as connectFirestoreEmulator, Kh as count, Qf as deleteAllPersistentCacheIndexes, cf as deleteDoc, Rf as deleteField, Cl as disableNetwork, jf as disablePersistentCacheIndexAutoCreation, cl as doc, Fl as documentId, Il as enableIndexedDbPersistence, _l as enableMultiTabIndexedDbPersistence, xl as enableNetwork, Kf as enablePersistentCacheIndexAutoCreation, Oh as endAt, Ph as endBefore, wl as ensureFirestoreConfigured, df as executeWrite, mf as getAggregateFromServer, vf as getCountFromServer, $h as getDoc, ef as getDocFromCache, nf as getDocFromServer, rf as getDocs, of as getDocsFromCache, af as getDocsFromServer, gl as getFirestore, Gf as getPersistentCacheIndexManager, Lf as increment, yl as initializeFirestore, xh as limit, Ch as limitToLast, Nl as loadBundle, If as memoryEagerGarbageCollector, Ef as memoryLocalCache, _f as memoryLruGarbageCollector, Al as namedQuery, hf as onSnapshot, ff as onSnapshotsInSync, Ih as or, Th as orderBy, Tf as persistentLocalCache, Df as persistentMultipleTabManager, Cf as persistentSingleTabManager, yh as query, hl as queryEqual, ll as refEqual, Of as runTransaction, Mf as serverTimestamp, uf as setDoc, Uf as setIndexConfiguration, M as setLogLevel, Zh as snapshotEqual, Ah as startAfter, Nh as startAt, zh as sum, Dl as terminate, sf as updateDoc, Sl as waitForPendingWrites, wh as where, qf as writeBatch };
//# sourceMappingURL=index.esm5.js.map
