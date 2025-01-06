import { PieChartService } from '@swimlane/ngx-charts/pie-chart/pie-chart.service';
import { PlacementTypes } from './placement-type.enum';

const caretOffset = 7;

function verticalPosition(elDimensions: DOMRect, popoverDimensions: DOMRect, alignment: PlacementTypes): number {
  if (alignment === PlacementTypes.Top) {
    return elDimensions.top - caretOffset;
  }

  if (alignment === PlacementTypes.Bottom) {
    return elDimensions.top + elDimensions.height - popoverDimensions.height + caretOffset;
  }

  if (alignment === PlacementTypes.Center) {
    return elDimensions.top + elDimensions.height / 2 - popoverDimensions.height / 2;
  }

  return undefined;
}

function horizontalPosition(elDimensions: DOMRect, popoverDimensions: DOMRect, alignment: PlacementTypes): number {
  if (alignment === PlacementTypes.Left) {
    return elDimensions.left - caretOffset;
  }

  if (alignment === PlacementTypes.Right) {
    return elDimensions.left + elDimensions.width - popoverDimensions.width + caretOffset;
  }

  if (alignment === PlacementTypes.Center) {
    return elDimensions.left + elDimensions.width / 2 - popoverDimensions.width / 2;
  }

  return undefined;
}

/**
 * Position helper for the popover directive.
 *
 * @export
 */
export class PositionHelper {
  /**
   * Calculate vertical alignment position
   *
   * @memberOf PositionHelper
   */
  static calculateVerticalAlignment(
    elDimensions: DOMRect,
    popoverDimensions: DOMRect,
    alignment: PlacementTypes
  ): number {
    let result = verticalPosition(elDimensions, popoverDimensions, alignment);

    if (result + popoverDimensions.height > window.innerHeight) {
      result = window.innerHeight - popoverDimensions.height;
    }

    return result;
  }

  /**
   * Calculate vertical caret position
   *
   * @memberOf PositionHelper
   */
  static calculateVerticalCaret(
    elDimensions: DOMRect,
    popoverDimensions: DOMRect,
    caretDimensions: DOMRect,
    alignment: PlacementTypes
  ): number {
    let result;

    if (alignment === PlacementTypes.Top) {
      result = elDimensions.height / 2 - caretDimensions.height / 2 + caretOffset;
    }

    if (alignment === PlacementTypes.Bottom) {
      result = popoverDimensions.height - elDimensions.height / 2 - caretDimensions.height / 2 - caretOffset;
    }

    if (alignment === PlacementTypes.Center) {
      result = popoverDimensions.height / 2 - caretDimensions.height / 2;
    }

    const popoverPosition = verticalPosition(elDimensions, popoverDimensions, alignment);
    if (popoverPosition + popoverDimensions.height > window.innerHeight) {
      result += popoverPosition + popoverDimensions.height - window.innerHeight;
    }

    return result;
  }

  /**
   * Calculate horz alignment position
   *
   * @memberOf PositionHelper
   */
  static calculateHorizontalAlignment(
    elDimensions: DOMRect,
    popoverDimensions: DOMRect,
    alignment: PlacementTypes
  ): number {
    let result = horizontalPosition(elDimensions, popoverDimensions, alignment);

    if (result + popoverDimensions.width > window.innerWidth) {
      result = window.innerWidth - popoverDimensions.width;
    }

    return result;
  }

  /**
   * Calculate horz caret position
   *
   * @memberOf PositionHelper
   */
  static calculateHorizontalCaret(
    elDimensions: DOMRect,
    popoverDimensions: DOMRect,
    caretDimensions: DOMRect,
    alignment: PlacementTypes
  ): number {
    let result;

    if (alignment === PlacementTypes.Left) {
      result = elDimensions.width / 2 - caretDimensions.width / 2 + caretOffset;
    }

    if (alignment === PlacementTypes.Right) {
      result = popoverDimensions.width - elDimensions.width / 2 - caretDimensions.width / 2 - caretOffset;
    }

    if (alignment === PlacementTypes.Center) {
      result = popoverDimensions.width / 2 - caretDimensions.width / 2;
    }

    const popoverPosition = horizontalPosition(elDimensions, popoverDimensions, alignment);
    if (popoverPosition + popoverDimensions.width > window.innerWidth) {
      result += popoverPosition + popoverDimensions.width - window.innerWidth;
    }

    return result;
  }

  /**
   * Checks if the element's position should be flipped
   *
   * @memberOf PositionHelper
   */
  static shouldFlip(
    elDimensions: DOMRect,
    popoverDimensions: DOMRect,
    placement: PlacementTypes,
    spacing: number
  ): boolean {
    let flip = false;

    if (placement === PlacementTypes.Right) {
      if (elDimensions.left + elDimensions.width + popoverDimensions.width + spacing > window.innerWidth) {
        flip = true;
      }
    }

    if (placement === PlacementTypes.Left) {
      if (elDimensions.left - popoverDimensions.width - spacing < 0) {
        flip = true;
      }
    }

    if (placement === PlacementTypes.Top) {
      if (elDimensions.top - popoverDimensions.height - spacing < 0) {
        flip = true;
      }
    }

    if (placement === PlacementTypes.Bottom) {
      if (elDimensions.top + elDimensions.height + popoverDimensions.height + spacing > window.innerHeight) {
        flip = true;
      }
    }

    return flip;
  }

