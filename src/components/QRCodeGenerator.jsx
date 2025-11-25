import { useEffect, useRef } from 'react'
import QRCode from 'qrcode'

const QRCodeGenerator = ({ value, size = 100 }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!value) return
    QRCode.toCanvas(canvasRef.current, value, {
      width: size,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#ffffff'
      }
    }, (error) => {
      if (error) console.error('QR code generation failed:', error)
    })
  }, [value, size])

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      style={{ border: '1px solid #ccc', borderRadius: '8px' }}
    />
  )
}

export default QRCodeGenerator
