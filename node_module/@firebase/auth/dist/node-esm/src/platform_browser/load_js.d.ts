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
interface ExternalJSProvider {
    loadJS(url: string): Promise<Event>;
    recaptchaV2Script: string;
    recaptchaEnterpriseScript: string;
    gapiScript: string;
}
export declare function _setExternalJSProvider(p: ExternalJSProvider): void;
export declare function _loadJS(url: string): Promise<Event>;
export declare function _recaptchaV2ScriptUrl(): string;
export declare function _recaptchaEnterpriseScriptUrl(): string;
export declare function _gapiScriptUrl(): string;
export declare function _generateCallbackName(prefix: string): string;
export {};
