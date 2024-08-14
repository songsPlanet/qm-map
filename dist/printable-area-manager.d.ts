import { Map as MapboxMap } from 'mapbox-gl';
export default class PrintableAreaManager {
    private map;
    private width;
    private height;
    private unit;
    private svgCanvas;
    private svgPath;
    constructor(map: MapboxMap | undefined);
    private mapResize;
    updateArea(width: number, height: number): void;
    private generateCutOut;
    destroy(): void;
    /**
     * Convert mm/inch to pixel
     * @param length mm/inch length
     * @param conversionFactor DPI value. default is 96.
     */
    private toPixels;
}
