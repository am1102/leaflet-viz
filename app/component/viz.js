/**
 * 可视化
 * @Author zry
 * @Date 2017-04-26
 * [heatmap](https://github.com/Leaflet/Leaflet.heat)
 * Basic Usage
	```
	var heat = L.heatLayer([
		[50.5, 30.5, 0.2], // lat, lng, intensity
		[50.6, 30.4, 0.5],
		...
	], {radius: 25}).addTo(map)
	```

 * 
 */
import './viz.scss';
import $ from 'jquery';
import util from '../common/util.js';

import { map } from './basemap.js';
import '../common/leaflet-plugin/HeatLayer.js'; //Leaflet.heat

// import echarts from 'echarts';
// import echarts from '../common/leaflet-plugin/lib/echarts.source.js';
import {ecOption} from './vizConfig-qianxi.js';
import {scatterOption} from './vizConfig-scatter.js';
// import "/app/common/leaflet-plugin/leaflet-echarts3.js";

import {Dvf} from './dvf.js';

class Viz {
    init() {
    	this._vizEvent()
    }
    _vizEvent(){
    	$('#mapbar').on('click', '#heatbar', (event) => {
    		this.heatLayer();
    	});
    	$('#mapbar').on('click', '#echarts1', (event) => {
    		if(!this.echarts){
    			util.getScript("/app/common/leaflet-plugin/leaflet-echarts3.js").then(()=>{//version 2.x
    				console.log(window.echarts);
    				this.echartsLayer(window.echarts,"scatter");
    			});
    		}else{
    			this.echartsLayer(this.echarts,"scatter");
    		}
    	});
        $('#mapbar').on('click', '#echarts2', (event) => {
            if(!this.echarts){
                util.getScript("/app/common/leaflet-plugin/leaflet-echarts3.js").then(()=>{//version 2.x
                    console.log(window.echarts);
                    this.echartsLayer(window.echarts,"qianxi");
                });
            }else{
                this.echartsLayer(this.echarts,"qianxi");
            }
        });
    	$('#mapbar').on('click', '#dvf1', (event) => {
            var dvf = new Dvf();
            dvf.earthquakesSample();
        });
        $('#mapbar').on('click', '#dvf2', (event) => {
            var dvf = new Dvf();
            dvf.sample2();
        });
    }
    /**
     * [echartsLayer leaflet+echarts]
     * @param  {[Object]} echarts [echarts对象]
     * @param  {[String]} type    [类型 如qianxi，迁徙图和散点图scatter]
     */
    echartsLayer(echarts,type){
    	this.echarts = echarts;
    	let overlay = new L.echartsLayer3(map, echarts);
    	let chartsContainer = overlay.getEchartsContainer();
    	let myChart = overlay.initECharts(chartsContainer);
    	window.onresize = myChart.onresize;

        console.log("chartsContainer:",chartsContainer);
    	if(type == "qianxi"){
    		 overlay.setOption(ecOption);
    	}else if(type == "scatter"){
    		overlay.setOption(scatterOption);
    	}

    }
    heatLayer() {
        let url = "http://leaflet.github.io/Leaflet.markercluster/example/realworld.10000.js";
        util.getScript(url).then(() => {
        	map.flyTo([-37.87, 175.475], 12);

            addressPoints = addressPoints.map((p) => {
                return [p[0], p[1]];
            });

            let heat = L.heatLayer(addressPoints).addTo(map);
        })

    }
}

export {Viz};