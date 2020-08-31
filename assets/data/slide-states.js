window._assets.data.slideStates = [
  {
    description: `
    通过马角坝实习我们了解到，我国农村环境保护现状存在问题。经济社会在不断发展，居民对垃圾的不恰当处理，也使得良好的生态环境日益遭到破坏。因此，在农村环境综合整治的背景下，农村生活垃圾处理点选址规划和研究具有重大意义。
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
    瞧！这是我们小组采集到的马脚镇现存垃圾处理点的分布情况。
    试试点击地图上的小图标！
    `,
    visibility: { stations: true },
    zoomLevel: 14,
    center: [105.076225, 32.095197],
  },
  {
    description: `
    接下来我们对道路进行矢量化，并为它们建立缓冲区。注意，还要将道路本身从缓冲区中擦除！为什么？因为垃圾站应该建在路边而不能建在道路中央。
    不妨放大看看，道路缓冲区中间是空的！
    让我们继续下一步。
    `,
    visibility: { stations: true, roadBuffer: true },
    zoomLevel: 14,
    center: [105.075109, 32.087925],
  },
  {
    description: `
    然后是居民区缓冲区。我们是为人民服务的！不能离人太远。
    很好，我们的垃圾处理点将会在这些区域里选出。似乎还差点什么？噢上帝，有些地方是不可以建垃圾处理点的！比如......
    请点击下一步。
    `,
    visibility: {
      roadBuffer: true,
      residentialBuffer: true,
    },
    zoomLevel: 14,
    center: [105.078109, 32.095],
  },
  {
    description: `
    这些！
    我们的垃圾处理点不能离河流太近，因为可能会污染水源。
    也要避开坑塘水库这种地方，毕竟谁也不想发生意外。
    `,
    visibility: {
      riverBuffer: true,
      pondBuffer: true,
    },
    zoomLevel: 14,
    center: [105.077594, 32.084674],
  },
  {
    description: `
    还有！我们感到很遗憾，这一大片林地和水田也无法为我们的环保事业作出贡献。我们只能避开它。
    好吧，让我们来看看，我们现在有些什么！
    现在地图上的区域是“坏区域”缓冲区，是我们需要排除的。
    `,
    visibility: {
      riverBuffer: true,
      pondBuffer: true,
      badArea: true
    },
    zoomLevel: 14,
    center: [105.078796, 32.091146]
  },
  {
    description: `
    呐，还记得么，这些都是“好区域”，我们可以在它们身上建立环保工业！让我们欢呼吧！
    不对！它们似乎与“坏区域”有交叉？看来生活里没有绝对的好与坏啊，这怎么办呢......
    有了！
    `,
    visibility: {
      roadBuffer: true,
      residentialBuffer: true,
    },
    zoomLevel: 14,
    center: [105.074590, 32.089037]
  },
  {
    description: `
    我知道这看起来有点鱼龙混杂的样子，毕竟我们把好人和坏蛋们都集中起来了！忍忍吧，很快就好。
    这样做是为了找出真正的“好区域”。毕竟那些时好时坏的家伙你认为他会真的是什么好东西吗？
    因此......让我们行动起来。
    `,
    visibility: {
      riverBuffer: true,
      pondBuffer: true,
      badArea: true,
      roadBuffer: true,
      residentialBuffer: true,
    },
    zoomLevel: 14,
    center: [105.075019, 32.088164]
  },
  {
    description: `
    首先我们把“好区域”相交。对于不相交区域......很抱歉，虽然你很好，但我们不合适。
    然后对于“坏区域”，很显然不管是哪里不好都是坏区域，所以我们将它们合并。
    很好，现在我们可以很容易的把混在好区域中的坏区域剔除。只需进行擦除操作。
    `,
    visibility: { preResult: true, badArea: true },
    zoomLevel: 14,
    center: [105.080559, 32.089452]
  },
  {
    description: `
    啊哈！大功告成！我们已经看不见讨厌的坏东西了！
    最后，我们可以在这些地方建立垃圾处理点啦。
    瞧，地图上的垃圾处理点分布是不是比现有的更合理呢？
    `,
    visibility: { result: true, resultPoints: true },
    zoomLevel: 15,
    center: [105.066311, 32.079889]
  },
]