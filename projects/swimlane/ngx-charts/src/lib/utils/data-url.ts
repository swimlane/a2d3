export interface Options {
  width: number;
  height: number;
  pixelRatio?: number;
  transparentBackground?: boolean;
}

export interface StyleAble extends Element {
  style: CSSStyleDeclaration;
}

function isType<T>(obj: unknown, test: (...args: any[]) => boolean): obj is T {
  return test(obj);
}

export function cloneNodeWithStyle<T extends Element>(originNode: T): T {
  const clonedNode = originNode.cloneNode(false) as T;

  if (isType<StyleAble>(clonedNode, e => e?.style)) {
    const computedStyle = window.getComputedStyle(originNode);
    const styleText = Array.from(computedStyle)
      .map(e => `${e}:${computedStyle.getPropertyValue(e)}`)
      .join(';');
    clonedNode.style.cssText = styleText;
  }

  if (!(originNode instanceof Element)) return clonedNode;
  const children = Array.from(originNode.childNodes).map(cloneNodeWithStyle);
  clonedNode.append(...children.filter(e => !!e));
  return clonedNode;
}

export function svgToDataURL(svg: SVGElement): Promise<string> {
  return Promise.resolve(new XMLSerializer().serializeToString(svg))
    .then(encodeURIComponent)
    .then(html => `data:image/svg+xml;charset=utf-8,${html}`);
}

export function nodeToDataURL(node: Element, options: Options): Promise<string> {
  const { width, height } = options;
  const xmlns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(xmlns, 'svg');
  const foreignObject = document.createElementNS(xmlns, 'foreignObject');

  svg.setAttribute('width', `${width}`);
  svg.setAttribute('height', `${height}`);
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

  foreignObject.setAttribute('width', '100%');
  foreignObject.setAttribute('height', '100%');
  foreignObject.setAttribute('x', '0');
  foreignObject.setAttribute('y', '0');
  foreignObject.setAttribute('externalResourcesRequired', 'true');

  svg.appendChild(foreignObject);
  foreignObject.appendChild(node);
  return svgToDataURL(svg);
}

export async function toSvg<T extends HTMLElement>(node: T, options: Options): Promise<string> {
  return nodeToDataURL(cloneNodeWithStyle(node), options);
}

export async function toPng<T extends HTMLElement>(node: T, options: Options): Promise<string> {
  const canvas = await toCanvas(node, options);
  return canvas.toDataURL();
}

export async function toJpeg<T extends HTMLElement>(node: T, options: Options): Promise<string> {
  const canvas = await toCanvas(node, options);
  return canvas.toDataURL('image/jpeg');
}

export function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.crossOrigin = 'anonymous';
    img.decoding = 'async';
    img.src = url;
    img.decode().then(() => resolve(img));
  });
}

export async function toCanvas<T extends HTMLElement>(node: T, options: Options): Promise<HTMLCanvasElement> {
  const svg = await toSvg(node, options);
  const img = await createImage(svg);

  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d')!;
  const ratio = options.pixelRatio || window.devicePixelRatio;
  const canvasWidth = options.width;
  const canvasHeight = options.height;

  canvas.width = canvasWidth * ratio;
  canvas.height = canvasHeight * ratio;

  canvas.style.width = `${canvasWidth}`;
  canvas.style.height = `${canvasHeight}`;

  if (!options.transparentBackground) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = '#fff';
    context.fillRect(0, 0, canvas.width, canvas.height);
  }

  context.drawImage(img, 0, 0, canvas.width, canvas.height);

  return canvas;
}