  /**
   * Position caret
   *
   * @memberOf PositionHelper
   */
  static positionCaret(placement, elmDim, hostDim, caretDimensions, alignment: PlacementTypes): any {
    let top = 0;
    let left = 0;

    if (placement === PlacementTypes.Right) {
      left = -7;
      top = PositionHelper.calculateVerticalCaret(hostDim, elmDim, caretDimensions, alignment);
    } else if (placement === PlacementTypes.Left) {
      left = elmDim.width;
      top = PositionHelper.calculateVerticalCaret(hostDim, elmDim, caretDimensions, alignment);
    } else if (placement === PlacementTypes.Top) {
      top = elmDim.height;
      left = PositionHelper.calculateHorizontalCaret(hostDim, elmDim, caretDimensions, alignment);
    } else if (placement === PlacementTypes.Bottom) {
      top = -7;
      left = PositionHelper.calculateHorizontalCaret(hostDim, elmDim, caretDimensions, alignment);
    }

    return { top, left };
  }

 /**
   * Position content
   *
   * @memberOf PositionHelper
   */
  static positionContent(placement, elmDim, hostDim, spacing, alignment, pieChartDoughnout?, pieChartSvc?: PieChartService): any {
    let top = 0;
    let left = 0;
    if (placement === PlacementTypes.Right) {
      //TODO: Implement positioning adjustment
      if (pieChartDoughnout) {
        top = PositionHelper.calculateTopPosition(hostDim, pieChartSvc.radius.outerRadius, pieChartSvc.radius.innerRadius, spacing) + pieChartSvc.actuallyCentroidCoords.y - spacing * 2
        left = PositionHelper.calculateHorizontalAlignment(hostDim, elmDim, alignment) + pieChartSvc.actuallyCentroidCoords.x
      } else {
        left = hostDim.left + hostDim.width + spacing;
        top = PositionHelper.calculateVerticalAlignment(hostDim, elmDim, alignment);
      }
    } else if (placement === PlacementTypes.Left) {
      //TODO: Implement positioning adjustment
      if (pieChartDoughnout) {
        top = PositionHelper.calculateTopPosition(hostDim, pieChartSvc.radius.outerRadius, pieChartSvc.radius.innerRadius, spacing) + pieChartSvc.actuallyCentroidCoords.y - spacing * 2
        left = PositionHelper.calculateHorizontalAlignment(hostDim, elmDim, alignment) + pieChartSvc.actuallyCentroidCoords.x
      } else {
        left = hostDim.left - elmDim.width - spacing;
        top = PositionHelper.calculateVerticalAlignment(hostDim, elmDim, alignment);
      }
    } else if (placement === PlacementTypes.Top) {
      if (pieChartDoughnout) {
        const OFFSET_TOP = 20
        top = PositionHelper.calculateTopPosition(hostDim, pieChartSvc.radius.outerRadius, pieChartSvc.radius.innerRadius, spacing) + pieChartSvc.actuallyCentroidCoords.y - OFFSET_TOP
        left = PositionHelper.calculateHorizontalAlignment(hostDim, elmDim, alignment) + pieChartSvc.actuallyCentroidCoords.x
      } else {
        top = hostDim.top - elmDim.height - spacing;
        left = PositionHelper.calculateHorizontalAlignment(hostDim, elmDim, alignment);
      }
    } else if (placement === PlacementTypes.Bottom) {
      if (pieChartDoughnout) {
        const OFFSET_TOP = 40
        top = PositionHelper.calculateTopPosition(hostDim, pieChartSvc.radius.outerRadius, pieChartSvc.radius.innerRadius, spacing) + pieChartSvc.actuallyCentroidCoords.y + OFFSET_TOP
        left = PositionHelper.calculateHorizontalAlignment(hostDim, elmDim, alignment) + pieChartSvc.actuallyCentroidCoords.x
      } else {
        top = hostDim.top + hostDim.height + spacing;
        left = PositionHelper.calculateHorizontalAlignment(hostDim, elmDim, alignment);
      }
    }

    return { top, left };
  }

  /**
   * Determine placement based on flip
   *
   * @memberOf PositionHelper
   */
  static determinePlacement(placement: PlacementTypes, elmDim: DOMRect, hostDim: DOMRect, spacing: number): any {
    const shouldFlip = PositionHelper.shouldFlip(hostDim, elmDim, placement, spacing);

    if (shouldFlip) {
      if (placement === PlacementTypes.Right) {
        return PlacementTypes.Left;
      } else if (placement === PlacementTypes.Left) {
        return PlacementTypes.Right;
      } else if (placement === PlacementTypes.Top) {
        return PlacementTypes.Bottom;
      } else if (placement === PlacementTypes.Bottom) {
        return PlacementTypes.Top;
      }
    }

    return placement;
  }

  static calculateTopPosition(hostDim: DOMRect, outerRadius, innerRadius, spacing): number {
    return innerRadius <= 0  ?  hostDim.top + hostDim.height/2 - 47 : hostDim.top + hostDim.height/2 - (outerRadius - innerRadius) - spacing
  }
}
