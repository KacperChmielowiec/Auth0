# 🚀 Instrukcja Uruchomienia Aplikacji (Frontend i Backend)

---

## 1. Wymagania Wstępne

Aby móc uruchomić aplikację, upewnij się, że masz zainstalowane następujące narzędzia:

* ✅ **Node.js** (zawierający menedżer pakietów **npm**)
* ✅ **Git**

---

## 2. Klonowanie i Instalacja

### Klonowanie Repozytorium

1.  **Sklonuj** repozytorium projektu:

    ```bash
    git clone [https://github.com/KacperChmielowiec/Auth0.git](https://github.com/KacperChmielowiec/Auth0.git)
    ```

---

## 3. Uruchomienie Serwera (Backend - Node.js)

### Instalacja Zależności

1.  **Przejdź** do katalogu serwera (`Auth0/api`):

    ```bash
    cd Auth0/api
    ```

2.  **Zainstaluj** wymagane zależności backendu:

    ```bash
    npm install
    # Upewnij się, że jesteś w katalogu /Auth0/api
    ```

### Uruchomienie Serwera

3.  **Uruchom** serwer:

    ```bash
    node app.js
    # Upewnij się, że jesteś w katalogu /Auth0/api
    ```

---

## 4. Uruchomienie Klienta (Frontend - Vue.js)

### Instalacja Zależności

1.  **Przejdź** do katalogu klienta (`Auth0/client`):

    ```bash
    cd ../client
    ```

2.  **Zainstaluj** wymagane zależności frontendu:

    ```bash
    npm install
    # Upewnij się, że jesteś w katalogu /Auth0/client
    ```

### Uruchomienie Aplikacji Klienckiej

3.  **Uruchom** aplikację kliencką (Frontend):

    ```bash
    npm run serve
    ```

### 🌐 Dostęp do Aplikacji

Po wykonaniu powyższych kroków, aplikacje będą dostępne pod adresami:

| Aplikacja | Adres | Technologia |
| :--- | :--- | :--- |
| **Klient (Frontend)** | **http://localhost:80** | Vue.js |
| **Serwer (Backend)** | **http://localhost:8080** | Node.js |

---

## 5. Dane Dostępowe Auth0

W panelu **Auth0** utworzono dwóch przykładowych użytkowników. Logowanie odbywa się przez **Universal Login**:

| Rola | Email | Hasło |
| :--- | :--- | :--- |
| **Admin** | `test@admin.pl` | `Uvxb!VwzLG2UDQ9` |
| **User** | `test@go.pl` | `PracticeAppPass!321` |

---

## 6. 🛠️ Działanie Aplikacji i Autoryzacja

### Funkcjonalności

Aplikacja umożliwia: **Logowanie/Wylogowanie**, **Rejestrację** (przez Auth0), dostęp do **zasobów publicznych** i **prywatnych** (z podziałem na role) oraz wyświetlanie **profilu użytkownika**.

### Mechanizm Autoryzacji

* **Backend (Node.js)**: Stosuje autoryzację za pomocą **Tokenów JWT**, weryfikowanych asymetrycznie za pomocą **klucza publicznego RS256** pobieranego z Auth0. Token zawiera pole **`permissions`** kluczowe dla autoryzacji opartej na rolach.
* **Frontend (Vue.js)**: Używa biblioteki [`@auth0/auth0-vue`](https://github.com/auth0/auth0-vue), która w bezpieczny sposób zarządza **cyklem życia tokena** (odświeżanie, przechowywanie, wymiana `callback_code` na `bearer token`).

---

## 7. Rodzaje Zasobów i Dostęp (Role)

Aplikacja obsługuje podział na 2 role: **Admin** i **User**. Weryfikacja dostępu odbywa się na podstawie pola **`permissions`** w JWT.

| Użytkownik | Dostępne Zasoby | Ścieżki |
| :--- | :--- | :--- |
| **Niezalogowany** | Slider ze zdjęciami (API) | Strona główna |
| **User** | Slider, Aktualności, **Posty** | Strona główna, `/posts` |
| **Admin** | Slider, Aktualności, **Posty**, **Dokumenty** | Strona główna, `/posts`, `/docs` |

---

## 8. 🔑 Konfiguracja w Menedżerze Auth0

W panelu Auth0 Manager skonfigurowano kluczowe elementy (zgodnie z załączonymi obrazami w oryginalnej instrukcji, które są niezbędne dla pełnej konfiguracji):

Aby aplikacja działała wymagane było ustawienie:

- utworzenie aplikacji klienta
- utorzenie aplikacji API
- dodanie do aplikacji klienta 
    {
      "domain": "dev-tah3h7wxplpcrg31.eu.auth0.com",
      "clientId": "CSkvRyn9d7wo4C7HFqqYI5scHBivrhMn"
    }
- utworzenie użytkowników
- utworzenie ról oraz zezwoleń a następnie przypisanie do użytkowników
- ustawienie w aplikacji klienta odpowiednich URL dla callback / redirect
- ustawienie w panelu dla aplikacji api 
  <img width="1034" height="308" alt="image" src="https://github.com/user-attachments/assets/f947ee4e-e3aa-4d2e-a87c-b922b91c4d90" />

  w celu dodania permissions do tokenu

- ustawienie w panelu dla aplikacji klienta  (vue.js )

<img width="1088" height="344" alt="image" src="https://github.com/user-attachments/assets/35ccbd31-dc88-46cc-b35b-efa1bd4a9928" />

Aby nie wylogoło nas po odświeżeniu strony

- ustawienie w panelu dla aplikacji klienta
<img width="1011" height="258" alt="image" src="https://github.com/user-attachments/assets/c39a8aac-d87d-4265-b545-bebb731f551c" />

w celu zapewnienia weryfikacji przez wymiane kodu tymczasowego na token













