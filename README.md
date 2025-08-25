# Coffee Station ☕ — Angular + .NET 8 Mikroservis E-Ticaret Platformu

Kahve ürünleri için kullanıcı ve admin akışlarını içeren, **Angular** frontend ve **.NET Core** tabanlı **mikroservis** mimarisine sahip bir e-ticaret uygulaması. Kullanıcılar kayıt/giriş yapabilir, ürünleri sepete ekleyip kupon uygulayabilir ve adres bilgisiyle siparişi tamamlayabilir; admin panelinden ise ürünler, kategoriler, kuponlar ve kullanıcılar yönetilir.

---

## İçindekiler
- [Özellikler](#özellikler)
- [Mimari](#mimari)
- [Mikroservisler](#mikroservisler)
- [Teknolojiler](#teknolojiler)
- [Ekranlar](#ekranlar)
- [Kurulum](#kurulum)
- [Geliştiriciler](#geliştiriciler)

---

## Özellikler
- Kullanıcı işlemleri: kayıt, giriş, kategori bazlı ürün listeleme, sepete ekleme, kupon uygulama, adres ekleme.
- Admin paneli: ürün, kategori, kupon ve kullanıcı yönetimi.
- Çoklu veritabanı: MS SQL, PostgreSQL, MongoDB, Redis.
- Mikroservis mimarisi ve API Gateway (Ocelot) desteği.
- 
---

## Mimari

Uygulama **mikroservis mimarisi** üzerinde; ek olarak **Katmanlı Mimari (DAL/BLL/API)**, **İstemci-Sunucu** ve **SOA** prensipleri uygulanmıştır.

```
[Angular SPA]
|
[API Gateway (Ocelot)]
|
├─ Catalog (MongoDB)
├─ Basket (Redis)
├─ Discount (PostgreSQL)
├─ Order (MS SQL)
├─ IdentityServer (MS SQL)
└─ Message (Event/Messaging)
```

**IdentityServer** tarafında EF Core üzerinden **MS SQL** bağlantısı, `appsettings.json` bağlantı dizeleri ve `Program.cs` konfigürasyonları ile yapılır; **SeedData** ile başlangıç kullanıcı/rol verileri eklenir.

---

## Mikroservisler
- **ApiGateway** → Servis yönlendirmeleri ve kimlik doğrulama.
- **Catalog** → Ürün ve kategori yönetimi.
- **Basket** → Sepet yönetimi.
- **Discount** → Kupon yönetimi.
- **Order** → Sipariş yönetimi.
- **IdentityServer** → Kimlik doğrulama ve yetkilendirme.

---

## Ekranlar

## 🌐 Kullanıcı Arayüzü

### **Ana Sayfa - Kategori Listesi**
- Uygulamaya girildiğinde kullanıcıyı ilk olarak kahve kategorileri karşılar.
- Her kategori kartında görsel ve kategori adı yer alır.
- “Keşfet” butonuna basıldığında seçilen kategoriye ait kahveler listelenir.
![Ana Sayfa - Kategori Listesi](/screenshots/anaSayfaKategoriListesi.png)

---

### **Kategoriye Ait Kahveler**
- Kullanıcı seçtiği kategoriye ait tüm kahveleri bu sayfada görebilir.
- Kahve kartlarında ürün görseli, adı, tadım notları ve fiyat bilgisi bulunur.
- “Sepete Ekle” butonu ile kahveler sepete eklenebilir.
![Kategoriye Ait Kahveler](/screenshots/anaSayfaKahveListesi.png)

---

### **Giriş Yap Ekranı**
- Sisteme giriş yapmak için kullanıcı adı ve şifre bilgisi girilir.
- Henüz hesabı olmayan kullanıcılar “Kayıt Ol” sayfasına yönlendirilir.
![Giriş Yap](/screenshots/girisYap.png)

---

### **Kayıt Ol Ekranı**
- Yeni kullanıcı kaydı için gerekli bilgiler:
  - Kullanıcı adı, isim, soyisim, e-posta, şifre ve şifre tekrar alanları.
- Kaydolan kullanıcılar otomatik olarak müşteri rolünde sisteme eklenir.
![Kayıt Ol](/screenshots/kayitOl.png)

---

### **Sepet Yönetimi**
- Kullanıcıların sepete ekledikleri ürünler listelenir.
- Her ürün için görsel, adı, fiyatı, miktarı ve toplam tutar gösterilir.
- Ürün miktarı artırılabilir, azaltılabilir veya tamamen silinebilir.
- “Ödeme Yap” butonu ile sipariş süreci başlatılır.
![Sepet](/screenshots/sepet.png)

---

### **Sepete Ürün Ekleme**
- Kullanıcı bir ürünü sepete eklediğinde bildirim gösterilir.
- Aynı ürün birden fazla kez sepete eklenebilir.
![Sepete Eklendi Bildirimi](/screenshots/sepeteEklendiBildirimi.png)

---

### **Giriş Yapmadan Sepete Ekleme Uyarısı**
- Kullanıcı sisteme giriş yapmadan ürün eklemek istediğinde önce giriş yapması için uyarı çıkar.
![Giriş Yapmadan Sepet Uyarısı](/screenshots/girisYapilmadanSepetUyarisi.png)

---

### **Kupon Yönetimi (Kullanıcı)**
- Kullanıcılar alışverişlerinde indirim kuponu kullanabilir.
- Kupon kodu girildikten sonra “Uygula” butonuna basıldığında toplam tutar güncellenir.
![Kuponlu Sepet](/screenshots/kuponluSepet.png)

---

### **Adres Ekleme**
- Sipariş sürecinde kullanıcı adres bilgilerini ekleyebilir.
- İlçe, şehir ve detaylı adres alanları zorunludur.
![Adres Ekle](/screenshots/sepetteAdresEkle.png)

---

### **Yüksek Tutar Senaryosu**
- Sepete çok sayıda ürün eklenmesi durumunda detaylı bir özet gösterilir.
- Toplam fiyat ve her bir ürünün alt toplamı listelenir.
![Yüksek Tutar Senaryosu](/screenshots/yuksekTutarliSepet.png)

---

## 🛠 Admin Paneli

### **Dashboard**
Admin paneli ana sayfasında toplam kullanıcı sayısı, aktif siparişler, günlük ziyaretçi sayısı ve toplam gelir bilgileri görüntülenir.  
![Admin Paneli - Dashboard](/screenshots/adminPaneliDashboard.png)

---

### **Kahve Yönetimi**
- Kahve ekleme, silme ve güncelleme işlemleri yapılabilir.
- Kahveler liste halinde gösterilir.
- Yeni kahve eklerken kahve adı, açıklama, fiyat ve kategori bilgisi girilir.
![Admin Paneli - Kahve Listesi](/screenshots/adminPaneliKahveListesi.png)
![Admin Paneli - Yeni Kahve Ekle](/screenshots/adminPaneliKahveEkle.png)

---

### **Kategori Yönetimi**
- Kategori ekleme, düzenleme ve silme işlemleri yapılabilir.
- Kategoriler tablo halinde görüntülenir.
![Admin Paneli - Kategori Listesi](/screenshots/adminPaneliKategoriListesi.png)
![Admin Paneli - Yeni Kategori Ekle](/screenshots/adminPaneliKategoriEkle.png)

---

### **Kupon Yönetimi**
- Kupon ekleme işlemleri yapılabilir.
- Kullanıcılar bu kuponları alışveriş sırasında kullanabilir.
![Yeni Kupon Ekle](/screenshots/yeniKuponEkle.png)
![Kupon Yönetimi](/screenshots/kuponYonetimi.png)

---

### **Kullanıcı Yönetimi**
- Yeni kullanıcı ekleme ve mevcut kullanıcıları listeleme işlemleri yapılabilir.
- Kullanıcı adı, e-posta, rol (Admin/User) ve diğer bilgiler yönetilebilir.
![Admin Paneli - Kullanıcı Listesi](/screenshots/adminPaneliKullaniciListesi.png)
![Admin Paneli - Yeni Kullanıcı Ekle](/screenshots/adminPaneliKullaniciEkle.png)

---

## Kurulum

### Önkoşullar
- Docker Desktop
- .NET SDK 8+
- Node.js 18+ & Angular CLI
- Git

### Adımlar
```bash
# Depoyu klonla
git clone <repo-url>
cd coffee-station

# Veritabanlarını başlat (Docker)
docker-compose up -d

# Backend servislerini çalıştır
cd services/IdentityServer
dotnet restore
dotnet ef database update
dotnet run

# Frontend uygulamasını başlat
cd web
npm install
npm start
```
---

## Geliştiriciler
- **Tuğba Aktürk** — [GitHub](https://github.com/tgbktrk)
- **Yunus Emre Şimşek** — [GitHub](https://github.com/YunusEmreSimseek)
