(function () {
  const assets = window._assets
    , util = window._util;
  let map
    , layers  // 图层们
    , currentSlideState = 0 // 当前幻灯位置
    ;
  window.addEventListener('load', () => {
    // 初始化地图
    map = new AMap.Map('map-container', {
      resizeEnable: true, // 是否监控地图容器尺寸变化
      zoom: 13, // 初始地图级别
      center: [105.075109, 32.087925], // 初始地图中心点
    });
    AMap.plugin([
      'AMap.ToolBar',
      'AMap.Scale',
    ], function () {
      // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
      map.addControl(new AMap.ToolBar({
        liteStyle: true
      }));
      // 在图面添加比例尺控件，展示地图在当前层级和纬度下的比例尺
      map.addControl(new AMap.Scale());
    });
    map.on('moveend', ev => { console.log(map.getCenter()) })
    // 侧边栏控制
    $('#sidebar-toggler').on('click', function () {
      util.toggleSidebar();
    })
    // 绑定图层显示控制事件
    $('input[id^=xz-]').on('change', function (ev) {
      const checked = ev.target.checked
        , name = ev.target.name;
      if (!name || !layers.xz[name]) { return; }
      checked ? map.add(layers.xz[name]) : map.remove(layers.xz[name]);
    });
    $('#stations').on('change', function (ev) {
      if (ev.target.checked) {
        map.add(layers.stations);
      }
      else {
        map.remove(layers.stations);
      }
    })
    // 绑定选址动画控制事件
    $('.xz-button-group #xz-previous').on('click', function () {
      applySlideState(--currentSlideState);
    });
    $('.xz-button-group #xz-next').on('click', function () {
      applySlideState(++currentSlideState);
    });
    $('#xz-description-container').on('animationend', function () {
      $('#xz-description-container').removeClass('animated');
    });
    // 加载图层数据
    layers = util.loadLayers(map);
    // 大屏幕默认展开侧边栏
    if (window.innerWidth >= 768) {
      util.toggleSidebar();
    }
    applySlideState();
  });

  // 设置选址动画位置
  function applySlideState(stateIndex) {
    const slideStates = assets.data.slideStates;
    if (typeof stateIndex !== 'undefined') {
      currentSlideState = stateIndex;
    }
    if (currentSlideState < 0) {
      currentSlideState = 0;
    }
    else if (currentSlideState >= slideStates.length) {
      currentSlideState = slideStates.length - 1;
    }
    const state = slideStates[currentSlideState];
    if (currentSlideState === 0) {
      $('#xz-previous').attr('disabled', 'true');
    }
    else {
      $('#xz-previous').removeAttr('disabled');
    }
    if (currentSlideState === slideStates.length - 1) {
      $('#xz-next').attr('disabled', 'true');
    }
    else {
      $('#xz-next').removeAttr('disabled');
    }
    if (!state) { return; }
    const container = document.getElementById('xz-description-container')
      , fragment = document.createDocumentFragment();
    for (const para of state.description.split(/\r?\n\r?/)) {
      if (!para.trim()) { continue; }
      const p = document.createElement('p');
      p.textContent = para;
      fragment.appendChild(p);
    }
    container.innerHTML = '';
    container.appendChild(fragment);
    container.classList.add('animated');
    const stationCheckbox = document.querySelector('#stations');
    if (state.visibility.stations && !stationCheckbox.checked) {
      map.add(layers.stations);
      stationCheckbox.checked = true;
    }
    else if (!state.visibility.stations && stationCheckbox.checked) {
      map.remove(layers.stations);
      stationCheckbox.checked = false;
    }
    for (const layer of Object.keys(layers.xz)) {
      const toggler = document.querySelector(`input[id^=xz-][name=${layer}]`)
        , didLoaded = toggler.checked;
      if (state.visibility[layer] && !didLoaded) {
        map.add(layers.xz[layer]);
        toggler.checked = true;
      }
      else if (!state.visibility[layer] && didLoaded) {
        map.remove(layers.xz[layer]);
        toggler.checked = false;
      }
    }
    util.closeInfoWindow();
    if (state.center) {
      map.panTo(state.center);
    }
    if (state.zoomLevel) {
      map.setZoom(state.zoomLevel);
    }
  }



  window._tempOnChange = function (ev) {
    try {
      eval(ev.target.value);
      applySlideState();
    }
    catch {
      alert("出错。请检查输入字符串是否有语法错误。也可刷新重新改。");
    }
  }
})();

