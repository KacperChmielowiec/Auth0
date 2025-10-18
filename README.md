# Instrukcja uruchomienia aplikacji (Frontend i Backend)

---

## 1. Wymagania wstępne

Upewnij się, że masz zainstalowane:

* **Node.js** (zawierający **npm**)
* **Git**

---

## 2. Klonowanie i instalacja

1.  **Sklonuj** repozytorium:
    ```bash
    git clone [https://github.com/KacperChmielowiec/Auth0.git](https://github.com/KacperChmielowiec/Auth0.git)
    ```

## 3. Uruchomienie Serwera (Backend)

1.  **Przejdź** do katalogu serwera /api:
    ```bash
    cd api
    ```

2.  **Zainstaluj** zależności serwera (jeśli nie zostały zainstalowane w kroku 2.3):
    ```bash
    npm install
    # Należy znajdować sie w katalogu /Auth0/api
    ```

3.  **Uruchom** serwer:
    ```bash
    node app.js
    # Należy znajdować sie w katalogu /Auth0/api
    ```

---

## 4. Uruchomienie Klienta (Frontend)

Część kliencka (np. React, Vue, Angular) często znajduje się w podkatalogu takim jak `client`.

1.  **Przejdź** do katalogu klienta:
    ```bash
    cd client
    ```

2.  **Zainstaluj** zależności klienta (jeśli nie zostały zainstalowane wcześniej):
    ```bash
    npm install
    # Należy znajdować sie w katalogu /Auth0/client
    ```

3.  **Uruchom** aplikację kliencką (Frontend):
    ```bash
    npm run serve
    ```

Po wykonaniu tych kroków aplikacja kliencka powinna być dostępna w przeglądarce
*http://localhost:80* - client ( vue.js )
*http://localhost:8080* - api ( node.js )
