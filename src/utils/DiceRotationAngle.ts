// this utility function, sets Dice Rotation angle

export async function getDiceRotationAngle(
  face: number
): Promise<{ x: number; y: number; z: number }> {
  return new Promise((resolve) => {
    switch (face) {
      case 1:
        resolve({ x: 0, y: -Math.PI / 2, z: 0 }) // Face 1
        break
      case 2:
        resolve({ x: Math.PI / 2, y: 0, z: 0 }) // Face 2
        break
      case 3:
        resolve({ x: 0, y: Math.PI / 2, z: 0 }) // Face 3
        break
      case 4:
        resolve({ x: -Math.PI / 2, y: 0, z: 0 }) // Face 4
        break
      case 5:
        resolve({ x: Math.PI, y: 0, z: 0 }) // Face 5
        break
      case 6:
        resolve({ x: 0, y: 0, z: 0 }) // Face 6
        break
      default:
        resolve({ x: 0, y: 0, z: 0 }) // Default case if face is out of range
    }
  })
}
