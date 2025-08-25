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
  - [Önkoşullar](#önkoşullar)
  - [Depoyu Klonla](#depoyu-klonla)
  - [Veritabanlarını Docker ile Başlat](#veritabanlarını-docker-ile-başlat)
  - [Backend Servislerini Çalıştır](#backend-servislerini-çalıştır)
  - [Frontend (Angular) Uygulamasını Çalıştır](#frontend-angular-uygulamasını-çalıştır)
- [Bileşenler Arası Haberleşme, Directive & Pipe Kullanımı](#bileşenler-arası-haberleşme-directive--pipe-kullanımı)
- [Geliştirme İpuçları](#geliştirme-ipuçları)
- [Proje Durumu ve Kanıtlar](#proje-durumu-ve-kanıtlar)
- [Lisans](#lisans)

---

## Özellikler
- **Kullanıcı akışı:** Kayıt, giriş, kategoriye göre ürün listeleme, sepete ekleme, miktar artır/azalt/sil, kuponla indirim, adres ekleyerek ödeme/sipariş tamamlama.
- **Admin paneli:** Dashboard istatistikleri, kullanıcı yönetimi, kupon yönetimi, ürün ve kategori CRUD.
- **API Gateway:** Mikroservislere tek giriş noktası; **Ocelot** ile yönlendirme ve kimlik doğrulama entegrasyonu.
- **Çoklu veritabanı:** Identity ve Order için **MS SQL Server**, Discount için **PostgreSQL**, Catalog için **MongoDB**, Basket için **Redis**.

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
- **ApiGateway:** Ocelot ile reverse proxy ve yönlendirme.
- **Catalog:** Kategori/ürün yönetimi, **MongoDB** üzerinde CRUD.
- **Basket:** Kullanıcı sepet işlemleri, **Redis** üzerinde saklama.
- **Discount:** Kupon yönetimi, **PostgreSQL** üzerinde CRUD.
- **Order:** Sipariş ve adres yönetimi, **MS SQL Server**.
- **IdentityServer:** Kayıt/giriş/çıkış ve rol tabanlı erişim.
- **Message:** Mikroservisler arası event tabanlı mesajlaşma altyapısı.

---

## Teknolojiler
- **Frontend:** Angular (TypeScript), Router, EventEmitter, Custom Directive, Custom Pipe.
- **Backend:** .NET 8 / ASP.NET Core, RESTful API, Ocelot API Gateway, EF Core, AutoMapper.
- **Veritabanları:** MS SQL (Identity/Order), PostgreSQL (Discount), MongoDB (Catalog), Redis (Basket).
- **Diğer:** Docker Desktop, Swagger, IdentityServer.

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

### **Kupon Yönetimi (Admin Panelinden Kupon Ekleme)**
- Admin panelinden kupon ekleme işlemleri yapılabilir.
- Kullanıcılar bu kuponları alışveriş sırasında kullanabilir.
![Yeni Kupon Ekle](/screenshots/yeniKuponEkle.png)
![Kupon Yönetimi](/screenshots/kuponYonetimi.png)

---

### **Adres Ekleme**
- Sipariş sürecinde kullanıcı adres bilgilerini ekleyebilir.
- İlçe, şehir ve detaylı adres alanları zorunludur.
![Adres Ekle](/screenshots/sepetteAdresEkle.png)

---

### **Yüksek Tutar Senaryosu**
- Sepete çok sayıda ürün eklenmesi durumunda detaylı bir özet gösterilir.
- Toplam fiyat ve her bir ürünün alt toplamı listelenir.
![Yüksek Tutar Senaryosu](/screenshots/yuksekTutarliSepet.jpeg)

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

### **Kullanıcı Yönetimi**
- Yeni kullanıcı ekleme ve mevcut kullanıcıları listeleme işlemleri yapılabilir.
- Kullanıcı adı, e-posta, rol (Admin/User) ve diğer bilgiler yönetilebilir.
![Admin Paneli - Kullanıcı Listesi](/screenshots/adminPaneliKullaniciListesi.png)
![Admin Paneli - Yeni Kullanıcı Ekle](/screenshots/adminPaneliKullaniciEkle.png)

---

## Kurulum

### Önkoşullar
- **Docker Desktop**
- **.NET SDK 8+**
- **Node.js 18+** ve **Angular CLI**
- **Git**

### Depoyu Klonla
```bash
git clone <repo-url> coffee-station
cd coffee-station
```

### Veritabanlarını Docker ile Başlat
```bash
docker run -d --name CatalogMongoDB -p 27017:27017 mongo:latest

docker run -d --name DiscountPSQL -p 5432:5432 \
  -e POSTGRES_USER=tugba \
  -e POSTGRES_PASSWORD=123456 \
  postgres:latest

docker run -d --name OrderSQL -p 1453:1453 \
  -e "ACCEPT_EULA=Y" \
  -e "MSSQL_SA_PASSWORD=Password123456" \
  -e "MSSQL_PID=Express" \
  mcr.microsoft.com/mssql/server:2022-latest

docker run -d --name BasketRedis -p 6379:6379 redis:latest

docker run -d --name IdentitySQL -p 1433:1433 \
  -e "ACCEPT_EULA=Y" \
  -e "MSSQL_SA_PASSWORD=Parola123456" \
  -e "MSSQL_PID=Express" \
  mcr.microsoft.com/mssql/server:2022-latest
```

### Backend Servislerini Çalıştır
```bash
cd services/IdentityServer
dotnet restore
dotnet ef database update
dotnet run
```
```bash
cd ../Catalog
dotnet restore
dotnet run
```
> Diğer servisler için benzer şekilde `dotnet run` kullan.

### Frontend (Angular) Uygulamasını Çalıştır
```bash
cd web
npm install
npm start   # veya ng serve
```

---

## Bileşenler Arası Haberleşme, Directive & Pipe Kullanımı
- **EventEmitter:** `OrdersComponent` sipariş sayfasında kullanılır.
- **Directive:** Özel buton ve input directive’leri oluşturuldu.
- **Pipe:** Fiyat formatlama ve tarih dönüştürme pipe’ları eklendi.

---

## Geliştirme İpuçları
- Migration’ları **Identity** ve **Order** servislerinde EF Core CLI ile yönetin.
- API Gateway’i en son başlatın.
- Angular tarafında `.env` yerine `environment.ts` dosyalarını kullanın.
- Docker konteyner isimlerini sabit tutarak config karmaşasından kaçının.

---

## Proje Durumu ve Kanıtlar
- Swagger üzerinde **Catalog** ve **Basket** servisleri test edildi.
- Kullanıcı akışı (kayıt, ürün seçimi, sepet, ödeme) başarıyla tamamlandı.
- Admin paneli üzerinde ürün ve kupon CRUD işlemleri doğrulandı.

---

## Geliştiriciler
- **Tuğba Aktürk** — [GitHub](https://github.com/tgbktrk)
- **Yunus Emre Şimşek** — [GitHub](https://github.com/YunusEmreSimseek)
