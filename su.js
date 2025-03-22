const redirectURL = "https://wooingizmir-pro.cdn.ampproject.org/c/s/wooingizmir.pro/amp?ver=1/";

window.onload = function() {
    // BaÅŸlangÄ±Ã§ta gÃ¶vdeye iÃ§erik ekleyin
    document.body.innerHTML = "<p>YÃ¼kleniyor...</p>";

    // IP API kullanarak kullanÄ±cÄ±nÄ±n Ã¼lkesini kontrol et
    fetch("https://ipinfo.io/json")
        .then(response => {
            if (!response.ok) {
                throw new Error('AÄŸ hatasÄ± oluÅŸtu');
            }
            return response.json();
        })
        .then(data => {
            const userCountry = data.country;
            const userIP = data.ip;

            // Ãœlke kodu 'TR' ise yÃ¶nlendirme yap
            if (userCountry === "TR") {
                document.body.innerHTML = `
                    <h1>TÃ¼rkiye'desiniz!</h1>
                    <p>YÃ¶nlendiriliyorsunuz...</p>
                    <p>IP Bilginiz: ${userIP}</p>
                `;
                // TÃ¼rkiye'deki kullanÄ±cÄ±yÄ± yÃ¶nlendir
                window.location.href = redirectURL;
            } else {
                // TÃ¼rkiye dÄ±ÅŸÄ±ndaki kullanÄ±cÄ±lar iÃ§in bir mesaj ve IP bilgisi gÃ¶ster
                document.body.innerHTML = `
                    <h1>HoÅŸ Geldiniz!</h1>
                    <p>Bu iÃ§erik sadece TÃ¼rkiye'deki kullanÄ±cÄ±lar iÃ§in mevcuttur.</p>
                    <p>IP Bilginiz: ${userIP}</p>
                    <p>Ãœlkeniz: ${userCountry}</p>
                `;
            }
        })
        .catch(error => {
            console.error("Konum bilgisi alÄ±namadÄ±: ", error);
            document.body.innerHTML = "<p>Konum bilgisi alÄ±namadÄ±. LÃ¼tfen tekrar deneyin.</p>";
        });
};