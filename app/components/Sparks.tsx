'use client'
import { useEffect } from 'react'

declare const particlejs: any, createjs: any
declare global {
  interface Window {
    createjs: any
    particlejs: any
  }
}

export default () => {
  useEffect(() => {
    const stage = new window.createjs.Stage('myCanvas')
    const particleSystem = new window.particlejs.ParticleSystem()
    stage.addChild(particleSystem.container)
    particleSystem.importFromJson({
      bgColor: 'transparent',
      width: 1920,
      height: 1080,
      emitFrequency: 7,
      startX: 960,
      startXVariance: 1920,
      startY: 1100,
      startYVariance: 0,
      initialDirection: 270,
      initialDirectionVariance: 116,
      initialSpeed: 0.1,
      initialSpeedVariance: 1.7,
      friction: 0,
      accelerationSpeed: 0.015,
      accelerationDirection: 265,
      startScale: 0.3,
      startScaleVariance: 0.2,
      finishScale: '0.03',
      finishScaleVariance: '0',
      lifeSpan: 414,
      lifeSpanVariance: 89,
      startAlpha: 1,
      startAlphaVariance: 0,
      finishAlpha: 0.85,
      finishAlphaVariance: '0',
      shapeIdList: ['blur_circle'],
      startColor: {
        hue: 300,
        hueVariance: 9,
        saturation: 100,
        saturationVariance: 0,
        luminance: 65,
        luminanceVariance: 0,
      },
      blendMode: true,
      alphaCurveType: '1',
      VERSION: '1.0.0',
    })
    createjs.Ticker.framerate = 60
    createjs.Ticker.timingMode = createjs.Ticker.RAF
    createjs.Ticker.addEventListener('tick', handleTick)
    function handleTick() {
      particleSystem.update()
      stage.update()
    }
  }, [])
  return (
    <>
      <canvas
        width="1920"
        height="1080"
        id="myCanvas"
        className="fixed bottom-0 left-1/2 transform -translate-x-1/2 z-0"
      ></canvas>
    </>
  )
}
