

import type { Transformation } from './types';

export const TRANSFORMATIONS: Transformation[] = [
  // Viral & Fun Transformations
  { 
    key: "customPrompt",
    titleKey: "transformations.customPrompt.title", 
    prompt: "CUSTOM", 
    emoji: "✍️",
    descriptionKey: "transformations.customPrompt.description"
  },
  { 
    key: "figurine",
    titleKey: "transformations.figurine.title", 
    prompt: "turn this photo into a character figure. Behind it, place a box with the character’s image printed on it, and a computer showing the Blender modeling process on its screen. In front of the box, add a round plastic base with the character figure standing on it. set the scene indoors if possible", 
    emoji: "🧍",
    descriptionKey: "transformations.figurine.description"
  },
  { 
    key: "funko",
    titleKey: "transformations.funko.title", 
    prompt: "Transform the person into a Funko Pop figure, shown inside and next to its packaging.", 
    emoji: "📦",
    descriptionKey: "transformations.funko.description"
  },
  { 
    key: "lego",
    titleKey: "transformations.lego.title", 
    prompt: "Transform the person into a LEGO minifigure, inside its packaging box.", 
    emoji: "🧱",
    descriptionKey: "transformations.lego.description"
  },
  { 
    key: "crochet",
    titleKey: "transformations.crochet.title", 
    prompt: "Transform the subject into a handmade crocheted yarn doll with a cute, chibi-style appearance.", 
    emoji: "🧶",
    descriptionKey: "transformations.crochet.description"
  },
  { 
    key: "cosplay",
    titleKey: "transformations.cosplay.title", 
    prompt: "Generate a highly detailed, realistic photo of a person cosplaying the character in this illustration. Replicate the pose, expression, and framing.", 
    emoji: "🎭",
    descriptionKey: "transformations.cosplay.description"
  },
  { 
    key: "plushie",
    titleKey: "transformations.plushie.title", 
    prompt: "Turn the person in this photo into a cute, soft plushie doll.", 
    emoji: "🧸",
    descriptionKey: "transformations.plushie.description"
  },
  { 
    key: "keychain",
    titleKey: "transformations.keychain.title", 
    prompt: "Turn the subject into a cute acrylic keychain, shown attached to a bag.", 
    emoji: "🔑",
    descriptionKey: "transformations.keychain.description"
  },
  
  // Photorealistic & Enhancement
  { 
    key: "hdEnhance",
    titleKey: "transformations.hdEnhance.title", 
    prompt: "Enhance this image to high resolution, improving sharpness and clarity.", 
    emoji: "🔍",
    descriptionKey: "transformations.hdEnhance.description"
  },
  { 
    key: "pose",
    titleKey: "transformations.pose.title", 
    prompt: "Apply the pose from the second image to the character in the first image. Render as a professional studio photograph.",
    emoji: "💃",
    descriptionKey: "transformations.pose.description",
    isMultiImage: true,
    primaryUploaderTitle: "transformations.pose.uploader1Title",
    primaryUploaderDescription: "transformations.pose.uploader1Desc",
    secondaryUploaderTitle: "transformations.pose.uploader2Title",
    secondaryUploaderDescription: "transformations.pose.uploader2Desc",
  },
  { 
    key: "photorealistic",
    titleKey: "transformations.photorealistic.title", 
    prompt: "Turn this illustration into a photorealistic version.", 
    emoji: "🪄",
    descriptionKey: "transformations.photorealistic.description"
  },
  { 
    key: "fashion",
    titleKey: "transformations.fashion.title", 
    prompt: "Transform the photo into a stylized, ultra-realistic fashion magazine portrait with cinematic lighting.", 
    emoji: "📸",
    descriptionKey: "transformations.fashion.description"
  },
  { 
    key: "hyperrealistic",
    titleKey: "transformations.hyperrealistic.title", 
    prompt: "Generate a hyper-realistic, fashion-style photo with strong, direct flash lighting, grainy texture, and a cool, confident pose.", 
    emoji: "✨",
    descriptionKey: "transformations.hyperrealistic.description"
  },

  // Design & Product
  { 
    key: "architecture",
    titleKey: "transformations.architecture.title", 
    prompt: "Convert this photo of a building into a miniature architecture model, placed on a cardstock in an indoor setting. Show a computer with modeling software in the background.", 
    emoji: "🏗️",
    descriptionKey: "transformations.architecture.description"
  },
  { 
    key: "productRender",
    titleKey: "transformations.productRender.title", 
    prompt: "Turn this product sketch into a photorealistic 3D render with studio lighting.", 
    emoji: "💡",
    descriptionKey: "transformations.productRender.description"
  },
  { 
    key: "sodaCan",
    titleKey: "transformations.sodaCan.title", 
    prompt: "Design a soda can using this image as the main graphic, and show it in a professional product shot.", 
    emoji: "🥤",
    descriptionKey: "transformations.sodaCan.description"
  },
  { 
    key: "industrialDesign",
    titleKey: "transformations.industrialDesign.title", 
    prompt: "Turn this industrial design sketch into a realistic product photo, rendered with light brown leather and displayed in a minimalist museum setting.", 
    emoji: "🛋️",
    descriptionKey: "transformations.industrialDesign.description"
  },

  // Artistic & Stylistic
  { 
    key: "colorPalette",
    titleKey: "transformations.colorPalette.title",
    prompt: "Turn this image into a clean, hand-drawn line art sketch.", // Step 1 prompt
    stepTwoPrompt: "Color the line art using the colors from the second image.", // Step 2 prompt
    emoji: "🎨",
    descriptionKey: "transformations.colorPalette.description",
    isMultiImage: true,
    isTwoStep: true,
    primaryUploaderTitle: "transformations.colorPalette.uploader1Title",
    primaryUploaderDescription: "transformations.colorPalette.uploader1Desc",
    secondaryUploaderTitle: "transformations.colorPalette.uploader2Title",
    secondaryUploaderDescription: "transformations.colorPalette.uploader2Desc",
  },
  { 
    key: "lineArt",
    titleKey: "transformations.lineArt.title", 
    prompt: "Turn the image into a clean, hand-drawn line art sketch.", 
    emoji: "✍🏻",
    descriptionKey: "transformations.lineArt.description"
  },
  { 
    key: "paintingProcess",
    titleKey: "transformations.paintingProcess.title", 
    prompt: "Generate a 4-panel grid showing the artistic process of creating this image, from sketch to final render.", 
    emoji: "🖼️",
    descriptionKey: "transformations.paintingProcess.description"
  },
  { 
    key: "markerSketch",
    titleKey: "transformations.markerSketch.title", 
    prompt: "Redraw the image in the style of a Copic marker sketch, often used in design.", 
    emoji: "🖊️",
    descriptionKey: "transformations.markerSketch.description"
  },
  { 
    key: "addIllustration",
    titleKey: "transformations.addIllustration.title", 
    prompt: "Add a cute, cartoon-style illustrated couple into the real-world scene, sitting and talking.", 
    emoji: "🧑‍🎨",
    descriptionKey: "transformations.addIllustration.description"
  },
  { 
    key: "cyberpunk",
    titleKey: "transformations.cyberpunk.title", 
    prompt: "Transform the scene into a futuristic cyberpunk city.", 
    emoji: "🤖",
    descriptionKey: "transformations.cyberpunk.description"
  },
  { 
    key: "vanGogh",
    titleKey: "transformations.vanGogh.title", 
    prompt: "Reimagine the photo in the style of Van Gogh's 'Starry Night'.", 
    emoji: "🌌",
    descriptionKey: "transformations.vanGogh.description"
  },

  // Utility & Specific Edits
  { 
    key: "isolate",
    titleKey: "transformations.isolate.title", 
    prompt: "Isolate the person in the masked area and generate a high-definition photo of them against a neutral background.", 
    emoji: "🎯",
    descriptionKey: "transformations.isolate.description"
  },
  { 
    key: "screen3d",
    titleKey: "transformations.screen3d.title", 
    prompt: "For an image with a screen, add content that appears to be glasses-free 3D, popping out of the screen.", 
    emoji: "📺",
    descriptionKey: "transformations.screen3d.description"
  },
  { 
    key: "makeup",
    titleKey: "transformations.makeup.title", 
    prompt: "Analyze the makeup in this photo and suggest improvements by drawing with a red pen.", 
    emoji: "💄",
    descriptionKey: "transformations.makeup.description"
  },
  { 
    key: "background",
    titleKey: "transformations.background.title", 
    prompt: "Change the background to a Y2K aesthetic style.", 
    emoji: "🪩",
    descriptionKey: "transformations.background.description"
  },
];