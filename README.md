# Renderer

Optimized small library for convenient work with coordinates and render loop. Renderer is written on typescipt. You can use it in any frontend framework or native js. **Aimed on creating websites animations**

<div class="center">
  <a href="https://www.npmjs.com/package/@vueform/multiselect" target="_blank">
    <img alt="npm" src="https://img.shields.io/npm/dm/@vueform/multiselect?color=%2353ca2f">
  </a>

  <a href="https://www.npmjs.com/package/@vueform/multiselect" target="_blank">
    <img alt="npm" src="https://img.shields.io/npm/v/@vueform/multiselect">
  </a>
</div


## Quick start

### Installation

#### npm

For module bundlers such as Webpack or Browserify.

```shell
npm i textura-renderer
```

	import {
		startRender,
		stopRender,
		...
	} from 'textura-renderer'

##### CDN

Recommended for learning purposes, you can use the latest version:

```html
<script src="https://cdn.jsdelivr.net/npm/textura-renderer/dist/index.js"></script>
```

All methods are available on the object "Renderer":


	<script type="text/javascript">
		Renderer.startRender()
		Renderer.stopRender()
		...
	</script>

## Docs

- [Installation](#installation)
- [All methods](#all-methods)
- [Core renderer methods](#core-renderer-methods)
- [Mouse methods](#mouse-methods)
- [Coordinates methods](#coordinates-methods)
- [Interpolation](#interpolation)
- [Tweening](#tweening)



#### All methods


	import {
		startRender,
		stopRender,
		setToRender,
		removeFromRender,
		getRendering,
		subscribeMouse,
		unsubscribeMouse,
		getMouseCoords,
		getMouseCoordsFromElement,
		getElementDocumentCoords,
		getElementWindowCoords,
		getScrollCoordsFromElement,
		isElementHovered,
		isElementFullyVisibleX,
		isElementFullyVisibleY,
		isElementFullyVisible,
		isElementPartableVisibleX,
		isElementPartableVisibleY,
		isElementPartableVisible,
		getInterpolated,
		Tween,
		Ease,
		lerp
	} from 'textura-renderer'


|  Methods | Props  |  Return Type  | Description |
| ------------ | ------------ | ------------ | ------------ |
|  startRender | --  |  void  |  start global render loop in app  |
|  stopRender | --  |  void  |  stop global render loop in app |
| setToRender | { label?: string / number; handler: (time: number) => {}, delay?: number } | void | add handler to global render loop |
| removeFromRender | label?: string / number | void | remove handler from global render loop |
| getRendering | --  | [] | return array of handlers in rendering  |
|  subscribeMouse | --  |  void  |  start saving mouse position  |
|  unsubscribeMouse | --  |  void  |  stop saving mouse position  |
|  getMouseCoords | domElement: HTMLElement  |  { document: { x: number / null, y: number / null }, window: { x: number / null, y: number / null } }  |  return mouse coords relatively document and window   |
| getMouseCoordsFromElement  |  domElement: HTMLElement | { top: { left: { x, y }, right: { x, y } }, center: { center: { x, y } }, bottom: { left: { x, y }, right: { x, y } } }   |  return mouse coords relatively dom element  |
|  isElementHovered | domElement: HTMLElement, additionalRadius: number  |  boolean  |  return is element hovered  |
|  getElementDocumentCoords | domElement: HTMLElement  |  {}  |  return element coords relativity document  |
|  getElementWindowCoords | domElement: HTMLElement  |  {}   | return element coords relativity window (can be negative)   |
|  getScrollCoordsFromElement | domElement: HTMLElement  |  {}  |  return scroll coords relativity dom element (can be negative)  |
|  isElementFullyVisibleX | domElement: HTMLElement  |  boolean  |  return is element fully visible on x axe  |
|  isElementFullyVisibleY | domElement: HTMLElement  |  boolean  |  return is element fully visible on y axe  |
|  isElementFullyVisible | domElement: HTMLElement  |  boolean  |  return is element fully visible (true if fully visible on x and y axes)  |
|  isElementPartableVisibleX | domElement: HTMLElement  | boolean   | return is element partable visible on x axe   |
|  isElementPartableVisibleY | domElement: HTMLElement  |  boolean  | return is element partable visible on y axe   |
|  isElementPartableVisible | domElement: HTMLElement  |   boolean |  return is element partable visible (true if partable visible on x or y axes)   |
|  getInterpolated | config: { timeline: timelineType, interface: InterfaceType }, time: number  |  { [key] : { [innerKey]: number }, ... }  |  return object of keys which contains keys with number values in current time. **this version uses only piecewise function for interpolation**  |
| Tween.to |  {}: TweenPropsType |  void  | -- |
| Ease.Line | time: number  |  number  | Bezier Linear |
| Ease.In | time: number  |  number  | Bezier In |
| Ease.InCubic | t:ime number  |  number  | Bezier In (pow 3) |
| Ease.InQuartic |  t:ime number  |  number  | Bezier In (pow 4) |
| Ease.InQuintic | time: number  |  number  | Bezier In (pow 5) |
| Ease.InCustom | time: number, strength?: number  |  number  | Bezier In |
| Ease.Out | time: number  |  number  | Bezier Out |
| Ease.OutCubic | time: number  |  number  | Bezier Out (pow 3) |
| Ease.OutQuartic |  time: number  |  number  | Bezier Out (pow 4) |
| Ease.OutQuintic | time: number  |  number  | Bezier Out (pow 5) |
| Ease.OutCustom | time: number, strength?: number  |  number  | Bezier Out |
| Ease.InOut | time: number  |  number  | Bezier InOut |
| Ease.InOutCubic | time: number  |  number  | Bezier InOut (pow 3) |
| Ease.InOutQuartic |  time: number  |  number  | Bezier InOut (pow 4) |
| Ease.InOutQuintic | time: number  |  number  | Bezier InOut (pow 5) |
| Ease.InOutCustom | time: number, strengthIn?: number, strengthOut?: number  |  number  | Bezier InOut |
| lerp |  start: number, end: number, t?: number |  number  | -- |

___

#### Core renderer methods
Add "startRender()" at the top level of the app to use renderer. Then to add code to render loop use "setToRender()" where you want

##### Example
    //App.tsx
    useEffect(() => {
    	startRender()
    	return () => stopRender()
    }, [])
    
    
    // component.tsx
    useEffect(() => {
    	const label = 'myCustomAnimation'
    	setToRender({
    		label,
    		handler: ( time: number ) => { /* your code */ },
    		delay: 10 //ms
    	})
    	return () => removeFromRender( label )
    }, [])


|  Methods | Props  |  Return Type  | Description |
| ------------ | ------------ | ------------ | ------------ |
|  startRender | --  |  void  |  start global render loop in app  |
|  stopRender | --  |  void  |  stop global render loop in app |
| setToRender | { label?: string / number; handler: (time: number) => {}, delay?: number } | void | add handler to global render loop |
| removeFromRender | label?: string / number | void | remove handler from global render loop |
| getRendering | --  | [] | return array of handlers in rendering  |

___

#### Mouse methods
Add "subscribeMouse()" at the top level of the app to use mouse methods.

##### Example using with renderer
    //App.tsx
    useEffect(() => {
    	subscribeMouse()
		startRender()
    	return () => { 
			unsubscribeMouse() 
			stopRender()
		}
    }, [])
    
    
    // component.tsx
	function myAnimation() {
		if ( !myRef.current ) { return }
		const isHovered: boolean = isElementHovered(myRef.current)
		if ( isHovered ) {
			console.log( 'Hovered!' )
		}
	}
	useEffect(() => {
    	const label = 'myCustomAnimation'
    	setToRender({
    		label,
    		handler: ( time: number ) => myAnimation(),
    		delay: 10 //ms
    	})
    	return () => removeFromRender( label )
    }, [])
	
|  Methods | Props  |  Return Type  | Description |
| ------------ | ------------ | ------------ | ------------ |
|  subscribeMouse | --  |  void  |  start saving mouse position  |
|  unsubscribeMouse | --  |  void  |  stop saving mouse position  |
|  getMouseCoords | domElement: HTMLElement  |  { document: { x: number / null, y: number / null }, window: { x: number / null, y: number / null } }  |  return mouse coords relatively document and window   |
| getMouseCoordsFromElement  |  domElement: HTMLElement | { top: { left: { x, y }, right: { x, y } }, center: { center: { x, y } }, bottom: { left: { x, y }, right: { x, y } } }   |  return mouse coords relatively dom element  |
|  isElementHovered | domElement: HTMLElement, additionalRadius: number  |  boolean  |  return is element hovered  |

___

#### Coordinates methods
Convinient functions for dom elements coords. Use this methods anywhere.

##### Example
    const isVisible = isElementPartableVisibleY(myRef.current)

|  Methods | Props  |  Return Type  | Description |
| ------------ | ------------ | ------------ | ------------ |
|  getElementDocumentCoords | domElement: HTMLElement  |  {}  |  return element coords relativity document  |
|  getElementWindowCoords | domElement: HTMLElement  |  {}   | return element coords relativity window (can be negative)   |
|  getScrollCoordsFromElement | domElement: HTMLElement  |  {}  |  return scroll coords relativity dom element (can be negative)  |
|  isElementFullyVisibleX | domElement: HTMLElement  |  boolean  |  return is element fully visible on x axe  |
|  isElementFullyVisibleY | domElement: HTMLElement  |  boolean  |  return is element fully visible on y axe  |
|  isElementFullyVisible | domElement: HTMLElement  |  boolean  |  return is element fully visible (true if fully visible on x and y axes)  |
|  isElementPartableVisibleX | domElement: HTMLElement  | boolean   | return is element partable visible on x axe   |
|  isElementPartableVisibleY | domElement: HTMLElement  |  boolean  | return is element partable visible on y axe   |
|  isElementPartableVisible | domElement: HTMLElement  |   boolean |  return is element partable visible (true if partable visible on x or y axes)   |

___

#### Interpolation
Use "getInterpolated(config, time)" to create frameByFrame animation. For example on scroll. Or animate any looped object in render loop. U able to scroll video, transform any html content and so on

##### Example
    const Timeline = ( scrollContainer ) => {
		const dist = scrollContainer.getBoundingClientRect().height
	
		const START = 0
		const MIDDLE = dist / 2
		const END = dist
	
		const timelineInterface: {
			header: {
				opacity: 0,
				translateY: 0,
				$TIME: [ START, MIDDLE, END ]
			},
			svg: {
				rotate: 0,
				$TIME: [ MIDDLE, END ]
			}
		}
		
		const timeline = [
			{
				$TIME: START,
				header: {
					opacity: 0,
					translateY: 0
				}
			},
			{
				$TIME: MIDDLE,
				header: {
					opacity: 1,
					translateY: 100
				},
				svg: {
					rotate: 30
				}
			},
			{
				$TIME: END,
				header: {
					opacity: .5,
					translateY: -50
				},
				svg: {
					rotate: -180
				}
			}
		]
	}
	
	useEffect(() => {
    	const label = 'myScrollAnimation'
    	setToRender({
    		label,
    		handler: ( time ) => {
				if (!scrollContainer.current || !header.current || !svg.current) { return }
				const config = Timeline( scrollContainer.current )
				const t = getInterpolated( config, window.scrollY )
				header.current.style.cssText = `
					opacity: ${t.header.opacity};
					transform: translateY(t.header.translateY);
				`
				svg.current.style.cssText = `
					transform: rotate(t.svg.rotate);
				`
			},
    	})
    	return () => removeFromRender( label )
    }, [])

|  Methods | Props  |  Return Type  | Description |
| ------------ | ------------ | ------------ | ------------ |
|  getInterpolated | config: { timeline: timelineType, interface: InterfaceType }, time: number  |  { [key] : { [innerKey]: number }, ... }  |  return object of keys which contains keys with number values in current time. **this version uses only piecwise function for interpolation**  |

___

#### Tweening
Light tween and easing functions for interpolating between two values.

	TweenPropsType = {
		from: number / {}, 
		to: number / {}, 
		{ 
			duration?: number, 
			renderDelay?: number, 
			delay?: number, 
			onChange?: Function, 	
			onComplete?: Functions 
			ease?: Function //Ease.InOut by default
		}
	}

| Methods | Props  |  Return Type  | Description |
| ------------ | ------------ | ------------ | ------------ |
| Tween.to |  {}: TweenPropsType |  void  | -- |
| Ease.Line | time: number  |  number  | Bezier Linear |
| Ease.In | time: number  |  number  | Bezier In |
| Ease.InCubic | t:ime number  |  number  | Bezier In (pow 3) |
| Ease.InQuartic |  t:ime number  |  number  | Bezier In (pow 4) |
| Ease.InQuintic | time: number  |  number  | Bezier In (pow 5) |
| Ease.InCustom | time: number, strength?: number  |  number  | Bezier In |
| Ease.Out | time: number  |  number  | Bezier Out |
| Ease.OutCubic | time: number  |  number  | Bezier Out (pow 3) |
| Ease.OutQuartic |  time: number  |  number  | Bezier Out (pow 4) |
| Ease.OutQuintic | time: number  |  number  | Bezier Out (pow 5) |
| Ease.OutCustom | time: number, strength?: number  |  number  | Bezier Out |
| Ease.InOut | time: number  |  number  | Bezier InOut |
| Ease.InOutCubic | time: number  |  number  | Bezier InOut (pow 3) |
| Ease.InOutQuartic |  time: number  |  number  | Bezier InOut (pow 4) |
| Ease.InOutQuintic | time: number  |  number  | Bezier InOut (pow 5) |
| Ease.InOutCustom | time: number, strengthIn?: number, strengthOut?: number  |  number  | Bezier InOut |

| Methods | Props  |  Return Type  | Description |
| ----------- | ------------ | ----------- | ------------ |
| lerp |  start: number, end: number, t?: number |  number  | -- |


**@author: denkravchu@gmail.com**
