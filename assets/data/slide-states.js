window._assets.data.slideStates = [
  {
    description: `
    通过马角坝实习我们了解到，我国农村环境保护现状存在问题。经济社会在不断发展，居民对垃圾的不恰当处理，也使得良好的生态环境日益遭到破坏。因此，在农村环境综合整治的背景下，农村生活垃圾收集点选址规划和研究具有重大意义。
    轻击下一步，让我们一起手把手为环境保护做出贡献。
    `,
    visibility: {
      stations: true,
      roadBuffer: false,
      pondBuffer: false,
      riverBuffer: false,
      residentialBuffer: false,
      badArea: false,
      preResult: false,
      result: false
    },
    zoomLevel: 13,
    center: [105.075109, 32.087925],
  },
  {
    description: `
    瞧！这是我们小组采集到的马脚镇现存垃圾收集点的分布情况。
    试试点击地图上的小图标！
    `,
    visibility: { stations: true },
    zoomLevel: 14,
    center: [105.076225, 32.095197],
  },
  {
    description: `
    接下来我们对道路进行矢量化，并为它们建立缓冲区。注意，还要将道路本身从缓冲区中擦除！为什么？垃圾站不能建在道路中央。
    让我们继续下一步。
    `,
    visibility: { stations: true, roadBuffer: true },
    zoomLevel: 14,
    center: [105.075109, 32.087925],
  },
  {
    description: `
    嘻嘻下一步我还没想好。
    `,
    visibility: {},
  },
  {
    description: `大功告成！我们选出了可以建垃圾收集处理站的地方！`,
    visibility: { result: true },
    zoomLevel: 15,
    center: [105.066311, 32.079889]
  }
]