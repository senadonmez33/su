// Yönlendirme URL'sini JSON'dan al
fetch("https://raw.githubusercontent.com/senadonmez33/suyon/main/kaya.js")
    .then(response => response.json())
    .then(data => {
        const redirectURL = data.redirect; // JSON'dan alınan yönlendirme URL'si

        window.onload = function() {
            // Sayfa yüklendiğinde kullanıcıya yükleniyor mesajı göster
            document.body.innerHTML = "<p>Yükleniyor...</p>";

            // IP API kullanarak kullanıcının ülkesini kontrol et
            fetch("https://ipinfo.io/json")
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Ağ hatası oluştu');
                    }
                    return response.json();
                })
                .then(ipData => {
                    const userCountry = ipData.country;
                    const userIP = ipData.ip;

                    // Ülke kodu 'TR' ise yönlendirme yap
                    if (userCountry === "TR") {
                        document.body.innerHTML = `
                            <h1>Türkiye'desiniz!</h1>
                            <p>Yönlendiriliyorsunuz...</p>
                            <p>IP Bilginiz: ${userIP}</p>
                        `;
                        // Türkiye'deki kullanıcıyı yönlendir
                        window.location.href = redirectURL;
                    } else {
                        // Türkiye dışındaki kullanıcılar için bir mesaj ve IP bilgisi göster
                        document.body.innerHTML = `
                            <h1>Hoş Geldiniz!</h1>
                            <p>Bu içerik sadece Türkiye'deki kullanıcılar için mevcuttur.</p>
                            <p>IP Bilginiz: ${userIP}</p>
                            <p>Ülkeniz: ${userCountry}</p>
                        `;
                    }
                })
                .catch(error => {
                    console.error("Konum bilgisi alınamadı: ", error);
                    document.body.innerHTML = "<p>Konum bilgisi alınamadı. Lütfen tekrar deneyin.</p>";
                });
        };
    })
    .catch(error => {
        console.error("Yönlendirme URL'si alınamadı:", error);
    });
