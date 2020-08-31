(function () {
  let map // amap实例
    , currentInfoWindow  // 信息窗口
    ;
  const assets = window._assets
    , geoJsonOptions = {
      fillOpacity: 1
    };

  window._util = {
    // 切换侧边栏显示状态
    toggleSidebar() {
      const el = document.getElementById('sidebar');
      el.classList.toggle('hidden');
      el.classList.add('flying');
      setTimeout(() => {
        document.getElementById('map-container').classList.toggle('no-sidebar');
        el.classList.remove('flying');
      }, 350);
    },
    // 关闭信息窗口
    closeInfoWindow() {
      if (currentInfoWindow) {
        map.remove(currentInfoWindow);
        currentInfoWindow = null;
      }
    },
    // 加载所有图层数据
    loadLayers(_map) {
      map = _map;
      return {
        // 垃圾站图层
        stations: loadGarbageStations(),
        xz: {
          // 道路缓冲区
          roadBuffer: loadRoadBuffer(),
          // 坑塘缓冲区
          pondBuffer: loadPondBuffer(),
          // 河流缓冲区
          riverBuffer: loadRiverBuffer(),
          // 居民地缓冲区
          residentialBuffer: loadResidentialBuffer(),
          // 不适宜地区
          badArea: loadBadArea(),
          // 备选区
          preResult: loadPreResult(),
          // 适宜区域
          result: loadResult(),
          // 选址结果
          resultPoints: loadResultPoints()
        }
      }
    }
  }


  //加载垃圾站数据
  function loadGarbageStations() {
    const stationObjs = assets.data.stations;
    if (!stationObjs) { return; }
    const markers = [];
    for (let station of stationObjs) {
      const marker = new AMap.Marker({
        title: `垃圾站${station.id}`,
        position: new AMap.LngLat(station.longitude, station.latitude),
        anchor: 'middle-left',
      });
      markers.push(marker);
      marker.on('click', () => {
        const content = `
        <div class="content-window-card">
          <p style="font-weight: bold; display: flex; align-items: center; padding: 8px auto;">
             <img src="./assets/favicon.png" style="height: 24px;" />
            &nbsp;&nbsp;&nbsp;垃圾站
          </p>
          <span>ID：${station.id}</span><br/>
          <span>经度：${station.longitude}°E</span><br/>
          <span>纬度：${station.latitude}°N</span><br/>
          <span>高程：${station.elevation}米</span><br/>
          <img class="station-picture" src="./assets/pictures/${station.id}.JPG" />
        </div>
        `;
        currentInfoWindow = new AMap.InfoWindow({
          content: content
        });
        // 打开信息窗体
        currentInfoWindow.open(map, marker.getPosition());
      });
    }
    return new AMap.OverlayGroup(markers);
  }
  // 道路缓冲区
  function loadRoadBuffer() {
    return new AMap.GeoJSON({
      geoJSON: assets.geoJson.xz_roadBuffer,
      getPolygon: function (geojson, lnglats) {
        return new AMap.Polygon({
          path: lnglats,
          ...geoJsonOptions,
          fillColor: '#beb297',
          strokeColor: '#beb297',
          zIndex: 3
        });
      }
    });
  }
  // 河流缓冲区
  function loadRiverBuffer() {
    return new AMap.GeoJSON({
      geoJSON: assets.geoJson.xz_riverBuffer,
      getPolygon: function (geojson, lnglats) {
        return new AMap.Polygon({
          path: lnglats,
          ...geoJsonOptions,
          fillColor: 'lightblue',
          strokeColor: 'lightblue',
          zIndex: 2
        });
      }
    });
  }
  // 坑塘缓冲区
  function loadPondBuffer() {
    return new AMap.GeoJSON({
      geoJSON: assets.geoJson.xz_pondBuffer,
      getPolygon: function (geojson, lnglats) {
        return new AMap.Polygon({
          path: lnglats,
          ...geoJsonOptions,
          fillColor: '#becf50',
          strokeColor: '#becf50',
          zIndex: 3
        });
      }
    });
  }
  // 居民地缓冲区
  function loadResidentialBuffer() {
    return new AMap.GeoJSON({
      geoJSON: assets.geoJson.xz_residentialBuffer,
      getPolygon: function (geojson, lnglats) {
        return new AMap.Polygon({
          path: lnglats,
          ...geoJsonOptions,
          fillColor: 'pink',
          strokeColor: 'pink',
          fillOpacity: 0.6,
          zIndex: 1
        });
      }
    });
  }
  // 不适宜地区
  function loadBadArea() {
    return new AMap.GeoJSON({
      geoJSON: assets.geoJson.xz_badArea,
      getPolygon: function (geojson, lnglats) {
        return new AMap.Polygon({
          path: lnglats,
          ...geoJsonOptions,
          fillColor: 'grey',
          strokeColor: 'transparent',
          fillOpacity: 0.3,
          zIndex: 0
        });
      }
    });
  }
  // 适宜备选区域
  function loadPreResult() {
    return new AMap.GeoJSON({
      geoJSON: assets.geoJson.xz_preResult,
      getPolygon: function (geojson, lnglats) {
        return new AMap.Polygon({
          path: lnglats,
          ...geoJsonOptions,
          fillColor: 'greenyellow',
          strokeColor: 'greenyellow',
          zIndex: 4
        });
      }
    });
  }
  // 适宜地区
  function loadResult() {
    return new AMap.GeoJSON({
      geoJSON: assets.geoJson.xz_result,
      getPolygon: function (geojson, lnglats) {
        return new AMap.Polygon({
          path: lnglats,
          ...geoJsonOptions,
          fillColor: 'lightgreen',
          strokeColor: 'lightgreen',
          zIndex: 5
        });
      }
    });
  }
  // 选址结果（点）
  function loadResultPoints() {
    return new AMap.GeoJSON({
      geoJSON: assets.geoJson.xz_resultPoints,
      getMarker: function (geojson, lnglat) {
        return new AMap.Marker({
          title: "新增处理点",
          position: lnglat,
          icon: new AMap.Icon({
            size: new AMap.Size(19, 28),
            image: 'assets/icon/marker-red.png',
          })
        });
      }
    });
  }
})()