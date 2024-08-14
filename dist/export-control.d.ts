import { IControl, Map as MapboxMap } from 'mapbox-gl';
import { Translation } from './local';
type Options = {
    PageSize: any;
    PageOrientation: string;
    Format: string;
    DPI: number;
    Crosshair?: boolean;
    PrintableArea: boolean;
    accessToken?: string;
    Local?: 'en' | 'fr' | 'fi' | 'sv' | 'vi' | 'cn';
};
/**
 * Mapbox GL Export Control.
 * @param {Object} targets - Object of layer.id and title
 */
export default class MapboxExportControl implements IControl {
    private controlContainer;
    private exportContainer;
    private crosshair;
    private printableArea;
    private map?;
    private exportButton;
    private options;
    constructor(options?: Options);
    getDefaultPosition(): string;
    getTranslation(): Translation;
    onAdd(map: MapboxMap): HTMLElement;
    private createSelection;
    onRemove(): void;
    private onDocumentClick;
    private toggleCrosshair;
    private togglePrintableArea;
    private updatePrintableArea;
}
export {};
