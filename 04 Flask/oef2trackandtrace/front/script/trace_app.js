'use strict';
let htmlSearchText, htmlSearchBtn;
let htmlSectionInfoSender, htmlSectionTrackAndTrace;
let htmlStepDropOff, htmlStepWarehouse, htmlStepOutForDel, htmlStepDel;
let htmlStepDropOffDate, htmlStepWarehouseDate, htmlStepOutForDelDate, htmlStepDelDate;

document.addEventListener('DOMContentLoaded', function() {
  console.info('DOM geladen');
  //via queryselector maak variabelen aan
  htmlSearchText = document.querySelector('.js-search-txt');
  htmlSearchBtn = document.querySelector('.js-search-btn');
  htmlSectionInfoSender = document.querySelector('.js-section-info-sender');
  htmlSectionTrackAndTrace = document.querySelector('.js-section-trace');
  htmlStepDropOff = document.querySelector('.js-step-drop-off');
  htmlStepDropOffDate = document.querySelector('.js-step-drop-off-datum');
  htmlStepWarehouse = document.querySelector('.js-step-warehouse');
  htmlStepWarehouseDate = document.querySelector('.js-step-warehouse-datum');
  htmlStepOutForDel = document.querySelector('.js-step-out-for-delivery');
  htmlStepOutForDelDate = document.querySelector('.js-step-out-for-delivery-datum');
  htmlStepDel = document.querySelector('.js-step-delivered');
  htmlStepDelDate = document.querySelector('.js-step-delivered-datum');
  
});
