/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */

import { LogLevel } from '../../../../../Framework/src/live2dcubismframework';

/**
 * Sample Appで使用する定数
 */

// Canvas width and height pixel values, or dynamic screen size ('auto').
export const CanvasSize: { width: number; height: number } | 'auto' = 'auto';

// 画面
export const ViewScale = 1.0;
export const ViewMaxScale = 2.0;
export const ViewMinScale = 0.8;

export const ViewLogicalLeft = -1.0;
export const ViewLogicalRight = 1.0;
export const ViewLogicalBottom = -1.0;
export const ViewLogicalTop = 1.0;

export const ViewLogicalMaxLeft = -2.0;
export const ViewLogicalMaxRight = 2.0;
export const ViewLogicalMaxBottom = -2.0;
export const ViewLogicalMaxTop = 2.0;

// 相対パス
export const ResourcesPath = '../../assets/login/Resources/';

// 모델 뒤 배경이미지
export const BackImageName = 'back_class_normal.png';

// 설정
export const GearImageName = 'icon_gear.png';

// 종료버튼
export const PowerImageName = 'CloseNormal.png';

// モデル定義---------------------------------------------
// 모델을 배치한 디렉토리 이름의 배열
// 디렉토리 이름과 model3.json의 이름을 일치시켜야합니다.
export const ModelDir: string[] = ['Haru', 'Hiyori', 'Mark', 'Natori', 'Rice'];
export const ModelDirSize: number = ModelDir.length;

// 외부 정의 파일(json)과 일치
export const MotionGroupIdle = 'Idle'; // 공희전
export const MotionGroupTapBody = 'TapBody'; // 몸탭화면

// 외부 정의 파일(json)과 일치
export const HitAreaNameHead = 'Head';
export const HitAreaNameBo
dy = 'Body';

// 모션 우선 순위 상수
export const PriorityNone = 0;
export const PriorityIdle = 1;
export const PriorityNormal = 2;
export const PriorityForce = 3;

// デバッグ用ログの表示オプション
export const DebugLogEnable = true;
export const DebugTouchLogEnable = false;

// 디버깅 로그 표시 옵션
export const CubismLoggingLevel: LogLevel = LogLevel.LogLevel_Verbose;

// デフォルトのレンダーターゲットサイズ
export const RenderTargetWidth = 1900;
export const RenderTargetHeight = 1000;
