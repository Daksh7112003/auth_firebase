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
import { Auth, UserCredential } from '../../model/public_types';
/**
 * Asynchronously signs in using a custom token.
 *
 * @remarks
 * Custom tokens are used to integrate Firebase Auth with existing auth systems, and must
 * be generated by an auth backend using the
 * {@link https://firebase.google.com/docs/reference/admin/node/admin.auth.Auth#createcustomtoken | createCustomToken}
 * method in the {@link https://firebase.google.com/docs/auth/admin | Admin SDK} .
 *
 * Fails with an error if the token is invalid, expired, or not accepted by the Firebase Auth service.
 *
 * This method is not supported by {@link Auth} instances created with a
 * {@link @firebase/app#FirebaseServerApp}.
 *
 * @param auth - The {@link Auth} instance.
 * @param customToken - The custom token to sign in with.
 *
 * @public
 */
export declare function signInWithCustomToken(auth: Auth, customToken: string): Promise<UserCredential>;
