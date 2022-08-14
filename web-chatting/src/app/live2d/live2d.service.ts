import { Injectable } from '@angular/core';
import {LAppDelegate} from './Core/lappdelegate';
import * as LAppDefine from './Core/lappdefine';
/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */

/**
 * 終了時の処理
 */
window.onbeforeunload = (): void => LAppDelegate.releaseInstance();

/**
 * Process when changing screen size.
 */
window.onresize = () => {
  if (LAppDefine.CanvasSize === 'auto') {
    LAppDelegate.getInstance().onResize();
  }
};

@Injectable({
  providedIn: 'root'
})
export class Live2dService {

  constructor() { }

  initLive2D(characterCanvasEle: any) {
    // create the application instance
    if (LAppDelegate.getInstance().initialize(characterCanvasEle) == false) {
      return;
    }

    LAppDelegate.getInstance().run();
  }
}
