// script.js – fetch a daily Picard tip and display it
(async () => {
  const TIP_ACCOUNT = "PicardTips@mas.to"; // mastodon acct identifier
  const API_URL = "https://fe.disroot.org/api/v1/timelines/public?limit=200";

  function stripHtml(html) {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  }

  try {
    const resp = await fetch(API_URL, { mode: "cors" });
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const allStatuses = await resp.json();
    const picardTips = allStatuses.filter(
      (s) => s.account && s.account.acct && s.account.acct.toLowerCase() === TIP_ACCOUNT.toLowerCase()
    );
    if (!picardTips.length) {
      document.getElementById("tip").innerHTML = "<p>No tips found.</p>";
      return;
    }
    // Choose tip based on current day, deterministic but varying daily
    const today = new Date();
    const dayCount = Math.floor(today.getTime() / (1000 * 60 * 60 * 24));
    const idx = dayCount % picardTips.length;
    const tipStatus = picardTips[idx];
    const tipText = stripHtml(tipStatus.content);
    document.getElementById("tip").innerHTML = `<p>${tipText}</p>`;
  } catch (e) {
    console.error(e);
    document.getElementById("tip").innerHTML = "<p>Failed to load tip.</p>";
  }
})();
