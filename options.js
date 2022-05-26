const saveLimitBtn = document.getElementById("saveLimit");
const resetTotalBtn = document.getElementById("resetTotal");

chrome.storage.sync.get("limit", function (budget) {
  document.getElementById("limit").value = budget.limit;
});

saveLimitBtn.addEventListener("click", function () {
  let limit = document.getElementById("limit").value;
  if (limit) {
    chrome.storage.sync.set({ limit }, function () {
      close();
    });
  }
});

resetTotalBtn.addEventListener("click", () => {
  chrome.storage.sync.set({ total: 0 }, function () {
    let notifOptions = {
      type: "basic",
      iconUrl: "icon32.png",
      title: "Total Reset!",
      message: "Total has been reset to 0",
    };

    chrome.notifications.create("limitNotif", notifOptions);
  });
});
