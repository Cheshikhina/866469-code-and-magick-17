'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var BIAS = 60;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var INDENT = 40;
var BAR_WIDTH = 50;
var BAR_HEIGHT = 150;
var TEXT_Y = CLOUD_HEIGHT - GAP * 1.5;
var BAR_Y = CLOUD_HEIGHT - GAP * 2.5;

var renderCloud = function (ctx, xFirst, yFirst, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(xFirst, yFirst);
  ctx.bezierCurveTo(xFirst, yFirst, xFirst - BIAS, yFirst + CLOUD_HEIGHT, xFirst, yFirst + CLOUD_HEIGHT);
  ctx.lineTo(xFirst + CLOUD_WIDTH, yFirst + CLOUD_HEIGHT);
  ctx.bezierCurveTo(xFirst + CLOUD_WIDTH, yFirst + CLOUD_HEIGHT, xFirst + CLOUD_WIDTH - BIAS, yFirst + CLOUD_HEIGHT, xFirst + CLOUD_WIDTH, yFirst);
  ctx.lineTo(xFirst, yFirst);
  ctx.stroke();
  ctx.fill();
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, NAMES, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X + INDENT, CLOUD_Y + GAP * 2);
  ctx.fillText('Список результатов:', CLOUD_X + INDENT, CLOUD_Y + GAP * 4);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < NAMES.length; i++) {
    ctx.fillText(NAMES[i], CLOUD_X + GAP * 3 + (INDENT + BAR_WIDTH) * i, TEXT_Y);
    ctx.fillText(times[i], CLOUD_X + GAP * 3 + (INDENT + BAR_WIDTH) * i, CLOUD_HEIGHT - GAP * 4.5 - ((BAR_HEIGHT * times[i]) - ((BAR_HEIGHT * times[i]) % maxTime)) / maxTime);
    ctx.fillRect(CLOUD_X + GAP * 3 + (INDENT + BAR_WIDTH) * i, BAR_Y, BAR_WIDTH, (-(BAR_HEIGHT * times[i]) / maxTime));
  }
};
