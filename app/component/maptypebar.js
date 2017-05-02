import L from 'leaflet';
import '../common/leaflet-plugin/leaflet.ChineseTmsProviders.js';//可以npm下载
import "../common/tile.stamen.js";

import { map, osm, editableLayers, drawnItems } from './basemap.js';
let gLayer = {};

class Maptypebar {
    init() {
        map.on('baselayerchange',function(){
            map.eachLayer(function(layer){
                // console.log(layer);
                // layer.remove();
            })
        })
        this.initTianDitu();
        this.initGaode();
        this.googleImage = L.tileLayer('http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}', {
                attribution: 'google'
        });
        let baseLayers = {
            'OpenStreetMap': osm.addTo(map),
            "Google卫星": this.googleImage,
            "天地图": this.tianDituLayersNormal,
            "天地图影像": this.tianDituLayersImage,
            "高德地图": this.gaodeLayersNormal,
            "高德地图影像": this.gaodeLayersImage,
        };
        // Object.assign(baseLayers,this.geoqLayers);
        /*if(this.geoqLayers) map.removeLayer(this.geoqLayers);
        if(this.coolLayer ) map.removeLayer(this.coolLayer);*/
        this.baseLayers = baseLayers;
        L.control.layers(baseLayers,{ '绘制图层': drawnItems }, { position: 'topleft', collapsed: false }).addTo(map);

        this.initGeoq();
        this.initSomeCoolMap();
        
    }
    initTianDitu() {
        let normalm = L.tileLayer.chinaProvider('TianDiTu.Normal.Map', {
                maxZoom: 18,
                minZoom: 5
            }),
            normala = L.tileLayer.chinaProvider('TianDiTu.Normal.Annotion', {
                maxZoom: 18,
                minZoom: 5
            }),
            imgm = L.tileLayer.chinaProvider('TianDiTu.Satellite.Map', {
                maxZoom: 18,
                minZoom: 5
            }),
            imga = L.tileLayer.chinaProvider('TianDiTu.Satellite.Annotion', {
                maxZoom: 18,
                minZoom: 5
            });

        let normal = L.layerGroup([normalm, normala]),
            image = L.layerGroup([imgm, imga]);

        let tianDituLayers = {
            "天地图": normal,
            "天地图影像": image,
        }
        this.tianDituLayers = tianDituLayers;
        this.tianDituLayersNormal = normal;
        this.tianDituLayersImage = image;
        // L.control.layers(tianDituLayers).addTo(map);
    }
    initGaode() {
        let normalm = L.tileLayer.chinaProvider('GaoDe.Normal.Map', {
            maxZoom: 18,
            minZoom: 5
        });
        let imgm = L.tileLayer.chinaProvider('GaoDe.Satellite.Map', {
            maxZoom: 18,
            minZoom: 5
        });
        let imga = L.tileLayer.chinaProvider('GaoDe.Satellite.Annotion', {
            maxZoom: 18,
            minZoom: 5
        });

        let normal = L.layerGroup([normalm]),
            image = L.layerGroup([imgm, imga]);

        let gaodeLayers = {
            "高德地图": normal,
            "高德地图影像": image,
        }
        this.gaodeLayers = gaodeLayers;
        this.gaodeLayersNormal = normal;
        this.gaodeLayersImage = image;
        // L.control.layers(gaodeLayers).addTo(map);
    }
    initGeoq() {
        let normalm1 = L.tileLayer.chinaProvider('Geoq.Normal.Map', {
            maxZoom: 18,
            minZoom: 5
        });
        let normalm2 = L.tileLayer.chinaProvider('Geoq.Normal.Color', {
            maxZoom: 18,
            minZoom: 5
        });
        let normalm3 = L.tileLayer.chinaProvider('Geoq.Normal.PurplishBlue', {
            maxZoom: 18,
            minZoom: 5
        });
        let normalm4 = L.tileLayer.chinaProvider('Geoq.Normal.Gray', {
            maxZoom: 18,
            minZoom: 5
        });
        let normalm5 = L.tileLayer.chinaProvider('Geoq.Normal.Warm', {
            maxZoom: 18,
            minZoom: 5
        });
        let normalm6 = L.tileLayer.chinaProvider('Geoq.Normal.Cold', {
            maxZoom: 18,
            minZoom: 5
        });

        let normal = L.layerGroup([normalm1, normalm2, normalm3, normalm4, normalm5, normalm6]);

        let geoqLayers = {
            "Geoq地图": normalm1,
            "Geoq多彩": normalm2,
            "Geoq午夜蓝": normalm3,
            "Geoq灰色": normalm4,
            "Geoq暖色": normalm5,
            "Geoq冷色": normalm6
        }
        
        this.geoqLayers = geoqLayers;
        /*if(this.baseLayers) map.removeLayer(this.baseLayers);
        if(this.coolLayer) map.removeLayer(this.coolLayer);*/
		L.control.layers(geoqLayers ,{}, { position: 'topleft', collapsed: false }).addTo(map);

    }
    initSomeCoolMap(){
        /*if(this.baseLayers) map.removeLayer(this.baseLayers);
        if(this.geoqLayers) map.removeLayer(this.geoqLayers);*/

        let tonerLayer = new L.StamenTileLayer('toner', {
            detectRetina: true
        });
        let terrainLayer = new L.StamenTileLayer('terrain');
        let watercolorLayer = new L.StamenTileLayer('watercolor');

        // baseLayer.addTo(map);

        let prccEarthquakesLayer = L.tileLayer('http://{s}.tiles.mapbox.com/v3/bclc-apec.map-rslgvy56/{z}/{x}/{y}.png', {
            attribution: 'Map &copy; Pacific Rim Coordination Center (PRCC).  Certain data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
        });
        let coolLayer = {
            '黑白图': tonerLayer,
            '地形图':terrainLayer,
            '水域图':watercolorLayer,
            '地震图': prccEarthquakesLayer
        };
        this.coolLayer = coolLayer;
        gLayer.coolLayer = coolLayer;
        let layerControl = new L.Control.Layers(coolLayer,null,{ position: 'topleft', collapsed: false });

        layerControl.addTo(map);
    }
}

export { Maptypebar,gLayer };
