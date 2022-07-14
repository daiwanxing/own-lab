<template>
  <<<<<<< HEAD
  <div>
    <h1>dsahdasdasijodsa</h1>
  </div>
</template>

<script lang="ts" setup>
import "./index.scss";

</script>
=======
  <main>
    <div id="map"></div>
  </main>
</template>

<script>
import "./index.scss";
import { defineComponent, onMounted } from "vue";
import { transToGeoPointData, mockData, transToGeoLineData } from "@/utils/useGeoJSON";

export default defineComponent({
  name: "RootApp",
  setup() {
    onMounted(() => {
      var map = new window.AMap.Map("map", {
        zoom: 18,
        viewMode: "3D",
        pitch: 48,
        center: [112.904282, 28.209609],
        mapStyle: "amap://styles/45311ae996a8bea0da10ad5151f72979",
      });


      var loca = new window.Loca.Container({
        map,
      });


      // 呼吸点
      var scatter = new Loca.ScatterLayer({
        loca,
        zIndex: 10,
        opacity: 0.6,
        visible: true,
        zooms: [2, 22],
      });

      console.log(transToGeoPointData(mockData));

      var pointGeo = new window.Loca.GeoJSONSource({
        data: transToGeoPointData(mockData),
      });
      scatter.setSource(pointGeo);
      scatter.setStyle({
        unit: "meter",
        size: [1000, 1000],
        borderWidth: 0,
        texture:
          "https://a.amap.com/Loca/static/loca-v2/demos/images/breath_red.png",
        duration: 2000,
        animate: true,
      });
      loca.add(scatter);



      // 弧线
      var pulseLink = new Loca.PulseLinkLayer({
        // loca,
        zIndex: 10,
        opacity: 1,
        visible: true,
        zooms: [2, 22],
        depth: true,
      });

      var geo = new Loca.GeoJSONSource({
        data: transToGeoLineData(mockData),
      });

      pulseLink.setSource(geo);
      pulseLink.setStyle({
        unit: "meter",
        dash: [400, 0, 400, 0],
        lineWidth: function () {
          return [150, 150];
        },
        height: function (index, feat) {
          return feat.distance / 3 + 10;
        },
        smoothSteps: 30,
        speed() {
          return 1000 + Math.random() * 2000;
        },
        flowLength: 100,
        lineColors() {
          return ["orange"];
        },
        maxHeightScale: 0.3, // 弧顶位置比例
        headColor: "rgba(255, 255, 0, 1)",
        trailColor: "rgba(255, 255,0,0)",
      });
      loca.add(pulseLink);
      loca.animate.start();

      var dat = new Loca.Dat();
      dat.addLayer(pulseLink);

      map.setFitView();
    });

  }
});

</script>

<style lang="scss">
main {
  height: 100vh;

  #map {
    height: 100%;
  }
}
</style>

>>>>>>> 53fd6d3292397182de6744b934f3cef0e45ba152
