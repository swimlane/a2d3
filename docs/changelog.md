# Changelog

## 21.1.2

- Fix: Percent Gauge Chart: Ensures the circle mask ID is unique for each chart

## 21.1.1

- Fix: Percent Gauge Chart: Fixes server-side-rendering
- Fix: Percent Gauge Chart: Fixes light theme
- Fix: Percent Gauge Chart: Makes target circle highlight only when target is reached

## 21.1.0

- Feature: Add Percent Gauge chart type

## 20.5.0

- Feature: Add Sankey diagram chart type

## 20.4.1

- Bump: d3-array from 2.9.1 to 3.1.1
- Bump: d3-brush from 2.1.0 to 3.0.0
- Bump: d3-ease from 2.0.0 to 3.0.1
- Bump: d3-format from 2.0.0 to 3.1.0
- Bump: d3-hierarchy from 2.0.0 to 3.1.0
- Bump: d3-interpolate from 2.0.1 to 3.0.1
- Bump: d3-scale from 3.2.3 to 4.0.2
- Bump: d3-selection from 2.0.0 to 3.0.0
- Bump: d3-shape from 2.0.0 to 3.2.0
- Bump: d3-transition from 2.0.0 to 3.0.1
- Bump: moment-timezone from 0.5.28 to 0.5.40

## 20.3.1

- Fix: In SSR mode, respect the tick length set and don't cut off the tick label.

## 20.3.0

- Feature: ability to wrap ticks based on available space.

## 20.1.2

- Bump: d3-color from 2.0.0 to 3.1.0 in library

## 20.1.1

- Bump: d3-color from 2.0.0 to 3.1.0 in demo page

## 20.1.0

- Fix: Cyclic import error caused by interface export in `PieGridComponent`.
- Fix: Remove angular animations when SSR on charts with series

## 20.0.0

- Breaking: Upgrade Angular to v13

## 19.2.0

- Fix: Change transition to CSS for Angular Universal fix

## 19.1.0

- Feature: New Chart type: Box chart

## 19.0.1

