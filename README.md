# qm-map-print
qm-map-print 是一款基于React、Mapboxgl的地图打印工具

## 安装
使用npm或yarn安装
```bash
npm install qm-map-print --force

```

## 依赖
qm-map-print 开发依赖于fabric@5.3.0，file-saver，jspdf库

## 使用

```js
import { MapboxExportControl } from 'qm-map-print';
import { Map} from 'mapbox-gl';

const map=new Map()

const exportCtrl =new MapboxExportControl();

map.addControl(exportCtrl, 'top-right');

```
