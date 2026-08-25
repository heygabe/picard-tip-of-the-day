// script.js – fetch a daily Picard tip and display it
(async () => {
  const TIP_ACCOUNT = "PicardTips@mas.to";
  const LOOKUP_URL = "https://mas.to/api/v1/accounts/lookup?acct=" + encodeURIComponent(TIP_ACCOUNT);

  async function fetchAccount() {
    console.log("Fetching account from", LOOKUP_URL);
    const resp = await fetch(LOOKUP_URL, { mode: "cors" });
    if (!resp.ok) {
      console.error("Lookup request failed", resp.status, resp.statusText);
      throw new Error("Lookup request failed " + resp.status);
    }
    const acct = await resp.json();
    if (!acct.id) {
      console.error("Account ID not found in response", acct);
      throw new Error("Account ID not found");
    }
    return acct;
  }

  async function fetchTips(accountId) {
    const url = "https://mas.to/api/v1/accounts/" + accountId + "/statuses?limit=200";
    console.log("Fetching tips from", url);
    const resp = await fetch(url, { mode: "cors" });
    if (!resp.ok) {
      console.error("Statuses request failed", resp.status, resp.statusText);
      throw new Error("Statuses request failed " + resp.status);
    }
    const data = await resp.json();
    console.log("Received " + data.length + " statuses");
    return data;
  }

  function stripHtml(html) {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  }

  function mulberry32(seed) {
    return function () {
      let t = (seed += 0x6d2b79f5);
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function shuffle(array, seed = 1701) {
    const rng = mulberry32(seed);
    const result = [...array];
    // Sort deterministically by status ID first to ensure stability
    result.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  try {
    const account = await fetchAccount();

    // Populate header with account info
    const avatarEl = document.getElementById("avatar");
    if (account.avatar) {
      avatarEl.src = account.avatar;
    }
    const nameEl = document.getElementById("display-name");
    if (account.display_name) {
      nameEl.textContent = account.display_name;
    }
    const handleEl = document.getElementById("handle");
    if (account.acct) {
      handleEl.textContent = "@" + account.acct;
    }

    const allStatuses = await fetchTips(account.id);
    if (!allStatuses.length) {
      document.getElementById("tip").innerHTML = "<p>No tips found.</p>";
      return;
    }

    // Deterministically shuffle statuses (seeded with Enterprise-D registry NCC-1701)
    const tips = shuffle(allStatuses, 1701);

    const today = new Date();
    const dayCount = Math.floor(today.getTime() / (1000 * 60 * 60 * 24));
    const secretOffset = parseInt(sessionStorage.getItem("picardOffset") || "0", 10);
    const idx = (dayCount + secretOffset) % tips.length;

    function showTip(i) {
      const tipStatus = tips[i];
      const tipText = stripHtml(tipStatus.content);
      document.getElementById("tip").innerHTML = "<p>" + tipText + "</p>";
    }

    showTip(idx);

    // Secret: triple-click the tip to load a new one
    const tipEl = document.getElementById("tip");
    tipEl.addEventListener("click", function (e) {
      if (e.detail === 3) {
        const currentOffset = parseInt(sessionStorage.getItem("picardOffset") || "0", 10);
        const newOffset = currentOffset + 1;
        sessionStorage.setItem("picardOffset", String(newOffset));
        const newIdx = (dayCount + newOffset) % tips.length;
        showTip(newIdx);
      }
    });
  } catch (e) {
    console.error("Error loading tip:", e);
    document.getElementById("tip").innerHTML = "<p>Failed to load tip.</p>";
  }
})();
