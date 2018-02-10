// ==UserScript==
// @name                 Favicon In Urlbar
// @version              1.0
// @description          Adds site favicon and throbber to urlbar.
// ==/UserScript==

var disableScript = false;

(function() { 
  
  if (disableScript || location != "chrome://browser/content/browser.xul") return;

  var cbFav = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB8UlEQVR42qVTz0sbURD+Xn5oErNJNEqNRZJCBXOoglpPRRBaeutNxd5KoNC/oAehFxFa6Kmg9NAePClSKHoRLL1Ii/gDbYPSICFJG43pJtvETdYkm5jX2V3IqdDaPBjeezPffDvfm1mGJhdrmuD5fjxE+xyZ/Yq5JbIZjUC+4/MIN4R/z+dkkZyCvYxcYC+/JPjDvm44rWZwitQ1AB3q3ADWG2dj1+4a7lelio0TCexV+Acf7hJgNjHUKTsiyhCLFR3ob2+DxWxCNFskYg6fy4Zej0MnqhA4IZfAXh8leUerVX/N1aMzyBcqHt0OQCVAuXqJndM8YpkiRnrbsbAVw5uJISjk16pTapdgi5EUd7dYdG1P3h/g6VgfAl5nQ+/HqIjPCYm+bIffZcf9/m5UtRJonas1sJVomnfaWnTH9PIOno33I3jN1SBYP05jM5bFoM+NcFrG7L0gyTXpsWxZBVuLi7ynrVV3vNg8RkZRMXs3CJvFDFGpYDuZw0Eqj8ejAUwt72JpcgTX3UbHUhRnH5IS9ws2o7GkbX47jsOfMhzUlQdUrsduxbvDlB6/RZWFhv2ocUPC90IZ7NNZjt90O/44nvwv8xA9vwDbSuflQa8g/M8Yf5UKBfb222lowOucszB2pVEmGaWwVJxp/mdqluA3hRzXS0z85SsAAAAASUVORK5CYII=",
      usoFav = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADQklEQVR42o1TW2gcVRj+zs4lMzuz18zuZC8hacXEbgP1RSyiRKgYxaeaPkhpVSgFxQcxgpc3bxSLPogItiBaSqW04osPsVYbq2mLTcVCL7TaEmwSu5fZZGd3Ljv38aCIVfvgD4fDzzn/95/v+/5DcJt4+OCv4CUOYpIBCIFrh+j3+vj66Tv+c5fcmoy+cB7pgsCmS+KgKHPrZInJMIQQxw67vuUs6R2jWVLUoKe7mHtu5E+Ap05YeEg4hn3fjLGZam5LfpDfNqJwm9QUO2pHSPW8GAIic2nNa/RMf97oxl+YZjT3+vMV78OPL4E8cdzDmHFauG6WZsrDyotlJZnnEgRDyQREhkDggL4fww0inLlhoaEHum24709uTu/9crZpk2e+W4XW8B8r5rjPJipJsZZnIdOiuhXhajuAxFEN4hgc1aIbhGibAVot09Eb5u7hsn6IvHNheeDsZX7PfePSTEFiQc+RFQiq9AWGH2Kh7lOiEaIwAZ/ud2ZYtAwPp89rB0YKK7vI0CsXqzseKR9WsuL9AzEwyBNc0gKU5ASYAYLLbQeB48GLEiBxiJoiQc1xmL/eXTh5rDtFiq9+VXxwc+1opZSbXNVDjNHCvhehnOfAswDHRFikVHp9H7ZNMFEWoAUxlnXzp+Mnf5ki5dfOcOPrix+tV8UnPRcoF2QUqP8baBeD5hG1SqDjsNYPsUpXy4yw3HXR7nRmXTd8nEx9ehOd5tLUeCVzMCcJRVZOYlDkkBYE6FRIagR4SsulzvRdFyKJceKKNmutdg5lFPUwGZk5grHhKpOTxZ1KIfsmLwxUA5JAzAmoUlF7VoibVMd8loHT7sA3rKZl2O+KHPlgYdlw/pjEHfvPUr8JaenRlnyefyOVSd9TjwV2tJiilhIsrnng4fqsaf6gtdr7nI52dNPGDcGereN/j/LuT85h/poGmQ/Uai41LcvS9kCQN2aLuazZs9vtlfpLjuv82OwZF6+8tRUvf34Ve6fv+ifA3M9LMGwHtmViVMlmK6p6ry+p20SeTHZt722GYQ6EcRydenbi9p/p3/Hoe99j0UhytWJ8dycWHjC1lSOCMvzb/wb4K6b3L+BGvaHKQ+tqQUy+vRXgd14mawxJjBORAAAAAElFTkSuQmCC",
      blankFav = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACAElEQVR42mNkQAIHDhwIdXBwYMAHgGoYgGpWw/iM6JqfPHlSJC0t/Rib5qdPn8rKyMj0IRvCiCQfik8zuiFAJqYB////D2UgAjAyMq5GMQDmfHQDvn9+yfb4gq/Xn1+83zQcd+9mYmL6DzMA5g1GfH6/eTDRVNnspMLv718ZHt3MPatuWXIPPSwYcfn91b2DAgx/8lyfvX/BwMfHwPDvHf9vcc3923mFpH8iG8KIy+839vk6fGO/KBoSywLmXzn+neH+1bAb2k4TLyOHBVYDHpyZLc0v2G/1888LBjtfEYZ///4xXD78nuHVQ04GDvFNO8QVjT6jGIBu+8nVylO1TD+IMvz/w2DpIwwWO77tLQPDfyaG7auYz4WVvekECv1Hj0Yw2NbGW28ZKtHA+O85yAYG30QhsPjmBe/A9JeP3Azb579xT5n6ZxeGATPjmQQcYpTui0o+E4CJReWLgunlk97AVd86x3XFPOa1PpD5D8WAPX0C8w3duBL+/3oHF7v1gBVMqyv9gYv9/sPJsG/1z/Sozq+z4AYsSGEysI2UPc/D/QwSwkD4+Rsjg1emAph/ePF9WMiD6cd3uD+uX/peGW7Avj6e9drWrAH/fn6CxhGECq9QA9OrOm+jePg/AzvDntXfq+BCK4oZ2sUUGb0ZYSLowcvIgOKCP7+AsXXs/xQAZ1fpqSOKz+IAAAAASUVORK5CYII=",
      configFav = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA7klEQVR42mNkgIFMI0MGfs4gBo6jNQzYwA/rFoZPP7YwTDt7ElmYEc4qM/di4Dq5lQEP4ORwC/lesWstdgNAoIHhPy7NbH/tan41H2pFF2fEUInFEFZm5wW/a/cmYjOYkafVo+rL7x2tDASAtmzK26evny/6ULG1CNUFeJwNdRFeQJQB//9jV8LIyMjAyNbonPLr/97ZDL9sIxnYDi/HZQBIMTKAiRGOBUIuINYA3C6otEkB8s4xdBw9R54LQJpAyRRXEiboAkpjAcOAH9bGYO+gWEaKC0De6Thai24A8S4AgZ82qQztR+bADMDnQwDkpn4Gu4yDPwAAAABJRU5ErkJggg==",
      throbberFav = "chrome://browser/skin/tabbrowser/tab-loading.png",
      throbber = true;

  try {
    var identityBox = document.getElementById("identity-box"),
        boxImg = document.createElement("image");
    boxImg.setAttribute("id", "sitefavinurl-image");
    identityBox.insertBefore(boxImg, identityBox.firstChild);
  } catch(ex) {}

  setInterval(function() {loadFavs()}, 500);

  function loadFavs() {
    try {
      var favImage = document.getElementById("sitefavinurl-image"),
          tabs = document.getElementsByTagName("tab"),
          tabImg = gBrowser.selectedTab;
      for (var i = 0; i < tabs.length; i++) {
        if (tabs[i].label.match("about:")) tabs[i].image = configFav;
        if (tabs[i].label.match("Custom Buttons")) tabs[i].image = cbFav;
        if (tabs[i].label.match("forum.userstyles")) tabs[i].image = usoFav;
        if (!tabs[i].image) tabs[i].image = blankFav;
      }
      if (tabImg.hasAttribute("busy")) {
        if (throbber) favImage.setAttribute("src", throbberFav);
      } else if (tabImg.image) favImage.setAttribute("src", tabImg.image);
      else favImage.setAttribute("src", blankFav);
    } catch(ex) {}
  }

})();
