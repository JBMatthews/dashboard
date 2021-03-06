// Copyright 2017 The Kubernetes Dashboard Authors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Controller to manage title of browser window.
 *
 * @final
 */
export class TitleController {
  /**
   * @param {!angular.$interpolate} $interpolate
   * @param {!./common/state/service.FutureStateService} kdFutureStateService
   * @ngInject
   */
  constructor($interpolate, kdFutureStateService) {
    /** @private {!./common/state/service.FutureStateService} */
    this.kdFutureStateService_ = kdFutureStateService;

    /** @private {!angular.$interpolate} */
    this.interpolate_ = $interpolate;
  }

  /**
   * Returns title of browser window based on current state's breadcrumb label.
   *
   * @export
   * @return {string}
   */
  title() {
    if (this.kdFutureStateService_.state && this.kdFutureStateService_.state.data &&
        this.kdFutureStateService_.state.data.kdBreadcrumbs &&
        this.kdFutureStateService_.state.data.kdBreadcrumbs.label) {
      let breadcrumbs = this.kdFutureStateService_.state.data.kdBreadcrumbs;
      let params = this.kdFutureStateService_.params;
      let state = this.interpolate_(breadcrumbs.label)({'$stateParams': params}).toString();
      return `${state} - Kubernetes Dashboard`;
    } else {
      return 'Kubernetes Dashboard';
    }
  }
}
