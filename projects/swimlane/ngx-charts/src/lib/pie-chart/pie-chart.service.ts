import { Injectable } from '@angular/core';

@Injectable()
export class PieChartService {
  centroidCoords = [];
  idxSelectedObject = 0;
  idxCoords = 0;
  innerRadius = 0
  outerRadius = 0

  newCoords(newCoords) {
    if (!this.centroidCoords.some(coord => coord.x === newCoords.x && coord.y === newCoords.y)) {
      this.centroidCoords.push(newCoords);
    }
    this.idxCoords = this.getIdxCoords(newCoords)
  }

  clearCoords() {
    this.centroidCoords = [];
  }

  getIdxCoords(coords){
    return this.centroidCoords.findIndex(d => {
      return d.x === coords.x && d.y === coords.y
    });
  }

  setSelectedObject(objectSelected) {
    this.idxSelectedObject = objectSelected;
  }

  setRadius(outerRadius, innerRadius){
    this.innerRadius = innerRadius
    this.outerRadius = outerRadius
  }
  
  get radius() : any {
    return { innerRadius: this.innerRadius, outerRadius: this.outerRadius }
  }

  get idxSelected() : number {
    return this.idxSelectedObject
  }

  get actuallyCentroidCoords(): {x: number, y: number} {
    return this.centroidCoords[this.idxCoords]
  }
  
}