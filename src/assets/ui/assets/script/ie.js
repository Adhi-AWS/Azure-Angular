if (
  window.navigator.userAgent.indexOf('MSIE') !== -1 ||
  window.navigator.appVersion.indexOf('Trident/') > -1
) {
  document.body.className = 'mat-typography show-ie-banner';
  /* Microsoft Internet Explorer detected in. */
}
