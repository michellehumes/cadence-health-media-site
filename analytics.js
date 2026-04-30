(function () {
  function track(eventName, details) {
    var payload = Object.assign({
      event: eventName,
      path: window.location.pathname
    }, details || {});

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(payload);

    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, details || {});
    }
  }

  document.querySelectorAll(".js-track").forEach(function (element) {
    element.addEventListener("click", function () {
      track(element.getAttribute("data-event") || "cta_click", {
        label: element.textContent.trim(),
        destination: element.getAttribute("href")
      });
    });
  });

  document.querySelectorAll(".js-track-form").forEach(function (form) {
    form.addEventListener("submit", function () {
      track("form_submit", {
        form_name: form.getAttribute("name") || "unnamed_form"
      });
    });
  });
})();
