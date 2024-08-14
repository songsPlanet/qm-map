"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crosshair_manager_1 = require("./crosshair-manager");
const printable_area_manager_1 = require("./printable-area-manager");
const local_1 = require("./local");
const map_generator_1 = require("./map-generator");
/**
 * Mapbox GL Export Control.
 * @param {Object} targets - Object of layer.id and title
 */
class MapboxExportControl {
    constructor(options) {
        this.options = {
            PageSize: map_generator_1.Size.A4, // 尺寸A4: [297, 210],
            PageOrientation: map_generator_1.PageOrientation.横向, // 布局横向 'landscape'
            Format: map_generator_1.Format.PDF, // 格式
            DPI: map_generator_1.DPI[96], // 96
            Crosshair: true, // 十子管理器
            PrintableArea: true, // 是否显示可打印区域
            accessToken: undefined, //
        };
        if (options) {
            this.options = Object.assign(this.options, options);
        }
        this.onDocumentClick = this.onDocumentClick.bind(this);
    }
    getDefaultPosition() {
        const defaultPosition = 'top-right';
        return defaultPosition;
    }
    getTranslation() {
        switch (this.options.Local) {
            case 'en':
                return local_1.english;
            case 'fr':
                return local_1.french;
            case 'fi':
                return local_1.finnish;
            case 'sv':
                return local_1.swedish;
            case 'vi':
                return local_1.vietnam;
            case 'cn':
                return local_1.chinese;
            default:
                return local_1.chinese;
        }
    }
    onAdd(map) {
        this.map = map;
        this.controlContainer = document.createElement('div');
        this.controlContainer.classList.add('mapboxgl-ctrl');
        this.controlContainer.classList.add('mapboxgl-ctrl-group');
        this.exportContainer = document.createElement('div');
        this.exportContainer.classList.add('mapboxgl-export-list');
        this.exportButton = document.createElement('button');
        this.exportButton.classList.add('mapboxgl-ctrl-icon');
        this.exportButton.classList.add('mapboxgl-export-control');
        this.exportButton.type = 'button';
        this.exportButton.title = '打印';
        this.exportButton.addEventListener('click', () => {
            this.exportButton.style.width = '0';
            this.exportButton.style.height = '0';
            this.exportContainer.style.width = '200px';
            this.exportContainer.style.height = '150px';
            this.toggleCrosshair(true);
            this.togglePrintableArea(true);
        });
        document.addEventListener('click', this.onDocumentClick);
        this.controlContainer.appendChild(this.exportButton);
        this.controlContainer.appendChild(this.exportContainer);
        const table = document.createElement('TABLE');
        table.className = 'print-table';
        const tr1 = this.createSelection(map_generator_1.Size, this.getTranslation().PageSize, 'page-size', this.options.PageSize, (data, key) => JSON.stringify(data[key]));
        table.appendChild(tr1);
        const tr2 = this.createSelection(map_generator_1.PageOrientation, this.getTranslation().PageOrientation, 'page-orientaiton', this.options.PageOrientation, (data, key) => data[key]);
        table.appendChild(tr2);
        const tr3 = this.createSelection(map_generator_1.Format, this.getTranslation().Format, 'format-type', this.options.Format, (data, key) => data[key]);
        table.appendChild(tr3);
        const tr4 = this.createSelection(map_generator_1.DPI, this.getTranslation().DPI, 'dpi-type', this.options.DPI, (data, key) => data[key]);
        table.appendChild(tr4);
        this.exportContainer.appendChild(table);
        const generateButton = document.createElement('button');
        generateButton.type = 'button';
        generateButton.textContent = '导出';
        generateButton.classList.add('generate-button');
        generateButton.addEventListener('click', () => {
            const pageSize = document.getElementById('mapbox-gl-export-page-size');
            const pageOrientation = (document.getElementById('mapbox-gl-export-page-orientaiton'));
            const formatType = document.getElementById('mapbox-gl-export-format-type');
            const dpiType = document.getElementById('mapbox-gl-export-dpi-type');
            const orientValue = pageOrientation.value;
            let pageSizeValue = JSON.parse(pageSize.value);
            if (orientValue === map_generator_1.PageOrientation.纵向) {
                pageSizeValue = pageSizeValue.reverse();
            }
            const mapGenerator = new map_generator_1.default(map, pageSizeValue, Number(dpiType.value), formatType.value, map_generator_1.Unit.mm, this.options.accessToken);
            mapGenerator.generate();
        });
        this.exportContainer.appendChild(generateButton);
        return this.controlContainer;
    }
    createSelection(data, title, type, defaultValue, converter) {
        const label = document.createElement('label');
        label.textContent = title;
        const content = document.createElement('select');
        content.setAttribute('id', `mapbox-gl-export-${type}`);
        content.style.width = '100%';
        Object.keys(data).forEach((key) => {
            const optionLayout = document.createElement('option');
            optionLayout.setAttribute('value', converter(data, key));
            optionLayout.appendChild(document.createTextNode(key));
            optionLayout.setAttribute('name', type);
            if (defaultValue === data[key]) {
                optionLayout.selected = true;
            }
            content.appendChild(optionLayout);
        });
        content.addEventListener('change', () => {
            this.updatePrintableArea();
        });
        const tr1 = document.createElement('TR');
        const tdLabel = document.createElement('TD');
        const tdContent = document.createElement('TD');
        tdLabel.appendChild(label);
        tdContent.appendChild(content);
        tr1.appendChild(tdLabel);
        tr1.appendChild(tdContent);
        return tr1;
    }
    onRemove() {
        var _a;
        if (!((_a = this.controlContainer) === null || _a === void 0 ? void 0 : _a.parentNode) || !this.map || !this.exportButton) {
            return;
        }
        this.exportButton.removeEventListener('click', this.onDocumentClick);
        this.controlContainer.parentNode.removeChild(this.controlContainer);
        document.removeEventListener('click', this.onDocumentClick);
        if (this.crosshair !== undefined) {
            this.crosshair.destroy();
            this.crosshair = undefined;
        }
        this.map = undefined;
    }
    onDocumentClick(event) {
        if (this.controlContainer &&
            !this.controlContainer.contains(event.target) &&
            this.exportButton &&
            this.exportButton) {
            this.exportContainer.style.width = '0';
            this.exportContainer.style.height = '0';
            this.exportButton.style.width = '29px';
            this.exportButton.style.height = '29px';
            this.toggleCrosshair(false);
            this.togglePrintableArea(false);
        }
    }
    toggleCrosshair(state) {
        if (this.options.Crosshair === true) {
            if (state === false) {
                if (this.crosshair !== undefined) {
                    this.crosshair.destroy();
                    this.crosshair = undefined;
                }
            }
            else {
                this.crosshair = new crosshair_manager_1.default(this.map);
                this.crosshair.create();
            }
        }
    }
    togglePrintableArea(state) {
        if (this.options.PrintableArea === true) {
            if (state === false) {
                if (this.printableArea !== undefined) {
                    this.printableArea.destroy();
                    this.printableArea = undefined;
                }
            }
            else {
                this.printableArea = new printable_area_manager_1.default(this.map);
                this.updatePrintableArea();
            }
        }
    }
    updatePrintableArea() {
        if (this.printableArea === undefined) {
            return;
        }
        const pageSize = document.getElementById('mapbox-gl-export-page-size');
        const pageOrientation = (document.getElementById('mapbox-gl-export-page-orientaiton'));
        const orientValue = pageOrientation.value;
        let pageSizeValue = JSON.parse(pageSize.value);
        if (orientValue === map_generator_1.PageOrientation.纵向) {
            pageSizeValue = pageSizeValue.reverse();
        }
        this.printableArea.updateArea(pageSizeValue[0], pageSizeValue[1]);
    }
}
exports.default = MapboxExportControl;