- Fix: remove remove barrel file causing issues running ngcc (#1667)

## 19.0.0

- Chore: Remove inline styles on `heat-map-cell` and `tree-map-cell`
- Bug: Fix typing issues to support enabling `strictTemplates` option
- Breaking: Upgrade Angular to v12
- Bug: Fix `ColorHelper.customColors` typing to allow for functions or objects (#1641)
- Bug: Fix gradient background hover issue (#1158)

## 18.0.1

- Bug: Use correct curve type
- Bug: include `@types/d3-shape` as a dependency in published package.

## 18.0.0

- Breaking: Improve typing
- Bug: Fix timeline selection

## 17.0.1

- Bug: Fix pie label component on SSR (#1583)
- Bug: Adjust scaleText for linear geauge and number cards on SSR (#1581)
- Bug: Disable animation on ssr and remove unnecesary call on ssr (#1579)

## 17.0.0

- Breaking: Update to angular 11
- Bug: Improve SSR capabilities by approximating axis dimensions (#1567)
- Bug: Chart Tooltip does not work on touch devices (#1213)
- Chore: Remove bypassSecurityTrustStyle call (#1561)

## 16.0.0

- Breaking: Update to angular 10
- Bug: Apply dataLabelFormatting to tooltip value in bar charts (#1419)

## 14.0.0

- Chore: explicitly only suppot ng9

## 13.0.3

- Chore: update dependecies
- Testing: update tests to not use animation

## 13.0.2

- Regression bug: Allow ViewContainerRef as the injection service root

## 13.0.1

- Bug: Fix AOT builds by removing barrel exports

## 13.0.0

- Breaking: Upgrade to Angular 9. Add compatibility with Ivy
- Breaking: Remove deprecated force-directed graph chart
- Breaking: Remove release folder
- Bug: Sanitize tooltip labels (#1241)
- Bug: Fix line chart scaling on charts with large domain (#1204)
- Chore: Remove d3 dependency
- Chore: Update all d3 packages to latest versions

## 12.1.0

- Enhancement: Sanitize tooltip labels (#1241)
- Bug: fix line chart scaling on charts with large domain (#1204)
- Bug: add check for undefined xScale in groupTransform (#1273)

## 12.0.1

- Bug: Pass the correct number of parameters to fix production build (#1203)

## 12.0.0

- Breaking: Upgrade to angular 8.0.0 (#1201)
- Breaking: Rework mouse events to make the format more consistent (#1185)
- Feature: Allow passing extra data to the data items and include it in click and activate events (#1185)

## 11.2.0

- Feature: Made margins for pie chart component optional (#759)
- Feature: Added option to gauge to show or hide inner text (#1175)
- Feature: Added `noBarWhenZero` input to all bar related (#1086)
- Bug: Updated Color.Helper.ts to handle null values (#1167)
- Bug: Added missing export (#1193)
- Bug: Fixed chart height with large number of yAxisTicks (#1105)
- Chore: Bumped extract-text-plugin to version 3.0.2 (#861)
- Chore: Updated zone.js version to 0.9.1 (#1187)
- Docs: Deprecated force-directed graph chart (#1159)
- Docs: Fixed link typo in motivation.md (#1172)
- Docs: Added interactive bubble chart to demo (#1174)

## 11.1.0

- Feature: added option to disable x axis tick rotation (#1139)
- Bug: Update peer dependency requirements

## 11.0.1

- Bug: Fixes displaying of tooltip on IE 11 (#1157)

## 11.0.0

- Breaking: Remove Angular location strategy from ChartCommonModule (#915)
  - Any Angular applications, that rely on the pre-configured location strategy provided by ngx-charts, will need to set it separately
- Feature: Allow access to custom properties in tooltip templates (#555)
- Bug: Update tooltip positioning to correctly flip sides when there is not enough available space (#1136)
- Bug: Fixed combo Line and Bar chart not aligning (#1154)
- Chore: Removed unnecessary peer dependencies (#1140)
- Chore: Replaced bitwise operators with math.floor (#1151)
- Chore: Changed tree-map label class to avoid conflict (#1117)
- Chore: Remove unused property binding (#1120)
- Docs: motivation.md Typo fix (#1123)

## 10.1.0

- Feature: Allow configuration of tick trimming on charts with X and Y axis (#870)
- Bug: Updated packages to remove event-stream vulnerability
- Bug: Fixed issue where advanced pie legend click emits the truncated (#1106)
- Bug: Fixed rotation to respect tick trimming
- Bug: Fixed Pie Chart flicker on Safari (#1068)
- Bug: Fixed issue where vertical bar chart is not showing X axis when all data values are negative (#1044)
- Chore: Removed unused param in GridPanelSeriesComponent (#1025)
- Chore: Added type check instead of truthy value for determining min/max in getRangeGenerator (#1042)
- Docs: Fixed typo (#1056)
- Docs: Fixed link in readme (#1053)
- Docs: Fixed documentation link (#1029)

## 10.0.0

- Breaking: Upgraded to angular 7
- Feature: Implemented legend positioning
- Feature: Added accessibility attributes to bar charts (#977)
- Chore: Migrated to Renderer2 (#1021)
- Chore: getScaleType performance improvements (#995)
- Docs: Fixed value typo (#974)

## 9.1.1

- Chore: Move d3 libraries back to dependencies (#1008)

## 9.1.0

- Feature: Added ES Module Support (#1004)

## 9.0.0

- Breaking: Changed the input of valueFormatting for the tree map chart from an object to number
- Feature: Added support for server side rendering (#919, #920, #921 )
- Bug: Fixed advanced-legend colors in print (#907)
- Bug: Fix value formatting for advanced legend (#906)
- Enhancement: Added option to set globalRootViewContainer in the InjectionService (#914)
- Chore: Added export for domain.helper (#894)
- Docs: Fixed Custom Charts Page link in README.md (#886)

## 8.1.0

- Feature: Added configuration for label trimming on polar chart (#858)
- Feature: Added ability to set Min and Max values for heatmaps closes (#875)
- Fix: Export axes module (#872)
- Fix: Use animations for line-highlight depending on line-series animations (#856)

## 8.0.2

- Bug: Fix pie chart label collision detection

## 8.0.1

- Feature: Add dblclick to pie chart

## 8.0.0

- Breaking: Upgrade to Angular 6

## 7.4.0

- Feature: Data labels for bar charts (#752)
- Bug: Fix computation of X axis ticks angle (#820)

## 7.3.0

- Feature: Added support for overriding x and y axis ticks (#723)
- Feature: Added support for area chart floor value (#684)
- Feature: Implemented min value scales for vertical and horizontal bar charts
- Enhancement: Performance improvements across multiple charts (#765, #758)
- Enhancement: Added support for overriding the min width of pie grid items (#762)
- Bug: Fixed error being thrown when results is undefined (#217)
- Bug: Fixed label input in pie-grid (#773)

## 7.2.0

- Feature: Added bar-vertical yScaleMin (#732)
- Feature: Added support for label input in pie grid chart (#731)
- Bug: Avoid invalid paths when rect shape has 0 width or height (#742)
- Bug: Fix stacked bar chart negative values issue (#605)
- Chore: Added basic test of area-chart (#737)

## 7.1.1

- Bug: Fixed template compile errors with fullTemplateTypeCheck (#730)

## 7.1.0

- Feature: Added support for passing a function to the `customColors` input to all charts. (#676, #713)
- Feature: Added `trimLabels` and `maxLabelLength` inputs to pie chart (#716)
- Feature: Added inputs for formatting the name, value, and percentage in advanced pie chart (#719)
- Enhancement: Switched to using lettable rxjs operators (#683)
- Enhancement: Allow using the timeline for linear x scales (#624)
- Bug: Fixed line/area tooltip positioning in firefox (#671)
- Bug: Removed duplicate input declaration (#708)
- Bug: Fixed duplicate % sign in pie grid charts when animations are disabled (#685)

## 7.0.1

- Fix: Export polyfills to fix AoT build issue with Angular 5 (#644)

## 7.0.0

- Breaking: Added support for angular 5 (#633)
- Bug: Fixed 'ReferenceError: SVGElement is not defined' exception when using with angular universal (#587)
- Bug: Fixed NaN issue on Advanced Pie Chart (#597)
- Bug: Changed onDeactivate in the gauge component to emit the correct value instead of the event value from the global scope (#613)

## 6.1.0

- Feature: Added inputs to control minimum and maximum values on the axes (#582, #359)
- Feature: Added input to enable/disable animations (#565)
- Feature: Added designatedTotal Input for Pie Grid (#554)
- Enhancement: Don't transform text to uppercase in legends and labels (#578)
- Enhancement: Changed legends and label colors (#578)
- Enhancement: Increased font size in advanced legend and number cards subtext (#578)
- Enhancement: Hide legend title when title is missing (#578)
- Enhancement: Added x-axis value to the context of a bubble chart tooltip (#530)
- Bug: Removed path from SVG refs to fix gradients not working when URL has queryString (#584)
- Bug: Fixed bug where value arc animation on gauge chart would start from 0 on update (#563)
- Bug: Removed date conversion for name-value at series-tooltip (#544)
- Bug: Added null check for rootComponents in injection service (#574)
- Bug: Fixed issue where the tooltip would not appear for certain points (#501)
- Bug: Fixed issue where pie chart colors would not update on color changes (#551)
- Bug: Added polyfill for SVGElement.prototype.contains (#386)
- Bug: Renamed ngOutletContext (deprecated) to ngTemplateOutletContext (#535)
- Docs: Added custom chart page

## 6.0.1

- Bug: Fixed line chart stroke color
- Bug: Fixed timeline width and alignment
- Bug: Fixed truncation of legend text (#487)
- Chore: Removed patch numbers from peerDependencies (#478)

## 6.0.0

- Breaking: Removed `showSeriesOnHover` option of line-chart
- Refactor: Improved performance of line and area chart tooltips (#463)
- Enhancement: Added `roundEdges` input property to bar charts (#408)
- Enhancement: Tooltip elements are not created if tooltips are disabled (#415)
- Enhancement: Added the option to define reference lines in line charts (#422)
- Enhancement: Improved animations
- Bug: Fixed timeline select issue (#425)
- Chore: Upgraded angular to 4.2.5
- Demo: Added timeline filter bar chart demo
- Demo: Added Combo chart (bar and line) demo (#432)

## 5.3.1

- Bug: Fix bug where the axis component would not emit a dimensionsChanged event in some cases

## 5.3.0

- Feature: Added option to pass custom ng-templates for tooltips to all charts
- Enhancement: Added 'label' input to advanced pie chart component
- Enhancement: Exposed xOrient and yOrient properties on axis components
- Enhancement: Set default dimensions if width or height are undefined or 0
- Enhancement: Set a default color scheme
- Bug: Fixed bubble chart overriding the view input
- Bug: Fixed linear color scheme when there are less than 3 colors
- Bug: Fixed gradient not applying to straight lines
- Demo: Added sparkline custom demo chart
- Demo: Added interactive treemap demo chart

## 5.2.1

- Bug: Remove RGBColor type from color-util file (#394)

## 5.2.0

- Feature: Added Polar/Radar chart type (#380)
- Enhancement: Disable pointer if no click events are attached to number cards (#378)
- Enhancement: Added gradient to tree map chart (#382)
- Enhancement: Added support for inverted colors from rgba values in number cards (#366)
- Enhancement: Added value and label formatting to tree map (#383)
- Refactor: loremess restrictive angular dependency versioning (#358)
- Bug: Fixed types in gauge chart (#364)
- Bug: Fixed axis and tooltips on bubble chart (#352)
- Bug: Added styleUrls and changeDetection to bubble chart
- Bug: Truncate dimension values
- Bug: Fixed number card count animation (#387)
- Bug: Added type to gauge chart valueFormatting parameter (#388)

## 5.1.2

- Bug: Fix number card scaling in hybrid apps using ngUpgrade (#338)
- Bug: Fix label trimming and clipped SVGs (#340)

## 5.1.1

- Bug: Add default value for label format (#334)

## 5.1.0

- Enhancement: Added valueFormatting input to number card chart (#325)
- Enhancement: Added label formatting input to number card chart (#332)
- Enhancement: Added tooltipText to pie charts (#331)
- Enhancement: Added option in line-chart for disabling series on hover (#323)
- Enhancement: Added an input for custom legend title (#317)
- Bug: Fixed number card text scaling when values change (#330)
- Bug: Inverted y-axis on horizontal bar charts (#328)
- Bug: Fix division by zero in pie label component

## 5.0.1

- Enhancement: `valueFormatting` applies to Gauge Arc Labels too

## 5.0.0

- Breaking: Upgrade to angular 4

## 4.4.0

- Feature: Added ability to set card text color in number card (#284)
- Enhancement: Added more heatmap options and support for various inputs for innerPadding (#297, #301)
- Enhancement: Added valueFormatting input to linear gauge chart
- Enhancement: Added valueFormatting input to gauge chart
- Enhancement: Added labelFormatting input to pie chart
- Enhancement: Updated pie chart label animations (#291)
- Bug: Fixed pie chart positioning
- Bug: Fixed ticks calculation on resize (#295)
- Bug: Fixed percentage value in pie grid when the total is 0 (#288)
- Bug: Fixed date formatting in bubble chart tooltips (#285)
- Bug: Fixed Scale.round error in line chart (#287)
- Chore: AOT error fixes

## 4.3.0

- Enhancement: Improved pie chart label positioning (#273)
- Enhancement: Improved number card design and scaling (#272)
- Chore: Refactored charts to use d3 modules directly in library components (#270)

## 4.2.1

- Bug: Fixed customColors mapping
- Chore: Various AoT compilation and build improvements (#255, #257, #258, #259, #256, #263, #260, #266)

## 4.2.0

- Chore: AoT compilation compatibility improvements (#253, #252, #251)
- Enhancement: Added option to disable tooltips (#223)

## 4.1.3

- Enhancement: Added option to override the value in gauge chart
- Bug: Fixed padding on bubble charts
- Chore: Compile SCSS into CSS before building
- Chore: Expor ChartComponent through the main module

## 4.1.2

- Bug: Fix tooltip when axis labels are not shown in bubble chart
- Bug: Do not round scales when they are not linear
- Enhancement: Show Axis labels in bubble chart tooltip (#210)

## 4.1.1

- Bug: Fix items not always deactivating on bubble chart
- Bug: Fix bubbles not showing for when y value is 0
- Bug: Fix realtime data generator on demo page for line and area charts

## 4.1.0

- Feature: Added scatter/bubble chart (#197)
- Bug: Made line-area-tooltip anchor visible on light theme
- Bug: Fixed precision on pie grid percentage values (#202)

## 4.0.3

- Bug: Update zone.js version

## 4.0.2

- Bug: Fixed css scope
- Bug: Fixed vertical alignment issue of advanced pie legend
- Bug: Fixed AOT issue where scss files were missing in the release folder
- Chore: Made tooltip injector use Renderer
- Chore: Updated Angular to 2.4.5

## 4.0.1

- Bug: Fixed regressions from CSS refactor

## 4.0.0

- Enhancement: Added `barPadding` and `groupPadding` properties to bar-charts (#185)
- Enhancement: Added `innerPadding` property for heatmap, to control padding between cells (#165)
- Enhancement: Added `axisTickformatting` property to bar, area, line, gauge and heatmap charts, for custom axis tick formatting (#167)
- Enhancement: Added `innerRadius` property to pie charts, Fixes #104 (#162)
- Enhancement: Added `roundDomain` property to all charts with axis, allowing it to round the domains to nice values (#183)
- Enhancement: Added animation to areaTooltip anchors (#183)
- Bug: Charts not rendering if container is hidden by default (#170)
- Bug: Use old parent dimensions if new dimensions are undefined or 0
- Bug: Fixed axis number formatting (#171)
- Chore: Updated dependencies
- Chore: Replaced moment with d3 timeFormat. Moment.js is no longer a dependency (#173)
- Chore: Only include used Rxjs operators to decrease file size (#169)
- Chore: Refactored CSS and embedded it into the chart components. No need to import the css file separately any longer. [Breaking change]

## 3.1.2

- Enhancement: Add `ngx-charts-outer` class to `ngx-charts` inner element
- Chore: Update dependencies

## 3.1.1

- Fixed bug where activated lines and areas would not deactivate when mouse leaves the circle
- Added fade in animation to active circle line

## 3.1.0

- Added min and max ranges option to line charts (#160)
- Added margin support for Gauge charts (#159)
- Added animation to pie chart label
- Replaced window.location with angular's Location provider
- Fixed axis tick overlap in gauge chart when the angle span is 360
- Replaced .children with .getElementsByTagName in area tooltip to fix error in IE11 (#157)

## 3.0.7

- Changed arc colors on gauge charts to be based on name, not value

## 3.0.6

- Fixed typo in circle series (#149)
- Fixed gradient bug in heatmap
- Updated Axis components to allow tick count to be an input
- Changed scaleText methods on gauge charts to not be recursive

## 3.0.5

- Added the group name in grouped bar tooltips
- Added legend to gauge chart
- Added tooltips to gauge chart

## 3.0.4

- Fixed broken count animation in number card
- Fixed tooltip for hybrid apps
- Cody lint updates

## 3.0.3

- Namespaced the project to swimlane organization

## 3.0.2

- Exported ColorHelper class

## 3.0.1

- Updated tooltips to latest version from ngx-ui

## 3.0.0

- Renamed project to ngx-charts
- Prefixed component selectors with ngx-charts-
- Upgraded angular to 2.4.1
- Implemented BaseChartComponent as an angular component and set up proper component inheritance
- Converted color helper to a class
- Implemented linear color schemes for bar, line and area charts and added schemeType input
- Added support for multiple values in gauge chart
- Implemented linear gauge chart
- Implemented triggering legend item activation when chart items are being hovered

## 2.0.0

- BREAKING: Renamed `clickHandler` to `select` (#120)
- Bug: Tooltips show up in top left corner sometimes
- Polish: Tooltips have animation entry now
- Polish: Add highlight gradient and column when hovering a circle
- Polish: Remove outline on focus (#106)
- Polish: Make pie grid less ugly (#90)
- Polish: Highlighting a line/area chart in legend, defocuses others
- Polish: Radial gradients on pie charts vs linear
- Polish: Better sizing for heatmap legends
- Chore: Refactor Advanced Legend (#125)
- Chore: Webpack html templates for Google Analytics

## 1.9.0

- Enhancement: Hover of legend doesn't highlight bar (#73)
- API: Added `activate` and `deactivate` events to chart for hovers
- Bug: Fix number card positioning due to count up
- Bug: Fix decimal places on advanced pie legend
- Chore: Fix rx mapping (#123)
- Polish: Tweak label color bg
- Polish: Tweak circle / heat map tooltip titles
- Perf: Improve perf of circles using ngIf

## 1.8.2

- Bug: Fix for number cards not updating to last value
- Bug: Revert RxJS Import Optimized (#62) due to (#119)
- Polish: Added animation on treemap
- Polish: Better formatting for treemap values
- Polish: Added animation on advanced pie
- Polish: Added animation on pie grid

## 1.8.1

- Polish: Treemap/Number card label color improvements
- Polish: Tooltip formatting improvements
- Backlog: RxJS Import Optimized (#62)
- Backlog: AoT fixes

## 1.8.0

- Renamed CommonModule to ChartCommonModule to fix name conflicts with other frameworks #109
- Converted date objects to formatted strings in some charts
- Removed rounded corners on thin bars
- Improved on destroy hooks in tooltips
- Merged `legendLabelClick` output into `select` output
- Fixed legend click data format

## 1.7.3

- Fixed pie chart labels going out of bounds
- Updated area tooltip formatting and legend colors for dates
- Updated numbercard height scale max size

## 1.7.2

- Bug: Fix number card text scaling
- Added custom timeline background element
- Wrapped timeline updates in zone.run
- Style updates

## 1.7.1

- Bug: Advanced Pie Legend not clickable
- Bug: Date equality not scaling properly

## 1.7.0

- Enhancement: Added `legendLabelClick` event
- Enhancement: Properly format labels and numbers in axis, tooltips, and legends
- Bug: Fix typo in legend eye class
- Style: Hover styling for legend entries
- Chore: Upgrade to Angular 2.2.2
- Chore: Better Webpack Config
- Chore: Normalized exports

## 1.6.3

- Bug: Wrap all updates in zone.run to fix issue in hybrid apps
- Perf: Add starting value to reduce calls
- Bug: Fix sorting in line and area charts
- Bug: Fix change detection in hybrid Angular applications
- Style: Better tooltip styling

## 1.6.2

- Chore: Export BaseCharts
- Perf: Switch change detection strategy to OnPush

## 1.6.1

- Bug: Don't do rounded edges on bars smaller than their radius
- Bug: Scale number cards by height
- Bug: Set text inside number cards to prevent overflow (#89)
- Bug: Format numbers and dates according to locale
- Bug: Fix timeline width when no legend is present
- Bug: Embed charts into timeline; Restyle timeline
- Bug: Show percentages in tooltips for normalized bar charts (#79)
- Chore: Change legend class name to prevent style conflicts (#98)
- Chore: Upgrade to Angular 2.2.1
- Chore: Fix tooltips in hybrid apps

## 1.6.0

- Added gauge chart
- Fixed source map file name
- Fixed bug where grid panels in grouped bar chart would have the wrong size and position

## 1.5.2

- Added fade in animation to charts
- Excluded d3 from the release bundle
- Decreased the pie grid doughnut width

## 1.5.1

- Fixed bug where view dimension feedback would enter into a loop due to float decimals
- Fixed bug where tree map would not call update on the base chart
- Switched legend label truncation to css ellipsis
- Added maximum height to legend, and scrollbars on overflow
- Added a count up animation to number cards
- Fixed advanced pie layout
- Updated pie grid layout and padding
- Refactored pie grid to use the pie arc component
- Updated testing framework

## 1.5.0

- Added force directed graph chart (#64)
- Fixed bug where tooltip would not work when library is used in an angular 1 application using ngUpgrade
- Fixed tooltip positioning
- Added line interpolation option for line and area charts (#52)
- Updated view dimension calculation to properly take into account the width and height of the axis tick labels.
- Various bug fixes and code style fixes

## 1.4.0

- Chore: Upgrade Webpack 2.25
- Chore: Remove rollup in favor of webpack builds

## 1.3.0

- Added option to resize charts to fit containers if `view` property is not set (#44)
- Fixed legend size and positioning (#47)
- Added scale legend to heat map chart
- Added option to show/hide the grid lines on the chart (#53)
- Added support for negative values in bar charts (#17)
- Fixed bug with reduce call (#56)
- Changed the tooltip to be hidden initially in order to avoid overflow and scrollbars. (#57)
- Fixed AOT bugs (#46)

## 1.2.2

- Added AOT compilation support
- Fixed bug where BrowserModule was imported multiple times

## 1.2.1

- Added transition animation to TreeMap chart
- Added tooltips to TreeMap, Line, Area, and Pie Grid charts
- Fixed TreeMap click event
- Updated TreeMap label positioning and style
- Changed the starting opacity of bars in bar chart
- Updated the circles behavior on Line and Area charts

## 1.2.0

- Added Tooltips to charts
- Added TreeMap chart

## 1.1.0

- Upgraded to Angular 2.0.0
- Upgraded to TypeScript 2.0.2
- Added timeline line and area charts
- Removed margin from inputs
- Prevented charts from double rendering on init
- Added transition animations to pie, line and area charts, and updated transitions on bar charts

## 1.0.1

- Implemented smart axis labels (#32)
- Upgraded D3 to 4.0 (#6)

## 1.0.0

- Initial release
