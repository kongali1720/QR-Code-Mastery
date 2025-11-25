import qrcode


target = "https://example.com"
qr = qrcode.make(target)
qr.save("safe-qr.png")
print("QR code generated safely.")
