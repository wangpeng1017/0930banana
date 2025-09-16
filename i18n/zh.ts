export default {
  app: {
    title: "🍌 香蕉超市｜ZHO",
    history: "历史记录",
    chooseAnotherEffect: "选择其他效果",
    generateImage: "生成图像",
    generating: "生成中...",
    result: "结果",
    yourImageWillAppear: "您生成的图像将显示在这里。",
    error: {
      uploadAndSelect: "请上传图像并选择一个效果。",
      uploadBoth: "请上传两个所需的图像。",
      enterPrompt: "请输入一个描述您想看到的更改的提示。",
      unknown: "发生未知错误。",
      useAsInputFailed: "无法使用生成的图像作为新输入。",
    },
    loading: {
        step1: "第1步：创建线稿...",
        step2: "第2步：应用调色板...",
        default: "正在生成您的杰作...",
        wait: "这有时可能需要一些时间。",
    },
    theme: {
        switchToLight: "切换到浅色主题",
        switchToDark: "切换到深色主题"
    }
  },
  transformationSelector: {
    title: "开始“蕉”虑吧！",
    description: "准备好重塑你的现实了吗？选择一个效果开始施展魔法。你也可以拖放来重新排序你最喜欢的效果。",
    descriptionWithResult: "真有趣！你上一个创作已经准备好进行下一轮了。选择一个新的效果来继续这个创作链吧。"
  },
  imageEditor: {
    upload: "点击上传",
    dragAndDrop: "或拖放文件",
    drawMask: "绘制蒙版",
    maskPanelInfo: "在图像上绘制以创建用于局部编辑的蒙版。",
    brushSize: "笔刷大小",
    undo: "撤销",
    clearMask: "清除蒙版"
  },
  resultDisplay: {
    viewModes: {
      result: "结果",
      grid: "网格",
      slider: "滑块",
      sideBySide: "并排"
    },
    labels: {
      original: "原图",
      generated: "生成图",
      lineArt: "线稿",
      finalResult: "最终结果"
    },
    actions: {
      download: "下载",
      downloadBoth: "下载全部",
      downloadComparison: "下载对比图",
      useAsInput: "用作输入",
      useLineArtAsInput: "使用线稿作为输入",
      useFinalAsInput: "使用最终结果作为输入"
    },
    sliderPicker: {
      vs: "对"
    }
  },
  history: {
    title: "生成历史",
    empty: "一旦您创造了某些东西，您生成的图像就会出现在这里。",
    use: "使用",
    save: "保存",
    lineArt: "线稿",
    finalResult: "最终结果"
  },
  error: {
    title: "发生错误"
  },
  transformations: {
    customPrompt: { title: "自定义提示", description: "描述你能想象到的任何变化。你的创造力是唯一的限制！" },
    figurine: { title: "3D手办", description: "将您的照片变成一个可收藏的3D角色手办，并配有包装。" },
    funko: { title: "Funko Pop公仔", description: "将您的主题重塑为一个可爱的Funko Pop！乙烯基公仔，放在盒子里。" },
    lego: { title: "乐高小人仔", description: "构建一个乐高小人仔版本的您的主题，准备好玩耍。" },
    crochet: { title: "钩针娃娃", description: "将您的图像变成一个柔软的手工钩针娃娃。" },
    cosplay: { title: "动漫转Cosplay", description: "将动漫角色变为一张逼真的Cosplay照片。" },
    plushie: { title: "可爱毛绒玩具", description: "将您的主题转换成一个可爱的、柔软的毛绒玩具。" },
    keychain: { title: "亚克力钥匙扣", description: "创建一个您的主题的可爱亚克力钥匙扣，非常适合挂在包上。" },
    hdEnhance: { title: "高清增强", description: "放大您的图像，增加清晰度、细节，以获得高分辨率外观。" },
    pose: { title: "姿势参考", description: "将一张图像中的姿势应用到另一张图像中的角色上。", uploader1Title: "角色", uploader1Desc: "主要角色", uploader2Title: "姿势参考", uploader2Desc: "要应用的姿势" },
    photorealistic: { title: "转为照片级真实", description: "将绘画或插图转换为惊人逼真的照片。" },
    fashion: { title: "时尚杂志", description: "为您的照片赋予高级时尚、编辑风格的外观，堪比杂志封面。" },
    hyperrealistic: { title: "超写实", description: "应用一种粗粝、直闪的摄影风格，打造酷炫的超写实氛围。" },
    architecture: { title: "建筑模型", description: "将建筑物转变为精细的微缩建筑模型。" },
    productRender: { title: "产品渲染", description: "将产品草图变成专业的、照片级的3D渲染图。" },
    sodaCan: { title: "汽水罐设计", description: "将您的图像包装到汽水罐上，并将其放置在精美的产品照片中。" },
    industrialDesign: { title: "工业设计渲染", description: "将工业设计草图渲染成在博物馆环境中展示的真实产品。" },
    colorPalette: { title: "色板换色", description: "将图像转换为线稿，然后使用第二张图像作为调色板为其上色。", uploader1Title: "原始图像", uploader1Desc: "要转换的图像", uploader2Title: "调色板", uploader2Desc: "颜色参考" },
    lineArt: { title: "线稿绘画", description: "将您的照片简化为其基本线条，创建一个干净的草图。" },
    paintingProcess: { title: "绘画过程", description: "展示一个4步网格，展示您的图像从草图到最终绘画的创作过程。" },
    markerSketch: { title: "马克笔素描", description: "用Copic马克笔的风格重塑您的照片，创造出充满活力的素描。" },
    addIllustration: { title: "添加插画", description: "在您的真实世界照片中添加迷人的手绘角色。" },
    cyberpunk: { title: "赛博朋克", description: "将您的场景转变为一个充满霓虹灯的未来赛博朋克城市。" },
    vanGogh: { title: "梵高风格", description: "用梵高《星夜》标志性的、旋转的笔触重绘您的照片。" },
    isolate: { title: "分离并增强", description: "剪出蒙版中的主体，并创建一个干净、高清的肖像。" },
    screen3d: { title: "3D屏幕效果", description: "使您照片中屏幕上的内容呈现出裸眼3D效果，仿佛要跳出屏幕。" },
    makeup: { title: "妆容分析", description: "分析肖像中的妆容，并用红笔标记提出改进建议。" },
    background: { title: "更换背景", description: "将现有背景更换为酷炫的复古Y2K美学风格。" },
  }
};