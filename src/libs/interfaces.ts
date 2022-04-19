export type MovingInterface = {
    type: 'moveStart',
    data: {col: number, row: number, mousePosX: number, mousePosY: number}
  } | {
    type: 'moving',
    data: {mousePosX: number, mousePosY: number}
  } | {
    type: 'moveEnd',
    data: {mousePageX: number, mousePageY: number}
  }