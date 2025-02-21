import { IFatherConfig } from 'father';
import { PluginOption } from 'vite';
type CssInJs = (params?: IFatherConfig) => PluginOption;
declare const cssInJs: CssInJs;
export default cssInJs;
