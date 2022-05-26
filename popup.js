const spendBtn = document.getElementById("spendAmount");

chrome.storage.sync.get(["total", "limit"], (budget) => {
  document.getElementById("total").innerText = budget.total;
  document.getElementById("limit").innerText = budget.limit;
});

spendBtn.addEventListener("click", () => {
  chrome.storage.sync.get(["total", "limit"], function (budget) {
    let newTotal = 0;
    if (budget.total) {
      newTotal += parseInt(budget.total);
    }

    let amount = document.getElementById("amount").value;
    if (amount) {
      newTotal += parseInt(amount);
    }

    chrome.storage.sync.set({ total: newTotal }, function () {
      if (amount && newTotal >= budget.limit) {
        let notifOptions = {
          type: "basic",
          iconUrl: "icon32.png",
          title: "Limit Reached",
          message: "Uh oh! Looks like you've reached your limit",
        };

        chrome.notifications.create("limitNotif", notifOptions);
      }
    });
    document.getElementById("total").innerText = newTotal;
    document.getElementById("amount").value = "";
  });
});
