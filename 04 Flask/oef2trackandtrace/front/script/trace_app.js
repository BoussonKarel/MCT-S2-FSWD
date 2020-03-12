'use strict';
let htmlSearchText, htmlSearchBtn;
let htmlSectionInfoSender, htmlSectionTrackAndTrace;
let htmlStepDropOff, htmlStepWarehouse, htmlStepOutForDel, htmlStepDel;
let htmlStepDropOffDate, htmlStepWarehouseDate, htmlStepOutForDelDate, htmlStepDelDate;

const maaktZichtbaar = function(isZichtbaar) {
  if (isZichtbaar) {
    htmlSectionInfoSender.classList.remove('u-hide');
    htmlSectionTrackAndTrace.classList.remove('u-hide');
  }
  else {
    htmlSectionInfoSender.classList.add('u-hide');
    htmlSectionTrackAndTrace.classList.add('u-hide');
  }
}

const resetTraceSteps = function() {
  htmlStepDropOff.classList.remove('c-step--done');
  htmlStepDropOff.classList.remove('c-step--active');
  htmlStepWarehouse.classList.remove('c-step--done');
  htmlStepWarehouse.classList.remove('c-step--active');
  htmlStepOutForDel.classList.remove('c-step--done');
  htmlStepOutForDel.classList.remove('c-step--active');
  htmlStepDel.classList.remove('c-step--done');
  htmlStepDel.classList.remove('c-step--active');
  console.log("hoi");
}

const callbackVerwerkStatus = function(jsonObject) {
  console.log(jsonObject);
  maaktZichtbaar(true);
  document.querySelector('.js-sender-name').innerHTML = jsonObject.detail.naam;
  document.querySelector('.js-sender-postcode').innerHTML = jsonObject.detail.postcode;

  htmlStepDropOffDate.innerHTML = jsonObject.detail.afgifte;
  htmlStepWarehouseDate.innerHTML = jsonObject.detail.sorteercentrum;
  htmlStepOutForDelDate.innerHTML = jsonObject.detail.onderweg;
  htmlStepDelDate.innerHTML = jsonObject.detail.bezorgd;

  resetTraceSteps();

  // Afgifte
  if (jsonObject.detail.afgifte) {
    htmlStepDropOff.classList.add('c-step--done');
    if (!jsonObject.detail.sorteercentrum){
      htmlStepDropOff.classList.add('c-step--active');
    }
  }
  // Sorteercentrum
  if (jsonObject.detail.sorteercentrum) {
    htmlStepWarehouse.classList.add('c-step--done');
    if (!jsonObject.detail.onderweg) {
      htmlStepWarehouse.classList.add('c-step--active')
    }
  }
  // Onderweg
  if (jsonObject.detail.onderweg) {
    htmlStepOutForDel.classList.add('c-step--done');
    if (!jsonObject.detail.bezorgd) {
      htmlStepOutForDel.classList.add('c-step--active')
    }
  }
  // Bezorgd
  if (jsonObject.detail.bezorgd) {
    htmlStepDel.classList.add('c-step--done');
    htmlStepDel.classList.add('c-step--active')
  }
}

const callbackErrorStatus = function(response) {
  if (response && response.status == 404){
    htmlSearchText.value = 'Geen geldig postpakket';
  }
  else{
    htmlSearchText.value = 'Fout bij het opvragen';
  }
}

const showTrackTraceInfo = function() {
  const nummer = htmlSearchText.value;
  if (nummer) {
    const url = `http://127.0.0.1:5000/api/v1/trace/${nummer}`
    handleData(url, callbackVerwerkStatus, callbackErrorStatus);
  }
}

const hideTrackTraceInfo = function() {
  maaktZichtbaar(false);
}

const init = function() {
  htmlSearchBtn.addEventListener('click', showTrackTraceInfo);
  htmlSearchText.addEventListener('input', hideTrackTraceInfo);
}

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
  
  init();
});
