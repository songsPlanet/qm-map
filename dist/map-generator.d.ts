import { Map as MapboxMap } from 'mapbox-gl';
import 'js-loading-overlay';
import './css/styles.less';
export declare const Format: {
    readonly JPEG: "jpg";
    readonly PNG: "png";
    readonly PDF: "pdf";
    readonly SVG: "svg";
};
export declare const Unit: {
    readonly in: "in";
    readonly mm: "mm";
};
type Unit = (typeof Unit)[keyof typeof Unit];
export declare const Size: {
    readonly LETTER: readonly [279, 216];
    readonly A2: readonly [594, 420];
    readonly A3: readonly [420, 297];
    readonly A4: readonly [297, 210];
    readonly A5: readonly [210, 148];
    readonly A6: readonly [148, 105];
    readonly B2: readonly [707, 500];
    readonly B3: readonly [500, 353];
    readonly B4: readonly [353, 250];
    readonly B5: readonly [250, 176];
    readonly B6: readonly [176, 125];
};
type Size = (typeof Size)[keyof typeof Size];
export declare const PageOrientation: {
    readonly 横向: "landscape";
    readonly 纵向: "portrait";
};
export declare const DPI: {
    readonly 72: 72;
    readonly 96: 96;
    readonly 200: 200;
    readonly 300: 300;
    readonly 400: 400;
};
export default class MapGenerator {
    private map;
    private width;
    private height;
    private dpi;
    private format;
    private unit;
    private accesstoken;
    /**
     * Constructor
     * @param map MapboxMap object
     * @param size layout size. default is A4
     * @param dpi dpi value. deafult is 96
     * @param format image format. default is PNG
     * @param unit length unit. default is mm
     */
    constructor(map: MapboxMap, size?: Size, dpi?: number, format?: string, unit?: Unit, accesstoken?: string);
    /**
     * Generate and download Map image
     */
    generate(): void;
    /**
     * Convert canvas to PNG
     * @param canvas Canvas element
     * @param fileName file name
     */
    private toPNG;
    /**
     * Convert canvas to JPEG
     * @param canvas Canvas element
     * @param fileName file name
     */
    private toJPEG;
    /**
     * Convert Map object to PDF
     * @param map mapboxgl.Map object
     * @param fileName file name
     */
    private toPDF;
    /**
     * Convert canvas to SVG
     * this SVG export is using fabric.js. It is under experiment.
     * Please also see their document.
     * http://fabricjs.com/docs/
     * @param canvas Canvas element
     * @param fileName file name
     */
    private toSVG;
    /**
     * Convert mm/inch to pixel
     * @param length mm/inch length
     * @param conversionFactor DPI value. default is 96.
     */
    private toPixels;
}
export {};
