import { InjectionToken } from '@angular/core';
import { CaptchaSettings } from './interface/captcha-settings';

export let CAPTCHA_SETTINGS = new InjectionToken<CaptchaSettings>('captcha.settings');