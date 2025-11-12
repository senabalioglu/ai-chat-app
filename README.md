
# 🧠 AI Chat App

## ✍ Proje Özeti
Kullanıcıların mesajlaşarak sohbet edebildiği, yazışmaların **AI tarafından duygu analiziyle (joy / anger / love)** gerçek zamanlı değerlendirildiği bir **web + mobil sohbet** uygulamasıdır. 
Uygulamanın backend, frontend ve AI servisleri tamamen ücretsiz platformlarda deploy edilmiştir.

---

## 💻 Kullanılan Teknolojiler

| Katman | Teknoloji | Hosting |
|--------|------------|----------|
| **Frontend (Web)** | React (Vite) | Vercel |
| **Frontend (Mobil)** | React Native CLI | Yerel Build (APK) |
| **Backend (API)** | ASP.NET Core + Entity Framework Core + SQLite | Render |
| **AI Servisi** | Python + Gradio + Hugging Face Spaces | Hugging Face Spaces |

---

## 🧩 Mimari Yapı

```
ai-chat-app/
│
├── backend/ # .NET Core API
│ ├── Controllers/
│ ├── Data/
│ ├── Models/
│ ├── Program.cs
│ └── appsettings.json
│
├── frontend/
│ ├── web/ # React (Vite)
│ └── mobile/ # React Native CLI
│
└── ai-service/ # Python Servisi (sentiment-analysis)
├── app.py
└── requirements.txt
```

---

## 🤖 AI Servisi (Hugging Face Spaces)
Python dilinde yazılan AI servisi, **Hugging Face Spaces** üzerinde çalışmaktadır ve **Gradio API** ile dışarıya açılmıştır.  
Bu kısım AI aracı (ChatGPT) yardımıyla yazılmıştır çünkü Gradio ile ilk defa çalışılmıştır.  
Servis, gelen metinleri analiz edip **“positive / neutral / negative”** JSON formatında bir çıktı döndürmektedir.

**Örnek istek:**

```
POST https://sihirlipaspas-sentiment-analysis.hf.space/api/predict/
Body: { "text": "Harika bir gün!" }
```

## 🧱 Backend (ASP.NET Core API)

Geliştirilen projenin .NET Core katmanı, giriş yapan kullanıcıları ve kullanıcıların gönderdiği mesajların yönetimini sağlamaktadır.  
SQLite veritabanı, `User` ve `Message` arasında **one–to-many (1-N)** ilişki bulunacak şekilde tasarlanmıştır.

### Temel Endpoint’ler

| Metot | Dizin | Açıklama |
|--------|--------|-----------|
| `POST` | `/api/User/login` | 'Nickname' ile kullanıcı girişi veya oluşturma |
| `GET`  | `/api/Messages/all` | Gönderilen tüm mesajları listeleme |
| `POST` | `/api/Messages/analyze` | Yeni gönderilen mesajı kaydetme ve duygu analizini yapma |

> Bu bölümde syntax ve fetch hatalarını önlemek adına AI’dan yardım alınmıştır;  
> ancak veritabanı ilişkileri (`User ↔ Message`) ve API entegrasyonu manuel olarak geliştirilmiştir.

---
### ⚙️ Render Deployment

> Bu bölümde **Render** servisi kullanılarak **.NET Core API** dışarıya açılmıştır.  
> Dışarıya açılan Render API, projenin **web** ve **mobil** bölümlerine entegre edilmiştir.

- **Deploy Linki:** [Render API Linki](https://ai-chat-app-api.onrender.com/api)

## 🌐 Frontend (Web & Mobil)

### Web (React – Vite)
- Kullanıcı login ekranı → nickname ile giriş  
- Ana ekran → mesaj listesi + anlık duygu sonucu + mesaj gönderme girdisi  
- API entegrasyonu  
- Deploy: [Vercel Demo Linki](https://ai-chat-app-two-bay.vercel.app/)

---

### 📱 Mobil (React Native CLI)
- Benzer bir sohbet ekranı React Native ile geliştirildi  
- Tek sayfa state yönetimi ile login / chat geçişi  
- Local API ve AI bağlantısı sağlandı  
- (İsteğe bağlı) APK dosyası eklenecek  

> `ChatInput` bileşeninde AI yardımı, işlevsellik kazandırmak için kullanılmıştır.  
> Stil ve veri akışı (`state management`, `useEffect`, `fetch`) tarafı manuel uygulanmıştır.

- APK: [Android APK İndir](https://drive.google.com/file/d/1tbL_3Rmcuf3S3X4jdeIYSudK2cYg_zj9/view?usp=sharing)

## 🧪 Kurulum Adımları
### Backend
```
cd backend
dotnet restore
dotnet ef database update
dotnet run
```
### AI Servisi
```
cd ai-service
pip install -r requirements.txt
python app.py
```
### Web
```
cd frontend/web
npm install
npm run dev
```
### Mobil
```
cd frontend/mobile
npm install
npx react-native run-android
```

---

## 🔗 Canlı Bağlantılar
- **Web (Vercel):** [https://ai-chat-869r52hf4-senabalioglus-projects.vercel.app](https://ai-chat-app-two-bay.vercel.app/)
- **API (Render):** [https://ai-chat-app-api.onrender.com/api](https://ai-chat-app-api.onrender.com/api)
- **AI Servisi (Hugging Face):** [https://sihirlipaspas-sentiment-analyzer.hf.space](https://sihirlipaspas-sentiment-analyzer.hf.space)

---

## 📚 Öğrenilenler
- **Full-stack zincirini uçtan uca kurma:** React → .NET → Python AI  
- **Ücretsiz servislerde deployment deneyimi:** Render, Vercel, Hugging Face Spaces  
- **AI entegrasyonu ile gerçek zamanlı veri işleme**  
- **API ve veritabanı entegrasyonu:** EF Core, SQLite  

---

## 💡 Katkı & Kod Hakimiyeti Notu
> - **AI kısmı:** Gradio + Hugging Face kodu, AI yardımıyla yazılmıştır.  
> - **Backend:** `User–Message` ilişkisi, veritabanı sorguları ve API entegrasyonu tarafı bana aittir.  
> - **Frontend:** `ChatInput` işlevselliği AI yardımıyla geliştirilmiş; genel yapı, state yönetimi ve stil tasarımı bana aittir.

---

## Geliştirici
 👩‍💻 **Sena Balioğlu**  
- [LinkedIn](https://www.linkedin.com/in/senabalioglu) • [GitHub](https://github.com/senabalioglu)
